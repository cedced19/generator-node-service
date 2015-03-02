'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


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

    var prompts = [{
      name: 'title',
      message: 'What is the title of your application?',
      default: 'Hello World'
    },{
      name: 'description',
      message: 'Please describe your app:'
    },{
      name: 'name',
      message: 'What is your name?'
    },{
      name: 'github',
      message: 'What is your github?'
    },{
      name: 'email',
      message: 'What is your email?'
    }];

    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.description = props.description;
      this.name = props.name;
      this.github = props.github;
      this.email = props.email;

      done();

      var extractGeneratorName = function (_, appname) {
        var slugged = _.slugify(title);
        var match = slugged.match(/^$/);

        if (match && match.length === 2) {
          return match[1].toLowerCase();
      }

      return slugged;
      };
        }.bind(this));
      },
    

    app: function () {
      this.mkdir('lib');
      this.mkdir('vendor/js');
      this.mkdir('vendor/css');
      this.mkdir('vendor/fonts');
      this.mkdir('dist')

      this.template('index.html', 'index.html');
      this.template('vendor/js/app.js', 'vendor/js/app.js');
      this.template('vendor/css/main.css', 'vendor/css/main.css');
      this.template('_package.json', 'package.json');
      this.copy('gitignore', '.gitignore');
      this.copy('gitignore', '.gitignore');
      this.template('Gruntfile.js', 'Gruntfile.js');
      this.template('README.md', 'README.md');
    }
  });


module.exports = NodeServiceGenerator;
