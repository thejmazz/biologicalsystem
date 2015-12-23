'use strict'

const fs = require('fs')

fs.readFile(process.argv[2], function(err, data) {
  if (err) console.error(err)

  data = JSON.parse(data)

  let sortable = []
  for (let item in data) {
    sortable.push([item, data[item].length])
  }
  let sorted = sortable.sort(function(a, b) {return b[1] - a[1]})


  let produced = {}

  for(let i=0; i<sorted.length; i++) {
    produced[sorted[i][0]] = data[sorted[i][0]]
  }

  Object.keys(produced).forEach(function(key) {
    const UniProtKBBaseUri = 'http://www.uniprot.org/uniprot/'
    process.stdout.write(`\n## ${key} (${produced[key].length})\n`)

    produced[key].forEach(function(gene) {
      let name = gene.uniprot.entry[0].organism[0].name[0]._

      let links = gene.uniprot.entry[0].accession.map(function(id) {
        let link = UniProtKBBaseUri + id
        return `[${id}](${link})`
      }).join(', ')

      process.stdout.write(`* ${name}; ${links}\n`)
    })
  })
})
