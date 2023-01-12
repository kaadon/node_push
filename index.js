let dotenv = require('dotenv');
dotenv.config('.env');
const sade         = require('sade');
const prog         = sade('node_socket_io');
const socketServer = require('./src/cmd/socketIo')
const version      = '1.0.1';

prog.version(`v${version}. Copyright 2021 Kaadon.`)
    .describe(`node_socket_io v${version}. Copyright 2021 Kaadon`);

prog.command('io')
    .describe('io server')
    .action(() => {
        socketServer()
    });

prog.command('update')
    .describe('Check new version of ossync.')
    .action(() => {
        console.log('Not implemented yet');
    });

prog.parse(process.argv);