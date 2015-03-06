'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var slug = require('slug');
var NodeServiceGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },
  askFor: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous static angular generator!'));
    var prompts = [
      {
        type: 'string',
        name: 'title',
        message: 'What is the title of your application?',
        default: 'Hello World'
      },
      {
        type: 'string',
        name: 'description',
        message: 'Please describe your app:',
        default: 'A app.'
      },{
        type: 'string',
        name: 'port',
        message: 'What is the port of your chat?',
        default: '1337'
      },
      {
        type: 'string',
        name: 'name',
        message: 'What is your name?',
        default: 'C\xE9dric'
      },
      {
        type: 'string',
        name: 'github',
        message: 'What is your github?',
        default: 'cedced19'
      },
      {
        type: 'string',
        name: 'email',
        message: 'What is your email?',
        default: 'user@domain.com'
      },
      {
        type: 'confirm',
        name: 'socket',
        message: 'Would you like socket.io?',
        default: false
      },
      {
        type: 'confirm',
        name: 'check',
        message: 'Would you like check-update?',
        default: true
      },
      {
        type: 'confirm',
        name: 'checkGithub',
        message: 'Would you like check-update-github?',
        default: false
      }
    ];
    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.description = props.description;
      this.name = props.name;
      this.github = props.github;
      this.email = props.email;
      this.socket = props.socket;
      this.port = props.port;
      this.check = props.check;
      this.checkGithub = props.checkGithub;
      done();
    }.bind(this));
  },
    
  app: function () {
    this.mkdir('lib');
    this.mkdir('vendor/js');
    this.mkdir('vendor/css');
    this.mkdir('vendor/fonts');
    this.mkdir('dist');
    this.template('index.html', 'index.html');
    this.template('vendor/js/app.js', 'vendor/js/app.js');
    this.template('vendor/css/main.css', 'vendor/css/main.css');
    this.template('_package.json', 'package.json');
    this.template('app.js', slug(this.title.toLowerCase()) + '.js');
    this.copy('favicon.ico', 'favicon.ico');
    this.copy('gitignore', '.gitignore');
    this.copy('dist/npmignore', 'dist/.npmignore');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('README.md', 'README.md');
  }
});
module.exports = NodeServiceGenerator;