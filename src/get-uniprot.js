'use strict'

const Promise = require('bluebird')
const co = require('co') //coroutine
const requestAsync = require('request-promise') // .then'able vs. callbacks
const ndjson = require('ndjson') // parse newline delimited json
const xmlParse = require('xml2js').parseString
const through = require('through2') // wrapper around streams3

/**
 * Small Promise wrapper around xml2js
 * @param  {String} str the xml String
 * @return {Function}     resolve(result) or reject(err)
 */
const xmlParseAsync = function(str) {
  return new Promise( (resolve, reject) => {
    xmlParse(str, function(err, result) {
      if (err) reject(err)

      resolve(result)
    })
  })
}

/**
 * generate URI
 * @param  {String} base   http://b.a.s.e
 * @param  {String} id     /#{id}
 * @param  {String} suffix /.ndjson
 * @return {String}        full URI
 */
function gUri(base, id, suffix) {
  // TODO handle base/ vs. base
  // const str = base
  // if (base[base.length()-1] === '/') {
  //   base +=
  // }

  return base + id + suffix
}


const UniProtKBBaseUri = 'http://www.uniprot.org/uniprot/'
const suffix = '.xml'

// take Object stream of parsed ndjson of QuickGO annotations
process.stdin
  // .pipe(through.obj(function (obj, enc, cb) {
  //   // get UniProtKB XML for each protein
  //   const UniProtKBBaseUri = 'http://www.uniprot.org/uniprot/'
  //   const suffix = '.xml'
  //   const uri = gUri(UniProtKBBaseUri, obj.ID, suffix)
  //   console.log(uri)
  //
  //
  //
  //
  //   this.push(uri)
  //
  //   cb()
  // }))
  // .pipe(ndjson.parse())
  // .pipe(through.obj(function (obj, enc, cb) {
  //   this.push(JSON.stringify(obj) + '\n')
  //   cb()
  // }))
  // .pipe(through.obj(function (chunk, enc, cb) {
  //   this.push(typeof(chunk))
  //   console.log(chunk)
  //   // cb()
  // }))
  // .pipe(process.stdout)
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    if (obj.DB === 'UniProtKB') {
      co.wrap(function* () {
        try {
          let xml = yield requestAsync(UniProtKBBaseUri + obj.ID + '.xml')
          // console.log(xml)
          let xmlJSON = yield xmlParseAsync(xml)
          // console.log(xmlJSON)
          // console.log(xmlJSON.uniprot.entry[0])

          // console.log(xmlJSON.uniprot.entry.gene)
          if (xmlJSON.uniprot.entry[0].gene) {
              console.log(xmlJSON.uniprot.entry[0].gene[0].name[0]._)
          }


          // console.log('data', JSON.stringify(xmlJSON) + '\n')

          // console.log(xmlJSON.entry)
          // if (xmlJSON.entry.uniprot.gene !== 'undefined') {
          //   console.log(xmlJSON.entry.uniprot.gene)
          // }

          // console.log(xmlJSON.uniprot.entry.gene[0].name[0]._)
        } catch(e) {
          console.error(e)
        }
      })()
    }
  })
