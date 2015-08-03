var patterns = {
    ffVersion : /^ff(?:probe|mpeg) version [a-z]?((?:[0-9]|\.)*)/ig
};

module.exports = {
    patterns : patterns,

    version : function(raw) {

        var regexResult = patterns.ffVersion.exec( raw );

        return (regexResult && regexResult.length > 1) ? regexResult[1] : null;
    }

};