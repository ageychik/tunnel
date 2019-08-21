const util = require('util');
const path = require('path');



module.exports = class Logger {
    constructor() {
        function generateLogFunction(level) {
            return function(message,meta) {
                let mes = '[' + level + '] ';
                mes += message;
                if(meta) mes += "  " + util.inspect(meta) + " ";
                mes += '\n';

                this.write(mes);
            }
        }

        this.streams = [process.stdout];
        this.log = generateLogFunction('Log');
        this.info = generateLogFunction('Info');
        this.error = generateLogFunction('Error');
        this.warn = generateLogFunction('Warning');
    }
    write(d)
    {
        this.streams.forEach((stream)=>{
            stream.write(d);
        });
    }
}
