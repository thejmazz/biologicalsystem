const xml = require('xml2js').parseString
const request = require('request')


request('http://www.uniprot.org/uniprot/G1PFU9.xml', function(err, data) {
  xml(data.body, function(err, result) {
    console.log(result)
  })
})
