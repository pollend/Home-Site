var slides = new Array();
var slideSelect = new Array();
var currentPage = 1;

jQuery(document).ready(function () {
	jQuery("#slideLeft").on("click",function(){
		SwitchToSlide(currentPage-1);
	});

	jQuery("#slideRight").on("click",function(){
		SwitchToSlide(currentPage+1);
	});

	jQuery("#slides li").each(function(element){
		slides.push(jQuery(this));
		jQuery("#slideSelect").append("<li></li>");

		slideSelect.push(jQuery("#slideSelect")[0].children[jQuery("#slideSelect")[0].childElementCount-1]);

		jQuery("#slideSelect"+element).on("click",{index : element},function(event){
			SwitchToSlide(event.data.index);
		});
	});
	SwitchToSlide(0);


});

jQuery(window).resize(jQuery.throttle(200,function () {
	updateSlides();
}));


jQuery(window).load(function(){
	updateSlides();
});

function updateSlides()
{
	var slideWidth = jQuery("#slide").width();
	jQuery("#slide").height(slideWidth*.5);
	pageUpdate();
}

function SwitchToSlide(index)
{
	var left= true;
	if(!jQuery(slides[currentPage]).is(':animated'))
	{
		if(index != currentPage){
			var oldPage = currentPage; 
			if(index >= slides.length)
			{
				currentPage = 0;
				left = false;
			}
			else if(index < 0)
			{
				currentPage = slides.length-1;
				left = true;
			}
			else
			{
				currentPage = index;
				if(currentPage > oldPage)
					left = false;
				else
					left = true;
			}

			jQuery(slideSelect[currentPage]).css({"box-shadow":"0px 0px 0px black", background : "#444444"});
			jQuery(slideSelect[oldPage]).css({background:"","box-shadow":""});

			if(left)
			{
				jQuery(slides[currentPage]).css({"z-index":3,left:"200%"});
				jQuery(slides[currentPage]).transition({left : "0%"},500,function()
				{
					jQuery(slides[currentPage]).css({"z-index":2});
					jQuery(slides[oldPage]).css({"z-index":1});
				});
			}
			else
			{
				jQuery(slides[currentPage]).css({"z-index":3,left:"-100%"});
				jQuery(slides[currentPage]).transition({left : "0%"},500,function()
				{
					jQuery(slides[currentPage]).css({"z-index":2});
					jQuery(slides[oldPage]).css({"z-index":1});
				});
			}
		}
	}
}