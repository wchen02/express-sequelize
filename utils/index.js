const path = require('path');
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

/**
 * Creates object by scanning models directory and exclude ones
 * that were overriden in the current directory.
 *
 * @param createObjectCb callback to create object
 *
 * @returns [{ name: modelName, object: createdObject }]
 */
exports.createObjectsFromModels = (createObjectCb) => {
  const modelObjectMap = [];
  const routerFiles = exports.getDirFiles(__dirname, '.js');
  exports.getDirFiles(
    path.join(__dirname, '../models'),
    '.js',
    routerFiles,
    (filename) => {
      const modelName = path.basename(filename, '.js').toLowerCase();
      modelObjectMap.push({
        name: modelName,
        object: createObjectCb(modelName),
      });
    },
  );

  return modelObjectMap;
};
