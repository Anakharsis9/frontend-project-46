#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import fs from "fs";
import { getParsedFile } from "../utilities/parseFile.js";

const getFileFormat = filepath => {
  return path.extname(filepath).toLowerCase().slice(1);
};

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const rawFile1 = fs.readFileSync(absolutePath1, {
    encoding: "utf8",
    flag: "r"
  });
  const file1Format = getFileFormat(absolutePath1);

  const rawFile2 = fs.readFileSync(absolutePath2, {
    encoding: "utf8",
    flag: "r"
  });
  const file2Format = getFileFormat(absolutePath2);

  const data1 = getParsedFile(rawFile1, file1Format);
  const data2 = getParsedFile(rawFile2, file2Format);

  const keys = [
    ...new Set([...Object.keys(data1), ...Object.keys(data2)])
  ].sort();

  const result = keys.map(key => {
    if (!(key in data2)) return `  - ${key}: ${data1[key]}`;
    if (!(key in data1)) return `  + ${key}: ${data2[key]}`;
    if (data1[key] !== data2[key])
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join("\n")}\n}`;
};

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .helpOption("-h, --help", "output usage information")
  .option("-f, --format [type]", "output format")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse(process.argv);

const options = program.opts();
const format = options.format;
