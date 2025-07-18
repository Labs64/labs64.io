---
layout: post
title: "Automated Helm Chart Documentation and Schema Generation"
description: "A guide to automating Helm chart documentation and schema validation with helm-docs and helm-schema, using practical examples to improve your workflow."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/labs64io-helm-schema-generation.jpg
tags:
  - Helm
  - Kubernetes
  - Automation
  - Documentation
  - Schema
  - CI/CD
  - DevOps
  - Tools
---

As developers working with Kubernetes, Helm charts are indispensable for packaging and deploying applications. However, maintaining up-to-date documentation and ensuring valid `values.yaml` files can be a tedious and error-prone process. This article introduces two powerful tools that can automate these tasks, making your Helm chart development more efficient and developer-friendly: `helm-docs` for documentation generation and `helm schema` for JSON schema generation and validation.

We'll demonstrate how to integrate these tools into your development workflow with practical examples, focusing on a typical setup.

## Why Automate Helm Chart Documentation and Schema Generation?

Automating Helm chart documentation and JSON schema generation offers several benefits:

* **Improved Collaboration:** Clear, automatically generated documentation helps team members quickly understand chart configurations and usage.
* **Reduced Errors:** JSON schema validation catches misconfigurations in `values.yaml` early in the development cycle, preventing deployment issues.
* **Time Savings:** Automating these repetitive tasks frees up developers to focus on core development.
* **Consistency:** Ensures a standardized approach to documentation and value file structure across your charts.

## Generating Helm Chart Documentation with `helm-docs`

`helm-docs` is a fantastic tool that automatically generates markdown documentation from your Helm chart's `values.yaml` file, `Chart.yaml`, and `_helpers.tpl` files. It creates a `README.md` file (or updates an existing one) with tables of values, their descriptions, and default values.

### Installation

`helm-docs` is typically used as a Docker image, which simplifies its usage and avoids local installation complexities.

### Usage Example

Let's assume you have a [Helm charts](/blog/2025/06/11/helm-chart-repository/) located in `./charts/` folder. You can generate documentation for these charts using the following command:

```bash
docker run --rm --volume "$(pwd):/helm-docs" -u $(id -u) jnorwood/helm-docs:latest
```

**Explanation:**

- `docker run --rm`: runs the `jnorwood/helm-docs:latest` Docker image. `--rm` ensures the container is removed after execution.
- `--volume "$(pwd):/helm-docs"`: mounts your current working directory (where your chart is located) into the `/helm-docs` directory inside the container. This is crucial for `helm-docs` to find your chart files.
- `-u $(id -u)`: Runs the Docker container with your current user's UID. This prevents permission issues with the generated `README.md` file.

You can simply run this command from your project root, and `helm-docs` will automatically generate or update the `README.md` file within each of your Helm chart directories.

## Generating Helm Values JSON Schema with `helm schema`

`helm schema` is a Helm plugin that helps you generate and validate JSON schemas for your Helm chart's `values.yaml` files. This is invaluable for ensuring that your `values.yaml` adheres to a predefined structure, making your charts more robust and user-friendly.

### Installation

First, you need to install the `helm schema` plugin:

```bash
helm plugin install https://github.com/ludwigprandtl/helm-schema
```

### Usage Example

Similarly, you can add a `generate-schema` target to your CI pipelines to automate the schema generation:

```bash
helm schema -input charts/api-gateway/values.yaml -output charts/api-gateway/values.schema.json
helm schema -input charts/auditflow/values.yaml -output charts/auditflow/values.schema.json
```

**Explanation:**

* `helm schema --input charts/api-gateway/values.yaml`: Specifies the `values.yaml` file from which to infer the JSON schema.
* `--output charts/api-gateway/values.schema.json`: Defines the output path for the generated JSON schema file.

Now, running the above commands you will get created `values.schema.json` files for your specified charts. This schema can then be used by IDEs (like *VS Code* with the YAML extension) for auto-completion and validation, or by CI/CD pipelines to ensure `values.yaml` files are correctly structured before deployment.

## Enhancing Your Workflow

### Pre-commit Hooks

To ensure that documentation and schemas are always up-to-date, consider integrating these commands above into your Git pre-commit hooks using tools like `pre-commit`. This will automatically run the generation commands before every commit, preventing outdated files from being committed to your repository.

### CI/CD Integration

For a robust CI/CD pipeline, you can includedocumentation and schema generation commands as part of your build or test stages. This ensures that your documentation and schemas are consistently generated and validated with every code change.

## Conclusion

Automating Helm chart documentation and JSON schema generation significantly improves the developer experience, enhances collaboration, and reduces errors. By integrating `helm-docs` and `helm schema` into your development workflow, you can ensure that your Helm charts are always well-documented, properly structured, and ready for deployment. Embrace these tools to streamline your Helm chart development and focus on building great applications!
