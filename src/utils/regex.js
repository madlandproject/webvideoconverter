var patterns = {
    ffVersion : /^ff(?:probe|mpeg) version [a-z]?((?:[0-9]|\.)*)/ig
};

module.exports = {
    patterns : patterns,

    /**
     * Get version number.
     * @param raw
     * @returns {String|null} string representation of the verson
     */
    version : function(raw) {

        var regexResult = patterns.ffVersion.exec( raw );

        return (regexResult && regexResult.length > 1) ? regexResult[1] : null;
    },

    /**
     *
     * @param codecName name of the codec lib
     * @param searchString raw FFmpeg output to look at
     * @returns {boolean} is the codec lib installed
     */
    codecInstalled : function(codecName, searchString) {
        "use strict";

        var regExp = new RegExp('(^\\s.{6}\\s)' + codecName + '(?=\\s.*$)', 'im');
        return regExp.test( searchString );

    }

};