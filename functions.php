<?php


    //places a home link on the page
    function gray_menu_args( $args ) {
         $args['show_home'] = true;
         return $args;
    }
    add_filter( 'wp_page_menu_args', 'gray_menu_args' );

    //sets the title of the page
    function gray_title($title, $sep){
        global $paged, $page;

        if ( is_feed() )
            return $title;

        $title .= bloginfo('name')  ;

         $title  =  $title . " Page " . $paged;

        return $title;
    }
    add_filter( 'wp_title', 'gray_title', 10, 2 );

    function gray_background_customizer()
    {
          /* Supply a list of built-in background that come with your theme */
            $backgrounds = array(
                'images/strip.png'
            );

            global  $wp_customize;
            $control =  $wp_customize->get_control( 'gray_pattern_repeat' );

            foreach ( (array) $backgrounds as $background )
                $control->print_tab_image( esc_url_raw( get_stylesheet_directory_uri() . '/' . $background ) );
    }

   

    //customizer preview script
    function gray_customizer_live_preview()
    {
        wp_enqueue_script( 
              'mytheme-themecustomizer',            //Give the script an ID
              get_template_directory_uri().'/js/preview.js',//Point to file
              array( 'jquery','customize-preview' ),    //Define dependencies
              '',                       //Define a version (optional) 
              true                      //Put script in footer?
        );
    }
    add_action( 'customize_preview_init', 'gray_customizer_live_preview' );

    //enqueue scripts
    function gray_script_style()
    {
        //add javascript to pages with comment form
        if ( is_singular() ) 
            wp_enqueue_script( 'comment-reply' );

        //get debounce script to prevent user event spam
        wp_enqueue_script( "debounce", get_template_directory_uri()."/js/debounce.js",array("jquery"),'1.1');

        //enqueue jquery and main javascript
        wp_enqueue_script('jquery');   

        //get main script
        wp_enqueue_script( "gray_main", get_template_directory_uri()."/js/main.js",array("jquery","debounce","transit"),'1.0.0');
    
        //image overlay script
        wp_enqueue_script("gray_imageOverlay",get_template_directory_uri()."/js/imageOverlay.js",array("gray_main"),'1.0.0');

        //register style sheet
        wp_enqueue_style( 'gray_style', get_stylesheet_uri(), array(), '1.0.0' );

        //image overly style sheet
        wp_enqueue_style( 'gray_imageOverlay', get_template_directory_uri() . "/imageOverlay.css", array(), '1.0.0' );

        //transit
         wp_enqueue_script( 'transit', get_template_directory_uri() . "/js/transit.js", array(), '1' );
    }
    add_action( 'wp_enqueue_scripts', 'gray_script_style' );

    //setup the theme and register the header and feed links
    function gray_setup()
    {
        // Add RSS links to <head> section
        add_theme_support( 'automatic-feed-links' );


        add_theme_support( 'custom-header', array(
            'random-default'         => false,
            'flex-height'            => true,
            'flex-width'             => true,
            'height'                 => 250,
            'width'                  => 960,
            'max-width'              => 2000,
            'header-text'            => true,
            'uploads'                => true,

        ));


        register_sidebar(array(
            'name' => 'Sidebar Widgets',
            'id'   => 'sidebar-widgets',
            'description'   => 'These are widgets for the sidebar.',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2>',
            'after_title'   => '</h2>'
        ));

        register_nav_menu( 'primary', 'Primary Menu' );
        
        if ( ! isset( $content_width ) )
         $content_width = 500;
    }
    add_action( 'after_setup_theme', 'gray_setup' );

    //add the admin options
    function gray_admin_menu()
    {
        include_once "admin/homeOptions.php";
        add_theme_page('gray home page', 'Theme Options', 'read', 'home', 'gray_home_options_page');
    }
    add_action('admin_menu','gray_admin_menu');


      //add the admin options
    function gray_project_menu()
    {
        include_once "admin/projectOptions.php";
        add_posts_page('gray project page', 'projects', 'read', 'project', 'gray_project_options_page');
    }
    add_action('admin_menu','gray_project_menu');

    function gray_home_init($hook){
        if($hook == "appearance_page_home"||$hook == "posts_page_project")
        {
            wp_enqueue_script('media-upload');
            wp_enqueue_script('thickbox');
            wp_enqueue_style('thickbox');
        }

        if($hook == "appearance_page_home")
        {
            wp_register_script('home-options', get_template_directory_uri() .'/admin/homeOptions.js', array('jquery','media-upload','thickbox'));
            wp_enqueue_script('home-options');
        }
        if($hook == "posts_page_project")
        {
            wp_register_script('project-options', get_template_directory_uri() .'/admin/projectOptions.js', array('jquery','media-upload','thickbox'));
            wp_enqueue_script('project-options');
            wp_enqueue_style('project-page-style',get_template_directory_uri(). "/admin/projectOptions.css");
        }
    }
     add_action('admin_enqueue_scripts', 'gray_home_init');



?>