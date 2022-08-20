<?php

// CONTACTS
global $page_block;

?>

<div class="p-contacts">
    <div class="p-section">
        <div class="container">
            <?php if ( !empty($page_block['title']) ) : ?>
                <h3 class="p-contacts__title"><?php echo esc_html( $page_block['title'] ); ?></h3>
            <?php endif; ?>
            <?php if ( !empty($page_block['description']) ) : ?>
                <p class="p-contacts__subtitle"><?php echo esc_html( $page_block['description'] ); ?></p>
            <?php endif; ?>
            <?php if ( ! empty( $page_block['list'] ) ) : ?>
                <div class="p-contacts__list row justify-content-center">
                    <?php foreach ( $page_block['list'] as $item ) : ?>
                        <div class="p-contacts__item col-sm-12 col-md-4 col-lg-3">
                            <a
                                href="<?php echo esc_html( $item['link_url'] ); ?>"
                                target="_blank"
                                class="p-contacts__icon-box"
                            >
                                <span class="p-contacts__icon ion-<?php echo esc_html( $item['icon'] ); ?>"></span>
                            </a>
                            <div>
                                <a
                                    href="<?php echo esc_html( $item['link_url'] ); ?>"
                                    target="_blank"
                                    class="p-contacts__text"
                                >
                                    <?php echo esc_html( $item['text'] ); ?>
                                </a>
                            </div>
                            <a
                                class="p-contacts__link"
                                href="<?php echo esc_html( $item['link_url'] ); ?>"
                                target="_blank"
                            >
                                <?php echo esc_html( $item['link_text'] ); ?>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-8">
                    <?php if ( ! empty( $page_block['content'] ) ) : ?>
                        <div class="p-contacts__content">
                            <?php echo ( $page_block['content'] ); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>
