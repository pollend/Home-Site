<?php


	register_setting( 'gray_home_options', 'gray_home_options');

function gray_home_options_page()
{
	if (!current_user_can('manage_options'))
    {
      wp_die( 'You do not have sufficient permissions to access this page.');
    }

		
		$options = get_option("gray_home_options");
	?>
	<script type="text/javascript">
	</script>

	<div class="wrap">
	<?php screen_icon(); ?>
	<h2>Theme Options</h2>
	    
	<form action="options.php" method="post" >
		<?php settings_fields('gray_home_options'); ?> 
		
		<div>Note: images will have to maintain a 2:1 ratio to function properly in the slide show</div>
		<div>Note: A single slide will be viewed without a carousel </div>
		<div>Note: enable HTML input allows html to be directly placed into each slide</div>

    	
        
	        <div id="slide_options">
		        <?php 
		        $slides =  array();
		        foreach($options["Slide"] as &$val) {
				   array_push($slides,$val);
				}
				print_r($slides);
		        for($x = 0; $x < count($slides); $x++)
		        {
		        	?>
		        	<div class="slides_option_container">
						<input class="upload_image" type="text" size="36" name='gray_home_options[Slide][<?php echo $x; ?>][image]' value="<?php echo  htmlentities($slides[$x]["image"]) ?>" />
						<input class="upload_image_button" type="button" value="Upload Image" />
						<input class="remove_slide" type="button" value="remove" /></br>Input raw HTML into slide: 
						<input name='gray_home_options[Slide][<?php echo $x; ?>][ishtml]' <?php echo empty($slides[$x]["ishtml"]) ? "" : "checked"; ?> value="1" type="checkbox"/>
					</div>
		        	<?php
		        }
		        ?>
	        </div>
	         <div><a id="addSlide" href="#">add Slide</a></div>
        

		<?php submit_button(); ?>
	</form>

	<?php
}
?>