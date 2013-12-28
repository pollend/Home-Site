var offset = 0;

jQuery(document).ready(function() {

	jQuery("#slide_options .slides_option_container").each(function(element){
		SetUpSlide(jQuery(this));

	});

	jQuery("#addSlide").on("click",function(){

		var index = offset + jQuery("#slide_options")[0].childElementCount;
		jQuery("#slide_options").append("<div class='slides_option_container'><input class='upload_image' type='text' size='36' name='gray_home_options[Slide]["+index+"][image]' /><input class='upload_image_button' type='button' value='Upload Image' /><input class='remove_slide' type='button' value='remove' /></br>Input raw HTML into slide: <input name='gray_home_options[Slide]["+index+"][ishtml]'  value='1' type='checkbox'/></div>");
		SetUpSlide(jQuery(jQuery("#slide_options")[0].children[jQuery("#slide_options")[0].childElementCount -1]));
	});
});

function SetUpSlide(slide)
{
	 	slide.find(".upload_image_button").on("click",{field : slide.find(".upload_image")},function(event) {
			 formfield = jQuery(event.data.field).attr('name');

			window.send_to_editor = function(html) {
			 imgurl = jQuery('img',html).attr('src');
			 jQuery(event.data.field).val(imgurl);
			 tb_remove();
			}

			 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');

			 return false;
		});

		slide.find(".remove_slide").on("click",{sl : slide},function(event){
			offset++;
			event.data.sl.remove();
		});
}