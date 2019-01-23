var util = require('util');

var header = [
  '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
  '<!-- This is an automatically generated file.',
  '     It will be read and overwritten.',
  '     DO NOT EDIT! -->',
  '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
  '<TITLE>Bookmarks</TITLE>',
  '<H1>Bookmarks Menu</H1>',
  '',
  ''
].join('\n');
var urlfields = [
  'add_date',
  'last_visit',
  'last_modified',
  'icon',
  'image'
];

// exports
module.exports = netscape;

/**
 * Entry point to the module
 */
function netscape(bookmarks) {
  var s = header;
  s += makehtml(bookmarks);
  return s;
}

/**
 * Private function for recursively creating the bookmarks
 */
function makehtml(obj, indent, foldername) {
  indent = indent || 0;

  var s = [];
  if (foldername)
    s.push(util.format('%s<DT><H3>%s</H3>', pad(indent), foldername));

  s.push(util.format('%s<DL><p>', pad(indent)));
  // loop the bookmarks
  for (var i in obj) {
    if (typeof obj[i] === 'string') obj[i] = { url: obj[i] };
    var bookmark = obj[i];

    // check if we have a directory or a bookmark file
    if (bookmark.contents) {
      // directory, recurse
      s.push(makehtml(bookmark.contents, indent + 1, i));
    } else if (bookmark.separator) {
      s.push(util.format('%s<HR>', pad(indent + 1)));
    } else {
      // bookmark, create the link
      var link = util.format('<A HREF="%s"', bookmark.url);
      for (var j in urlfields) {
        var field = urlfields[j];
        if (bookmark[field])
          link += util.format(' %s="%s"', field.toUpperCase(), bookmark[field]);
      }
      link += util.format('>%s</a>', i);

      // append the link to the final string
      s.push(util.format('%s<DT>%s', pad(indent + 1), link));

      // append description if available
      if (bookmark.description) {
        s.push(util.format('%s<DD>%s', pad(indent + 1), bookmark.description));
      }
    }
  }
  s.push(util.format('%s</DL><p>', pad(indent)));
  return s.join('\n');
}

// return the number of spaces specified
function pad(indent) {
  return new Array(indent * 4 + 1).join(' ');
}

