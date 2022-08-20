<?php

// PRODUCTS
global $page_block;

// PRODUCTS
$args = array(
    'post_type'=> 'product',
    'orderby'        => 'date',
    'order'          => 'ASC',
    'posts_per_page' => -1,
);              

$products = new WP_Query( $args );

?>

<div class="p-products">
    <div class="p-section">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-products__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-products__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <div class="p-products__list row justify-content-center">
                <?php
                    if ( $products->have_posts() ) :
                        while ( $products->have_posts() ) :
                            $products->the_post(); ?>

                            <div class="p-products__item col-xl-4 col-lg-4 col-sm-6 col-12">
                                <?php get_template_part( 'template-parts/content', get_post_type() . '-small' ); ?>
                            </div>
                            
                        <?php
                        endwhile;
                    endif;
                ?>
            </div>
        </div>
    </div>
</div>
