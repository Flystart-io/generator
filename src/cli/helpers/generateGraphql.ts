import { spawnSync, exec } from 'child_process';
import path from 'path';
import process from 'process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function generateFrontendGraphql() {
  // Load the package.json from the frontend in NPM and execute GraphQL CodeGen
  spawnSync('pnpm run gen:graphql', [], {
    cwd: `${process.cwd() + path.sep}frontend`,
    stdio: 'inherit',
    shell: true,
  });
}

export async function generateBackendGraphql() {
  const graphqlPromise = execPromise('pnpm run gen-sdl', {
    cwd: `${process.cwd() + path.sep}backend`,
  });

  const { stderr, stdout } = await graphqlPromise;

  console.log(stderr || stdout);
}
