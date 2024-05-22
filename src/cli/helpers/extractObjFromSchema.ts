import * as fs from 'fs';
import * as path from 'path';

/**
 * @description Extracts the objects from the `schema/dist/schemas` folder. The `schema` folder should be located in the root of the directory.
 */
export const extractObjFromSchema = () => {
  const basePath = path.join(process.cwd(), 'schemas/dist/schemas');
  const files = fs.readdirSync(basePath);
  const importedFiles = files.filter((fileName) => path.extname(fileName) === '.js').map((fileName) => require(path.join(basePath, fileName)));

  return importedFiles.reduce((obj, importedFile) => {
    const exportedValue = importedFile.default;

    if (exportedValue.name) {
      obj[exportedValue.name] = exportedValue;
    }

    return obj;
  }, {});
};
