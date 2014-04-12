<?php

	error_reporting(0);
	$passwd = 'fa916429b37ff465c565e6e649a98e91';

	if(is_numeric($_GET['num']) && md5($_GET['passwd']) == $passwd)
	{

		function array_remove(&$arr, $offset) 
		{ 
			array_splice($arr, $offset, 1); 
		} 
		//echo '<meta charset="UTF-8">';
		/*{'title':'泡沫','artist':'邓紫棋','id':'1771115301','mp3_h':'https://dl.dropboxusercontent.com/u/95356470/Music/mp3/G.E.M.%E9%82%93%E7%B4%AB%E6%A3%8B-%E6%B3%A1%E6%B2%AB.mp3'}*/
		$num   = $_GET['num'];
		
		$head     = 'var playlist = ';
		$playList = file_get_contents('playlist.js');
		$playList = str_replace($head, '', $playList);
		$playList = str_replace("'", '"', $playList);
		$playList = str_replace(";", '', $playList);
		$playList = json_decode($playList);
		//print_r($playList);

		array_remove($playList, $num); 
		//print_r($playList);

		$result = json_encode($playList);
		$result = $head . $result;
		//echo $result;

		$list = fopen("playlist.js","w");
		if(!$list)
		{
		    echo'文件不存在';
		    exit;
		}
		else
		{
			fwrite($list,$result);
			fclose($list);
		}

	} else { echo 'Premission Denied'; } ?>