#!/usr/bin/env bash

if [ "$#" -eq 0 ]; then
    echo "Usage: build.sh <version>"
    exit
fi

set -ex

npm install mapbox.js@$1

pushd node_modules/mapbox.js/
make
popd

rsync -av --delete \
      --exclude node_modules/ --exclude bower.json --exclude build.sh \
      --exclude package.json --exclude .git --exclude .gitignore \
      --exclude README.md \
      node_modules/mapbox.js/dist/ .

git add -A .
git commit -a -m "Build mapbox.js $1"
git tag $1
