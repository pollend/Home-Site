var allVideos = 0;
var contentAreaWidth;

var smallWindowMenu = false;

function resizeMainArea(){

	if(jQuery("#menu-drop-down").is(":visible") )
	{
		jQuery(".children").css("display","block");
		smallWindowMenu = true;
	}
	else
	{
		jQuery(".children").css("display","none");
		smallWindowMenu = false;
	}

	jQuery("#page").height("auto");
	var extraSpace = (jQuery(document).height() - jQuery("#page").height()) + jQuery("#footer").height();


	if(extraSpace != 0)
		jQuery("#page").height(jQuery("#page").height() + extraSpace);


}

function pageUpdate()
{
	contentAreaWidth = jQuery(".entry").width();

	allVideos.each(function(){
		jQuery(this).width(contentAreaWidth);
		jQuery(this).height(contentAreaWidth * jQuery(this).data('aspectRatio'));
	});
	resizeMainArea();

}

jQuery(document).ready(function () {

	if (!jQuery.support.transition)
  		jQuery.fn.transition = jQuery.fn.animate;

  	jQuery(".sub-menu").each(function(){
		jQuery(this).addClass("children");
	});
	
	jQuery(".menu li").each(function(element){
		if(jQuery(this).find(".children").length > 0)
		{
			jQuery(this).attr("id","item-" + element);

			jQuery("#"+this.id + ", #" + this.id + ">.children").on("mouseenter",{submenu:jQuery("#"+this.id + ">.children")},function(event){
				if(smallWindowMenu === false)
				event.data.submenu.css("display","block");

			});

			jQuery("#"+this.id + " , #" + this.id + ">.children").on("mouseleave",{submenu:jQuery("#"+this.id + ">.children")},function(event){
				if(smallWindowMenu === false)
				event.data.submenu.css("display","none");
			});
		}

	});

	//on textarea resize, update the main area
	jQuery("textarea").on("autosize.resize",jQuery.debounce(1000,function()
	{
		resizeMainArea();
	}));

	jQuery("#project-blog-select>.project").on("click",function(){
		jQuery("#project-blog-viewer>.container>.blog").css({"display":"none"});
		jQuery("#project-blog-viewer>.container>.project").css({"display":"block"});
		resizeMainArea();
	});
	
	jQuery("#project-blog-select>.blog").on("click",function(){
		jQuery("#project-blog-viewer>.container>.project").css({"display":"none"});
		jQuery("#project-blog-viewer>.container>.blog").css({"display":"block"});
		resizeMainArea();
	});



	jQuery("#drop-down-button").on("click",function(){
		if(jQuery("#menu-container").hasClass('up'))
		{
	
			jQuery(".menu").css("height","auto");
			var menuHeight = jQuery(".menu").height();
			jQuery(".menu").css("height","0px");
			jQuery(".menu").transition({height:menuHeight},500);
			jQuery("#drop-down-icon").transition({rotate:"-180deg"},500,function()
			{
				jQuery("#drop-down-icon").attr("style","");
				jQuery("#menu-container").removeClass("up").addClass("down");
			});
		}
		else
		{
			jQuery(".menu").transition({height:0},500);
			jQuery("#drop-down-icon").transition({rotate:"180deg"},500,function()
			{
				jQuery("#drop-down-icon").attr("style","");
				jQuery("#menu-container").removeClass("down").addClass("up");
			});
		}
	});

});

jQuery(window).resize(jQuery.throttle(200,function () {
	pageUpdate();
}));


jQuery(window).load(function(){

	allVideos = jQuery("#contentContainer iframe[src^='http://www.youtube.com']");

	allVideos.each(function(){
		jQuery(this).data('aspectRatio',this.height/this.width);
		jQuery(this).removeAttr('height').removeAttr('width');
	});

	pageUpdate();
});



