const http = require('http');
const WebSocket = require('ws');
const spawn = require('child_process').spawn;
const dgram = require('dgram');
const STREAM_PORT = 3001;
const TELLO_IP = '192.168.10.1';
const TELLO_PORT = 8889;

const streamServer = http.createServer(function(request, response) {
    console.log(`Stream on ${STREAM_PORT} from: ${request.socket.remoteAddress}:${request.socket.remotePort}`);
    request.on('data', function(data) {
      webSocketServer.broadcast(data);
    });
  
}).listen(STREAM_PORT);

const webSocketServer = new WebSocket.Server({
    server: streamServer
});
  
webSocketServer.broadcast = function(data) {
    webSocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
};

const drone = dgram.createSocket('udp4');

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

drone.send('command', 0, 7, TELLO_PORT, TELLO_IP, handleError);
drone.send('streamon', 0, 8, TELLO_PORT, TELLO_IP, handleError);

setTimeout(function() {
    var args = [
      "-i", "udp://0.0.0.0:11111",
      "-r", "30",
      "-s", "960x720",
      "-codec:v", "mpeg1video",
      "-b", "800k",
      "-f", "mpegts",
      "http://127.0.0.1:3001/stream"
    ];
  
    var streamer = spawn('ffmpeg', args);
    streamer.on("exit", function(code){
        console.log("Failure", code);
    });
}, 3000);