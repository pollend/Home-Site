var _offset = 0;

jQuery(document).ready(function() {

	for(var x = 0; x < jQuery("#project-container")[0].childElementCount;x++)
	{
		var lproject = jQuery("#project-container")[0].children[x];
		SetUpProject(jQuery(lproject));
	}



	jQuery("#add-project").on("click",function()
	{
		var lprojectContainer = jQuery("#project-container");
		var lindex = (lprojectContainer[0].childElementCount + _offset).toString();
		lprojectContainer.append("<div class='projects'><a href='#' class='close'>X</a><div class='title'><a href='#' class='project-expand'>+</a><div class='project-title'></div></div><div class='main-container'><div>title:</div><input type='text' name='gray_project_options[projects][" + lindex + "][title]'/><div>link</div><input type='text' name='gray_project_options[projects][" + lindex + "][link]' value='' /><div>projects:</div><div class='upload'><input class='upload-text' type='text' size='36' name='gray_project_options[projects][" + lindex + "][image]' value='' /><input class='upload-button' type='button' value='Upload Image' /></div><div>description:</div><textarea name='gray_project_options[projects][" + lindex + "][description]'></textarea></div></div>");
		SetUpProject(jQuery(lprojectContainer[0].children[lprojectContainer[0].childElementCount -1]));
	});

});

function SetUpProject(project)
{
	project.find(".close").on("click",{mainProject: project},function(event){
		event.data.mainProject.remove();
		_offset++;
	});
	project.find(".upload").each(function(element){
		jQuery(this).find(".upload-button").on("click",{field : jQuery(this).find(".upload-text")},function(event) {
			 formfield = jQuery(event.data.field).attr('name');

			window.send_to_editor = function(html) {
			 imgurl = jQuery('img',html).attr('src');
			 jQuery(event.data.field).val(imgurl);
			 tb_remove();
			}

			 tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');

			 return false;
		});


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

	});
}