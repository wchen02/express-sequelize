const fs = require('fs');

exports.getDirFiles = (dir, extension, excludeFiles, callback) => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.indexOf('.') !== 0
        && file.lastIndexOf(extension) === file.length - extension.length
        && (!excludeFiles || (excludeFiles && !excludeFiles.includes(file))));

  if (callback) {
    files.forEach((file) => callback(file));
  }

  return files;
};
