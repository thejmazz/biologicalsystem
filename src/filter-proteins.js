'use strict'

const ndjson = require('ndjson')

let filtered = {}

process.stdin
  .pipe(ndjson.parse())
  .on('data', function (obj) {
    if (Object.keys(filtered).indexOf(obj.ID) === -1) {
      filtered[obj.ID] = [obj]
    } else {
      filtered[obj.ID].push(obj)
    }
  })
  .on('end', function() {
    console.log(Object.keys(filtered).length)

    let sortable = []
    for (let item in filtered) {
      sortable.push([item, filtered[item].length])
    }
    let sorted = sortable.sort(function(a, b) {return b[1] - a[1]})

    console.log(sorted)
  })
