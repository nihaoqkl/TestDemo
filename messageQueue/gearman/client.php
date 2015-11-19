<?php
	$client= new GearmanClient();
	$client->addServer();
	$client->setCompleteCallback('completeCallBack');
	$client->addTask('send mail','woshi shui');
	$client->runTasks();  //运行队列中的任务，只是do系列不需要runTask()。
  
	//绑定回调函数，只对addTask有效
	function completeCallBack($task,$context='')
	{
	    echo PHP_EOL.$context.'CompleteCallback！handle result:'.print_r($task->data(),true).PHP_EOL;
	}
?>
