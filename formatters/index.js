import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};
export default format;
