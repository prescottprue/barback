# Barback

Mocha test runner/reporter. Used in [Barista][barista-url] and [Fireadmin][fireadmin-url]

> Handles all of the real work, leaving [Barista][barista-url] to handle the presentation

## What?
1. Downloads test repo based on settings passed into environment (handled by Barista front end)
1. Runs tests
1. Writes tests results back to Barista (can be viewed in UI or consumed by API)

## Why?
Running tests at the click of a button requires "contained" running sessions

[barista-url]: https://github.com/prescottprue/barista
[fireadmin-url]: https://fireadmin.io
[license-image]: https://img.shields.io/npm/l/fireadmin.svg?style=flat-square
[license-url]: https://github.com/prescottprue/fireadmin/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
