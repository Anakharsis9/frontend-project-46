/* eslint-disable no-use-before-define */
import _ from 'lodash';

const calcMargin = (level, spaceCountByLevel = 4, leftShift = 2) => ' '.repeat(level * spaceCountByLevel - leftShift);

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return value;
  }

  const entries = Object.entries(value)
    .map(
      ([key, val]) => `${calcMargin(level + 1)}  ${key}: ${stringify(val, level + 1)}`,
    )
    .join('\n');

  return `{
${entries}
${calcMargin(level)}  }`;
};

const formatDiffRecord = (record, level) => {
  const margin = calcMargin(level);

  switch (record.type) {
    case 'removed':
      return `${margin}- ${record.key}: ${stringify(record.value, level)}`;
    case 'added':
      return `${margin}+ ${record.key}: ${stringify(record.value, level)}`;
    case 'nested':
      return `${margin}  ${record.key}: {
${formatStylish(record.children, level + 1)}
${margin}  }`;
    case 'changed':
      return `${margin}- ${record.key}: ${stringify(
        record.value1,
        level,
      )}\n${margin}+ ${record.key}: ${stringify(record.value2, level)}`;
    case 'unchanged':
      return `${margin}  ${record.key}: ${stringify(record.value, level)}`;
    default:
      throw new Error(`Unknown type: ${record.type}`);
  }
};

const formatStylish = (diff, deepLevel = 1) => {
  const result = diff.map((record) => formatDiffRecord(record, deepLevel));
  return deepLevel === 1
    ? `{
${result.join('\n')}
}`
    : result.join('\n');
};

export default formatStylish;
