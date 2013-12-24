<?php get_header(); ?>
<div id="main" class="center-width">
	<div id="blog-container">
		<div id="contentContainer" >
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					
				<div <?php post_class() ?> id="post-<?php the_ID(); ?>">

					<div class="postTitle"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></div>

					<div class="meta"></div>


					<div class="entry">
						<?php the_content(); ?>
						
					</div>

				</div>
					<?php comments_template(); ?>

				<?php endwhile; endif; ?>


			</div>

			<div id="sidebarContainer">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>


<?php get_footer(); ?>
