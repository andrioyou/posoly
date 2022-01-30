<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package posoly
 */

get_header();
?>

	<section class="error-404 not-found">
		<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'posoly' ); ?></h1>

		<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'posoly' ); ?></p>

		<?php
		// get_search_form();
		?>

	</section>

<?php
get_footer();
