<?php 

	add_action('admin_init', 'gray_project_init');
    function gray_project_init(){
    	register_setting( 'gray_project_options', 'gray_project_options');

    	wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
		wp_register_script('project-options', get_template_directory_uri() .'/admin/projectOptions.js', array('jquery','media-upload','thickbox'));
		wp_enqueue_script('project-options');
		wp_enqueue_style('thickbox');
		wp_enqueue_style('project-page-style',get_template_directory_uri(). "/admin/projectOptions.css");
	}

	function gray_project_options_page()
	{
		if (!current_user_can('manage_options'))
	    {
	      wp_die( 'You do not have sufficient permissions to access this page.');
	    }

	    $options = get_option("gray_project_options");

	    $projects = array( );
	    foreach($options["projects"] as &$val) {
		   array_push( $projects,$val);
		}
		//print_r($projects);

		?>

		<div class="wrap">
		<?php screen_icon(); ?>
		<h2>Projects</h2>
		
		<form action="options.php" method="post" >
			<?php settings_fields('gray_project_options'); ?>

			<div id="project-container">


			<?php for($x = 0; $x < count($projects); $x++): ?>

				<div class="projects" >
					<a href="#" class="close">X</a>
					<div class="title">
						<a href="#" class="project-expand">+</a>
						<div class="project-title"><?php echo $projects[$x]["title"] ; ?></div>
					</div>
					<div class="main-container">
						<div>title:</div>
						<input type="text" name="gray_project_options[projects][<?php echo $x ; ?>][title]" value="<?php echo $projects[$x]["title"] ; ?>" />
						<div>link</div>
						<input type="text" name="gray_project_options[projects][<?php echo $x ; ?>][link]" value="<?php echo $projects[$x]["link"] ; ?>" />
						<div>projects:</div>
						<div class='upload'>
							<input class="upload-text" type="text" size="36" name="gray_project_options[projects][<?php echo $x ; ?>][image]" value="<?php echo $projects[$x]["image"] ; ?>" />
							<input class="upload-button" type="button" value="Upload Image" /></div>
						<div>description:</div>
						<textarea name="gray_project_options[projects][<?php echo $x ; ?>][description]"><?php echo $projects[$x]["description"]; ?></textarea>
					</div>
				</div>
	
			<?php endfor; ?>
			</div>
			<a href="#" id="add-project">add Project</a>
			<?php submit_button(); ?>
		</form>

		<?php
	}
?>