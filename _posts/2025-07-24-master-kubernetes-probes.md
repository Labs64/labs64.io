---
layout: post
title: "Master Kubernetes Probes for Reliable Services"
description: "Learn how Kubernetes liveness and readiness probes restart failed containers and manage traffic for seamless, reliable application deployments."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/master-kubernetes-probes.jpg
tags:
  - k8s
  - kubernetes
  - helm
  - readiness
  - liveness
  - probes
  - spring-boot
  - actuator
  - health-checks
  - devops
  - cloud-native
---

When deploying applications on Kubernetes, simply having a container run isn't enough. For true reliability, you need to make sure your application is both **healthy** and **ready** to handle requests. This is where **liveness probes** and **readiness probes** come in. These simple health checks are performed by the Kubelet to manage your container's lifecycle and ensure your service stays available.

This guide uses a practical example from a Helm chart to show you exactly how to configure these probes for a Spring Boot application.

## Liveness Probe: Is My Application Alive?

A **liveness probe** is Kubernetes' way of answering the question: *"Is this container still healthy and running as expected?!"*

Its primary job is to catch situations where your application is running but has entered an unrecoverable state, like a **deadlock**. A stalled application might seem fine from a process perspective, but it's completely unresponsive. If a liveness probe fails for a specified number of times, Kubernetes assumes the container is broken and will **restart it**. This is a powerful, self-healing mechanism that can automatically recover your application from crashes without human intervention.

## Readiness Probe: Can My Application Accept Traffic?

A **readiness probe** answers a different, but equally important, question: *"Is my application ready to accept new requests right now?!"*

The key difference here is that a readiness probe doesn't cause a restart. Instead, it tells Kubernetes whether to route traffic to the pod. A pod might be running and passing its liveness probe, but still not be ready to serve traffic. For example, it could be in the middle of a lengthy startup process, waiting to connect to a database, or loading a large dataset into memory.

When a readiness probe fails, Kubernetes temporarily **removes the pod's IP address from the service's endpoint list**. This prevents any new traffic from being sent to the pod. As soon as the probe starts passing again, the pod is automatically added back into the service's load-balancing pool. This is a critical component for achieving **zero-downtime deployments** because it ensures traffic is only sent to pods that are fully ready to handle it.

## Practical Probe Configuration with Helm

Let's look at a concrete example from a `values.yaml` file for a Helm chart. This configuration uses Spring Boot's Actuator endpoints, which are a developer-friendly way to expose health check information.

```yaml
# values.yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3
  timeoutSeconds: 2

readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 3
  timeoutSeconds: 2
```

Here's a breakdown of the key parameters, which apply to both probe types:

* **`httpGet`**: This is one of the three available probe types (the others are `tcpSocket` and `exec`). It tells the Kubelet to perform an HTTP `GET` request.
* **`path`**: The specific URL path on the container to check. The Spring Boot Actuator exposes dedicated endpoints (`/actuator/health/liveness` and `/actuator/health/readiness`), which is a great practice.
* **`port`**: The port number the request is sent to.
* **`initialDelaySeconds`**: The number of seconds Kubernetes should wait after the container starts before performing the **first** probe. This gives your application time to initialize, preventing false failures during startup.
* **`periodSeconds`**: The frequency of the probe. Kubernetes will execute this check every `10` seconds for the liveness probe and every `5` seconds for the readiness probe.
* **`failureThreshold`**: The number of consecutive failures before Kubernetes takes action (restarting for a liveness probe, or removing from service endpoints for a readiness probe).
* **`timeoutSeconds`**: The maximum duration in seconds that the probe is allowed to take. If the endpoint doesn't respond within this timeframe, the probe is considered a failure.

## Key Differences at a Glance

| Feature           | Liveness Probe                                | Readiness Probe                                    |
| ----------------- | --------------------------------------------- | -------------------------------------------------- |
| **Primary Goal** | Detect if the app is **alive** but stuck.     | Detect if the app is **ready** to serve traffic.   |
| **Consequence** | Container is **restarted**.                   | Pod is **removed** from the Service's endpoint list. |
| **Use Case** | Recover from deadlocks or unrecoverable states. | Gracefully handle startup delays and zero-downtime deployments. |
| **Best Practice** | A lightweight check for basic app health.       | A deeper check, potentially verifying dependencies. |

## Best Practices for Developers

- **Use Different Endpoints**: As the example shows, it's a best practice to have distinct endpoints. Your liveness probe can be a simple, lightweight check that just confirms the application is responsive. Your readiness probe, however, can be more robust, including checks for database connectivity, cache availability, or other external services your application depends on.
- **Tune Your Delays and Thresholds**: There's no one-size-fits-all.
    - Set **`initialDelaySeconds`** based on your application's typical startup time. Too short, and you'll get false failures; too long, and your application will be unavailable longer than necessary.
    - Adjust **`periodSeconds`** and **`failureThreshold`** to balance responsiveness with tolerance for temporary glitches. A shorter `periodSeconds` detects issues faster, but a lower `failureThreshold` might cause unnecessary restarts.
- **Keep Probes Lightweight**: Remember, these probes run constantly. The endpoints they hit should be fast and consume minimal resources to avoid adding overhead to your application.
- **Start Simple**: For development or simple applications, a single `/health` endpoint might be sufficient for both probes. As your application grows more complex, consider separating them for more granular control.

By thoughtfully implementing liveness and readiness probes, you're not just adding a configuration; you're building a resilient, self-healing system that can automatically manage its own health and ensure a smooth, reliable experience for your users.