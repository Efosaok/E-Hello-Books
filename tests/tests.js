const app = require('../app')

const request = require('supertest')

describe('test-cases for user routes', ()=>{
	describe('GET /', () => {
  		it('responds with a 404 and error message in json', (done) => {
    		request(app)
      		.get('/')
      		.set('Accept', 'application/json')
      		.expect('Content-Type', /json/)
      		.expect(200, { message: 'Welcome to the beginning of nothingness.' }, done);
  		});
	});
})