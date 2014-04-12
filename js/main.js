$(document).ready(function(){
	
	//打开关闭播放列表
	listStatus = 0;
	$('.list-button').click(function(){
		listWidth = $('#wrap .play-list ul').width();
		if(!listStatus){
			$(this).animate({marginRight: listWidth + 30},300);
			$('#wrap .play-list ul').animate({marginRight: 0},300);
			listStatus = 1;
		} else {
			$(this).animate({marginRight: 10},300);
			$('#wrap .play-list ul').animate({marginRight: -400},300);
			listStatus = 0;
		}	
	})
	//console.log(localStorage.currentMusic + '-' + localStorage.repeat + '-' + localStorage.quality);
	//加载本地数据（如果有的话）
	if(typeof(localStorage.repeat) == undefined || isNaN(localStorage.repeat))
		localStorage.repeat = '0';
	if(typeof(localStorage.quality) == undefined || isNaN(localStorage.quality))
		localStorage.quality = '0';

	//localStorage.currentMusic = 0;
	//各种需要用到的变量
	var audio        = document.getElementById('music');
	var isPlaying    = false;
	var currentMusic = 0;
	var repeat       = parseInt(localStorage.repeat);
	var quality      = parseInt(localStorage.quality);
	var relist       = ['fa-random', 'fa-refresh', 'fa-retweet'];
	var retitle      = ['Random', 'Cycle', 'Order'];

	//根据状态修改图标
	if(!quality){
		$('.control .quality i').removeClass('fa-star').addClass('fa-star-half').attr('title','Normal'); 
	} else {
		$('.control .quality i').removeClass('fa-star-half').addClass('fa-star').attr('title','High'); 
	}
	$('.control .repeat i').removeClass().addClass('fa').addClass(relist[repeat]).attr('title',retitle[repeat]); 

	console.log('Current Music: ' + currentMusic + ' Repeat: '+ repeat + ' Quality: '+ quality);

	//加载播放列表
	for (var i = 0; i < playlist.length; i++){
		var item = playlist[i];
		$('.play-list ul').append('<li class="item' + i + '">' + item.title + '</li>');
	}    
	
	//载入图片和音乐文件
	var loadMusic = function(i){

		currentMusic = localStorage.currentMusic = i;
		//console.log(localStorage.currentMusic);
		var item = playlist[i];

		$.ajax({
			type: "POST",
			cache: false,
		    dataType: 'jsonp',
		    jsonp: 'callback',
		    async: false,
		    url: 'http://goxiami.duapp.com/?id=' + item.id + '&type=song&callback=?',
		    success: function(data) {
				
				//选择不同质量的音乐文件
		    	if(quality){
					src = item.mp3_h;
				} else {
					src = data.song_src;
				}

				//加载各种东西
				audio.setAttribute("src", src);
				cover = data.song_cover;
				cover = cover.replace('2.jpg','4.jpg');
				cover = 'timthumb.php?src=' + cover + '&h=' + 500 + '&w=' + 500 + '&zc=1';
				$('.album img').attr({'src': cover, 'alt': item.artist});
				$('#wrap .title h1').html(item.title);
				$('#wrap .title h2').html(item.artist);
				$('.play-list ul li').removeClass('playing').eq(i).addClass('playing');

				if(isPlaying){
					play();
				}

				console.log('Song Title: ' + item.title + ' Song Artist: ' + item.artist)
		    },
		});		
	}
	loadMusic(currentMusic);

	var changeMusic = function(i){
		loadMusic(i);
	}

	var randomNum = function(min,max){
		return Math.floor(min + Math.random() * (max - min));
	}

	/*'fa-random', 'fa-refresh', 'fa-retweet'*/
	var autoChange = function(){
		var nextMusic = 0;

		switch(repeat){
			case 0: nextMusic = randomNum(0, playlist.length); 
					changeMusic(nextMusic); 
					break;
			case 1: audio.currentTime = 0.0;
					play();
					break;
			case 2: if(currentMusic == playlist.length - 1){
						changeMusic(0);
					} else {
						changeMusic(currentMusic + 1);
					} 
					break;
		}
	}

	var updateProgress = function(){
		if(audio.currentTime == audio.duration){
			autoChange();
		}
		ratio = audio.currentTime / audio.duration * 100;
		$('#wrap .progress .current').css({'width': ratio + '%'});
	}

	var play = function(){
		audio.play();
		$('.start i').addClass('playing').removeClass('fa-play').addClass('fa-pause');
		timeout = setInterval(updateProgress, 200);
		isPlaying = true;
	}

	var pause = function(){
		audio.pause();
		$('.start i').removeClass('playing').removeClass('fa-pause').addClass('fa-play');
		clearInterval(timeout);
		isPlaying = false;
	}

	$('.start i').click(function(){
		if ($(this).hasClass('playing')){
			pause();
		} else {
			play();
		}
	});

	$('.buttons .pre').click(function(){
		if(currentMusic == 0){
			changeMusic(playlist.length - 1);
		} else {
			changeMusic(currentMusic - 1);
		}
	})

	$('.buttons .next').click(function(){
		if(currentMusic == playlist.length - 1){
			changeMusic(0);
		} else {
			changeMusic(currentMusic + 1);
		}
	})

	$('.play-list ul li').click(function(){
		if(!$(this).hasClass('playing')){
			var className = $(this).attr('class');
			var num       = parseInt(className.substr(4));

			changeMusic(num);
		}
	})

	$('.control .repeat').click(function(){
		console.log('repeat ' + repeat);
		if(repeat == 2){
			$('.control .repeat i').removeClass(relist[repeat]).addClass(relist[0]).attr('title',retitle[0]); 
			repeat = localStorage.repeat = 0;
		} else {
			$('.control .repeat i').removeClass(relist[repeat]).addClass(relist[repeat + 1]).attr('title',retitle[repeat + 1]); 
			repeat = localStorage.repeat = repeat + 1;
		}	
	})
	
	$('.control .quality').click(function(){
		if(quality){
			$('.control .quality i').removeClass('fa-star').addClass('fa-star-half').attr('title','Normal Quality'); 
			quality = localStorage.quality = 0;
		} else {
			$('.control .quality i').removeClass('fa-star-half').addClass('fa-star').attr('title','High Quality'); 
			quality = localStorage.quality = 1;
		}	
	})

	$('.setting').click(function(){
		window.open('js/admin.php');
	})
})