(function(window, document, undefined) {
	
    var $win, doc_H, $fullPageWrap, $fullPageInner, fullPageInner_H, margin_box, $popupLayer;

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

    /**
     * 브라우저 창 높이 값을 구해서 .picture, .aside 요소 높이 값을 설정
     * .picture img 요소에 margin-top 값 설정
     * 브라우저 창 조정 시마다 호출되는 함수
     */
    function setHeight() {
        doc_H = $win.height();
        // .picture, .aside 요소에 height 속성 값을 doc_H 설정
        if (!$fullPageWrap) { $fullPageWrap = $('.full_page'); }
        $fullPageWrap.css('height', doc_H);
        // .picture img 요소의 높이 값을 img_H 에 참조
        if (!$fullPageInner) { $fullPageInner = $fullPageWrap.find('.full_page_inner'); }
        fullPageInner_H = $fullPageInner.height();
        console.log(fullPageInner_H);
        // .picture img 요소에 유동적으로 margin-top 적용
        margin_box = ( doc_H - fullPageInner_H ) / 2;
        // $img 참조 요소에 margin-top 값을 margin-_box 값으로 설정
        $fullPageInner.css({
        	'padding-top': margin_box,
        	'padding-bottom': margin_box
        });
    }



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
$(".dcheck").designCheckbox();

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