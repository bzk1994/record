## 解决 github 访问、克隆慢的问题

### 查看对应网址
一般 `github` 下载慢主要是静态资源加载慢，静态资源网站域名解析有问题
我们可以通过打开 `Safari` 浏览器的查看元素 => 网络，查看资源加载情况

![资源加载]()

我们可以看到 静态资源基本都是通过 `assets-cdn.github.com` 这个网址加载

下面这几个都是用加载用户等头像的

`avatars0.githubusercontent.com`
`avatars1.githubusercontent.com`
`avatars2.githubusercontent.com`
`avatars3.githubusercontent.com`

还有一种情况就是我们 `clone` 项目的时候下载速度慢
`clone` 的时候会通过 `global-ssl.fastly.net`这个网址

我们可以修改 `hosts` 文件来映射ID地址

`hosts` 将网址域名与其对应的IP地址建立关联
当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从 `Hosts` 文件中寻找对应的 `IP` 地址，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交 `DNS` 域名解析服务器进行 `IP` 地址的解析

### DNS查询
可以通过下面两个网站进行 DNS查询

[站长工具 Dns查询](http://tool.chinaz.com/dns)

[ipaddress Dns查询](https://www.ipaddress.com/)

查询完成后 网址与对应 `IP` 地址保存到临时文件中

```
## github
151.101.24.133  assets-cdn.github.com
151.101.72.133  avatars0.githubusercontent.com
151.101.72.133  avatars1.githubusercontent.com
151.101.196.133 avatars3.githubusercontent.com
151.101.12.133  github.global.ssl.fastly.net
```

### 保存 hosts

首先运行 `sudo vi /etc/hosts`
按 `i` 进入编辑模式
光标移动复制粘贴，然后 `esc` 退出编辑模式
`shift + :` 输入 `wq` 回车保存退出即可
