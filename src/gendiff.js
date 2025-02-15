import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import parse from './parsers.js';

const getFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf8');
};

const parseFile = (filepath) => {
  const fileContent = readFile(filepath);
  const fileFormat = getFormat(filepath);
  return parse(fileContent, fileFormat);
};

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return { key, type: 'changed', oldValue: value1, newValue: value2 };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

const formatStylish = (diff, deepLevel = 1) => {
  const spaceCountByLevel = 4;
  const leftShift = 2;
  const calcMargin = (level) =>
    ' '.repeat(level * spaceCountByLevel - leftShift);

  const stringify = (value, level) => {
    if (!_.isObject(value)) {
      return value;
    }

    const entries = Object.entries(value)
      .map(
        ([key, val]) =>
          `${calcMargin(level + 1)}  ${key}: ${stringify(val, level + 1)}`,
      )
      .join('\n');

    return `{\n${entries}\n${calcMargin(level)}  }`;
  };

  const result = diff.map((record) => {
    const margin = calcMargin(deepLevel);

    switch (record.type) {
      case 'removed':
        return `${margin}- ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      case 'added':
        return `${margin}+ ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      case 'nested':
        return `${margin}  ${record.key}: {\n${formatStylish(
          record.children,
          deepLevel + 1,
        )}\n${margin}  }`;
      case 'changed':
        return `${margin}- ${record.key}: ${stringify(
          record.oldValue,
          deepLevel,
        )}\n${margin}+ ${record.key}: ${stringify(record.newValue, deepLevel)}`;
      case 'unchanged':
        return `${margin}  ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      default:
        throw new Error(`Unknown type: ${record.type}`);
    }
  });

  return deepLevel === 1 ? `{\n${result.join('\n')}\n}` : result.join('\n');
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);

  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default genDiff;
