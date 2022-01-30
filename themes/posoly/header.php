<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package posoly
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
	
<div class="p-site">
	<header class="p-site__header p-header js-header">
		<div class="p-header__main">
			<div class="container">	
				<div class="p-header__main-line">

					<h1>Header</h1>

					<!-- LOGO -->
					<!-- <div class="p-header__logo">
						<?php $logo = get_field('logo', 'option'); ?>
						<?php if (!empty($logo)): ?>
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo $logo['url'] ?>" alt="logo"></a>
						<?php else: ?>
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo('name'); ?></a>
						<?php endif; ?>
					</div> -->

					<!-- NAVIGATION -->
					<nav class="p-header__navigation">
						<?php
							// olea_main_menu();
						?>
						
					</nav>

					<!-- HAMBURGER BUTTON -->
					<button class="p-header__hamburger hamburger hamburger--collapse js-toggle-menu" aria-label="mobile menu open" type="button">
						<span class="hamburger-box">
							<span class="hamburger-inner"></span>
						</span>
					</button>			

				</div>
			</div>
		</div>
	</header><!-- header -->

	<main class="p-site__content">
