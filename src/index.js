import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import format from './formatters/index.js';
import buildDiff from './buildDiff.js';

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

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);
  return format(diff, outputFormat);
};

export default genDiff;
