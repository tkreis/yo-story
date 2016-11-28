var assert = require("yeoman-assert");
var helpers = require("yeoman-test");
var path = require('path');
var fs = require('fs');

const COMPONENT_DIR = '/src'
const STORY_DIR = '/stories'

describe('story', function() {

  before(function () {
    return helpers.run(path.join( __dirname, '/app'))
      .withPrompts({ componentDirectory: COMPONENT_DIR })
      .withPrompts({ storyDirectory: STORY_DIR })
      .toPromise();
  });

  it('should correctly save the directories to the config', function() {
    assert.fileContent('.yo-rc.json', `"componentDirectory": "${COMPONENT_DIR}"`)
    assert.fileContent('.yo-rc.json', `"storyDirectory": "${STORY_DIR}`)
  });
});

let tmpDir;

describe('story:add', function() {

  before(function () {
    return helpers.run(path.join(__dirname, '/add'))
      .inTmpDir(function (dir) {
        tmpDir = dir;
        fs.mkdirSync(dir + '/stories');
        fs.writeFileSync(dir + '/stories/index.js');
        this.withLocalConfig({componentDirectory: tmpDir + COMPONENT_DIR, storyDirectory: tmpDir + STORY_DIR});
      })
      .withPrompts({componentName: "test"})
      .toPromise()
  });

  it('should correctly save the directories to the config', function () {
    assert.fileContent('stories/index.js', `require('./test');`);
    assert.file('stories/test.js');
  });

  it('should correctly save the boilerplate to the story', function () {
    assert.fileContent('stories/test.js', "import React from 'react';");
    assert.fileContent('stories/test.js', "import { storiesOf, action } from '@kadira/storybook';");
    assert.fileContent('stories/test.js', `import test from '..${tmpDir}${COMPONENT_DIR}/test';`);
    assert.fileContent('stories/test.js', "storiesOf('test', module)");
    assert.fileContent('stories/test.js', ".add('test', () => {");
    assert.fileContent('stories/test.js', 'return (');
    assert.fileContent('stories/test.js', '\<test/>');
  });
});
