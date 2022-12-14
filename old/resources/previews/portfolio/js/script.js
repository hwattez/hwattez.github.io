$(function() {
			
	const NB_IMG_SLIDER=4;
	const TIMER_SLIDER=7000;
	
	const RATIO_IMG=1920/1280;
	
	$('section').css('min-height',$('#sliderBg').height());
	
	function centerHeader(){
		var margin=($('#sliderBg').height()-$('header').height())/2;
		$('header').css('margin',margin+'px 0');
	}
	centerHeader();

	// Re-dimensionne les images du slider
	function resizeBackground(){
		$(".imgSlider").css({'width':'auto','height':'auto'});
		if($('#sliderBg').width()/$('#sliderBg').height() > RATIO_IMG)
			$(".imgSlider").css('width','100%');
		else
			$(".imgSlider").css('height','100%');
	}
	resizeBackground();
	
	
	// Slider du background
	setInterval(function(){
		
		var numImg=(parseInt($('.imgSlider:last').attr('data-img'))+1)%NB_IMG_SLIDER;
		$('<img class="imgSlider" src="img/slider/'+numImg+'.jpg" data-img="'+numImg+'" alt="Image slider '+numImg+'" />').prependTo('body');
		resizeBackground();
		$('.imgSlider:last').fadeOut(2000, function(){
			$(this).remove();
		});
		
	}, TIMER_SLIDER);
	
	
	// Handler sur le re-dimensionnement de la fenêtre
	$(window).resize(function() {
		resizeBackground();
		centerHeader();
	});
	
	function currentActive(name){
		$(".nav li").removeClass("active");
		$("a[href="+name+"]").parent().addClass("active");
	}
	
	$(window).on('scroll', function(){
		
		var height=$("body").height();
		var current=$(window).scrollTop();
		
		var r=0;
		var v=0;
		var b=0;
		if(current<height/2){
			b=~~(255-current/(height/2)*255);
			v=~~(current/(height/2)*255);
		}else{
			v=~~(255-(current-height/2)/(height/2)*255);
			r=~~((current-height/2)/(height/2)*255);
		}
			
		$(".navbar-default .container-fluid").css("background-color","rgba("+r+","+v+","+b+",0.2)");
		$(".navbar-default").css("border-color","rgb("+r+","+v+","+b+")");
		$(".page-header").css("border-color","rgb("+r+","+v+","+b+")");
		$(".bgColor").css("background-color","rgb("+r+","+v+","+b+")");
		
		////////////////////////////////////////////////////////////////////////////////
		
		
		
		if(current < $("#profil").offset().top-50)
			currentActive("#");
		else if(current < $("#competence").offset().top-50)
			currentActive("#profil");
		else if(current < $("#formation").offset().top-50)
			currentActive("#competence");
		else if(current < $("#experience").offset().top-50)
			currentActive("#formation");
		else if(current < $("#contact").offset().top-50)
			currentActive("#experience");
		else
			currentActive("#contact");
		
	});
	
});
