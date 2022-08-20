<?php

function register_custom_post_type() {

  // Produt
  register_post_type('product',
    array(
      'labels' => array(
        'name' => esc_html__('Product', 'posoly'),
        'singular_name' => esc_html__('Product', 'posoly'),
      ),
      'supports' => array('title', 'thumbnail', 'excerpt', 'editor'),
      'menu_icon' => 'dashicons-products',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'product', 'with_front' => false),
    )
  );
  register_taxonomy(
    'product-category',
    'product',
    array(
      'label' => esc_html__('Categories', 'posoly'),
      'rewrite' => array(
        'slug' => 'product-category',
        'with_front' => false
      ),
      'show_admin_column'     => true,
      'hierarchical'          => true,
    )
  );
}

add_action('init', 'register_custom_post_type', 0);