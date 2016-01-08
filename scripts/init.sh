#!/bin/bash
rm -rf node_modules
npm install
rm -rf bower_components
./node_modules/.bin/bower install
