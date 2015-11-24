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

###3. 测试你的开发环境是否符合
```
# /usr/local/php/bin/php  $xunsearchPath/sdk/php/util/RequiredCheck.php
```
如果环境检测没有错误提醒表示继续开发了，这里的检测并不是一定要是和xunsearch同服务器的，可是自己web服务器开发的服务器

###启动xunsearch服务器
```
//在指定的 /path/to/web 目录生成 demo 搜索代码，代码目录为：/path/to/web/demo
# $xunsearchPath/sdk/php/util/SearchSkel.php project /path/to/web
本目录下有一个test-project测试项目 包含了test.ini配置 一个SearchSkel.php工具生成的测试项目demo和一个自己thinkphp下的简单测试
```

### 几个比较常用的api
```
require './Vendor/xunsearch/lib/XS.php';
$xs = new \XS('test'); // 建立 XS 对象，项目名称为：demo
$index = $xs->index; // 获取 索引对象
$doc = new \XSDocument; // 创建文档对象
$doc->setFields($data);
$index->add($doc);// 添加到索引数据库中
$index->update($doc); // 更新到索引数据库中
$index->del('123');  // 删除主键值为 123 的记录
$index->del(array('123', '789', '456')); // 同时删除主键值为 123, 789, 456 的记录

//清空索引，当您的索引数据库发生了重大改变时必须清空索引。比如搜索项目的字段配置修改了，或者是数据进行了大模迁移、导入或批量删除导致真实数据库和搜索数据库发生了较大的偏差。
$index->clean(); // 执行清空操作


//平滑重建索引 对于线上项目是难以容忍的，因此可以选择使用平滑重建方式。它的内部实现 相当于在一个临时区域开辟新库，把所有的添加操作全部更新到新库，直到您完成重建，完成后 再用新库替代旧库用于搜索

// 宣布开始重建索引
$index->beginRebuild();
 
// 然后在此开始添加数据
 
// 告诉服务器重建完比
$index->endRebuild();


$search = $xs->search; // 获取 搜索对象
$query = '项目测试'; // 这里的搜索语句很简单，就一个短语
 
$search->setQuery($query); // 设置搜索语句
$search->addWeight('subject', 'xunsearch'); // 增加附加条件：提升标题中包含 'xunsearch' 的记录的权重
$search->setLimit(5, 10); // 设置返回结果最多为 5 条，并跳过前 10 条
 
$docs = $search->search(); // 执行搜索，将搜索结果文档保存在 $docs 数组中
$count = $search->count(); // 获取搜索结果的匹配总数估算值

$search->search('上海人民公园'); // 检索 body 型字段及混合区
$search->search('上海 人民公园'); // 用空格连接 2 个关键词, 这种情况比上面的用法更明确
$search->search('subject:上海 人民公园'); // 特别要求 subject 字段包含 "上海"
$search->setFuzzy()->search('上海公园'); // 开启模糊搜索，搜索 "上海" 或 "公园"
(更多搜索查看)[http://www.xunsearch.com/doc/php/guide/search.query]
```


