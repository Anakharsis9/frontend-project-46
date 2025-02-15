import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff', () => {
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

    expect(genDiff(file1Path, file2Path)).toEqual(expectedDiff);
  });

  test('compares YML files', () => {
    const file1Path = path.join(__dirname, '__fixtures__', 'file1.yml');
    const file2Path = path.join(__dirname, '__fixtures__', 'file2.yml');

    expect(genDiff(file1Path, file2Path)).toEqual(expectedDiff);
  });
});
