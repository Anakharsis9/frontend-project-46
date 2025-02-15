import yaml from 'js-yaml';

const parse = (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(content);
  }

  throw new Error(`Unsupported file format: ${format}`);
};

export default parse;
