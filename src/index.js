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
var log          = require('./logger.js');
var regexUtils      = require('./regexUtils');

/* ======

 Startup

 ====== */

// load command linte options into object
var opts = minimist( process.argv );

//console.log(opts);

// Determine fileLog policy
var fileLog = (opts.l || opts['save-log']);
var logPath = (fileLog && _.isString(opts.l) ) ? opts.l : (fileLog && _.isString(opts['save-log'])) ? opts['save-log'] : 'webvideoconvert.log';

// determine verbosity of output
var verbose = opts.verbose;

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

// TODO check for ffmpeg and ffprobe presence
try {
    var ffprobeTestExec = childProcess.execFileSync('ffprobe', ['-version']);
} catch (error) {
    //console.log('Could not find ffprobe'.red);
    log.error('Could not find ffprobe');
    process.exit(1);
}

try {
    var ffmpegTestExec = childProcess.execFileSync('ffmpeg', ['-version']);
} catch (error) {
    log.error('Could not find ffmpeg');
    process.exit(1);
}

// Output banner
var banner  = ('Web Video Converter v' + pkg.version).underline.green;
log.log( banner, true);

// Record startup time
var startupTime = new Date;

log.log( 'Start time :'+startupTime.toString() );


// TODO build a list of tasks


// TODO execute tasks
