<?php

// INSTAGRAM
global $page_block;

?>

<div class="p-instagram">
    <div class="p-section">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-instagram__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-instagram__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <?php if ( !empty($page_block['shortcode']) ) : ?>
                <div class="p-instagram__shortcode">
                    <?php echo do_shortcode($page_block['shortcode']); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
