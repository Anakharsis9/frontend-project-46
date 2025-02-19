import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import parse from './parsers.js';
import format from '../formatters/index.js';

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
      return {
        key, type: 'changed', oldValue: value1, newValue: value2,
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
