const getParsedFile = (rawFile, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(rawFile);
  }
  return rawFile;
};

export default getParsedFile;
