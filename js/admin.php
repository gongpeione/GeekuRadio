<?php

	error_reporting(0);
	$passwd = 'fa916429b37ff465c565e6e649a98e91';

	if(md5($_GET['passwd']) == $passwd)
	{
		$head     = 'var playlist = ';
		$playList = file_get_contents('playlist.js');
		$playList = str_replace($head, '', $playList);
		$playList = str_replace("'", '"', $playList);
		$playList = str_replace(";", '', $playList);
		$playList = json_decode($playList);
		/*print_r($playList);*/

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Fm Contorller</title>

	<style>
		::-webkit-scrollbar{ background: #666; }
		::-webkit-scrollbar-track-piece{ background: #666; }
		::-webkit-scrollbar{ width: 10px ;height: 14px }
		::-webkit-scrollbar-thumb{ height: 80px; background-color: #333; }
		::-webkit-scrollbar-thumb:hover{ background-color: #111; }
		body { width: 100%; height: 100%; background: url(../img/bg.jpg) fixed; background-size: cover; overflow: auto; line-height: 1; font-family: Helvetica, Tahoma, Arial, STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", Heiti, "黑体" ,sans-serif !important;  }
		.cover { position: absolute;  left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(0,0,0,0.4); text-align: center;  padding-top: 10%;}
		.cover label { display: block; font-size: 1.4em; margin-top: 20px; color: #fff;}
		.cover label input { border: none; background: rgba(255,255,255,0.8); padding: 10px 20px; font-size: 1em; border-radius: 5px; font-family: Helvetica, Tahoma, Arial, STXihei, "华文细黑", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", Heiti, "黑体" ,sans-serif !important; outline: none; }
		.cover label .link { width: 40%; }
		.cover .add { width: 20%; margin-top: 30px; border: none; font-size: 2em; padding: 10px 10px; border-radius: 10px;  background: rgba(255,255,255,0.8); border-bottom: 5px solid rgba(0,0,0,0.2); }
		.cover .list { width: 50%; margin: 0 auto; margin-top: 40px; font-size: 1.4em; }
		.cover .list li { background: rgba(255,255,255,0.8); padding: 20px 10px;  border-radius: 10px; margin-top: 10px; color: #333; list-style: none; }
		.cover .list li .del { float: right; margin-right: 20px; cursor: pointer; }
	</style>
</head>
<body>
	
<div class="cover">
	<label for="id">
		<span>Xiami ID: </span><input type="text" class="id">
	</label>
	<label for="link">
		<span>Music Link: </span><input type="text" class="link">
	</label>

	<input type="button" value="Add Music" class="add">
	
	<ul class="list">
		<?php for($i = 0; $i < count($playList); $i++) { ?>
			<li class="item-<?php echo $i ?>"><span class="song_title">Title: <?php echo $playList[$i]->title ?></span><span class="song_aritcle"> Article: <?php echo $playList[$i]->artist ?></span><span class="del">x</span></li>
		<?php } ?>
	</ul>
</div>

	<script src="jquery.min.js"></script>
	<script>
		$('.add').click(function(){
			var id   = $('.id').val();
			var link = $('.link').val();
			var url  = "addMusic.php?id=" + id + '&link=' + link + '&passwd=fghjkl';
			$.get(url, function(result){
				$('.list').append(result);
				id.empty();
				link.empty;
			});
		})

		$('.cover .list li .del').click(function(){
			var num = $(this).parent().attr('class');
			num = parseInt(num.substr(5));
			//console.log(num);

			var url  = "delMusic.php?num=" + num + '&passwd=fghjkl';
			$.get(url, function(result){
				location.reload(1); 
			});
		})
	</script>
</body>
</html>

<?php } else { echo 'Premission Denied'; } ?>