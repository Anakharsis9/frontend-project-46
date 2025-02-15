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

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = keys.map((key) => {
    if (!(key in data2)) return `  - ${key}: ${data1[key]}`;
    if (!(key in data1)) return `  + ${key}: ${data2[key]}`;
    if (data1[key] !== data2[key])
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
