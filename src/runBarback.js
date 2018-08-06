import os from 'os';
import path from 'path';
import { runCommand } from './utils/commands';
import gitClone from './gitClone';

export default async function runBarback() {
  const gitUrl = process.env.GIT_URL || 'https://github.com/reside-eng/barista';
  const localDir = path.join(os.tmpdir(), 'repoSrc');
  try {
    await gitClone(gitUrl, localDir);
    await runCommand({
      command: 'npm i',
      beforeMsg: 'Running npm install',
      errorMsg: 'Error installing dependencies.',
      successMsg: 'Dpendencies installed successfully!',
    });
    await runCommand({
      command: 'npm',
      args: ['run', 'test'],
    });
  } catch (err) {
    throw err;
  }
}
