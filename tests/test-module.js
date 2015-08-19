#!/usr/bin/env node

var fs              = require('fs');

var webvideoconvert = require('../src/index.js');

var manifest = JSON.parse( fs.readFileSync('webvideoconvert.json', {encoding : 'utf8'}) );


webvideoconvert(manifest.input, manifest.output);
