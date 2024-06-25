laravel-install-breeze:
	composer require laravel/breeze --dev
	php artisan breeze:install

install-lint:
	composer require laravel/pint --dev

lint:
	./vendor/bin/pint -v

lint-fix:
	./vendor/bin/pint --repair

serve:
	php artisan serve

prepare-db:
	php artisan make:model Project -fm
	php artisan make:model Task -fm
