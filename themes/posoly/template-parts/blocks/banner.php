<?php

// BANNER
global $page_block;

?>

<div class="p-banner js-banner">
    <?php if ( ! empty( $page_block['bg_images'] ) ) : ?>
        <div class="p-banner__images">
            <div class="swiper swiper-1">
                <div class="swiper-wrapper">
                    <?php foreach ( $page_block['bg_images'] as $item ) :
                        $image = $item['image'];
                    ?>
                        <div class="swiper-slide">
                            <div class="p-banner__image" >
                                <img src="<?php echo esc_url($image['url']); ?>" class="js-bg" alt="Banner image <?php echo esc_html($image['title']); ?>" />
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    <?php endif; ?>
    <div class="p-banner__overlay">
        <div class="container">
            <div class="p-banner__content">
                <?php if ( !empty($page_block['title']) ) : ?>
                    <h1 class="p-banner__title text-handwriting">
                        <?php echo esc_html( $page_block['title'] ); ?>
                    </h1>
                <?php endif; ?>
                <?php if ( !empty($page_block['description']) ) : ?>
                    <p class="p-banner__description">
                        <?php echo ( $page_block['description'] ); ?>
                    </p>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <button class="p-banner__button js-banner-button">
        <i class="icon ion-md-arrow-down"></i>
    </button>
</div>
