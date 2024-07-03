build:
	npm run build

test:
	php artisan test

install: 
	composer install --prefer-dist --no-progress --no-interaction && npm ci

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


first-step:
	composer install
	npm i
	cp .env.example .env
	php artisan key:generate
	touch ./database/database.sqlite
	make seed-db

serve-test:
	php artisan sentry:test

tinker:
	php artisan tinker

makeController:
	php artisan make:controller ProjectController --model=Project --requests --resource
	php artisan make:controller TaskController --model=Task --requests --resource
	php artisan make:controller UserController --model=User --requests --resource

makeResource:
	php artisan make:resource ProjectResource
	php artisan make:resource TaskResource
	php artisan make:resource UserResource

route-list:
	php artisan route:list

connect-storage:
	php artisan storage:link

docker-build:
	docker build -t dmitriikabatsiura/laravel-project-manager:v2

docker-run:
	docker run -it -p 8000:3000 dmitriikabatsiura/laravel-project-manager:v2
	