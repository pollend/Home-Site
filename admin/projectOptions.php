<?php 

	register_setting( 'gray_project_options', 'gray_project_options');

	function gray_project_options_page()
	{
		if (!current_user_can('manage_options'))
	    {
	      wp_die( 'You do not have sufficient permissions to access this page.');
	    }

	    $options = get_option("gray_project_options");

		?>

		<div class="wrap">
		<?php screen_icon(); ?>
		<h2>Projects</h2>
		
		<form action="options.php" method="post" >
			<?php settings_fields('gray_project_options'); ?>

			<div id="project-container">


			<?php 
			print_r($options);
			if( count($options["projects"])  > 0)
			{
		    $projects = array( );
		    foreach($options["projects"] as &$val) {
			   array_push( $projects,$val);
			}

			for($x = 0; $x < count($projects); $x++): ?>

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
							<?php 
							if(count($projects[$x]["image"]) > 0 )
							{

								$project_images = array();
								foreach($projects[$x]["image"] as &$val) {
								   array_push( $project_images,$val);
								}

								for($y = 0; $y < count($project_images);$y++):
								 ?>

									<div><input class="upload-text" type="text" size="36" name="gray_project_options[projects][<?php echo $x ; ?>][image][<?php echo $y ; ?>]" value="<?php echo $project_images[$y] ; ?>" /><input class="upload-button" type="button" value="Upload Image" /><input class="remove-button" type="button" value="Remove" /></div>
								
								<?php endfor;
							}
							?>

						</div>
						<a href="#" class="add-project">add project</a>
						<div>description:</div>
						<textarea name="gray_project_options[projects][<?php echo $x ; ?>][description]"><?php echo $projects[$x]["description"]; ?></textarea>
					</div>
				</div>
	
			<?php endfor; 
}
			?>
			</div>
			<a href="#" id="add-project">add Project</a>
			<?php submit_button(); ?>
		</form>

		<?php
	}
?>