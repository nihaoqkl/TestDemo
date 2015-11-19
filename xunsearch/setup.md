#xunsearch安装使用

##安装

###1.首先安装zlib
```
wget http://www.zlib.net/zlib-1.2.8.tar.gz
tar zxvf zlib-1.2.8.tar.gz
./configure
make && make install
```

###2.安装xunsearch
```
wget wget http://www.xunsearch.com/download/xunsearch-full-latest.tar.bz2
tar -xjf xunsearch-full-latest.tar.bz2
sudo sh setup.sh #稍等一会 可能会较长时间
```
安装完成后会提示
```
+=================================================+
| Installation completed successfully, Thanks you |
| 安装成功，感谢选择和使用 xunsearch              |
+-------------------------------------------------+
| 说明和注意事项：                                |
| 1. 开启/重新开启 xunsearch 服务程序，命令如下： |
|    /home/ubuntu/xunsearch/bin/xs-ctl.sh restart
|    强烈建议将此命令写入服务器开机脚本中         |
|                                                 |
| 2. 所有的索引数据将被保存在下面这个目录中：     |
|    /home/ubuntu/xunsearch/data
|    如需要转移到其它目录，请使用软链接。         |
|                                                 |
| 3. 您现在就可以在我们提供的开发包(SDK)基础上    |
|    开发您自己的搜索了。                         |
|    目前只支持 PHP 语言，参见下面文档：          |
|    /home/ubuntu/xunsearch/sdk/php/README
+=================================================+
```
###3.


