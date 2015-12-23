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


  let produced = {}

  for(let i=0; i<sorted.length; i++) {
    // let gene = {}
    // gene[sorted[i][0]] = data[sorted[i][0]]
    produced[sorted[i][0]] = data[sorted[i][0]]
  }

  Object.keys(produced).forEach(function(key) {
    console.log(`## ${key} (${produced[key].length})`)

    produced[key].forEach(function(gene) {
      console.log(gene)
    })

    // produced[key].forEach(function(gene) {
    //   if (gene.organism) {
    //     console.log(gene.organism[0].name[0]._)
    //   }
    // })
  })
})
