import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

let userToken;

describe('TESTS TO SIGNUP A USER', () => {
  it('should return `firstname is required` if firstname is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.firstname).to.eql('firstname is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return `lastname is required` if lastname is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.lastname).to.eql('lastname is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return `phone is required` if phone is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'justsine@snqwst.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.phone).to.eql('phone is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return email is required if email is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          username: 'Sanchezqwst',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.email).to.eql('email is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return success status 201', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          firstname: 'Test',
          lastname: 'Testing',
          phone: '08033019928',
          email: 'test@test.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.be.eql('Success');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return a duplicate signup', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          firstname: 'Test',
          lastname: 'Testing',
          phone: '08033019928',
          email: 'test@test.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return an empty entry error', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          username: '',
          email: '',
          password: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('object');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO LOGIN A USER', () => {
  it('should login with status 200', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@test.com',
          password: '1234567'
        })
        .end((err, res) => {
          userToken = res.body.payload.token;
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body.payload.token).to.be.a('string');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('User successfully logged in');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return an invalid login', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'justsine@snqwfssst.com',
          password: '1234d567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Invalid email or password');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
  it('should return an invalid login when password does not match', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'justsine@snqwst.com',
          password: '11224b'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Invalid email or password');
          expect(res.body).to.have.property('status');
          const returnStatus = 400;
          expect(res.body).to.have.property('status', returnStatus);
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return `email is required` if email is absent ', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.email).to.eql('email is required');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO CREATE MONTHLY BUDGET', () => {
  it('should create monthly budget with response 201', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/expenses/monthly')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          expenses: '[{"item": "sleeping", "quantity": 6, "cost": 2}, {"item": "feeding", "quantity": 3, "cost": 5}, {"item": "swimming", "cost": 7, "quantity": 1}]'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.payload).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Monthly budget successfully saved');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid token', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/expenses/monthly')
        .set('Authorization', 'invalidToken')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Invalid token supplied: format Bearer <token>');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid data', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/expenses/monthly')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          expenses: '{"item": "sleeping", "cost": 2}, {"item": "feeding", "cost": 5}, {"item": "swimming", "cost": 7}'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Please enter valid data!');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO FETCH MONTHLY BUDGET', () => {
  it('should return monthly budget with response 200', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/expenses/monthly')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Monthly budget successfully retrieved');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid token', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/expenses/monthly')
        .set('Authorization', 'invalidToken')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Invalid token supplied: format Bearer <token>');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO CREATE RELOCATION BUDGET', () => {
  it('should create relocation budget with response 201', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/expenses/relocation')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          expenses: '[{"item": "sleeping", "quantity": 6, "cost": 2}, {"item": "feeding", "quantity": 3, "cost": 5}, {"item": "swimming", "cost": 7, "quantity": 1}]'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.payload).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Relocation budget successfully saved');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid token', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/expenses/relocation')
        .set('Authorization', 'invalidToken')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Invalid token supplied: format Bearer <token>');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid data', (done) => {
    try {
      chai.request(app)
        .post('/api/v1/expenses/relocation')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          expenses: '{"item": "sleeping", "quantity": 6, "cost": 2}, {"item": "feeding", "quantity": 3, "cost": 5}, {"item": "swimming", "cost": 7, "quantity": 1}'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.equal('Please enter valid data!');
          expect(res.body).to.have.property('status');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});

describe('TESTS TO FETCH RELOCATION BUDGET', () => {
  it('should return relocation budget with response 200', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/expenses/relocation')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.payload).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('Relocation budget successfully retrieved');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });

  it('should return invalid token', (done) => {
    try {
      chai.request(app)
        .get('/api/v1/expenses/relocation')
        .set('Authorization', 'invalidToken')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors.global).to.eql('Invalid token supplied: format Bearer <token>');
          done();
        });
    } catch (err) {
      throw err.message;
    }
  });
});
