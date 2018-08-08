import os from 'os';
import path from 'path';
import { v4 as uniqueId } from 'uuid';
import { runCommand } from './utils/commands';
import gitClone from './gitClone';

export default async function runBarback() {
  const gitUrl = process.env.GIT_URL || 'https://github.com/reside-eng/barista';
  // Create a id that is unique for this
  const localRunId = uniqueId();
  const localDir = path.join(os.tmpdir(), localRunId, 'repoSrc');
  try {
    await gitClone(gitUrl, localDir);
    await runCommand({
      command: 'npm',
      args: ['i', '--prefix', localDir],
      beforeMsg: 'Running npm install',
      errorMsg: 'Error installing dependencies.',
      successMsg: 'Dpendencies installed successfully!',
    });
    await runCommand({
      command: 'npm',
      args: ['run', 'test', '--prefix', localDir],
    });
  } catch (err) {
    throw err;
  }
}
