const { readFileSync } = require('fs');

const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.shell((err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Stream :: close');
      conn.end();
    }).on('data', (data) => {
      console.log('OUTPUT: ' + data);
    });
    stream.end('ls -l\nexit\n');
  });
}).connect({
  host: '192.168.100.100',
  port: 22,
  username: 'frylock',
  privateKey: readFileSync('/path/to/my/key')
});

module.exports = conn