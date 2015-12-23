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

  let writable = fs.createWriteStream('somthing.md')



  Object.keys(produced).forEach(function(key) {
    const UniProtKBBaseUri = 'http://www.uniprot.org/uniprot/'
    // console.log(`## ${key} (${produced[key].length})`)
    process.stdout.write(`## ${key} (${produced[key].length})\n`)

    produced[key].forEach(function(gene) {
      let name = gene.uniprot.entry[0].organism[0].name[0]._

      let links = gene.uniprot.entry[0].accession.map(function(id) {
        let link = UniProtKBBaseUri + id
        return `[${id}](${link})`
      }).join(', ')

      process.stdout.write(`* ${name}; ${links}\n`)


      // console.log(gene.uniprot.entry[0].accession.map(function(term) { return `[${term}](${UniProtKBBaseUri + term})`).join(', '))
    })

    // produced[key].forEach(function(gene) {
    //   if (gene.organism) {
    //     console.log(gene.organism[0].name[0]._)
    //   }
    // })
  })
})
