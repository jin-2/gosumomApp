(function(window, document, undefined) {
	
	var $win, doc_H, doc_W, $fullPageWrap, $fullPageInner, fullPageInner_H, margin_box;

	// 초기 설정을 마무리하면 callback Fn 실행
	initSetting(function() {
		$win.on('resize', setHeight);
	});

	function initSetting(fn) {
		// 브라우저 높이 구하기
		$win = $(window);
		// setHeight 함수 실행
		setHeight();
		// callback Fn 이 있으면 실행
		fn ? fn() : null;
	}

	

	function setHeight() {
		doc_H = $win.height();
		doc_W = $win.width();
		
		if (!$fullPageWrap) { $fullPageWrap = $('.full_page'); }
		if( fullPageInner_H < doc_H ){
			$fullPageWrap.css({
				'height' : doc_H
				// 'width' : doc_W
			});
		}
		
		if (!$fullPageInner) { $fullPageInner = $fullPageWrap.find('.full_page_inner'); }
		fullPageInner_H = $fullPageInner.height();
		margin_box = ( doc_H - fullPageInner_H ) / 2;
		
		$fullPageInner.css({
			'padding-top': margin_box,
			'padding-bottom': margin_box
		});
		
	}

	var $canvasWrap = $('.canvas_off_wrap');
	$('.show_side_content').click(function() {
		var _condition = $canvasWrap.hasClass('show_content');
		console.log(_condition);
		if( !_condition ){
			$('.canvas_off_wrap').addClass('show_content');
		}else{
			$('.canvas_off_wrap').removeClass('show_content');
		}
		
	});

	// 플레이스홀더 공통사용
	$('.placeholder_wrap input, .placeholder_wrap textarea').focus(function(){
		$(this).keydown(function(){
			$(this).siblings().find('.placeholder').hide();
		});
	});
	$('.placeholder_wrap input, .placeholder_wrap textarea').focusout(function(){
		if($(this).val().length == 0){
			$(this).siblings().find('.placeholder').show();
		}
	});

	// 공통사용 value 있을 때 플레이스홀더 숨기기
	$('.placeholder_wrap').each(function(){
		var input_text = $('input', this);
		if( input_text.val() ){
			input_text.siblings('label').find('.placeholder').hide();
		}

	});

	var $hamburgerMenu = $(".button_hamburger");
	var $navigation = $(".navigation_wrap");

	$hamburgerMenu.click(function(){
		if ($(this).hasClass("is_active") === true) {
			$(this).removeClass("is_active");
			$navigation.removeClass("is_active");
			if ($('.header').find('title_logo')) {$('.title_logo').css({"display":"inline"});}

		} else{
			$(this).addClass("is_active");
			$navigation.addClass("is_active");
			if ($('.header').find('title_logo')) {$('.title_logo').css({"display":"none"});}
		};
	});

}(window, document));

// Design checkbox
$.fn.designCheckbox = function(option){
	var option = $.extend({}, $.fn.designCheckbox.option, option);
		
	return this.each(function(){
	var select_root = $(this),
			select_type = select_root.find("input[type=checkbox]");
			
		select_type.change(function(){
			if(select_type.prop("checked")){
				select_root.addClass("checked");
			}else{
				select_root.removeClass("checked");
			}
		}).change().hover(
			function(){
				select_root.addClass(option.overClass);
			},function(){
				select_root.removeClass(option.overClass);
			}
		).bind({
			focusin : function(){select_root.addClass(option.overClass);},
			focusout : function(){select_root.removeClass(option.overClass);},
			mouseover : function(){select_root.addClass(option.overClass);},
			mouseout : function(){select_root.removeClass(option.overClass);},
			mousedown : function(){select_root.addClass(option.clickClass);},
			mouseup : function(){select_root.removeClass(option.clickClass);},
			keypress : function(){select_root.addClass(option.clickClass);},
			keyup : function(){select_root.removeClass(option.clickClass);}
		});
			
		if(select_type.prop("disabled")){
			select_root.addClass("disabled");
		}
	});
};
$.fn.designCheckbox.option = {
	checked		: "checked",
	disabled		: "disabled",
	overClass		: "over",
	clickClass	: "click"
};
$(".dcheck, .dcheck_type2").designCheckbox();

// Design radio
$.fn.designRadio = function(option){
	var option = $.extend({}, $.fn.designRadio.option, option);
	return this.each(function(){
	var select_root = $(this),
		select_type = select_root.find("input[type=radio]");
		$(this).find('input[type=radio]').click(function(){
			select_root.find('input[type=radio]').each(function(){
				if($(this).prop('checked')){
					$(this).parent().addClass('checked');
				}else{
					$(this).parent().removeClass('checked');
				}
			});
		});
		if($(this).find('input[type=radio]').prop('checked')){
			$(this).addClass('checked');
		}
		select_type.bind({
			mousedown : function() {$(this).parent().addClass("click");},
			mouseup : function() {$(this).parent().removeClass("click");},
			mouseover : function(){$(this).parent().addClass("over");},
			mouseout : function(){$(this).parent().removeClass("over");},
			focusin : function(){$(this).parent().addClass("over");},
			focusout : function(){$(this).parent().removeClass("over");}
		});
			
		if(select_type.prop("disabled")){
			select_root.addClass("disabled");
		}
	
	});
};
$.fn.designRadio.option = {
	checked		: "checked",
	disabled		: "disabled",
	overClass		: "over",
	clickClass	: "click"
};
$(".set_radio").designRadio();