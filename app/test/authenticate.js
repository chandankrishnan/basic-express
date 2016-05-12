var chai = require('chai'),
    expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    auth = require('../../app.js'),
    url = 'http://localhost:3003';

describe('authenticate test1', function() {
    this.timeout(30000);
    it('auth for email and password', function(done) {
        request(url)
            .post('/auth/user')
            .send({
                'email': 'chandan@gmail.com',
                'password': 'Chandan123'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.email).to.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
                    expect(res.request._data.password).to.be.a('string')
                }
                done();
            })
    });

    it('auth for mobile', function(done) {
        request(url)
            .post('/auth/mobile')
            .send({
                'mobile': '+91-7777777777'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.mobile).to.be.a('string');
                    expect(res.request._data.mobile).to.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/);
                }
                done();
            })
    });

    it('github token', function(done) {
        request(url)
            .post('/github')
            .send({
                code: 'fhkfsddsjf',
                client_id: 'fdskhsdkjfhsd',
                client_secret: 'f154f7923e45f63ca749955d7b515eb499c8a1dd',
                redirect_uri: 'https://www.google.co.in'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.client_secret).to.equal('f154f7923e45f63ca749955d7b515eb499c8a1dd');
                }
                done();
            })
    });
});