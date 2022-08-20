<?php 
    $price = get_field( 'price');
    $content = get_the_content();
    $content_filtered = apply_filters( 'the_content', $content );
                    
?>

<div class="p-product">
    <div class="row">
        <div class="col-lg-6 col-md-12">
            <div class="p-product__main">
                <div class="p-product__img-link" style="background-image: url(<?php echo get_the_post_thumbnail_url(get_the_ID(),'large'); ?>)">
                </div>
                <?php if ( !empty($price) ) : ?>
                    <span class="p-product__price"><?php echo $price; ?></span>
                <?php endif; ?>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="p-product__text">
                <h1 class="p-product__title" ><?php echo get_the_title(); ?></h1>
                <?php if ( !empty(get_the_content()) ) : ?>
                    <div class="p-product__content p-content"><?php echo $content_filtered; ?></div>
                <?php else : ?>
                    <div class="p-product__content p-content"><?php echo get_the_excerpt(); ?></div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>