public: 
		npm link

test: public
		gendiff ./src/test/file1.json ./src/test/file2.json

lint:
		npx eslint

lintfix:
		npx eslint . --fix