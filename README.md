# Electronic Kit Start  ---Work only on linux :) ☺️ Other platform coming soon ---

Create electron apps with no build configuration.

Create electron App works on macOS, Windows, and Linux.<br>

## Quick Overview

```sh
npm install -g electronic-kit-start

electronic-kit-start start my-app <--tamplate>
cd my-app/
npm start
```

### Get Started Immediately

You **don’t** need to install or configure tools like Webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g electronic-kit-start
```

**You’ll need to have Node >= 4 on your machine**.

**We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage.** You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for Create Electron App itself.

### Creating an App

To create a new app, run:

```sh
electronic-kit-start start my-app --simple
cd my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  app.js
  bower.json
  app/
    icon/
      icon.png
    www/
      css/
      js/
      index.html
    app.js
    package.json
  tests/
    test.js
```

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can run some commands inside the project folder:

<<<<<<< HEAD
 `npm start`

## Exemple template:
    --simple
    --react
    --angular2
    --vuejs

## Exemple command package:  
      electronic-kit-start --platform-win     // Build for platform-win
      electronic-kit-start --platform-linux   // build for platform-linux
      electronic-kit-start --platform-mac     // build for platform-mac
=======
### `npm start`
>>>>>>> a32bdc330147720ae85abd6d03f1c75888c26a8b


You can also use module bundlers like [webpack](http://webpack.github.io) and [Browserify](http://browserify.org/) directly.<br>
