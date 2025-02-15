import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff', () => {
  const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  test('compares flat JSON files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

    expect(genDiff(file1Path, file2Path)).toEqual(expectedDiff);
  });

  test('compares flat YML files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path)).toEqual(expectedDiff);
  });
});
