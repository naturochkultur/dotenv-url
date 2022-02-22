'use strict'

var expect = require('chai').expect
var i = require('../index')

describe('#config(null)', function() {

  it('should return the parsed object', function() {
    var result = i.config()
    expect(result.parsed).to.not.be.undefined

  })

  it('should return and set env variables', function() {
    var result = i.config()
    expect(Object.keys(result.parsed).length).to.equal(1)
    expect(process.env.EMAIL).to.equal('peter@bjorklundlabs.com')
  })

})

describe('#config({path: \'.env\'})', function() {

  var cfg = {path: 'test/.env', encoding: 'utf8'}

  it('should return the parsed object', function() {
    var result = i.config(cfg)
    expect(result.parsed).to.not.be.undefined

  })

  it('should return and set env variables', function() {
    var result = i.config(cfg)
    expect(Object.keys(result.parsed).length).to.equal(1)
    expect(process.env.EMAIL).to.equal('peter@bjorklundlabs.com')
  })

})

describe('#config({path: \'http://host.com/file.env\'})', function() {

  var cfg = {path: 'https://raw.githubusercontent.com/naturochkultur/dotenv-url/master/test/.env', encoding: 'utf8'}

  it('should return the parsed object', function() {
    var result = i.config(cfg)
    expect(result.parsed).to.not.be.undefined

  })

  it('should return and set env variables', function() {
    var result = i.config(cfg)
    expect(Object.keys(result.parsed).length).to.equal(1)
    expect(process.env.EMAIL).to.equal('peter@bjorklundlabs.com')
  })

})

describe('#config({path: [\'one.env\', \'two.env\']})', function() {

  var cfg = {path: ['test/one.env', 'test/two.env'], encoding: 'utf8'}

  it('should return the parsed object', function() {
    var result = i.config(cfg)
    expect(result.parsed).to.not.be.undefined

  })

  it('should return and set env variables', function() {
    var result = i.config(cfg)
    expect(Object.keys(result.parsed).length).to.equal(3)
    expect(process.env.OVERLOAD).to.equal('two')
    expect(process.env.SPECIFIC).to.equal('2')
  })

})

describe('#config({path: [\'http://host.com/file1.env\', \'http://host.com/file2.env\']})', function() {

  var cfg = {
    path: [
      'https://raw.githubusercontent.com/naturochkultur/dotenv-url/master/test/one.env',
      'https://raw.githubusercontent.com/naturochkultur/dotenv-url/master/test/two.env'
    ],
    encoding: 'utf8'
  }

  it('should return the parsed object', function() {
    var result = i.config(cfg)
    expect(result.parsed).to.not.be.undefined

  })

  it('should return and set env variables', function() {
    var result = i.config(cfg)
    expect(Object.keys(result.parsed).length).to.equal(3)
    expect(process.env.OVERLOAD).to.equal('two')
    expect(process.env.SPECIFIC).to.equal('2')
  })

})