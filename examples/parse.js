var fs = require('fs');
var netscape = require('../');

var bookmarks = JSON.parse(fs.readFileSync('/dev/stdin').toString());
console.log(netscape(bookmarks));
