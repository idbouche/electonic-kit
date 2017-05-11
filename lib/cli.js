'use strict'

const exec = require('child_process').exec
const chalk = require('chalk')
const ncp = require('ncp').ncp
const Ora = require('ora')

const Spinner = new Ora({
    text: 'installing all dependencies',
    spinner: 'pong',
})

let workingDir = process.cwd()
let pathNode

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

if (process.platform === 'linux') {
    pathNode = '/usr/lib/node_modules/electronic-kit-start'
} else if (process.platform === 'win32') {
    pathNode = 'AppData/Roaming/npm/node_modules/electronic-kit-start'
} else if (process.platform === 'darwin') {
    pathNode = '/usr/local/lib/node_modules/electronic-kit-start'
} else {
    console.log('this os is not supported')
}
// if exist argv
if (process.argv.length === 3) {
    switch (process.argv[2]) {
        case '--platform-win':
            require('./platforms/win')
            break
        case '--platform-linux':
            require('./platforms/linux')
            break
        case '--platform-mac':
            require('./platforms/mac')
            break
        default:
            console.log(chalk.red(`Your platform is not supported now`))
    }
} else if (process.argv[2] === 'start' && process.argv[3] !== '') {
    let destination = workingDir + '/' + process.argv[3]
    let sources = pathNode + '/template_start'
    switch (process.argv[4]) {
        case '--simple':
            let source = pathNode + '/template_start'
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
        case '--begin':
            createProject(sources, destination)
            break
        default:
            createProject(sources, destination)

    }
} else {
    console.log(chalk.red(`Name for app is required
    Exemple commond:
          electronic-kit-start -g myApp         // Creat your project
          electronic-kit-start --platform-win   // Build for platform-win
          electronic-kit-start --platform-linux // build for platform-linux
          electronic-kit-start --platform-mac   // build for platform-mac
  `))
}

/**
 * Creat project on template spcifice.
 * @param {string} sourcPath Url sourc.
 * @param {string} distPath Url dist path.
 */

function createProject(sourcPath, distPath) {
    let cmd = `cd ${workingDir} && mkdir ${process.argv[3]} `
    exec(cmd, function(error, stdout, stderr) {
        // command output is in stdout
        if (stderr) {
            console.log(stderr)
            return
        }
        ncp(sourcPath, distPath, function(err) {
            if (err) {
                return console.error(err)
            }
            console.log(chalk.green(`Project ${process.argv[3]} 
            created in progres ...`))
            Spinner.start()
            setTimeout(() => {
                Spinner.color = 'green'
                Spinner.text = 'installing dependencies ...'
            }, 3000)
            installDep(distPath)
        })
    })
}
/**
 * Install dependence npm js.
 * @param  {string} dist Url path distination
 */

function installDep(dist) {
    let command = `cd ${dist} && npm install `
    exec(command, function(error, stdout, stderr) {
        // command output is in stdout
        if (stderr) {
            Spinner.stop()
            console.log(stderr)
            console.log(chalk.green(`Project ${process.argv[3]} is created:
         cd ${process.argv[3]}
         npm start
      `))
            return
        }
        Spinner.stop()
        console.log(chalk.green(`Project ${process.argv[3]} is created:
             cd ${process.argv[3]}
            npm start
     `))
    })
}