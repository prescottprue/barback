import Git from 'nodegit';
import { to } from './utils/async';
import { log, error } from './utils/logger';

/**
 * Clone a given repository into the `./tmp` folder
 * @param  {String} gitUrl   [description]
 * @param  {String} localDir [description]
 * @return {Promise}          [description]
 */
export default async function gitClone(gitUrl, localDir) {
  log(
    `Cloning git repo from ${JSON.stringify(gitUrl)} to ${JSON.stringify(
      localDir,
    )}`,
  );
  // Clone repo
  const [getErr, repo] = await to(Git.Clone(gitUrl, localDir));
  if (getErr) {
    error(`Error cloning git repo: ${gitUrl}`, getErr.message || getErr);
    throw getErr;
  }
  // Get first commit
  const [getCommitErr, firstCommitOnMaster] = await to(repo.getMasterCommit());
  if (getCommitErr) {
    error(
      `Error cloning git repo: ${gitUrl}`,
      getCommitErr.message || getCommitErr,
    );
    throw getCommitErr;
  }
  log('First commit loaded successfully!');
  return firstCommitOnMaster;
}
