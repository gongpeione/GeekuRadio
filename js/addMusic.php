<?php

	error_reporting(0);
	$passwd = 'fa916429b37ff465c565e6e649a98e91';

	if(!empty($_GET['id']) && !empty($_GET['link']) && md5($_GET['passwd']) == $passwd)
	{
		//echo '<meta charset="UTF-8">';
		/*{'title':'泡沫','artist':'邓紫棋','id':'1771115301','mp3_h':'https://dl.dropboxusercontent.com/u/95356470/Music/mp3/G.E.M.%E9%82%93%E7%B4%AB%E6%A3%8B-%E6%B3%A1%E6%B2%AB.mp3'}*/
		$id   = $_GET['id'];
		$link = $_GET['link'];
		$url  = 'http://goxiami.duapp.com/?id=' . $id . '&type=song&callback=fn';
		$info = file_get_contents($url);
		$info = str_replace('fn(', '', $info);
		$info = str_replace(')', '', $info);
		$info = json_decode($info);
		//print_r($info);

		$title  = $info->song_title;
		$author = $info->song_author;
		$cover  = $info->song_cover;
		$src    = $info->song_src;

		$head     = 'var playlist = ';
		$playList = file_get_contents('playlist.js');
		$playList = str_replace($head, '', $playList);
		$playList = str_replace("'", '"', $playList);
		$playList = str_replace(";", '', $playList);
		$playList = json_decode($playList);
		//print_r($playList);

		$add         = new stdClass;
		$add->title  = $title;
		$add->artist = $author;
		$add->id     = $id;
		$add->mp3_h  = $link;
		//print_r($add);

		$playList[] = $add;
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

		echo '<li class="items"><span class="song_title">Title: ' . $title . '</span><span class="song_aritcle"> Article: ' . $author . '</span><span class="del">x</span></li>';

	} else { echo 'Premission Denied'; } ?>