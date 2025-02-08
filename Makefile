public: 
		npm link

test: public
		gendiff ./__tests__/__fixtures__/file1.json ./__tests__/__fixtures__/file2.json

lint:
		npx eslint

lintfix:
		npx eslint . --fix

test-coverage:
		npm test -- --coverage --coverageProvider=v8