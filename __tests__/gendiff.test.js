import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff --format stylish', () => {
  const expectedDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  test('compares JSON files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

    expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(expectedDiff);
  });

  test('compares YML files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(expectedDiff);
  });
});

describe('gendiff --format plain', () => {
  const expectedDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  test('compares JSON files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

    expect(genDiff(file1Path, file2Path, 'plain')).toEqual(expectedDiff);
  });

  test('compares YML files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path, 'plain')).toEqual(expectedDiff);
  });
});

describe('gendiff --format json', () => {
  // eslint-disable-next-line quotes
  const expectedDiff = `[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"changed","oldValue":true,"newValue":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"changed","oldValue":"","newValue":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"changed","oldValue":"bas","newValue":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","oldValue":{"key":"value"},"newValue":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]`;

  test('compares JSON files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.json');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.json');

    expect(genDiff(file1Path, file2Path, 'json')).toEqual(expectedDiff);
  });

  test('compares YML files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path, 'json')).toEqual(expectedDiff);
  });
});
