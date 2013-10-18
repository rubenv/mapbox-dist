#!/usr/bin/env bash

pushd node_modules/mapbox.js/
make
popd

rsync -av --delete \
      --exclude node_modules/ --exclude bower.json --exclude build.sh \
      --exclude package.json --exclude .git --exclude .gitignore \
      node_modules/mapbox.js/dist/ .
