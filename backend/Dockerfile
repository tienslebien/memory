FROM php:7.2-apache

# active l'utilisation des .htaccess
RUN a2enmod rewrite

# install l'extension mysql
RUN docker-php-ext-install pdo pdo_mysql