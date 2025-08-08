---
layout: post
title: "Configuring Traefik Middleware for Kubernetes"
description: "Master Traefik middleware configuration. Learn the Helm chart workflow for defining, templating, and applying traffic-modifying rules to your services."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/configuring-traefik-middleware-for-kubernetes.jpeg
tags:
  - Traefik
  - Middleware
  - Kubernetes
  - Helm
  - Ingress Controller
  - Microservices
  - API Gateway
  - YAML
  - Custom Resource
  - Custom Resource Definition
  - CRD
---

Traefik is a powerful cloud-native ingress controller that uses **Middleware** to modify requests before they're sent to your services. Middleware can handle crucial tasks like authentication, rate limiting, and header manipulation. By using Helm charts to manage your Traefik configuration, you gain a declarative, version-controlled, and reusable approach that's perfect for a microservice environment.

## Understanding the Helm Chart Workflow

Configuring Traefik Middleware in a Helm chart involves a three-part process that keeps your configuration clean and modular:

1.  **`values.yaml`**: This file acts as the single source of truth for your configuration. You define the middleware's name and its specific parameters here.
2.  **`middleware.yaml` template**: This is a Helm template that generates a Kubernetes `Middleware` *Custom Resource (CR)* manifest based on the configuration in `values.yaml`.
3.  **`ingressroute.yaml` template**: This template generates the `IngressRoute` resource, which then references and applies the middleware to your service's traffic.

This separation of concerns makes your chart highly flexible.

### Step 1: Define Middleware Configuration in `values.yaml`

The first step is to declare your middleware's configuration in the `values.yaml` file. This centralizes all your settings, making them easy to manage and override for different environments. In your chart, this is done under the `ingressroute.middleware` key.

Here's a practical example using `forwardAuth` to delegate authentication to a dedicated service:

```yaml
# labs64.io-helm-charts/charts/api-gateway/values.yaml

ingressroute:
  enabled: true
  host: localhost
  entryPoints:
    - web
    - websecure
  middleware:
    # A short, unique suffix for the Middleware resource name
    name: "auth-middleware"
    # The spec field that defines the middleware's behavior
    spec:
      forwardAuth:
        address: "http://auth-service.default.svc.cluster.local:8080/auth"
        trustForwardHeader: true
        authResponseHeaders:
          - "X-User-Id"
```

  * **`name`**: This is a unique suffix that will be combined with the Helm release name to create a unique `Middleware` resource name (e.g., `my-release-auth-middleware`).
  * **`spec`**: This block is the core of the middleware. Here, `forwardAuth` is configured to send authentication requests to an internal `auth-service`. It's set to trust the `X-Forwarded-For` header and will copy the `X-User-Id` header from the auth service's response back to the original request.

### Step 2: Create a Middleware Kubernetes Resource Template

Next, you need a Helm template that transforms the values from `values.yaml` into a Kubernetes `Middleware` manifest. This template should be in a file named `templates/middleware.yaml`.

```yaml
# templates/middleware.yaml

{{- if .Values.ingressroute.enabled and .Values.ingressroute.middleware.name -}}
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: {{ include "chart-libs.fullname" . }}-{{ .Values.ingressroute.middleware.name }}
spec:
{{- toYaml .Values.ingressroute.middleware.spec | nindent 2 }}
{{- end -}}
```

This template is designed to be reusable and safe:

1.  The `if` statement ensures the resource is only created if `ingressroute` is enabled and a middleware name is specified.
2.  The `metadata.name` is dynamically generated using the Helm helper function `include "chart-libs.fullname" .` and the `name` from `values.yaml`. This ensures a unique, conflict-free name.
3.  The `spec` section is populated directly from the `values.yaml` file using `toYaml`, which makes the template highly flexible for different types of middleware without needing to change the template itself.

### Step 3: Apply the Middleware to an IngressRoute

The final step is to instruct your `IngressRoute` to use the middleware you've defined. This is done within your `templates/ingressroute.yaml` file.

```yaml
# labs64.io-helm-charts/charts/api-gateway/templates/ingressroute.yaml

{{- if .Values.ingressroute.enabled -}}
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: {{ include "chart-libs.fullname" . }}
spec:
  entryPoints:
    {{- toYaml .Values.ingressroute.entryPoints | nindent 4 }}
  routes:
    - match: Host(`{{ include "chart-libs.fullname" . }}.{{ .Values.ingressroute.host }}`) && PathPrefix(`/`)
      kind: Rule
      services:
        - name: {{ include "chart-libs.fullname" . }}
          port: {{ .Values.service.port }}
      {{- if .Values.ingressroute.middleware.name }}
      middlewares:
        - name: {{ include "chart-libs.fullname" . }}-{{ .Values.ingressroute.middleware.name }}
      {{- end }}
{{- end }}
```

The key part of this template is the `middlewares` section. It conditionally renders a reference to the middleware resource if a name is provided in `values.yaml`. The `name` field here must exactly match the `metadata.name` generated in the `middleware.yaml` template. This ensures that the `IngressRoute` correctly applies the custom logic to all matching requests.

## Conclusion

This structured approach to configuring Traefik middleware with Helm provides a powerful and maintainable solution for managing your ingress traffic. By separating the configuration from the resource definition, you can easily enable or disable middleware, swap implementations, and version-control your entire ingress layer with a simple, declarative change to your `values.yaml` file. This pattern is fundamental to building a robust and scalable microservices platform.