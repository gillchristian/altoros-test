'use strict'
var expect      = require('chai').expect;
var request     = require('request');
var server      = require('../../index.js');
var iconsRouter = require('../../app/routes/icons.routes');

describe('Products route /icons', ()=>{

  var url = 'http://localhost:3000/api/products/';

  beforeEach(()=>{
    server.listen(3000);
  })

  it('status 200', ()=>{
    request(url, (error, res, body)=>{
      expect(res.statusCode).to.equal(200);
    })
  })

  it('returns a Boolean', ()=>{
    url += 'name/Some%20Product';
    request(url, (error, res, body)=>{
      expect(typeof res.body).to.be('Boolean');
    })
  })

})
