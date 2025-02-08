import path from 'path';
import fs from 'fs';
import getParsedFile from '../utilities/parseFile.js';

const getFileFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const rawFile = fs.readFileSync(absolutePath, { encoding: 'utf8', flag: 'r' });
  const fileFormat = getFileFormat(absolutePath);
  return getParsedFile(rawFile, fileFormat);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  const result = keys.map((key) => {
    if (!(key in data2)) return `  - ${key}: ${data1[key]}`;
    if (!(key in data1)) return `  + ${key}: ${data2[key]}`;
    if (data1[key] !== data2[key]) return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
