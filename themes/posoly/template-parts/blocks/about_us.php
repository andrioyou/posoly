<?php

// ABOUT US
global $page_block;

?>

<div class="p-about-us">
    <div class="p-section p-section--white">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-about-us__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-about-us__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <div class="p-about-us__content p-content">
                <?php if ( !empty($page_block['content']) ) : ?>
                    <?php echo ( $page_block['content'] ); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
