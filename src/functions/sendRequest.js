var buffer = require('buffer');
var udp = require('dgram');

var client = udp.createSocket('udp4');
client.on('message', function (msg, info) {
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});


const sendRequest = (data) => {
  var data1 = Buffer.from(data);
  console.log(data);
  client.send(data1, 8889, '192.168.10.1', function (error) {
    if (error) {
      client.close();
    } else {
      console.log(data);
    }
  });
}

exports.sendRequest = sendRequest;