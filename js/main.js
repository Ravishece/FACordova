/* Produce List page scripts - start  */
//$(document).ready(function(){
  $('.sr-icon-list a').on('click',function(e){
    e.preventDefault();
    $(this).parents('.sr-icon-list').children('li').removeClass('active');
    $(this).parent().addClass('active');

    if($(this).parent('li').hasClass('grid-icon')){
      $('.produce-container').addClass('grid-view');
      $('.produce-container').removeClass('hide');
      // $('.map-container').addClass('hide');
      // $('.map-container').removeClass('show-map');
    }else if($(this).parent('li').hasClass('list-icon')){
      $('.produce-container').removeClass('grid-view');
      $('.produce-container').removeClass('hide');
      // $('.map-container').addClass('hide');
      // $('.map-container').removeClass('show-map');
    }else if($(this).parent('li').hasClass('map-icon')){
      $('.produce-container').addClass('hide');
      // $('.map-container').removeClass('hide').removeClass('small-element');
      // $('.map-container').addClass('show-map');
    }
  });
//});
/* Produce List page scripts - end  */

/* Login form scripts - start  */
$('.login-form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.login-form .tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.login-form .tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

/* Login form scripts - end  */
