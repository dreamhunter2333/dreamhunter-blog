---
title: 安装 k3s + ingress nginx + cert-manager, 从 AKS 迁移到 k3s
date: '2024-07-20 10:49:14'
categories:
    - k8s
tags:
    - k8s
    - k3s
---

# 安装 k3s + ingress nginx + cert-manager

## 为什么要迁移到 K3s

之前一直在 Azure 上使用 AKS，随着 k8s 的更新，资源占用越来越大。

而且我是 `单节点` 部署自己的一些个人服务，不需要高可用，所以决定自建 k3s。

## 安装 k3s

首先准备一台服务器，我使用的是 Azure 的 VM，系统 `Ubuntu noble 24.04 x86_64`。

这里我选择了禁用 `traefik` 和 `servicelb`，

使用 `ingress-nginx` 的 `hostNetwork` + `DaemonSet` 模式作为集群的负载均衡。

::: details 为什么不使用 `traefik` 和 `servicelb`
`traefik` 和 `servicelb` 是 k3s 默认的负载均衡方案

但是在使用 `azureVM` 的时候, 默认的 `servicelb` 无法传递真实的 `clientIP`

而 `traefik` 运行在 `hostNetwork` 模式下时无法自动获取 `cert` 证书

所以我选择了 `ingress-nginx` 和 `cert-manager`,
`ingress-nginx` 可以通过 `hostNetwork` 模式获取真实的 `clientIP`,
`cert-manager` 可以自动获取 `cert` 证书
:::

```bash
curl -sfL https://get.k3s.io | sh -s - --node-external-ip vm外网ip --disable traefik --disable servicelb
```

## 安装 ingress-nginx

使用 terraform helm 安装 `ingress-nginx`, `DaemonSet` 模式

参考 [terraform helm](https://registry.terraform.io/providers/hashicorp/helm/latest/docs)

::: details 点我查看代码

```hcl
data "azurerm_public_ip" "azure_vm_k3s_publicip" {
  name                = "azure_vm_k3s_publicip"
  resource_group_name = "azure_vm_k3s_rg"
}

resource "helm_release" "nginx_ingress" {
  name             = "ingress-nginx"
  namespace        = "ingress"
  create_namespace = true
  wait             = true
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"

  set {
    name  = "controller.replicaCount"
    value = "1"
  }
  set {
    name  = "controller.hostNetwork"
    value = "true"
  }
  set {
    name  = "controller.kind"
    value = "DaemonSet"
  }
  set {
    name  = "controller.service"
    value = "false"
  }
  set {
    name  = "controller.config.compute-full-forwarded-for"
    value = "true"
  }
  set {
    name  = "controller.config.enable-underscores-in-headers"
    value = "true"
  }
  set {
    name  = "controller.config.use-forwarded-headers"
    value = "true"
  }
  set {
    name  = "controller.config.enable-real-ip"
    value = "true"
  }
}
```

:::

## 安装 cert-manager

使用 terraform helm 安装 `cert-manager`

> [!NOTE] 参考
>
> - [terraform helm](https://registry.terraform.io/providers/hashicorp/helm/latest/docs)

::: details 点我查看代码

```hcl
resource "helm_release" "cert" {
  name       = "cert-manager"
  namespace  = "ingress"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  wait       = true
  depends_on = [helm_release.nginx_ingress]
  set {
    name  = "prometheus.enabled"
    value = "false"
  }
  set {
    name  = "installCRDs"
    value = "true"
  }
}
```

:::

## 配置 letsencrypt dns01

使用 `cert-manager` 配置 `letsencrypt` 的 `dns01` 验证方式

> [!NOTE] 参考
>
> - [cert-manager dns01](https://cert-manager.io/docs/configuration/acme/dns01/)
> - [terraform kubernetes](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)

::: details 点我查看代码

```hcl
resource "kubernetes_secret" "cloudflare_api_token" {
  metadata {
    name      = "cloudflare-api-token-secret"
    namespace = "ingress"
  }

  data = {
    "api-token" = var.cloudflare_api_token
  }
}

resource "kubernetes_manifest" "clusterissuer_letsencrypt_prod" {
  manifest = yamldecode(file("${path.module}/letsencrypt-issuer.tpl.yaml"))
}
```

`letsencrypt-issuer.tpl.yaml`

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: "letsencrypt-dns01"
spec:
  acme:
    email: "xxx@xxx.com"
    server: "https://acme-v02.api.letsencrypt.org/directory"
    privateKeySecretRef:
      name: "letsencrypt-dns01"
    solvers:
      - http01:
          ingress:
            class: nginx
      - dns01:
          cloudflare:
            email: "xxx@xxx.com"
            apiTokenSecretRef:
              name: "cloudflare-api-token-secret"
              key: "api-token"
```

:::

## 部署应用

在 `helm` 添加 `ingress` 模板配置，并在 `values.yaml` 中配置 `ingress`

::: details 点我查看代码

`templates/ingress.yaml`

```yaml
{{- if .Values.ingress.enabled -}}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: "{{ .Values.name }}-ingress"
  annotations:
    {{- toYaml .Values.ingress.annotations | nindent 4 }}
spec:
  {{- if .Values.ingress.tls }}
  tls:
    {{- range .Values.ingress.tls }}
    - hosts:
        {{- range .hosts }}
        - {{ . | quote }}
        {{- end }}
      secretName: {{ .secretName }}
    {{- end }}
  {{- end }}
  rules:
    {{- range .Values.ingress.hosts }}
    - host: {{ .host | quote }}
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: {{ .serviceName }}
                port:
                  number: {{ .portNumber }}
    {{- end }}
{{- end }}
```

`values.yaml`, 这里配置了泛域名证书

```yaml
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-dns01
  hosts:
    - host: whoami.xxx.xxx
      serviceName: whoami
      portNumber: 80
  tls:
    - hosts:
        - "*..xxx.xxx"
      secretName: tls-secret-wild-xxx
```

:::

然后就可以部署应用到 `k3s` 集群

```bash
helm upgrade --install whoami .
```

然后就可以愉快访问你的应用了。
