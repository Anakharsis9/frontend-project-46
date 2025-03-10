import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const format = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJson(diff);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};
export default format;
