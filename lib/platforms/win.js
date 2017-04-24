const exec = require('child_process').exec

var workingDir = process.cwd()
var myString = workingDir;
var splits = myString.split("/");

var nameOfApp = splits[splits.length - 1]

let cmd = `./node_modules/electron-packager/cli.js . ${nameOfApp} --platform=win32 --arch=x64 --overwrite --prune=true --out=${workingDir}/dist --asar`
exec(cmd, (err, stdout, stderr) => {
  console.log(stdout);
  console.log(err);
  console.log(stderr);
});
