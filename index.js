const util = require('util');

const header = [
  '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
  '<!-- This is an automatically generated file.',
  '     It will be read and overwritten.',
  '     DO NOT EDIT! -->',
  '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
  '<TITLE>Bookmarks</TITLE>',
  '<H1>$H1$</H1>',
  '',
  ''
].join('\n');
const urlfields = new Set([
  'add_date',
  'last_visit',
  'last_modified',
  'last_charset',
  'icon',
  'icon_uri',
  'image',
  'personal_toolbar_folder',
  'unfiled_bookmarks_folder'
]);

// exports
module.exports = netscape;

/**
 * Entry point to the module
 */
function netscape(bookmarks, options = {}) {
  const headerFile = header.replace('$H1$', options?.title || 'Bookmarks Menu');
  return headerFile + makehtml(bookmarks);
}

function encodeHTMLEntities(txt) {
  const pElm = document.createElement('p');
  pElm.textContent = txt;
  return pElm.innerHTML;
}

/**
 * Private function for recursively creating the bookmarks
 */
function makehtml(obj, indent, folder) {
  indent = indent || 0;
  const s = [];
  if (folder) {
    let folderHeader = util.format('%s<DT><H3', pad(indent));
    for (const [key, value] of Object.entries(folder)) {
      if (urlfields.has(key))
        folderHeader += util.format(' %s="%s"', key.toUpperCase(), value);
    }
    s.push(util.format('%s>%s</H3>', folderHeader, encodeHTMLEntities(folder.title)));
  }

  s.push(util.format('%s<DL><p>', pad(indent)));
  // loop the bookmarks
  for (const bookmark of obj) {

    // check if we have a directory or a bookmark file
    if (bookmark.contents) {
      // directory, recurse
      s.push(makehtml(bookmark.contents, indent + 1, bookmark));
    } else if (bookmark.separator) {
      s.push(util.format('%s<HR>', pad(indent + 1)));
    } else {
      // bookmark, create the link
      let link = util.format('<A HREF="%s"', bookmark.url);
      for (const [key, value] of Object.entries(bookmark)) {
        if (urlfields.has(key))
          link += util.format(' %s="%s"', key.toUpperCase(), value);
      }
      link += util.format('>%s</A>', encodeHTMLEntities(bookmark.title));

      // append the link to the final string
      s.push(util.format('%s<DT>%s', pad(indent + 1), link));

      // append description if available
      if (bookmark.description) {
        s.push(util.format('%s<DD>%s', pad(indent + 1), encodeHTMLEntities(bookmark.description)));
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
