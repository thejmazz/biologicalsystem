'use strict';

const through = require('through2')

process.stdin
  .pipe(through(function(chunk, env, cb) {
    for(let i = 0; i < chunk.length; i++) {
      // \t -> ,
      if (chunk[i] === 9) {
        chunk[i] = 44
      }
    }

    this.push(chunk)
    cb()
  }))
  .pipe(process.stdout)
