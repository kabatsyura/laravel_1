# Use the official PHP image as the base image
FROM php:8.3-apache

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    sqlite3 \
    libsqlite3-dev \
    libxml2-dev \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_sqlite

# Install Node.js via nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 18 \
    && nvm use 18 \
    && nvm alias default 18 \
    && npm install -g npm

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . /home/dmitrii/laravel_1

# Set working directory
WORKDIR /home/dmitrii/laravel_1

# Install application dependencies
RUN export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && npm install \
    && npm ci \
    && composer install

# Set permissions
RUN chown -R www-data:www-data /home/dmitrii/laravel_1 \
    && chmod -R 777 /home/dmitrii/laravel_1 \
    && php artisan storage:link

# Set up environment and generate application key
RUN cp .env.example .env \
    && mkdir -p database \
    && echo 'DB_DATABASE=/home/dmitrii/laravel_1/database/database.sqlite' >> .env \
    && touch /home/dmitrii/laravel_1/database/database.sqlite \
    && chown -R www-data:www-data /home/dmitrii/laravel_1/database \
    && chmod -R 777 /home/dmitrii/laravel_1/database \
    && php artisan key:generate

# Run migrations and seed
RUN php artisan migrate:refresh --seed

# Build frontend assets
RUN export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && npm run build

# Configure Apache
RUN echo '<VirtualHost *:80>\n\
    ServerName 158.160.146.162\n\
    DocumentRoot /home/dmitrii/laravel_1/public\n\
    <Directory /home/dmitrii/laravel_1/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
    </VirtualHost>' > /etc/apache2/sites-available/hexletJob.conf \
    && a2ensite hexletJob \
    && a2enmod rewrite \
    && service apache2 restart

EXPOSE 80
CMD ["apache2-foreground"]