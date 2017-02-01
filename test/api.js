const App = require('../server.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect  = chai.expect
const assert = chai.assert

chai.use(chaiHttp)

describe('API Testing', () => {
  it('GET /v1/api Should 200 OK', (done) => {
    let url = '/v1/api'

    chai.request(App.server)
      .get(url)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.contain('CTO')
        done()
      })
  })
})
