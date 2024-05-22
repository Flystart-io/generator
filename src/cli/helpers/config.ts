import { checkbox, input } from '@inquirer/prompts';
import { forEach } from 'lodash';
import { argv } from 'yargs';

import { extractObjFromSchema } from './extractObjFromSchema';

export type Config = {
  include: boolean;
  exclude: boolean;
  frontend: boolean;
  backend: boolean;
  translations: boolean;
  schemaIndex: boolean;
  reset: boolean;
  answers?: string[];
  apiKey: string;
};

function getInquireOptions(entities) {
  const names = [];
  forEach(entities, (entity, name) => {
    names.push({ name, value: name });
  });

  return names;
}

const getAnswers = async ({ include, exclude }: { include: boolean; exclude: boolean }): Promise<string[] | undefined> => {
  if (!exclude && !include) {
    return undefined;
  }

  const allEntities = extractObjFromSchema();
  const choices = getInquireOptions(allEntities);
  const option = exclude ? 'exclude from' : 'include in';
  const message = `Which entities do you want to ${option} the generation?`;

  return checkbox<string>({
    message,
    choices,
  });
};

export async function getConfig(): Promise<Config> {
  const typedArgv = argv as Record<string, boolean>;

  // Get frontend/backend variables from command line args
  let { frontend = false, backend = false, translations = false, schema = false } = typedArgv;
  const { include = false, exclude = false, reset = false } = typedArgv;

  // eslint-disable-next-line eqeqeq
  if (frontend == false && backend == false && translations == false && schema == false) {
    translations = true;
    frontend = true;
    backend = true;
    schema = true;
  }

  let apiKey = process.env.FLYBASE_PRIVATE_KEY ?? process.env.FLYSTART_API_KEY;

  if (!apiKey) {
    apiKey = await input({ message: 'Enter your api key: ' });

    if (!apiKey) {
      console.error('No API key is present');
      process.exit(1);
    }
  }

  const answers = await getAnswers({ include, exclude });

  return {
    answers,
    apiKey,
    backend,
    exclude,
    frontend,
    include,
    reset,
    translations,
    schemaIndex: schema,
  };
}
