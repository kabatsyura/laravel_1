start:
	php artisan serve --host 0.0.0.0

# lint:
# 	composer exec duster lint

# lint-fix:
# 	composer exec duster fix

lint:
	composer phpcs

lint-fix:
	composer phpcbf


productivity:
	docker run --rm -it -v "$PWD:/pwd"  ghcr.io/lhoupert/scc:master scc /pwd
