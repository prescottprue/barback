import Git from 'nodegit'
import { to } from './utils/async'

/**
 * Clone a given repository into the `./tmp` folder
 * @param  {String} gitUrl   [description]
 * @param  {String} localDir [description]
 * @return {Promise}          [description]
 */
export default async function gitClone(gitUrl, localDir) {
  console.log(`Cloning git repo from ${gitUrl} to ${localDir}`)
  // Clone repo
  const [getErr, repo] = await to(Git.Clone(gitUrl, localDir))
  if (getErr) {
    console.error(`Error cloning git repo: ${gitUrl}`, getErr.message || getErr)
    throw getErr
  }
  // Get first commit
  const [getCommitErr, firstCommitOnMaster] = await to(repo.getMasterCommit())
  if (getCommitErr) {
    console.error(
      `Error cloning git repo: ${gitUrl}`,
      getCommitErr.message || getCommitErr
    )
    throw getCommitErr
  }
  console.log('First commit loaded successfully!')
  return firstCommitOnMaster
}
