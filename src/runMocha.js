import Mocha from 'mocha'
import path from 'path'
import fs from 'fs'
import os from 'os'

export default function runMocha() {
  const mocha = new Mocha({
    useColors: true,
    timeout: 300000,
    reporter: 'server/firebase-reporter.js', // custom reporter
    // grep: /area 1/, // only run tests containing certain
    nightmare: {
      switches: {
        'remote-debugging-port': 5858
      },
      appLoadTime: 18000,
      waitTimeout: 90000,
      width: 700,
      height: 700,
      logging: true // This will print all console messages and errors to the console, as well as print
      // all messages that are passed through the custom Nightmare.log(message) method.
    }
  })

  const localDir = path.join(os.tmpdir(), 'repoSrc')

  // Add files
  // Maybe use glob?
  // Add each .js file to the mocha instance
  fs.readdirSync(localDir)
    .filter(function(file) {
      // Only keep the spec.js files
      return file.substr(-8) === '.spec.js'
    })
    .forEach(function(file) {
      console.log('Adding file:', path.join(localDir, file))
      mocha.addFile(path.join(localDir, file))
    })

  // Run Mocha
  return new Promise((resolve, reject) => {
    const Runner = mocha.run(failures => {
      console.log('results:', failures)
      if (failures === 0) {
        console.log('no failures! tests pass!')
        resolve()
      } else {
        console.log('Error, tests failed!', failures)
        reject(failures)
      }
    })

    Runner.on('start', e => {
      console.log('test run started event', e.fullTitle())
      // e.title, e.parent, e.parent.tests
    })
    Runner.on('hook', e => {
      console.log('hook started event:', e.fullTitle())
    })
    Runner.on('hook end', e => {
      console.log('hook end event', e.fullTitle())
    })
    Runner.on('test', e => {
      console.log('test start event', e.fullTitle())
    })
    Runner.on('test end', e => {
      console.log('test end event', e.fullTitle())
    })
  })
}
