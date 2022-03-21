import * as fs from 'fs';

const directoryFileNameReader = (
  path: string,
  fileExtension: string,
): string[] => {
  return fs
    .readdirSync(path)
    .filter((file) => file.endsWith(`.${fileExtension}`))
    .map((fileName) => {
      return fileName.split('.')[0];
    });
};

export default directoryFileNameReader;
