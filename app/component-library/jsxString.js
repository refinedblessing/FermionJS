const fs = require('fs');
const path = require('path');

const jsxIdentifier = {
  start: '/* @fermion jsx */',
  end: '/* @fermion !jsx */'
}

const getJsxString = (fileName, directory = path.join(__dirname, fileName)) =>
  fs.readFileSync(directory, 'utf8')
  .split(jsxIdentifier.start)[1]
  .split(jsxIdentifier.end)[0]

module.exports = { getJsxString };