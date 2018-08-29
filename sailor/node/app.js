var express = require('express')

var fs = require('fs')

var Mock = require('mockjs')

var app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

fs.readdir('./data', function (err, files) {
  if (err) {
    console.error(err)
  } else {
    files.forEach(function (v, i) {
      var url = v.replace(/.js/, '')
      app.post('/v2/score/' + url, function (req, res) {
        res.send(Mock.mock(require('./data/' + v)))
      })
    })
  }
})

app.listen('8090')
