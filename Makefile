public: 
		npm link

test: public
		gendiff ./src/__tests__/__fixtures__/file1.json ./src/__tests__/__fixtures__/file2.json

lint:
		npx eslint

lintfix:
		npx eslint . --fix