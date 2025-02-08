import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff compares flat JSON files', () => {
  const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
  const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

  const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1Path, file2Path)).toBe(expectedDiff);
});
