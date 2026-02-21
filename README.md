# login_site

一个基于 Nginx 的轻量级登录站点，使用 Docker 部署。

## 项目结构

```
├── Dockerfile        # Docker 镜像构建文件
├── nginx.conf        # Nginx 配置
└── site/             # 静态页面
    ├── index.html          # 登录页
    ├── forgot-password.html # 忘记密码
    ├── status.html         # 状态页
    ├── privacy.html        # 隐私政策
    └── terms.html          # 服务条款
```

## 部署

```bash
# 构建镜像
docker build -t login_site .

# 运行
docker run -d -p 80:80 login_site
```
