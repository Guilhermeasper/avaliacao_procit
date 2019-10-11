const express = require('express');
const server = express();
var path = require('path');
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
//server.use(expressLayouts)
server.use(bodyParser.urlencoded())
server.set('views', path.join(__dirname, './views'));
server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs');
const db = require('./db')

const port = 3000;


server.get('/', db.get_tweets)
server.post('/', db.post_tweets)

server.listen(port)