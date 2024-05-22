import fs from 'fs';
import path from 'path';
import process from 'process';

import { map } from 'lodash';
import StreamZip from 'node-stream-zip';

const regexPattern = /generated-files\/[a-f0-9\\-]+\//;

export async function extractFiles() {
  const folderPath = path.join(process.cwd(), 'flystart.zip');

  if (!fs.existsSync(folderPath)) {
    process.exit(1);
  }

  const zip = new StreamZip.async({
    file: folderPath,
  });

  const entries = await zip.entries();

  const files = JSON.parse(Buffer.from(await zip.entryData('config.json')).toString());

  files.notOverwriteFiles.forEach((file, index) => {
    files.notOverwriteFiles[index] = file.replace(regexPattern, '');
  });

  files.overwriteFiles.forEach((file, index) => {
    files.overwriteFiles[index] = file.replace(regexPattern, '');
  });

  const extract = map(entries, async (entry) => {
    if (entry.isDirectory && !fs.existsSync(path.join(process.cwd(), entry.name))) {
      fs.mkdirSync(path.join(process.cwd(), entry.name), {
        recursive: true,
      });
    }

    if (entry.isFile) {
      if (files.overwriteFiles.includes(entry.name)) {
        await zip.extract(entry.name, path.join(process.cwd(), entry.name));
      }

      if (!fs.existsSync(path.join(process.cwd(), entry.name)) && files.notOverwriteFiles.includes(entry.name)) {
        await zip.extract(entry.name, path.join(process.cwd(), entry.name));
      }
    }
  });

  await Promise.all(extract);

  await zip.close();
}
