'use strict';

var util              = require('util');
var EventEmitter      = require('events').EventEmitter;
var childProcess      = require('child_process');

var glob              = require('glob');
var Q                 = require('q');
var _                 = require('lodash');

var logger            = require('./utils/logger');
var regex             = require('./utils/regex');

var webvideoconvert = function(input, output, options) {

    // instantiate with new or just by calling the functions
    if ( !(this instanceof webvideoconvert) ) {
        return new webvideoconvert(input, output, options);
    }

    this._originalInput         = input;
    this._originalOutput        = output;
    this._originalOptions       = options;

    // test input files have been specified
    if ( !input ) {
        throw new Error('no input specified for tasks');
    }

    // test ff tools
    if ( !webvideoconvert.verifyFFTools() ) {
        throw new Error('Problem verifying FF tools');
    }

    // get list of encoders
    var codecs = webvideoconvert.buildCodecList();

    // Expand globs and analyse files
    webvideoconvert.expandInputs( input ).then(function(files){

        // get stream information for all the files
        return Q.all( files.map( webvideoconvert.getFileInformation ) );

    }).then(function(fileInfo) {



    });

};

util.inherits(webvideoconvert, EventEmitter);

/*_.extend(webvideoconvert.prototype, {

    processInputs : function() {

    },

    buildOutputTasks : function() {

    },

    startEncodingOutput : function() {

    }

});*/

/*

 Static functions

 */

/**
 * Check for presence of ffmpeg & ffprobe binaries
 *
 * @returns {boolean} true if both binaries are accessible
 */
webvideoconvert.verifyFFTools = function() {
    var valid = true;

    try {
        var ffprobeTestExec = childProcess.execFileSync('ffprobe', ['-version']);
    } catch (error) {
        valid = false;
        logger.error('Could not find ffprobe');
    }

    try {
        var ffmpegTestExec = childProcess.execFileSync('ffmpeg', ['-version']);
    } catch (error) {
        valid = false;
        logger.error('Could not find ffmpeg');
    }

    return valid;
};


/**
 * Object containing lists of audio and video codecs to test for. Names are included as listed from `ffmpeg -encoders` output
 * @type {{video: string[], audio: string[]}}
 */
webvideoconvert.codecsUsed = {

    audio : [
        'libopus',      // for use with VP9 webm
        'libvorbis',    // for use with VP8 webm
        'vorbis',       // FFMpeg experimetnal codec, vp9 and vp8 fallback
        'libfdk_aac',   // Best choice for the AAC codec,
        'libfaac',      // Second free AAC codec.
        'aac'           // FFMpegs basic AAC implementation
    ],

    video : [
        'libvpx',       // webm : vp8
        'libvpx-vp9',   // webm : vp9
        'libx264'       // mp4  : h.264
    ]

};

/**
 * test which codec libs are available
 */
webvideoconvert.buildCodecList = function() {
    var codecs = {
        video : {},
        audio : {}
    };

    // get raw codec list from ffmpeg. Ugly parsing is ugly
    var rawCodecList = childProcess.execFileSync('ffprobe', ['-encoders', '-hide_banner']).toString();

    // detect audio & video codecs
    ['audio', 'video'].forEach(function(streamType){
        webvideoconvert.codecsUsed[streamType].forEach(function(codec){
            codecs[streamType][codec] = regex.codecInstalled(codec, rawCodecList);
        });
    });

    return codecs;
};

/**
 *
 * Get a formatted version of the information of this file
 *
 * @param file file path to analyse
 * @return {Promise} Promise for an object containing the file name and it's stream data
 */
webvideoconvert.getFileInformation = function(file) {
    var infoDeferred = Q.defer();
    var command = [
        'ffprobe',
        '-print_format', 'json',
        '-count_frames',
        '-show_streams',
        file
    ].join(' ');

    var infoProcess = childProcess.exec(command, function(err, stdout){
        if (err) {
            infoDeferred.reject( new Error(err) ); // TODO more explicit errors
        } else {
            infoDeferred.resolve( {file : file, info : JSON.parse(stdout)} );
        }
    });

    return infoDeferred.promise;
};

/**
 *
 * @param file file path
 * @param output output specifier
 * @returns {string} Encoding command line
 */
webvideoconvert.generateOutputCommand = function(file, output) {

    var encoderCommand = '';



    return encoderCommand;
};

/**
 *
 * Expand globs to actual file paths
 *
 * @param inputs array of glob patterns
 * @returns {Promise} Promise for an array of expanded files
 */
webvideoconvert.expandInputs = function(inputs) {
    return Q.nfcall( glob, inputs );
};



// Giveth the module unto the world of js
module.exports = webvideoconvert;