# Nodejs websocket server robomaster tt


## How to install
First of all:
You need to install Nodejs 
After doing that go to the repo directory and run:
``npm install``
``npm start``

## How to use
Connect with the drone via WiFi
Go to the static folder and open ``index.html``
After that run:
``npm start``

Now you can control the drone via the webrowser
DONT FORGET TO PRESS `connect` first.

## How does it work?
After reading the official SDK i started to make a simple UDP client (src/functions/sendRequest.js)

Then i made a Websocket server (src/wsServer.js)
All the requests made to the websocket server will be send in plain text to the udp client.

This is not the most elegant way to do it, But it is a proof of concept non the less.

I may add add camera stream in the future but don't quote me on that.

[Link to 'SDK'](https://github.com/MauriceNorden/nodejs-robomaster-tt/blob/main/Tello_SDK_3.0_User_Guide_en.pdf)
	
