# Use the official PHP image as the base image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    && docker-php-ext-install \
    intl \
    mbstring \
    opcache \
    pdo \
    pdo_pgsql \
    zip

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy only the necessary files to install dependencies
COPY composer.json composer.lock ./

# Install Symfony dependencies
RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction --prefer-dist

# Copy the rest of the application files
COPY . .

# Copy custom php.ini configuration
COPY php.ini /usr/local/etc/php/php.ini

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
