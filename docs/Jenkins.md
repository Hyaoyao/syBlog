## Jenkins特征

+ 开源的java语言开发的持续继承工具。官网：jenkins.io
+ 易于安装部署：可以通过yum安装或下载war包以及通过docker容器等快速实现安装部署，具有方便web界面配置管理
+ 消息通知及测试报告：集成RSS/E-mail通过RSS发布构建结果或当构建完成时通过Email通知，生成Junit/TestNG测试报告
+ 分布式构建按：支持jenkins能够让多台计算机一起构建/测试
+ 文件识别：Jenkins能够跟踪那次构建生成那些nr，那次构建使用那个版本的jar等
+ 丰富的插件支持：支持扩展插件，可以开发适合自己团队的使用工具，如：git，svn，maven，docker等。

## jenkin安装

1. 安装JDK(如果已经存在，则跳过该步骤)

   Jenkins需要依赖JDK

   ~~~shell
   yum install java-1.8.0-openjdk* -y
   ~~~

   安装目录为：/usr/lib/jvm

2. 获取Jenkins安装包

   下载页面：https://www.jenkins.io/download/

   安装文件：jenkins-2.193-1.1.noarch.rpm
   
3. 把Jenkins的安装包上传到服务器进行安装

   ~~~shell
   rpm -ivh jenkins-2.193-1.1.noarch.rpm
   ~~~

4. 修改Jenkins的配置

   ~~~shell
   vi /etc/sysconfig/jenkins
   ~~~

   修改内容如下

   >JENKINS_USER="root"
   >
   >JENKINS_PORT="8888"

5. 启动Jenkins

   ~~~shell
   systemctl start jenkins
   ~~~

6. 打开浏览器访问

   http://127.0.0.1:8888

   注意：jenkins设置的端口需要打开或关闭防火墙

   ~~~shell
   # 开发端口（centos7）
   firewall-cmd --zone=public --add-port=8888/tcp --permanent
   firewall-cmd --zone=public --remove-port=8888/tcp --permanent  #关闭5672端口
   
   firewall-cmd --reload   # 配置立即生效
   ~~~

   

7. 获取并输入admin的账号密码

   ~~~shell
   cat /var/lib/jenkins/secrets/initialAdminPassword
   ~~~

8. 跳过插件安装

   因为Jenkins的插件需要连接默认官网下载，速度非常慢，经常会失败，所以先跳过插件安装

## jenkins插件管理

Jenkins本身不提供恩多功能，我们可以通过使用插件来满足我们的使用，例如从gitlab拉取代码，使用maven构建项目等需要依靠插件完成。

### 修改Jenkins插件饿下载地址

Jenkins国外官方插件地址下载速度非常慢，所以可以修改为国内插件地址。

Jenkins->Manage jenkins -> Manage Plugins，点击Available

![image-20220310213935450](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203102139633.png)

这样做事为了把Jenkins官方插件列表下载到本地，接着修改地址文件，替换为国内插件地址

~~~shell
cd /var/lib/jenkins/updates
sed -i 's/http:VVupdates.jenkins-ci.orgVdownload/https:VVmirrors.tuna.tsinghua.edu.cnVjenkins/g' default.json && sed -i 's/http:VVwww.google.com/https:VVwww.baidu.com/g' default.json

~~~

最好，Manage Plugins点击Advanced，把Update Site改为国内插件下载地址

https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

![image-20220310215305708](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203102153867.png)

Sumbit后，在浏览器输入：http://127.0.0.1:8888/restart，重启Jenkins



### 下载中文插件

Jenkins->Manage Jenkins -> Manage Plugins，点击Available,搜索“ Chinese ”

![image-20220310220444963](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203102204113.png)

## Jenkins用户权限管理

我们可以利用Role-based Authorization Strategy插件来管理Jenkins用户权限

安装Role-based Authorization Strategy

![image-20220315202321723](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152023914.png)

## Jenkins凭证管理

凭证可以用来存储需要加密文保护的数据库密码，gitlab密码信息，docker私有仓库密码等，以便jenkins可以和这些第三方的应用进行交互

### 安装Credentials Binding插件

Jenkins使用凭证管理功能，需要安装Credentials Binding插件

![image-20220315203501598](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152035718.png)

安装插件后，左边多了“凭证”菜单，在这里管理所有凭证（新版本可能回在设置里面）

可以添加的品质有五种类型：

+ Username with password：用户名和密码
+ SSH Username with private key：使用ssh用户和密钥
+ Secret file：需要保密的文本文件，使用时Jenkins会将文件复制到一个临时目录中，再将文件路径设置到一个变量中，等构建结束后，所复制的Secret file就会被删除
+ Secret text：需要保存的一个加密的文本串，如钉钉机械人或GitHub的api token
+ Certificate：通过上传证书文件的方式



### 安装git插件和给i他工具

为了让Jenkins支持从gitlab上腊鱼源码，需要安装git插件已经再CentOS7上安装git工具

Git插件安装

![image-20220315205100166](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152051293.png)

CentOS7安装git工具

~~~shell
yum install git -y 安装
git --version 安装后查看版本
~~~

### 用户密码类型

1. 创建凭证

   Jenkins -> 系统管理 -> 凭证

   ![](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152057909.png)

2. SSH密钥类型

   SSH绵密登录示意图

   ![image-20220315210942593](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152109677.png)

   使用root用户生成公钥和私钥

   ~~~shell
   ssgh-keygen -t rsa
   ~~~

   再/root/.ssh/目录保存了公钥和私钥

   id_rsa：私钥文件

   id_rsa.pub：公钥文件

   把生成的公钥放在gitlab中（详情参考github的SSHKEY模式）

3. jenkin添加ssh凭证

   ![image-20220315213334866](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152133703.png)



## Maven安装和配置

再Jenkins集成服务器上，我们需要安装Maven来编译打包项目

### 安装maven

先上传maven软件到jenkins的服务器

~~~shell
tar -xzf maven软件压缩包 //解压
mkdir -p /opt/maven // 创建目录
mv apache-maven/* /opt/maven // 移动文件
~~~

配置环境变量

vi /etc/profile

~~~shell
export MAVEN_HOME=/opt/maven
export PATH=$PATH:$MAVEN_HOME/bin
~~~

>source /etc/profile     配置生效
>
>mvn -v        查看maven版本

### 全局工具胚子关联JDk和mven

jenkins-> Gloabl Tool Configuration->jdk->新增jdk，配置如下

![image-20220315223242751](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152232923.png)

jenkins-> Gloabl Tool Configuration->Maven->新增Maven，配置如下

![image-20220315223809137](https://cdn.jsdelivr.net/gh/yayyay0217/sy-data/image/jenkins/202203152238253.png)
