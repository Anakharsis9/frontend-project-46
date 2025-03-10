/* eslint-disable no-use-before-define */
import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const formatDiffRecord = (record, parentPath) => {
  const propertyPath = parentPath ? `${parentPath}.${record.key}` : record.key;

  switch (record.type) {
    case 'added':
      return `Property '${propertyPath}' was added with value: ${formatValue(
        record.value,
      )}`;
    case 'removed':
      return `Property '${propertyPath}' was removed`;
    case 'changed':
      return `Property '${propertyPath}' was updated. From ${formatValue(
        record.value1,
      )} to ${formatValue(record.value2)}`;
    case 'nested':
      return formatPlain(record.children, propertyPath);
    case 'unchanged':
      return null;
    default:
      throw new Error(`Unknown type: ${record.type}`);
  }
};

const formatPlain = (diff, parentPath = '') => {
  const result = diff.map((record) => formatDiffRecord(record, parentPath));
  return result.filter(Boolean).join('\n');
};

export default formatPlain;
