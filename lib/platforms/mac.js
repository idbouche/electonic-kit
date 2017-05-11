const exec = require('child_process').exec

let workingDir = process.cwd()
let myString = workingDir
let splits = myString.split('/')
const Ora = require('ora')

const spinner = new Ora({
    text: 'packaging for mac ...',
    spinner: 'line',
    color: 'green',
})
spinner.start()

let nameOfApp = splits[splits.length - 1]

let cmd = `./node_modules/electron-packager/cli.js . ${nameOfApp} --platform=darwin --arch=x64 --overwrite --prune=true --out=${workingDir}/dist --asar`
exec(cmd, (err, stdout, stderr) => {
    console.log(stdout)
    console.log(err)
    console.log(stderr)

    spinner.stop()
    console.log(`Succes package app on /dist/${nameOfApp}-darwin-x64:
    cd dist
    cd ${nameOfApp}-darwin-x64
    ./${nameOfApp}
  `)
})