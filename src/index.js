import runBarback from './runBarback';
import { log, error } from './utils/logger';

async function startBarbackRun() {
  console.log('starting');
  try {
    await runBarback();
    console.log('finished');
    log('Barback Run completed successfully! Exiting...'); // eslint-disable-line no-console
    process.exitCode = 0;
    process.exit(0);
  } catch (err) {
    error('Barback hit an error, exiting:', err.message || err); // eslint-disable-line no-console
    console.log('errored', err);
    process.exitCode = -1;
    process.exit(1);
  }
}

startBarbackRun();
