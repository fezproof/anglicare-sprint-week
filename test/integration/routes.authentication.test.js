const chai = require('chai');
const server = require('../../app');
const chaiHttp = require('chai-http');
const request = require('supertest');
const users = require('../../seeded_users.json');

const should = chai.should();
chai.use(chaiHttp);

const mongoose = require('mongoose');

const User = mongoose.model('User');

describe('routes : authentication', () => {
  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('POST /login', () => {
    it('should login with valid credentials', (done) => {
      request.agent(server)
        .post('/login')
        .send({
          email: users[0].email,
          password: users[0].password,
        })
        .redirects(1)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.text.should.contain(`Welcome ${users[0].name}`);
          done();
        });
    });

    it('should fail to login with invalid credentials', (done) => {
      request.agent(server)
        .post('/login')
        .send({
          email: 'randomemail@email.com',
          password: 'invalidpass',
        })
        .redirects(1)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.text.should.contain('Incorrect username');
          done();
        });
    });
  });
  // skip for now since we don't need register
  describe.skip('POST /register', () => {
    const userToRegister = {
      email: 'user@mail.com',
      name: 'Jack Wang',
      password: 'goodpass',
    };
    it('should register successfully with valid data', (done) => {
      request.agent(server)
        .post('/register')
        .send(userToRegister)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          User.find({ email: userToRegister.email }, (errU, user) => {
            if (err) {
              console.log(`[ERROR] POST /register: ${errU}`);
            }
            should.exist(user);
            user[0].name.should.equal(userToRegister.name);
            user[0].email.should.equal(userToRegister.email);
          });
          done();
        });
    });
  });

  describe('GET /logout', () => {
    beforeEach((done) => {
      request.agent(server)
        .post('/login')
        .send({
          email: users[0].email,
          password: users[0].password,
        });
      done();
    });

    it('should logout successfully for logged in user', (done) => {
      request.agent(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.text.should.not.contain(`Welcome ${users[0].name}`);
          done();
        });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
        .get('/404')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(404);
          done();
        });
    });
  });

});
