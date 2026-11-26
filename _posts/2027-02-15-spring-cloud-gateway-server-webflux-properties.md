---
layout: post
title: "Spring Cloud Gateway 2025.x: moving routes to spring.cloud.gateway.server.webflux"
description: "Spring Cloud Gateway renamed its property prefixes and starters in 4.3. Here are the old and new names for WebFlux and WebMVC, the YAML before and after, and the environment-variable form."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/spring-cloud-gateway-properties-hero.png
tags:
  - Spring Cloud Gateway
  - Spring Boot 4
  - Configuration
  - Migration
  - WebFlux
  - WebMVC
---

You upgrade Spring Boot and Spring Cloud, the application starts, and the gateway has no routes. Nothing crashes. Every request returns 404, and the `routes:` block in your `application.yml` looks exactly like it did last week.

The cause is a rename: the configuration prefix of Spring Cloud Gateway changed. This post lists the old and new names, shows the YAML before and after, and covers the environment-variable form that deployments depend on. It is written for developers who maintain a gateway and for architects who plan framework upgrades. Everything below comes from the project's source code, pull requests and reference as of 25 Nov 2026 (latest release 5.1.0), and the binding example was run on Spring Boot 4.1.0.

**After reading, you will know:**

- which prefixes and starters changed, and why,
- the exact before and after for WebFlux and WebMVC,
- how route lists look as environment variables,
- a checklist to find routes that silently stopped loading.

## Background: one project, two servers

Spring Cloud Gateway ships two **server** flavours: a reactive one (WebFlux, on Netty) and a servlet one (WebMVC, on Tomcat or Jetty). The documentation also describes a "proxy exchange" flavour for annotation-based applications. The current reference says the project builds on Spring Framework 7 and Spring Boot 4.

Both server flavours accept routes defined in properties, and they could no longer share one prefix. The pull request that migrated WebFlux gives the reason in one sentence: the old prefix `spring.cloud.gateway` "is ambiguous now that server-webmvc exists".

## The problem: names that moved together

Three renames landed in the 4.3 line (4.3.0 was released on 23 Jul 2025, and its release notes list them):

| What | Old | New |
| --- | --- | --- |
| WebFlux property prefix | `spring.cloud.gateway` | `spring.cloud.gateway.server.webflux` |
| WebMVC property prefix | `spring.cloud.gateway.mvc` | `spring.cloud.gateway.server.webmvc` |
| Module naming | previous module names | `gateway-{proxyexchange\|server}-web{flux\|mvc}` |

The reference documents the starter artifact IDs `spring-cloud-starter-gateway-server-webflux` and `spring-cloud-starter-gateway-server-webmvc`, and the switch that disables the gateway in each flavour: `spring.cloud.gateway.enabled=false` for WebFlux and `spring.cloud.gateway.server.webmvc.enabled=false` for WebMVC.

A route configured under a prefix the application no longer reads is simply not there. We did not find a startup failure for this case, which matches the symptom reported above: a 404, not an error.

## The solution: rename in three places

### Part 1: YAML before and after (WebFlux)

Before:

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: companies
          uri: http://companies-service:8080
          predicates:
            - Path=/companies/**
          filters:
            - StripPrefix=1
```

After:

```yaml
spring:
  cloud:
    gateway:
      server:
        webflux:
          routes:
            - id: companies
              uri: http://companies-service:8080
              predicates:
                - Path=/companies/**
              filters:
                - StripPrefix=1
```

The `routes` list sits under the new prefix, and so does `default-filters`. In the source, the class `GatewayProperties` defines the prefix `spring.cloud.gateway.server.webflux` with a `routes` list and a `defaultFilters` list. The reference uses the new form in all examples we read: `Path`, `StripPrefix`, `RewritePath` and `RequestRateLimiter`.

### Part 2: WebMVC

The WebMVC prefix is defined in `GatewayMvcProperties` as `spring.cloud.gateway.server.webmvc`. Its pull request describes the change as `spring.cloud.gateway.mvc` becoming `spring.cloud.gateway.server.webmvc`. Switches such as `spring.cloud.gateway.server.webmvc.form-filter.enabled` also live under the new prefix.

The two flavours differ in more than the prefix, which matters when you choose one:

| | WebFlux | WebMVC |
| --- | --- | --- |
| Runtime | Netty; not a Servlet container or WAR | Traditional Servlet runtimes such as Tomcat and Jetty |
| Programming model | Reactive | Servlet, functional endpoints (`RouterFunction`) |
| Filters | `GatewayFilter` factories | Handler filter functions such as `rateLimit(...)` |
| Rate limiting | Redis or Bucket4j | Bucket4j |
| Key resolver | `KeyResolver` bean returning `Mono<String>` | `Function<ServerRequest, String>`, Java DSL only |

Rate limiting is covered in [Spring Cloud Gateway rate limiting](/blog/2027/01/25/spring-cloud-gateway-rate-limiting/).

### Part 3: environment variables

In containers, route lists are often passed as environment variables. Spring Boot's relaxed binding maps `SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_ID` to `spring.cloud.gateway.server.webflux.routes[0].id`. We checked this on Spring Boot 4.1.0 with a class shaped like a route definition (id, uri and two string lists):

```bash
SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_ID=companies
SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_URI=http://companies:8080
SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_PREDICATES_0=Path=/companies/**
SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_FILTERS_0=StripPrefix=1
```

Binding these under `spring.cloud.gateway.server.webflux` produced the object `companies http://companies:8080 [Path=/companies/**] [StripPrefix=1]`. Variables with the old names, such as `SPRING_CLOUD_GATEWAY_ROUTES_0_ID`, belong to the old prefix and are not read under the new one. In Helm charts and Kubernetes manifests, search for `SPRING_CLOUD_GATEWAY_` and for `spring.cloud.gateway.routes`.

Two details: the predicate string is the same shortcut syntax as in YAML (`Path=/companies/**`), and list indexes must be consecutive, starting at 0.

### Part 4: find what stopped loading

1. **Search every config source** for the old prefix: `application*.yml`, `application*.properties`, ConfigMaps, Helm values, Config Server repositories and environment variables.
2. **Enable the actuator** `/actuator/gateway/routes` (see [the Path predicate article](/blog/2026/11/30/spring-cloud-gateway-path-predicate/)). An empty list after an upgrade points to the prefix.
3. **Consider Spring Boot's properties migrator.** The Spring Cloud Gateway build lists `spring-boot-properties-migrator` among its dependencies. We did not verify that Gateway publishes deprecation metadata for the old names, so treat the migrator as a helper, not as a guarantee.
4. **Check the starter.** Look at your dependency tree and use the starter that matches your server type.

## The outcome

| Question | Before the upgrade | After |
| --- | --- | --- |
| WebFlux routes | `spring.cloud.gateway.routes` | `spring.cloud.gateway.server.webflux.routes` |
| WebMVC settings | `spring.cloud.gateway.mvc.*` | `spring.cloud.gateway.server.webmvc.*` |
| Environment variable | `SPRING_CLOUD_GATEWAY_ROUTES_0_ID` | `SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_ID` |
| Symptom if missed | 404 for every route | None |

## Trade-offs

- The longer prefix is more verbose, but it removes the ambiguity between the two servers, which is the documented reason.
- Environment-variable route lists do not scale: prefer files for more than a handful of routes.
- We did not upgrade a running application end to end for this post. The facts come from source, pull requests and the reference, plus the binding test. Run your own route smoke tests after the upgrade.

## Apply it to your own gateway

- Search your repositories and deployment values for the old prefixes.
- Rename them, then compare `/actuator/gateway/routes` before and after.
- Add one smoke test per route that proves it exists (a response from the backend, not a gateway 404).
- Move to the starter that matches your server type.

## Key takeaways

- WebFlux routes now live under `spring.cloud.gateway.server.webflux`, WebMVC settings under `spring.cloud.gateway.server.webmvc`.
- The old prefix became ambiguous once the MVC server existed; that is the documented reason for the change.
- Environment variables must be renamed too: `SPRING_CLOUD_GATEWAY_SERVER_WEBFLUX_ROUTES_0_ID` binds on Spring Boot 4.1.0.
- A missed rename shows up as 404 on every route.
- Verify with the routes endpoint and one smoke test per route.

## Related reading

- [Spring Cloud Gateway Path predicate: does /companies/** match /companies?](/blog/2026/11/30/spring-cloud-gateway-path-predicate/)
- [Spring Cloud Gateway RouteLocator: dynamic routes from a database](/blog/2027/01/18/spring-cloud-gateway-routelocator-database/)
- [Spring Cloud Gateway reference](https://docs.spring.io/spring-cloud-gateway/reference/){:target="_blank"}{:rel="noopener nofollow"}
