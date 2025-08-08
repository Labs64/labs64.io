---
layout: post
title: "Spring Cloud Gateway Routing for Microservices"
description: "Master Spring Cloud Gateway routing. Learn to configure routes with predicates and filters to manage traffic to your microservices."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/spring-cloud-gateway-routing.jpg
tags:
  - Spring Cloud Gateway
  - Microservices
  - Routing
  - API Gateway
  - YAML
  - Java
---

Spring Cloud Gateway is a powerful API gateway that efficiently routes incoming traffic to the appropriate downstream microservices. At its core, this functionality relies on **routes**, which are the fundamental building blocks that define how requests are handled. Understanding how to configure these routes is essential for building a robust and scalable microservice architecture.

## Anatomy of a Gateway Route

A route is more than just a destination; it's a set of rules that governs a request's journey. Each route is defined by four key components:

* **`id`**: A unique, human-readable identifier for the route.
* **`uri`**: The destination URI where the request will be forwarded. This can be a service name registered in a service discovery tool (e.g., Eureka), or a direct URL.
* **`predicates`**: A list of conditions that must be met for a request to be handled by this route. Think of these as the "if" statements of your routing logic. If all predicates evaluate to `true`, the route is activated.
* **`filters`**: A list of actions that can modify the incoming request or the outgoing response. Filters are an optional but powerful feature for implementing cross-cutting concerns like rate limiting, path rewriting, or header manipulation.

## Configuration Methods: Declarative vs. Programmatic

Spring Cloud Gateway offers two primary ways to define your routes, each suited for different use cases.

### 1\. YAML Configuration (Declarative)

This is the most common and recommended approach for most applications. By defining routes in an `application.yaml` file, you create a clear, declarative routing table that is easy to read and maintain. This method is especially effective when routes are static and don't change frequently. In a Helm chart context, these configurations are often managed within `values.yaml` files, making them easily deployable across environments.

#### YAML Configuration Example

Here's a breakdown of a practical example, showing how to manage traffic for an `auditflow` microservice.

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: auditflow_service_route
          uri: http://labs64io-auditflow:8080
          predicates:
            - Path=/api/v1/audit/**
          filters:
            - name: RequestRateLimiter
              args:
                key-resolver: "#{@ipAddressKeyResolver}"
                redis-rate-limiter.replenishRate: 1
                redis-rate-limiter.burstCapacity: 1

        - id: auditflow_apidocs_route
          uri: http://labs64io-auditflow:8080
          predicates:
            - Path=/auditflow/v3/api-docs
          filters:
            - RewritePath=/auditflow/v3/api-docs, /v3/api-docs
```

* **`auditflow_service_route`**: This route matches any request path starting with `/api/v1/audit/`. It forwards the request to the `labs64io-auditflow` service and applies a **RequestRateLimiter** filter. This filter, using a custom `ipAddressKeyResolver`, ensures that no single client can flood the service with requests, thus protecting it from abuse.
* **`auditflow_apidocs_route`**: This route is a great example of using filters for convenience. It targets a specific API documentation path and uses the **RewritePath** filter to remove the `/auditflow` prefix before the request reaches the downstream service. This allows you to expose the `/v3/api-docs` endpoint of your microservice under a different URL on the gateway.

### 2\. Java Configuration (Programmatic)

For scenarios requiring more dynamic or conditional routing logic, you can define routes programmatically using a `RouteLocator` bean. This approach is more flexible and can be a good fit when routes need to be created based on a database, a feature flag, or other runtime conditions.

```java
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("ecommerce_service_route", r -> r.path("/api/v1/cart/**")
                .filters(f -> f.stripPrefix(3)) // Example of a filter
                .uri("lb://E-COMMERCE-SERVICE")) // Using a service discovery URI
            .build();
    }
}
```

* **`lb://E-COMMERCE-SERVICE`**: In this example, `lb://` indicates that the gateway should use a load balancer to resolve the `E-COMMERCE-SERVICE` URI, which is typically registered with a service discovery provider like Eureka. This is a common pattern in a microservice ecosystem.

## Essential Route Predicates and Filters

Spring Cloud Gateway provides a powerful set of built-in predicates and filters to control your routing logic.

### Common Predicates

Predicates are how you match requests. They're a list of conditions that must all be met for a route to be applied.

| Predicate | Description | Example |
| :--- | :--- | :--- |
| **Path** | Matches the request path. Supports wildcards (`*` and `**`). | `Path=/users/**` |
| **Method** | Matches the HTTP request method (e.g., `GET`, `POST`). | `Method=GET` |
| **Header** | Checks for the existence or a specific value of a request header. | `Header=X-Request-ID, \d+` |
| **Host** | Matches the request's `Host` header. | `Host=**.my-domain.com` |

### Common Filters

Filters allow you to modify requests before they're routed and responses after they're returned. They are executed in a chain.

* **`RewritePath`**: Changes the request URI path.
* **`StripPrefix`**: Removes a prefix from the request path.
* **`RequestRateLimiter`**: Limits the number of requests per period per user or IP address.
* **`AddRequestHeader`**: Adds a header to the request before it's sent to the downstream service.


Configuring routes is the cornerstone of building an API Gateway with Spring Cloud. Whether you choose the simplicity of **YAML for static routes** or the flexibility of **Java for dynamic logic**, understanding predicates and filters empowers you to build a sophisticated and resilient routing layer for your microservices. This not only centralizes traffic management but also allows you to enforce critical policies like security, rate limiting, and path manipulation in one place.