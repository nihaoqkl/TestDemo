#hmailserver win2008下安装邮件服务器的服务

##下载安装
```
//[HmailServer 官网]（https://www.hmailserver.com）
https://www.hmailserver.com/download_file?downloadid=249 下载
直接双击安装
安装时候注意选择 
× 自定义mysql （首先要已经安装了mysql数据库），当然你也可以选择自带的数据库
× 输入管理员账号密码
× 解压libmysql.rar 复制到hmailserver安装目录的bin文件下
× 输入数据库名称和 数据库账号密码
×  选择服务可以选择nginx或apache服务
```

## 配置
```
添加chines.ini中文语言配置，放在hmailserver的Language下
修改bin文件夹下的hmailserver.ini 在语言栏目有效语言包下增加【,chinese】
进程关掉hmailserver服务，然后重启，选择chinese即可中文

添加域名：如qklin.com，保存
添加账号：如noreply  输入密码， 保存
选择stmp的选项卡 RFC兼容性 - 》勾选允许文本验证（allow plain text authenticatin），保存


## 域名的mx添加
添加A类域名：主机名：mail  指向ip为你的安装了hmailserver服务的主机ip  保存
添加mx，主机名留空或【@】，指向ip输入mail.qklin.com 保存


##服务器映射相应的端口
smtp 25 tcp
pop 110 tcp

## outlook或foxmail配置客户端测试
测试过163和QQ邮箱正常收发，不会进入垃圾箱，不知道大量后会不会出现，有待大家测试
PS：如果做过smtp和pop端口修改的话，发送无问题，会出现无法接收情况，找不到不存在的邮件地址


自行测试不做教程

##增加webmail
https://github.com/afterlogic/webmail-lite
添加虚拟主机到wemail-lite目录
浏览器打开http://mai.qklin.com/install/
只管next 遇到mysql配置的话，新建一个webmail数据库下一步
删除install目录
浏览器打开http://mai.qklin.com/adminpanel，输入用戶:mailadm和密码
进入后点击Domains——Default domain settins
language选择chinese，timezone选择北京+8
现在直接打开http://mai.qklin.com/ 用hmailserver的邮箱账号和密码登陆即可使用




