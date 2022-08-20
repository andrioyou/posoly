<?php
/**
 * posoly functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package posoly
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.get_template_directory_uri()
	define( '_S_VERSION', '1.0.0' );
}

defined( 'POSOLY_URI' ) or define( 'POSOLY_URI', get_template_directory_uri() );

if ( ! function_exists( 'posoly_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function posoly_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on posoly, use a find and replace
		 * to change 'posoly' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'posoly', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary-menu' => esc_html__( 'Primary', 'posoly' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		// add_theme_support(
		// 	'custom-background',
		// 	apply_filters(
		// 		'posoly_custom_background_args',
		// 		array(
		// 			'default-color' => 'ffffff',
		// 			'default-image' => '',
		// 		)
		// 	)
		// );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'posoly_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function posoly_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'posoly_content_width', 640 );
}
add_action( 'after_setup_theme', 'posoly_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function posoly_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'posoly' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'posoly' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'posoly_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function posoly_scripts() {
	wp_enqueue_style( 'posoly-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'posoly-style', 'rtl', 'replace' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'posoly_scripts' );

/**
 * Enqueue scripts and styles.
 */
function posoly_scripts_styles() {
	
	// STYLES
	wp_enqueue_style( 'posoly-style', get_stylesheet_uri() );

	wp_enqueue_style( 'swiper', POSOLY_URI . '/assets/css/libs/swiper.min.css' );

	wp_enqueue_style( 'aos-style', POSOLY_URI . '/assets/css/libs/aos.css' );

	wp_enqueue_style( 'ion-style', POSOLY_URI . '/assets/css/libs/ionicons.min.css' );

	wp_enqueue_style( 'main-style', POSOLY_URI . '/assets/css/style.css', array(), '20190516' );

	// SCRIPTS

	wp_enqueue_script( 'jarallax', POSOLY_URI . '/assets/js/libs/jarallax.min.js', array(), '20190516', true );
	
	wp_enqueue_script( 'jarallax-element', POSOLY_URI . '/assets/js/libs/jarallax-element.min.js', array(), '20190516', true );

	wp_enqueue_script( 'swiper', POSOLY_URI . '/assets/js/libs/swiper.min.js', array( 'jquery' ), '20190516', true );

	wp_enqueue_script( 'aos-script', POSOLY_URI . '/assets/js/libs/aos.js', array(), '20190516', true );

	wp_enqueue_script( 'posoly-main-script', POSOLY_URI . '/assets/js/main.js', array('jquery'), '20190516', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'posoly_scripts_styles' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Register custom post types
 */
require get_template_directory() . '/inc/register-post-types.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

// Remove Gutenberg Block Library CSS from loading on the frontend
function try_remove_wp_block_library_css(){
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'wc-block-style' ); // Remove WooCommerce block CSS
	wp_dequeue_style( 'global-styles' ); // Remove theme.json
}
add_action( 'wp_enqueue_scripts', 'try_remove_wp_block_library_css', 100 );

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );