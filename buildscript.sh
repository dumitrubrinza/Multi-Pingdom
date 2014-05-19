#!/bin/bash
echo 'Running build command from development'
cd client/development
sencha app build testing
cd ..
echo 'Deleting contents of default...'
rm -rf default/*
cd default
echo 'Copying testing build into client/default...'
cp -R ../development/build/testing/FHSencha/* .
echo 'Done...'