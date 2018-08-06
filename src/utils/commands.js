import { compact, drop } from 'lodash';
import stream from 'stream';
import { spawn } from 'child_process';
import { info } from '../utils/logger';

process.env.FORCE_COLOR = true;

export function isPromise(obj) {
  return obj && typeof obj.then === 'function';
}

/**
 * @description Run a bash command using exec.
 * @param {String} command - Command to be executed
 * @private
 */
export function runCommand(command) {
  if (command.beforeMsg) info(command.beforeMsg);
  return new Promise((resolve, reject) => {
    const commandBase = command.command.split(' ')[0];
    const child = spawn(
      commandBase,
      command.args || compact(drop(command.command.split(' '))),
    );
    const customStream = new stream.Writable();
    const customErrorStream = new stream.Writable();
    let output;
    let error;
    customStream._write = (data, ...argv) => {
      output += data;
      process.stdout._write(data, ...argv);
    };
    customErrorStream._write = (data, ...argv) => {
      error += data;
      process.stderr._write(data, ...argv);
    };
    // Pipe errors and console output to main process
    child.stdout.pipe(customStream);
    child.stderr.pipe(customErrorStream);
    // When child exits resolve or reject based on code
    child.on('exit', code => {
      if (code !== 0) {
        // Resolve for npm warnings
        if (output && output.indexOf('npm WARN') !== -1) {
          resolve(command.successMsg || output);
        } else {
          reject(command.errorMsg || error);
        }
      } else {
        // resolve(null, stdout)
        if (command.successMsg) info(command.successMsg);
        resolve(command.successMsg || output);
      }
    });
  });
}
