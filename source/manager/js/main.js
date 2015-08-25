(function() {
	var $contentsWrap, snb, content, snbHeight, contentHeight;
	
	$contentsWrap = $('#contents_wrap');
	snb = $contentsWrap.find('#snb');
	content = $contentsWrap.find('#contents');
	snbHeight = snb.height();
	contentHeight = content.height();


	if ( snbHeight>contentHeight ) {
		$contentsWrap.css({
			'height': snbHeight
		});
	} else{
		$contentsWrap.css({
			'height': contentHeight
		});
	};

	$('.button_snb_toggle').click(function(){
		if( $contentsWrap.hasClass('toggle_snb') ){
			$contentsWrap.removeClass('toggle_snb');
		} else {
			$contentsWrap.addClass('toggle_snb');
		}
	});

}());