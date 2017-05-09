const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', function(){

window.document.getElementById('data').innerHTML = 'Sending message to Electron...';
  ipcRenderer.send('message-from-ui', 'Hello electron !');

  ipcRenderer.on('message-from-electron', (event, data) => {

    window.document.getElementById('data').innerHTML = `Electron says : ${data}`;

    window.setTimeout(() => {
      window.document.getElementById('data').innerHTML = 'Sending message to Electron...';
      if (event.sender) {
        try {
          event.sender.send('message-from-ui', 'Hello Electron !');
        } catch(e) {
          // Electron base seems to be gone.
          // Is that even possible ?
        };
      }
    }, 1000);
  });

});

