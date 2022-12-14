install:
	npm install

lint:
	npx stylelint ./app/scss/**/*.scss

deploy:
	npx surge ./build/

