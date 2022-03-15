## 简介

Gitlab是一个用于仓库管理系统的开源项目，使用git作为代码管理工具并在此基础伤搭建起来的web服务。



GitLab和Github一样属于第三方基于git开发的作品，免费且开源（基于Mit协议），与gitthub类似，可以注册用户，任意提交你的代码，添加SSHKey等等。不同的是，GitLab是可以部署到自己的服务器，数据库等一切西悉尼掌握在自己手上，适合团队内部协作开发。

## GitLab安装

官网：https://about.gitlab.com/

1. 安装相关依赖

   ~~~shell
   yum -y install policycoreutils openssh-server openssh-clients postfix
   ~~~

2. 启动ssh服务&设置为开机启动

   ~~~shell
   systemctl enable sshd && sudo systemctl start sshd
   ~~~

3. 设置postfix开机自启，并启动，postfix支持gitlab发信功能

   ~~~shell
   systemctl enable postfix && systemctl start postfix
   ~~~

4. 开启ssh以及http服务，然后重新加载防火窗列表

   ~~~shell
   firewall-cmd --add-service=ssh --parmanent
   firewall-cmd --add-service=http --parmanent
   firewall-cmd --reload
   ~~~

   如果关闭防火窗，则不需要执行上面的操作

5. 下载gitlab包，并安装

   > 在线下载安装包：
   >
   > wegt https://mirrors.tuan.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x86_64.rpm
   >
   > 安装：
   >
   > rpm -i gitlab-ce-12.4.2-ce.0.el6.x86_64.rpm
   
6. 修改gitlab配置

   > vi /etc/gitlab/gitlab.rb

   修改gitlab的访问地址和端口，默认是80（不建议使用）

   external_url 'http://127.0.0.1:9090'

   nginx['listen_port']=9090

7. 重载配置和启动

   >gitlab-ctl reconfigure
   >
   >gitlab-ctl resart

8. 把端口添加到防火墙

   >firewall-cmd --zone=public --add-port=9090/tcp-permanent
   >
   >firewall-cmd --reload

