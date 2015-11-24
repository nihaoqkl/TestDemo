<?php
namespace Home\Controller;
use Think\Controller;
class XunsearchController extends Controller {

    public function index(){
        require './Vendor/xunsearch/lib/XS.php';

        $xs = new \XS('test'); // 建立 XS 对象，项目名称为：demo
        $index = $xs->index; // 获取 索引对象

        $dbJob=M('job','dg_','REMOTE_TEST_DB_DSN');
        $lists=$dbJob->order('create_time desc')->select();

        // 创建文档对象
        $doc = new \XSDocument;
        foreach($lists as $val){
            $data = array(
                'job_id' => $val['job_id'], // 此字段为主键，必须指定
                'title' => $val['title'],
                'work_type' => $val['work_type'],
                'sex' => $val['sex'],
                'money_way' => $val['money_way'],
                'pay_way_money' => $val['pay_way_money'],
                'province' => $val['province'],
                'city' => $val['city'],
                'create_time' => $val['create_time'],
                'desc' => $val['desc']
            );

            $doc->setFields($data);
            // 添加到索引数据库中
            $index->add($doc);
        }

    }

    public function search(){
        require './Vendor/xunsearch/lib/XS.php';

        $xs = new \XS('test'); // 建立 XS 对象，项目名称为：demo
        $search = $xs->search; // 获取 索引对象

        $result=$search->search('title:发单');

        // 由于拼写错误，这种情况返回的数据量可能极少甚至没有，因此调用下面方法试图进行修正
        $corrected = $search->getCorrectedQuery();
        if (count($corrected) !== 0)
        {
            // 有纠错建议，列出来看看；此情况就会得到 "测试" 这一建议
            echo "您是不是要找：\n";
            foreach ($corrected as $word)
            {
                echo $word . "\n";
            }
        }

        $words = $search->getHotQuery();

        dump($words);

        echo  $search->getDbTotal();

    }
}