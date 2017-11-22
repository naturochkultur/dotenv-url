'use strict';

var expect = require('chai').expect;
var i = require('../index');

describe('#config(filesystem)', function() {

  var cfg = {path: 'test/.env', encoding: 'utf8'}

  it('should return the parsed object', function() {
    var result = i.config(cfg);
    expect(result.parsed).to.not.be.undefined;

  });

  it('should return env variables', function() {
    var result = i.config(cfg);
    expect(Object.keys(result.parsed).length).to.equal(1);
  });

});

describe('#config(url)', function() {

  var cfg = {path: 'https://s3-eu-central-1.amazonaws.com/digilar-properties/test/test.env', encoding: 'utf8'}

  it('should return the parsed object', function() {
    var result = i.config(cfg);
    expect(result.parsed).to.not.be.undefined;

  });

  it('should return env variables', function() {
    var result = i.config(cfg);
    expect(Object.keys(result.parsed).length).to.equal(1);
  });

});