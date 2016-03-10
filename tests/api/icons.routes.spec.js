'use strict'
var expect      = require('chai').expect;
var request     = require('request');
var server      = require('../../index.js');
var iconsRouter = require('../../app/routes/icons.routes');

describe('Icons route /icons', ()=>{

  var url = 'http://localhost:3000/api/icons';

  beforeEach(()=>{
    server.listen(3000);

  })

  it('status 200', ()=>{
    request(url, (error, res, body)=>{
      expect(res.statusCode).to.equal(200);
    })
  })

  it('returns an array', ()=>{
    request(url, (error, res, body)=>{
      expect(res.body).to.be.a('array');
    })
  })

  it('returns a not empty array', ()=>{
    request(url, (error, res, body)=>{
      expect(res.body.length > 0).to.be.true()
    })
  })

  it('returns an array with {id: x, name: xxxx} like objects', ()=>{
    request(url, (error, res, body)=>{
      expect(res.body[5]).to.be.a('object')
      expect(res.body[5]).to.have.property('id')
      expect(res.body[5]).to.have.property('name')
      expect(res.body[5]).to.have.property('class')
    })
  })

})
