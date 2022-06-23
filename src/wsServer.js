const WebSocketServer = require('ws');
const {sendRequest} = require('./functions/sendRequest');
const datagram = require("dgram");
const wss = new WebSocketServer.Server({ port: 8080 })

wss.on("connection", ws => {
    console.log("new client connected");

    ws.on("message", data => {
        sendRequest(data);
        if (data == "streamon") {
            const socket = datagram.createSocket("udp4");
            socket.bind(11111);
            socket.on("message",(msg) => {
                let buffer = new Buffer(msg, "base64");
                let text = buffer.toString("ascii");
                ws.send(text);
                console.log(text);
            });

        }
        if (data == "streamoff") {
            //check is socket is bound
            if (socket) {
                socket.close();
            }


        }

        
    });
    ws.on("close", () => {
        console.log("the client has connected");
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");