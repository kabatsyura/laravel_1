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

seed-db:
	php artisan migrate:refresh --seed

tinker:
	php artisan tinker

makeController:
	php artisan make:controller ProjectController --model=Project --requests --resource
	php artisan make:controller TaskController --model=Task --requests --resource
	php artisan make:controller UserController --model=User --requests --resource

makeResource:
	php artisan make:resource ProjectResource

route-list:
	php artisan route:list