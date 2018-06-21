import os from 'os'
import path from 'path'
import runMocha from './runMocha'
import gitClone from './gitClone'

async function runBarista() {
  const gitUrl = process.env.GIT_URL || 'https://github.com/prescottprue/fireadmin-e2e-tests';
  const localDir = path.join(os.tmpdir(), 'repoSrc')
  try {
    await gitClone(gitUrl, localDir)
    await runMocha()
    console.log('Process completed successfully! Exiting...') // eslint-disable-line no-console
    process.exitCode = 0
    process.exit(0)
  } catch (err) {
    console.error('Hit an error, exiting:', err.message || err) // eslint-disable-line no-console
    process.exitCode = -1
    process.exit(1)
  }
}

;(async function() {
  await runBarista()
})()
