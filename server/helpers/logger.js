const util = require('util');
const path = require('path');
const colors = require('colors');
const dateFormat = require('dateformat');

module.exports = class Logger {

    constructor() {

        function generateLogFunction(level) {
            return function (message, meta) {
                let mes = (level ? this.styles(level) : '') + ((meta) ?  this.styles(meta) : '') + message;
                // this.getDemo();
                this.write(mes);
                return mes;

            }
        }

        this.streams = [process.stdout];
        this.log = generateLogFunction('Log');
        this.info = generateLogFunction('Info');
        this.error = generateLogFunction('Error');
        this.warn = generateLogFunction('Warning');
        this.debug = generateLogFunction();
        this.log = function (text){
            let stop = false;
            let beginTime = Date.now();

            function* generatror(){
                let _str = `[${ dateFormat(beginTime, 'HH:MM:ss') }] ${text ? text : ''} start.`;
                let _color = 'white';
                let data;

                this.write(colors[_color](_str));
                data = yield;
                while(!stop){
                    if(data){
                        _str = data.text || '[Next logger event]';
                        _color = data.color || 'white';
                    }

                    this.write('  ' + colors[_color](_str));
                    data = yield;

                    if(stop){
                        this.write(colors.white(`[${ dateFormat(Date.now(), 'HH:MM:ss') }] ${text ? text : ''} letter: `) + colors.green(`${(Date.now() - beginTime) / 1000}s`))
                    }
                }
            }

            let foo = generatror.apply(this);
                foo.next(text);
            return {
                end: () => {
                    stop = true;
                    foo.next();
                },
                add ({ color = 'white', text }){
                    foo.next({color: color, text: text})
                }
            }
        }

    }

    styles(msg) {
        colors.setTheme({
            log: 'cyan',
            info: 'magenta',
            error: 'red',
            warning: 'yellow',
            warn: 'yellow',
            method: 'blue',
            url: 'yellow',
            time: 'magenta',
            date: 'white',
            wait: 'blue',
            success: 'green',
            redirection: 'cyan'
        });
        if(typeof msg === 'string'){
            return colors[(msg.toLowerCase())](`[${msg}]`);
        }

        if(typeof msg === 'object'){
            let string = '';

            Object.keys(msg).forEach(function (val) {

                switch (val.toLowerCase()) {
                    case 'date' :
                        string += colors[(val.toLowerCase())](`[${dateFormat(msg[val], 'HH:MM:ss')}]`);
                        break;
                    case 'method' :
                        string += colors[(val.toLowerCase())](`[${msg[val]}]`);
                        break;
                    case 'url' :
                        string += colors[(val.toLowerCase())](`[${val} - "${msg[val]}"]`);
                        break;
                    case 'time' :
                        string += colors[(val.toLowerCase())](` Response time: ${ msg[val]}ms`);
                        break;
                    case 'status' :
                        let status = '';
                        if(msg[val][0] >= 100 && msg[val][0] <= 102) status = 'info';
                        if(msg[val][0] >= 200 && msg[val][0] <= 208) status = 'success';
                        if(msg[val][0] >= 300 && msg[val][0] <= 308) status = 'redirection';
                        if(msg[val][0] >= 400) status = 'error';

                        string += colors[status](`[${ msg[val][1] }]`);
                        break;
                    default     :
                        string += colors.white(`[${val}:${msg[val]}]`);
                        break
                }

            });

            return string;
        }
    }

    getDemo (){
        this.write(colors.black  ('\n   Demo for colors:    Demo for background:            Extra demos:\n'));
        this.write(colors.red    ('   color: red          '+  colors.gray.bgBlack  ('   background: bgBlack    ') +'      '+ colors.rainbow('extra fornts: rainbow')));
        this.write(colors.green  ('   color: green        '+  colors.gray.bgRed    ('   background: bgRed      ') +'      '+ colors.zebra  ('extra fornts: zebra')));
        this.write(colors.yellow ('   color: yellow       '+  colors.gray.bgGreen  ('   background: bgGreen    ') +'      '+ colors.america('extra fornts: america')));
        this.write(colors.blue   ('   color: blue         '+  colors.gray.bgYellow ('   background: bgYellow   ') +'      '+ colors.trap   ('extra fornts: trap')));
        this.write(colors.magenta('   color: magenta      '+  colors.gray.bgBlue   ('   background: bgBlue     ') +'      '+ colors.random ('extra fornts: random')));
        this.write(colors.cyan   ('   color: cyan         '+  colors.gray.bgMagenta('   background: bgMagenta  ')));
        this.write(colors.white  ('   color: white        '+  colors.gray.bgCyan   ('   background: bgCyan     ')));
        this.write(colors.gray   ('   color: gray         '+  colors.gray.bgWhite  ('   background: bgWhite    \n')));
    }

    write(msg) {
        this.streams.forEach((stream) => {
            stream.write(msg + '\n');
        });
    }

};