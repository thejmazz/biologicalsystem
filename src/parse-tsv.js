const csv = require('csv-parser')
const write = require('csv-write-stream')
const through = require('through2')

process.stdin
  .pipe(csv({
    separator: '\t'
  }))
  .pipe(through.obj(function (chunk, enc, cb) {
    this.push(JSON.stringify(chunk) + '\n')
    cb()
  }))
  .pipe(process.stdout)
