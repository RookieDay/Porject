'use strict';
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const musicPath = require('../config').musicPath;
const musicList = require('../models/music');
const Music = musicList;
exports.renderIndex = (req, res) => {
    res.render('index');
}