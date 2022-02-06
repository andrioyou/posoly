<?php

// ABOUT US
global $page_block;

?>

<div class="p-about-us">
    <div class="p-content">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-about-us__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-about-us__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <div class="p-about-us__content"></div>
        </div>
    </div>
</div>
