var projects = new Array();
var containerWidth = 0;
var containerHeight = 0;

jQuery(document).ready(function () {

});

jQuery(window).resize(jQuery.throttle(200,function () {
	updateSlides();
	updateProject();
}));

jQuery(window).load(function(){
	updateProject();
setUpProjectView();
pageUpdate();
		
});

function updateProject()
{
	jQuery("#project-view>.project>div").each(function(elemnent){


		var image = jQuery(this).find(".scroll-image-container");
		image.height(image.width());
	
		if(image.width() !== null)
		containerWidth = image.width();

		if(image.height() !== null)
		containerHeight = image.height();
	
		jQuery(this).find(".scroll-image-container .image").each(function(element)
		{
			if(jQuery(this).width() > jQuery(this).height())
			{
				jQuery(this).css({width:"auto",height:"100%",position:"absolute"});
			}
			else
			{
				jQuery(this).css({width:"100%",height:"auto",position:"absolute"});
			}
		});

		jQuery(this).find(".description").css({top:containerHeight});
	});
}

function setUpProjectView()
{
	jQuery("#project-view>.project>div").each(function(elements){
		jQuery(this).find(".scroll-image-container img").each(function(elements){
			if(elements == 0)
			{
				projects.push(new Array());
			}

			 projects[projects.length -1].push(this);
			 jQuery(this).css({"z-index":5});

			 if((jQuery(this).parent().find("img").length-1) == elements)
			 {
			 	
			 		jQuery(projects[projects.length -1][0]).css({"z-index":10});
				 	transition( projects.length -1,0);

			 }
		});
		
		jQuery(this).find(".projevt-image-view").on("mouseenter",{description:jQuery(this).find(".description")},function(event){
			event.data.description.transition({top:0},200);
			return false;
		});
		jQuery(this).find(".projevt-image-view").on("mouseleave",{description:jQuery(this).find(".description")},function(event){
			event.data.description.transition({top:event.data.description.height()},200);
			return false;
		});
	});
}

function transition(project_index,activeSlideIndex)
{
	var lprojects = projects[project_index];

	var lnextSlide = activeSlideIndex+1;
	if(lnextSlide > lprojects.length-1)
	{
		lnextSlide = 0;
	}

	if(lprojects.length == 1)
	{

		if( jQuery(lprojects[activeSlideIndex]).width()  > containerWidth)
		{
			if(parseInt(jQuery(lprojects[activeSlideIndex]).css("left")) < 0)
			{
				jQuery(lprojects[activeSlideIndex]).transition({left:0,delay:(2000 + (Math.random() * 2000))},(5000 + (Math.random() * 2000)),'linear' ,function(){
					
					 transition(project_index,0);
				});
			}
			else
			{
				var ltransition = jQuery(lprojects[activeSlideIndex]).width()-containerWidth ;
				jQuery(lprojects[activeSlideIndex]).transition({left:-ltransition,delay:(2000 + (Math.random() * 2000))},5000+ (Math.random() * 2000),'linear',function(){
					transition(project_index,0);
				});
			}
		}
		else
		{
			if(parseInt(jQuery(lprojects[activeSlideIndex]).css("top")) < 0)
			{
				jQuery(lprojects[activeSlideIndex]).transition({top:0,delay:(2000 + (Math.random() * 2000))},5000 + (Math.random() * 4000),'linear' ,function(){
					transition(project_index,0);
				});
			}
			else
			{
				var ltransition = jQuery(lprojects[activeSlideIndex]).height() - containerHeight;
				jQuery(lprojects[activeSlideIndex]).transition({top:-ltransition,delay:(2000 + (Math.random() * 2000))},5000+ (Math.random() * 4000),'linear',function(){
					transition(project_index,0);
				});
			}
		}
	}
	else
	{
		if( jQuery(lprojects[activeSlideIndex]).width()  > containerWidth)
		{
			var ltransition = jQuery(lprojects[activeSlideIndex]).width() - containerWidth;
			jQuery(lprojects[activeSlideIndex]).transition({left:-ltransition,delay:(2000 + (Math.random() * 2000))},5000+ (Math.random() * 2000),'linear',function(){
				jQuery(lprojects[activeSlideIndex]).transition({left:-jQuery(lprojects[activeSlideIndex]).width()},1000,'linear',function(){
					jQuery(lprojects[activeSlideIndex]).css({"z-index":5,"left":0});
					transition(project_index,lnextSlide);
				});
				jQuery(lprojects[lnextSlide]).css({"z-index":10,"left":containerWidth}).transition({left:0},1000,'linear');
			});
		}
		else
		{
			var ltransition = jQuery(lprojects[activeSlideIndex]).height() - containerHeight;
			jQuery(lprojects[activeSlideIndex]).transition({top:-ltransition,delay:(2000 + (Math.random() * 2000))},5000+ (Math.random() * 2000),'linear',function(){
				jQuery(lprojects[activeSlideIndex]).transition({left:-jQuery(lprojects[activeSlideIndex]).width()},1000,'linear',function(){
					jQuery(lprojects[activeSlideIndex]).css({"z-index":5,"left":0,"top":0});
					transition(project_index,lnextSlide);
				});
				jQuery(lprojects[lnextSlide]).css({"z-index":10,"left":containerWidth}).transition({left:0},1000,'linear');
			});
		}
	}
	
}