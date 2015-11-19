<?php
  $worker= new GearmanWorker();
  $worker->addServer();
  echo "gearman server is starting!\\n";
  $worker->addFunction("sm", function(GearmanJob $job) use (&$userInfo, &$friends, &$posts){
	$workload=($job->workload());
	echo PHP_EOL."send mail ".PHP_EOL.print_r($workload,true);
  });
  $worker->addFunction("pm", function(GearmanJob $job){
	$workload=($job->workload());
	echo PHP_EOL."push msg ".PHP_EOL.print_r($workload,true);
  });

  while ($worker->work()) {
    if($worker->returnCode() !== GEARMAN_SUCCESS){
        echo PHP_EOL.'work returnCode error'.PHP_EOL;
    }
  };
?>
