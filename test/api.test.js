const test = require('tape');
const request = require('supertest');

const service = require('../server');

test('GET /status', (t) => {
  request(service)
    .get('/status')
    .expect(200)
    .end((err,res) => {
      t.error(err)
      t.equal(res.text, 'Demo API OK!')
      t.end();
    })
})

test('GET /demo', (t) => {
  request(service)
    .get('/demo')
    .expect(200)
    .end((err,res) => {
      t.error(err)
      t.deepEqual(res.body, {'demo': 'This is the GitlabCI Demo Api'})
      t.end();
    })
})
