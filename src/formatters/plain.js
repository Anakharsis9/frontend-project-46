import _ from 'lodash';

const formatPlain = (diff, parentPath = '') => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
  };

  return diff
    .map((record) => {
      const fullPath = parentPath ? `${parentPath}.${record.key}` : record.key;

      switch (record.type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(
            record.value,
          )}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(
            record.oldValue,
          )} to ${formatValue(record.newValue)}`;
        case 'nested':
          return formatPlain(record.children, fullPath);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type: ${record.type}`);
      }
    })
    .filter(Boolean)
    .join('\n');
};

export default formatPlain;
