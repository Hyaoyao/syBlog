# VMware虚拟机之Linux虚拟机安装

## 下载linux系统镜像源

下载地址：http://mirrors.163.com/centos/

## 创建虚拟空白光盘

1. 新建虚拟机，选择【典型模式】

![image-20220221200314240](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212003386.png)

1. 选择稍后创建，点击下一步

   ![image-20220221200530144](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212005270.png)

2. 选择对应的客户机操作系统

   ![image-20220221200656879](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212006990.png)

3. 选择centos的安装位置

   ![image-20220221200936306](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212009440.png)

4. 指定centos系统的磁盘容量（一般默认20g即可）

   ![image-20220221201102648](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212011780.png)

5. 自定义硬件，默认即可

   ![](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212012719.png)

6. 虚拟机创建完成

   ![image-20220221201356182](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212013307.png)

注意：

+ 内存最好分配2g

+ 处理器按照自身电脑的实际配置进行配置。不能超过自身的配置

+ 网络连接模式

  桥接模式：使用该模式，按照的Linux系统会分配在同一局域网的网段下，容易出现ip冲突导致ip地址不够用。

  NAT模式：网络地址转换，Linux可以访问外网，不会造成IP冲突

  主机模式：linux是一个独立的主机，不能访问外网

  

## CentOS系统按照

1. 选择设置，在【CD/DVD(IDE)】中选择喔们下载好虚拟机镜像

   ![image-20220221203506385](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212035508.png)

2. 点击【确定】，然后开启虚拟机，回车安装虚拟机

3. 选择中文简体，或英文

   ![image-20220221204007021](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212040182.png)

4. 安装信息中有感叹号的，一般默认即可，只需要创建root密码即可

   

![image-20220221204714737](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212047917.png)

![image-20220221204723502](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212047645.png)



然后等待安装完成即可。



![image-20220221205430887](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212054041.png)

安装完成后进入重启阶段

## centos系统设置访问外网

+ centos系统安装完成后是不能访问外网的,因为他的网络不是开机启动的

+ vi /etc/sysconfig/network-scripts/ifcfg-ens33

+ 将ONBOOT设置为yes

  ![image-20220221210135043](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/VMware202202212101162.png)

+ 重启网络服务

  systemctl restart network.service

