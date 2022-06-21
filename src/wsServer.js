const WebSocketServer = require('ws');
const {sendRequest} = require('./functions/sendRequest');
 

const wss = new WebSocketServer.Server({ port: 8080 })

wss.on("connection", ws => {
    console.log("new client connected");

    ws.on("message", data => {
        sendRequest(data);
    });
    ws.on("close", () => {
        console.log("the client has connected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");