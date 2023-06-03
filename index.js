const express = require('express')
const router = require('./router/router')
const app = express()
const port = 2020
const session = require('express-session')
const passport = require('passport') 
const http = require('http')
const server = http.createServer(app)

app.set('view engine', 'hbs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
require('hbs').registerPartials(__dirname + '/views/component')
 
 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })) 
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router) 
server.listen(port)