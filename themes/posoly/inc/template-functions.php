<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package posoly
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function posoly_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'posoly_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function posoly_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'posoly_pingback_header' );

/**
 * Main Menu
 */
if(!function_exists('posoly_main_menu')) {
	function posoly_main_menu() {
	  wp_nav_menu( array(
		'theme_location' => 'primary-menu',
		'menu_id'        => 'primary-menu',
	  ) );
	}
}

/*
 * Options page for ACF PRO
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}
