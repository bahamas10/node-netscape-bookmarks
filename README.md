netscape-bookmarks
==================

Create a netscape format bookmarks file (works with Chrome)

Installation
------------

    npm install netscape-bookmarks

Usage
-----

``` js
var netscape = require('netscape-bookmarks');
var bookmarks = {
  'Dave Eddy': 'http://www.daveeddy.com',
  'Perfume Global': 'http://www.perfume-global.com'
};

var html = netscape(bookmarks));
console.log(html);
```

results in this awful looking, netscape-compatible, html

``` html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.
    It will be read and overwritten.
    Do Not Edit! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
<H1>Bookmarks</H1>
<DL><p>
<DT><A HREF="http://www.daveeddy.com">Dave Eddy</a>
<DT><A HREF="http://www.perfume-global.com">Perfume Global</a>
</DL><p>
```

You can import this HTML into your favorite browser and it *should*
work.  Consider looking into the [node urlfile](https://github.com/bahamas10/node-urlfile)
module I've written for further bookmark processing.

Examples
--------

Given

``` json
{
  "Dave Eddy's Blog": "http://www.daveeddy.com",
  "Perfume Global": "http://www.perfume-global.com/",
  "Unfiled": {
    "contents": {
      "Twitter": "http://twitter.com"
    }
  },
  "Second Folder": {
    "contents": {
      "Nested Folders!": {
        "contents": {
          "YouTube": "http://www.youtube.com",
          "GitHub": "https://github.com"
        }
      }
    }
  },
  "TekZoned": {
    "url": "http://www.tekzoned.com",
    "add_date": 1357547237,
    "last_visit": 1357547238,
    "last_modified": 1357547239
  }
}
```

you get

``` html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.
    It will be read and overwritten.
    Do Not Edit! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
<H1>Bookmarks</H1>
<DL><p>
<DT><A HREF="http://www.daveeddy.com">Dave Eddy's Blog</a>
<DT><A HREF="http://www.perfume-global.com/">Perfume Global</a>
  <DT><H3>Unfiled</H3>
  <DL><p>
  <DT><A HREF="http://twitter.com">Twitter</a>
  </DL><p>
  <DT><H3>Second Folder</H3>
  <DL><p>
    <DT><H3>Nested Folders!</H3>
    <DL><p>
    <DT><A HREF="http://www.youtube.com">YouTube</a>
    <DT><A HREF="https://github.com">GitHub</a>
    </DL><p>
  </DL><p>
<DT><A HREF="http://www.tekzoned.com" ADD_DATE="1357547237" LAST_VISIT="1357547238" LAST_MODIFIED="1357547239">TekZoned</a>
</DL><p>
```

Notes
-----

A website can either be a string containing the URL only, or an object with
the `url` attribute present.  If the `contents` attribute is found, it is
assumed to be a folder containing more folders or websites.

License
-------

MIT License
