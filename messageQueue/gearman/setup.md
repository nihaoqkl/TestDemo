#ubunut下安装gearman

##1.安装前的准备
```
# sudo apt-get install libboost-all-dev
# sudo apt-get install gperf
# sudo apt-get install uuid-dev
# wget https://sourceforge.net/projects/levent/files/libevent/libevent-2.0/libevent-2.0.22-stable.tar.gz
# tar zxvf libevent-1.2.tar.gz
# cd libevent-1.2
# ./configure –prefix=/usr
# make
# make install
```

##2.安装gearman并常驻后台运行
```
//https://launchpad.net/gearmand/
# wget https://launchpad.net/gearmand/1.2/1.1.12/+download/gearmand-1.1.12.tar.gz
# tar zxvf gearman-1.1.12.tar.gz
# ./configure 
# sudo make
# sudo make install
# gearmand -d
```
##3.安装gearman扩展
```
//[gearman php扩展下载](http://pecl.php.net/package/gearman)
# wget http://pecl.php.net/get/gearman-1.1.2.tgz
# tar zxvf gearman-1.1.2.tgz
# /usr/local/php/bin/phpize
# ./configure --with-php-config=/usr/local/php/bin/php-config
# sudo make
# sudo make install
```
###配置php.ini
```
# sudo vim /usr/local/php/etc/php.ini
//add extension
extension="/path_extension/gearman.so"
```

##4.测试(已经放了几个测试的demo，可直接下载执行)
```
//[可以查看官方的gearman扩展](http://php.net/manual/zh/gearmanclient.addtask.php)
//server work 可以启动多个 并行处理
//work进程利用[pcntl扩展实现粗略的多worker守护]（http://www.xiaomlove.com/php%E5%AE%89%E8%A3%85gearman%E6%89%A9%E5%B1%95%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5%E5%88%86%E6%AD%A5%E5%BC%8F%E4%BB%BB%E5%8A%A1/）或者[Supervisor管理进程](http://www.tuicool.com/articles/UZ3uUb)
# php server.php

//启动客户端添加任务和异步
//addTask为同步任务  addTaskBackground异步任务
# php client_push.php
```
