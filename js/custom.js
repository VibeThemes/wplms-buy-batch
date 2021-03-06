jQuery(document).ready(function($){

      $('.batch_seats,.batch_courses').on('change',function(){
            // Define Variables
            var batch_seats = $('.wplms_buy_batch_form').find('.batch_seats').val();
            var batch_courses = $('.wplms_buy_batch_form').find('.batch_courses').val();
            var batch_price = 0;

            // Calculate Pricee
            $.each(batch_courses,function(k,v){
                 var course_price = $('.batch_courses .price[value="'+v+'"]').attr('data-id');
                 var price = batch_seats * course_price;
                 batch_price += price;
            });

            // Remove class disabled if the price is not 0
            if(batch_price != 0){
                  $('#wplms_buy_batch').removeClass('disabled');
            }else{
                  $('#wplms_buy_batch').addClass('disabled');
            }
            
            // Display Price
            var currency_symbol = $('.wplms_buy_batch_form').find('.currency_symbol').text();
            if( !$('.batch_price').length ){
                  $('.batch_seats').after('<li class="batch_price_li"><label>Total Price</label><span class="batch_price"></span></li>');
            }
            $('.batch_price').text(currency_symbol+batch_price);
      });

      $('#wplms_buy_batch').on('click',function(){

            // Return if class is disabled
            if($(this).hasClass('disabled')){
                  return;
            }
            
            // Change Button Text
            $(this).text('.....');

            // Define Variables
		var batch_name = $('.wplms_buy_batch_form').find('.batch_name').val();
		var batch_courses = $('.wplms_buy_batch_form').find('.batch_courses').val();
            var batch_seats = $('.wplms_buy_batch_form').find('.batch_seats').val();
		if(batch_seats == 'undefined'){
                  batch_seats = $('.wplms_buy_batch_form').find('.batch_seats').attr('data-seats');
            }
            var batch_status = $('.wplms_buy_batch_form').find('.batch_status').attr('data-status');
            var buy_batch = $('.wplms_buy_batch_form').find('.buy_batch').attr('data-batch');

            // Ajax Call
            $.ajax({
            type: "POST",
            url: ajaxurl,
            data: { action: 'buy_wplms_batch',
            		batch_name: batch_name,
            		batch_courses: batch_courses,
            		batch_seats: batch_seats,
                        batch_status: batch_status,
                        buy_batch: buy_batch,
                  },
            cache: false,
            success: function (html) {
                  window.location.href = html;
            }
        });
	});

});
