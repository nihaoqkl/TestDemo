// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
var isMobile = false;

if(clientWidth<=640){
	isMobile=true;
}

$(function () {
	// setup garden
	$loveHeart = $("#loveHeart");
	$garden = $("#garden");
	gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
	gardenCanvas.height = $("#loveHeart").height();
	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";
	garden = new Garden(gardenCtx, gardenCanvas);

	// renderLoop
	setInterval(function () {
		garden.render();
	}, Garden.options.growSpeed);
});

$(window).resize(function() {
	var newWidth = $(window).width();
	var newHeight = $(window).height();
	if (newWidth != clientWidth && newHeight != clientHeight) {
		location.replace(location);
	}
});

function getHeartPoint(angle,point) {
	if(arguments.length==1){
		var point={};
		point.x=19.5;
		point.y=20;
	}
	var t = angle / Math.PI;
	var x = point.x * (16 * Math.pow(Math.sin(t), 3));
	var y = - point.y * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		if(isMobile){
			var bloom = getHeartPoint(angle,{x:9.5,y:10});
		} else {
			var bloom = getHeartPoint(angle);
		}
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0, timer2 = false;
			$ele.html('');
			if(isMobile){
				setTimeout(function(){
					timer2=setInterval(function() {$(document).scrollTop($(document).scrollTop()+36);},1000)
				},11000);
			}
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					if(timer2) clearInterval(timer2);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = new Date();
	//getMonth获取的是从0开始的 所以需要-1
	var days = ( new Date(current.getFullYear(),current.getMonth(),current.getDate()) - new Date(date.getFullYear(),date.getMonth()-1,date.getDate()) ) / 86400000;
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" + seconds + "</span> 秒";
	$("#elapseClock").html(result);
}

function showMessages() {
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}


function adjustCodePosition() {
	//$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}