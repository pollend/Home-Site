var slides = new Array();
var slideSelect = new Array();
var currentPage = 1;

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

	jQuery("#project-view .project").each(function(){

		jQuery(this).find(".projevt-image-view").on("mouseenter",function(){
			jQuery(this).find(".description").transition({top:0},500);

		});
		jQuery(this).find(".projevt-image-view").on("mouseleave",function(){
			jQuery(this).find(".description").transition({top:"100%"},500);
		});
	});

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




	SizeElements();
	SetUpSlide();

	jQuery("#slideLeft").on("click",function(){
		SwitchToSlide(currentPage-1);
	});

	jQuery("#slideRight").on("click",function(){
		SwitchToSlide(currentPage+1);
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
	SizeElements();
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

//SLIDE SHOW--------------------------------------------------------------------------------------
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


function SetUpSlide()
{
	jQuery("#slides li").each(function(element){
		slides.push( "#"+this.id);
		jQuery("#slideSelect").append("<li id=\"slideSelect"+element+"\"></li>");
		slideSelect.push("#"+"slideSelect"+element);

		jQuery("#slideSelect"+element).on("click",{index : element},function(event){
			SwitchToSlide(event.data.index);
		});
	});
	SwitchToSlide(0);
}

function SizeElements()
{
	var slideWidth = jQuery("#slide").width();
	jQuery("#slide").height(slideWidth*.25);
}