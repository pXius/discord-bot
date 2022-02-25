import * as fs from 'fs';

const directoryFileNameReader = (path: string, fileExtention: string): string[] => {
  return fs
    .readdirSync(path)
    .filter((file) => file.endsWith(`.${fileExtention}`))
    .map((fileName) => {
      return fileName.split('.')[0];
    })
}

export default directoryFileNameReader