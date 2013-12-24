<div id="slidePresentation" class="center-width" >
		<div id="slide" >
			<?php

			 $themeOptions = get_option("gray_home_options");

			if($themeOptions["numslides"] == 1)
			{
				if(!empty($themeOptions["isHTML0"]))
				{

					echo $themeOptions["Slide0"];
				}
				else
				{
			?>
				<img class="fullSlideImage"src="<?php echo  $themeOptions["Slide0"] ?>">
				<?php
				}
			}
			else if($themeOptions["numslides"] > 1)
			{
				?>
				<div id="slideContainer" >
					<ul id="slides">
						<?php 
						for($x = 0; $x < $themeOptions["numslides"]; $x++)
						{
							if(!empty($themeOptions["isHTML".$x]))
							{
								?>
								<li id="slide<?php echo $x; ?>"> <?php echo  $themeOptions["Slide" .$x] ?> </li>
								<?php
							}
							else
							{
								?>
									<li id="slide<?php echo $x; ?>" ><a><img class="fullSlideImage"src="<?php echo  $themeOptions["Slide" .$x] ?>"></img></a></li>
								<?php
							}
						}
						?>

					</ul>
				</div>
				<ul id="slideSelect"></ul>
				<a  id="slideLeft" ><div></div></a>
				<a id="slideRight"><div></div></a>
				<?php
			}
			else
			{
				?>
				<div id="slideContainer">
					<ul id="slides">
						<li id="slide0"><a><img class="fullSlideImage"src="<?php echo  bloginfo('template_directory'); ?>/images/two-hundred.png"></img></a></li>
						<li id="slide1"><a><img class="fullSlideImage"src="<?php echo  bloginfo('template_directory'); ?>/images/six-three.png"></img></a></li>
					</ul>
				</div>
				<ul id="slideSelect"></ul>
				<a  id="slideLeft" ><div></div></a>
				<a id="slideRight"><div></div></a>
				<?php
			}
			?>
			<div id="slideBorder"></div>
		</div>
	
</div>

<div class="center-width" id="project-blog-viewer">

	<div id="project-view">
		<h3>Projects</h3>
		<div class="project multi-view">
		<?php $projects = get_option("gray_project_options");
		  foreach($projects["projects"] as &$val):
		?>
			<div>
				<div class="project-container" >
					<div class="title"><?php echo $val["title"]?></div>
					<a href="<?php echo $val["link"]?>">
						<div class="projevt-image-view">
							<img class="image" src="<?php echo $val["image"]?>" style="width:100%; height:auto;"/>
							<div class="description" style="top:100%"><div><?php echo $val["description"]?></div></div>
						</div>
					</a>
				</div>
			</div>
			
		<?php endforeach; ?>
		</div>
	</div>

</div>
