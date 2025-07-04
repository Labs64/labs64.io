---
layout: post
title: "Kubernetes (K8s) Cheatsheet"
description: "A quick reference for common Kubernetes commands, concepts, and YAML configurations."
author:
  name: Labs64.IO Ecosystem
  url: https://labs64.io
image:
  url: /img/blog/kubernetes-cheatsheet.png
tags:
  - Kubernetes
  - K8s
  - Cheatsheet
  - Development
  - Local Setup
  - Guide
---

This cheatsheet provides a quick reference for common Kubernetes commands, concepts, and YAML configurations. It's designed to help developers navigate their local and remote Kubernetes clusters efficiently.

## Basic Kubernetes Concepts

* **Cluster:** A set of worker machines, called **Nodes**, that run containerized applications.
* **Node:** A worker machine (VM or physical) in a Kubernetes cluster.
* **Pod:** The smallest deployable unit in Kubernetes. A Pod encapsulates one or more containers, storage resources, a unique network IP, and options that control how the container(s) run.
* **Deployment:** A kind that manages a replicated application. It ensures a specified number of Pod replicas are running and handles updates, rollbacks, and scaling.
* **Service:** An abstract way to expose an application running on a set of Pods as a network service.
* **Namespace:** A way to divide cluster resources among multiple users or teams.
* **ConfigMap:** Used to store non-confidential data in key-value pairs.
* **Secret:** Similar to ConfigMap, but designed for sensitive data (e.g., passwords, API keys).
* **PersistentVolume (PV):** A piece of storage in the cluster provisioned by an administrator.
* **PersistentVolumeClaim (PVC):** A request for storage by a user that consumes PV resources.
* **Ingress:** A kind that manages external access to services in a cluster, typically HTTP.

---

## `kubectl` Basics

`kubectl` is the primary command-line tool for interacting with Kubernetes.

| Command | Description |
| :---------------------------------------- | :----------------------------------------------------------------------------------------- |
| `kubectl get <resource>` | List resources (e.g., pods, deployments, services, nodes, ns). |
| `kubectl describe <resource> <name>` | Show detailed information about a specific resource. |
| `kubectl create -f <file.yaml>` | Create a resource from a YAML file (fails if resource exists). |
| `kubectl apply -f <file.yaml>` | Apply or update a resource defined in a YAML file. |
| `kubectl delete <resource> <name>` | Delete a specific resource by type and name. |
| `kubectl logs <pod-name>` | Print the logs for a container in a pod. |
| `kubectl logs -f <pod-name>` | Stream (follow) logs for a container in a pod. |
| `kubectl exec -it <pod-name> -- <command>` | Execute a command inside a container (e.g., `bash`). |
| `kubectl port-forward <pod-name> <local-port>:<container-port>` | Forward a local port to a port on a pod. |
| `kubectl config use-context <context-name>` | Switch between different Kubernetes clusters/contexts. |
| `kubectl config get-contexts` | List available contexts. |
| `kubectl config current-context` | Display the current context. |
| `kubectl explain <resource>` | Get documentation for a resource type. |
| `kubectl top pod` | Display resource (CPU/Memory) usage for pods. (Requires Metrics Server) |
| `kubectl top node` | Display resource (CPU/Memory) usage for nodes. (Requires Metrics Server) |

---

## Deployments

Manages the lifecycle of your application Pods.

### Common Commands:

* **Create a deployment:**
    ```bash
    kubectl create deployment my-app --image=my-docker-repo/my-app:1.0
    ```
* **Scale a deployment:**
    ```bash
    kubectl scale deployment my-app --replicas=3
    ```
* **Update image:**
    ```bash
    kubectl set image deployment/my-app my-app=my-docker-repo/my-app:2.0
    ```
* **Rollback to previous revision:**
    ```bash
    kubectl rollout undo deployment/my-app
    ```
* **Check rollout status:**
    ```bash
    kubectl rollout status deployment/my-app
    ```
* **View rollout history:**
    ```bash
    kubectl rollout history deployment/my-app
    ```

### Example YAML (`deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
  labels:
    app: my-web-app
spec:
  replicas: 3 # Desired number of Pods
  selector:
    matchLabels:
      app: my-web-app
  template:
    metadata:
      labels:
        app: my-web-app
    spec:
      containers:
        - name: my-web-container
          image: nginx:latest # Replace with your image
          ports:
            - containerPort: 80
          env: # Environment variables
            - name: MY_ENV_VAR
              value: "hello"
          resources: # Resource requests and limits
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
````

-----

## Services

Exposing your applications.

### Common Commands:

* **Expose a deployment (NodePort):**
  ```bash
  kubectl expose deployment my-web-app --type=NodePort --port=80 --target-port=80
  ```
* **Get service URL (Minikube specific):**
  ```bash
  minikube service my-web-app --url
  ```

### Example YAML (`service.yaml`):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-web-service
spec:
  selector:
    app: my-web-app # Selects Pods with this label
  ports:
    - protocol: TCP
      port: 80 # Port exposed by the Service
      targetPort: 80 # Port on the Pod the Service forwards to
      nodePort: 30080 # Optional: Specific NodePort (must be in 30000-32767 range)
  type: NodePort # Or ClusterIP, LoadBalancer, ExternalName
```

-----

## Pods

The smallest deployable unit.

### Common Commands:

* **Get all pods:**
  ```bash
  kubectl get pods
  ```
* **Get pods with wide output (more details):**
  ```bash
  kubectl get pods -o wide
  ```
* **Describe a specific pod:**
  ```bash
  kubectl describe pod my-web-app-xxxxx-yyyyy
  ```
* **Delete a pod (will be recreated by Deployment):**
  ```bash
  kubectl delete pod my-web-app-xxxxx-yyyyy
  ```

-----

## Configuration (ConfigMaps & Secrets)

Storing configuration and sensitive data.

### ConfigMap Example (`configmap.yaml`):

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  APP_COLOR: blue
  APP_MESSAGE: "Welcome to Labs64.IO!"
```

### Using in Deployment:

```yaml
# ... inside spec.template.spec.containers
        envFrom:
        - configMapRef:
            name: my-app-config
# OR
        env:
        - name: APP_COLOR
          valueFrom:
            configMapKeyRef:
              name: my-app-config
              key: APP_COLOR
```

### Secret Example (`secret.yaml`):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-db-secret
type: Opaque
data:
  DB_USERNAME: YWRtaW4= # base64 encoded "admin"
  DB_PASSWORD: c2VjcmV0 # base64 encoded "secret"
```

To base64 encode a string: `echo -n "your_string" | base64`

### Using in Deployment:

```yaml
# ... inside spec.template.spec.containers
        envFrom:
        - secretRef:
            name: my-db-secret
# OR
        env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: my-db-secret
              key: DB_PASSWORD
```

-----

## Storage (Persistent Volumes & Claims)

Managing persistent data.

### PersistentVolume (PV) Example (`pv.yaml`):

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce # Can be mounted as read-write by a single Node
  hostPath: # For local development, use hostPath. In production, use cloud-specific storage.
    path: "/mnt/data"
```

### PersistentVolumeClaim (PVC) Example (`pvc.yaml`):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

### Using PVC in Deployment:

```yaml
# ... inside spec.template.spec
      volumes:
      - name: my-storage
        persistentVolumeClaim:
          claimName: my-pvc
      containers:
      - name: my-app-container
        image: my-app:latest
        volumeMounts:
        - name: my-storage
          mountPath: "/app/data" # Path inside the container
```

-----

## Networking (Ingress)

External access to multiple services via a single entry point. Requires an Ingress Controller (e.g., Nginx Ingress Controller).

### Ingress Example (`ingress.yaml`):

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
spec:
  rules:
    - host: myapp.example.com # Your custom domain
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-web-service # Name of your Service
                port:
                  number: 80 # Port of your Service
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-api-service
                port:
                  number: 8080
```

-----

## Troubleshooting & Debugging

| Command | Description |
| :---------------------------------------------- | :------------------------------------------------------------------------------- |
| `kubectl get events` | View recent cluster events (useful for debugging why pods aren't starting). |
| `kubectl describe pod <pod-name>` | Check for events, conditions, and container status. |
| `kubectl logs <pod-name> -c <container-name>` | Get logs from a specific container within a multi-container pod. |
| `kubectl exec -it <pod-name> -- bash` | Get a shell inside a running container. |
| `kubectl get pods --show-labels` | See labels on pods, useful for selector debugging. |
| `kubectl get all` | Get all common resources in the current namespace. |
| `kubectl get all -A` | Get all common resources in all namespaces. |
| `kubectl get --raw "/apis/metrics.k8s.io/v1beta1/pods"` | Get raw metrics data (if Metrics Server is installed). |

-----

## Useful Commands & Tips

* **Short names for resources:** `po` (pods), `svc` (services), `deploy` (deployments), `cm` (configmaps), `sec` (secrets), `ns` (namespaces).
   * `kubectl get po` is equivalent to `kubectl get pods`.
* **Output formats:**
  ```bash
  kubectl get pods -o yaml
  kubectl get pods -o json
  kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase
  ```
* **Filter with labels:**
  ```bash
  kubectl get pods -l app=my-web-app
  ```
* **Filter with field selectors:**
  ```bash
  kubectl get pods --field-selector status.phase=Running
  ```
* **Dry run:** Test a command without actually executing it.
  ```bash
  kubectl apply -f deployment.yaml --dry-run
  ```
* **Force delete (use with caution\!):**
  ```bash
  kubectl delete pod <pod-name> --force --grace-period=0
  ```
