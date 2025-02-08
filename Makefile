public: 
		npm link

test: public
		gendiff ./src/test/file1.json ./src/test/file2.json

make lint:
		npx eslint