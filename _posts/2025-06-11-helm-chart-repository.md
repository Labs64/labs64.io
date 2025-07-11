---
layout: post
title: "Inside the labs64.io-helm-charts repository"
description: "Explore the labs64.io-helm-charts repo architecture. A guide to its modular design, library charts, and automated deployment of microservices on Kubernetes"
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/labs64io-helm-charts.png
tags:
  - Kubernetes
  - Helm
  - Charts
  - Chart Repository
  - DevOps
  - CI/CD
  - Deployment
---

The labs64.io-helm-charts repository is a curated collection of Helm charts aimed at deploying Labs64.IO microservices and their supporting infrastructure.
Built with modularity, maintainability, and DevOps automation in mind, it offers a reusable, scalable Kubernetes deployment system for both internal and third-party applications.

## Repository Structure Overview

```
labs64.io-helm-charts/
├── charts/
│   ├── api-gateway/
│   ├── auditflow/
│   ├── <other-modules>/
│   ├── chart-libs/
│   └── third-party/
│       ├── kafka/
│       ├── opensearch/
│       ├── grafana/
│       └── ...
├── justfile                  # Task automation with `just`
```

Let’s walk through the key components in more detail.

## Application Charts

Each application (e.g. api-gateway, auditflow) is encapsulated as an independent Helm chart (`charts/api-gateway`, `charts/auditflow`) following standard Helm conventions:

Key Files:
- `Chart.yaml`: Chart metadata, including name, version, and dependencies
- `values.yaml`: Default configuration values used during deployment
- `templates/`: Kubernetes manifests written as Go templates
- `charts/`: Stores packaged chart dependencies, such as shared libraries

**🔍 Example: AuditFlow Configuration (from values.yaml)**

```yaml
auditflow:
    pipeline:
        name: 'logs'
        enabled: true
        transformer:
        container: true
        processors:
          - name: 'zero'
            processor: 'logging_processor'
            clazz: 'io.labs64.audit.processors.LoggingProcessor'
            properties:
            level: 'DEBUG'
```

This snippet configures a sidecar-based transformer pipeline for audit logs, with chained processors to log, transform, and forward data to the log, OpenSearch or Loki.

**🧠 Pro Tip:** This design lets you define complex data flows directly in `values.yaml`, without modifying templates.

## Library Chart

The `chart-libs` directory contains a Helm library chart, designed for template reuse. It doesn’t deploy anything by itself but provides standard templates and helper functions.

Common Functions:
- `_deployment.tpl`: Standard Deployment spec
- `_helpers.tpl`: Reusable template functions for labels, selectors, and naming conventions
- `_utils.tpl`: Utility functions for common operations like generating resource names

**How it’s used:**

```yaml
dependencies:
- name: chart-libs
  repository: file://../chart-libs
```

Template call example:

```
{{- include "chart-libs.deployment" . }}
```

This approach helps you:
- Eliminate repetition
- Standardize helm chart deployments
- Implement upgrades platform-wide by updating a single library

## Third-Party Dependencies

Labs64.IO bundles common third-party services as Helm charts at `charts/third-party/`, pre-configured for seamless integration:

Included Services:
- `ingress-nginx` - K8S Ingress Controller
- `metrics-server` - Kubernetes Metrics Server
- `otel` - OpenTelemetry Collector
- `alloy` -  Grafana Alloy for observability
- `grafana` - Grafana for dashboards
- `loki` - Loki for log aggregation
- `prometheus` - Prometheus for metrics
- `tempo` - Tempo for distributed tracing
- `opensearch` - OpenSearch for search and analytics
- `rabbitmq` - RabbitMQ for message brokering
- `kafka` - Kafka for event streaming

This enables end-to-end deployment of the full observability and data processing stack within a single Helm repo.

## Key Benefits of This Structure

This Helm chart architecture provides several advantages for Labs64.IO Ecosystem developers and users:

- **Modularity** - Each service is self-contained but shares core logic via the library chart
- **Maintainability** - Updates to chart-libs propagate to all apps
- **Observability** - Native support for audit, metrics, and logging systems like Loki, Prometheus
- **Consistency** - Uniform naming, labels, and resource specs
- **Dev Friendly** - Clear structure, templated configs, automation via just


## Quick Start for Developers

### Clone the repo

```bash
git clone https://github.com/Labs64/labs64.io-helm-charts.git
cd labs64.io-helm-charts
```

### Inspect charts

```bash
helm template charts/auditflow -f values.yaml
```

### Deploy using Just

```
just helm-install-all
```

## Conclusion

The *labs64.io-helm-charts* repository showcases a thoughtful Helm chart architecture tailored for microservice ecosystems. Its reusable patterns, declarative config style, and full-stack bundling make it an excellent foundation for scalable Kubernetes operations at *Labs64.IO Ecosystem* and beyond.
Visit the [labs64.io-helm-charts repository](https://github.com/Labs64/labs64.io-helm-charts){:target="_blank"}{:rel="noopener nofollow"} to explore the charts and contribute to the ecosystem.