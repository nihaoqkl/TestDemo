#Ubuntu下安装rabbitMQ

##安装
```
# sudo apt-get install librabbitmq-dev
//添加apt来源到 /etc/apt/sources.list:
# deb http://www.rabbitmq.com/debian/ testing main
# wget https://www.rabbitmq.com/rabbitmq-signing-key-public.asc
# sudo apt-key add rabbitmq-signing-key-public.asc
# sudo apt-get install rabbitmq-server
```
##安装amqp的php扩展
```
//http://pecl.php.net/package/amqp
# wget http://pecl.php.net/get/amqp-1.6.0.tgz
# tar zxvf amqp-1.6.0.tgz
# cd amqp-1.6.0
# ./configure --with-php-config=/usr/local/php/bin/php-config --with-amqp
# sudo make && sudo make install

# vim /usr/local/php/etc/php.ini
extension=/path/amqp.so
```

##测试和使用
```
参考本目录下的子目录有对应的测试项目
php receive.php  //运行消息接收消费者( 服务器 )

php task.php message //运行消息生成者(客户端)
```
