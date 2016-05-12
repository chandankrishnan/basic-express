var chai = require('chai'),
    expect = require('chai').expect,
    request = require('supertest'),
    express = require('express'),
    content = require('../../app.js'),
    url = 'http://localhost:3003';

describe('test for content', function() {
    this.timeout(30000);
    it('test add new content in database', function(done) {
        request(url)
            .post('/content')
            .send({
                'file': 'image.jpeg',
                'userId': 1,
                'contentId': 1,
                'displayName': 'image.jpeg',
                'description': 'this is image',
                'contentType': 'jpeg'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    console.log(res.request._data);
                    expect(res.request._data.file).to.be.a('string');
                    expect(res.request._data.userId).to.be.a('Number');
                    expect(res.request._data.contentId).to.be.a('Number');
                    expect(res.request._data.displayName).to.be.a('string');
                    expect(res.request._data.description).to.be.a('string');
                    expect(res.request._data.contentType).to.be.a('string');
                    expect(res.request._data.contentType).to.equal('jpeg');
                }
                done();
            })
    })

    it('test for view content', function(done) {
        request(url)
            .get('/user-content-view/:contentId/:action')
            .send({
                'contentId': 1,
                'action': 'open'
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.contentId).to.be.a('Number');
                    expect(res.request._data.action).to.be.a('string')
                    expect(res.request._data.action).to.equal('open');
                }
                done();
            })
    })

    it('test for view content by userId', function(done) {
        request(url)
            .get('/user-content-byid/:userId')
            .send({
                'userId': 1
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.userId).to.be.a('Number');
                }
                done();
            })
    })

    it('test for view content by contentId', function(done) {
        request(url)
            .get('/user-content-info/:contentId')
            .send({
                'contentId': 1
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.request._data.contentId).to.be.a('Number');
                }
                done();
            })
    })
})