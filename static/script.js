const ws = new WebSocket("ws://localhost:8080");
const status = document.getElementById("status")
const takeoff = document.getElementById('takeoff');
const connect = document.getElementById('connect');
const land = document.getElementById('land');
var sensitivity = document.getElementById('sensitivity').value;

const forward = document.getElementById('forward');
const back = document.getElementById('back');
const left = document.getElementById('left');
const right = document.getElementById('right');

const up = document.getElementById('up');
const down = document.getElementById('down');

ws.addEventListener("open", () => {
    console.log("connected");
    status.innerHTML = "connected";
});

ws.addEventListener("close", () => {
    console.log("connected");
    status.innerHTML = "disconnected";

    setTimeout(function(){
        window.location.reload(1);
     }, 1000);
});

ws.addEventListener('message', function (event) {
    console.log(event.data);
});




land.addEventListener('click', function () {
    ws.send('land');
});

takeoff.addEventListener('click', function () {
    ws.send('takeoff');
});

connect.addEventListener('click', function () {
    ws.send('command');
});


up.addEventListener('click', function () {
    ws.send(`up ${sensitivity}`);
});

down.addEventListener('click', function () {
    ws.send(`down ${sensitivity}`);
});

forward.addEventListener('click', function () {
    ws.send(`forward ${sensitivity}`);
});

back.addEventListener('click', function () {
    ws.send(`back ${sensitivity}`);
});

left.addEventListener('click', function () {
    ws.send(`left ${sensitivity}`);
});

right.addEventListener('click', function () {
    ws.send(`right ${sensitivity}`);
});