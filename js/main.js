/* *********
 *    author:Jason He
 *    version:1.0.0
 *    Date:2014-12-25
 *    file:main.js
 ********* */

var HJR = {};
(function(S){
	var pageNum = 2;
	var main = {
		init: function () {
			if ($("#page").val() == "index") {
				main.index();
			} else if ($("#page").val() == "detail") {
				main.detail();
			}
			$("body").delegate(".tip_btn", "click", function() {
				 main.tip();
			});
			$(window).scroll(function(e) {
				if ($("#page").val() != "index") {
					return false;
				}
				var scrollTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var clientHeight = $(document).height();
				if (scrollTop + windowHeight >= clientHeight - 22) {
					main.more();
				}
			});
		},
		index: function () {
			var header = "<header>精品游戏推荐</header>";
			$("body").append(header);
			
			var main_wrap = '<div class="main_wrap"></div>';
			$("body").append(main_wrap);
			
			var footer = '<div class="footer"><img src="images/bx_loader.gif">正在加载...</div>';
			$("body").append(footer);
			
			var banner_ul = '<ul class="banner"></ul>';
			$(".main_wrap").append(banner_ul);
			
			var banner_li = "", game_list = "";
			var cid = main.param("cid");
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "json/index.json",
				data: {cid: cid, page: "index"},
				success: function (data) {
					for (i = 0; i < data.banner.length; i++) {
						banner_li += '<li><a href="#"><img src="' + data.banner[i].src + '"></a></li>';
					}
					$(".banner").append(banner_li);
					$(".banner").bxSlider({
						auto: true,
						controls: false
					});
					
					for (j = 0; j < data.game_list.length; j++) {
						game_list += '<section class="game_list"><a class="game_wrap" href="' + data.game_list[j].game_detail + '"><img class="game_icon" src="' + data.game_list[j].game_icon + '"><div class="game_info"><p class="game_name">' + data.game_list[j].game_name + '</p><p class="game_size">' + data.game_list[j].game_size + '</p><p class="game_intro">' + data.game_list[j].game_intro + '</p></div><div class="clearfix"></div></a><a class="download_btn tip_btn" href="' + data.game_list[j].game_download + '">下载</a><div class="clearfix"></div></section>';
					}
					$(".main_wrap").append(game_list);
				}
			});
		},
		detail: function () {
			var header = '<header>游戏详情<a class="back" href="index.html">返回</a></header>';
			$("body").append(header);
			
			var main_wrap = '<div class="main_wrap"></div>';
			$("body").append(main_wrap);
			
			var screenshot_wrap = "";
			var id = main.param("id"), cid = main.param("cid");
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "json/detail.json",
				data: {id: id, cid: cid, page: "detail"},
				success: function (data) {
					var detail_title = '<section class="game_list detail_title"><img class="game_icon" src="' + data.detail_title.game_icon + '"><div class="game_info detail_info"><p class="game_name detail_name">' + data.detail_title.game_name + '</p><p class="game_size detail_size">' + data.detail_title.game_size + '</p><p class="game_intro detail_intro">' + data.detail_title.game_intro + '</p></div><div class="clearfix"></div></section>';
					$(".main_wrap").append(detail_title);
					
					screenshot_wrap += '<div class="screenshot_wrap"><ul class="screenshot">';
					for (i = 0; i < data.screenshot_wrap.length; i++) {
						screenshot_wrap += '<li><img src="' + data.screenshot_wrap[i].src + '"></li>';
					}
					screenshot_wrap += '</ul></div>';
					$(".main_wrap").append(screenshot_wrap);
					$(".screenshot").bxSlider({
						controls: false,
						hideControlOnEnd: true,
						infiniteLoop: false,
						maxSlides: 3,
						minSlides: 1,
						pager: false,
						slideMargin: 10,
						slideWidth: 240,
						speed: 100
					});
					
					var detail_main = '<article class="detail_main"><h2 class="detail_header">内容介绍</h2><p class="detail_body">' + data.detail_main + '</p></article>';
					$(".main_wrap").append(detail_main);
					
					var footer = '<footer><a class="detail_download tip_btn" href="' + data.footer + '">下 载</a></footer>';
					$("body").append(footer);
				}
			});
		},
		param: function (name) {
		   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		   var r = window.location.search.substr(1).match(reg);
		   if (r!=null) return (r[2]); return null;
		},
		tip: function () {
			var div = '<div class="tip">正在下载...</div>';
			$("body").append(div);
			setTimeout(function(){
				$(".tip").remove();
			}, 3000);
		},
		more: function () {
			if ($(".footer").hasClass("loading")) {
				return false;
			} else {
				$(".footer").addClass("loading");
			}
			var game_list = "";
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "json/more.json",
				data: {pageNum: pageNum},
				success: function (data) {
					$(".footer").removeClass("loading");
					if (data && data.length > 0) {
						for (i = 0; i < data.length; i++) {
							game_list += '<section class="game_list"><a class="game_wrap" href="' + data[i].game_detail + '"><img class="game_icon" src="' + data[i].game_icon + '"><div class="game_info"><p class="game_name">' + data[i].game_name + '</p><p class="game_size">' + data[i].game_size + '</p><p class="game_intro">' + data[i].game_intro + '</p></div><div class="clearfix"></div></a><a class="download_btn tip_btn" href="' + data[i].game_download + '">下载</a><div class="clearfix"></div></section>';
						}
						$(".main_wrap").append(game_list);
						pageNum++;
					} else if (data && data.length == 0) {
						$(".footer").html("无更多游戏");
					}
				}
			});
		}
	}
	$(document).ready(function(e) {
		main.init();
	});
	return S.main = main;
})(HJR);