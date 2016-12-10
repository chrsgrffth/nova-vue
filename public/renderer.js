// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const moment = require('moment');

const settings = require('./settings.js') || null;

window.notes = []

fs.readdir(settings.sourceFolder, (err, files) => {
  files.forEach(function(file, index) {

    var filePath = settings.sourceFolder + '/' + file;

    fs.stat(filePath, function(err, stats) {

      if (!stats.isFile()) return;

      var fileContents = fs.readFileSync(filePath, 'utf8');
      var filePreview = fileContents.replace(/[\^\*`#{}=\-_~]/g,"").substring(0, 320)+'...';
      var fileContentsRaw = fileContents.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      fileContentsRaw = fileContentsRaw.replace(/\s{2,}/g,"");

      note = {
        title: file.substr(0, file.lastIndexOf('.')).replace(':','/') || file,
        preview: filePreview,
        content: fileContents,
        raw: fileContentsRaw,
        dateModified: stats.mtime,
        dateModifiedPretty: moment(stats.mtime).fromNow()
      }

      if (!file.charAt(0).match(/^(\.|\_)$/) && file != 'Notes & Settings') {
        window.notes.push(note)
      }

      // Sort the notes by date modified.
      if (index+1 == files.length) {
        window.notes.sort(function (a, b) {
          return b.dateModified - a.dateModified;
        });
      }
    });
  });
})

window.someGlobalFunction = function() {
  console.log('Global stuff.')
}
