# project-name
Brief description of project

# Dependencies
## PHP
This is a PHP project. The only PHP file you'll have is the `index.php` -- because Twig.

## Slim
Slim is a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs.

We're using Slim to create our routes.

[Homepage](http://www.slimframework.com/)

[Documentation](http://www.slimframework.com/docs/)

## Composer
Dependency Manager for PHP

[Homepage](https://getcomposer.org/)

[Installation](https://getcomposer.org/download/)

To set globally, you will need to `mv composer.phar /usr/local/bin/composer`

## Twig
The flexible, fast, and secure template engine for PHP

[Homepage](http://twig.sensiolabs.org/)

[Documentation](http://twig.sensiolabs.org/documentation)

## Compass<a name="compass"></a>
Compass is an open-source CSS Authoring Framework.

[Homepage](http://compass-style.org/)

[Installation](http://compass-style.org/install/)

To use, run `compass watch` from the `scss` directory.

Please refer to `scss/config.rb` if you need to change anything about the configuration.

###To build for production
#### Compress CSS
`cd scss && compass compile --output-style compressed --environment production --force && cd ..`
#### Compile Javascript to one file
`cd js && node r.js -o build.js paths.requireLib=require include=requireLib && cd ..`
#### Update `IS_DEV` to `false` in `index.php`.

# Start
* Make sure you have all dependencies and run `composer install` from the root of your project. This will get you set up with Slim and Twig.
* Load `index.php` in your browser.
