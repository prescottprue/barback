import runBarback from './runBarback';
import { log, error } from './utils/logger';

(async function startBarbackRun() {
  try {
    await runBarback();
    log('Barback Run completed successfully! Exiting...'); // eslint-disable-line no-console
    process.exitCode = 0;
    process.exit(0);
  } catch (err) {
    error('Barback hit an error, exiting:', err.message || err); // eslint-disable-line no-console
    process.exitCode = -1;
    process.exit(1);
  }
})();
