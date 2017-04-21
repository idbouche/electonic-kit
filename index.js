#!/bin/env node
'use strict'

const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const ora = require('ora');

const spinner = new ora({
	text: 'installing all dependencies',
	spinner: 'pong'
});

var workingDir = process.cwd()
var pathNode

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

if (process.platform !== 'darwin') {
  pathNode = "/usr/local/lib/node_modules/electronic-kit-start"
}else if (process.platform !== 'linux') {
  pathNode = "/usr/lib/node_modules/electronic-kit-start"
}else{
  pathNode = "/usr/lib/node_modules/electronic-kit-start"
}

if (process.argv.length === 3) {

  switch (process.argv[2]) {
    case '--platform-win':
      console.log('win comming soon');
      break;
    case '--platform-linux':
      console.log('linux comming soon');
      break;
    case '--platform-mac':
      console.log('mac comming soon');
      break;
    default:
    console.log(chalk.red(`Name for app is required
      Exemple commond:
            electronic-kit-start -g myApp <--template>       // Creat your project  --simple --react template optional
            electronic-kit-start --platform-win   // Build for platform-win
            electronic-kit-start --platform-linux // build for platform-linux
            electronic-kit-start --platform-mac   // build for platform-mac
    `));
  }
}else if(process.argv[2] == 'start' && process.argv[3] != '' ){ncp
  var destination = workingDir+'/'+process.argv[3]
  var source ='/usr/lib/node_modules/electronic-kit-start/template_simple'
  switch (process.argv[4]) {
    case '--simple':
      createProject(source, destination)
      break
    case '--react':
      let sourcer = '/usr/lib/node_modules/electronic-kit-start/template_react'
      createProject(sourcer, destination)
      break
    default:
      createProject(source, destination)

  }

}else {
  console.log(chalk.red(`Name for app is required
    Exemple commond:
          electronic-kit-start -g myApp         // Creat your project
          electronic-kit-start --platform-win   // Build for platform-win
          electronic-kit-start --platform-linux // build for platform-linux
          electronic-kit-start --platform-mac   // build for platform-mac
  `));
}

function createProject(sourcPath, distPath) {
  var cmd = `cd ${workingDir} && mkdir ${process.argv[3]} `;
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    if (stderr) {
      console.log(stderr);
      return
    }
    ncp(sourcPath, distPath, function (err) {
     if (err) {
       return console.error(err);
     }

     console.log(chalk.green(`Project ${process.argv[3]} in progrissing `));
     spinner.start()
     setTimeout(() => {
      	spinner.color = 'green';
      	spinner.text = 'Loading dependencies ...';
     }, 1000);
     installDep( distPath)
    });
  });
}

function installDep( dist) {
  var command = `cd ${dist} && npm install `;
  exec(command, function(error, stdout, stderr) {
    // command output is in stdout
    if (stderr) {
      spinner.stop()
      console.log(stderr);
      console.log(chalk.green(`Project ${process.argv[3]} is created:
               cd ${process.argv[3]}
               npm start
      `));
      return
    }
    spinner.stop()
    console.log(chalk.green(`Project ${process.argv[3]} is created:
             cd ${process.argv[3]}
             npm start
    `));
    });

}
