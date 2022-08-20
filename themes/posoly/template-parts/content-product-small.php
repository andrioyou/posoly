<?php 
    $price = get_field( 'price');
?>

<div class="p-product-small">
    <div class="p-product-small__main">
        <a class="p-product-small__img-link" href="<?php echo get_the_permalink(); ?>" style="background-image: url(<?php echo get_the_post_thumbnail_url(get_the_ID(),'large'); ?>)">
            <?php // echo wp_get_attachment_image( get_post_thumbnail_id(), 'large', false, array( 'class'=>'p-product-small__img' ) ); ?>
        </a>
        <?php if ( !empty($price) ) : ?>
            <span class="p-product-small__price"><?php echo $price; ?></span>
        <?php endif; ?>
    </div>
    <div class="p-product-small__text">
        <a class="p-product-small__link" href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a>
        <p class="p-product-small__desc"><?php echo get_the_excerpt() ?></p>
    </div>
</div>