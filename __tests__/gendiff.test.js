import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFixture = (filename) => fs.readFileSync(path.join(__dirname, '__fixtures__', filename), 'utf-8');

const expectedPlain = readFixture('expected_plain.txt');
const expectedStylish = readFixture('expected_stylish.txt');
const expectedJson = readFixture('expected_json.txt');

describe('gendiff', () => {
  test('json format', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expectedPlain);
    expect(genDiff(file1Path, file2Path, 'stylish')).toBe(expectedStylish);
    expect(genDiff(file1Path, file2Path)).toBe(expectedStylish);
    expect(genDiff(file1Path, file2Path, 'json')).toBe(expectedJson);
  });

  test('yml format', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path, 'plain')).toBe(expectedPlain);
    expect(genDiff(file1Path, file2Path, 'stylish')).toBe(expectedStylish);
    expect(genDiff(file1Path, file2Path)).toBe(expectedStylish);
    expect(genDiff(file1Path, file2Path, 'json')).toBe(expectedJson);
  });
});
