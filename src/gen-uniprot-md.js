'use strict'

const fs = require('fs')

fs.readFile(__dirname + '/../files/0047497-proteins.json', function(err, data) {
  if (err) console.error(err)

  data = JSON.parse(data)

  let sortable = []
  for (let item in data) {
    sortable.push([item, data[item].length])
  }
  let sorted = sortable.sort(function(a, b) {return b[1] - a[1]})

  for(let i=0; i<sorted.length; i++) {
    let gene = {}
    gene[sorted[i][0]] = data[sorted[i][0]]
    sorted[i] = gene
  }

  console.log(sorted)
})
