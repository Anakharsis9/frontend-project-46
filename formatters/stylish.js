import _ from 'lodash';

const formatStylish = (diff, deepLevel = 1) => {
  const spaceCountByLevel = 4;
  const leftShift = 2;
  const calcMargin = (level) =>
    ' '.repeat(level * spaceCountByLevel - leftShift);

  const stringify = (value, level) => {
    if (!_.isObject(value)) {
      return value;
    }

    const entries = Object.entries(value)
      .map(
        ([key, val]) =>
          `${calcMargin(level + 1)}  ${key}: ${stringify(val, level + 1)}`,
      )
      .join('\n');

    return `{\n${entries}\n${calcMargin(level)}  }`;
  };

  const result = diff.map((record) => {
    const margin = calcMargin(deepLevel);

    switch (record.type) {
      case 'removed':
        return `${margin}- ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      case 'added':
        return `${margin}+ ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      case 'nested':
        return `${margin}  ${record.key}: {\n${formatStylish(
          record.children,
          deepLevel + 1,
        )}\n${margin}  }`;
      case 'changed':
        return `${margin}- ${record.key}: ${stringify(
          record.oldValue,
          deepLevel,
        )}\n${margin}+ ${record.key}: ${stringify(record.newValue, deepLevel)}`;
      case 'unchanged':
        return `${margin}  ${record.key}: ${stringify(
          record.value,
          deepLevel,
        )}`;
      default:
        throw new Error(`Unknown type: ${record.type}`);
    }
  });

  return deepLevel === 1 ? `{\n${result.join('\n')}\n}` : result.join('\n');
};

export default formatStylish;
