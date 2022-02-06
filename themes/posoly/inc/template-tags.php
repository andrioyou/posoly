<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package posoly
 */

if ( ! function_exists( 'posoly_post_thumbnail' ) ) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function posoly_post_thumbnail() {
		if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
			return;
		}

		if ( is_singular() ) :
			?>

			<div class="post-thumbnail">
				<?php the_post_thumbnail(); ?>
			</div><!-- .post-thumbnail -->

		<?php else : ?>

			<a class="post-thumbnail" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
				<?php
					the_post_thumbnail(
						'post-thumbnail',
						array(
							'alt' => the_title_attribute(
								array(
									'echo' => false,
								)
							),
						)
					);
				?>
			</a>

			<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'wp_body_open' ) ) :
	/**
	 * Shim for sites older than 5.2.
	 *
	 * @link https://core.trac.wordpress.org/ticket/12563
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
endif;

/**
 * Check page content blocks
 * @param array $page_content - array with page blocks
 * @param string $block_slug - slug with needed block 
 * @return html
 */
if ( ! function_exists( 'posoly_display_page_blocks' ) ) {
    function posoly_display_page_blocks( $page_content = array() ) {
        if ( is_array( $page_content ) && ! empty( $page_content ) ) {
			global $page_block;
            
            foreach( $page_content as $page_block ) {
				
				$block_slug = $page_block['acf_fc_layout'];

				get_template_part( "/template-parts/blocks/" . $block_slug );
            }

        }
    }
}