<?php

date_default_timezone_set( 'America/New_York' );
define( 'IS_DEV', false );

require 'vendor/autoload.php';

$app = new \Slim\Slim(
  array(
    'templates.path' => 'views',
    'view' => new \Slim\Views\Twig(),
  )
);

$app->get( '/', function() use ( $app )
{
  $title = "Character Entity Reference Chart";
  $body_class = "home md-hide-body";
  $app->render( 'home.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'year' => '2016',
    'is_dev' => IS_DEV,
  ));
});

$app->run();
