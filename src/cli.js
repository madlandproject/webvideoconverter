#! /usr/bin/env node

/* ======

 Load dependencies

 ====== */

// -> Native modules
var fs              = require('fs');
var childProcess    = require('child_process');

// -> 3rd Party Modules
// General utility modules
var _               = require('lodash');
var pkg             = require('../package.json');

// Command line utility modules
var colors          = require('colors');
var minimist        = require('minimist');

// -> Internal modules
// general
var webvideoconvert = require('./index');
var log             = require('./utils/logger');



/* ======

 Startup

 ====== */

// load command linte options into object
var opts = minimist( process.argv );

// Determine fileLog policy
var fileLog = (opts.l || opts['save-log']);
var logPath = (fileLog && _.isString(opts.l) ) ? opts.l : (fileLog && _.isString(opts['save-log'])) ? opts['save-log'] : 'webvideoconvert.log';

// determine verbosity of output
var verbose = opts.verbose;

// enable logger
if (fileLog) {
    log.enable({logFile : logPath, verbose: verbose});
} else {
    log.enable({verbose: verbose});
}

// find the manifest file, either with options or automatically
var manifestPath = './videomanifest.json';
if ( opts.manifest && _.isString(opts.manifest) ) {
    manifestPath = opts.manifest;
} else if ( opts.m && _.isString(opts.m) ) {
    manifestPath = opts.m;
}

// test if manifest file exists
if ( !fs.exists( manifestPath ) ) {
    //process.exit( 1 ); // TODO proper exit codes
}



// Output banner
var banner  = ('Web Video Converter v' + pkg.version).underline.green;
log.log( banner, true);

// Record startup time
var startupTime = new Date;

log.log( 'Start time :'+startupTime.toString() );

// send manifest and options to instance of encoder
var encoder = webvideoconvert( fs.readFileSync(manifestPath), { } );