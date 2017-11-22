'use strict'

var request = require('request').defaults({ encoding: null })
var dotenv = require('dotenv')
var fs = require('fs')
var isUrl = require('is-url')
var deasync = require('deasync')

module.exports = {

  /*
   * Main entry point into dotenv-url. Allows configuration before loading .env
   * @param {Object} options - options for parsing .env file
   * @param {string} [options.path=.env] - path to .env file
   * @param {string} [options.encoding=utf8] - encoding of .env file
   * @returns {Object} parsed object or error
  */
  config: function(options) {

    var path = '.env'
    var encoding = 'utf8'

    if (options) {
      if (options.path) {
        path = options.path
      }
      if (options.encoding) {
        encoding = options.encoding
      }
    }

    try {

      var parsedObj
      var src

      if (isUrl(path)) {
        request.get({url: path, encoding: encoding }, function (err, res, body) {
         if (err) {
           throw err
         }
         src = body
        })

        while(src === undefined) {
          deasync.runLoopOnce();
        }
        parsedObj = dotenv.parse(src)


      } else {
        parsedObj = dotenv.parse(fs.readFileSync(path, { encoding: encoding }))

      }

      Object.keys(parsedObj).forEach(function (key) {
        if (!process.env.hasOwnProperty(key)) {
          process.env[key] = parsedObj[key]
        }
      })

      return { parsed: parsedObj }
    } catch (e) {
      return { error: e }
    }
  }
}
