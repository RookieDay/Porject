var sub = require('./sub');
var css_color = require('../main.css');
var app = document.createElement('div');
app.innerHTML = '<h1>hello ana index</h1>';
app.appendChild(sub());
document.body.appendChild(app);