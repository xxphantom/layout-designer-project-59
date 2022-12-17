install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss

build:
	npx gulp

deploy:
	npx surge ./build/

.PHONY: build
