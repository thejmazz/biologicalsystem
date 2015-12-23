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
const xmlParseAsync = function (str) {
  return new Promise((resolve, reject) => {
    xmlParse(str, function (err, result) {
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

  return base + id + suffix
}


let filtered = {}

// take Object stream of parsed ndjson of QuickGO annotations
process.stdin
  // can't get it to worth with this commented and `ndjson -` in gasket
  .pipe(ndjson.parse())
  .pipe(through.obj(function (obj, enc, cb) {
    const UniProtKBBaseUri = 'http://www.uniprot.org/uniprot/'
    const suffix = '.xml'
    let xml, xmlJSON
    let throughThis = this

    if (obj.DB === 'UniProtKB') {
      co.wrap(function* () {
        try {
          xml = yield requestAsync(gUri(UniProtKBBaseUri, obj.ID, '.xml'))
          xmlJSON = yield xmlParseAsync(xml)

          throughThis.push(xmlJSON)
        } catch (e) {
          // console.error(e)
          cb()
        }

        cb()
      })()
    }
  }))
  .on('data', function(xmlJSON) {
    if (xmlJSON.uniprot.entry[0].gene) {
      const geneName = xmlJSON.uniprot.entry[0].gene[0].name[0]._.toUpperCase()

      if (Object.keys(filtered).indexOf(geneName) === -1) {
        filtered[geneName] = [xmlJSON]
      } else {
        filtered[geneName].push(xmlJSON)
      }
    }
  })
  .on('end', function() {
    process.stdout.write(JSON.stringify(filtered) + '\n')
  })
