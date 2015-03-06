#!/usr/bin/env node
'use strict';
var hapi = require('hapi'),
    app = new hapi.Server(),
    fs = require('fs'),
    program = require('commander'),
    pkg = require('./package.json'),
    port = <%= port %>,
    colors = require('colors');

program
  .version(pkg.version)
  .option('-p, --port [number]', 'specified the port')
  .parse(process.argv);

app.route({
    method: 'GET',
    path: '/vendor/{param*}',
    handler: {
        directory: {
            path: __dirname + '/vendor/'
        }
    }
});

app.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file(__dirname + '/index.html');
    }
});


app.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function (request, reply) {
        reply.file(__dirname + '/favicon.ico');
    }
});

app.start(function() {
    <% if (check) { %>
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
    <% } %>
    <% if (checkGithub) { %>
    require('check-update-github')({name: pkg.name, currentVersion: pkg.version, user: <%= github %>, branch: 'master'}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
    <% } %>
    console.log('Server running at\n  => ' + colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});

<% if (socket) { %>
var io = require('socket.io').listen(app.listener);
io.sockets.on('connection', function(socket){
});
<% } %>