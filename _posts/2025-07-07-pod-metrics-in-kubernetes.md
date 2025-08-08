---
layout: post
title: "Observing Pod Metrics in Kubernetes"
description: "Guide to monitor Kubernetes pod metrics using metrics-server for resource optimization, autoscaling, and troubleshooting"
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/pod-metrics-in-kubernetes.jpg
tags:
  - Helm
  - Kubernetes
  - Observability
  - Metrics
  - Monitoring
  - metrics-server
  - Pod Metrics
  - Resource Utilization
  - Autoscaling
  - Troubleshooting
---

In the dynamic and often complex world of Kubernetes, effectively monitoring the resource utilization of your pods is crucial for maintaining application performance, optimizing resource allocation, and troubleshooting issues. While Kubernetes offers powerful orchestration capabilities, gaining insight into CPU and memory usage at the pod level isn't inherently built into the core API. This is where `metrics-server` steps in as an indispensable component, providing the necessary data for a comprehensive observability strategy.

## The Challenge of Pod Metric Collection in Kubernetes

Out-of-the-box, the Kubernetes API does not expose raw CPU and memory usage directly. While you can see if a pod is running and its status, getting real-time, granular resource consumption data requires an additional layer. This data is vital for:

* **Autoscaling:** Horizontal Pod Autoscalers (HPAs) rely on CPU and memory metrics to automatically scale the number of pod replicas up or down based on demand.
* **Scheduling:** The Kubernetes scheduler can make more informed decisions when it has an understanding of current node and pod resource pressure.
* **Troubleshooting:** Identifying resource bottlenecks, memory leaks, or CPU-intensive processes within specific pods is significantly easier with accurate metrics.
* **Capacity Planning:** Understanding historical resource usage helps in forecasting future needs and optimizing cluster size.

## Enter `metrics-server`: The De Facto Solution

`metrics-server` is a cluster-wide aggregator of resource usage data. It collects CPU and memory metrics from the Kubelets running on each node and exposes them via the Kubernetes Metrics API. This makes these crucial metrics consumable by various Kubernetes components and tools.

**How it Works:**

1.  **Kubelet Integration:** Each Kubelet on a node exposes resource metrics for its running pods.
2.  **`metrics-server` Collection:** `metrics-server` periodically scrapes these endpoints from all Kubelets in the cluster.
3.  **Aggregation and Storage (in-memory):** It aggregates the collected data and stores it in memory, typically for a short duration (e.g., a few minutes). `metrics-server` is designed for short-term, real-time data access, not long-term storage or historical analysis.
4.  **Metrics API Exposure:** The aggregated data is then exposed through the standard Kubernetes Metrics API (e.g., `/apis/metrics.k8s.io/v1beta1`).

## Key Benefits of `metrics-server` for Pod Observability

* **Enables Horizontal Pod Autoscaling (HPA):** This is perhaps the most critical function. HPAs query the Metrics API provided by `metrics-server` to determine if pods need to be scaled. Without `metrics-server`, HPAs based on CPU or memory utilization simply won't work.
* **`kubectl top` Functionality:** The popular `kubectl top pod` and `kubectl top node` commands, which provide a quick overview of resource usage, directly rely on `metrics-server` to fetch their data. This offers immediate insight into the current state of your cluster's resource consumption.
* **Simplified Integration for Other Tools:** Because `metrics-server` exposes metrics via a standard Kubernetes API, it simplifies integration for other monitoring and management tools that need pod-level resource data. Instead of each tool needing to directly scrape Kubelets, they can simply query the Metrics API.
* **Lightweight and Efficient:** `metrics-server` is designed to be lightweight and consume minimal resources itself, making it a low-overhead addition to your cluster.
* **Core Kubernetes Ecosystem Component:** It's considered a fundamental component for any production-ready Kubernetes cluster that requires resource-based autoscaling or basic `kubectl top` functionality.

## Installation and Usage

`metrics-server` is typically deployed as a set of pods within your Kubernetes cluster. Installation is straightforward, often involving applying a few YAML manifests or using Helm charts.
Many managed Kubernetes services (like GKE, EKS, AKS) may include `metrics-server` by default or offer it as an easy-to-enable add-on.

Below is a common approach to deploying `metrics-server` using Helm:
```bash
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm search repo metrics-server/metrics-server
helm upgrade --install metrics-server metrics-server/metrics-server --namespace tools --create-namespace
```

### Immediate Impact: kubectl top Before and After

One of the most immediate and tangible benefits of `metrics-server` is its impact on the `kubectl top` command:

```bash
kubectl top pods -n <your-namespace>
kubectl top nodes
```

Without `metrics-server` running, `kubectl top` simply cannot retrieve resource metrics.
Once `metrics-server` is deployed and operational, the resource columns become populated, offering instant insights into your pod's consumption.

### Pods metrics before installing metrics-server

```
┌────────────────────────────────────── pods(labs64io)[3] ───────────────────────┐
│ NAME↑                                  READY      STATUS        RESTARTS IP    │
│ labs64io-api-gateway-567c5dc67-pmp2n   1/1        Running       5 10.1.12.164  │
│ labs64io-auditflow-799455476c-w4xnh    2/2        Running       10 10.1.12.162 │
│ labs64io-ecommerce-577ddc46c-2l7hz     1/1        Running       5 10.1.12.154  │
```

Notice the absence of CPU and Memory columns.

### Pods metrics after installing metrics-server

```
┌─────────────────────────────────────────────────────────────── pods(labs64io)[3] ──────────────────────────────────────────────────┐
│ NAME↑                                  READY    STATUS     RESTARTS    CPU    MEM     %CPU/R     %CPU/L     %MEM/R     %MEM/L IP   │
│ api-gateway-567c5dc67-pmp2n   1/1      Running           5      7    338          7        n/a         66        n/a 10.1.12.164   │
│ auditflow-799455476c-w4xnh    2/2      Running          10      8    384          8        n/a         75        n/a 10.1.12.162   │
│ ecommerce-577ddc46c-2l7hz     1/1      Running           5      7    368          7        n/a         72        n/a 10.1.12.154   │
```

The `CPU` and `MEM` columns (along with their percentage counterparts relative to requests/limits) are now populated, providing immediate visibility into resource consumption at a glance. This transformation underscores the critical role metrics-server plays in making these metrics accessible.

## Limitations and When to Consider More Advanced Solutions

While `metrics-server` is excellent for its intended purpose, it's important to understand its limitations:

* **No Long-Term Storage:** `metrics-server` does not store historical data. It's a real-time aggregator for current resource usage.
* **Limited Metric Types:** It focuses primarily on CPU and memory utilization. For custom metrics, application-specific metrics, or more detailed system-level metrics, you'll need a full-fledged monitoring solution.
* **No Alerting Capabilities:** `metrics-server` itself doesn't provide alerting. You'll need an external system (like Prometheus and Alertmanager) to trigger alerts based on the metrics it exposes.

For comprehensive monitoring, historical analysis, custom dashboards, and robust alerting, `metrics-server` is often used in conjunction with a more complete monitoring stack like:

* **Prometheus:** A powerful open-source monitoring system that can scrape metrics from `metrics-server` (and other sources), store them long-term, and provide a query language (PromQL) for analysis.
* **Grafana:** A popular open-source platform for creating dynamic and interactive dashboards to visualize metrics collected by Prometheus or other data sources.

## Conclusion

`metrics-server` is a foundational component for observing pod metrics in Kubernetes. By providing a standardized and easily consumable API for CPU and memory usage, it enables crucial features like Horizontal Pod Autoscaling and the convenient `kubectl top` command. While not a complete monitoring solution on its own, it serves as a vital building block, empowering operators and developers with the essential resource insights needed to effectively manage and scale their Kubernetes workloads. Without `metrics-server`, the journey to a truly observable and efficient Kubernetes cluster would be significantly more challenging.
