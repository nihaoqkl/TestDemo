<?php
	$client= new GearmanClient();
	$client->addServer();
	$client->setCompleteCallback('completeCallBack');
	for($i=1;$i<=1;$i++){
		$client->addTaskBackground('pm','pm instances'.$i);
	}
	for($i=1;$i<=1;$i++){
		$client->addTaskBackground('sm','sm instances'.$i);
	}
	
	$t1=microtime(true);
	$client->runTasks();  //运行队列中的任务，只是do系列不需要runTask()。
	echo '耗时'.round(microtime(true)-$t1,3).'秒'.PHP_EOL;
  
	//绑定回调函数，只对addTask有效
	function completeCallBack($task)
	{
	    echo 'result:'.print_r($task->data(),1).PHP_EOL;
	}
?>
