<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package posoly
 */

get_header();
?>

	<?php if ( have_posts() ) : ?>

		<h1>
			<?php
			printf( esc_html__( 'Search Results for: %s', 'posoly' ), '<span>' . get_search_query() . '</span>' );
			?>
		</h1>

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'search' );

		endwhile;

		the_posts_navigation();

	else :

		get_template_part( 'template-parts/content', 'none' );

	endif;

get_footer();
