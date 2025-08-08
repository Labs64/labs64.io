---
layout: post
title: "Protecting Your APIs with RequestRateLimiter in Spring Cloud Gateway"
description: "Secure your microservices from traffic spikes. This guide shows how to configure API rate limiting in Spring Cloud Gateway with Redis and a KeyResolver"
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/scg-rate-limiter.png
tags:
  - Spring Cloud Gateway
  - RequestRateLimiter
  - Rate Limiting
  - Token Bucket Algorithm
  - API Gateway
  - Microservices
  - Redis
  - API Protection
---

**Rate limiting** is a critical strategy for protecting your backend services from abuse, ensuring fair resource usage, and preventing cascading failures from sudden traffic spikes. **Spring Cloud Gateway** provides a powerful and flexible way to implement this with its `RequestRateLimiter` filter. This filter uses a token bucket algorithm to control traffic, making it an excellent choice for a variety of use cases.

## How the Token Bucket Algorithm Works

At its core, `RequestRateLimiter` implements a **token bucket** algorithm.
Imagine a bucket with a set capacity that is constantly being refilled with tokens at a fixed rate.

* **`replenishRate`**: This is the rate at which tokens are added to the bucket (e.g., 10 tokens per second).
* **`burstCapacity`**: This is the maximum number of tokens the bucket can hold. It allows for "bursts" of requests above the `replenishRate` for short periods.
* **`requestedTokens`**: This is the number of tokens consumed for each request. By default, it is `1`.

When a request arrives, the filter checks if there are enough tokens in the bucket.

* **If tokens are available**, the request is allowed, and the corresponding tokens are removed from the bucket.
* **If no tokens are available**, the request is rejected with an HTTP `429 Too Many Requests` status.

This approach effectively smooths out traffic, preventing bursts from overwhelming your services while still allowing some flexibility.

## Step-by-Step Configuration Guide

Let's walk through the full configuration, from dependencies to a fully-functioning route.

### Step 1: Add Dependencies

You'll need `spring-cloud-starter-gateway` for the gateway itself and `spring-boot-starter-data-redis-reactive` as `RequestRateLimiter` uses Redis as its backend for a distributed, shared rate-limiting state.

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis-reactive</artifactId>
</dependency>
```

### Step 2: Configure Redis Connection

Point your Spring Boot application to your Redis instance in your `application.yaml`.

```yaml
# application.yaml
spring:
  data:
    redis:
      host: localhost # Replace with your Redis host
      port: 6379
```

### Step 3: Define a `KeyResolver`

The **`KeyResolver`** is crucial. It's a bean that defines the unique identifier for rate-limiting. This could be an IP address, a user ID, an API key, or anything else you can extract from the request.

Here's an example of a `KeyResolver` that uses the client's IP address.

```java
import java.net.InetSocketAddress;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component("ipAddressKeyResolver")
public class IpAddressKeyResolver implements KeyResolver {
    @Override
    public Mono<String> resolve(ServerWebExchange exchange) {
        // Resolve the client's IP address from the request's remote address.
        return Mono.justOrEmpty(
                exchange.getRequest().getRemoteAddress()
                        .map(InetSocketAddress::getHostString)
        );
    }
}
```

> 💡 **Pro Tip:** For production environments, you'll likely need to extract the IP from a header like `X-Forwarded-For` if your gateway is behind a load balancer.

### Step 4: Configure the Route with the Filter

Now, apply the `RequestRateLimiter` filter to a specific route in your `application.yaml`.

```yaml
# application.yaml
spring:
  cloud:
    gateway:
      routes:
        - id: auditflow_service_route
          uri: http://localhost:8080 # The URI of your backend service
          predicates:
            - Path=/api/v1/audit/**
          filters:
            - name: RequestRateLimiter
              args:
                # Reference to the KeyResolver bean we defined earlier.
                key-resolver: "#{@ipAddressKeyResolver}"

                # The rate limiter configuration.
                redis-rate-limiter.replenishRate: 10 # 10 tokens per second
                redis-rate-limiter.burstCapacity: 20 # Allows for a burst of 20 requests
                redis-rate-limiter.requestedTokens: 1 # Default, but good to be explicit
```

In this example, the route `/api/v1/audit/**` will be limited. Each unique IP address can make **10 requests per second**, with the ability to handle a **burst of up to 20 requests**.

## Common Use Cases and Best Practices

* **Rate Limiting by User ID:** Use a `KeyResolver` that extracts a user ID from a JWT or a custom header. This is ideal for ensuring fair usage across your application.
* **API Key Limiting:** Extract an API key from a header and use it as the key to limit requests per API key.
* **Resource Management:** Apply different rate limits to different endpoints based on their resource intensity. A login endpoint might have a very low limit to prevent brute-force attacks, while a data retrieval endpoint might have a higher limit.
* **Monitor Your Redis:** Since Redis stores the rate-limiting state, it's essential to monitor its performance and memory usage.

By leveraging Spring Cloud Gateway's `RequestRateLimiter`, you can easily build robust and resilient microservices. This simple but powerful filter is a cornerstone of modern API gateway architecture.
