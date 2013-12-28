<div id="slidePresentation" class="center-width" >
		<div id="slide" >
			<?php
				?>
				<div id="slideContainer" >
					<ul id="slides">
						<?php foreach (get_option("gray_home_options")["Slide"] as &$val): ?>

							<?php if(!empty($themeOptions["isHTML".$x])): ?>
								<li class="slide"> <?php echo  $val["image"] ?> </li>
							<?php else: ?>
								<li class="slide" ><a><img class="fullSlideImage"src="<?php echo  $val["image"] ?>"></img></a></li>
							<?php endif; ?>

						<?php endforeach;?>

					</ul>
				</div>
				<ul id="slideSelect"></ul>
				<a  id="slideLeft" ><div></div></a>
				<a id="slideRight"><div></div></a>

			<div id="slideBorder"></div>
		</div>
	
</div>
<script type="text/javascript" src="<?php echo  bloginfo('template_directory'); ?>/js/presentation.js"></script>
<div class="center-width" id="project-blog-viewer">

	<div id="project-view">
		<h3>Projects</h3>
		<div class="project multi-view">
		<?php 

			foreach(get_option("gray_project_options")["projects"] as &$val):
		?>
			<div>
				<div class="project-container" >
					<div class="title"><?php echo $val["title"]?></div>
					<a href="<?php echo $val["link"]?>">
						<div class="projevt-image-view">
							<div class="scroll-image-container">
								<?php foreach ($val["image"] as &$images): ?>
									<img class="image" src ="<?php echo $images?>"/>
								<?php endforeach; ?>
							</div>
							<div class="description" style="top:100%"><div><?php echo $val["description"]?></div></div>
						</div>
					</a>
				</div>
			</div>
			
		<?php endforeach; ?>
		</div>
	</div>
	<script type="text/javascript" src="<?php echo  bloginfo('template_directory'); ?>/js/project.js"></script>

</div>
