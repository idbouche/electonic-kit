'use strict'

const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const ora = require('ora');
const path = require('path');

const spinner = new ora({
	text: 'installing all dependencies',
	spinner: 'pong'
});

var workingDir = process.cwd()
var pathNode

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

if (process.platform == "linux") {
	pathNode = "/usr/lib/node_modules/electronic-kit-start"
} else if (process.platform == "win32"){
	console.log("this os is not supported coming soon");
} else if (process.platform == "darwin"){
	pathNode = "/usr/local/lib/node_modules/electronic-kit-start"
} else{
	console.log("this os is not supported");
}


if (process.argv.length === 3) {

  switch (process.argv[2]) {
    case '--platform-win':
      require('./platforms/win')
      break;
    case '--platform-linux':
			require('./platforms/linux')
      break;
    case '--platform-mac':
      require('./platforms/mac')
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
}else if(process.argv[2] == 'start' && process.argv[3] != '' ){
  var destination = workingDir+'/'+process.argv[3]
  var source = pathNode + '/template_simple'
  switch (process.argv[4]) {
    case '--simple':
      createProject(source, destination)
      break
    case '--react':
      let sourcer = pathNode + '/template_react'
      createProject(sourcer, destination)
      break
		case '--angular2':
      let sourcea = pathNode + '/template_angular2'
      createProject(sourcea, destination)
      break
		case '--vuejs':
      let sourcev = pathNode + '/template_vuejs'
      createProject(sourcev, destination)
      break
    default:
			let sources = pathNode + '/template_start'
      createProject(sourcs, destination)

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
      	spinner.text = 'installing dependencies ...';
     }, 3000);
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
