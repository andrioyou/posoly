<?php

// INSTAGRAM
global $page_block;

?>

<div class="p-instagram">
    <div class="p-content">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-instagram__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-instagram__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <div class="p-instagram__list"></div>
        </div>
    </div>
</div>
