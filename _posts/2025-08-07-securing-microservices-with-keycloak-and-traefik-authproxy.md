---
layout: post
title: "Securing Microservices with Keycloak and Traefik AuthProxy"
description: "Centralize authentication and authorization for your services. This guide explains how to use a Traefik Auth Proxy with Keycloak and JWTs"
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/securing-microservices-with-keycloak-and-traefik-authproxy.jpeg
tags:
  - Traefik
  - Keycloak
  - Auth Proxy
  - Microservices
  - JWT
  - RBAC
  - Python
  - FastAPI
  - YAML
  - Security
  - Authentication
  - Authorization
  - Kubernetes
  - Helm
  - API Gateway
---

An auth proxy is a specialized service that centralizes authentication and authorization for multiple microservices. Instead of implementing security logic in every service, you can use a single proxy to handle these concerns at the edge. The **Traefik Auth Proxy** is a great example of this pattern, using Traefik's `forwardAuth` middleware to intercept requests and enforce access policies.

This article explores a practical implementation we adopted for [Labs64.IO Ecosystem services](https://labs64.io) using a Python-based proxy that integrates with **Keycloak** for token validation and a simple YAML file for **Role-Based Access Control (RBAC)**.

## The Authentication Flow: How It All Comes Together

Understanding the request flow is key to grasping how this system works. It's a seamless dance between the user, Traefik, and the auth proxy.

1.  **Request from User**: A user sends an authenticated request to a protected endpoint, such as `https://labs64.io/api/v1/auditflow`, with a JWT in the `Authorization` header.
2.  **Traefik Interception**: The Traefik `IngressRoute` for this endpoint is configured with a `forwardAuth` middleware. This tells Traefik to pause the original request.
3.  **Proxy Check**: Traefik sends a new, internal request to the auth proxy's `/auth` endpoint. It includes critical headers from the original request, such as `Authorization` and `X-Forwarded-Uri` (which holds the path `/api/v1/auditflow`).
4.  **Path and Role Evaluation**: The auth proxy receives this request and begins its checks:
      * **Public Path Check**: It first checks if the requested path is marked as public in its configuration (e.g., `/v3/api-docs`). If it is, the proxy immediately returns an `HTTP 200 OK` and the process ends here.
      * **Token Validation**: If the path is protected, the proxy extracts the JWT from the `Authorization` header. It then performs several critical security checks:
          * **Signature Verification**: It fetches the JSON Web Key Set (JWKS) from Keycloak to cryptographically verify the token's signature.
          * **Expiration & Audience**: It ensures the token isn't expired and that it's intended for the correct audience.
      * **Authorization Check**: If the token is valid, the proxy extracts the user's roles from the token's payload. It then compares these against the required roles for the requested path, as defined in a simple YAML configuration file.
5.  **Proxy Response**: The proxy sends a response back to Traefik:
      * **Success**: If all checks pass, it returns an `HTTP 200 OK`. It might also return a custom header, like `X-User-Id`, which can be forwarded to the downstream service.
      * **Failure**: If the token is invalid or the user lacks the required roles, it returns a `401 Unauthorized` or `403 Forbidden` response.
6.  **Final Routing**: Traefik acts on the proxy's response. On a `200 OK`, it allows the original request to continue to the backend service. On a `401` or `403`, it blocks the request and returns the error to the user.

## The Components You Need

This powerful authentication model relies on a few key components working together.

### 1\. The Auth Proxy Service (`traefik_authproxy.py`)

This is the core of the system. It's a lightweight **FastAPI** [application](https://github.com/Labs64/labs64.io-api-gateway/tree/master/traefik-authproxy){:target="_blank"}{:rel="noopener nofollow"} that exposes a single `/auth` endpoint. Its responsibilities include:

  * Parsing incoming request headers for the JWT and path.
  * Fetching and caching JWKS keys from Keycloak.
  * Decoding, validating, and verifying JWTs.
  * Applying RBAC rules based on the user's roles and the path.

### 2\. The Role Mapping (`role_mapping.yaml`)

This declarative YAML file is your authorization policy. It maps URL prefixes to a list of Keycloak roles required to access them. This approach decouples authorization logic from your code, making it easy to manage.

```yaml
# sample_role_mapping.yaml
/api/v1/admin:
  - admin-role

/api/v1/auditflow:
  - admin-role
  - auditflow-role

# Public paths are defined with an empty list
/v3/api-docs: []
/actuator: []
```

Here, any request to `/api/v1/admin` must have the `admin-role`, while requests to `/api/v1/auditflow` can have either the `admin-role` or `auditflow-role`.

### 3\. The Traefik Middleware Configuration (`values.yaml`)

To enable the auth proxy, you simply configure the `forwardAuth` middleware in your Helm chart's `values.yaml`. This tells Traefik where to find your deployed auth proxy service.

```yaml
# values.yaml for your Helm chart
ingressroute:
  enabled: true
  middleware:
    name: "auth-middleware"
    spec:
      forwardAuth:
        address: "http://labs64io-traefik-authproxy.labs64io.svc.cluster.local:8081/auth"
        trustForwardHeader: true
        authResponseHeaders:
          - "X-User-Id"
```

The `address` points to the internal Kubernetes service of your auth proxy. The `authResponseHeaders` field tells Traefik to forward specific headers returned by the proxy to the downstream service, which is a great way to pass user identity information.

## Conclusion

The Traefik Auth Proxy pattern provides a powerful, decoupled, and centralized model for securing your microservices. By leveraging Traefik's `forwardAuth` middleware, a custom proxy, and a declarative role-mapping file, you can enforce robust, path-based authentication and authorization at the edge. This not only simplifies the security burden on individual services but also makes your overall architecture more manageable and scalable.