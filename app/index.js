var generators = require('yeoman-generator');
var fs = require('fs')

module.exports = generators.Base.extend({
  init: function () {
    return this.prompt([
      {
        type    : 'input',
        name    : 'componentDirectory',
        message : 'Your components directory',
        default : 'src/components'
      },
      {
        type    : 'input',
        name    : 'storyDirectory',
        message : 'Your story directory',
        default : 'stories/'
      }

    ]).then(function (response) {
      this.config.set('componentDirectory', response.componentDirectory)
      this.config.set('storyDirectory', response.storyDirectory)
    }.bind(this));
  }
});
