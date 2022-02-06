<?php

// CONTACTS
global $page_block;

?>

<div class="p-contacts">
    <div class="p-content">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-contacts__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-contacts__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <div class="p-contacts__list"></div>
        </div>
    </div>
</div>
