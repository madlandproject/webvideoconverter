var fs = require('fs');


var logger = {

    enable : function(options) {

        this.versbose = options.verbose;
        this.logFile  = options.logFile;

        this.enabled = true;

    },

    _output : function(message, always) {

        var messageLine = message+"\n";

        // console
        if ( this.versbose || always ) {
            console.log(messageLine);
        }

        // file log
        if (this.logFile) {
            fs.appendFileSync(this.logFile, messageLine);
        }

    },

    log : function(message, always) {
        if (this.enabled) {

            var formattedMessage = "[LOG] "+message;
            this._output(message, always);

        }
    },

    error : function(message) {
        if (this.enabled) {

            var formattedMessage = ("[ERROR] "+message).bgWhite.red;
            this._output(formattedMessage, true);

        }
    }

};

module.exports = logger;