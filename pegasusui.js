import * as Elements from './elements.js'

$(function(){
  $.get("/menu.html", function(data){
    $("#navbarload").replaceWith(data);
  });
  $(document).on('action--nav', function(){
    var drawer = mdcElements['drawer'];
	  drawer.open = !drawer.open;
  });
	$('.mdc-button,.mdc-list-item').each(function(){
		mdc.ripple.MDCRipple.attachTo(this);
	});
});