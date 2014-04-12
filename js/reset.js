$(document).ready(function(){

	/*windowsHeight = $(window).height();
	windowsWidth  = $(window).width();
	mainHeight    = $('.middle').height();
	toTop         = (windowsHeight - mainHeight) / 2;*/
	//$('.middle').css({'margin-top': toTop});

	document.getElementById("pic").onload = function() {
		albumHeight  = $('.album img').height();
		toTop        = $('.album img').offset().top;
		
		$('.album .center').css({'width': albumHeight * 0.28, 'height': albumHeight * 0.28});
		$('.album .start').css({'width': albumHeight * 0.18, 'height': albumHeight * 0.18});

		centerHeight = $('.album .center').height();
		startHeight  = $('.album .start').height();

		$('.album .center').css({'top': toTop + (albumHeight / 2) - (centerHeight / 2) + 5});
		$('.album .start').css({'top': toTop + (albumHeight / 2) - (startHeight / 2) + 5});
		$('#wrap .player').css({'visibility': 'visible'});
		$("#wrap .album .center, #wrap .album .start").fadeIn();
	};
	
	$(window).resize(function(){
		albumHeight  = $('.album img').height();
		toTop        = $('.album img').offset().top;

		$('.album .center').css({'width': albumHeight * 0.28, 'height': albumHeight * 0.28});
		$('.album .start').css({'width': albumHeight * 0.18, 'height': albumHeight * 0.18});

		centerHeight = $('.album .center').height();
		startHeight  = $('.album .start').height();

		$('.album .center').css({'top': toTop + (albumHeight / 2) - (centerHeight / 2) + 5});
		$('.album .start').css({'top': toTop + (albumHeight / 2) - (startHeight / 2) + 5});
	});
})