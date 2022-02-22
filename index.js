'use strict'

const fetch = require('node-fetch')
var dotenv = require('dotenv')
var fs = require('fs')
var isUrl = require('is-url')
var deasync = require('deasync')

module.exports = {

  /*
   * Main entry point into dotenv-url. Allows configuration before loading .env
   * @param {Object} params - options for parsing .env file(s)
   * @param {string|string[]} [options.path=.env] - path(s) to .env file(s)
   * @param {string} [params.encoding=utf8] - encoding of .env file(s)
   * @returns {Object} parsed object or error
  */
  config: function(params) {

    var path = '.env'
    var encoding = 'utf8'
    var options = JSON.parse(JSON.stringify(params ? params : {}))

    if (options.path) {
      if(Array.isArray(options.path)) {
        // start from top
        path = options.path.shift()
      } else {
        path = options.path
      }
    }
    if (options.encoding) {
      encoding = options.encoding
    }

    try {

      var parsedObj
      var src

      if (isUrl(path)) {
        async function get() {
          const response = await fetch(path);
          const body = await response.text();
          src = body;
        }

        get();

        while(src === undefined) {
          deasync.runLoopOnce()
        }
        parsedObj = dotenv.parse(src)


      } else {
        parsedObj = dotenv.parse(fs.readFileSync(path, { encoding: encoding }))

      }

      if(Array.isArray(options.path) && options.path.length) {
         // recursion
         var nextParsedObj = this.config(options)
         Object.keys(nextParsedObj.parsed).forEach(function (key) {
           // Overload existing params
           parsedObj[key] = nextParsedObj.parsed[key]
         })

        return { parsed: parsedObj }
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
