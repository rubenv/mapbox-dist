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

cp node_modules/mapbox.js/LICENSE.md .

cat > package.json << EOF
{
  "name": "mapbox-dist",
  "version": "$1",
  "description": "Compiled version of Mapbox.js.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT"
}
EOF

cat > bower.json << EOF
{
  "name": "mapbox-dist",
  "version": "$1",
  "authors": [
    "Ruben Vermeersch <ruben@rocketeer.be>"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "build.sh",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}
EOF

git add -A .
git commit -a -m "Build mapbox.js v$1"
git tag v$1
