var generators = require('yeoman-generator');
var fs = require('fs')

module.exports = generators.Base.extend({

  add: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'componentName',
      message : 'Your component name',
      default : 'Component'
    }
    ]).then(function (response) {
      this.componentName = response.componentName;
    }.bind(this));
  },

  copy: function () {
    const storyDirectory = this.config.get('storyDirectory');

    this.fs.copyTpl(
      this.templatePath('story.js'),
      this.destinationPath(`${storyDirectory}/${this.componentName}.js`),
      {
        componentName: this.componentName,
        componentDirectory: this.config.get('componentDirectory')
      }
    )
  },

  insert: function () {
    const storyDirectory = this.config.get('storyDirectory');
    const componentName = this.componentName;
    const componentDirectory = this.config.get('componentDirectory');
    fs.appendFileSync(`${storyDirectory}/index.js`, ` \n require('./${componentName}');`);
  }
});
