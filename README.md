google-search
=============

google search api app with Grunt, node, angular and node-webkit

Project structure

Frontend

The frontend is build with Grunt
npm install -g grunt-cli

The modules will be install fron package.json
npm install

To build the project and dump the output in /dist and /build folders, run node
node server

For development, use grunt to build and test
grunt watch

To build an app that runs on window, linux and mac, node-webkit will be used.
The output will be in /build/release/app.
The manifest will be in src/package.json for options
