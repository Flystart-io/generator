#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

import dotenv from 'dotenv';
import { rimraf } from 'rimraf';

import checkTranslationFiles from './helpers/checkTranslations';
import { cleanBackendBaseDirectories, cleanFrontendBaseDirectories } from './helpers/cleanBaseDirectories';
import { getConfig } from './helpers/config';
import { extractFiles } from './helpers/extractFiles';
import { extractObjFromSchema } from './helpers/extractObjFromSchema';
import { generateBackendGraphql, generateFrontendGraphql } from './helpers/generateGraphql';
import color from './helpers/terminalColor';

dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), 'backend/.env') });

const generatorUrl = process.env.FLYBASE_GENERATOR_URL ?? 'https://generator.flystart.io/flystart';

function log(msg: string): void {
  /* eslint-disable no-console */
  console.log('');
  console.log(`${color.blue('[Flystart]')} ${msg}`);
  console.log('');
  /* eslint-enable no-console */
}
/**
 * Makes the request to the endpoint and receives the zip
 */

async function makeRequest(config) {
  const body = JSON.stringify({
    entities: extractObjFromSchema(),
    config: { config },
  });

  const response = await fetch(generatorUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Error generating files. Server responded with ${response.status}`);
  }

  await pipeline(response.body, fs.createWriteStream('flystart.zip'));
}

async function runGen() {
  const config = await getConfig();

  log('Generating new files');
  await makeRequest(config);

  log('Cleaning existing generated files');
  await Promise.all([cleanBackendBaseDirectories(), cleanFrontendBaseDirectories()]);

  log('Copying new generated files');
  await extractFiles();

  await rimraf(['flystart.zip', 'config.json']);

  log('Generating graphql schemas on the backend');
  await generateBackendGraphql();

  log('Generating graphql types and hooks on the frontend');
  await generateFrontendGraphql();

  log('Checking translations');
  await checkTranslationFiles(process.cwd());
}

runGen().catch((err) => console.error(err));
