<?php
/**
 * Plugin Name: JSON API - Media Controller
 * Version:     0.0.1
 * Author:      Eric Mulder
 * Author URI:  https://emdevelopment.nl
 * Plugin URI:  https://emdevelopment.nl
 * Description: Extensions to the JSON API plugin, to enable file upload
 * Licence:     GPLv2+
 */
function add_media_controller($controllers) {
  $controllers[] = 'Media';
  return $controllers;
}
add_filter('json_api_controllers', 'add_media_controller');
function set_media_controller() {
  return dirname(__FILE__) ."/fileupload.api.php";
}
add_filter('json_api_media_controller_path', 'set_media_controller');
class JSON_API_Media_Controller {
  public function upload() {
    if ( ! function_exists( 'wp_handle_upload' ) ) {
      require_once( ABSPATH . 'wp-admin/includes/file.php' );
    }
    $uploadedfile = $_FILES['file'];
    $upload_overrides = array( 'test_form' => false );
    $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
    if ( $movefile && !isset( $movefile['error'] ) ) {
      $message  = $movefile;
      $status = "ok";
    } else {
      /**
    	 * Error generated by _wp_handle_upload()
    	 * @see _wp_handle_upload() in wp-admin/includes/file.php
    	 */
      $status = "error";
      $message = $movefile['error'];
    }
    return array(
      "status" => $status,
      "message" => $message
    );
  }
}
