var _offset = 0;
var _imageOffset = 0;
jQuery(document).ready(function() {

	for(var x = 0; x < jQuery("#project-container")[0].childElementCount;x++)
	{
		var lproject = jQuery("#project-container")[0].children[x];
		SetUpProject(jQuery(lproject),x);
	}

	jQuery("#add-project").on("click",function()
	{
		var lprojectContainer = jQuery("#project-container");
		var lindex = (lprojectContainer[0].childElementCount + _offset).toString();
		lprojectContainer.append("<div class='projects' ><a href='#' class='close'>X</a><div class='title'><a href='#' class='project-expand'>+</a><div class='project-title'></div></div><div class='main-container'><div>title:</div><input type='text' name='gray_project_options[projects][" + lindex + "][title]' /><div>link</div><input type='text' name='gray_project_options[projects][" + lindex + "][link]' /><div>projects:</div><div class='upload'></div><a href='#' class='add-project'>add project</a><div>description:</div><textarea name='gray_project_options[projects][<?php echo $x ; ?>][description]'></textarea></div></div>");

		SetUpProject(jQuery(lprojectContainer[0].children[lprojectContainer[0].childElementCount -1]),lindex);
		return false;
	});

});

function SetUpProject(project,index)
{

	project.find(".close").on("click",{mainProject: project},function(event){
		event.data.mainProject.remove();
		_offset++;
		return false;
	});
	project.find(".upload div").each(function(element){

		SetUpImageUpload(jQuery(this));
	});

	project.find(".add-project").on("click",{mainContainer:project,i:index},function(event){
		event.data.mainContainer.find(".upload").append("<div><input class='upload-text' type='text' size='36' name='gray_project_options[projects]["+event.data.i+"][image]["+(event.data.mainContainer.find(".upload")[0].childElementCount+_imageOffset)+"]' /><input class='upload-button' type='button' value='Upload Image' /><input class='remove-button' type='button' value='Remove' /></div>");
		SetUpImageUpload(jQuery(event.data.mainContainer.find(".upload")[0].children[event.data.mainContainer.find(".upload")[0].childElementCount -1]));
		return false;
	});


	project.find(".project-expand").on("click",{mainContainer : project.find(".main-container")},function(event){
		if(event.data.mainContainer.hasClass("expand"))
		{
			event.data.mainContainer.removeClass("expand");
		}
		else
		{
			event.data.mainContainer.addClass("expand");
		}
		return false;
	});
}

function SetUpImageUpload(image)
{
		image.find(".remove-button").on("click",{main:image},function(event){
			event.data.main.remove();
			_imageOffset++;
			return false;
		});

		image.find(".upload-button").on("click",{field : image.find(".upload-text")},function(event) {
			 formfield = jQuery(event.data.field).attr('name');

			window.send_to_editor = function(html) {
			 imgurl = jQuery('img',html).attr('src');
			 jQuery(event.data.field).val(imgurl);
			 tb_remove();
			}

			 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');

			 return false;
		});
}