'use strict';

var utils             = require('utils');
var EventEmitter      = require('events').EventEmitter;

var logger      = require('./utils/logger');
var regex       = require('./utils/regex');

var webvideoconvert = function(taskManifest, options) {

    // instantiate with new or just by calling the functions
    if ( !(this instanceof webvideoconvert) ) {
        return new webvideoconvert(taskManifest, options);
    }



};

utils.inherits(webvideoconvert, EventEmitter);

/*

 Static functions

 */
webvideoconvert.verifyFFTools = function() {
    // TODO check for ffmpeg and ffprobe presence

    var valid = true;

    try {
        var ffprobeTestExec = childProcess.execFileSync('ffprobe', ['-version']);
    } catch (error) {
        valid = false;
        log.error('Could not find ffprobe');
    }

    try {
        var ffmpegTestExec = childProcess.execFileSync('ffmpeg', ['-version']);
    } catch (error) {
        valid = false;
        log.error('Could not find ffmpeg');
    }
};

// Giveth the module unto the world of js
modules.export = webvideoconvert;