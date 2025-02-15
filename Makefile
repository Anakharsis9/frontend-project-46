public: 
		npm link

lint:
		npx eslint

lintfix:
		npx eslint . --fix

test-coverage:
		npm test -- --coverage --coverageProvider=v8