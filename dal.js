//Data Access Layer “DAL”
require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error')
const sluggo = require('slugify')

const db = new PouchDB(process.env.COUCHDB_URL)

const getDoc = function(docId, cb) {
  // cb is the callback function

  db.get(docId, function(err, data) {
    if (err) {
      console.log('IM IN THE DAL and there is an error', err)
      return cb(err)
    }
    console.log('Hurray Ive got data from the database', data)
    cb(null, data)
  })
}

const deleteDoc = function(docId, cb) {
  db.get(docId, function(err, doc) {
    if (err) {
      cb(err)
      return
    }
    db.remove(doc, function(err, deleted) {
      if (err) {
        cb(err)
        return
      }
      cb(null, deleted)
    })
  })
}

const dal = {
  getDoc,
  deleteDoc
}

module.exports = dal
