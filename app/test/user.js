var chai = require('chai'),
    expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app.js'),
    url = 'http://localhost:3004',
    conn = require('../model/user1');

describe('test for user', function() {
    this.timeout(30000);
    it('user test mobile registration', function(done) {
        request(url)
            .post('/mobile-registration')
            .send({
                'mobile': '+91-7777777777',
                'username': 'chandan'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.mobile).to.be.a('string');
                    expect(res.request._data.mobile).to.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/);
                    expect(res.request._data.username).to.be.a('string');
                }
                done();
            })
    });

    it('user test otp verification', function(done) {
        request(url)
            .post('/mobile-verification')
            .send({
                'mobile': '+91-7777777777',
                'otp': 5154
            })
            .end(function(err, res) {
                if (err) {
                    done(error);
                } else {
                    expect(res.request._data.mobile).to.be.a('string');
                    expect(res.request._data.mobile).to.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/);
                    expect(res.request._data.otp).to.be.a('Number');
                }
                done();
            })
    });

    it('user test for set profile pic', function(done) {
        request(url)
            .post('/set-profile-pic')
            .send({
                'mobile': '+91-7777777777',
                'file': 'image.jpeg'
            })
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.request._data.mobile).to.be.a('string');
                    expect(res.request._data.mobile).to.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/);
                    expect(res.request._data.file).to.be.a('string');
                    expect(res.request._data.file).to.equal('image.jpeg');
                }
                done();
            })
    });
    
    it('user test for feedback', function(done) {
        request(url)
            .post('/feedback')
            .send({
                'name': 'Chandan',
                'email': 'chandan@gmail.com',
                'message': 'Yo YO man'
            })
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.request._data.name || res.request._data.email || res.request._data.message).to.be.a('string');
                    expect(res.request._data.email).to.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
                }
                done();
            })
    });

    it('user test for signup form', function(done) {
        request(url)
            .post('/signup')
            .send({
                'name': 'Chandan',
                'email': 'chandan@gmail.com',
                'contact': '+91-7777777777',
                'password': 'asdfg123'
            })
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.request._data.name || res.request._data.email || res.request._data.contact || res.request._data.password).to.be.a('string');
                    expect(res.request._data.email).to.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
                    expect(res.request._data.contact).to.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/)
                }
                done();
            })
    });
})