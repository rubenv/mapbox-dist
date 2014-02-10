;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
module.exports={
  "author": {
    "name": "MapBox"
  },
  "name": "mapbox.js",
  "description": "mapbox javascript api",
  "version": "1.4.0",
  "homepage": "http://mapbox.com/",
  "repository": {
    "type": "git",
    "url": "git://github.com/mapbox/mapbox.js.git"
  },
  "main": "index.js",
  "dependencies": {
    "leaflet": "0.6.4",
    "mustache": "~0.7.2",
    "corslite": "0.0.5",
    "json3": "git://github.com/bestiejs/json3.git#v3.2.5a",
    "sanitize-caja": "0.0.0"
  },
  "scripts": {
    "test": "mocha-phantomjs test/index.html"
  },
  "devDependencies": {
    "leaflet-hash": "git://github.com/mlevans/leaflet-hash.git#b039a3aa4e2492a5c7448075172ac26769e601d6",
    "leaflet-fullscreen": "0.0.0",
    "uglify-js": "~2.2.5",
    "mocha": "~1.9",
    "expect.js": "~0.2.0",
    "sinon": "~1.7.3",
    "mocha-phantomjs": "~1.1.1",
    "happen": "~0.1.3",
    "browserify": "~2.22.0"
  },
  "optionalDependencies": {},
  "engines": {
    "node": "*"
  },
  "readme": "# mapbox.js\n\n[![Build Status](https://travis-ci.org/mapbox/mapbox.js.png?branch=v1)](https://travis-ci.org/mapbox/mapbox.js)\n\nThis is the MapBox Javascript API, version 1.x. It's built as a [Leaflet](http://leafletjs.com/)\nplugin. You can [read about its launch](http://mapbox.com/blog/mapbox-js-with-leaflet/).\n\n## [API](http://mapbox.com/mapbox.js/api/)\n\nManaged as Markdown in `API.md`, following the standards in `DOCUMENTING.md`\n\n## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)\n\n## Usage with Browserify\n\nInstall the mapbox.js module and add it to `dependencies` in package.json:\n\n```sh\nnpm install mapbox.js --save\n```\n\nRequire mapbox in your script:\n\n```js\n// main.js\n\nrequire('mapbox.js'); // <-- auto-attaches to window.L\n```\n\nBrowserify it:\n\n```sh\nbrowserify main.js -o bundle.js\n```\n\n## Building\n\nRequires [node.js](http://nodejs.org/) installed on your system.\n\n``` sh\ngit clone https://github.com/mapbox/mapbox.js.git\ncd mapbox.js\nnpm install\nmake\n```\n\nThis project uses [browserify](https://github.com/substack/node-browserify) to combine\ndependencies and installs a local copy when you run `npm install`.\n`make` will build the project in `dist/`.\n\n### Tests\n\nTest with [phantomjs](http://phantomjs.org/):\n\n``` sh\nnpm test\n```\n\nTo test in a browser, run a [local development server](https://gist.github.com/tmcw/4989751)\nand go to `/test`.\n\n### Version v0.x.x\n\n[Version v0.x.x can be accessed in the old master branch.](https://github.com/mapbox/mapbox.js/tree/master).\n",
  "readmeFilename": "README.md",
  "bugs": {
    "url": "https://github.com/mapbox/mapbox.js/issues"
  },
  "_id": "mapbox.js@1.4.0",
  "dist": {
    "shasum": "30831749a1ef9988242325b6facef0a02ef9fa52"
  },
  "_from": "mapbox.js@1.4.0",
  "_resolved": "https://registry.npmjs.org/mapbox.js/-/mapbox.js-1.4.0.tgz"
}

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {

    HTTP_URLS: [
        'http://a.tiles.mapbox.com/v3/',
        'http://b.tiles.mapbox.com/v3/',
        'http://c.tiles.mapbox.com/v3/',
        'http://d.tiles.mapbox.com/v3/'],

    FORCE_HTTPS: false,

    HTTPS_URLS: [
        'https://a.tiles.mapbox.com/v3/',
        'https://b.tiles.mapbox.com/v3/',
        'https://c.tiles.mapbox.com/v3/',
        'https://d.tiles.mapbox.com/v3/']
};

},{}],3:[function(require,module,exports){
// Hardcode image path, because Leaflet's autodetection
// fails, because mapbox.js is not named leaflet.js
window.L.Icon.Default.imagePath = '//api.tiles.mapbox.com/mapbox.js/' + 'v' +
    require('./package.json').version + '/images';

L.mapbox = module.exports = {
    VERSION: require('./package.json').version,
    geocoder: require('./src/geocoder'),
    marker: require('./src/marker'),
    tileLayer: require('./src/tile_layer'),
    shareControl: require('./src/share_control'),
    legendControl: require('./src/legend_control'),
    geocoderControl: require('./src/geocoder_control'),
    gridControl: require('./src/grid_control'),
    gridLayer: require('./src/grid_layer'),
    markerLayer: require('./src/marker_layer'),
    map: require('./src/map'),
    config: require('./src/config'),
    sanitize: require('sanitize-caja'),
    template: require('mustache').to_html
};

},{"./package.json":1,"./src/config":2,"./src/geocoder":4,"./src/geocoder_control":9,"./src/grid_control":10,"./src/grid_layer":11,"./src/legend_control":8,"./src/map":13,"./src/marker":5,"./src/marker_layer":12,"./src/share_control":7,"./src/tile_layer":6,"mustache":15,"sanitize-caja":14}],15:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  function Context(view, parent) {
    this.view = view == null ? {} : view;
    this.parent = parent;
    this._cache = { '.': this.view };
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value;
    if (name in this._cache) {
      value = this._cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this._cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = mustache.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.getPartial = function (name) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    return this._partialCache[name];
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var self = this;
    return function (view, partials) {
      if (partials) {
        if (isFunction(partials)) {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return renderTokens(tokens, self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  /**
   * Low-level function that renders the given `tokens` using the given `writer`
   * and `context`. The `template` string is only needed for templates that use
   * higher-order sections to extract the portion of the original template that
   * was contained in that section.
   */
  function renderTokens(tokens, writer, context, template) {
    var buffer = '';

    // This function is used to render an artbitrary template
    // in the current context by higher-order functions.
    function subRender(template) {
      return writer.render(template, context);
    }

    var token, tokenValue, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      tokenValue = token[1];

      switch (token[0]) {
      case '#':
        value = context.lookup(tokenValue);

        if (typeof value === 'object' || typeof value === 'string') {
          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            }
          } else if (value) {
            buffer += renderTokens(token[4], writer, context.push(value), template);
          }
        } else if (isFunction(value)) {
          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, subRender);
          if (value != null) buffer += value;
        } else if (value) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '^':
        value = context.lookup(tokenValue);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '>':
        value = writer.getPartial(tokenValue);
        if (isFunction(value)) buffer += value(context);
        break;
      case '&':
        value = context.lookup(tokenValue);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(tokenValue);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += tokenValue;
        break;
      }
    }

    return buffer;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];

    var token;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      switch (token[0]) {
      case '#':
      case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;
      case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;
      default:
        collector.push(token);
      }
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          lastToken = token;
          squashedTokens.push(token);
        }
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  function parseTemplate(template, tags) {
    template = template || '';
    tags = tags || mustache.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) throw new Error('Invalid tags: ' + tags.join(', '));

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr == '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();
        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);
        if (tags.length !== 2) {
          throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        }
        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  mustache.name = "mustache.js";
  mustache.version = "0.7.3";
  mustache.tags = ["{{", "}}"];

  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  mustache.parse = parseTemplate;

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // All Mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  mustache.compile = function (template, tags) {
    return defaultWriter.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  mustache.compilePartial = function (name, template, tags) {
    return defaultWriter.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  mustache.compileTokens = function (tokens, template) {
    return defaultWriter.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

}));

},{}],4:[function(require,module,exports){
'use strict';

var util = require('./util'),
    urlhelper = require('./url'),
    request = require('./request');

// Low-level geocoding interface - wraps specific API calls and their
// return values.
module.exports = function(_) {
    var geocoder = {}, url;

    geocoder.getURL = function(_) {
        return url;
    };

    geocoder.setURL = function(_) {
        url = urlhelper.jsonify(_);
        return geocoder;
    };

    geocoder.setID = function(_) {
        util.strict(_, 'string');
        geocoder.setURL(urlhelper.base() + _ + '/geocode/{query}.json');
        return geocoder;
    };

    geocoder.setTileJSON = function(_) {
        util.strict(_, 'object');
        geocoder.setURL(_.geocoder);
        return geocoder;
    };

    geocoder.queryURL = function(_) {
        util.strict(_, 'string');
        if (!geocoder.getURL()) throw new Error('Geocoding map ID not set');
        return L.Util.template(geocoder.getURL(), { query: encodeURIComponent(_) });
    };

    geocoder.query = function(_, callback) {
        util.strict(_, 'string');
        util.strict(callback, 'function');
        request(geocoder.queryURL(_), function(err, json) {
            if (json && json.results && json.results.length) {
                var res = {
                    results: json.results,
                    latlng: [json.results[0][0].lat, json.results[0][0].lon]
                };
                if (json.results[0][0].bounds !== undefined) {
                    res.bounds = json.results[0][0].bounds;
                    res.lbounds = util.lbounds(res.bounds);
                }
                callback(null, res);
            } else callback(err || true);
        });

        return geocoder;
    };

    // a reverse geocode:
    //
    //  geocoder.reverseQuery([80, 20])
    geocoder.reverseQuery = function(_, callback) {
        var q = '';

        function norm(x) {
            if (x.lat !== undefined && x.lng !== undefined) return x.lng + ',' + x.lat;
            else if (x.lat !== undefined && x.lon !== undefined) return x.lon + ',' + x.lat;
            else return x[0] + ',' + x[1];
        }

        if (_.length && _[0].length) {
            for (var i = 0, pts = []; i < _.length; i++) pts.push(norm(_[i]));
            q = pts.join(';');
        } else q = norm(_);

        request(geocoder.queryURL(q), function(err, json) {
            callback(err, json);
        });

        return geocoder;
    };

    if (typeof _ === 'string') {
        if (_.indexOf('/') == -1) geocoder.setID(_);
        else geocoder.setURL(_);
    }
    else if (typeof _ === 'object') geocoder.setTileJSON(_);

    return geocoder;
};

},{"./request":18,"./url":17,"./util":16}],6:[function(require,module,exports){
'use strict';

var util = require('./util'),
    url = require('./url');

var TileLayer = L.TileLayer.extend({
    includes: [require('./load_tilejson')],

    options: {
        format: 'png'
    },

    // http://mapbox.com/developers/api/#image_quality
    formats: [
        'png',
        // PNG
        'png32', 'png64', 'png128', 'png256',
        // JPG
        'jpg70', 'jpg80', 'jpg90'],

    scalePrefix: '@2x.',

    initialize: function(_, options) {
        L.TileLayer.prototype.initialize.call(this, undefined, options);

        this._tilejson = {};

        if (options && options.detectRetina &&
            L.Browser.retina && options.retinaVersion) {
            _ = options.retinaVersion;
        }

        if (options && options.format) {
            util.strict_oneof(options.format, this.formats);
        }

        this._loadTileJSON(_);
    },

    setFormat: function(_) {
        util.strict(_, 'string');
        this.options.format = _;
        this.redraw();
        return this;
    },

    _autoScale: function() {
        return this.options &&
            L.Browser.retina &&
            this.options.detectRetina &&
            (!this.options.retinaVersion) &&
            this.options.autoscale;
    },

    // disable the setUrl function, which is not available on mapbox tilelayers
    setUrl: null,

    _setTileJSON: function(json) {
        util.strict(json, 'object');

        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            autoscale: json.autoscale || false,
            tms: json.scheme === 'tms',
            bounds: json.bounds && util.lbounds(json.bounds)
        });

        this._tilejson = json;
        this.redraw();
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    // this is an exception to mapbox.js naming rules because it's called
    // by `L.map`
    getTileUrl: function(tilePoint) {
        var tiles = this.options.tiles,
            index = Math.floor(Math.abs(tilePoint.x + tilePoint.y) % tiles.length),
            url = tiles[index];

        var templated = L.Util.template(url, tilePoint);
        if (!templated) {
            return templated;
        } else {
            return templated.replace('.png',
                (this._autoScale() ? this.scalePrefix : '.') + this.options.format);
        }
    },

    // TileJSON.TileLayers are added to the map immediately, so that they get
    // the desired z-index, but do not update until the TileJSON has been loaded.
    _update: function() {
        if (this.options.tiles) {
            L.TileLayer.prototype._update.call(this);
        }
    }
});

module.exports = function(_, options) {
    return new TileLayer(_, options);
};

},{"./load_tilejson":19,"./url":17,"./util":16}],7:[function(require,module,exports){
'use strict';

var ShareControl = L.Control.extend({
    includes: [require('./load_tilejson')],

    options: {
        position: 'topleft',
        url: ''
    },

    initialize: function(_, options) {
        L.setOptions(this, options);
        this._loadTileJSON(_);
    },

    _setTileJSON: function(json) {
        this._tilejson = json;
    },

    onAdd: function(map) {
        this._map = map;

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-share leaflet-bar');
        var link = L.DomUtil.create('a', 'mapbox-share mapbox-icon mapbox-icon-share', container);
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._shareClick, this);
        L.DomEvent.disableClickPropagation(container);

        this._map.on('mousedown', this._clickOut, this);

        return container;
    },

    _clickOut: function(e) {
        if (this._popup) {
            this._map.removeLayer(this._popup);
            this._popup = null;
            return;
        }
    },

    _shareClick: function(e) {
        L.DomEvent.stop(e);

        if (this._popup) return this._clickOut(e);

        var tilejson = this._tilejson || this._map._tilejson || {},
            twitter = 'http://twitter.com/intent/tweet?status=' +
                encodeURIComponent(tilejson.name + '\n' + (tilejson.webpage || window.location)),
            facebook = 'https://www.facebook.com/sharer.php?u=' +
                encodeURIComponent(this.options.url || tilejson.webpage || window.location) +
                '&t=' + encodeURIComponent(tilejson.name),
            share =
                "<a class='leaflet-popup-close-button' href='#close'>×</a>" +
                ("<h3>Share this map</h3>" +
                    "<div class='mapbox-share-buttons'><a class='mapbox-share-facebook mapbox-icon mapbox-icon-facebook' target='_blank' href='{{facebook}}'>Facebook</a>" +
                    "<a class='mapbox-share-twitter mapbox-icon mapbox-icon-twitter' target='_blank' href='{{twitter}}'>Twitter</a></div>")
                    .replace('{{twitter}}', twitter)
                    .replace('{{facebook}}', facebook) +
                ("<h3>Get the embed code</h3>" +
                "<small>Copy and paste this HTML into your website or blog.</small>") +
                "<textarea rows=4>{{value}}</textarea>"
                    .replace('{{value}}', ("&lt;iframe width='500' height='300' frameBorder='0' src='{{embed}}'&gt;&lt;/iframe&gt;"
                        .replace('{{embed}}', tilejson.embed || window.location)));

        this._popup = L.marker(this._map.getCenter(), {
            zIndexOffset: 10000,
            icon: L.divIcon({
                className: 'mapbox-share-popup',
                iconSize: L.point(360, 240),
                iconAnchor: L.point(180, 120),
                html: share
            })
        })
        .on('mousedown', function(e) {
            L.DomEvent.stopPropagation(e.originalEvent);
        })
        .on('click', clickPopup, this).addTo(this._map);

        function clickPopup(e) {
            if (e.originalEvent && e.originalEvent.target.nodeName === 'TEXTAREA') {
                var target = e.originalEvent.target;
                target.focus();
                target.select();
            } else if (e.originalEvent && e.originalEvent.target.getAttribute('href') === '#close') {
                this._clickOut(e);
            }
            L.DomEvent.stop(e.originalEvent);
        }
    }
});

module.exports = function(_, options) {
    return new ShareControl(_, options);
};

},{"./load_tilejson":19}],9:[function(require,module,exports){
'use strict';

var geocoder = require('./geocoder');

var GeocoderControl = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'topleft',
        keepOpen: false
    },

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        this.geocoder = geocoder(_);
    },

    setURL: function(_) {
        this.geocoder.setURL(_);
        return this;
    },

    getURL: function() {
        return this.geocoder.getURL();
    },

    setID: function(_) {
        this.geocoder.setID(_);
        return this;
    },

    setTileJSON: function(_) {
        this.geocoder.setTileJSON(_);
        return this;
    },

    _toggle: function(e) {
        if (e) L.DomEvent.stop(e);
        if (L.DomUtil.hasClass(this._container, 'active')) {
            L.DomUtil.removeClass(this._container, 'active');
            this._results.innerHTML = '';
            this._input.blur();
        } else {
            L.DomUtil.addClass(this._container, 'active');
            this._input.focus();
            this._input.select();
        }
    },

    _closeIfOpen: function(e) {
        if (L.DomUtil.hasClass(this._container, 'active') &&
            !this.options.keepOpen) {
            L.DomUtil.removeClass(this._container, 'active');
            this._results.innerHTML = '';
            this._input.blur();
        }
    },

    onAdd: function(map) {

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-control-mapbox-geocoder-toggle mapbox-icon mapbox-icon-geocoder', container),
            results = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-results', container),
            wrap = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-wrap', container),
            form = L.DomUtil.create('form', 'leaflet-control-mapbox-geocoder-form', wrap),
            input  = L.DomUtil.create('input', '', form);

        link.href = '#';
        link.innerHTML = '&nbsp;';

        input.type = 'text';
        input.setAttribute('placeholder', 'Search');

        L.DomEvent.addListener(form, 'submit', this._geocode, this);
        L.DomEvent.disableClickPropagation(container);

        this._map = map;
        this._results = results;
        this._input = input;
        this._form = form;

        if (this.options.keepOpen) {
            L.DomUtil.addClass(container, 'active');
        } else {
            this._map.on('click', this._closeIfOpen, this);
            L.DomEvent.addListener(link, 'click', this._toggle, this);
        }

        return container;
    },

    _geocode: function(e) {
        L.DomEvent.preventDefault(e);
        L.DomUtil.addClass(this._container, 'searching');

        var map = this._map;
        var onload = L.bind(function(err, resp) {
            L.DomUtil.removeClass(this._container, 'searching');
            if (err || !resp || !resp.results || !resp.results.length) {
                this.fire('error', {error: err});
            } else {
                this._results.innerHTML = '';
                if (resp.results.length === 1 && resp.lbounds) {
                    this._map.fitBounds(resp.lbounds);
                    this._closeIfOpen();
                } else {
                    for (var i = 0, l = Math.min(resp.results.length, 5); i < l; i++) {
                        var name = [];
                        for (var j = 0; j < resp.results[i].length; j++) {
                            if (resp.results[i][j].name) name.push(resp.results[i][j].name);
                        }
                        if (!name.length) continue;

                        var r = L.DomUtil.create('a', '', this._results);
                        r.innerHTML = name.join(', ');
                        r.href = '#';

                        (function(result) {
                            L.DomEvent.addListener(r, 'click', function(e) {
                                var _ = result[0].bounds;
                                map.fitBounds(L.latLngBounds([[_[1], _[0]], [_[3], _[2]]]));
                                L.DomEvent.stop(e);
                            });
                        })(resp.results[i]);
                    }
                    if (resp.results.length > 5) {
                        var outof = L.DomUtil.create('span', '', this._results);
                        outof.innerHTML = 'Top 5 of ' + resp.results.length + '  results';
                    }
                }
                this.fire('found', resp);
            }
        }, this);

        this.geocoder.query(this._input.value, onload);
    }
});

module.exports = function(_, options) {
    return new GeocoderControl(_, options);
};

},{"./geocoder":4}],11:[function(require,module,exports){
'use strict';

var util = require('./util'),
    url = require('./url'),
    request = require('./request'),
    grid = require('./grid');

// forked from danzel/L.UTFGrid
var GridLayer = L.Class.extend({
    includes: [L.Mixin.Events, require('./load_tilejson')],

    options: {
        template: function() { return ''; }
    },

    _mouseOn: null,
    _tilejson: {},
    _cache: {},

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        this._loadTileJSON(_);
    },

    _setTileJSON: function(json) {
        util.strict(json, 'object');

        L.extend(this.options, {
            grids: json.grids,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            bounds: json.bounds && util.lbounds(json.bounds)
        });

        this._tilejson = json;
        this._cache = {};
        this._update();

        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    active: function() {
        return !!(this._map && this.options.grids && this.options.grids.length);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    onAdd: function(map) {
        this._map = map;
        this._update();

        this._map
            .on('click', this._click, this)
            .on('mousemove', this._move, this)
            .on('moveend', this._update, this);
    },

    onRemove: function() {
        this._map
            .off('click', this._click, this)
            .off('mousemove', this._move, this)
            .off('moveend', this._update, this);
    },

    getData: function(latlng, callback) {
        if (!this.active()) return;

        var map = this._map,
            point = map.project(latlng.wrap()),
            tileSize = 256,
            resolution = 4,
            x = Math.floor(point.x / tileSize),
            y = Math.floor(point.y / tileSize),
            max = map.options.crs.scale(map.getZoom()) / tileSize;

        x = (x + max) % max;
        y = (y + max) % max;

        this._getTile(map.getZoom(), x, y, function(grid) {
            var gridX = Math.floor((point.x - (x * tileSize)) / resolution),
                gridY = Math.floor((point.y - (y * tileSize)) / resolution);

            callback(grid(gridX, gridY));
        });

        return this;
    },

    _click: function(e) {
        this.getData(e.latlng, L.bind(function(data) {
            this.fire('click', {
                latLng: e.latlng,
                data: data
            });
        }, this));
    },

    _move: function(e) {
        this.getData(e.latlng, L.bind(function(data) {
            if (data !== this._mouseOn) {
                if (this._mouseOn) {
                    this.fire('mouseout', {
                        latLng: e.latlng,
                        data: this._mouseOn
                    });
                }

                this.fire('mouseover', {
                    latLng: e.latlng,
                    data: data
                });

                this._mouseOn = data;
            } else {
                this.fire('mousemove', {
                    latLng: e.latlng,
                    data: data
                });
            }
        }, this));
    },

    _getTileURL: function(tilePoint) {
        var urls = this.options.grids,
            index = (tilePoint.x + tilePoint.y) % urls.length,
            url = urls[index];

        return L.Util.template(url, tilePoint);
    },

    // Load up all required json grid files
    _update: function() {
        if (!this.active()) return;

        var bounds = this._map.getPixelBounds(),
            z = this._map.getZoom(),
            tileSize = 256;

        if (z > this.options.maxZoom || z < this.options.minZoom) return;

        var nwTilePoint = new L.Point(
                Math.floor(bounds.min.x / tileSize),
                Math.floor(bounds.min.y / tileSize)),
            seTilePoint = new L.Point(
                Math.floor(bounds.max.x / tileSize),
                Math.floor(bounds.max.y / tileSize)),
            max = this._map.options.crs.scale(z) / tileSize;

        for (var x = nwTilePoint.x; x <= seTilePoint.x; x++) {
            for (var y = nwTilePoint.y; y <= seTilePoint.y; y++) {
                // x wrapped
                var xw = (x + max) % max, yw = (y + max) % max;
                this._getTile(z, xw, yw);
            }
        }
    },

    _getTile: function(z, x, y, callback) {
        var key = z + '_' + x + '_' + y,
            tilePoint = L.point(x, y);

        tilePoint.z = z;

        if (!this._tileShouldBeLoaded(tilePoint)) {
            return;
        }

        if (key in this._cache) {
            if (!callback) return;

            if (typeof this._cache[key] === 'function') {
                callback(this._cache[key]); // Already loaded
            } else {
                this._cache[key].push(callback); // Pending
            }

            return;
        }

        this._cache[key] = [];

        if (callback) {
            this._cache[key].push(callback);
        }

        request(this._getTileURL(tilePoint), L.bind(function(err, json) {
            var callbacks = this._cache[key];
            this._cache[key] = grid(json);
            for (var i = 0; i < callbacks.length; ++i) {
                callbacks[i](this._cache[key]);
            }
        }, this));
    },

    _tileShouldBeLoaded: function(tilePoint) {
        if (tilePoint.z > this.options.maxZoom || tilePoint.z < this.options.minZoom) {
            return false;
        }

        if (this.options.bounds) {
            var tileSize = 256,
                nwPoint = tilePoint.multiplyBy(tileSize),
                sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
                nw = this._map.unproject(nwPoint),
                se = this._map.unproject(sePoint),
                bounds = new L.LatLngBounds([nw, se]);

            if (!this.options.bounds.intersects(bounds)) {
                return false;
            }
        }

        return true;
    }
});

module.exports = function(_, options) {
    return new GridLayer(_, options);
};

},{"./grid":20,"./load_tilejson":19,"./request":18,"./url":17,"./util":16}],13:[function(require,module,exports){
'use strict';

var util = require('./util'),
    tileLayer = require('./tile_layer'),
    markerLayer = require('./marker_layer'),
    gridLayer = require('./grid_layer'),
    gridControl = require('./grid_control'),
    legendControl = require('./legend_control');

var Map = L.Map.extend({
    includes: [require('./load_tilejson')],

    options: {
        tileLayer: {},
        markerLayer: {},
        gridLayer: {},
        legendControl: {},
        gridControl: {}
    },

    _tilejson: {},

    initialize: function(element, _, options) {
        L.Map.prototype.initialize.call(this, element, options);

        // disable the default 'Powered by Leaflet' text
        if (this.attributionControl) this.attributionControl.setPrefix('');

        if (this.options.tileLayer) {
            this.tileLayer = tileLayer(undefined, this.options.tileLayer);
            this.addLayer(this.tileLayer);
        }

        if (this.options.markerLayer) {
            this.markerLayer = markerLayer(undefined, this.options.markerLayer);
            this.addLayer(this.markerLayer);
        }

        if (this.options.gridLayer) {
            this.gridLayer = gridLayer(undefined, this.options.gridLayer);
            this.addLayer(this.gridLayer);
        }

        if (this.options.gridLayer && this.options.gridControl) {
            this.gridControl = gridControl(this.gridLayer, this.options.gridControl);
            this.addControl(this.gridControl);
        }

        if (this.options.legendControl) {
            this.legendControl = legendControl(this.options.legendControl);
            this.addControl(this.legendControl);
        }

        this._loadTileJSON(_);
    },

    // Update certain properties on 'ready' event
    addLayer: function(layer) {
        if ('on' in layer) { layer.on('ready', L.bind(function() { this._updateLayer(layer); }, this)); }
        return L.Map.prototype.addLayer.call(this, layer);
    },

    // use a javascript object of tilejson data to configure this layer
    _setTileJSON: function(_) {
        this._tilejson = _;
        this._initialize(_);
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    _initialize: function(json) {
        if (this.tileLayer) {
            this.tileLayer._setTileJSON(json);
            this._updateLayer(this.tileLayer);
        }

        if (this.markerLayer && !this.markerLayer.getGeoJSON() && json.data && json.data[0]) {
            this.markerLayer.loadURL(json.data[0]);
        }

        if (this.gridLayer) {
            this.gridLayer._setTileJSON(json);
            this._updateLayer(this.gridLayer);
        }

        if (this.legendControl && json.legend) {
            this.legendControl.addLegend(json.legend);
        }

        if (!this._loaded) {
            var zoom = json.center[2],
                center = L.latLng(json.center[1], json.center[0]);

            this.setView(center, zoom);
        }
    },

    _updateLayer: function(layer) {

        if (!layer.options) return;

        if (this.attributionControl && this._loaded) {
            this.attributionControl.addAttribution(layer.options.attribution);
        }

        if (!(L.stamp(layer) in this._zoomBoundLayers) &&
                (layer.options.maxZoom || layer.options.minZoom)) {
            this._zoomBoundLayers[L.stamp(layer)] = layer;
        }

        this._updateZoomLevels();
    }
});

module.exports = function(element, _, options) {
    return new Map(element, _, options);
};

},{"./grid_control":10,"./grid_layer":11,"./legend_control":8,"./load_tilejson":19,"./marker_layer":12,"./tile_layer":6,"./util":16}],16:[function(require,module,exports){
'use strict';

module.exports = {
    idUrl: function(_, t) {
        if (_.indexOf('/') == -1) t.loadID(_);
        else t.loadURL(_);
    },
    log: function(_) {
        if (console && typeof console.error === 'function') {
            console.error(_);
        }
    },
    strict: function(_, type) {
        if (typeof _ !== type) {
            throw new Error('Invalid argument: ' + type + ' expected');
        }
    },
    strict_instance: function(_, klass, name) {
        if (!(_ instanceof klass)) {
            throw new Error('Invalid argument: ' + name + ' expected');
        }
    },
    strict_oneof: function(_, values) {
        if (values.indexOf(_) == -1) {
            throw new Error('Invalid argument: ' + _ + ' given, valid values are ' +
                values.join(', '));
        }
    },
    lbounds: function(_) {
        // leaflet-compatible bounds, since leaflet does not do geojson
        return new L.LatLngBounds([[_[1], _[0]], [_[3], _[2]]]);
    }
};

},{}],20:[function(require,module,exports){
'use strict';

function utfDecode(c) {
    if (c >= 93) c--;
    if (c >= 35) c--;
    return c - 32;
}

module.exports = function(data) {
    return function(x, y) {
        if (!data) return;
        var idx = utfDecode(data.grid[y].charCodeAt(x)),
            key = data.keys[idx];
        return data.data[key];
    };
};

},{}],14:[function(require,module,exports){
var html_sanitize = require('./sanitizer-bundle.js');

module.exports = function(_) {
    if (!_) return '';
    return html_sanitize(_, cleanUrl, cleanId);
};

// https://bugzilla.mozilla.org/show_bug.cgi?id=255107
function cleanUrl(url) {
    'use strict';
    if (/^https?/.test(url.getScheme())) return url.toString();
    if ('data' == url.getScheme() && /^image/.test(url.getPath())) {
        return url.toString();
    }
}

function cleanId(id) { return id; }

},{"./sanitizer-bundle.js":21}],21:[function(require,module,exports){

// Copyright (C) 2010 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * Implements RFC 3986 for parsing/formatting URIs.
 *
 * @author mikesamuel@gmail.com
 * \@provides URI
 * \@overrides window
 */

var URI = (function () {

/**
 * creates a uri from the string form.  The parser is relaxed, so special
 * characters that aren't escaped but don't cause ambiguities will not cause
 * parse failures.
 *
 * @return {URI|null}
 */
function parse(uriStr) {
  var m = ('' + uriStr).match(URI_RE_);
  if (!m) { return null; }
  return new URI(
      nullIfAbsent(m[1]),
      nullIfAbsent(m[2]),
      nullIfAbsent(m[3]),
      nullIfAbsent(m[4]),
      nullIfAbsent(m[5]),
      nullIfAbsent(m[6]),
      nullIfAbsent(m[7]));
}


/**
 * creates a uri from the given parts.
 *
 * @param scheme {string} an unencoded scheme such as "http" or null
 * @param credentials {string} unencoded user credentials or null
 * @param domain {string} an unencoded domain name or null
 * @param port {number} a port number in [1, 32768].
 *    -1 indicates no port, as does null.
 * @param path {string} an unencoded path
 * @param query {Array.<string>|string|null} a list of unencoded cgi
 *   parameters where even values are keys and odds the corresponding values
 *   or an unencoded query.
 * @param fragment {string} an unencoded fragment without the "#" or null.
 * @return {URI}
 */
function create(scheme, credentials, domain, port, path, query, fragment) {
  var uri = new URI(
      encodeIfExists2(scheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      encodeIfExists2(
          credentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_),
      encodeIfExists(domain),
      port > 0 ? port.toString() : null,
      encodeIfExists2(path, URI_DISALLOWED_IN_PATH_),
      null,
      encodeIfExists(fragment));
  if (query) {
    if ('string' === typeof query) {
      uri.setRawQuery(query.replace(/[^?&=0-9A-Za-z_\-~.%]/g, encodeOne));
    } else {
      uri.setAllParameters(query);
    }
  }
  return uri;
}
function encodeIfExists(unescapedPart) {
  if ('string' == typeof unescapedPart) {
    return encodeURIComponent(unescapedPart);
  }
  return null;
};
/**
 * if unescapedPart is non null, then escapes any characters in it that aren't
 * valid characters in a url and also escapes any special characters that
 * appear in extra.
 *
 * @param unescapedPart {string}
 * @param extra {RegExp} a character set of characters in [\01-\177].
 * @return {string|null} null iff unescapedPart == null.
 */
function encodeIfExists2(unescapedPart, extra) {
  if ('string' == typeof unescapedPart) {
    return encodeURI(unescapedPart).replace(extra, encodeOne);
  }
  return null;
};
/** converts a character in [\01-\177] to its url encoded equivalent. */
function encodeOne(ch) {
  var n = ch.charCodeAt(0);
  return '%' + '0123456789ABCDEF'.charAt((n >> 4) & 0xf) +
      '0123456789ABCDEF'.charAt(n & 0xf);
}

/**
 * {@updoc
 *  $ normPath('foo/./bar')
 *  # 'foo/bar'
 *  $ normPath('./foo')
 *  # 'foo'
 *  $ normPath('foo/.')
 *  # 'foo'
 *  $ normPath('foo//bar')
 *  # 'foo/bar'
 * }
 */
function normPath(path) {
  return path.replace(/(^|\/)\.(?:\/|$)/g, '$1').replace(/\/{2,}/g, '/');
}

var PARENT_DIRECTORY_HANDLER = new RegExp(
    ''
    // A path break
    + '(/|^)'
    // followed by a non .. path element
    // (cannot be . because normPath is used prior to this RegExp)
    + '(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)'
    // followed by .. followed by a path break.
    + '/\\.\\.(?:/|$)');

var PARENT_DIRECTORY_HANDLER_RE = new RegExp(PARENT_DIRECTORY_HANDLER);

var EXTRA_PARENT_PATHS_RE = /^(?:\.\.\/)*(?:\.\.$)?/;

/**
 * Normalizes its input path and collapses all . and .. sequences except for
 * .. sequences that would take it above the root of the current parent
 * directory.
 * {@updoc
 *  $ collapse_dots('foo/../bar')
 *  # 'bar'
 *  $ collapse_dots('foo/./bar')
 *  # 'foo/bar'
 *  $ collapse_dots('foo/../bar/./../../baz')
 *  # 'baz'
 *  $ collapse_dots('../foo')
 *  # '../foo'
 *  $ collapse_dots('../foo').replace(EXTRA_PARENT_PATHS_RE, '')
 *  # 'foo'
 * }
 */
function collapse_dots(path) {
  if (path === null) { return null; }
  var p = normPath(path);
  // Only /../ left to flatten
  var r = PARENT_DIRECTORY_HANDLER_RE;
  // We replace with $1 which matches a / before the .. because this
  // guarantees that:
  // (1) we have at most 1 / between the adjacent place,
  // (2) always have a slash if there is a preceding path section, and
  // (3) we never turn a relative path into an absolute path.
  for (var q; (q = p.replace(r, '$1')) != p; p = q) {};
  return p;
}

/**
 * resolves a relative url string to a base uri.
 * @return {URI}
 */
function resolve(baseUri, relativeUri) {
  // there are several kinds of relative urls:
  // 1. //foo - replaces everything from the domain on.  foo is a domain name
  // 2. foo - replaces the last part of the path, the whole query and fragment
  // 3. /foo - replaces the the path, the query and fragment
  // 4. ?foo - replace the query and fragment
  // 5. #foo - replace the fragment only

  var absoluteUri = baseUri.clone();
  // we satisfy these conditions by looking for the first part of relativeUri
  // that is not blank and applying defaults to the rest

  var overridden = relativeUri.hasScheme();

  if (overridden) {
    absoluteUri.setRawScheme(relativeUri.getRawScheme());
  } else {
    overridden = relativeUri.hasCredentials();
  }

  if (overridden) {
    absoluteUri.setRawCredentials(relativeUri.getRawCredentials());
  } else {
    overridden = relativeUri.hasDomain();
  }

  if (overridden) {
    absoluteUri.setRawDomain(relativeUri.getRawDomain());
  } else {
    overridden = relativeUri.hasPort();
  }

  var rawPath = relativeUri.getRawPath();
  var simplifiedPath = collapse_dots(rawPath);
  if (overridden) {
    absoluteUri.setPort(relativeUri.getPort());
    simplifiedPath = simplifiedPath
        && simplifiedPath.replace(EXTRA_PARENT_PATHS_RE, '');
  } else {
    overridden = !!rawPath;
    if (overridden) {
      // resolve path properly
      if (simplifiedPath.charCodeAt(0) !== 0x2f /* / */) {  // path is relative
        var absRawPath = collapse_dots(absoluteUri.getRawPath() || '')
            .replace(EXTRA_PARENT_PATHS_RE, '');
        var slash = absRawPath.lastIndexOf('/') + 1;
        simplifiedPath = collapse_dots(
            (slash ? absRawPath.substring(0, slash) : '')
            + collapse_dots(rawPath))
            .replace(EXTRA_PARENT_PATHS_RE, '');
      }
    } else {
      simplifiedPath = simplifiedPath
          && simplifiedPath.replace(EXTRA_PARENT_PATHS_RE, '');
      if (simplifiedPath !== rawPath) {
        absoluteUri.setRawPath(simplifiedPath);
      }
    }
  }

  if (overridden) {
    absoluteUri.setRawPath(simplifiedPath);
  } else {
    overridden = relativeUri.hasQuery();
  }

  if (overridden) {
    absoluteUri.setRawQuery(relativeUri.getRawQuery());
  } else {
    overridden = relativeUri.hasFragment();
  }

  if (overridden) {
    absoluteUri.setRawFragment(relativeUri.getRawFragment());
  }

  return absoluteUri;
}

/**
 * a mutable URI.
 *
 * This class contains setters and getters for the parts of the URI.
 * The <tt>getXYZ</tt>/<tt>setXYZ</tt> methods return the decoded part -- so
 * <code>uri.parse('/foo%20bar').getPath()</code> will return the decoded path,
 * <tt>/foo bar</tt>.
 *
 * <p>The raw versions of fields are available too.
 * <code>uri.parse('/foo%20bar').getRawPath()</code> will return the raw path,
 * <tt>/foo%20bar</tt>.  Use the raw setters with care, since
 * <code>URI::toString</code> is not guaranteed to return a valid url if a
 * raw setter was used.
 *
 * <p>All setters return <tt>this</tt> and so may be chained, a la
 * <code>uri.parse('/foo').setFragment('part').toString()</code>.
 *
 * <p>You should not use this constructor directly -- please prefer the factory
 * functions {@link uri.parse}, {@link uri.create}, {@link uri.resolve}
 * instead.</p>
 *
 * <p>The parameters are all raw (assumed to be properly escaped) parts, and
 * any (but not all) may be null.  Undefined is not allowed.</p>
 *
 * @constructor
 */
function URI(
    rawScheme,
    rawCredentials, rawDomain, port,
    rawPath, rawQuery, rawFragment) {
  this.scheme_ = rawScheme;
  this.credentials_ = rawCredentials;
  this.domain_ = rawDomain;
  this.port_ = port;
  this.path_ = rawPath;
  this.query_ = rawQuery;
  this.fragment_ = rawFragment;
  /**
   * @type {Array|null}
   */
  this.paramCache_ = null;
}

/** returns the string form of the url. */
URI.prototype.toString = function () {
  var out = [];
  if (null !== this.scheme_) { out.push(this.scheme_, ':'); }
  if (null !== this.domain_) {
    out.push('//');
    if (null !== this.credentials_) { out.push(this.credentials_, '@'); }
    out.push(this.domain_);
    if (null !== this.port_) { out.push(':', this.port_.toString()); }
  }
  if (null !== this.path_) { out.push(this.path_); }
  if (null !== this.query_) { out.push('?', this.query_); }
  if (null !== this.fragment_) { out.push('#', this.fragment_); }
  return out.join('');
};

URI.prototype.clone = function () {
  return new URI(this.scheme_, this.credentials_, this.domain_, this.port_,
                 this.path_, this.query_, this.fragment_);
};

URI.prototype.getScheme = function () {
  // HTML5 spec does not require the scheme to be lowercased but
  // all common browsers except Safari lowercase the scheme.
  return this.scheme_ && decodeURIComponent(this.scheme_).toLowerCase();
};
URI.prototype.getRawScheme = function () {
  return this.scheme_;
};
URI.prototype.setScheme = function (newScheme) {
  this.scheme_ = encodeIfExists2(
      newScheme, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);
  return this;
};
URI.prototype.setRawScheme = function (newScheme) {
  this.scheme_ = newScheme ? newScheme : null;
  return this;
};
URI.prototype.hasScheme = function () {
  return null !== this.scheme_;
};


URI.prototype.getCredentials = function () {
  return this.credentials_ && decodeURIComponent(this.credentials_);
};
URI.prototype.getRawCredentials = function () {
  return this.credentials_;
};
URI.prototype.setCredentials = function (newCredentials) {
  this.credentials_ = encodeIfExists2(
      newCredentials, URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_);

  return this;
};
URI.prototype.setRawCredentials = function (newCredentials) {
  this.credentials_ = newCredentials ? newCredentials : null;
  return this;
};
URI.prototype.hasCredentials = function () {
  return null !== this.credentials_;
};


URI.prototype.getDomain = function () {
  return this.domain_ && decodeURIComponent(this.domain_);
};
URI.prototype.getRawDomain = function () {
  return this.domain_;
};
URI.prototype.setDomain = function (newDomain) {
  return this.setRawDomain(newDomain && encodeURIComponent(newDomain));
};
URI.prototype.setRawDomain = function (newDomain) {
  this.domain_ = newDomain ? newDomain : null;
  // Maintain the invariant that paths must start with a slash when the URI
  // is not path-relative.
  return this.setRawPath(this.path_);
};
URI.prototype.hasDomain = function () {
  return null !== this.domain_;
};


URI.prototype.getPort = function () {
  return this.port_ && decodeURIComponent(this.port_);
};
URI.prototype.setPort = function (newPort) {
  if (newPort) {
    newPort = Number(newPort);
    if (newPort !== (newPort & 0xffff)) {
      throw new Error('Bad port number ' + newPort);
    }
    this.port_ = '' + newPort;
  } else {
    this.port_ = null;
  }
  return this;
};
URI.prototype.hasPort = function () {
  return null !== this.port_;
};


URI.prototype.getPath = function () {
  return this.path_ && decodeURIComponent(this.path_);
};
URI.prototype.getRawPath = function () {
  return this.path_;
};
URI.prototype.setPath = function (newPath) {
  return this.setRawPath(encodeIfExists2(newPath, URI_DISALLOWED_IN_PATH_));
};
URI.prototype.setRawPath = function (newPath) {
  if (newPath) {
    newPath = String(newPath);
    this.path_ = 
      // Paths must start with '/' unless this is a path-relative URL.
      (!this.domain_ || /^\//.test(newPath)) ? newPath : '/' + newPath;
  } else {
    this.path_ = null;
  }
  return this;
};
URI.prototype.hasPath = function () {
  return null !== this.path_;
};


URI.prototype.getQuery = function () {
  // From http://www.w3.org/Addressing/URL/4_URI_Recommentations.html
  // Within the query string, the plus sign is reserved as shorthand notation
  // for a space.
  return this.query_ && decodeURIComponent(this.query_).replace(/\+/g, ' ');
};
URI.prototype.getRawQuery = function () {
  return this.query_;
};
URI.prototype.setQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = encodeIfExists(newQuery);
  return this;
};
URI.prototype.setRawQuery = function (newQuery) {
  this.paramCache_ = null;
  this.query_ = newQuery ? newQuery : null;
  return this;
};
URI.prototype.hasQuery = function () {
  return null !== this.query_;
};

/**
 * sets the query given a list of strings of the form
 * [ key0, value0, key1, value1, ... ].
 *
 * <p><code>uri.setAllParameters(['a', 'b', 'c', 'd']).getQuery()</code>
 * will yield <code>'a=b&c=d'</code>.
 */
URI.prototype.setAllParameters = function (params) {
  if (typeof params === 'object') {
    if (!(params instanceof Array)
        && (params instanceof Object
            || Object.prototype.toString.call(params) !== '[object Array]')) {
      var newParams = [];
      var i = -1;
      for (var k in params) {
        var v = params[k];
        if ('string' === typeof v) {
          newParams[++i] = k;
          newParams[++i] = v;
        }
      }
      params = newParams;
    }
  }
  this.paramCache_ = null;
  var queryBuf = [];
  var separator = '';
  for (var j = 0; j < params.length;) {
    var k = params[j++];
    var v = params[j++];
    queryBuf.push(separator, encodeURIComponent(k.toString()));
    separator = '&';
    if (v) {
      queryBuf.push('=', encodeURIComponent(v.toString()));
    }
  }
  this.query_ = queryBuf.join('');
  return this;
};
URI.prototype.checkParameterCache_ = function () {
  if (!this.paramCache_) {
    var q = this.query_;
    if (!q) {
      this.paramCache_ = [];
    } else {
      var cgiParams = q.split(/[&\?]/);
      var out = [];
      var k = -1;
      for (var i = 0; i < cgiParams.length; ++i) {
        var m = cgiParams[i].match(/^([^=]*)(?:=(.*))?$/);
        // From http://www.w3.org/Addressing/URL/4_URI_Recommentations.html
        // Within the query string, the plus sign is reserved as shorthand
        // notation for a space.
        out[++k] = decodeURIComponent(m[1]).replace(/\+/g, ' ');
        out[++k] = decodeURIComponent(m[2] || '').replace(/\+/g, ' ');
      }
      this.paramCache_ = out;
    }
  }
};
/**
 * sets the values of the named cgi parameters.
 *
 * <p>So, <code>uri.parse('foo?a=b&c=d&e=f').setParameterValues('c', ['new'])
 * </code> yields <tt>foo?a=b&c=new&e=f</tt>.</p>
 *
 * @param key {string}
 * @param values {Array.<string>} the new values.  If values is a single string
 *   then it will be treated as the sole value.
 */
URI.prototype.setParameterValues = function (key, values) {
  // be nice and avoid subtle bugs where [] operator on string performs charAt
  // on some browsers and crashes on IE
  if (typeof values === 'string') {
    values = [ values ];
  }

  this.checkParameterCache_();
  var newValueIndex = 0;
  var pc = this.paramCache_;
  var params = [];
  for (var i = 0, k = 0; i < pc.length; i += 2) {
    if (key === pc[i]) {
      if (newValueIndex < values.length) {
        params.push(key, values[newValueIndex++]);
      }
    } else {
      params.push(pc[i], pc[i + 1]);
    }
  }
  while (newValueIndex < values.length) {
    params.push(key, values[newValueIndex++]);
  }
  this.setAllParameters(params);
  return this;
};
URI.prototype.removeParameter = function (key) {
  return this.setParameterValues(key, []);
};
/**
 * returns the parameters specified in the query part of the uri as a list of
 * keys and values like [ key0, value0, key1, value1, ... ].
 *
 * @return {Array.<string>}
 */
URI.prototype.getAllParameters = function () {
  this.checkParameterCache_();
  return this.paramCache_.slice(0, this.paramCache_.length);
};
/**
 * returns the value<b>s</b> for a given cgi parameter as a list of decoded
 * query parameter values.
 * @return {Array.<string>}
 */
URI.prototype.getParameterValues = function (paramNameUnescaped) {
  this.checkParameterCache_();
  var values = [];
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      values.push(this.paramCache_[i + 1]);
    }
  }
  return values;
};
/**
 * returns a map of cgi parameter names to (non-empty) lists of values.
 * @return {Object.<string,Array.<string>>}
 */
URI.prototype.getParameterMap = function (paramNameUnescaped) {
  this.checkParameterCache_();
  var paramMap = {};
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    var key = this.paramCache_[i++],
      value = this.paramCache_[i++];
    if (!(key in paramMap)) {
      paramMap[key] = [value];
    } else {
      paramMap[key].push(value);
    }
  }
  return paramMap;
};
/**
 * returns the first value for a given cgi parameter or null if the given
 * parameter name does not appear in the query string.
 * If the given parameter name does appear, but has no '<tt>=</tt>' following
 * it, then the empty string will be returned.
 * @return {string|null}
 */
URI.prototype.getParameterValue = function (paramNameUnescaped) {
  this.checkParameterCache_();
  for (var i = 0; i < this.paramCache_.length; i += 2) {
    if (paramNameUnescaped === this.paramCache_[i]) {
      return this.paramCache_[i + 1];
    }
  }
  return null;
};

URI.prototype.getFragment = function () {
  return this.fragment_ && decodeURIComponent(this.fragment_);
};
URI.prototype.getRawFragment = function () {
  return this.fragment_;
};
URI.prototype.setFragment = function (newFragment) {
  this.fragment_ = newFragment ? encodeURIComponent(newFragment) : null;
  return this;
};
URI.prototype.setRawFragment = function (newFragment) {
  this.fragment_ = newFragment ? newFragment : null;
  return this;
};
URI.prototype.hasFragment = function () {
  return null !== this.fragment_;
};

function nullIfAbsent(matchPart) {
  return ('string' == typeof matchPart) && (matchPart.length > 0)
         ? matchPart
         : null;
}




/**
 * a regular expression for breaking a URI into its component parts.
 *
 * <p>http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234 says
 * As the "first-match-wins" algorithm is identical to the "greedy"
 * disambiguation method used by POSIX regular expressions, it is natural and
 * commonplace to use a regular expression for parsing the potential five
 * components of a URI reference.
 *
 * <p>The following line is the regular expression for breaking-down a
 * well-formed URI reference into its components.
 *
 * <pre>
 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
 *  12            3  4          5       6  7        8 9
 * </pre>
 *
 * <p>The numbers in the second line above are only to assist readability; they
 * indicate the reference points for each subexpression (i.e., each paired
 * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
 * For example, matching the above expression to
 * <pre>
 *     http://www.ics.uci.edu/pub/ietf/uri/#Related
 * </pre>
 * results in the following subexpression matches:
 * <pre>
 *    $1 = http:
 *    $2 = http
 *    $3 = //www.ics.uci.edu
 *    $4 = www.ics.uci.edu
 *    $5 = /pub/ietf/uri/
 *    $6 = <undefined>
 *    $7 = <undefined>
 *    $8 = #Related
 *    $9 = Related
 * </pre>
 * where <undefined> indicates that the component is not present, as is the
 * case for the query component in the above example. Therefore, we can
 * determine the value of the five components as
 * <pre>
 *    scheme    = $2
 *    authority = $4
 *    path      = $5
 *    query     = $7
 *    fragment  = $9
 * </pre>
 *
 * <p>msamuel: I have modified the regular expression slightly to expose the
 * credentials, domain, and port separately from the authority.
 * The modified version yields
 * <pre>
 *    $1 = http              scheme
 *    $2 = <undefined>       credentials -\
 *    $3 = www.ics.uci.edu   domain       | authority
 *    $4 = <undefined>       port        -/
 *    $5 = /pub/ietf/uri/    path
 *    $6 = <undefined>       query without ?
 *    $7 = Related           fragment without #
 * </pre>
 */
var URI_RE_ = new RegExp(
      "^" +
      "(?:" +
        "([^:/?#]+)" +         // scheme
      ":)?" +
      "(?://" +
        "(?:([^/?#]*)@)?" +    // credentials
        "([^/?#:@]*)" +        // domain
        "(?::([0-9]+))?" +     // port
      ")?" +
      "([^?#]+)?" +            // path
      "(?:\\?([^#]*))?" +      // query
      "(?:#(.*))?" +           // fragment
      "$"
      );

var URI_DISALLOWED_IN_SCHEME_OR_CREDENTIALS_ = /[#\/\?@]/g;
var URI_DISALLOWED_IN_PATH_ = /[\#\?]/g;

URI.parse = parse;
URI.create = create;
URI.resolve = resolve;
URI.collapse_dots = collapse_dots;  // Visible for testing.

// lightweight string-based api for loadModuleMaker
URI.utils = {
  mimeTypeOf: function (uri) {
    var uriObj = parse(uri);
    if (/\.html$/.test(uriObj.getPath())) {
      return 'text/html';
    } else {
      return 'application/javascript';
    }
  },
  resolve: function (base, uri) {
    if (base) {
      return resolve(parse(base), parse(uri)).toString();
    } else {
      return '' + uri;
    }
  }
};


return URI;
})();

// Copyright Google Inc.
// Licensed under the Apache Licence Version 2.0
// Autogenerated at Mon Feb 25 13:05:42 EST 2013
// @overrides window
// @provides html4
var html4 = {};
html4.atype = {
  'NONE': 0,
  'URI': 1,
  'URI_FRAGMENT': 11,
  'SCRIPT': 2,
  'STYLE': 3,
  'HTML': 12,
  'ID': 4,
  'IDREF': 5,
  'IDREFS': 6,
  'GLOBAL_NAME': 7,
  'LOCAL_NAME': 8,
  'CLASSES': 9,
  'FRAME_TARGET': 10,
  'MEDIA_QUERY': 13
};
html4[ 'atype' ] = html4.atype;
html4.ATTRIBS = {
  '*::class': 9,
  '*::dir': 0,
  '*::draggable': 0,
  '*::hidden': 0,
  '*::id': 4,
  '*::inert': 0,
  '*::itemprop': 0,
  '*::itemref': 6,
  '*::itemscope': 0,
  '*::lang': 0,
  '*::onblur': 2,
  '*::onchange': 2,
  '*::onclick': 2,
  '*::ondblclick': 2,
  '*::onfocus': 2,
  '*::onkeydown': 2,
  '*::onkeypress': 2,
  '*::onkeyup': 2,
  '*::onload': 2,
  '*::onmousedown': 2,
  '*::onmousemove': 2,
  '*::onmouseout': 2,
  '*::onmouseover': 2,
  '*::onmouseup': 2,
  '*::onreset': 2,
  '*::onscroll': 2,
  '*::onselect': 2,
  '*::onsubmit': 2,
  '*::onunload': 2,
  '*::spellcheck': 0,
  '*::style': 3,
  '*::title': 0,
  '*::translate': 0,
  'a::accesskey': 0,
  'a::coords': 0,
  'a::href': 1,
  'a::hreflang': 0,
  'a::name': 7,
  'a::onblur': 2,
  'a::onfocus': 2,
  'a::shape': 0,
  'a::tabindex': 0,
  'a::target': 10,
  'a::type': 0,
  'area::accesskey': 0,
  'area::alt': 0,
  'area::coords': 0,
  'area::href': 1,
  'area::nohref': 0,
  'area::onblur': 2,
  'area::onfocus': 2,
  'area::shape': 0,
  'area::tabindex': 0,
  'area::target': 10,
  'audio::controls': 0,
  'audio::loop': 0,
  'audio::mediagroup': 5,
  'audio::muted': 0,
  'audio::preload': 0,
  'bdo::dir': 0,
  'blockquote::cite': 1,
  'br::clear': 0,
  'button::accesskey': 0,
  'button::disabled': 0,
  'button::name': 8,
  'button::onblur': 2,
  'button::onfocus': 2,
  'button::tabindex': 0,
  'button::type': 0,
  'button::value': 0,
  'canvas::height': 0,
  'canvas::width': 0,
  'caption::align': 0,
  'col::align': 0,
  'col::char': 0,
  'col::charoff': 0,
  'col::span': 0,
  'col::valign': 0,
  'col::width': 0,
  'colgroup::align': 0,
  'colgroup::char': 0,
  'colgroup::charoff': 0,
  'colgroup::span': 0,
  'colgroup::valign': 0,
  'colgroup::width': 0,
  'command::checked': 0,
  'command::command': 5,
  'command::disabled': 0,
  'command::icon': 1,
  'command::label': 0,
  'command::radiogroup': 0,
  'command::type': 0,
  'data::value': 0,
  'del::cite': 1,
  'del::datetime': 0,
  'details::open': 0,
  'dir::compact': 0,
  'div::align': 0,
  'dl::compact': 0,
  'fieldset::disabled': 0,
  'font::color': 0,
  'font::face': 0,
  'font::size': 0,
  'form::accept': 0,
  'form::action': 1,
  'form::autocomplete': 0,
  'form::enctype': 0,
  'form::method': 0,
  'form::name': 7,
  'form::novalidate': 0,
  'form::onreset': 2,
  'form::onsubmit': 2,
  'form::target': 10,
  'h1::align': 0,
  'h2::align': 0,
  'h3::align': 0,
  'h4::align': 0,
  'h5::align': 0,
  'h6::align': 0,
  'hr::align': 0,
  'hr::noshade': 0,
  'hr::size': 0,
  'hr::width': 0,
  'iframe::align': 0,
  'iframe::frameborder': 0,
  'iframe::height': 0,
  'iframe::marginheight': 0,
  'iframe::marginwidth': 0,
  'iframe::width': 0,
  'img::align': 0,
  'img::alt': 0,
  'img::border': 0,
  'img::height': 0,
  'img::hspace': 0,
  'img::ismap': 0,
  'img::name': 7,
  'img::src': 1,
  'img::usemap': 11,
  'img::vspace': 0,
  'img::width': 0,
  'input::accept': 0,
  'input::accesskey': 0,
  'input::align': 0,
  'input::alt': 0,
  'input::autocomplete': 0,
  'input::checked': 0,
  'input::disabled': 0,
  'input::inputmode': 0,
  'input::ismap': 0,
  'input::list': 5,
  'input::max': 0,
  'input::maxlength': 0,
  'input::min': 0,
  'input::multiple': 0,
  'input::name': 8,
  'input::onblur': 2,
  'input::onchange': 2,
  'input::onfocus': 2,
  'input::onselect': 2,
  'input::placeholder': 0,
  'input::readonly': 0,
  'input::required': 0,
  'input::size': 0,
  'input::src': 1,
  'input::step': 0,
  'input::tabindex': 0,
  'input::type': 0,
  'input::usemap': 11,
  'input::value': 0,
  'ins::cite': 1,
  'ins::datetime': 0,
  'label::accesskey': 0,
  'label::for': 5,
  'label::onblur': 2,
  'label::onfocus': 2,
  'legend::accesskey': 0,
  'legend::align': 0,
  'li::type': 0,
  'li::value': 0,
  'map::name': 7,
  'menu::compact': 0,
  'menu::label': 0,
  'menu::type': 0,
  'meter::high': 0,
  'meter::low': 0,
  'meter::max': 0,
  'meter::min': 0,
  'meter::value': 0,
  'ol::compact': 0,
  'ol::reversed': 0,
  'ol::start': 0,
  'ol::type': 0,
  'optgroup::disabled': 0,
  'optgroup::label': 0,
  'option::disabled': 0,
  'option::label': 0,
  'option::selected': 0,
  'option::value': 0,
  'output::for': 6,
  'output::name': 8,
  'p::align': 0,
  'pre::width': 0,
  'progress::max': 0,
  'progress::min': 0,
  'progress::value': 0,
  'q::cite': 1,
  'select::autocomplete': 0,
  'select::disabled': 0,
  'select::multiple': 0,
  'select::name': 8,
  'select::onblur': 2,
  'select::onchange': 2,
  'select::onfocus': 2,
  'select::required': 0,
  'select::size': 0,
  'select::tabindex': 0,
  'source::type': 0,
  'table::align': 0,
  'table::bgcolor': 0,
  'table::border': 0,
  'table::cellpadding': 0,
  'table::cellspacing': 0,
  'table::frame': 0,
  'table::rules': 0,
  'table::summary': 0,
  'table::width': 0,
  'tbody::align': 0,
  'tbody::char': 0,
  'tbody::charoff': 0,
  'tbody::valign': 0,
  'td::abbr': 0,
  'td::align': 0,
  'td::axis': 0,
  'td::bgcolor': 0,
  'td::char': 0,
  'td::charoff': 0,
  'td::colspan': 0,
  'td::headers': 6,
  'td::height': 0,
  'td::nowrap': 0,
  'td::rowspan': 0,
  'td::scope': 0,
  'td::valign': 0,
  'td::width': 0,
  'textarea::accesskey': 0,
  'textarea::autocomplete': 0,
  'textarea::cols': 0,
  'textarea::disabled': 0,
  'textarea::inputmode': 0,
  'textarea::name': 8,
  'textarea::onblur': 2,
  'textarea::onchange': 2,
  'textarea::onfocus': 2,
  'textarea::onselect': 2,
  'textarea::placeholder': 0,
  'textarea::readonly': 0,
  'textarea::required': 0,
  'textarea::rows': 0,
  'textarea::tabindex': 0,
  'textarea::wrap': 0,
  'tfoot::align': 0,
  'tfoot::char': 0,
  'tfoot::charoff': 0,
  'tfoot::valign': 0,
  'th::abbr': 0,
  'th::align': 0,
  'th::axis': 0,
  'th::bgcolor': 0,
  'th::char': 0,
  'th::charoff': 0,
  'th::colspan': 0,
  'th::headers': 6,
  'th::height': 0,
  'th::nowrap': 0,
  'th::rowspan': 0,
  'th::scope': 0,
  'th::valign': 0,
  'th::width': 0,
  'thead::align': 0,
  'thead::char': 0,
  'thead::charoff': 0,
  'thead::valign': 0,
  'tr::align': 0,
  'tr::bgcolor': 0,
  'tr::char': 0,
  'tr::charoff': 0,
  'tr::valign': 0,
  'track::default': 0,
  'track::kind': 0,
  'track::label': 0,
  'track::srclang': 0,
  'ul::compact': 0,
  'ul::type': 0,
  'video::controls': 0,
  'video::height': 0,
  'video::loop': 0,
  'video::mediagroup': 5,
  'video::muted': 0,
  'video::poster': 1,
  'video::preload': 0,
  'video::width': 0
};
html4[ 'ATTRIBS' ] = html4.ATTRIBS;
html4.eflags = {
  'OPTIONAL_ENDTAG': 1,
  'EMPTY': 2,
  'CDATA': 4,
  'RCDATA': 8,
  'UNSAFE': 16,
  'FOLDABLE': 32,
  'SCRIPT': 64,
  'STYLE': 128,
  'VIRTUALIZED': 256
};
html4[ 'eflags' ] = html4.eflags;
html4.ELEMENTS = {
  'a': 0,
  'abbr': 0,
  'acronym': 0,
  'address': 0,
  'applet': 272,
  'area': 2,
  'article': 0,
  'aside': 0,
  'audio': 0,
  'b': 0,
  'base': 274,
  'basefont': 274,
  'bdi': 0,
  'bdo': 0,
  'big': 0,
  'blockquote': 0,
  'body': 305,
  'br': 2,
  'button': 0,
  'canvas': 0,
  'caption': 0,
  'center': 0,
  'cite': 0,
  'code': 0,
  'col': 2,
  'colgroup': 1,
  'command': 2,
  'data': 0,
  'datalist': 0,
  'dd': 1,
  'del': 0,
  'details': 0,
  'dfn': 0,
  'dialog': 272,
  'dir': 0,
  'div': 0,
  'dl': 0,
  'dt': 1,
  'em': 0,
  'fieldset': 0,
  'figcaption': 0,
  'figure': 0,
  'font': 0,
  'footer': 0,
  'form': 0,
  'frame': 274,
  'frameset': 272,
  'h1': 0,
  'h2': 0,
  'h3': 0,
  'h4': 0,
  'h5': 0,
  'h6': 0,
  'head': 305,
  'header': 0,
  'hgroup': 0,
  'hr': 2,
  'html': 305,
  'i': 0,
  'iframe': 4,
  'img': 2,
  'input': 2,
  'ins': 0,
  'isindex': 274,
  'kbd': 0,
  'keygen': 274,
  'label': 0,
  'legend': 0,
  'li': 1,
  'link': 274,
  'map': 0,
  'mark': 0,
  'menu': 0,
  'meta': 274,
  'meter': 0,
  'nav': 0,
  'nobr': 0,
  'noembed': 276,
  'noframes': 276,
  'noscript': 276,
  'object': 272,
  'ol': 0,
  'optgroup': 0,
  'option': 1,
  'output': 0,
  'p': 1,
  'param': 274,
  'pre': 0,
  'progress': 0,
  'q': 0,
  's': 0,
  'samp': 0,
  'script': 84,
  'section': 0,
  'select': 0,
  'small': 0,
  'source': 2,
  'span': 0,
  'strike': 0,
  'strong': 0,
  'style': 148,
  'sub': 0,
  'summary': 0,
  'sup': 0,
  'table': 0,
  'tbody': 1,
  'td': 1,
  'textarea': 8,
  'tfoot': 1,
  'th': 1,
  'thead': 1,
  'time': 0,
  'title': 280,
  'tr': 1,
  'track': 2,
  'tt': 0,
  'u': 0,
  'ul': 0,
  'var': 0,
  'video': 0,
  'wbr': 2
};
html4[ 'ELEMENTS' ] = html4.ELEMENTS;
html4.ELEMENT_DOM_INTERFACES = {
  'a': 'HTMLAnchorElement',
  'abbr': 'HTMLElement',
  'acronym': 'HTMLElement',
  'address': 'HTMLElement',
  'applet': 'HTMLAppletElement',
  'area': 'HTMLAreaElement',
  'article': 'HTMLElement',
  'aside': 'HTMLElement',
  'audio': 'HTMLAudioElement',
  'b': 'HTMLElement',
  'base': 'HTMLBaseElement',
  'basefont': 'HTMLBaseFontElement',
  'bdi': 'HTMLElement',
  'bdo': 'HTMLElement',
  'big': 'HTMLElement',
  'blockquote': 'HTMLQuoteElement',
  'body': 'HTMLBodyElement',
  'br': 'HTMLBRElement',
  'button': 'HTMLButtonElement',
  'canvas': 'HTMLCanvasElement',
  'caption': 'HTMLTableCaptionElement',
  'center': 'HTMLElement',
  'cite': 'HTMLElement',
  'code': 'HTMLElement',
  'col': 'HTMLTableColElement',
  'colgroup': 'HTMLTableColElement',
  'command': 'HTMLCommandElement',
  'data': 'HTMLElement',
  'datalist': 'HTMLDataListElement',
  'dd': 'HTMLElement',
  'del': 'HTMLModElement',
  'details': 'HTMLDetailsElement',
  'dfn': 'HTMLElement',
  'dialog': 'HTMLDialogElement',
  'dir': 'HTMLDirectoryElement',
  'div': 'HTMLDivElement',
  'dl': 'HTMLDListElement',
  'dt': 'HTMLElement',
  'em': 'HTMLElement',
  'fieldset': 'HTMLFieldSetElement',
  'figcaption': 'HTMLElement',
  'figure': 'HTMLElement',
  'font': 'HTMLFontElement',
  'footer': 'HTMLElement',
  'form': 'HTMLFormElement',
  'frame': 'HTMLFrameElement',
  'frameset': 'HTMLFrameSetElement',
  'h1': 'HTMLHeadingElement',
  'h2': 'HTMLHeadingElement',
  'h3': 'HTMLHeadingElement',
  'h4': 'HTMLHeadingElement',
  'h5': 'HTMLHeadingElement',
  'h6': 'HTMLHeadingElement',
  'head': 'HTMLHeadElement',
  'header': 'HTMLElement',
  'hgroup': 'HTMLElement',
  'hr': 'HTMLHRElement',
  'html': 'HTMLHtmlElement',
  'i': 'HTMLElement',
  'iframe': 'HTMLIFrameElement',
  'img': 'HTMLImageElement',
  'input': 'HTMLInputElement',
  'ins': 'HTMLModElement',
  'isindex': 'HTMLUnknownElement',
  'kbd': 'HTMLElement',
  'keygen': 'HTMLKeygenElement',
  'label': 'HTMLLabelElement',
  'legend': 'HTMLLegendElement',
  'li': 'HTMLLIElement',
  'link': 'HTMLLinkElement',
  'map': 'HTMLMapElement',
  'mark': 'HTMLElement',
  'menu': 'HTMLMenuElement',
  'meta': 'HTMLMetaElement',
  'meter': 'HTMLMeterElement',
  'nav': 'HTMLElement',
  'nobr': 'HTMLElement',
  'noembed': 'HTMLElement',
  'noframes': 'HTMLElement',
  'noscript': 'HTMLElement',
  'object': 'HTMLObjectElement',
  'ol': 'HTMLOListElement',
  'optgroup': 'HTMLOptGroupElement',
  'option': 'HTMLOptionElement',
  'output': 'HTMLOutputElement',
  'p': 'HTMLParagraphElement',
  'param': 'HTMLParamElement',
  'pre': 'HTMLPreElement',
  'progress': 'HTMLProgressElement',
  'q': 'HTMLQuoteElement',
  's': 'HTMLElement',
  'samp': 'HTMLElement',
  'script': 'HTMLScriptElement',
  'section': 'HTMLElement',
  'select': 'HTMLSelectElement',
  'small': 'HTMLElement',
  'source': 'HTMLSourceElement',
  'span': 'HTMLSpanElement',
  'strike': 'HTMLElement',
  'strong': 'HTMLElement',
  'style': 'HTMLStyleElement',
  'sub': 'HTMLElement',
  'summary': 'HTMLElement',
  'sup': 'HTMLElement',
  'table': 'HTMLTableElement',
  'tbody': 'HTMLTableSectionElement',
  'td': 'HTMLTableDataCellElement',
  'textarea': 'HTMLTextAreaElement',
  'tfoot': 'HTMLTableSectionElement',
  'th': 'HTMLTableHeaderCellElement',
  'thead': 'HTMLTableSectionElement',
  'time': 'HTMLTimeElement',
  'title': 'HTMLTitleElement',
  'tr': 'HTMLTableRowElement',
  'track': 'HTMLTrackElement',
  'tt': 'HTMLElement',
  'u': 'HTMLElement',
  'ul': 'HTMLUListElement',
  'var': 'HTMLElement',
  'video': 'HTMLVideoElement',
  'wbr': 'HTMLElement'
};
html4[ 'ELEMENT_DOM_INTERFACES' ] = html4.ELEMENT_DOM_INTERFACES;
html4.ueffects = {
  'NOT_LOADED': 0,
  'SAME_DOCUMENT': 1,
  'NEW_DOCUMENT': 2
};
html4[ 'ueffects' ] = html4.ueffects;
html4.URIEFFECTS = {
  'a::href': 2,
  'area::href': 2,
  'blockquote::cite': 0,
  'command::icon': 1,
  'del::cite': 0,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 0,
  'q::cite': 0,
  'video::poster': 1
};
html4[ 'URIEFFECTS' ] = html4.URIEFFECTS;
html4.ltypes = {
  'UNSANDBOXED': 2,
  'SANDBOXED': 1,
  'DATA': 0
};
html4[ 'ltypes' ] = html4.ltypes;
html4.LOADERTYPES = {
  'a::href': 2,
  'area::href': 2,
  'blockquote::cite': 2,
  'command::icon': 1,
  'del::cite': 2,
  'form::action': 2,
  'img::src': 1,
  'input::src': 1,
  'ins::cite': 2,
  'q::cite': 2,
  'video::poster': 1
};
html4[ 'LOADERTYPES' ] = html4.LOADERTYPES;

// Copyright (C) 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview
 * An HTML sanitizer that can satisfy a variety of security policies.
 *
 * <p>
 * The HTML sanitizer is built around a SAX parser and HTML element and
 * attributes schemas.
 *
 * If the cssparser is loaded, inline styles are sanitized using the
 * css property and value schemas.  Else they are remove during
 * sanitization.
 *
 * If it exists, uses parseCssDeclarations, sanitizeCssProperty,  cssSchema
 *
 * @author mikesamuel@gmail.com
 * @author jasvir@gmail.com
 * \@requires html4, URI
 * \@overrides window
 * \@provides html, html_sanitize
 */

// The Turkish i seems to be a non-issue, but abort in case it is.
if ('I'.toLowerCase() !== 'i') { throw 'I/i problem'; }

/**
 * \@namespace
 */
var html = (function(html4) {

  // For closure compiler
  var parseCssDeclarations, sanitizeCssProperty, cssSchema;
  if ('undefined' !== typeof window) {
    parseCssDeclarations = window['parseCssDeclarations'];
    sanitizeCssProperty = window['sanitizeCssProperty'];
    cssSchema = window['cssSchema'];
  }

  // The keys of this object must be 'quoted' or JSCompiler will mangle them!
  // This is a partial list -- lookupEntity() uses the host browser's parser
  // (when available) to implement full entity lookup.
  // Note that entities are in general case-sensitive; the uppercase ones are
  // explicitly defined by HTML5 (presumably as compatibility).
  var ENTITIES = {
    'lt': '<',
    'LT': '<',
    'gt': '>',
    'GT': '>',
    'amp': '&',
    'AMP': '&',
    'quot': '"',
    'apos': '\'',
    'nbsp': '\240'
  };

  // Patterns for types of entity/character reference names.
  var decimalEscapeRe = /^#(\d+)$/;
  var hexEscapeRe = /^#x([0-9A-Fa-f]+)$/;
  // contains every entity per http://www.w3.org/TR/2011/WD-html5-20110113/named-character-references.html
  var safeEntityNameRe = /^[A-Za-z][A-za-z0-9]+$/;
  // Used as a hook to invoke the browser's entity parsing. <textarea> is used
  // because its content is parsed for entities but not tags.
  // TODO(kpreid): This retrieval is a kludge and leads to silent loss of
  // functionality if the document isn't available.
  var entityLookupElement =
      ('undefined' !== typeof window && window['document'])
          ? window['document'].createElement('textarea') : null;
  /**
   * Decodes an HTML entity.
   *
   * {\@updoc
   * $ lookupEntity('lt')
   * # '<'
   * $ lookupEntity('GT')
   * # '>'
   * $ lookupEntity('amp')
   * # '&'
   * $ lookupEntity('nbsp')
   * # '\xA0'
   * $ lookupEntity('apos')
   * # "'"
   * $ lookupEntity('quot')
   * # '"'
   * $ lookupEntity('#xa')
   * # '\n'
   * $ lookupEntity('#10')
   * # '\n'
   * $ lookupEntity('#x0a')
   * # '\n'
   * $ lookupEntity('#010')
   * # '\n'
   * $ lookupEntity('#x00A')
   * # '\n'
   * $ lookupEntity('Pi')      // Known failure
   * # '\u03A0'
   * $ lookupEntity('pi')      // Known failure
   * # '\u03C0'
   * }
   *
   * @param {string} name the content between the '&' and the ';'.
   * @return {string} a single unicode code-point as a string.
   */
  function lookupEntity(name) {
    // TODO: entity lookup as specified by HTML5 actually depends on the
    // presence of the ";".
    if (ENTITIES.hasOwnProperty(name)) { return ENTITIES[name]; }
    var m = name.match(decimalEscapeRe);
    if (m) {
      return String.fromCharCode(parseInt(m[1], 10));
    } else if (!!(m = name.match(hexEscapeRe))) {
      return String.fromCharCode(parseInt(m[1], 16));
    } else if (entityLookupElement && safeEntityNameRe.test(name)) {
      entityLookupElement.innerHTML = '&' + name + ';';
      var text = entityLookupElement.textContent;
      ENTITIES[name] = text;
      return text;
    } else {
      return '&' + name + ';';
    }
  }

  function decodeOneEntity(_, name) {
    return lookupEntity(name);
  }

  var nulRe = /\0/g;
  function stripNULs(s) {
    return s.replace(nulRe, '');
  }

  var ENTITY_RE_1 = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g;
  var ENTITY_RE_2 = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/;
  /**
   * The plain text of a chunk of HTML CDATA which possibly containing.
   *
   * {\@updoc
   * $ unescapeEntities('')
   * # ''
   * $ unescapeEntities('hello World!')
   * # 'hello World!'
   * $ unescapeEntities('1 &lt; 2 &amp;&AMP; 4 &gt; 3&#10;')
   * # '1 < 2 && 4 > 3\n'
   * $ unescapeEntities('&lt;&lt <- unfinished entity&gt;')
   * # '<&lt <- unfinished entity>'
   * $ unescapeEntities('/foo?bar=baz&copy=true')  // & often unescaped in URLS
   * # '/foo?bar=baz&copy=true'
   * $ unescapeEntities('pi=&pi;&#x3c0;, Pi=&Pi;\u03A0') // FIXME: known failure
   * # 'pi=\u03C0\u03c0, Pi=\u03A0\u03A0'
   * }
   *
   * @param {string} s a chunk of HTML CDATA.  It must not start or end inside
   *     an HTML entity.
   */
  function unescapeEntities(s) {
    return s.replace(ENTITY_RE_1, decodeOneEntity);
  }

  var ampRe = /&/g;
  var looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;
  var ltRe = /[<]/g;
  var gtRe = />/g;
  var quotRe = /\"/g;

  /**
   * Escapes HTML special characters in attribute values.
   *
   * {\@updoc
   * $ escapeAttrib('')
   * # ''
   * $ escapeAttrib('"<<&==&>>"')  // Do not just escape the first occurrence.
   * # '&#34;&lt;&lt;&amp;&#61;&#61;&amp;&gt;&gt;&#34;'
   * $ escapeAttrib('Hello <World>!')
   * # 'Hello &lt;World&gt;!'
   * }
   */
  function escapeAttrib(s) {
    return ('' + s).replace(ampRe, '&amp;').replace(ltRe, '&lt;')
        .replace(gtRe, '&gt;').replace(quotRe, '&#34;');
  }

  /**
   * Escape entities in RCDATA that can be escaped without changing the meaning.
   * {\@updoc
   * $ normalizeRCData('1 < 2 &&amp; 3 > 4 &amp;& 5 &lt; 7&8')
   * # '1 &lt; 2 &amp;&amp; 3 &gt; 4 &amp;&amp; 5 &lt; 7&amp;8'
   * }
   */
  function normalizeRCData(rcdata) {
    return rcdata
        .replace(looseAmpRe, '&amp;$1')
        .replace(ltRe, '&lt;')
        .replace(gtRe, '&gt;');
  }

  // TODO(felix8a): validate sanitizer regexs against the HTML5 grammar at
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tokenization.html
  // http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html

  // We initially split input so that potentially meaningful characters
  // like '<' and '>' are separate tokens, using a fast dumb process that
  // ignores quoting.  Then we walk that token stream, and when we see a
  // '<' that's the start of a tag, we use ATTR_RE to extract tag
  // attributes from the next token.  That token will never have a '>'
  // character.  However, it might have an unbalanced quote character, and
  // when we see that, we combine additional tokens to balance the quote.

  var ATTR_RE = new RegExp(
    '^\\s*' +
    '([-.:\\w]+)' +             // 1 = Attribute name
    '(?:' + (
      '\\s*(=)\\s*' +           // 2 = Is there a value?
      '(' + (                   // 3 = Attribute value
        // TODO(felix8a): maybe use backref to match quotes
        '(\")[^\"]*(\"|$)' +    // 4, 5 = Double-quoted string
        '|' +
        '(\')[^\']*(\'|$)' +    // 6, 7 = Single-quoted string
        '|' +
        // Positive lookahead to prevent interpretation of
        // <foo a= b=c> as <foo a='b=c'>
        // TODO(felix8a): might be able to drop this case
        '(?=[a-z][-\\w]*\\s*=)' +
        '|' +
        // Unquoted value that isn't an attribute name
        // (since we didn't match the positive lookahead above)
        '[^\"\'\\s]*' ) +
      ')' ) +
    ')?',
    'i');

  // false on IE<=8, true on most other browsers
  var splitWillCapture = ('a,b'.split(/(,)/).length === 3);

  // bitmask for tags with special parsing, like <script> and <textarea>
  var EFLAGS_TEXT = html4.eflags['CDATA'] | html4.eflags['RCDATA'];

  /**
   * Given a SAX-like event handler, produce a function that feeds those
   * events and a parameter to the event handler.
   *
   * The event handler has the form:{@code
   * {
   *   // Name is an upper-case HTML tag name.  Attribs is an array of
   *   // alternating upper-case attribute names, and attribute values.  The
   *   // attribs array is reused by the parser.  Param is the value passed to
   *   // the saxParser.
   *   startTag: function (name, attribs, param) { ... },
   *   endTag:   function (name, param) { ... },
   *   pcdata:   function (text, param) { ... },
   *   rcdata:   function (text, param) { ... },
   *   cdata:    function (text, param) { ... },
   *   startDoc: function (param) { ... },
   *   endDoc:   function (param) { ... }
   * }}
   *
   * @param {Object} handler a record containing event handlers.
   * @return {function(string, Object)} A function that takes a chunk of HTML
   *     and a parameter.  The parameter is passed on to the handler methods.
   */
  function makeSaxParser(handler) {
    // Accept quoted or unquoted keys (Closure compat)
    var hcopy = {
      cdata: handler.cdata || handler['cdata'],
      comment: handler.comment || handler['comment'],
      endDoc: handler.endDoc || handler['endDoc'],
      endTag: handler.endTag || handler['endTag'],
      pcdata: handler.pcdata || handler['pcdata'],
      rcdata: handler.rcdata || handler['rcdata'],
      startDoc: handler.startDoc || handler['startDoc'],
      startTag: handler.startTag || handler['startTag']
    };
    return function(htmlText, param) {
      return parse(htmlText, hcopy, param);
    };
  }

  // Parsing strategy is to split input into parts that might be lexically
  // meaningful (every ">" becomes a separate part), and then recombine
  // parts if we discover they're in a different context.

  // TODO(felix8a): Significant performance regressions from -legacy,
  // tested on
  //    Chrome 18.0
  //    Firefox 11.0
  //    IE 6, 7, 8, 9
  //    Opera 11.61
  //    Safari 5.1.3
  // Many of these are unusual patterns that are linearly slower and still
  // pretty fast (eg 1ms to 5ms), so not necessarily worth fixing.

  // TODO(felix8a): "<script> && && && ... <\/script>" is slower on all
  // browsers.  The hotspot is htmlSplit.

  // TODO(felix8a): "<p title='>>>>...'><\/p>" is slower on all browsers.
  // This is partly htmlSplit, but the hotspot is parseTagAndAttrs.

  // TODO(felix8a): "<a><\/a><a><\/a>..." is slower on IE9.
  // "<a>1<\/a><a>1<\/a>..." is faster, "<a><\/a>2<a><\/a>2..." is faster.

  // TODO(felix8a): "<p<p<p..." is slower on IE[6-8]

  var continuationMarker = {};
  function parse(htmlText, handler, param) {
    var m, p, tagName;
    var parts = htmlSplit(htmlText);
    var state = {
      noMoreGT: false,
      noMoreEndComments: false
    };
    parseCPS(handler, parts, 0, state, param);
  }

  function continuationMaker(h, parts, initial, state, param) {
    return function () {
      parseCPS(h, parts, initial, state, param);
    };
  }

  function parseCPS(h, parts, initial, state, param) {
    try {
      if (h.startDoc && initial == 0) { h.startDoc(param); }
      var m, p, tagName;
      for (var pos = initial, end = parts.length; pos < end;) {
        var current = parts[pos++];
        var next = parts[pos];
        switch (current) {
        case '&':
          if (ENTITY_RE_2.test(next)) {
            if (h.pcdata) {
              h.pcdata('&' + next, param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
            pos++;
          } else {
            if (h.pcdata) { h.pcdata("&amp;", param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          }
          break;
        case '<\/':
          if (m = /^([-\w:]+)[^\'\"]*/.exec(next)) {
            if (m[0].length === next.length && parts[pos + 1] === '>') {
              // fast case, no attribute parsing needed
              pos += 2;
              tagName = m[1].toLowerCase();
              if (h.endTag) {
                h.endTag(tagName, param, continuationMarker,
                  continuationMaker(h, parts, pos, state, param));
              }
            } else {
              // slow case, need to parse attributes
              // TODO(felix8a): do we really care about misparsing this?
              pos = parseEndTag(
                parts, pos, h, param, continuationMarker, state);
            }
          } else {
            if (h.pcdata) {
              h.pcdata('&lt;/', param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          }
          break;
        case '<':
          if (m = /^([-\w:]+)\s*\/?/.exec(next)) {
            if (m[0].length === next.length && parts[pos + 1] === '>') {
              // fast case, no attribute parsing needed
              pos += 2;
              tagName = m[1].toLowerCase();
              if (h.startTag) {
                h.startTag(tagName, [], param, continuationMarker,
                  continuationMaker(h, parts, pos, state, param));
              }
              // tags like <script> and <textarea> have special parsing
              var eflags = html4.ELEMENTS[tagName];
              if (eflags & EFLAGS_TEXT) {
                var tag = { name: tagName, next: pos, eflags: eflags };
                pos = parseText(
                  parts, tag, h, param, continuationMarker, state);
              }
            } else {
              // slow case, need to parse attributes
              pos = parseStartTag(
                parts, pos, h, param, continuationMarker, state);
            }
          } else {
            if (h.pcdata) {
              h.pcdata('&lt;', param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          }
          break;
        case '<\!--':
          // The pathological case is n copies of '<\!--' without '-->', and
          // repeated failure to find '-->' is quadratic.  We avoid that by
          // remembering when search for '-->' fails.
          if (!state.noMoreEndComments) {
            // A comment <\!--x--> is split into three tokens:
            //   '<\!--', 'x--', '>'
            // We want to find the next '>' token that has a preceding '--'.
            // pos is at the 'x--'.
            for (p = pos + 1; p < end; p++) {
              if (parts[p] === '>' && /--$/.test(parts[p - 1])) { break; }
            }
            if (p < end) {
              if (h.comment) {
                var comment = parts.slice(pos, p).join('');
                h.comment(
                  comment.substr(0, comment.length - 2), param,
                  continuationMarker,
                  continuationMaker(h, parts, p + 1, state, param));
              }
              pos = p + 1;
            } else {
              state.noMoreEndComments = true;
            }
          }
          if (state.noMoreEndComments) {
            if (h.pcdata) {
              h.pcdata('&lt;!--', param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          }
          break;
        case '<\!':
          if (!/^\w/.test(next)) {
            if (h.pcdata) {
              h.pcdata('&lt;!', param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          } else {
            // similar to noMoreEndComment logic
            if (!state.noMoreGT) {
              for (p = pos + 1; p < end; p++) {
                if (parts[p] === '>') { break; }
              }
              if (p < end) {
                pos = p + 1;
              } else {
                state.noMoreGT = true;
              }
            }
            if (state.noMoreGT) {
              if (h.pcdata) {
                h.pcdata('&lt;!', param, continuationMarker,
                  continuationMaker(h, parts, pos, state, param));
              }
            }
          }
          break;
        case '<?':
          // similar to noMoreEndComment logic
          if (!state.noMoreGT) {
            for (p = pos + 1; p < end; p++) {
              if (parts[p] === '>') { break; }
            }
            if (p < end) {
              pos = p + 1;
            } else {
              state.noMoreGT = true;
            }
          }
          if (state.noMoreGT) {
            if (h.pcdata) {
              h.pcdata('&lt;?', param, continuationMarker,
                continuationMaker(h, parts, pos, state, param));
            }
          }
          break;
        case '>':
          if (h.pcdata) {
            h.pcdata("&gt;", param, continuationMarker,
              continuationMaker(h, parts, pos, state, param));
          }
          break;
        case '':
          break;
        default:
          if (h.pcdata) {
            h.pcdata(current, param, continuationMarker,
              continuationMaker(h, parts, pos, state, param));
          }
          break;
        }
      }
      if (h.endDoc) { h.endDoc(param); }
    } catch (e) {
      if (e !== continuationMarker) { throw e; }
    }
  }

  // Split str into parts for the html parser.
  function htmlSplit(str) {
    // can't hoist this out of the function because of the re.exec loop.
    var re = /(<\/|<\!--|<[!?]|[&<>])/g;
    str += '';
    if (splitWillCapture) {
      return str.split(re);
    } else {
      var parts = [];
      var lastPos = 0;
      var m;
      while ((m = re.exec(str)) !== null) {
        parts.push(str.substring(lastPos, m.index));
        parts.push(m[0]);
        lastPos = m.index + m[0].length;
      }
      parts.push(str.substring(lastPos));
      return parts;
    }
  }

  function parseEndTag(parts, pos, h, param, continuationMarker, state) {
    var tag = parseTagAndAttrs(parts, pos);
    // drop unclosed tags
    if (!tag) { return parts.length; }
    if (h.endTag) {
      h.endTag(tag.name, param, continuationMarker,
        continuationMaker(h, parts, pos, state, param));
    }
    return tag.next;
  }

  function parseStartTag(parts, pos, h, param, continuationMarker, state) {
    var tag = parseTagAndAttrs(parts, pos);
    // drop unclosed tags
    if (!tag) { return parts.length; }
    if (h.startTag) {
      h.startTag(tag.name, tag.attrs, param, continuationMarker,
        continuationMaker(h, parts, tag.next, state, param));
    }
    // tags like <script> and <textarea> have special parsing
    if (tag.eflags & EFLAGS_TEXT) {
      return parseText(parts, tag, h, param, continuationMarker, state);
    } else {
      return tag.next;
    }
  }

  var endTagRe = {};

  // Tags like <script> and <textarea> are flagged as CDATA or RCDATA,
  // which means everything is text until we see the correct closing tag.
  function parseText(parts, tag, h, param, continuationMarker, state) {
    var end = parts.length;
    if (!endTagRe.hasOwnProperty(tag.name)) {
      endTagRe[tag.name] = new RegExp('^' + tag.name + '(?:[\\s\\/]|$)', 'i');
    }
    var re = endTagRe[tag.name];
    var first = tag.next;
    var p = tag.next + 1;
    for (; p < end; p++) {
      if (parts[p - 1] === '<\/' && re.test(parts[p])) { break; }
    }
    if (p < end) { p -= 1; }
    var buf = parts.slice(first, p).join('');
    if (tag.eflags & html4.eflags['CDATA']) {
      if (h.cdata) {
        h.cdata(buf, param, continuationMarker,
          continuationMaker(h, parts, p, state, param));
      }
    } else if (tag.eflags & html4.eflags['RCDATA']) {
      if (h.rcdata) {
        h.rcdata(normalizeRCData(buf), param, continuationMarker,
          continuationMaker(h, parts, p, state, param));
      }
    } else {
      throw new Error('bug');
    }
    return p;
  }

  // at this point, parts[pos-1] is either "<" or "<\/".
  function parseTagAndAttrs(parts, pos) {
    var m = /^([-\w:]+)/.exec(parts[pos]);
    var tag = {};
    tag.name = m[1].toLowerCase();
    tag.eflags = html4.ELEMENTS[tag.name];
    var buf = parts[pos].substr(m[0].length);
    // Find the next '>'.  We optimistically assume this '>' is not in a
    // quoted context, and further down we fix things up if it turns out to
    // be quoted.
    var p = pos + 1;
    var end = parts.length;
    for (; p < end; p++) {
      if (parts[p] === '>') { break; }
      buf += parts[p];
    }
    if (end <= p) { return void 0; }
    var attrs = [];
    while (buf !== '') {
      m = ATTR_RE.exec(buf);
      if (!m) {
        // No attribute found: skip garbage
        buf = buf.replace(/^[\s\S][^a-z\s]*/, '');

      } else if ((m[4] && !m[5]) || (m[6] && !m[7])) {
        // Unterminated quote: slurp to the next unquoted '>'
        var quote = m[4] || m[6];
        var sawQuote = false;
        var abuf = [buf, parts[p++]];
        for (; p < end; p++) {
          if (sawQuote) {
            if (parts[p] === '>') { break; }
          } else if (0 <= parts[p].indexOf(quote)) {
            sawQuote = true;
          }
          abuf.push(parts[p]);
        }
        // Slurp failed: lose the garbage
        if (end <= p) { break; }
        // Otherwise retry attribute parsing
        buf = abuf.join('');
        continue;

      } else {
        // We have an attribute
        var aName = m[1].toLowerCase();
        var aValue = m[2] ? decodeValue(m[3]) : '';
        attrs.push(aName, aValue);
        buf = buf.substr(m[0].length);
      }
    }
    tag.attrs = attrs;
    tag.next = p + 1;
    return tag;
  }

  function decodeValue(v) {
    var q = v.charCodeAt(0);
    if (q === 0x22 || q === 0x27) { // " or '
      v = v.substr(1, v.length - 2);
    }
    return unescapeEntities(stripNULs(v));
  }

  /**
   * Returns a function that strips unsafe tags and attributes from html.
   * @param {function(string, Array.<string>): ?Array.<string>} tagPolicy
   *     A function that takes (tagName, attribs[]), where tagName is a key in
   *     html4.ELEMENTS and attribs is an array of alternating attribute names
   *     and values.  It should return a record (as follows), or null to delete
   *     the element.  It's okay for tagPolicy to modify the attribs array,
   *     but the same array is reused, so it should not be held between calls.
   *     Record keys:
   *        attribs: (required) Sanitized attributes array.
   *        tagName: Replacement tag name.
   * @return {function(string, Array)} A function that sanitizes a string of
   *     HTML and appends result strings to the second argument, an array.
   */
  function makeHtmlSanitizer(tagPolicy) {
    var stack;
    var ignoring;
    var emit = function (text, out) {
      if (!ignoring) { out.push(text); }
    };
    return makeSaxParser({
      'startDoc': function(_) {
        stack = [];
        ignoring = false;
      },
      'startTag': function(tagNameOrig, attribs, out) {
        if (ignoring) { return; }
        if (!html4.ELEMENTS.hasOwnProperty(tagNameOrig)) { return; }
        var eflagsOrig = html4.ELEMENTS[tagNameOrig];
        if (eflagsOrig & html4.eflags['FOLDABLE']) {
          return;
        }

        var decision = tagPolicy(tagNameOrig, attribs);
        if (!decision) {
          ignoring = !(eflagsOrig & html4.eflags['EMPTY']);
          return;
        } else if (typeof decision !== 'object') {
          throw new Error('tagPolicy did not return object (old API?)');
        }
        if ('attribs' in decision) {
          attribs = decision['attribs'];
        } else {
          throw new Error('tagPolicy gave no attribs');
        }
        var eflagsRep;
        var tagNameRep;
        if ('tagName' in decision) {
          tagNameRep = decision['tagName'];
          eflagsRep = html4.ELEMENTS[tagNameRep];
        } else {
          tagNameRep = tagNameOrig;
          eflagsRep = eflagsOrig;
        }
        // TODO(mikesamuel): relying on tagPolicy not to insert unsafe
        // attribute names.

        // If this is an optional-end-tag element and either this element or its
        // previous like sibling was rewritten, then insert a close tag to
        // preserve structure.
        if (eflagsOrig & html4.eflags['OPTIONAL_ENDTAG']) {
          var onStack = stack[stack.length - 1];
          if (onStack && onStack.orig === tagNameOrig &&
              (onStack.rep !== tagNameRep || tagNameOrig !== tagNameRep)) {
                out.push('<\/', onStack.rep, '>');
          }
        }

        if (!(eflagsOrig & html4.eflags['EMPTY'])) {
          stack.push({orig: tagNameOrig, rep: tagNameRep});
        }

        out.push('<', tagNameRep);
        for (var i = 0, n = attribs.length; i < n; i += 2) {
          var attribName = attribs[i],
              value = attribs[i + 1];
          if (value !== null && value !== void 0) {
            out.push(' ', attribName, '="', escapeAttrib(value), '"');
          }
        }
        out.push('>');

        if ((eflagsOrig & html4.eflags['EMPTY'])
            && !(eflagsRep & html4.eflags['EMPTY'])) {
          // replacement is non-empty, synthesize end tag
          out.push('<\/', tagNameRep, '>');
        }
      },
      'endTag': function(tagName, out) {
        if (ignoring) {
          ignoring = false;
          return;
        }
        if (!html4.ELEMENTS.hasOwnProperty(tagName)) { return; }
        var eflags = html4.ELEMENTS[tagName];
        if (!(eflags & (html4.eflags['EMPTY'] | html4.eflags['FOLDABLE']))) {
          var index;
          if (eflags & html4.eflags['OPTIONAL_ENDTAG']) {
            for (index = stack.length; --index >= 0;) {
              var stackElOrigTag = stack[index].orig;
              if (stackElOrigTag === tagName) { break; }
              if (!(html4.ELEMENTS[stackElOrigTag] &
                    html4.eflags['OPTIONAL_ENDTAG'])) {
                // Don't pop non optional end tags looking for a match.
                return;
              }
            }
          } else {
            for (index = stack.length; --index >= 0;) {
              if (stack[index].orig === tagName) { break; }
            }
          }
          if (index < 0) { return; }  // Not opened.
          for (var i = stack.length; --i > index;) {
            var stackElRepTag = stack[i].rep;
            if (!(html4.ELEMENTS[stackElRepTag] &
                  html4.eflags['OPTIONAL_ENDTAG'])) {
              out.push('<\/', stackElRepTag, '>');
            }
          }
          if (index < stack.length) {
            tagName = stack[index].rep;
          }
          stack.length = index;
          out.push('<\/', tagName, '>');
        }
      },
      'pcdata': emit,
      'rcdata': emit,
      'cdata': emit,
      'endDoc': function(out) {
        for (; stack.length; stack.length--) {
          out.push('<\/', stack[stack.length - 1].rep, '>');
        }
      }
    });
  }

  var ALLOWED_URI_SCHEMES = /^(?:https?|mailto|data)$/i;

  function safeUri(uri, effect, ltype, hints, naiveUriRewriter) {
    if (!naiveUriRewriter) { return null; }
    try {
      var parsed = URI.parse('' + uri);
      if (parsed) {
        if (!parsed.hasScheme() ||
            ALLOWED_URI_SCHEMES.test(parsed.getScheme())) {
          var safe = naiveUriRewriter(parsed, effect, ltype, hints);
          return safe ? safe.toString() : null;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function log(logger, tagName, attribName, oldValue, newValue) {
    if (!attribName) {
      logger(tagName + " removed", {
        change: "removed",
        tagName: tagName
      });
    }
    if (oldValue !== newValue) {
      var changed = "changed";
      if (oldValue && !newValue) {
        changed = "removed";
      } else if (!oldValue && newValue)  {
        changed = "added";
      }
      logger(tagName + "." + attribName + " " + changed, {
        change: changed,
        tagName: tagName,
        attribName: attribName,
        oldValue: oldValue,
        newValue: newValue
      });
    }
  }

  function lookupAttribute(map, tagName, attribName) {
    var attribKey;
    attribKey = tagName + '::' + attribName;
    if (map.hasOwnProperty(attribKey)) {
      return map[attribKey];
    }
    attribKey = '*::' + attribName;
    if (map.hasOwnProperty(attribKey)) {
      return map[attribKey];
    }
    return void 0;
  }
  function getAttributeType(tagName, attribName) {
    return lookupAttribute(html4.ATTRIBS, tagName, attribName);
  }
  function getLoaderType(tagName, attribName) {
    return lookupAttribute(html4.LOADERTYPES, tagName, attribName);
  }
  function getUriEffect(tagName, attribName) {
    return lookupAttribute(html4.URIEFFECTS, tagName, attribName);
  }

  /**
   * Sanitizes attributes on an HTML tag.
   * @param {string} tagName An HTML tag name in lowercase.
   * @param {Array.<?string>} attribs An array of alternating names and values.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes; it can return a new string value, or null to
   *     delete the attribute.  If unspecified, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes; it can return a new string value, or null to delete
   *     the attribute.  If unspecified, these attributes are kept unchanged.
   * @return {Array.<?string>} The sanitized attributes as a list of alternating
   *     names and values, where a null value means to omit the attribute.
   */
  function sanitizeAttribs(tagName, attribs,
    opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    // TODO(felix8a): it's obnoxious that domado duplicates much of this
    // TODO(felix8a): maybe consistently enforce constraints like target=
    for (var i = 0; i < attribs.length; i += 2) {
      var attribName = attribs[i];
      var value = attribs[i + 1];
      var oldValue = value;
      var atype = null, attribKey;
      if ((attribKey = tagName + '::' + attribName,
           html4.ATTRIBS.hasOwnProperty(attribKey)) ||
          (attribKey = '*::' + attribName,
           html4.ATTRIBS.hasOwnProperty(attribKey))) {
        atype = html4.ATTRIBS[attribKey];
      }
      if (atype !== null) {
        switch (atype) {
          case html4.atype['NONE']: break;
          case html4.atype['SCRIPT']:
            value = null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['STYLE']:
            if ('undefined' === typeof parseCssDeclarations) {
              value = null;
              if (opt_logger) {
                log(opt_logger, tagName, attribName, oldValue, value);
	      }
              break;
            }
            var sanitizedDeclarations = [];
            parseCssDeclarations(
                value,
                {
                  declaration: function (property, tokens) {
                    var normProp = property.toLowerCase();
                    var schema = cssSchema[normProp];
                    if (!schema) {
                      return;
                    }
                    sanitizeCssProperty(
                        normProp, schema, tokens,
                        opt_naiveUriRewriter
                        ? function (url) {
                            return safeUri(
                                url, html4.ueffects.SAME_DOCUMENT,
                                html4.ltypes.SANDBOXED,
                                {
                                  "TYPE": "CSS",
                                  "CSS_PROP": normProp
                                }, opt_naiveUriRewriter);
                          }
                        : null);
                    sanitizedDeclarations.push(property + ': ' + tokens.join(' '));
                  }
                });
            value = sanitizedDeclarations.length > 0 ?
              sanitizedDeclarations.join(' ; ') : null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['ID']:
          case html4.atype['IDREF']:
          case html4.atype['IDREFS']:
          case html4.atype['GLOBAL_NAME']:
          case html4.atype['LOCAL_NAME']:
          case html4.atype['CLASSES']:
            value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['URI']:
            value = safeUri(value,
              getUriEffect(tagName, attribName),
              getLoaderType(tagName, attribName),
              {
                "TYPE": "MARKUP",
                "XML_ATTR": attribName,
                "XML_TAG": tagName
              }, opt_naiveUriRewriter);
              if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          case html4.atype['URI_FRAGMENT']:
            if (value && '#' === value.charAt(0)) {
              value = value.substring(1);  // remove the leading '#'
              value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) : value;
              if (value !== null && value !== void 0) {
                value = '#' + value;  // restore the leading '#'
              }
            } else {
              value = null;
            }
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
          default:
            value = null;
            if (opt_logger) {
              log(opt_logger, tagName, attribName, oldValue, value);
            }
            break;
        }
      } else {
        value = null;
        if (opt_logger) {
          log(opt_logger, tagName, attribName, oldValue, value);
        }
      }
      attribs[i + 1] = value;
    }
    return attribs;
  }

  /**
   * Creates a tag policy that omits all tags marked UNSAFE in html4-defs.js
   * and applies the default attribute sanitizer with the supplied policy for
   * URI attributes and NMTOKEN attributes.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes.  If not given, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes.  If not given, such attributes are left unchanged.
   * @return {function(string, Array.<?string>)} A tagPolicy suitable for
   *     passing to html.sanitize.
   */
  function makeTagPolicy(
    opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    return function(tagName, attribs) {
      if (!(html4.ELEMENTS[tagName] & html4.eflags['UNSAFE'])) {
        return {
          'attribs': sanitizeAttribs(tagName, attribs,
            opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger)
        };
      } else {
        if (opt_logger) {
          log(opt_logger, tagName, undefined, undefined, undefined);
        }
      }
    };
  }

  /**
   * Sanitizes HTML tags and attributes according to a given policy.
   * @param {string} inputHtml The HTML to sanitize.
   * @param {function(string, Array.<?string>)} tagPolicy A function that
   *     decides which tags to accept and sanitizes their attributes (see
   *     makeHtmlSanitizer above for details).
   * @return {string} The sanitized HTML.
   */
  function sanitizeWithPolicy(inputHtml, tagPolicy) {
    var outputArray = [];
    makeHtmlSanitizer(tagPolicy)(inputHtml, outputArray);
    return outputArray.join('');
  }

  /**
   * Strips unsafe tags and attributes from HTML.
   * @param {string} inputHtml The HTML to sanitize.
   * @param {?function(?string): ?string} opt_naiveUriRewriter A transform to
   *     apply to URI attributes.  If not given, URI attributes are deleted.
   * @param {function(?string): ?string} opt_nmTokenPolicy A transform to apply
   *     to attributes containing HTML names, element IDs, and space-separated
   *     lists of classes.  If not given, such attributes are left unchanged.
   */
  function sanitize(inputHtml,
    opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger) {
    var tagPolicy = makeTagPolicy(
      opt_naiveUriRewriter, opt_nmTokenPolicy, opt_logger);
    return sanitizeWithPolicy(inputHtml, tagPolicy);
  }

  // Export both quoted and unquoted names for Closure linkage.
  var html = {};
  html.escapeAttrib = html['escapeAttrib'] = escapeAttrib;
  html.makeHtmlSanitizer = html['makeHtmlSanitizer'] = makeHtmlSanitizer;
  html.makeSaxParser = html['makeSaxParser'] = makeSaxParser;
  html.makeTagPolicy = html['makeTagPolicy'] = makeTagPolicy;
  html.normalizeRCData = html['normalizeRCData'] = normalizeRCData;
  html.sanitize = html['sanitize'] = sanitize;
  html.sanitizeAttribs = html['sanitizeAttribs'] = sanitizeAttribs;
  html.sanitizeWithPolicy = html['sanitizeWithPolicy'] = sanitizeWithPolicy;
  html.unescapeEntities = html['unescapeEntities'] = unescapeEntities;
  return html;
})(html4);

var html_sanitize = html['sanitize'];

// Loosen restrictions of Caja's
// html-sanitizer to allow for styling
html4.ATTRIBS['*::style'] = 0;
html4.ELEMENTS['style'] = 0;
html4.ATTRIBS['a::target'] = 0;
html4.ELEMENTS['video'] = 0;
html4.ATTRIBS['video::src'] = 0;
html4.ATTRIBS['video::poster'] = 0;
html4.ATTRIBS['video::controls'] = 0;
html4.ELEMENTS['audio'] = 0;
html4.ATTRIBS['audio::src'] = 0;
html4.ATTRIBS['video::autoplay'] = 0;
html4.ATTRIBS['video::controls'] = 0;

if (typeof module !== 'undefined') {
    module.exports = html_sanitize;
}

},{}],17:[function(require,module,exports){
'use strict';

var config = require('./config');

// Return the base url of a specific version of MapBox's API.
//
// `hash`, if provided must be a number and is used to distribute requests
// against multiple `CNAME`s in order to avoid connection limits in browsers
module.exports = {
    isSSL: function() {
        return 'https:' === document.location.protocol || config.FORCE_HTTPS;
    },
    base: function(hash) {
        // By default, use public HTTP urls
        // Support HTTPS if the user has specified HTTPS urls to use, and this
        // page is under HTTPS
        var urls = this.isSSL() ? config.HTTPS_URLS : config.HTTP_URLS;
        if (hash === undefined || typeof hash !== 'number') {
            return urls[0];
        } else {
            return urls[hash % urls.length];
        }
    },
    // Requests that contain URLs need a secure flag appended
    // to their URLs so that the server knows to send SSL-ified
    // resource references.
    secureFlag: function(url) {
        if (!this.isSSL()) return url;
        else if (url.match(/(\?|&)secure/)) return url;
        else if (url.indexOf('?') !== -1) return url + '&secure';
        else return url + '?secure';
    },
    // Convert a JSONP url to a JSON URL. (MapBox TileJSON sometimes hardcodes JSONP.)
    jsonify: function(url) {
        return url.replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
    }
};

},{"./config":2}],5:[function(require,module,exports){
'use strict';

var url = require('./url'),
    sanitize = require('sanitize-caja');

// mapbox-related markers functionality
// provide an icon from mapbox's simple-style spec and hosted markers
// service
function icon(fp) {
    fp = fp || {};

    var sizes = {
            small: [20, 50],
            medium: [30, 70],
            large: [35, 90]
        },
        size = fp['marker-size'] || 'medium',
        symbol = (fp['marker-symbol']) ? '-' + fp['marker-symbol'] : '',
        color = (fp['marker-color'] || '7e7e7e').replace('#', '');

    return L.icon({
        iconUrl: url.base() + 'marker/' +
            'pin-' + size.charAt(0) + symbol + '+' + color +
            // detect and use retina markers, which are x2 resolution
            ((L.Browser.retina) ? '@2x' : '') + '.png',
        iconSize: sizes[size],
        iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
        popupAnchor: [0, -sizes[size][1] / 2]
    });
}

// a factory that provides markers for Leaflet from MapBox's
// [simple-style specification](https://github.com/mapbox/simplestyle-spec)
// and [Markers API](http://mapbox.com/developers/api/#markers).
function style(f, latlon) {
    return L.marker(latlon, {
        icon: icon(f.properties),
        title: (f.properties && f.properties.title) || ''
    });
}

function createPopup(f, sanitizer) {
    if (!f || !f.properties) return '';
    var popup = '';

    if (f.properties.title) {
        popup += '<div class="marker-title">' + f.properties.title + '</div>';
    }

    if (f.properties.description) {
        popup += '<div class="marker-description">' + f.properties.description + '</div>';
    }

    return (sanitizer || sanitize)(popup);
}

module.exports = {
    icon: icon,
    style: style,
    createPopup: createPopup
};

},{"./url":17,"sanitize-caja":14}],8:[function(require,module,exports){
'use strict';

var LegendControl = L.Control.extend({

    options: {
        position: 'bottomright',
        sanitizer: require('sanitize-caja')
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._legends = {};
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'map-legends wax-legends');
        L.DomEvent.disableClickPropagation(this._container);

        this._update();

        return this._container;
    },

    addLegend: function(text) {
        if (!text) { return this; }

        if (!this._legends[text]) {
            this._legends[text] = 0;
        }

        this._legends[text]++;
        return this._update();
    },

    removeLegend: function(text) {
        if (!text) { return this; }
        if (this._legends[text]) this._legends[text]--;
        return this._update();
    },

    _update: function() {
        if (!this._map) { return this; }

        this._container.innerHTML = '';
        var hide = 'none';

        for (var i in this._legends) {
            if (this._legends.hasOwnProperty(i) && this._legends[i]) {
                var div = this._container.appendChild(document.createElement('div'));
                div.className = 'map-legend wax-legend';
                div.innerHTML = this.options.sanitizer(i);
                hide = 'block';
            }
        }

        // hide the control entirely unless there is at least one legend;
        // otherwise there will be a small grey blemish on the map.
        this._container.style.display = hide;

        return this;
    }
});

module.exports = function(options) {
    return new LegendControl(options);
};

},{"sanitize-caja":14}],19:[function(require,module,exports){
'use strict';

var request = require('./request'),
    url = require('./url'),
    util = require('./util');

module.exports = {
    _loadTileJSON: function(_) {
        if (typeof _ === 'string') {
            if (_.indexOf('/') == -1) {
                _ = url.base() + _ + '.json';
            }

            request(url.secureFlag(_), L.bind(function(err, json) {
                if (err) {
                    util.log('could not load TileJSON at ' + _);
                    this.fire('error', {error: err});
                } else if (json) {
                    this._setTileJSON(json);
                    this.fire('ready');
                }
            }, this));
        } else if (_ && typeof _ === 'object') {
            this._setTileJSON(_);
        }
    }
};

},{"./request":18,"./url":17,"./util":16}],10:[function(require,module,exports){
'use strict';

var util = require('./util'),
    Mustache = require('mustache');

var GridControl = L.Control.extend({

    options: {
        pinnable: true,
        follow: false,
        sanitizer: require('sanitize-caja'),
        touchTeaser: true,
        location: true
    },

    _currentContent: '',

    // pinned means that this control is on a feature and the user has likely
    // clicked. pinned will not become false unless the user clicks off
    // of the feature onto another or clicks x
    _pinned: false,

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        util.strict_instance(_, L.Class, 'L.mapbox.gridLayer');
        this._layer = _;
    },

    setTemplate: function(template) {
        this.options.template = template;
    },

    _template: function(format, data) {
        if (!data) return;
        var template = this.options.template || this._layer.getTileJSON().template;
        if (template) {
            var d = {};
            d['__' + format + '__'] = true;
            return this.options.sanitizer(
                Mustache.to_html(template, L.extend(d, data)));
        }
    },

    // change the content of the tooltip HTML if it has changed, otherwise
    // noop
    _show: function(content, o) {
        if (content === this._currentContent) return;

        this._currentContent = content;

        if (this.options.follow) {
            this._popup.setContent(content)
                .setLatLng(o.latLng);
            if (this._map._popup !== this._popup) this._popup.openOn(this._map);
        } else {
            this._container.style.display = 'block';
            this._contentWrapper.innerHTML = content;
        }
    },

    _hide: function() {
        this._pinned = false;
        this._currentContent = '';

        this._map.closePopup();
        this._container.style.display = 'none';
        this._contentWrapper.innerHTML = '';

        L.DomUtil.removeClass(this._container, 'closable');
    },

    _mouseover: function(o) {
        if (o.data) {
            L.DomUtil.addClass(this._map._container, 'map-clickable');
        } else {
            L.DomUtil.removeClass(this._map._container, 'map-clickable');
        }

        if (this._pinned) return;

        var content = this._template('teaser', o.data);
        if (content) {
            this._show(content, o);
        } else {
            this._hide();
        }
    },

    _mousemove: function(o) {
        if (this._pinned) return;
        if (!this.options.follow) return;

        this._popup.setLatLng(o.latLng);
    },

    _navigateTo: function(url) {
        window.top.location.href = url;
    },

    _click: function(o) {

        var location_formatted = this._template('location', o.data);
        if (this.options.location && location_formatted &&
            location_formatted.search(/^https?:/) === 0) {
            return this._navigateTo(this._template('location', o.data));
        }

        if (!this.options.pinnable) return;

        var content = this._template('full', o.data);

        if (!content && this.options.touchTeaser && L.Browser.touch) {
            content = this._template('teaser', o.data);
        }

        if (content) {
            L.DomUtil.addClass(this._container, 'closable');
            this._pinned = true;
            this._show(content, o);
        } else if (this._pinned) {
            L.DomUtil.removeClass(this._container, 'closable');
            this._pinned = false;
            this._hide();
        }
    },

    _onPopupClose: function() {
        this._currentContent = null;
        this._pinned = false;
    },

    _createClosebutton: function(container, fn) {
        var link = L.DomUtil.create('a', 'close', container);

        link.innerHTML = 'close';
        link.href = '#';
        link.title = 'close';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, this);

        return link;
    },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-grid map-tooltip',
            container = L.DomUtil.create('div', className),
            contentWrapper = L.DomUtil.create('div', 'map-tooltip-content');

        // hide the container element initially
        container.style.display = 'none';
        this._createClosebutton(container, this._hide);
        container.appendChild(contentWrapper);

        this._contentWrapper = contentWrapper;
        this._popup = new L.Popup({ autoPan: false, closeOnClick: false });

        map.on('popupclose', this._onPopupClose, this);

        L.DomEvent
            .disableClickPropagation(container)
            // allow people to scroll tooltips with mousewheel
            .addListener(container, 'mousewheel', L.DomEvent.stopPropagation);

        this._layer
            .on('mouseover', this._mouseover, this)
            .on('mousemove', this._mousemove, this)
            .on('click', this._click, this);

        return container;
    },

    onRemove: function (map) {

        map.off('popupclose', this._onPopupClose, this);

        this._layer
            .off('mouseover', this._mouseover, this)
            .off('mousemove', this._mousemove, this)
            .off('click', this._click, this);
    }
});

module.exports = function(_, options) {
    return new GridControl(_, options);
};

},{"./util":16,"mustache":15,"sanitize-caja":14}],12:[function(require,module,exports){
'use strict';

var util = require('./util');
var urlhelper = require('./url');
var request = require('./request');
var marker = require('./marker');

// # markerLayer
//
// A layer of markers, loaded from MapBox or else. Adds the ability
// to reset markers, filter them, and load them from a GeoJSON URL.
var MarkerLayer = L.FeatureGroup.extend({
    options: {
        filter: function() { return true; },
        sanitizer: require('sanitize-caja')
    },

    initialize: function(_, options) {
        L.setOptions(this, options);

        this._layers = {};

        if (typeof _ === 'string') {
            util.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.setGeoJSON(_);
        }
    },

    setGeoJSON: function(_) {
        this._geojson = _;
        this.clearLayers();
        this._initialize(_);
    },

    getGeoJSON: function() {
        return this._geojson;
    },

    loadURL: function(url) {
        if (this._request && 'abort' in this._request) this._request.abort();
        url = urlhelper.jsonify(url);
        this._request = request(url, L.bind(function(err, json) {
            this._request = null;
            if (err && err.type !== 'abort') {
                util.log('could not load markers at ' + url);
                this.fire('error', {error: err});
            } else if (json) {
                this.setGeoJSON(json);
                this.fire('ready');
            }
        }, this));
        return this;
    },

    loadID: function(id) {
        return this.loadURL(urlhelper.base() + id + '/markers.geojson');
    },

    setFilter: function(_) {
        this.options.filter = _;
        if (this._geojson) {
            this.clearLayers();
            this._initialize(this._geojson);
        }
        return this;
    },

    getFilter: function() {
        return this.options.filter;
    },

    _initialize: function(json) {
        var features = L.Util.isArray(json) ? json : json.features,
            i, len;

        if (features) {
            for (i = 0, len = features.length; i < len; i++) {
                // Only add this if geometry or geometries are set and not null
                if (features[i].geometries || features[i].geometry || features[i].features) {
                    this._initialize(features[i]);
                }
            }
        } else if (this.options.filter(json)) {

            var layer = L.GeoJSON.geometryToLayer(json, marker.style),
                popupHtml = marker.createPopup(json, this.options.sanitizer);

            layer.feature = json;

            if (popupHtml) {
                layer.bindPopup(popupHtml, {
                    closeButton: false
                });
            }

            this.addLayer(layer);
        }
    }
});

module.exports = function(_, options) {
    return new MarkerLayer(_, options);
};

},{"./marker":5,"./request":18,"./url":17,"./util":16,"sanitize-caja":14}],18:[function(require,module,exports){
var corslite = require('corslite'),
    JSON3 = require('json3'),
    strict = require('./util').strict;

module.exports = function(url, callback) {
    'use strict';
    strict(url, 'string');
    strict(callback, 'function');
    return corslite(url, onload);
    function onload(err, resp) {
        if (!err && resp) {
            // hardcoded grid response
            if (resp.responseText[0] == 'g') {
                resp = JSON3.parse(resp.responseText
                    .substring(5, resp.responseText.length - 2));
            } else {
                resp = JSON3.parse(resp.responseText);
            }
        }
        callback(err, resp);
    }
};

},{"./util":16,"corslite":22,"json3":23}],22:[function(require,module,exports){
function xhr(url, callback, cors) {
    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.domain +
                (location.port ? ':' + location.port : ''));
    }

    var x;

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    if (cors && (
        // IE7-9 Quirks & Compatibility
        typeof window.XDomainRequest === 'object' ||
        // IE9 Standards mode
        typeof window.XDomainRequest === 'function'
    )) {
        // IE8-10
        x = new window.XDomainRequest();

        // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472
        var original = callback;
        callback = function() {
            if (sent) {
                original.apply(this, arguments);
            } else {
                var that = this, args = arguments;
                setTimeout(function() {
                    original.apply(that, args);
                }, 0);
            }
        }
    } else {
        x = new window.XMLHttpRequest();
    }

    function loaded() {
        if (
            // XDomainRequest
            x.status === undefined ||
            // modern browsers
            isSuccessful(x.status)) callback.call(x, null, x);
        else callback.call(x, x, null);
    }

    // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
    // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
    if ('onload' in x) {
        x.onload = loaded;
    } else {
        x.onreadystatechange = function readystate() {
            if (x.readyState === 4) {
                loaded();
            }
        };
    }

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function() { };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function() { };

    x.ontimeout = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    x.onabort = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    x.send(null);
    sent = true;

    return x;
}

if (typeof module !== 'undefined') module.exports = xhr;

},{}],23:[function(require,module,exports){
/*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function (window) {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;

  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd, JSON3 = typeof exports == "object" && exports;

  if (JSON3 || isLoader) {
    if (typeof JSON == "object" && JSON) {
      // Delegate to the native `stringify` and `parse` implementations in
      // asynchronous module loaders and CommonJS environments.
      if (JSON3) {
        JSON3.stringify = JSON.stringify;
        JSON3.parse = JSON.parse;
      } else {
        JSON3 = JSON;
      }
    } else if (isLoader) {
      JSON3 = window.JSON = {};
    }
  } else {
    // Export for web browsers and JavaScript engines.
    JSON3 = window.JSON || (window.JSON = {});
  }

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292);
  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name) {
    if (name == "bug-string-char-index") {
      // IE <= 7 doesn't support accessing string characters using square
      // bracket notation. IE 8 only supports this for primitives.
      return "a"[0] != "a";
    }
    var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}', isAll = name == "json";
    if (isAll || name == "json-stringify" || name == "json-parse") {
      // Test `JSON.stringify`.
      if (name == "json-stringify" || isAll) {
        var stringify = JSON3.stringify, stringifySupported = typeof stringify == "function" && isExtended;
        if (stringifySupported) {
          // A test function object with a custom `toJSON` method.
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              stringify(new Number()) === "0" &&
              stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              stringify(value) === "1" &&
              stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
              // of Firefox also allow trailing commas in JSON objects and arrays.
              // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              stringify(null, value) === "1" &&
              stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        if (!isAll) {
          return stringifySupported;
        }
      }
      // Test `JSON.parse`.
      if (name == "json-parse" || isAll) {
        var parse = JSON3.parse;
        if (typeof parse == "function") {
          try {
            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if (parse("0") === 0 && !parse(false)) {
              // Simple parsing test.
              value = parse(serialized);
              var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
              if (parseSupported) {
                try {
                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !parse('"\t"');
                } catch (exception) {}
                if (parseSupported) {
                  try {
                    // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                    // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                    // allow certain octal literals.
                    parseSupported = parse("01") !== 1;
                  } catch (exception) {}
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        if (!isAll) {
          return parseSupported;
        }
      }
      return stringifySupported && parseSupported;
    }
  }

  if (!has("json")) {
    // Common `[[Class]]` name aliases.
    var functionClass = "[object Function]";
    var dateClass = "[object Date]";
    var numberClass = "[object Number]";
    var stringClass = "[object String]";
    var arrayClass = "[object Array]";
    var booleanClass = "[object Boolean]";

    // Detect incomplete support for accessing string characters by index.
    var charIndexBuggy = has("bug-string-char-index");

    // Define additional utility methods if the `Date` methods are buggy.
    if (!isExtended) {
      var floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      var getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }

    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: A set of primitive types used by `isHostType`.
    var PrimitiveTypes = {
      'boolean': 1,
      'number': 1,
      'string': 1,
      'undefined': 1
    };

    // Internal: Determines if the given object `property` value is a
    // non-primitive.
    var isHostType = function (object, property) {
      var type = typeof object[property];
      return type == 'object' ? !!object[property] : !PrimitiveTypes[type];
    };

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property, forEach;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, length;
          var hasProperty = !isFunction && typeof object.constructor != 'function' && isHostType(object, 'hasOwnProperty') ? object.hasOwnProperty : isProperty;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == functionClass, property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == functionClass, property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!has("json-stringify")) {
      // Internal: A map of control characters and their escaped equivalents.
      var Escapes = {
        92: "\\\\",
        34: '\\"',
        8: "\\b",
        12: "\\f",
        10: "\\n",
        13: "\\r",
        9: "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      var leadingZeroes = "000000";
      var toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return (leadingZeroes + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      var unicodePrefix = "\\u00";
      var quote = function (value) {
        var result = '"', index = 0, length = value.length, isLarge = length > 10 && charIndexBuggy, symbols;
        if (isLarge) {
          symbols = value.split("");
        }
        for (; index < length; index++) {
          var charCode = value.charCodeAt(index);
          // If the character is a control character, append its Unicode or
          // shorthand escape sequence; otherwise, append the character as-is.
          switch (charCode) {
            case 8: case 9: case 10: case 12: case 13: case 34: case 92:
              result += Escapes[charCode];
              break;
            default:
              if (charCode < 32) {
                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                break;
              }
              result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index];
          }
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value = object[property], className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, hasMembers, result;
        try {
          // Necessary for host object support.
          value = object[property];
        } catch (exception) {}
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == dateClass && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == booleanClass) {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == numberClass) {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == stringClass) {
          // Strings are double-quoted and escaped.
          return quote("" + value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == arrayClass) {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; hasMembers || (hasMembers = true), index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            result = hasMembers ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
              hasMembers || (hasMembers = true);
            });
            result = hasMembers ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if (getClass.call(filter) == functionClass) {
            callback = filter;
          } else if (getClass.call(filter) == arrayClass) {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((getClass.call(value) == stringClass || getClass.call(value) == numberClass) && (properties[value] = 1)));
          }
        }
        if (width) {
          if (getClass.call(width) == numberClass) {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (getClass.call(width) == stringClass) {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!has("json-parse")) {
      var fromCharCode = String.fromCharCode;

      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      var Unescapes = {
        92: "\\",
        34: '"',
        47: "/",
        98: "\b",
        116: "\t",
        110: "\n",
        102: "\f",
        114: "\r"
      };

      // Internal: Stores the parser state.
      var Index, Source;

      // Internal: Resets the parser state and throws a `SyntaxError`.
      var abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      var lex = function () {
        var source = Source, length = source.length, value, begin, position, isSigned, charCode;
        while (Index < length) {
          charCode = source.charCodeAt(Index);
          switch (charCode) {
            case 9: case 10: case 13: case 32:
              // Skip whitespace tokens, including tabs, carriage returns, line
              // feeds, and space characters.
              Index++;
              break;
            case 123: case 125: case 91: case 93: case 58: case 44:
              // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
              // the current position.
              value = charIndexBuggy ? source.charAt(Index) : source[Index];
              Index++;
              return value;
            case 34:
              // `"` delimits a JSON string; advance to the next character and
              // begin parsing the string. String tokens are prefixed with the
              // sentinel `@` character to distinguish them from punctuators and
              // end-of-string tokens.
              for (value = "@", Index++; Index < length;) {
                charCode = source.charCodeAt(Index);
                if (charCode < 32) {
                  // Unescaped ASCII control characters (those with a code unit
                  // less than the space character) are not permitted.
                  abort();
                } else if (charCode == 92) {
                  // A reverse solidus (`\`) marks the beginning of an escaped
                  // control character (including `"`, `\`, and `/`) or Unicode
                  // escape sequence.
                  charCode = source.charCodeAt(++Index);
                  switch (charCode) {
                    case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                      // Revive escaped control characters.
                      value += Unescapes[charCode];
                      Index++;
                      break;
                    case 117:
                      // `\u` marks the beginning of a Unicode escape sequence.
                      // Advance to the first character and validate the
                      // four-digit code point.
                      begin = ++Index;
                      for (position = Index + 4; Index < position; Index++) {
                        charCode = source.charCodeAt(Index);
                        // A valid sequence comprises four hexdigits (case-
                        // insensitive) that form a single hexadecimal value.
                        if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                          // Invalid Unicode escape sequence.
                          abort();
                        }
                      }
                      // Revive the escaped character.
                      value += fromCharCode("0x" + source.slice(begin, Index));
                      break;
                    default:
                      // Invalid escape sequence.
                      abort();
                  }
                } else {
                  if (charCode == 34) {
                    // An unescaped double-quote character marks the end of the
                    // string.
                    break;
                  }
                  charCode = source.charCodeAt(Index);
                  begin = Index;
                  // Optimize for the common case where a string is valid.
                  while (charCode >= 32 && charCode != 92 && charCode != 34) {
                    charCode = source.charCodeAt(++Index);
                  }
                  // Append the string as-is.
                  value += source.slice(begin, Index);
                }
              }
              if (source.charCodeAt(Index) == 34) {
                // Advance to the next character and return the revived string.
                Index++;
                return value;
              }
              // Unterminated string.
              abort();
            default:
              // Parse numbers and literals.
              begin = Index;
              // Advance past the negative sign, if one is specified.
              if (charCode == 45) {
                isSigned = true;
                charCode = source.charCodeAt(++Index);
              }
              // Parse an integer or floating-point value.
              if (charCode >= 48 && charCode <= 57) {
                // Leading zeroes are interpreted as octal literals.
                if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                  // Illegal octal literal.
                  abort();
                }
                isSigned = false;
                // Parse the integer component.
                for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                // Floats cannot contain a leading decimal point; however, this
                // case is already accounted for by the parser.
                if (source.charCodeAt(Index) == 46) {
                  position = ++Index;
                  // Parse the decimal component.
                  for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal trailing decimal.
                    abort();
                  }
                  Index = position;
                }
                // Parse exponents. The `e` denoting the exponent is
                // case-insensitive.
                charCode = source.charCodeAt(Index);
                if (charCode == 101 || charCode == 69) {
                  charCode = source.charCodeAt(++Index);
                  // Skip past the sign following the exponent, if one is
                  // specified.
                  if (charCode == 43 || charCode == 45) {
                    Index++;
                  }
                  // Parse the exponential component.
                  for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                  if (position == Index) {
                    // Illegal empty exponent.
                    abort();
                  }
                  Index = position;
                }
                // Coerce the parsed value to a JavaScript number.
                return +source.slice(begin, Index);
              }
              // A negative sign may only precede numbers.
              if (isSigned) {
                abort();
              }
              // `true`, `false`, and `null` literals.
              if (source.slice(Index, Index + 4) == "true") {
                Index += 4;
                return true;
              } else if (source.slice(Index, Index + 5) == "false") {
                Index += 5;
                return false;
              } else if (source.slice(Index, Index + 4) == "null") {
                Index += 4;
                return null;
              }
              // Unrecognized token.
              abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      var get = function (value) {
        var results, hasMembers;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; hasMembers || (hasMembers = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (hasMembers) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      var update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      var walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          // `forEach` can't be used to traverse an array in Opera <= 8.54
          // because its `Object#hasOwnProperty` implementation returns `false`
          // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
          if (getClass.call(value) == arrayClass) {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = "" + source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}(this));

},{}]},{},[3])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9wYWNrYWdlLmpzb24iLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvY29uZmlnLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbWFwYm94LmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbm9kZV9tb2R1bGVzL211c3RhY2hlL211c3RhY2hlLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2dlb2NvZGVyLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL3RpbGVfbGF5ZXIuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvc2hhcmVfY29udHJvbC5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy9nZW9jb2Rlcl9jb250cm9sLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2dyaWRfbGF5ZXIuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvbWFwLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL3V0aWwuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvZ3JpZC5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL25vZGVfbW9kdWxlcy9zYW5pdGl6ZS1jYWphL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbm9kZV9tb2R1bGVzL3Nhbml0aXplLWNhamEvc2FuaXRpemVyLWJ1bmRsZS5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy91cmwuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvbWFya2VyLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2xlZ2VuZF9jb250cm9sLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2xvYWRfdGlsZWpzb24uanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvZ3JpZF9jb250cm9sLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL21hcmtlcl9sYXllci5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy9yZXF1ZXN0LmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbm9kZV9tb2R1bGVzL2NvcnNsaXRlL2NvcnNsaXRlLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbm9kZV9tb2R1bGVzL2pzb24zL2xpYi9qc29uMy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2aUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOTRFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcIk1hcEJveFwiXG4gIH0sXG4gIFwibmFtZVwiOiBcIm1hcGJveC5qc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwibWFwYm94IGphdmFzY3JpcHQgYXBpXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuNC4wXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwOi8vbWFwYm94LmNvbS9cIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdDovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC5qcy5naXRcIlxuICB9LFxuICBcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJsZWFmbGV0XCI6IFwiMC42LjRcIixcbiAgICBcIm11c3RhY2hlXCI6IFwifjAuNy4yXCIsXG4gICAgXCJjb3JzbGl0ZVwiOiBcIjAuMC41XCIsXG4gICAgXCJqc29uM1wiOiBcImdpdDovL2dpdGh1Yi5jb20vYmVzdGllanMvanNvbjMuZ2l0I3YzLjIuNWFcIixcbiAgICBcInNhbml0aXplLWNhamFcIjogXCIwLjAuMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwibW9jaGEtcGhhbnRvbWpzIHRlc3QvaW5kZXguaHRtbFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImxlYWZsZXQtaGFzaFwiOiBcImdpdDovL2dpdGh1Yi5jb20vbWxldmFucy9sZWFmbGV0LWhhc2guZ2l0I2IwMzlhM2FhNGUyNDkyYTVjNzQ0ODA3NTE3MmFjMjY3NjllNjAxZDZcIixcbiAgICBcImxlYWZsZXQtZnVsbHNjcmVlblwiOiBcIjAuMC4wXCIsXG4gICAgXCJ1Z2xpZnktanNcIjogXCJ+Mi4yLjVcIixcbiAgICBcIm1vY2hhXCI6IFwifjEuOVwiLFxuICAgIFwiZXhwZWN0LmpzXCI6IFwifjAuMi4wXCIsXG4gICAgXCJzaW5vblwiOiBcIn4xLjcuM1wiLFxuICAgIFwibW9jaGEtcGhhbnRvbWpzXCI6IFwifjEuMS4xXCIsXG4gICAgXCJoYXBwZW5cIjogXCJ+MC4xLjNcIixcbiAgICBcImJyb3dzZXJpZnlcIjogXCJ+Mi4yMi4wXCJcbiAgfSxcbiAgXCJvcHRpb25hbERlcGVuZGVuY2llc1wiOiB7fSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCIqXCJcbiAgfSxcbiAgXCJyZWFkbWVcIjogXCIjIG1hcGJveC5qc1xcblxcblshW0J1aWxkIFN0YXR1c10oaHR0cHM6Ly90cmF2aXMtY2kub3JnL21hcGJveC9tYXBib3guanMucG5nP2JyYW5jaD12MSldKGh0dHBzOi8vdHJhdmlzLWNpLm9yZy9tYXBib3gvbWFwYm94LmpzKVxcblxcblRoaXMgaXMgdGhlIE1hcEJveCBKYXZhc2NyaXB0IEFQSSwgdmVyc2lvbiAxLnguIEl0J3MgYnVpbHQgYXMgYSBbTGVhZmxldF0oaHR0cDovL2xlYWZsZXRqcy5jb20vKVxcbnBsdWdpbi4gWW91IGNhbiBbcmVhZCBhYm91dCBpdHMgbGF1bmNoXShodHRwOi8vbWFwYm94LmNvbS9ibG9nL21hcGJveC1qcy13aXRoLWxlYWZsZXQvKS5cXG5cXG4jIyBbQVBJXShodHRwOi8vbWFwYm94LmNvbS9tYXBib3guanMvYXBpLylcXG5cXG5NYW5hZ2VkIGFzIE1hcmtkb3duIGluIGBBUEkubWRgLCBmb2xsb3dpbmcgdGhlIHN0YW5kYXJkcyBpbiBgRE9DVU1FTlRJTkcubWRgXFxuXFxuIyMgW0V4YW1wbGVzXShodHRwOi8vbWFwYm94LmNvbS9tYXBib3guanMvZXhhbXBsZS92MS4wLjAvKVxcblxcbiMjIFVzYWdlIHdpdGggQnJvd3NlcmlmeVxcblxcbkluc3RhbGwgdGhlIG1hcGJveC5qcyBtb2R1bGUgYW5kIGFkZCBpdCB0byBgZGVwZW5kZW5jaWVzYCBpbiBwYWNrYWdlLmpzb246XFxuXFxuYGBgc2hcXG5ucG0gaW5zdGFsbCBtYXBib3guanMgLS1zYXZlXFxuYGBgXFxuXFxuUmVxdWlyZSBtYXBib3ggaW4geW91ciBzY3JpcHQ6XFxuXFxuYGBganNcXG4vLyBtYWluLmpzXFxuXFxucmVxdWlyZSgnbWFwYm94LmpzJyk7IC8vIDwtLSBhdXRvLWF0dGFjaGVzIHRvIHdpbmRvdy5MXFxuYGBgXFxuXFxuQnJvd3NlcmlmeSBpdDpcXG5cXG5gYGBzaFxcbmJyb3dzZXJpZnkgbWFpbi5qcyAtbyBidW5kbGUuanNcXG5gYGBcXG5cXG4jIyBCdWlsZGluZ1xcblxcblJlcXVpcmVzIFtub2RlLmpzXShodHRwOi8vbm9kZWpzLm9yZy8pIGluc3RhbGxlZCBvbiB5b3VyIHN5c3RlbS5cXG5cXG5gYGAgc2hcXG5naXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3guanMuZ2l0XFxuY2QgbWFwYm94LmpzXFxubnBtIGluc3RhbGxcXG5tYWtlXFxuYGBgXFxuXFxuVGhpcyBwcm9qZWN0IHVzZXMgW2Jyb3dzZXJpZnldKGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9ub2RlLWJyb3dzZXJpZnkpIHRvIGNvbWJpbmVcXG5kZXBlbmRlbmNpZXMgYW5kIGluc3RhbGxzIGEgbG9jYWwgY29weSB3aGVuIHlvdSBydW4gYG5wbSBpbnN0YWxsYC5cXG5gbWFrZWAgd2lsbCBidWlsZCB0aGUgcHJvamVjdCBpbiBgZGlzdC9gLlxcblxcbiMjIyBUZXN0c1xcblxcblRlc3Qgd2l0aCBbcGhhbnRvbWpzXShodHRwOi8vcGhhbnRvbWpzLm9yZy8pOlxcblxcbmBgYCBzaFxcbm5wbSB0ZXN0XFxuYGBgXFxuXFxuVG8gdGVzdCBpbiBhIGJyb3dzZXIsIHJ1biBhIFtsb2NhbCBkZXZlbG9wbWVudCBzZXJ2ZXJdKGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3RtY3cvNDk4OTc1MSlcXG5hbmQgZ28gdG8gYC90ZXN0YC5cXG5cXG4jIyMgVmVyc2lvbiB2MC54LnhcXG5cXG5bVmVyc2lvbiB2MC54LnggY2FuIGJlIGFjY2Vzc2VkIGluIHRoZSBvbGQgbWFzdGVyIGJyYW5jaC5dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LmpzL3RyZWUvbWFzdGVyKS5cXG5cIixcbiAgXCJyZWFkbWVGaWxlbmFtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3guanMvaXNzdWVzXCJcbiAgfSxcbiAgXCJfaWRcIjogXCJtYXBib3guanNAMS40LjBcIixcbiAgXCJkaXN0XCI6IHtcbiAgICBcInNoYXN1bVwiOiBcIjMwODMxNzQ5YTFlZjk5ODgyNDIzMjViNmZhY2VmMGEwMmVmOWZhNTJcIlxuICB9LFxuICBcIl9mcm9tXCI6IFwibWFwYm94LmpzQDEuNC4wXCIsXG4gIFwiX3Jlc29sdmVkXCI6IFwiaHR0cHM6Ly9yZWdpc3RyeS5ucG1qcy5vcmcvbWFwYm94LmpzLy0vbWFwYm94LmpzLTEuNC4wLnRnelwiXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgSFRUUF9VUkxTOiBbXG4gICAgICAgICdodHRwOi8vYS50aWxlcy5tYXBib3guY29tL3YzLycsXG4gICAgICAgICdodHRwOi8vYi50aWxlcy5tYXBib3guY29tL3YzLycsXG4gICAgICAgICdodHRwOi8vYy50aWxlcy5tYXBib3guY29tL3YzLycsXG4gICAgICAgICdodHRwOi8vZC50aWxlcy5tYXBib3guY29tL3YzLyddLFxuXG4gICAgRk9SQ0VfSFRUUFM6IGZhbHNlLFxuXG4gICAgSFRUUFNfVVJMUzogW1xuICAgICAgICAnaHR0cHM6Ly9hLnRpbGVzLm1hcGJveC5jb20vdjMvJyxcbiAgICAgICAgJ2h0dHBzOi8vYi50aWxlcy5tYXBib3guY29tL3YzLycsXG4gICAgICAgICdodHRwczovL2MudGlsZXMubWFwYm94LmNvbS92My8nLFxuICAgICAgICAnaHR0cHM6Ly9kLnRpbGVzLm1hcGJveC5jb20vdjMvJ11cbn07XG4iLCIvLyBIYXJkY29kZSBpbWFnZSBwYXRoLCBiZWNhdXNlIExlYWZsZXQncyBhdXRvZGV0ZWN0aW9uXG4vLyBmYWlscywgYmVjYXVzZSBtYXBib3guanMgaXMgbm90IG5hbWVkIGxlYWZsZXQuanNcbndpbmRvdy5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSAnLy9hcGkudGlsZXMubWFwYm94LmNvbS9tYXBib3guanMvJyArICd2JyArXG4gICAgcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uICsgJy9pbWFnZXMnO1xuXG5MLm1hcGJveCA9IG1vZHVsZS5leHBvcnRzID0ge1xuICAgIFZFUlNJT046IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJykudmVyc2lvbixcbiAgICBnZW9jb2RlcjogcmVxdWlyZSgnLi9zcmMvZ2VvY29kZXInKSxcbiAgICBtYXJrZXI6IHJlcXVpcmUoJy4vc3JjL21hcmtlcicpLFxuICAgIHRpbGVMYXllcjogcmVxdWlyZSgnLi9zcmMvdGlsZV9sYXllcicpLFxuICAgIHNoYXJlQ29udHJvbDogcmVxdWlyZSgnLi9zcmMvc2hhcmVfY29udHJvbCcpLFxuICAgIGxlZ2VuZENvbnRyb2w6IHJlcXVpcmUoJy4vc3JjL2xlZ2VuZF9jb250cm9sJyksXG4gICAgZ2VvY29kZXJDb250cm9sOiByZXF1aXJlKCcuL3NyYy9nZW9jb2Rlcl9jb250cm9sJyksXG4gICAgZ3JpZENvbnRyb2w6IHJlcXVpcmUoJy4vc3JjL2dyaWRfY29udHJvbCcpLFxuICAgIGdyaWRMYXllcjogcmVxdWlyZSgnLi9zcmMvZ3JpZF9sYXllcicpLFxuICAgIG1hcmtlckxheWVyOiByZXF1aXJlKCcuL3NyYy9tYXJrZXJfbGF5ZXInKSxcbiAgICBtYXA6IHJlcXVpcmUoJy4vc3JjL21hcCcpLFxuICAgIGNvbmZpZzogcmVxdWlyZSgnLi9zcmMvY29uZmlnJyksXG4gICAgc2FuaXRpemU6IHJlcXVpcmUoJ3Nhbml0aXplLWNhamEnKSxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnbXVzdGFjaGUnKS50b19odG1sXG59O1xuIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqL1xuXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlKi9cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiBleHBvcnRzKSB7XG4gICAgZmFjdG9yeShleHBvcnRzKTsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICB2YXIgbXVzdGFjaGUgPSB7fTtcbiAgICBmYWN0b3J5KG11c3RhY2hlKTtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIGRlZmluZShtdXN0YWNoZSk7IC8vIEFNRFxuICAgIH0gZWxzZSB7XG4gICAgICByb290Lk11c3RhY2hlID0gbXVzdGFjaGU7IC8vIDxzY3JpcHQ+XG4gICAgfVxuICB9XG59KHRoaXMsIGZ1bmN0aW9uIChtdXN0YWNoZSkge1xuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcbiAgdmFyIGVxUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgUmVnRXhwX3Rlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAocmUsIHN0cmluZykge1xuICAgIHJldHVybiBSZWdFeHBfdGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIE9iamVjdF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdF90b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCBcIlxcXFwkJlwiKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgIFwiL1wiOiAnJiN4MkY7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSBcIlwiO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKG1hdGNoICYmIG1hdGNoLmluZGV4ID09PSAwKSB7XG4gICAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG4gICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcbiAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiAocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgY2FzZSAtMTpcbiAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgdGhpcy50YWlsID0gXCJcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMDpcbiAgICAgIG1hdGNoID0gXCJcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIGZ1bmN0aW9uIENvbnRleHQodmlldywgcGFyZW50KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldyA9PSBudWxsID8ge30gOiB2aWV3O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuX2NhY2hlID0geyAnLic6IHRoaXMudmlldyB9O1xuICB9XG5cbiAgQ29udGV4dC5tYWtlID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgICByZXR1cm4gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgfTtcblxuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKG5hbWUgaW4gdGhpcy5fY2FjaGUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5fY2FjaGVbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuXG4gICAgICAgICAgdmFyIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpLCBpID0gMDtcbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2krK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICB9XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fcGFydGlhbENhY2hlID0ge307XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGZuID0gdGhpcy5fY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKCFmbikge1xuICAgICAgdmFyIHRva2VucyA9IG11c3RhY2hlLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgICAgIGZuID0gdGhpcy5fY2FjaGVbdGVtcGxhdGVdID0gdGhpcy5jb21waWxlVG9rZW5zKHRva2VucywgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmNvbXBpbGVQYXJ0aWFsID0gZnVuY3Rpb24gKG5hbWUsIHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGZuID0gdGhpcy5jb21waWxlKHRlbXBsYXRlLCB0YWdzKTtcbiAgICB0aGlzLl9wYXJ0aWFsQ2FjaGVbbmFtZV0gPSBmbjtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5nZXRQYXJ0aWFsID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIShuYW1lIGluIHRoaXMuX3BhcnRpYWxDYWNoZSkgJiYgdGhpcy5fbG9hZFBhcnRpYWwpIHtcbiAgICAgIHRoaXMuY29tcGlsZVBhcnRpYWwobmFtZSwgdGhpcy5fbG9hZFBhcnRpYWwobmFtZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wYXJ0aWFsQ2FjaGVbbmFtZV07XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5jb21waWxlVG9rZW5zID0gZnVuY3Rpb24gKHRva2VucywgdGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2aWV3LCBwYXJ0aWFscykge1xuICAgICAgaWYgKHBhcnRpYWxzKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHBhcnRpYWxzKSkge1xuICAgICAgICAgIHNlbGYuX2xvYWRQYXJ0aWFsID0gcGFydGlhbHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBwYXJ0aWFscykge1xuICAgICAgICAgICAgc2VsZi5jb21waWxlUGFydGlhbChuYW1lLCBwYXJ0aWFsc1tuYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZW5kZXJUb2tlbnModG9rZW5zLCBzZWxmLCBDb250ZXh0Lm1ha2UodmlldyksIHRlbXBsYXRlKTtcbiAgICB9O1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHJldHVybiB0aGlzLmNvbXBpbGUodGVtcGxhdGUpKHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIGZ1bmN0aW9uIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYHRva2Vuc2AgdXNpbmcgdGhlIGdpdmVuIGB3cml0ZXJgXG4gICAqIGFuZCBgY29udGV4dGAuIFRoZSBgdGVtcGxhdGVgIHN0cmluZyBpcyBvbmx5IG5lZWRlZCBmb3IgdGVtcGxhdGVzIHRoYXQgdXNlXG4gICAqIGhpZ2hlci1vcmRlciBzZWN0aW9ucyB0byBleHRyYWN0IHRoZSBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0XG4gICAqIHdhcyBjb250YWluZWQgaW4gdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2Vucywgd3JpdGVyLCBjb250ZXh0LCB0ZW1wbGF0ZSkge1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJ0Yml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIGZ1bmN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB3cml0ZXIucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW4sIHRva2VuVmFsdWUsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2tlbnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgdG9rZW5WYWx1ZSA9IHRva2VuWzFdO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICBjYXNlICcjJzpcbiAgICAgICAgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblZhbHVlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgamxlbiA9IHZhbHVlLmxlbmd0aDsgaiA8IGpsZW47ICsraikge1xuICAgICAgICAgICAgICBidWZmZXIgKz0gcmVuZGVyVG9rZW5zKHRva2VuWzRdLCB3cml0ZXIsIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHRlbXBsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gcmVuZGVyVG9rZW5zKHRva2VuWzRdLCB3cml0ZXIsIGNvbnRleHQucHVzaCh2YWx1ZSksIHRlbXBsYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IHRlbXBsYXRlID09IG51bGwgPyBudWxsIDogdGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKTtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCB0ZXh0LCBzdWJSZW5kZXIpO1xuICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSBidWZmZXIgKz0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICBidWZmZXIgKz0gcmVuZGVyVG9rZW5zKHRva2VuWzRdLCB3cml0ZXIsIGNvbnRleHQsIHRlbXBsYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnXic6XG4gICAgICAgIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5WYWx1ZSk7XG5cbiAgICAgICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgIGJ1ZmZlciArPSByZW5kZXJUb2tlbnModG9rZW5bNF0sIHdyaXRlciwgY29udGV4dCwgdGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc+JzpcbiAgICAgICAgdmFsdWUgPSB3cml0ZXIuZ2V0UGFydGlhbCh0b2tlblZhbHVlKTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSBidWZmZXIgKz0gdmFsdWUoY29udGV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJic6XG4gICAgICAgIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5WYWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSBidWZmZXIgKz0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5WYWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSBidWZmZXIgKz0gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgYnVmZmVyICs9IHRva2VuVmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIGludG8gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUgd2hlcmVcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxuICAgKiBhbGwgdG9rZW5zIHRoYXQgYXBwZWFyIGluIHRoYXQgc2VjdGlvbiBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbFxuICAgKiB0ZW1wbGF0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVuZCBvZiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBuZXN0VG9rZW5zKHRva2Vucykge1xuICAgIHZhciB0cmVlID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IHRyZWU7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICBjYXNlICcjJzpcbiAgICAgIGNhc2UgJ14nOlxuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgICB2YXIgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IHRyZWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cmVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zKHRva2Vucykge1xuICAgIHZhciBzcXVhc2hlZFRva2VucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlVGFncyh0YWdzKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NbMF0pICsgXCJcXFxccypcIiksXG4gICAgICBuZXcgUmVnRXhwKFwiXFxcXHMqXCIgKyBlc2NhcGVSZWdFeHAodGFnc1sxXSkpXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2VuIG9iamVjdHMuIElmXG4gICAqIGB0YWdzYCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbXCI8JVwiLCBcIiU+XCJdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIE11c3RhY2hlLnRhZ3MpLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUgfHwgJyc7XG4gICAgdGFncyA9IHRhZ3MgfHwgbXVzdGFjaGUudGFncztcblxuICAgIGlmICh0eXBlb2YgdGFncyA9PT0gJ3N0cmluZycpIHRhZ3MgPSB0YWdzLnNwbGl0KHNwYWNlUmUpO1xuICAgIGlmICh0YWdzLmxlbmd0aCAhPT0gMikgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzLmpvaW4oJywgJykpO1xuXG4gICAgdmFyIHRhZ1JlcyA9IGVzY2FwZVRhZ3ModGFncyk7XG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc2VjdGlvbnMgPSBbXTsgICAgIC8vIFN0YWNrIHRvIGhvbGQgc2VjdGlvbiB0b2tlbnNcbiAgICB2YXIgdG9rZW5zID0gW107ICAgICAgIC8vIEJ1ZmZlciB0byBob2xkIHRoZSB0b2tlbnNcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxuICAgIHZhciBoYXNUYWcgPSBmYWxzZTsgICAgLy8gSXMgdGhlcmUgYSB7e3RhZ319IG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIG5vblNwYWNlID0gZmFsc2U7ICAvLyBJcyB0aGVyZSBhIG5vbi1zcGFjZSBjaGFyIG9uIHRoZSBjdXJyZW50IGxpbmU/XG5cbiAgICAvLyBTdHJpcHMgYWxsIHdoaXRlc3BhY2UgdG9rZW5zIGFycmF5IGZvciB0aGUgY3VycmVudCBsaW5lXG4gICAgLy8gaWYgdGhlcmUgd2FzIGEge3sjdGFnfX0gb24gaXQgYW5kIG90aGVyd2lzZSBvbmx5IHNwYWNlLlxuICAgIGZ1bmN0aW9uIHN0cmlwU3BhY2UoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aCkge1xuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BhY2VzID0gW107XG4gICAgICB9XG5cbiAgICAgIGhhc1RhZyA9IGZhbHNlO1xuICAgICAgbm9uU3BhY2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwodGFnUmVzWzBdKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PSAnXFxuJykgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKHRhZ1Jlc1swXSkpIGJyZWFrO1xuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXFSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwodGFnUmVzWzFdKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwobmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzWzFdKSkpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKHRhZ1Jlc1sxXSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKHRhZ1Jlc1sxXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKHRhZ1Jlc1sxXSkpIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbmFtZScgfHwgdHlwZSA9PT0gJ3snIHx8IHR5cGUgPT09ICcmJykge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICB0YWdzID0gdmFsdWUuc3BsaXQoc3BhY2VSZSk7XG4gICAgICAgIGlmICh0YWdzLmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzIGF0ICcgKyBzdGFydCArICc6ICcgKyB0YWdzLmpvaW4oJywgJykpO1xuICAgICAgICB9XG4gICAgICAgIHRhZ1JlcyA9IGVzY2FwZVRhZ3ModGFncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgIGlmIChvcGVuU2VjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgbXVzdGFjaGUubmFtZSA9IFwibXVzdGFjaGUuanNcIjtcbiAgbXVzdGFjaGUudmVyc2lvbiA9IFwiMC43LjNcIjtcbiAgbXVzdGFjaGUudGFncyA9IFtcInt7XCIsIFwifX1cIl07XG5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbiAgbXVzdGFjaGUucGFyc2UgPSBwYXJzZVRlbXBsYXRlO1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gQWxsIE11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBhbmQgcGFydGlhbHMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHRvIGEgcmV1c2FibGUgZnVuY3Rpb24gdXNpbmcgdGhlIGRlZmF1bHRcbiAgICogd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY29tcGlsZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNvbXBpbGUodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgcGFydGlhbCB3aXRoIHRoZSBnaXZlbiBgbmFtZWAgYW5kIGB0ZW1wbGF0ZWAgdG8gYSByZXVzYWJsZVxuICAgKiBmdW5jdGlvbiB1c2luZyB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jb21waWxlUGFydGlhbCA9IGZ1bmN0aW9uIChuYW1lLCB0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNvbXBpbGVQYXJ0aWFsKG5hbWUsIHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIGdpdmVuIGFycmF5IG9mIHRva2VucyAodGhlIG91dHB1dCBvZiBhIHBhcnNlKSB0byBhIHJldXNhYmxlXG4gICAqIGZ1bmN0aW9uIHVzaW5nIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNvbXBpbGVUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCB0ZW1wbGF0ZSkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNvbXBpbGVUb2tlbnModG9rZW5zLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBzZW5kKSB7XG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbn0pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB1cmxoZWxwZXIgPSByZXF1aXJlKCcuL3VybCcpLFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxuLy8gTG93LWxldmVsIGdlb2NvZGluZyBpbnRlcmZhY2UgLSB3cmFwcyBzcGVjaWZpYyBBUEkgY2FsbHMgYW5kIHRoZWlyXG4vLyByZXR1cm4gdmFsdWVzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfKSB7XG4gICAgdmFyIGdlb2NvZGVyID0ge30sIHVybDtcblxuICAgIGdlb2NvZGVyLmdldFVSTCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIuc2V0VVJMID0gZnVuY3Rpb24oXykge1xuICAgICAgICB1cmwgPSB1cmxoZWxwZXIuanNvbmlmeShfKTtcbiAgICAgICAgcmV0dXJuIGdlb2NvZGVyO1xuICAgIH07XG5cbiAgICBnZW9jb2Rlci5zZXRJRCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgdXRpbC5zdHJpY3QoXywgJ3N0cmluZycpO1xuICAgICAgICBnZW9jb2Rlci5zZXRVUkwodXJsaGVscGVyLmJhc2UoKSArIF8gKyAnL2dlb2NvZGUve3F1ZXJ5fS5qc29uJyk7XG4gICAgICAgIHJldHVybiBnZW9jb2RlcjtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIuc2V0VGlsZUpTT04gPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIHV0aWwuc3RyaWN0KF8sICdvYmplY3QnKTtcbiAgICAgICAgZ2VvY29kZXIuc2V0VVJMKF8uZ2VvY29kZXIpO1xuICAgICAgICByZXR1cm4gZ2VvY29kZXI7XG4gICAgfTtcblxuICAgIGdlb2NvZGVyLnF1ZXJ5VVJMID0gZnVuY3Rpb24oXykge1xuICAgICAgICB1dGlsLnN0cmljdChfLCAnc3RyaW5nJyk7XG4gICAgICAgIGlmICghZ2VvY29kZXIuZ2V0VVJMKCkpIHRocm93IG5ldyBFcnJvcignR2VvY29kaW5nIG1hcCBJRCBub3Qgc2V0Jyk7XG4gICAgICAgIHJldHVybiBMLlV0aWwudGVtcGxhdGUoZ2VvY29kZXIuZ2V0VVJMKCksIHsgcXVlcnk6IGVuY29kZVVSSUNvbXBvbmVudChfKSB9KTtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIucXVlcnkgPSBmdW5jdGlvbihfLCBjYWxsYmFjaykge1xuICAgICAgICB1dGlsLnN0cmljdChfLCAnc3RyaW5nJyk7XG4gICAgICAgIHV0aWwuc3RyaWN0KGNhbGxiYWNrLCAnZnVuY3Rpb24nKTtcbiAgICAgICAgcmVxdWVzdChnZW9jb2Rlci5xdWVyeVVSTChfKSwgZnVuY3Rpb24oZXJyLCBqc29uKSB7XG4gICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLnJlc3VsdHMgJiYganNvbi5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IGpzb24ucmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgbGF0bG5nOiBbanNvbi5yZXN1bHRzWzBdWzBdLmxhdCwganNvbi5yZXN1bHRzWzBdWzBdLmxvbl1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChqc29uLnJlc3VsdHNbMF1bMF0uYm91bmRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmJvdW5kcyA9IGpzb24ucmVzdWx0c1swXVswXS5ib3VuZHM7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5sYm91bmRzID0gdXRpbC5sYm91bmRzKHJlcy5ib3VuZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGNhbGxiYWNrKGVyciB8fCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGdlb2NvZGVyO1xuICAgIH07XG5cbiAgICAvLyBhIHJldmVyc2UgZ2VvY29kZTpcbiAgICAvL1xuICAgIC8vICBnZW9jb2Rlci5yZXZlcnNlUXVlcnkoWzgwLCAyMF0pXG4gICAgZ2VvY29kZXIucmV2ZXJzZVF1ZXJ5ID0gZnVuY3Rpb24oXywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHEgPSAnJztcblxuICAgICAgICBmdW5jdGlvbiBub3JtKHgpIHtcbiAgICAgICAgICAgIGlmICh4LmxhdCAhPT0gdW5kZWZpbmVkICYmIHgubG5nICE9PSB1bmRlZmluZWQpIHJldHVybiB4LmxuZyArICcsJyArIHgubGF0O1xuICAgICAgICAgICAgZWxzZSBpZiAoeC5sYXQgIT09IHVuZGVmaW5lZCAmJiB4LmxvbiAhPT0gdW5kZWZpbmVkKSByZXR1cm4geC5sb24gKyAnLCcgKyB4LmxhdDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHhbMF0gKyAnLCcgKyB4WzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ubGVuZ3RoICYmIF9bMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcHRzID0gW107IGkgPCBfLmxlbmd0aDsgaSsrKSBwdHMucHVzaChub3JtKF9baV0pKTtcbiAgICAgICAgICAgIHEgPSBwdHMuam9pbignOycpO1xuICAgICAgICB9IGVsc2UgcSA9IG5vcm0oXyk7XG5cbiAgICAgICAgcmVxdWVzdChnZW9jb2Rlci5xdWVyeVVSTChxKSwgZnVuY3Rpb24oZXJyLCBqc29uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIGpzb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZ2VvY29kZXI7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKF8uaW5kZXhPZignLycpID09IC0xKSBnZW9jb2Rlci5zZXRJRChfKTtcbiAgICAgICAgZWxzZSBnZW9jb2Rlci5zZXRVUkwoXyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBfID09PSAnb2JqZWN0JykgZ2VvY29kZXIuc2V0VGlsZUpTT04oXyk7XG5cbiAgICByZXR1cm4gZ2VvY29kZXI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIHVybCA9IHJlcXVpcmUoJy4vdXJsJyk7XG5cbnZhciBUaWxlTGF5ZXIgPSBMLlRpbGVMYXllci5leHRlbmQoe1xuICAgIGluY2x1ZGVzOiBbcmVxdWlyZSgnLi9sb2FkX3RpbGVqc29uJyldLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgICBmb3JtYXQ6ICdwbmcnXG4gICAgfSxcblxuICAgIC8vIGh0dHA6Ly9tYXBib3guY29tL2RldmVsb3BlcnMvYXBpLyNpbWFnZV9xdWFsaXR5XG4gICAgZm9ybWF0czogW1xuICAgICAgICAncG5nJyxcbiAgICAgICAgLy8gUE5HXG4gICAgICAgICdwbmczMicsICdwbmc2NCcsICdwbmcxMjgnLCAncG5nMjU2JyxcbiAgICAgICAgLy8gSlBHXG4gICAgICAgICdqcGc3MCcsICdqcGc4MCcsICdqcGc5MCddLFxuXG4gICAgc2NhbGVQcmVmaXg6ICdAMnguJyxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICAgICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCB1bmRlZmluZWQsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX3RpbGVqc29uID0ge307XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5kZXRlY3RSZXRpbmEgJiZcbiAgICAgICAgICAgIEwuQnJvd3Nlci5yZXRpbmEgJiYgb3B0aW9ucy5yZXRpbmFWZXJzaW9uKSB7XG4gICAgICAgICAgICBfID0gb3B0aW9ucy5yZXRpbmFWZXJzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHV0aWwuc3RyaWN0X29uZW9mKG9wdGlvbnMuZm9ybWF0LCB0aGlzLmZvcm1hdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZFRpbGVKU09OKF8pO1xuICAgIH0sXG5cbiAgICBzZXRGb3JtYXQ6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgdXRpbC5zdHJpY3QoXywgJ3N0cmluZycpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9ybWF0ID0gXztcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9hdXRvU2NhbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zICYmXG4gICAgICAgICAgICBMLkJyb3dzZXIucmV0aW5hICYmXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmXG4gICAgICAgICAgICAoIXRoaXMub3B0aW9ucy5yZXRpbmFWZXJzaW9uKSAmJlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmF1dG9zY2FsZTtcbiAgICB9LFxuXG4gICAgLy8gZGlzYWJsZSB0aGUgc2V0VXJsIGZ1bmN0aW9uLCB3aGljaCBpcyBub3QgYXZhaWxhYmxlIG9uIG1hcGJveCB0aWxlbGF5ZXJzXG4gICAgc2V0VXJsOiBudWxsLFxuXG4gICAgX3NldFRpbGVKU09OOiBmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIHV0aWwuc3RyaWN0KGpzb24sICdvYmplY3QnKTtcblxuICAgICAgICBMLmV4dGVuZCh0aGlzLm9wdGlvbnMsIHtcbiAgICAgICAgICAgIHRpbGVzOiBqc29uLnRpbGVzLFxuICAgICAgICAgICAgYXR0cmlidXRpb246IGpzb24uYXR0cmlidXRpb24sXG4gICAgICAgICAgICBtaW5ab29tOiBqc29uLm1pbnpvb20sXG4gICAgICAgICAgICBtYXhab29tOiBqc29uLm1heHpvb20sXG4gICAgICAgICAgICBhdXRvc2NhbGU6IGpzb24uYXV0b3NjYWxlIHx8IGZhbHNlLFxuICAgICAgICAgICAgdG1zOiBqc29uLnNjaGVtZSA9PT0gJ3RtcycsXG4gICAgICAgICAgICBib3VuZHM6IGpzb24uYm91bmRzICYmIHV0aWwubGJvdW5kcyhqc29uLmJvdW5kcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdGlsZWpzb24gPSBqc29uO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0VGlsZUpTT046IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZWpzb247XG4gICAgfSxcblxuICAgIC8vIHRoaXMgaXMgYW4gZXhjZXB0aW9uIHRvIG1hcGJveC5qcyBuYW1pbmcgcnVsZXMgYmVjYXVzZSBpdCdzIGNhbGxlZFxuICAgIC8vIGJ5IGBMLm1hcGBcbiAgICBnZXRUaWxlVXJsOiBmdW5jdGlvbih0aWxlUG9pbnQpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gdGhpcy5vcHRpb25zLnRpbGVzLFxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGlsZXMubGVuZ3RoKSxcbiAgICAgICAgICAgIHVybCA9IHRpbGVzW2luZGV4XTtcblxuICAgICAgICB2YXIgdGVtcGxhdGVkID0gTC5VdGlsLnRlbXBsYXRlKHVybCwgdGlsZVBvaW50KTtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGVkLnJlcGxhY2UoJy5wbmcnLFxuICAgICAgICAgICAgICAgICh0aGlzLl9hdXRvU2NhbGUoKSA/IHRoaXMuc2NhbGVQcmVmaXggOiAnLicpICsgdGhpcy5vcHRpb25zLmZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gVGlsZUpTT04uVGlsZUxheWVycyBhcmUgYWRkZWQgdG8gdGhlIG1hcCBpbW1lZGlhdGVseSwgc28gdGhhdCB0aGV5IGdldFxuICAgIC8vIHRoZSBkZXNpcmVkIHotaW5kZXgsIGJ1dCBkbyBub3QgdXBkYXRlIHVudGlsIHRoZSBUaWxlSlNPTiBoYXMgYmVlbiBsb2FkZWQuXG4gICAgX3VwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXMpIHtcbiAgICAgICAgICAgIEwuVGlsZUxheWVyLnByb3RvdHlwZS5fdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBUaWxlTGF5ZXIoXywgb3B0aW9ucyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2hhcmVDb250cm9sID0gTC5Db250cm9sLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtyZXF1aXJlKCcuL2xvYWRfdGlsZWpzb24nKV0sXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgICAgIHVybDogJydcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgICAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xvYWRUaWxlSlNPTihfKTtcbiAgICB9LFxuXG4gICAgX3NldFRpbGVKU09OOiBmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIHRoaXMuX3RpbGVqc29uID0ganNvbjtcbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XG5cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wtbWFwYm94LXNoYXJlIGxlYWZsZXQtYmFyJyk7XG4gICAgICAgIHZhciBsaW5rID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsICdtYXBib3gtc2hhcmUgbWFwYm94LWljb24gbWFwYm94LWljb24tc2hhcmUnLCBjb250YWluZXIpO1xuICAgICAgICBsaW5rLmhyZWYgPSAnIyc7XG5cbiAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihsaW5rLCAnY2xpY2snLCB0aGlzLl9zaGFyZUNsaWNrLCB0aGlzKTtcbiAgICAgICAgTC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbihjb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuX21hcC5vbignbW91c2Vkb3duJywgdGhpcy5fY2xpY2tPdXQsIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcblxuICAgIF9jbGlja091dDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodGhpcy5fcG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLl9wb3B1cCk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NoYXJlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgTC5Eb21FdmVudC5zdG9wKGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wb3B1cCkgcmV0dXJuIHRoaXMuX2NsaWNrT3V0KGUpO1xuXG4gICAgICAgIHZhciB0aWxlanNvbiA9IHRoaXMuX3RpbGVqc29uIHx8IHRoaXMuX21hcC5fdGlsZWpzb24gfHwge30sXG4gICAgICAgICAgICB0d2l0dGVyID0gJ2h0dHA6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/c3RhdHVzPScgK1xuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh0aWxlanNvbi5uYW1lICsgJ1xcbicgKyAodGlsZWpzb24ud2VicGFnZSB8fCB3aW5kb3cubG9jYXRpb24pKSxcbiAgICAgICAgICAgIGZhY2Vib29rID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3U9JyArXG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMub3B0aW9ucy51cmwgfHwgdGlsZWpzb24ud2VicGFnZSB8fCB3aW5kb3cubG9jYXRpb24pICtcbiAgICAgICAgICAgICAgICAnJnQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aWxlanNvbi5uYW1lKSxcbiAgICAgICAgICAgIHNoYXJlID1cbiAgICAgICAgICAgICAgICBcIjxhIGNsYXNzPSdsZWFmbGV0LXBvcHVwLWNsb3NlLWJ1dHRvbicgaHJlZj0nI2Nsb3NlJz7DlzwvYT5cIiArXG4gICAgICAgICAgICAgICAgKFwiPGgzPlNoYXJlIHRoaXMgbWFwPC9oMz5cIiArXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nbWFwYm94LXNoYXJlLWJ1dHRvbnMnPjxhIGNsYXNzPSdtYXBib3gtc2hhcmUtZmFjZWJvb2sgbWFwYm94LWljb24gbWFwYm94LWljb24tZmFjZWJvb2snIHRhcmdldD0nX2JsYW5rJyBocmVmPSd7e2ZhY2Vib29rfX0nPkZhY2Vib29rPC9hPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCI8YSBjbGFzcz0nbWFwYm94LXNoYXJlLXR3aXR0ZXIgbWFwYm94LWljb24gbWFwYm94LWljb24tdHdpdHRlcicgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J3t7dHdpdHRlcn19Jz5Ud2l0dGVyPC9hPjwvZGl2PlwiKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3t0d2l0dGVyfX0nLCB0d2l0dGVyKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tmYWNlYm9va319JywgZmFjZWJvb2spICtcbiAgICAgICAgICAgICAgICAoXCI8aDM+R2V0IHRoZSBlbWJlZCBjb2RlPC9oMz5cIiArXG4gICAgICAgICAgICAgICAgXCI8c21hbGw+Q29weSBhbmQgcGFzdGUgdGhpcyBIVE1MIGludG8geW91ciB3ZWJzaXRlIG9yIGJsb2cuPC9zbWFsbD5cIikgK1xuICAgICAgICAgICAgICAgIFwiPHRleHRhcmVhIHJvd3M9ND57e3ZhbHVlfX08L3RleHRhcmVhPlwiXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e3ZhbHVlfX0nLCAoXCImbHQ7aWZyYW1lIHdpZHRoPSc1MDAnIGhlaWdodD0nMzAwJyBmcmFtZUJvcmRlcj0nMCcgc3JjPSd7e2VtYmVkfX0nJmd0OyZsdDsvaWZyYW1lJmd0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3tlbWJlZH19JywgdGlsZWpzb24uZW1iZWQgfHwgd2luZG93LmxvY2F0aW9uKSkpO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwID0gTC5tYXJrZXIodGhpcy5fbWFwLmdldENlbnRlcigpLCB7XG4gICAgICAgICAgICB6SW5kZXhPZmZzZXQ6IDEwMDAwLFxuICAgICAgICAgICAgaWNvbjogTC5kaXZJY29uKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdtYXBib3gtc2hhcmUtcG9wdXAnLFxuICAgICAgICAgICAgICAgIGljb25TaXplOiBMLnBvaW50KDM2MCwgMjQwKSxcbiAgICAgICAgICAgICAgICBpY29uQW5jaG9yOiBMLnBvaW50KDE4MCwgMTIwKSxcbiAgICAgICAgICAgICAgICBodG1sOiBzaGFyZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbihlLm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrJywgY2xpY2tQb3B1cCwgdGhpcykuYWRkVG8odGhpcy5fbWFwKTtcblxuICAgICAgICBmdW5jdGlvbiBjbGlja1BvcHVwKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09ICcjY2xvc2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpY2tPdXQoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMLkRvbUV2ZW50LnN0b3AoZS5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFNoYXJlQ29udHJvbChfLCBvcHRpb25zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZW9jb2RlciA9IHJlcXVpcmUoJy4vZ2VvY29kZXInKTtcblxudmFyIEdlb2NvZGVyQ29udHJvbCA9IEwuQ29udHJvbC5leHRlbmQoe1xuICAgIGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcG9zaXRpb246ICd0b3BsZWZ0JyxcbiAgICAgICAga2VlcE9wZW46IGZhbHNlXG4gICAgfSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICAgICAgTC5VdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIgPSBnZW9jb2RlcihfKTtcbiAgICB9LFxuXG4gICAgc2V0VVJMOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIuc2V0VVJMKF8pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0VVJMOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvY29kZXIuZ2V0VVJMKCk7XG4gICAgfSxcblxuICAgIHNldElEOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIuc2V0SUQoXyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXRUaWxlSlNPTjogZnVuY3Rpb24oXykge1xuICAgICAgICB0aGlzLmdlb2NvZGVyLnNldFRpbGVKU09OKF8pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3RvZ2dsZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSkgTC5Eb21FdmVudC5zdG9wKGUpO1xuICAgICAgICBpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jbG9zZUlmT3BlbjogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpICYmXG4gICAgICAgICAgICAhdGhpcy5vcHRpb25zLmtlZXBPcGVuKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXIgbGVhZmxldC1iYXIgbGVhZmxldC1jb250cm9sJyksXG4gICAgICAgICAgICBsaW5rID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsICdsZWFmbGV0LWNvbnRyb2wtbWFwYm94LWdlb2NvZGVyLXRvZ2dsZSBtYXBib3gtaWNvbiBtYXBib3gtaWNvbi1nZW9jb2RlcicsIGNvbnRhaW5lciksXG4gICAgICAgICAgICByZXN1bHRzID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXItcmVzdWx0cycsIGNvbnRhaW5lciksXG4gICAgICAgICAgICB3cmFwID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXItd3JhcCcsIGNvbnRhaW5lciksXG4gICAgICAgICAgICBmb3JtID0gTC5Eb21VdGlsLmNyZWF0ZSgnZm9ybScsICdsZWFmbGV0LWNvbnRyb2wtbWFwYm94LWdlb2NvZGVyLWZvcm0nLCB3cmFwKSxcbiAgICAgICAgICAgIGlucHV0ICA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJycsIGZvcm0pO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSAnJm5ic3A7JztcblxuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaCcpO1xuXG4gICAgICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoZm9ybSwgJ3N1Ym1pdCcsIHRoaXMuX2dlb2NvZGUsIHRoaXMpO1xuICAgICAgICBMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKGNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xuICAgICAgICB0aGlzLl9yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwT3Blbikge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKGNvbnRhaW5lciwgJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuX2Nsb3NlSWZPcGVuLCB0aGlzKTtcbiAgICAgICAgICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIobGluaywgJ2NsaWNrJywgdGhpcy5fdG9nZ2xlLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcblxuICAgIF9nZW9jb2RlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdzZWFyY2hpbmcnKTtcblxuICAgICAgICB2YXIgbWFwID0gdGhpcy5fbWFwO1xuICAgICAgICB2YXIgb25sb2FkID0gTC5iaW5kKGZ1bmN0aW9uKGVyciwgcmVzcCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ3NlYXJjaGluZycpO1xuICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzcCB8fCAhcmVzcC5yZXN1bHRzIHx8ICFyZXNwLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdlcnJvcicsIHtlcnJvcjogZXJyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AucmVzdWx0cy5sZW5ndGggPT09IDEgJiYgcmVzcC5sYm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5maXRCb3VuZHMocmVzcC5sYm91bmRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VJZk9wZW4oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IE1hdGgubWluKHJlc3AucmVzdWx0cy5sZW5ndGgsIDUpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXNwLnJlc3VsdHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcC5yZXN1bHRzW2ldW2pdLm5hbWUpIG5hbWUucHVzaChyZXNwLnJlc3VsdHNbaV1bal0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hbWUubGVuZ3RoKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgJycsIHRoaXMuX3Jlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgci5pbm5lckhUTUwgPSBuYW1lLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByLmhyZWYgPSAnIyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHIsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF8gPSByZXN1bHRbMF0uYm91bmRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKEwubGF0TG5nQm91bmRzKFtbX1sxXSwgX1swXV0sIFtfWzNdLCBfWzJdXV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTC5Eb21FdmVudC5zdG9wKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkocmVzcC5yZXN1bHRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcC5yZXN1bHRzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXRvZiA9IEwuRG9tVXRpbC5jcmVhdGUoJ3NwYW4nLCAnJywgdGhpcy5fcmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRvZi5pbm5lckhUTUwgPSAnVG9wIDUgb2YgJyArIHJlc3AucmVzdWx0cy5sZW5ndGggKyAnICByZXN1bHRzJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2ZvdW5kJywgcmVzcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZ2VvY29kZXIucXVlcnkodGhpcy5faW5wdXQudmFsdWUsIG9ubG9hZCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgR2VvY29kZXJDb250cm9sKF8sIG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB1cmwgPSByZXF1aXJlKCcuL3VybCcpLFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcbiAgICBncmlkID0gcmVxdWlyZSgnLi9ncmlkJyk7XG5cbi8vIGZvcmtlZCBmcm9tIGRhbnplbC9MLlVURkdyaWRcbnZhciBHcmlkTGF5ZXIgPSBMLkNsYXNzLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtMLk1peGluLkV2ZW50cywgcmVxdWlyZSgnLi9sb2FkX3RpbGVqc29uJyldLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24oKSB7IHJldHVybiAnJzsgfVxuICAgIH0sXG5cbiAgICBfbW91c2VPbjogbnVsbCxcbiAgICBfdGlsZWpzb246IHt9LFxuICAgIF9jYWNoZToge30sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sb2FkVGlsZUpTT04oXyk7XG4gICAgfSxcblxuICAgIF9zZXRUaWxlSlNPTjogZnVuY3Rpb24oanNvbikge1xuICAgICAgICB1dGlsLnN0cmljdChqc29uLCAnb2JqZWN0Jyk7XG5cbiAgICAgICAgTC5leHRlbmQodGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICBncmlkczoganNvbi5ncmlkcyxcbiAgICAgICAgICAgIG1pblpvb206IGpzb24ubWluem9vbSxcbiAgICAgICAgICAgIG1heFpvb206IGpzb24ubWF4em9vbSxcbiAgICAgICAgICAgIGJvdW5kczoganNvbi5ib3VuZHMgJiYgdXRpbC5sYm91bmRzKGpzb24uYm91bmRzKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl90aWxlanNvbiA9IGpzb247XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBnZXRUaWxlSlNPTjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlanNvbjtcbiAgICB9LFxuXG4gICAgYWN0aXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuX21hcCAmJiB0aGlzLm9wdGlvbnMuZ3JpZHMgJiYgdGhpcy5vcHRpb25zLmdyaWRzLmxlbmd0aCk7XG4gICAgfSxcblxuICAgIGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xuICAgICAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgICAgICB0aGlzLl9tYXBcbiAgICAgICAgICAgIC5vbignY2xpY2snLCB0aGlzLl9jbGljaywgdGhpcylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fbW92ZSwgdGhpcylcbiAgICAgICAgICAgIC5vbignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbWFwXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKVxuICAgICAgICAgICAgLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fbW92ZSwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBnZXREYXRhOiBmdW5jdGlvbihsYXRsbmcsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXAsXG4gICAgICAgICAgICBwb2ludCA9IG1hcC5wcm9qZWN0KGxhdGxuZy53cmFwKCkpLFxuICAgICAgICAgICAgdGlsZVNpemUgPSAyNTYsXG4gICAgICAgICAgICByZXNvbHV0aW9uID0gNCxcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHBvaW50LnggLyB0aWxlU2l6ZSksXG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihwb2ludC55IC8gdGlsZVNpemUpLFxuICAgICAgICAgICAgbWF4ID0gbWFwLm9wdGlvbnMuY3JzLnNjYWxlKG1hcC5nZXRab29tKCkpIC8gdGlsZVNpemU7XG5cbiAgICAgICAgeCA9ICh4ICsgbWF4KSAlIG1heDtcbiAgICAgICAgeSA9ICh5ICsgbWF4KSAlIG1heDtcblxuICAgICAgICB0aGlzLl9nZXRUaWxlKG1hcC5nZXRab29tKCksIHgsIHksIGZ1bmN0aW9uKGdyaWQpIHtcbiAgICAgICAgICAgIHZhciBncmlkWCA9IE1hdGguZmxvb3IoKHBvaW50LnggLSAoeCAqIHRpbGVTaXplKSkgLyByZXNvbHV0aW9uKSxcbiAgICAgICAgICAgICAgICBncmlkWSA9IE1hdGguZmxvb3IoKHBvaW50LnkgLSAoeSAqIHRpbGVTaXplKSkgLyByZXNvbHV0aW9uKTtcblxuICAgICAgICAgICAgY2FsbGJhY2soZ3JpZChncmlkWCwgZ3JpZFkpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9jbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmdldERhdGEoZS5sYXRsbmcsIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2NsaWNrJywge1xuICAgICAgICAgICAgICAgIGxhdExuZzogZS5sYXRsbmcsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX21vdmU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5nZXREYXRhKGUubGF0bG5nLCBMLmJpbmQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgIT09IHRoaXMuX21vdXNlT24pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VPbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ21vdXNlb3V0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF0TG5nOiBlLmxhdGxuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuX21vdXNlT25cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdtb3VzZW92ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIGxhdExuZzogZS5sYXRsbmcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlT24gPSBkYXRhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ21vdXNlbW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgbGF0TG5nOiBlLmxhdGxuZyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF9nZXRUaWxlVVJMOiBmdW5jdGlvbih0aWxlUG9pbnQpIHtcbiAgICAgICAgdmFyIHVybHMgPSB0aGlzLm9wdGlvbnMuZ3JpZHMsXG4gICAgICAgICAgICBpbmRleCA9ICh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHVybHMubGVuZ3RoLFxuICAgICAgICAgICAgdXJsID0gdXJsc1tpbmRleF07XG5cbiAgICAgICAgcmV0dXJuIEwuVXRpbC50ZW1wbGF0ZSh1cmwsIHRpbGVQb2ludCk7XG4gICAgfSxcblxuICAgIC8vIExvYWQgdXAgYWxsIHJlcXVpcmVkIGpzb24gZ3JpZCBmaWxlc1xuICAgIF91cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKCkpIHJldHVybjtcblxuICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5fbWFwLmdldFBpeGVsQm91bmRzKCksXG4gICAgICAgICAgICB6ID0gdGhpcy5fbWFwLmdldFpvb20oKSxcbiAgICAgICAgICAgIHRpbGVTaXplID0gMjU2O1xuXG4gICAgICAgIGlmICh6ID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgeiA8IHRoaXMub3B0aW9ucy5taW5ab29tKSByZXR1cm47XG5cbiAgICAgICAgdmFyIG53VGlsZVBvaW50ID0gbmV3IEwuUG9pbnQoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihib3VuZHMubWluLnggLyB0aWxlU2l6ZSksXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihib3VuZHMubWluLnkgLyB0aWxlU2l6ZSkpLFxuICAgICAgICAgICAgc2VUaWxlUG9pbnQgPSBuZXcgTC5Qb2ludChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5tYXgueCAvIHRpbGVTaXplKSxcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5tYXgueSAvIHRpbGVTaXplKSksXG4gICAgICAgICAgICBtYXggPSB0aGlzLl9tYXAub3B0aW9ucy5jcnMuc2NhbGUoeikgLyB0aWxlU2l6ZTtcblxuICAgICAgICBmb3IgKHZhciB4ID0gbndUaWxlUG9pbnQueDsgeCA8PSBzZVRpbGVQb2ludC54OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSBud1RpbGVQb2ludC55OyB5IDw9IHNlVGlsZVBvaW50Lnk7IHkrKykge1xuICAgICAgICAgICAgICAgIC8vIHggd3JhcHBlZFxuICAgICAgICAgICAgICAgIHZhciB4dyA9ICh4ICsgbWF4KSAlIG1heCwgeXcgPSAoeSArIG1heCkgJSBtYXg7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGlsZSh6LCB4dywgeXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRUaWxlOiBmdW5jdGlvbih6LCB4LCB5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIga2V5ID0geiArICdfJyArIHggKyAnXycgKyB5LFxuICAgICAgICAgICAgdGlsZVBvaW50ID0gTC5wb2ludCh4LCB5KTtcblxuICAgICAgICB0aWxlUG9pbnQueiA9IHo7XG5cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlU2hvdWxkQmVMb2FkZWQodGlsZVBvaW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9jYWNoZSkge1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NhY2hlW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9jYWNoZVtrZXldKTsgLy8gQWxyZWFkeSBsb2FkZWRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVba2V5XS5wdXNoKGNhbGxiYWNrKTsgLy8gUGVuZGluZ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWNoZVtrZXldID0gW107XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVtrZXldLnB1c2goY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdCh0aGlzLl9nZXRUaWxlVVJMKHRpbGVQb2ludCksIEwuYmluZChmdW5jdGlvbihlcnIsIGpzb24pIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWNoZVtrZXldO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGVba2V5XSA9IGdyaWQoanNvbik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXSh0aGlzLl9jYWNoZVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfdGlsZVNob3VsZEJlTG9hZGVkOiBmdW5jdGlvbih0aWxlUG9pbnQpIHtcbiAgICAgICAgaWYgKHRpbGVQb2ludC56ID4gdGhpcy5vcHRpb25zLm1heFpvb20gfHwgdGlsZVBvaW50LnogPCB0aGlzLm9wdGlvbnMubWluWm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ib3VuZHMpIHtcbiAgICAgICAgICAgIHZhciB0aWxlU2l6ZSA9IDI1NixcbiAgICAgICAgICAgICAgICBud1BvaW50ID0gdGlsZVBvaW50Lm11bHRpcGx5QnkodGlsZVNpemUpLFxuICAgICAgICAgICAgICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChuZXcgTC5Qb2ludCh0aWxlU2l6ZSwgdGlsZVNpemUpKSxcbiAgICAgICAgICAgICAgICBudyA9IHRoaXMuX21hcC51bnByb2plY3QobndQb2ludCksXG4gICAgICAgICAgICAgICAgc2UgPSB0aGlzLl9tYXAudW5wcm9qZWN0KHNlUG9pbnQpLFxuICAgICAgICAgICAgICAgIGJvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcyhbbncsIHNlXSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmJvdW5kcy5pbnRlcnNlY3RzKGJvdW5kcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHcmlkTGF5ZXIoXywgb3B0aW9ucyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIHRpbGVMYXllciA9IHJlcXVpcmUoJy4vdGlsZV9sYXllcicpLFxuICAgIG1hcmtlckxheWVyID0gcmVxdWlyZSgnLi9tYXJrZXJfbGF5ZXInKSxcbiAgICBncmlkTGF5ZXIgPSByZXF1aXJlKCcuL2dyaWRfbGF5ZXInKSxcbiAgICBncmlkQ29udHJvbCA9IHJlcXVpcmUoJy4vZ3JpZF9jb250cm9sJyksXG4gICAgbGVnZW5kQ29udHJvbCA9IHJlcXVpcmUoJy4vbGVnZW5kX2NvbnRyb2wnKTtcblxudmFyIE1hcCA9IEwuTWFwLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtyZXF1aXJlKCcuL2xvYWRfdGlsZWpzb24nKV0sXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHRpbGVMYXllcjoge30sXG4gICAgICAgIG1hcmtlckxheWVyOiB7fSxcbiAgICAgICAgZ3JpZExheWVyOiB7fSxcbiAgICAgICAgbGVnZW5kQ29udHJvbDoge30sXG4gICAgICAgIGdyaWRDb250cm9sOiB7fVxuICAgIH0sXG5cbiAgICBfdGlsZWpzb246IHt9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oZWxlbWVudCwgXywgb3B0aW9ucykge1xuICAgICAgICBMLk1hcC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGRpc2FibGUgdGhlIGRlZmF1bHQgJ1Bvd2VyZWQgYnkgTGVhZmxldCcgdGV4dFxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wpIHRoaXMuYXR0cmlidXRpb25Db250cm9sLnNldFByZWZpeCgnJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aWxlTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGlsZUxheWVyID0gdGlsZUxheWVyKHVuZGVmaW5lZCwgdGhpcy5vcHRpb25zLnRpbGVMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMudGlsZUxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWFya2VyTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFya2VyTGF5ZXIgPSBtYXJrZXJMYXllcih1bmRlZmluZWQsIHRoaXMub3B0aW9ucy5tYXJrZXJMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMubWFya2VyTGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ncmlkTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZExheWVyID0gZ3JpZExheWVyKHVuZGVmaW5lZCwgdGhpcy5vcHRpb25zLmdyaWRMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMuZ3JpZExheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JpZExheWVyICYmIHRoaXMub3B0aW9ucy5ncmlkQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5ncmlkQ29udHJvbCA9IGdyaWRDb250cm9sKHRoaXMuZ3JpZExheWVyLCB0aGlzLm9wdGlvbnMuZ3JpZENvbnRyb2wpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMuZ3JpZENvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZWdlbmRDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmxlZ2VuZENvbnRyb2wgPSBsZWdlbmRDb250cm9sKHRoaXMub3B0aW9ucy5sZWdlbmRDb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29udHJvbCh0aGlzLmxlZ2VuZENvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZFRpbGVKU09OKF8pO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgY2VydGFpbiBwcm9wZXJ0aWVzIG9uICdyZWFkeScgZXZlbnRcbiAgICBhZGRMYXllcjogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgaWYgKCdvbicgaW4gbGF5ZXIpIHsgbGF5ZXIub24oJ3JlYWR5JywgTC5iaW5kKGZ1bmN0aW9uKCkgeyB0aGlzLl91cGRhdGVMYXllcihsYXllcik7IH0sIHRoaXMpKTsgfVxuICAgICAgICByZXR1cm4gTC5NYXAucHJvdG90eXBlLmFkZExheWVyLmNhbGwodGhpcywgbGF5ZXIpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgYSBqYXZhc2NyaXB0IG9iamVjdCBvZiB0aWxlanNvbiBkYXRhIHRvIGNvbmZpZ3VyZSB0aGlzIGxheWVyXG4gICAgX3NldFRpbGVKU09OOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuX3RpbGVqc29uID0gXztcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZShfKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGdldFRpbGVKU09OOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVqc29uO1xuICAgIH0sXG5cbiAgICBfaW5pdGlhbGl6ZTogZnVuY3Rpb24oanNvbikge1xuICAgICAgICBpZiAodGhpcy50aWxlTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGlsZUxheWVyLl9zZXRUaWxlSlNPTihqc29uKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKHRoaXMudGlsZUxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hcmtlckxheWVyICYmICF0aGlzLm1hcmtlckxheWVyLmdldEdlb0pTT04oKSAmJiBqc29uLmRhdGEgJiYganNvbi5kYXRhWzBdKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlckxheWVyLmxvYWRVUkwoanNvbi5kYXRhWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdyaWRMYXllcikge1xuICAgICAgICAgICAgdGhpcy5ncmlkTGF5ZXIuX3NldFRpbGVKU09OKGpzb24pO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGF5ZXIodGhpcy5ncmlkTGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGVnZW5kQ29udHJvbCAmJiBqc29uLmxlZ2VuZCkge1xuICAgICAgICAgICAgdGhpcy5sZWdlbmRDb250cm9sLmFkZExlZ2VuZChqc29uLmxlZ2VuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2xvYWRlZCkge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBqc29uLmNlbnRlclsyXSxcbiAgICAgICAgICAgICAgICBjZW50ZXIgPSBMLmxhdExuZyhqc29uLmNlbnRlclsxXSwganNvbi5jZW50ZXJbMF0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcoY2VudGVyLCB6b29tKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlTGF5ZXI6IGZ1bmN0aW9uKGxheWVyKSB7XG5cbiAgICAgICAgaWYgKCFsYXllci5vcHRpb25zKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRpb25Db250cm9sICYmIHRoaXMuX2xvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24obGF5ZXIub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShMLnN0YW1wKGxheWVyKSBpbiB0aGlzLl96b29tQm91bmRMYXllcnMpICYmXG4gICAgICAgICAgICAgICAgKGxheWVyLm9wdGlvbnMubWF4Wm9vbSB8fCBsYXllci5vcHRpb25zLm1pblpvb20pKSB7XG4gICAgICAgICAgICB0aGlzLl96b29tQm91bmRMYXllcnNbTC5zdGFtcChsYXllcildID0gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVab29tTGV2ZWxzKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWxlbWVudCwgXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgTWFwKGVsZW1lbnQsIF8sIG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaWRVcmw6IGZ1bmN0aW9uKF8sIHQpIHtcbiAgICAgICAgaWYgKF8uaW5kZXhPZignLycpID09IC0xKSB0LmxvYWRJRChfKTtcbiAgICAgICAgZWxzZSB0LmxvYWRVUkwoXyk7XG4gICAgfSxcbiAgICBsb2c6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0cmljdDogZnVuY3Rpb24oXywgdHlwZSkge1xuICAgICAgICBpZiAodHlwZW9mIF8gIT09IHR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIHR5cGUgKyAnIGV4cGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0cmljdF9pbnN0YW5jZTogZnVuY3Rpb24oXywga2xhc3MsIG5hbWUpIHtcbiAgICAgICAgaWYgKCEoXyBpbnN0YW5jZW9mIGtsYXNzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50OiAnICsgbmFtZSArICcgZXhwZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RyaWN0X29uZW9mOiBmdW5jdGlvbihfLCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5pbmRleE9mKF8pID09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBfICsgJyBnaXZlbiwgdmFsaWQgdmFsdWVzIGFyZSAnICtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuam9pbignLCAnKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGxib3VuZHM6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgLy8gbGVhZmxldC1jb21wYXRpYmxlIGJvdW5kcywgc2luY2UgbGVhZmxldCBkb2VzIG5vdCBkbyBnZW9qc29uXG4gICAgICAgIHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHMoW1tfWzFdLCBfWzBdXSwgW19bM10sIF9bMl1dXSk7XG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gdXRmRGVjb2RlKGMpIHtcbiAgICBpZiAoYyA+PSA5MykgYy0tO1xuICAgIGlmIChjID49IDM1KSBjLS07XG4gICAgcmV0dXJuIGMgLSAzMjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgICAgIHZhciBpZHggPSB1dGZEZWNvZGUoZGF0YS5ncmlkW3ldLmNoYXJDb2RlQXQoeCkpLFxuICAgICAgICAgICAga2V5ID0gZGF0YS5rZXlzW2lkeF07XG4gICAgICAgIHJldHVybiBkYXRhLmRhdGFba2V5XTtcbiAgICB9O1xufTtcbiIsInZhciBodG1sX3Nhbml0aXplID0gcmVxdWlyZSgnLi9zYW5pdGl6ZXItYnVuZGxlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghXykgcmV0dXJuICcnO1xuICAgIHJldHVybiBodG1sX3Nhbml0aXplKF8sIGNsZWFuVXJsLCBjbGVhbklkKTtcbn07XG5cbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTI1NTEwN1xuZnVuY3Rpb24gY2xlYW5VcmwodXJsKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICgvXmh0dHBzPy8udGVzdCh1cmwuZ2V0U2NoZW1lKCkpKSByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgaWYgKCdkYXRhJyA9PSB1cmwuZ2V0U2NoZW1lKCkgJiYgL15pbWFnZS8udGVzdCh1cmwuZ2V0UGF0aCgpKSkge1xuICAgICAgICByZXR1cm4gdXJsLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGVhbklkKGlkKSB7IHJldHVybiBpZDsgfVxuIiwiXG4vLyBDb3B5cmlnaHQgKEMpIDIwMTAgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEltcGxlbWVudHMgUkZDIDM5ODYgZm9yIHBhcnNpbmcvZm9ybWF0dGluZyBVUklzLlxuICpcbiAqIEBhdXRob3IgbWlrZXNhbXVlbEBnbWFpbC5jb21cbiAqIFxcQHByb3ZpZGVzIFVSSVxuICogXFxAb3ZlcnJpZGVzIHdpbmRvd1xuICovXG5cbnZhciBVUkkgPSAoZnVuY3Rpb24gKCkge1xuXG4vKipcbiAqIGNyZWF0ZXMgYSB1cmkgZnJvbSB0aGUgc3RyaW5nIGZvcm0uICBUaGUgcGFyc2VyIGlzIHJlbGF4ZWQsIHNvIHNwZWNpYWxcbiAqIGNoYXJhY3RlcnMgdGhhdCBhcmVuJ3QgZXNjYXBlZCBidXQgZG9uJ3QgY2F1c2UgYW1iaWd1aXRpZXMgd2lsbCBub3QgY2F1c2VcbiAqIHBhcnNlIGZhaWx1cmVzLlxuICpcbiAqIEByZXR1cm4ge1VSSXxudWxsfVxuICovXG5mdW5jdGlvbiBwYXJzZSh1cmlTdHIpIHtcbiAgdmFyIG0gPSAoJycgKyB1cmlTdHIpLm1hdGNoKFVSSV9SRV8pO1xuICBpZiAoIW0pIHsgcmV0dXJuIG51bGw7IH1cbiAgcmV0dXJuIG5ldyBVUkkoXG4gICAgICBudWxsSWZBYnNlbnQobVsxXSksXG4gICAgICBudWxsSWZBYnNlbnQobVsyXSksXG4gICAgICBudWxsSWZBYnNlbnQobVszXSksXG4gICAgICBudWxsSWZBYnNlbnQobVs0XSksXG4gICAgICBudWxsSWZBYnNlbnQobVs1XSksXG4gICAgICBudWxsSWZBYnNlbnQobVs2XSksXG4gICAgICBudWxsSWZBYnNlbnQobVs3XSkpO1xufVxuXG5cbi8qKlxuICogY3JlYXRlcyBhIHVyaSBmcm9tIHRoZSBnaXZlbiBwYXJ0cy5cbiAqXG4gKiBAcGFyYW0gc2NoZW1lIHtzdHJpbmd9IGFuIHVuZW5jb2RlZCBzY2hlbWUgc3VjaCBhcyBcImh0dHBcIiBvciBudWxsXG4gKiBAcGFyYW0gY3JlZGVudGlhbHMge3N0cmluZ30gdW5lbmNvZGVkIHVzZXIgY3JlZGVudGlhbHMgb3IgbnVsbFxuICogQHBhcmFtIGRvbWFpbiB7c3RyaW5nfSBhbiB1bmVuY29kZWQgZG9tYWluIG5hbWUgb3IgbnVsbFxuICogQHBhcmFtIHBvcnQge251bWJlcn0gYSBwb3J0IG51bWJlciBpbiBbMSwgMzI3NjhdLlxuICogICAgLTEgaW5kaWNhdGVzIG5vIHBvcnQsIGFzIGRvZXMgbnVsbC5cbiAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9IGFuIHVuZW5jb2RlZCBwYXRoXG4gKiBAcGFyYW0gcXVlcnkge0FycmF5LjxzdHJpbmc+fHN0cmluZ3xudWxsfSBhIGxpc3Qgb2YgdW5lbmNvZGVkIGNnaVxuICogICBwYXJhbWV0ZXJzIHdoZXJlIGV2ZW4gdmFsdWVzIGFyZSBrZXlzIGFuZCBvZGRzIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlc1xuICogICBvciBhbiB1bmVuY29kZWQgcXVlcnkuXG4gKiBAcGFyYW0gZnJhZ21lbnQge3N0cmluZ30gYW4gdW5lbmNvZGVkIGZyYWdtZW50IHdpdGhvdXQgdGhlIFwiI1wiIG9yIG51bGwuXG4gKiBAcmV0dXJuIHtVUkl9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZShzY2hlbWUsIGNyZWRlbnRpYWxzLCBkb21haW4sIHBvcnQsIHBhdGgsIHF1ZXJ5LCBmcmFnbWVudCkge1xuICB2YXIgdXJpID0gbmV3IFVSSShcbiAgICAgIGVuY29kZUlmRXhpc3RzMihzY2hlbWUsIFVSSV9ESVNBTExPV0VEX0lOX1NDSEVNRV9PUl9DUkVERU5USUFMU18pLFxuICAgICAgZW5jb2RlSWZFeGlzdHMyKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLCBVUklfRElTQUxMT1dFRF9JTl9TQ0hFTUVfT1JfQ1JFREVOVElBTFNfKSxcbiAgICAgIGVuY29kZUlmRXhpc3RzKGRvbWFpbiksXG4gICAgICBwb3J0ID4gMCA/IHBvcnQudG9TdHJpbmcoKSA6IG51bGwsXG4gICAgICBlbmNvZGVJZkV4aXN0czIocGF0aCwgVVJJX0RJU0FMTE9XRURfSU5fUEFUSF8pLFxuICAgICAgbnVsbCxcbiAgICAgIGVuY29kZUlmRXhpc3RzKGZyYWdtZW50KSk7XG4gIGlmIChxdWVyeSkge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHF1ZXJ5KSB7XG4gICAgICB1cmkuc2V0UmF3UXVlcnkocXVlcnkucmVwbGFjZSgvW14/Jj0wLTlBLVphLXpfXFwtfi4lXS9nLCBlbmNvZGVPbmUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJpLnNldEFsbFBhcmFtZXRlcnMocXVlcnkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJpO1xufVxuZnVuY3Rpb24gZW5jb2RlSWZFeGlzdHModW5lc2NhcGVkUGFydCkge1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHVuZXNjYXBlZFBhcnQpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlZFBhcnQpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbi8qKlxuICogaWYgdW5lc2NhcGVkUGFydCBpcyBub24gbnVsbCwgdGhlbiBlc2NhcGVzIGFueSBjaGFyYWN0ZXJzIGluIGl0IHRoYXQgYXJlbid0XG4gKiB2YWxpZCBjaGFyYWN0ZXJzIGluIGEgdXJsIGFuZCBhbHNvIGVzY2FwZXMgYW55IHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0XG4gKiBhcHBlYXIgaW4gZXh0cmEuXG4gKlxuICogQHBhcmFtIHVuZXNjYXBlZFBhcnQge3N0cmluZ31cbiAqIEBwYXJhbSBleHRyYSB7UmVnRXhwfSBhIGNoYXJhY3RlciBzZXQgb2YgY2hhcmFjdGVycyBpbiBbXFwwMS1cXDE3N10uXG4gKiBAcmV0dXJuIHtzdHJpbmd8bnVsbH0gbnVsbCBpZmYgdW5lc2NhcGVkUGFydCA9PSBudWxsLlxuICovXG5mdW5jdGlvbiBlbmNvZGVJZkV4aXN0czIodW5lc2NhcGVkUGFydCwgZXh0cmEpIHtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB1bmVzY2FwZWRQYXJ0KSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSSh1bmVzY2FwZWRQYXJ0KS5yZXBsYWNlKGV4dHJhLCBlbmNvZGVPbmUpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbi8qKiBjb252ZXJ0cyBhIGNoYXJhY3RlciBpbiBbXFwwMS1cXDE3N10gdG8gaXRzIHVybCBlbmNvZGVkIGVxdWl2YWxlbnQuICovXG5mdW5jdGlvbiBlbmNvZGVPbmUoY2gpIHtcbiAgdmFyIG4gPSBjaC5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4gJyUnICsgJzAxMjM0NTY3ODlBQkNERUYnLmNoYXJBdCgobiA+PiA0KSAmIDB4ZikgK1xuICAgICAgJzAxMjM0NTY3ODlBQkNERUYnLmNoYXJBdChuICYgMHhmKTtcbn1cblxuLyoqXG4gKiB7QHVwZG9jXG4gKiAgJCBub3JtUGF0aCgnZm9vLy4vYmFyJylcbiAqICAjICdmb28vYmFyJ1xuICogICQgbm9ybVBhdGgoJy4vZm9vJylcbiAqICAjICdmb28nXG4gKiAgJCBub3JtUGF0aCgnZm9vLy4nKVxuICogICMgJ2ZvbydcbiAqICAkIG5vcm1QYXRoKCdmb28vL2JhcicpXG4gKiAgIyAnZm9vL2JhcidcbiAqIH1cbiAqL1xuZnVuY3Rpb24gbm9ybVBhdGgocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlKC8oXnxcXC8pXFwuKD86XFwvfCQpL2csICckMScpLnJlcGxhY2UoL1xcL3syLH0vZywgJy8nKTtcbn1cblxudmFyIFBBUkVOVF9ESVJFQ1RPUllfSEFORExFUiA9IG5ldyBSZWdFeHAoXG4gICAgJydcbiAgICAvLyBBIHBhdGggYnJlYWtcbiAgICArICcoL3xeKSdcbiAgICAvLyBmb2xsb3dlZCBieSBhIG5vbiAuLiBwYXRoIGVsZW1lbnRcbiAgICAvLyAoY2Fubm90IGJlIC4gYmVjYXVzZSBub3JtUGF0aCBpcyB1c2VkIHByaW9yIHRvIHRoaXMgUmVnRXhwKVxuICAgICsgJyg/OlteLi9dW14vXSp8XFxcXC57Mix9KD86W14uL11bXi9dKil8XFxcXC57Myx9W14vXSopJ1xuICAgIC8vIGZvbGxvd2VkIGJ5IC4uIGZvbGxvd2VkIGJ5IGEgcGF0aCBicmVhay5cbiAgICArICcvXFxcXC5cXFxcLig/Oi98JCknKTtcblxudmFyIFBBUkVOVF9ESVJFQ1RPUllfSEFORExFUl9SRSA9IG5ldyBSZWdFeHAoUEFSRU5UX0RJUkVDVE9SWV9IQU5ETEVSKTtcblxudmFyIEVYVFJBX1BBUkVOVF9QQVRIU19SRSA9IC9eKD86XFwuXFwuXFwvKSooPzpcXC5cXC4kKT8vO1xuXG4vKipcbiAqIE5vcm1hbGl6ZXMgaXRzIGlucHV0IHBhdGggYW5kIGNvbGxhcHNlcyBhbGwgLiBhbmQgLi4gc2VxdWVuY2VzIGV4Y2VwdCBmb3JcbiAqIC4uIHNlcXVlbmNlcyB0aGF0IHdvdWxkIHRha2UgaXQgYWJvdmUgdGhlIHJvb3Qgb2YgdGhlIGN1cnJlbnQgcGFyZW50XG4gKiBkaXJlY3RvcnkuXG4gKiB7QHVwZG9jXG4gKiAgJCBjb2xsYXBzZV9kb3RzKCdmb28vLi4vYmFyJylcbiAqICAjICdiYXInXG4gKiAgJCBjb2xsYXBzZV9kb3RzKCdmb28vLi9iYXInKVxuICogICMgJ2Zvby9iYXInXG4gKiAgJCBjb2xsYXBzZV9kb3RzKCdmb28vLi4vYmFyLy4vLi4vLi4vYmF6JylcbiAqICAjICdiYXonXG4gKiAgJCBjb2xsYXBzZV9kb3RzKCcuLi9mb28nKVxuICogICMgJy4uL2ZvbydcbiAqICAkIGNvbGxhcHNlX2RvdHMoJy4uL2ZvbycpLnJlcGxhY2UoRVhUUkFfUEFSRU5UX1BBVEhTX1JFLCAnJylcbiAqICAjICdmb28nXG4gKiB9XG4gKi9cbmZ1bmN0aW9uIGNvbGxhcHNlX2RvdHMocGF0aCkge1xuICBpZiAocGF0aCA9PT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICB2YXIgcCA9IG5vcm1QYXRoKHBhdGgpO1xuICAvLyBPbmx5IC8uLi8gbGVmdCB0byBmbGF0dGVuXG4gIHZhciByID0gUEFSRU5UX0RJUkVDVE9SWV9IQU5ETEVSX1JFO1xuICAvLyBXZSByZXBsYWNlIHdpdGggJDEgd2hpY2ggbWF0Y2hlcyBhIC8gYmVmb3JlIHRoZSAuLiBiZWNhdXNlIHRoaXNcbiAgLy8gZ3VhcmFudGVlcyB0aGF0OlxuICAvLyAoMSkgd2UgaGF2ZSBhdCBtb3N0IDEgLyBiZXR3ZWVuIHRoZSBhZGphY2VudCBwbGFjZSxcbiAgLy8gKDIpIGFsd2F5cyBoYXZlIGEgc2xhc2ggaWYgdGhlcmUgaXMgYSBwcmVjZWRpbmcgcGF0aCBzZWN0aW9uLCBhbmRcbiAgLy8gKDMpIHdlIG5ldmVyIHR1cm4gYSByZWxhdGl2ZSBwYXRoIGludG8gYW4gYWJzb2x1dGUgcGF0aC5cbiAgZm9yICh2YXIgcTsgKHEgPSBwLnJlcGxhY2UociwgJyQxJykpICE9IHA7IHAgPSBxKSB7fTtcbiAgcmV0dXJuIHA7XG59XG5cbi8qKlxuICogcmVzb2x2ZXMgYSByZWxhdGl2ZSB1cmwgc3RyaW5nIHRvIGEgYmFzZSB1cmkuXG4gKiBAcmV0dXJuIHtVUkl9XG4gKi9cbmZ1bmN0aW9uIHJlc29sdmUoYmFzZVVyaSwgcmVsYXRpdmVVcmkpIHtcbiAgLy8gdGhlcmUgYXJlIHNldmVyYWwga2luZHMgb2YgcmVsYXRpdmUgdXJsczpcbiAgLy8gMS4gLy9mb28gLSByZXBsYWNlcyBldmVyeXRoaW5nIGZyb20gdGhlIGRvbWFpbiBvbi4gIGZvbyBpcyBhIGRvbWFpbiBuYW1lXG4gIC8vIDIuIGZvbyAtIHJlcGxhY2VzIHRoZSBsYXN0IHBhcnQgb2YgdGhlIHBhdGgsIHRoZSB3aG9sZSBxdWVyeSBhbmQgZnJhZ21lbnRcbiAgLy8gMy4gL2ZvbyAtIHJlcGxhY2VzIHRoZSB0aGUgcGF0aCwgdGhlIHF1ZXJ5IGFuZCBmcmFnbWVudFxuICAvLyA0LiA/Zm9vIC0gcmVwbGFjZSB0aGUgcXVlcnkgYW5kIGZyYWdtZW50XG4gIC8vIDUuICNmb28gLSByZXBsYWNlIHRoZSBmcmFnbWVudCBvbmx5XG5cbiAgdmFyIGFic29sdXRlVXJpID0gYmFzZVVyaS5jbG9uZSgpO1xuICAvLyB3ZSBzYXRpc2Z5IHRoZXNlIGNvbmRpdGlvbnMgYnkgbG9va2luZyBmb3IgdGhlIGZpcnN0IHBhcnQgb2YgcmVsYXRpdmVVcmlcbiAgLy8gdGhhdCBpcyBub3QgYmxhbmsgYW5kIGFwcGx5aW5nIGRlZmF1bHRzIHRvIHRoZSByZXN0XG5cbiAgdmFyIG92ZXJyaWRkZW4gPSByZWxhdGl2ZVVyaS5oYXNTY2hlbWUoKTtcblxuICBpZiAob3ZlcnJpZGRlbikge1xuICAgIGFic29sdXRlVXJpLnNldFJhd1NjaGVtZShyZWxhdGl2ZVVyaS5nZXRSYXdTY2hlbWUoKSk7XG4gIH0gZWxzZSB7XG4gICAgb3ZlcnJpZGRlbiA9IHJlbGF0aXZlVXJpLmhhc0NyZWRlbnRpYWxzKCk7XG4gIH1cblxuICBpZiAob3ZlcnJpZGRlbikge1xuICAgIGFic29sdXRlVXJpLnNldFJhd0NyZWRlbnRpYWxzKHJlbGF0aXZlVXJpLmdldFJhd0NyZWRlbnRpYWxzKCkpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJyaWRkZW4gPSByZWxhdGl2ZVVyaS5oYXNEb21haW4oKTtcbiAgfVxuXG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UmF3RG9tYWluKHJlbGF0aXZlVXJpLmdldFJhd0RvbWFpbigpKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVycmlkZGVuID0gcmVsYXRpdmVVcmkuaGFzUG9ydCgpO1xuICB9XG5cbiAgdmFyIHJhd1BhdGggPSByZWxhdGl2ZVVyaS5nZXRSYXdQYXRoKCk7XG4gIHZhciBzaW1wbGlmaWVkUGF0aCA9IGNvbGxhcHNlX2RvdHMocmF3UGF0aCk7XG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UG9ydChyZWxhdGl2ZVVyaS5nZXRQb3J0KCkpO1xuICAgIHNpbXBsaWZpZWRQYXRoID0gc2ltcGxpZmllZFBhdGhcbiAgICAgICAgJiYgc2ltcGxpZmllZFBhdGgucmVwbGFjZShFWFRSQV9QQVJFTlRfUEFUSFNfUkUsICcnKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVycmlkZGVuID0gISFyYXdQYXRoO1xuICAgIGlmIChvdmVycmlkZGVuKSB7XG4gICAgICAvLyByZXNvbHZlIHBhdGggcHJvcGVybHlcbiAgICAgIGlmIChzaW1wbGlmaWVkUGF0aC5jaGFyQ29kZUF0KDApICE9PSAweDJmIC8qIC8gKi8pIHsgIC8vIHBhdGggaXMgcmVsYXRpdmVcbiAgICAgICAgdmFyIGFic1Jhd1BhdGggPSBjb2xsYXBzZV9kb3RzKGFic29sdXRlVXJpLmdldFJhd1BhdGgoKSB8fCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKEVYVFJBX1BBUkVOVF9QQVRIU19SRSwgJycpO1xuICAgICAgICB2YXIgc2xhc2ggPSBhYnNSYXdQYXRoLmxhc3RJbmRleE9mKCcvJykgKyAxO1xuICAgICAgICBzaW1wbGlmaWVkUGF0aCA9IGNvbGxhcHNlX2RvdHMoXG4gICAgICAgICAgICAoc2xhc2ggPyBhYnNSYXdQYXRoLnN1YnN0cmluZygwLCBzbGFzaCkgOiAnJylcbiAgICAgICAgICAgICsgY29sbGFwc2VfZG90cyhyYXdQYXRoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKEVYVFJBX1BBUkVOVF9QQVRIU19SRSwgJycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaW1wbGlmaWVkUGF0aCA9IHNpbXBsaWZpZWRQYXRoXG4gICAgICAgICAgJiYgc2ltcGxpZmllZFBhdGgucmVwbGFjZShFWFRSQV9QQVJFTlRfUEFUSFNfUkUsICcnKTtcbiAgICAgIGlmIChzaW1wbGlmaWVkUGF0aCAhPT0gcmF3UGF0aCkge1xuICAgICAgICBhYnNvbHV0ZVVyaS5zZXRSYXdQYXRoKHNpbXBsaWZpZWRQYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAob3ZlcnJpZGRlbikge1xuICAgIGFic29sdXRlVXJpLnNldFJhd1BhdGgoc2ltcGxpZmllZFBhdGgpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJyaWRkZW4gPSByZWxhdGl2ZVVyaS5oYXNRdWVyeSgpO1xuICB9XG5cbiAgaWYgKG92ZXJyaWRkZW4pIHtcbiAgICBhYnNvbHV0ZVVyaS5zZXRSYXdRdWVyeShyZWxhdGl2ZVVyaS5nZXRSYXdRdWVyeSgpKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVycmlkZGVuID0gcmVsYXRpdmVVcmkuaGFzRnJhZ21lbnQoKTtcbiAgfVxuXG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UmF3RnJhZ21lbnQocmVsYXRpdmVVcmkuZ2V0UmF3RnJhZ21lbnQoKSk7XG4gIH1cblxuICByZXR1cm4gYWJzb2x1dGVVcmk7XG59XG5cbi8qKlxuICogYSBtdXRhYmxlIFVSSS5cbiAqXG4gKiBUaGlzIGNsYXNzIGNvbnRhaW5zIHNldHRlcnMgYW5kIGdldHRlcnMgZm9yIHRoZSBwYXJ0cyBvZiB0aGUgVVJJLlxuICogVGhlIDx0dD5nZXRYWVo8L3R0Pi88dHQ+c2V0WFlaPC90dD4gbWV0aG9kcyByZXR1cm4gdGhlIGRlY29kZWQgcGFydCAtLSBzb1xuICogPGNvZGU+dXJpLnBhcnNlKCcvZm9vJTIwYmFyJykuZ2V0UGF0aCgpPC9jb2RlPiB3aWxsIHJldHVybiB0aGUgZGVjb2RlZCBwYXRoLFxuICogPHR0Pi9mb28gYmFyPC90dD4uXG4gKlxuICogPHA+VGhlIHJhdyB2ZXJzaW9ucyBvZiBmaWVsZHMgYXJlIGF2YWlsYWJsZSB0b28uXG4gKiA8Y29kZT51cmkucGFyc2UoJy9mb28lMjBiYXInKS5nZXRSYXdQYXRoKCk8L2NvZGU+IHdpbGwgcmV0dXJuIHRoZSByYXcgcGF0aCxcbiAqIDx0dD4vZm9vJTIwYmFyPC90dD4uICBVc2UgdGhlIHJhdyBzZXR0ZXJzIHdpdGggY2FyZSwgc2luY2VcbiAqIDxjb2RlPlVSSTo6dG9TdHJpbmc8L2NvZGU+IGlzIG5vdCBndWFyYW50ZWVkIHRvIHJldHVybiBhIHZhbGlkIHVybCBpZiBhXG4gKiByYXcgc2V0dGVyIHdhcyB1c2VkLlxuICpcbiAqIDxwPkFsbCBzZXR0ZXJzIHJldHVybiA8dHQ+dGhpczwvdHQ+IGFuZCBzbyBtYXkgYmUgY2hhaW5lZCwgYSBsYVxuICogPGNvZGU+dXJpLnBhcnNlKCcvZm9vJykuc2V0RnJhZ21lbnQoJ3BhcnQnKS50b1N0cmluZygpPC9jb2RlPi5cbiAqXG4gKiA8cD5Zb3Ugc2hvdWxkIG5vdCB1c2UgdGhpcyBjb25zdHJ1Y3RvciBkaXJlY3RseSAtLSBwbGVhc2UgcHJlZmVyIHRoZSBmYWN0b3J5XG4gKiBmdW5jdGlvbnMge0BsaW5rIHVyaS5wYXJzZX0sIHtAbGluayB1cmkuY3JlYXRlfSwge0BsaW5rIHVyaS5yZXNvbHZlfVxuICogaW5zdGVhZC48L3A+XG4gKlxuICogPHA+VGhlIHBhcmFtZXRlcnMgYXJlIGFsbCByYXcgKGFzc3VtZWQgdG8gYmUgcHJvcGVybHkgZXNjYXBlZCkgcGFydHMsIGFuZFxuICogYW55IChidXQgbm90IGFsbCkgbWF5IGJlIG51bGwuICBVbmRlZmluZWQgaXMgbm90IGFsbG93ZWQuPC9wPlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVUkkoXG4gICAgcmF3U2NoZW1lLFxuICAgIHJhd0NyZWRlbnRpYWxzLCByYXdEb21haW4sIHBvcnQsXG4gICAgcmF3UGF0aCwgcmF3UXVlcnksIHJhd0ZyYWdtZW50KSB7XG4gIHRoaXMuc2NoZW1lXyA9IHJhd1NjaGVtZTtcbiAgdGhpcy5jcmVkZW50aWFsc18gPSByYXdDcmVkZW50aWFscztcbiAgdGhpcy5kb21haW5fID0gcmF3RG9tYWluO1xuICB0aGlzLnBvcnRfID0gcG9ydDtcbiAgdGhpcy5wYXRoXyA9IHJhd1BhdGg7XG4gIHRoaXMucXVlcnlfID0gcmF3UXVlcnk7XG4gIHRoaXMuZnJhZ21lbnRfID0gcmF3RnJhZ21lbnQ7XG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXl8bnVsbH1cbiAgICovXG4gIHRoaXMucGFyYW1DYWNoZV8gPSBudWxsO1xufVxuXG4vKiogcmV0dXJucyB0aGUgc3RyaW5nIGZvcm0gb2YgdGhlIHVybC4gKi9cblVSSS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgaWYgKG51bGwgIT09IHRoaXMuc2NoZW1lXykgeyBvdXQucHVzaCh0aGlzLnNjaGVtZV8sICc6Jyk7IH1cbiAgaWYgKG51bGwgIT09IHRoaXMuZG9tYWluXykge1xuICAgIG91dC5wdXNoKCcvLycpO1xuICAgIGlmIChudWxsICE9PSB0aGlzLmNyZWRlbnRpYWxzXykgeyBvdXQucHVzaCh0aGlzLmNyZWRlbnRpYWxzXywgJ0AnKTsgfVxuICAgIG91dC5wdXNoKHRoaXMuZG9tYWluXyk7XG4gICAgaWYgKG51bGwgIT09IHRoaXMucG9ydF8pIHsgb3V0LnB1c2goJzonLCB0aGlzLnBvcnRfLnRvU3RyaW5nKCkpOyB9XG4gIH1cbiAgaWYgKG51bGwgIT09IHRoaXMucGF0aF8pIHsgb3V0LnB1c2godGhpcy5wYXRoXyk7IH1cbiAgaWYgKG51bGwgIT09IHRoaXMucXVlcnlfKSB7IG91dC5wdXNoKCc/JywgdGhpcy5xdWVyeV8pOyB9XG4gIGlmIChudWxsICE9PSB0aGlzLmZyYWdtZW50XykgeyBvdXQucHVzaCgnIycsIHRoaXMuZnJhZ21lbnRfKTsgfVxuICByZXR1cm4gb3V0LmpvaW4oJycpO1xufTtcblxuVVJJLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBVUkkodGhpcy5zY2hlbWVfLCB0aGlzLmNyZWRlbnRpYWxzXywgdGhpcy5kb21haW5fLCB0aGlzLnBvcnRfLFxuICAgICAgICAgICAgICAgICB0aGlzLnBhdGhfLCB0aGlzLnF1ZXJ5XywgdGhpcy5mcmFnbWVudF8pO1xufTtcblxuVVJJLnByb3RvdHlwZS5nZXRTY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIEhUTUw1IHNwZWMgZG9lcyBub3QgcmVxdWlyZSB0aGUgc2NoZW1lIHRvIGJlIGxvd2VyY2FzZWQgYnV0XG4gIC8vIGFsbCBjb21tb24gYnJvd3NlcnMgZXhjZXB0IFNhZmFyaSBsb3dlcmNhc2UgdGhlIHNjaGVtZS5cbiAgcmV0dXJuIHRoaXMuc2NoZW1lXyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5zY2hlbWVfKS50b0xvd2VyQ2FzZSgpO1xufTtcblVSSS5wcm90b3R5cGUuZ2V0UmF3U2NoZW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5zY2hlbWVfO1xufTtcblVSSS5wcm90b3R5cGUuc2V0U2NoZW1lID0gZnVuY3Rpb24gKG5ld1NjaGVtZSkge1xuICB0aGlzLnNjaGVtZV8gPSBlbmNvZGVJZkV4aXN0czIoXG4gICAgICBuZXdTY2hlbWUsIFVSSV9ESVNBTExPV0VEX0lOX1NDSEVNRV9PUl9DUkVERU5USUFMU18pO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLnNldFJhd1NjaGVtZSA9IGZ1bmN0aW9uIChuZXdTY2hlbWUpIHtcbiAgdGhpcy5zY2hlbWVfID0gbmV3U2NoZW1lID8gbmV3U2NoZW1lIDogbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5oYXNTY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBudWxsICE9PSB0aGlzLnNjaGVtZV87XG59O1xuXG5cblVSSS5wcm90b3R5cGUuZ2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNyZWRlbnRpYWxzXyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5jcmVkZW50aWFsc18pO1xufTtcblVSSS5wcm90b3R5cGUuZ2V0UmF3Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNyZWRlbnRpYWxzXztcbn07XG5VUkkucHJvdG90eXBlLnNldENyZWRlbnRpYWxzID0gZnVuY3Rpb24gKG5ld0NyZWRlbnRpYWxzKSB7XG4gIHRoaXMuY3JlZGVudGlhbHNfID0gZW5jb2RlSWZFeGlzdHMyKFxuICAgICAgbmV3Q3JlZGVudGlhbHMsIFVSSV9ESVNBTExPV0VEX0lOX1NDSEVNRV9PUl9DUkVERU5USUFMU18pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UmF3Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAobmV3Q3JlZGVudGlhbHMpIHtcbiAgdGhpcy5jcmVkZW50aWFsc18gPSBuZXdDcmVkZW50aWFscyA/IG5ld0NyZWRlbnRpYWxzIDogbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5oYXNDcmVkZW50aWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG51bGwgIT09IHRoaXMuY3JlZGVudGlhbHNfO1xufTtcblxuXG5VUkkucHJvdG90eXBlLmdldERvbWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZG9tYWluXyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5kb21haW5fKTtcbn07XG5VUkkucHJvdG90eXBlLmdldFJhd0RvbWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZG9tYWluXztcbn07XG5VUkkucHJvdG90eXBlLnNldERvbWFpbiA9IGZ1bmN0aW9uIChuZXdEb21haW4pIHtcbiAgcmV0dXJuIHRoaXMuc2V0UmF3RG9tYWluKG5ld0RvbWFpbiAmJiBlbmNvZGVVUklDb21wb25lbnQobmV3RG9tYWluKSk7XG59O1xuVVJJLnByb3RvdHlwZS5zZXRSYXdEb21haW4gPSBmdW5jdGlvbiAobmV3RG9tYWluKSB7XG4gIHRoaXMuZG9tYWluXyA9IG5ld0RvbWFpbiA/IG5ld0RvbWFpbiA6IG51bGw7XG4gIC8vIE1haW50YWluIHRoZSBpbnZhcmlhbnQgdGhhdCBwYXRocyBtdXN0IHN0YXJ0IHdpdGggYSBzbGFzaCB3aGVuIHRoZSBVUklcbiAgLy8gaXMgbm90IHBhdGgtcmVsYXRpdmUuXG4gIHJldHVybiB0aGlzLnNldFJhd1BhdGgodGhpcy5wYXRoXyk7XG59O1xuVVJJLnByb3RvdHlwZS5oYXNEb21haW4gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBudWxsICE9PSB0aGlzLmRvbWFpbl87XG59O1xuXG5cblVSSS5wcm90b3R5cGUuZ2V0UG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucG9ydF8gJiYgZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMucG9ydF8pO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UG9ydCA9IGZ1bmN0aW9uIChuZXdQb3J0KSB7XG4gIGlmIChuZXdQb3J0KSB7XG4gICAgbmV3UG9ydCA9IE51bWJlcihuZXdQb3J0KTtcbiAgICBpZiAobmV3UG9ydCAhPT0gKG5ld1BvcnQgJiAweGZmZmYpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZCBwb3J0IG51bWJlciAnICsgbmV3UG9ydCk7XG4gICAgfVxuICAgIHRoaXMucG9ydF8gPSAnJyArIG5ld1BvcnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wb3J0XyA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5oYXNQb3J0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbnVsbCAhPT0gdGhpcy5wb3J0Xztcbn07XG5cblxuVVJJLnByb3RvdHlwZS5nZXRQYXRoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wYXRoXyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5wYXRoXyk7XG59O1xuVVJJLnByb3RvdHlwZS5nZXRSYXdQYXRoID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wYXRoXztcbn07XG5VUkkucHJvdG90eXBlLnNldFBhdGggPSBmdW5jdGlvbiAobmV3UGF0aCkge1xuICByZXR1cm4gdGhpcy5zZXRSYXdQYXRoKGVuY29kZUlmRXhpc3RzMihuZXdQYXRoLCBVUklfRElTQUxMT1dFRF9JTl9QQVRIXykpO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UmF3UGF0aCA9IGZ1bmN0aW9uIChuZXdQYXRoKSB7XG4gIGlmIChuZXdQYXRoKSB7XG4gICAgbmV3UGF0aCA9IFN0cmluZyhuZXdQYXRoKTtcbiAgICB0aGlzLnBhdGhfID0gXG4gICAgICAvLyBQYXRocyBtdXN0IHN0YXJ0IHdpdGggJy8nIHVubGVzcyB0aGlzIGlzIGEgcGF0aC1yZWxhdGl2ZSBVUkwuXG4gICAgICAoIXRoaXMuZG9tYWluXyB8fCAvXlxcLy8udGVzdChuZXdQYXRoKSkgPyBuZXdQYXRoIDogJy8nICsgbmV3UGF0aDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnBhdGhfID0gbnVsbDtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc1BhdGggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBudWxsICE9PSB0aGlzLnBhdGhfO1xufTtcblxuXG5VUkkucHJvdG90eXBlLmdldFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBGcm9tIGh0dHA6Ly93d3cudzMub3JnL0FkZHJlc3NpbmcvVVJMLzRfVVJJX1JlY29tbWVudGF0aW9ucy5odG1sXG4gIC8vIFdpdGhpbiB0aGUgcXVlcnkgc3RyaW5nLCB0aGUgcGx1cyBzaWduIGlzIHJlc2VydmVkIGFzIHNob3J0aGFuZCBub3RhdGlvblxuICAvLyBmb3IgYSBzcGFjZS5cbiAgcmV0dXJuIHRoaXMucXVlcnlfICYmIGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnF1ZXJ5XykucmVwbGFjZSgvXFwrL2csICcgJyk7XG59O1xuVVJJLnByb3RvdHlwZS5nZXRSYXdRdWVyeSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlfO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UXVlcnkgPSBmdW5jdGlvbiAobmV3UXVlcnkpIHtcbiAgdGhpcy5wYXJhbUNhY2hlXyA9IG51bGw7XG4gIHRoaXMucXVlcnlfID0gZW5jb2RlSWZFeGlzdHMobmV3UXVlcnkpO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLnNldFJhd1F1ZXJ5ID0gZnVuY3Rpb24gKG5ld1F1ZXJ5KSB7XG4gIHRoaXMucGFyYW1DYWNoZV8gPSBudWxsO1xuICB0aGlzLnF1ZXJ5XyA9IG5ld1F1ZXJ5ID8gbmV3UXVlcnkgOiBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc1F1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbnVsbCAhPT0gdGhpcy5xdWVyeV87XG59O1xuXG4vKipcbiAqIHNldHMgdGhlIHF1ZXJ5IGdpdmVuIGEgbGlzdCBvZiBzdHJpbmdzIG9mIHRoZSBmb3JtXG4gKiBbIGtleTAsIHZhbHVlMCwga2V5MSwgdmFsdWUxLCAuLi4gXS5cbiAqXG4gKiA8cD48Y29kZT51cmkuc2V0QWxsUGFyYW1ldGVycyhbJ2EnLCAnYicsICdjJywgJ2QnXSkuZ2V0UXVlcnkoKTwvY29kZT5cbiAqIHdpbGwgeWllbGQgPGNvZGU+J2E9YiZjPWQnPC9jb2RlPi5cbiAqL1xuVVJJLnByb3RvdHlwZS5zZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoIShwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgJiYgKHBhcmFtcyBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhcmFtcykgIT09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICB2YXIgbmV3UGFyYW1zID0gW107XG4gICAgICB2YXIgaSA9IC0xO1xuICAgICAgZm9yICh2YXIgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHYgPSBwYXJhbXNba107XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHYpIHtcbiAgICAgICAgICBuZXdQYXJhbXNbKytpXSA9IGs7XG4gICAgICAgICAgbmV3UGFyYW1zWysraV0gPSB2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwYXJhbXMgPSBuZXdQYXJhbXM7XG4gICAgfVxuICB9XG4gIHRoaXMucGFyYW1DYWNoZV8gPSBudWxsO1xuICB2YXIgcXVlcnlCdWYgPSBbXTtcbiAgdmFyIHNlcGFyYXRvciA9ICcnO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcmFtcy5sZW5ndGg7KSB7XG4gICAgdmFyIGsgPSBwYXJhbXNbaisrXTtcbiAgICB2YXIgdiA9IHBhcmFtc1tqKytdO1xuICAgIHF1ZXJ5QnVmLnB1c2goc2VwYXJhdG9yLCBlbmNvZGVVUklDb21wb25lbnQoay50b1N0cmluZygpKSk7XG4gICAgc2VwYXJhdG9yID0gJyYnO1xuICAgIGlmICh2KSB7XG4gICAgICBxdWVyeUJ1Zi5wdXNoKCc9JywgZW5jb2RlVVJJQ29tcG9uZW50KHYudG9TdHJpbmcoKSkpO1xuICAgIH1cbiAgfVxuICB0aGlzLnF1ZXJ5XyA9IHF1ZXJ5QnVmLmpvaW4oJycpO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmNoZWNrUGFyYW1ldGVyQ2FjaGVfID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMucGFyYW1DYWNoZV8pIHtcbiAgICB2YXIgcSA9IHRoaXMucXVlcnlfO1xuICAgIGlmICghcSkge1xuICAgICAgdGhpcy5wYXJhbUNhY2hlXyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY2dpUGFyYW1zID0gcS5zcGxpdCgvWyZcXD9dLyk7XG4gICAgICB2YXIgb3V0ID0gW107XG4gICAgICB2YXIgayA9IC0xO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZ2lQYXJhbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIG0gPSBjZ2lQYXJhbXNbaV0ubWF0Y2goL14oW149XSopKD86PSguKikpPyQvKTtcbiAgICAgICAgLy8gRnJvbSBodHRwOi8vd3d3LnczLm9yZy9BZGRyZXNzaW5nL1VSTC80X1VSSV9SZWNvbW1lbnRhdGlvbnMuaHRtbFxuICAgICAgICAvLyBXaXRoaW4gdGhlIHF1ZXJ5IHN0cmluZywgdGhlIHBsdXMgc2lnbiBpcyByZXNlcnZlZCBhcyBzaG9ydGhhbmRcbiAgICAgICAgLy8gbm90YXRpb24gZm9yIGEgc3BhY2UuXG4gICAgICAgIG91dFsrK2tdID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMV0pLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICBvdXRbKytrXSA9IGRlY29kZVVSSUNvbXBvbmVudChtWzJdIHx8ICcnKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFyYW1DYWNoZV8gPSBvdXQ7XG4gICAgfVxuICB9XG59O1xuLyoqXG4gKiBzZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIG5hbWVkIGNnaSBwYXJhbWV0ZXJzLlxuICpcbiAqIDxwPlNvLCA8Y29kZT51cmkucGFyc2UoJ2Zvbz9hPWImYz1kJmU9ZicpLnNldFBhcmFtZXRlclZhbHVlcygnYycsIFsnbmV3J10pXG4gKiA8L2NvZGU+IHlpZWxkcyA8dHQ+Zm9vP2E9YiZjPW5ldyZlPWY8L3R0Pi48L3A+XG4gKlxuICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICogQHBhcmFtIHZhbHVlcyB7QXJyYXkuPHN0cmluZz59IHRoZSBuZXcgdmFsdWVzLiAgSWYgdmFsdWVzIGlzIGEgc2luZ2xlIHN0cmluZ1xuICogICB0aGVuIGl0IHdpbGwgYmUgdHJlYXRlZCBhcyB0aGUgc29sZSB2YWx1ZS5cbiAqL1xuVVJJLnByb3RvdHlwZS5zZXRQYXJhbWV0ZXJWYWx1ZXMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZXMpIHtcbiAgLy8gYmUgbmljZSBhbmQgYXZvaWQgc3VidGxlIGJ1Z3Mgd2hlcmUgW10gb3BlcmF0b3Igb24gc3RyaW5nIHBlcmZvcm1zIGNoYXJBdFxuICAvLyBvbiBzb21lIGJyb3dzZXJzIGFuZCBjcmFzaGVzIG9uIElFXG4gIGlmICh0eXBlb2YgdmFsdWVzID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlcyA9IFsgdmFsdWVzIF07XG4gIH1cblxuICB0aGlzLmNoZWNrUGFyYW1ldGVyQ2FjaGVfKCk7XG4gIHZhciBuZXdWYWx1ZUluZGV4ID0gMDtcbiAgdmFyIHBjID0gdGhpcy5wYXJhbUNhY2hlXztcbiAgdmFyIHBhcmFtcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgayA9IDA7IGkgPCBwYy5sZW5ndGg7IGkgKz0gMikge1xuICAgIGlmIChrZXkgPT09IHBjW2ldKSB7XG4gICAgICBpZiAobmV3VmFsdWVJbmRleCA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnB1c2goa2V5LCB2YWx1ZXNbbmV3VmFsdWVJbmRleCsrXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5wdXNoKHBjW2ldLCBwY1tpICsgMV0pO1xuICAgIH1cbiAgfVxuICB3aGlsZSAobmV3VmFsdWVJbmRleCA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICBwYXJhbXMucHVzaChrZXksIHZhbHVlc1tuZXdWYWx1ZUluZGV4KytdKTtcbiAgfVxuICB0aGlzLnNldEFsbFBhcmFtZXRlcnMocGFyYW1zKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5yZW1vdmVQYXJhbWV0ZXIgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLnNldFBhcmFtZXRlclZhbHVlcyhrZXksIFtdKTtcbn07XG4vKipcbiAqIHJldHVybnMgdGhlIHBhcmFtZXRlcnMgc3BlY2lmaWVkIGluIHRoZSBxdWVyeSBwYXJ0IG9mIHRoZSB1cmkgYXMgYSBsaXN0IG9mXG4gKiBrZXlzIGFuZCB2YWx1ZXMgbGlrZSBbIGtleTAsIHZhbHVlMCwga2V5MSwgdmFsdWUxLCAuLi4gXS5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn1cbiAqL1xuVVJJLnByb3RvdHlwZS5nZXRBbGxQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNoZWNrUGFyYW1ldGVyQ2FjaGVfKCk7XG4gIHJldHVybiB0aGlzLnBhcmFtQ2FjaGVfLnNsaWNlKDAsIHRoaXMucGFyYW1DYWNoZV8ubGVuZ3RoKTtcbn07XG4vKipcbiAqIHJldHVybnMgdGhlIHZhbHVlPGI+czwvYj4gZm9yIGEgZ2l2ZW4gY2dpIHBhcmFtZXRlciBhcyBhIGxpc3Qgb2YgZGVjb2RlZFxuICogcXVlcnkgcGFyYW1ldGVyIHZhbHVlcy5cbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fVxuICovXG5VUkkucHJvdG90eXBlLmdldFBhcmFtZXRlclZhbHVlcyA9IGZ1bmN0aW9uIChwYXJhbU5hbWVVbmVzY2FwZWQpIHtcbiAgdGhpcy5jaGVja1BhcmFtZXRlckNhY2hlXygpO1xuICB2YXIgdmFsdWVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbUNhY2hlXy5sZW5ndGg7IGkgKz0gMikge1xuICAgIGlmIChwYXJhbU5hbWVVbmVzY2FwZWQgPT09IHRoaXMucGFyYW1DYWNoZV9baV0pIHtcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMucGFyYW1DYWNoZV9baSArIDFdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn07XG4vKipcbiAqIHJldHVybnMgYSBtYXAgb2YgY2dpIHBhcmFtZXRlciBuYW1lcyB0byAobm9uLWVtcHR5KSBsaXN0cyBvZiB2YWx1ZXMuXG4gKiBAcmV0dXJuIHtPYmplY3QuPHN0cmluZyxBcnJheS48c3RyaW5nPj59XG4gKi9cblVSSS5wcm90b3R5cGUuZ2V0UGFyYW1ldGVyTWFwID0gZnVuY3Rpb24gKHBhcmFtTmFtZVVuZXNjYXBlZCkge1xuICB0aGlzLmNoZWNrUGFyYW1ldGVyQ2FjaGVfKCk7XG4gIHZhciBwYXJhbU1hcCA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFyYW1DYWNoZV8ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIga2V5ID0gdGhpcy5wYXJhbUNhY2hlX1tpKytdLFxuICAgICAgdmFsdWUgPSB0aGlzLnBhcmFtQ2FjaGVfW2krK107XG4gICAgaWYgKCEoa2V5IGluIHBhcmFtTWFwKSkge1xuICAgICAgcGFyYW1NYXBba2V5XSA9IFt2YWx1ZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtTWFwW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJhbU1hcDtcbn07XG4vKipcbiAqIHJldHVybnMgdGhlIGZpcnN0IHZhbHVlIGZvciBhIGdpdmVuIGNnaSBwYXJhbWV0ZXIgb3IgbnVsbCBpZiB0aGUgZ2l2ZW5cbiAqIHBhcmFtZXRlciBuYW1lIGRvZXMgbm90IGFwcGVhciBpbiB0aGUgcXVlcnkgc3RyaW5nLlxuICogSWYgdGhlIGdpdmVuIHBhcmFtZXRlciBuYW1lIGRvZXMgYXBwZWFyLCBidXQgaGFzIG5vICc8dHQ+PTwvdHQ+JyBmb2xsb3dpbmdcbiAqIGl0LCB0aGVuIHRoZSBlbXB0eSBzdHJpbmcgd2lsbCBiZSByZXR1cm5lZC5cbiAqIEByZXR1cm4ge3N0cmluZ3xudWxsfVxuICovXG5VUkkucHJvdG90eXBlLmdldFBhcmFtZXRlclZhbHVlID0gZnVuY3Rpb24gKHBhcmFtTmFtZVVuZXNjYXBlZCkge1xuICB0aGlzLmNoZWNrUGFyYW1ldGVyQ2FjaGVfKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbUNhY2hlXy5sZW5ndGg7IGkgKz0gMikge1xuICAgIGlmIChwYXJhbU5hbWVVbmVzY2FwZWQgPT09IHRoaXMucGFyYW1DYWNoZV9baV0pIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmFtQ2FjaGVfW2kgKyAxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5VUkkucHJvdG90eXBlLmdldEZyYWdtZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5mcmFnbWVudF8gJiYgZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMuZnJhZ21lbnRfKTtcbn07XG5VUkkucHJvdG90eXBlLmdldFJhd0ZyYWdtZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5mcmFnbWVudF87XG59O1xuVVJJLnByb3RvdHlwZS5zZXRGcmFnbWVudCA9IGZ1bmN0aW9uIChuZXdGcmFnbWVudCkge1xuICB0aGlzLmZyYWdtZW50XyA9IG5ld0ZyYWdtZW50ID8gZW5jb2RlVVJJQ29tcG9uZW50KG5ld0ZyYWdtZW50KSA6IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UmF3RnJhZ21lbnQgPSBmdW5jdGlvbiAobmV3RnJhZ21lbnQpIHtcbiAgdGhpcy5mcmFnbWVudF8gPSBuZXdGcmFnbWVudCA/IG5ld0ZyYWdtZW50IDogbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5oYXNGcmFnbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG51bGwgIT09IHRoaXMuZnJhZ21lbnRfO1xufTtcblxuZnVuY3Rpb24gbnVsbElmQWJzZW50KG1hdGNoUGFydCkge1xuICByZXR1cm4gKCdzdHJpbmcnID09IHR5cGVvZiBtYXRjaFBhcnQpICYmIChtYXRjaFBhcnQubGVuZ3RoID4gMClcbiAgICAgICAgID8gbWF0Y2hQYXJ0XG4gICAgICAgICA6IG51bGw7XG59XG5cblxuXG5cbi8qKlxuICogYSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIGJyZWFraW5nIGEgVVJJIGludG8gaXRzIGNvbXBvbmVudCBwYXJ0cy5cbiAqXG4gKiA8cD5odHRwOi8vd3d3LmdiaXYuY29tL3Byb3RvY29scy91cmkvcmZjL3JmYzM5ODYuaHRtbCNSRkMyMjM0IHNheXNcbiAqIEFzIHRoZSBcImZpcnN0LW1hdGNoLXdpbnNcIiBhbGdvcml0aG0gaXMgaWRlbnRpY2FsIHRvIHRoZSBcImdyZWVkeVwiXG4gKiBkaXNhbWJpZ3VhdGlvbiBtZXRob2QgdXNlZCBieSBQT1NJWCByZWd1bGFyIGV4cHJlc3Npb25zLCBpdCBpcyBuYXR1cmFsIGFuZFxuICogY29tbW9ucGxhY2UgdG8gdXNlIGEgcmVndWxhciBleHByZXNzaW9uIGZvciBwYXJzaW5nIHRoZSBwb3RlbnRpYWwgZml2ZVxuICogY29tcG9uZW50cyBvZiBhIFVSSSByZWZlcmVuY2UuXG4gKlxuICogPHA+VGhlIGZvbGxvd2luZyBsaW5lIGlzIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIGJyZWFraW5nLWRvd24gYVxuICogd2VsbC1mb3JtZWQgVVJJIHJlZmVyZW5jZSBpbnRvIGl0cyBjb21wb25lbnRzLlxuICpcbiAqIDxwcmU+XG4gKiBeKChbXjovPyNdKyk6KT8oLy8oW14vPyNdKikpPyhbXj8jXSopKFxcPyhbXiNdKikpPygjKC4qKSk/XG4gKiAgMTIgICAgICAgICAgICAzICA0ICAgICAgICAgIDUgICAgICAgNiAgNyAgICAgICAgOCA5XG4gKiA8L3ByZT5cbiAqXG4gKiA8cD5UaGUgbnVtYmVycyBpbiB0aGUgc2Vjb25kIGxpbmUgYWJvdmUgYXJlIG9ubHkgdG8gYXNzaXN0IHJlYWRhYmlsaXR5OyB0aGV5XG4gKiBpbmRpY2F0ZSB0aGUgcmVmZXJlbmNlIHBvaW50cyBmb3IgZWFjaCBzdWJleHByZXNzaW9uIChpLmUuLCBlYWNoIHBhaXJlZFxuICogcGFyZW50aGVzaXMpLiBXZSByZWZlciB0byB0aGUgdmFsdWUgbWF0Y2hlZCBmb3Igc3ViZXhwcmVzc2lvbiA8bj4gYXMgJDxuPi5cbiAqIEZvciBleGFtcGxlLCBtYXRjaGluZyB0aGUgYWJvdmUgZXhwcmVzc2lvbiB0b1xuICogPHByZT5cbiAqICAgICBodHRwOi8vd3d3Lmljcy51Y2kuZWR1L3B1Yi9pZXRmL3VyaS8jUmVsYXRlZFxuICogPC9wcmU+XG4gKiByZXN1bHRzIGluIHRoZSBmb2xsb3dpbmcgc3ViZXhwcmVzc2lvbiBtYXRjaGVzOlxuICogPHByZT5cbiAqICAgICQxID0gaHR0cDpcbiAqICAgICQyID0gaHR0cFxuICogICAgJDMgPSAvL3d3dy5pY3MudWNpLmVkdVxuICogICAgJDQgPSB3d3cuaWNzLnVjaS5lZHVcbiAqICAgICQ1ID0gL3B1Yi9pZXRmL3VyaS9cbiAqICAgICQ2ID0gPHVuZGVmaW5lZD5cbiAqICAgICQ3ID0gPHVuZGVmaW5lZD5cbiAqICAgICQ4ID0gI1JlbGF0ZWRcbiAqICAgICQ5ID0gUmVsYXRlZFxuICogPC9wcmU+XG4gKiB3aGVyZSA8dW5kZWZpbmVkPiBpbmRpY2F0ZXMgdGhhdCB0aGUgY29tcG9uZW50IGlzIG5vdCBwcmVzZW50LCBhcyBpcyB0aGVcbiAqIGNhc2UgZm9yIHRoZSBxdWVyeSBjb21wb25lbnQgaW4gdGhlIGFib3ZlIGV4YW1wbGUuIFRoZXJlZm9yZSwgd2UgY2FuXG4gKiBkZXRlcm1pbmUgdGhlIHZhbHVlIG9mIHRoZSBmaXZlIGNvbXBvbmVudHMgYXNcbiAqIDxwcmU+XG4gKiAgICBzY2hlbWUgICAgPSAkMlxuICogICAgYXV0aG9yaXR5ID0gJDRcbiAqICAgIHBhdGggICAgICA9ICQ1XG4gKiAgICBxdWVyeSAgICAgPSAkN1xuICogICAgZnJhZ21lbnQgID0gJDlcbiAqIDwvcHJlPlxuICpcbiAqIDxwPm1zYW11ZWw6IEkgaGF2ZSBtb2RpZmllZCB0aGUgcmVndWxhciBleHByZXNzaW9uIHNsaWdodGx5IHRvIGV4cG9zZSB0aGVcbiAqIGNyZWRlbnRpYWxzLCBkb21haW4sIGFuZCBwb3J0IHNlcGFyYXRlbHkgZnJvbSB0aGUgYXV0aG9yaXR5LlxuICogVGhlIG1vZGlmaWVkIHZlcnNpb24geWllbGRzXG4gKiA8cHJlPlxuICogICAgJDEgPSBodHRwICAgICAgICAgICAgICBzY2hlbWVcbiAqICAgICQyID0gPHVuZGVmaW5lZD4gICAgICAgY3JlZGVudGlhbHMgLVxcXG4gKiAgICAkMyA9IHd3dy5pY3MudWNpLmVkdSAgIGRvbWFpbiAgICAgICB8IGF1dGhvcml0eVxuICogICAgJDQgPSA8dW5kZWZpbmVkPiAgICAgICBwb3J0ICAgICAgICAtL1xuICogICAgJDUgPSAvcHViL2lldGYvdXJpLyAgICBwYXRoXG4gKiAgICAkNiA9IDx1bmRlZmluZWQ+ICAgICAgIHF1ZXJ5IHdpdGhvdXQgP1xuICogICAgJDcgPSBSZWxhdGVkICAgICAgICAgICBmcmFnbWVudCB3aXRob3V0ICNcbiAqIDwvcHJlPlxuICovXG52YXIgVVJJX1JFXyA9IG5ldyBSZWdFeHAoXG4gICAgICBcIl5cIiArXG4gICAgICBcIig/OlwiICtcbiAgICAgICAgXCIoW146Lz8jXSspXCIgKyAgICAgICAgIC8vIHNjaGVtZVxuICAgICAgXCI6KT9cIiArXG4gICAgICBcIig/Oi8vXCIgK1xuICAgICAgICBcIig/OihbXi8/I10qKUApP1wiICsgICAgLy8gY3JlZGVudGlhbHNcbiAgICAgICAgXCIoW14vPyM6QF0qKVwiICsgICAgICAgIC8vIGRvbWFpblxuICAgICAgICBcIig/OjooWzAtOV0rKSk/XCIgKyAgICAgLy8gcG9ydFxuICAgICAgXCIpP1wiICtcbiAgICAgIFwiKFtePyNdKyk/XCIgKyAgICAgICAgICAgIC8vIHBhdGhcbiAgICAgIFwiKD86XFxcXD8oW14jXSopKT9cIiArICAgICAgLy8gcXVlcnlcbiAgICAgIFwiKD86IyguKikpP1wiICsgICAgICAgICAgIC8vIGZyYWdtZW50XG4gICAgICBcIiRcIlxuICAgICAgKTtcblxudmFyIFVSSV9ESVNBTExPV0VEX0lOX1NDSEVNRV9PUl9DUkVERU5USUFMU18gPSAvWyNcXC9cXD9AXS9nO1xudmFyIFVSSV9ESVNBTExPV0VEX0lOX1BBVEhfID0gL1tcXCNcXD9dL2c7XG5cblVSSS5wYXJzZSA9IHBhcnNlO1xuVVJJLmNyZWF0ZSA9IGNyZWF0ZTtcblVSSS5yZXNvbHZlID0gcmVzb2x2ZTtcblVSSS5jb2xsYXBzZV9kb3RzID0gY29sbGFwc2VfZG90czsgIC8vIFZpc2libGUgZm9yIHRlc3RpbmcuXG5cbi8vIGxpZ2h0d2VpZ2h0IHN0cmluZy1iYXNlZCBhcGkgZm9yIGxvYWRNb2R1bGVNYWtlclxuVVJJLnV0aWxzID0ge1xuICBtaW1lVHlwZU9mOiBmdW5jdGlvbiAodXJpKSB7XG4gICAgdmFyIHVyaU9iaiA9IHBhcnNlKHVyaSk7XG4gICAgaWYgKC9cXC5odG1sJC8udGVzdCh1cmlPYmouZ2V0UGF0aCgpKSkge1xuICAgICAgcmV0dXJuICd0ZXh0L2h0bWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnO1xuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZTogZnVuY3Rpb24gKGJhc2UsIHVyaSkge1xuICAgIGlmIChiYXNlKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShwYXJzZShiYXNlKSwgcGFyc2UodXJpKSkudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnICsgdXJpO1xuICAgIH1cbiAgfVxufTtcblxuXG5yZXR1cm4gVVJJO1xufSkoKTtcblxuLy8gQ29weXJpZ2h0IEdvb2dsZSBJbmMuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2VuY2UgVmVyc2lvbiAyLjBcbi8vIEF1dG9nZW5lcmF0ZWQgYXQgTW9uIEZlYiAyNSAxMzowNTo0MiBFU1QgMjAxM1xuLy8gQG92ZXJyaWRlcyB3aW5kb3dcbi8vIEBwcm92aWRlcyBodG1sNFxudmFyIGh0bWw0ID0ge307XG5odG1sNC5hdHlwZSA9IHtcbiAgJ05PTkUnOiAwLFxuICAnVVJJJzogMSxcbiAgJ1VSSV9GUkFHTUVOVCc6IDExLFxuICAnU0NSSVBUJzogMixcbiAgJ1NUWUxFJzogMyxcbiAgJ0hUTUwnOiAxMixcbiAgJ0lEJzogNCxcbiAgJ0lEUkVGJzogNSxcbiAgJ0lEUkVGUyc6IDYsXG4gICdHTE9CQUxfTkFNRSc6IDcsXG4gICdMT0NBTF9OQU1FJzogOCxcbiAgJ0NMQVNTRVMnOiA5LFxuICAnRlJBTUVfVEFSR0VUJzogMTAsXG4gICdNRURJQV9RVUVSWSc6IDEzXG59O1xuaHRtbDRbICdhdHlwZScgXSA9IGh0bWw0LmF0eXBlO1xuaHRtbDQuQVRUUklCUyA9IHtcbiAgJyo6OmNsYXNzJzogOSxcbiAgJyo6OmRpcic6IDAsXG4gICcqOjpkcmFnZ2FibGUnOiAwLFxuICAnKjo6aGlkZGVuJzogMCxcbiAgJyo6OmlkJzogNCxcbiAgJyo6OmluZXJ0JzogMCxcbiAgJyo6Oml0ZW1wcm9wJzogMCxcbiAgJyo6Oml0ZW1yZWYnOiA2LFxuICAnKjo6aXRlbXNjb3BlJzogMCxcbiAgJyo6OmxhbmcnOiAwLFxuICAnKjo6b25ibHVyJzogMixcbiAgJyo6Om9uY2hhbmdlJzogMixcbiAgJyo6Om9uY2xpY2snOiAyLFxuICAnKjo6b25kYmxjbGljayc6IDIsXG4gICcqOjpvbmZvY3VzJzogMixcbiAgJyo6Om9ua2V5ZG93bic6IDIsXG4gICcqOjpvbmtleXByZXNzJzogMixcbiAgJyo6Om9ua2V5dXAnOiAyLFxuICAnKjo6b25sb2FkJzogMixcbiAgJyo6Om9ubW91c2Vkb3duJzogMixcbiAgJyo6Om9ubW91c2Vtb3ZlJzogMixcbiAgJyo6Om9ubW91c2VvdXQnOiAyLFxuICAnKjo6b25tb3VzZW92ZXInOiAyLFxuICAnKjo6b25tb3VzZXVwJzogMixcbiAgJyo6Om9ucmVzZXQnOiAyLFxuICAnKjo6b25zY3JvbGwnOiAyLFxuICAnKjo6b25zZWxlY3QnOiAyLFxuICAnKjo6b25zdWJtaXQnOiAyLFxuICAnKjo6b251bmxvYWQnOiAyLFxuICAnKjo6c3BlbGxjaGVjayc6IDAsXG4gICcqOjpzdHlsZSc6IDMsXG4gICcqOjp0aXRsZSc6IDAsXG4gICcqOjp0cmFuc2xhdGUnOiAwLFxuICAnYTo6YWNjZXNza2V5JzogMCxcbiAgJ2E6OmNvb3Jkcyc6IDAsXG4gICdhOjpocmVmJzogMSxcbiAgJ2E6OmhyZWZsYW5nJzogMCxcbiAgJ2E6Om5hbWUnOiA3LFxuICAnYTo6b25ibHVyJzogMixcbiAgJ2E6Om9uZm9jdXMnOiAyLFxuICAnYTo6c2hhcGUnOiAwLFxuICAnYTo6dGFiaW5kZXgnOiAwLFxuICAnYTo6dGFyZ2V0JzogMTAsXG4gICdhOjp0eXBlJzogMCxcbiAgJ2FyZWE6OmFjY2Vzc2tleSc6IDAsXG4gICdhcmVhOjphbHQnOiAwLFxuICAnYXJlYTo6Y29vcmRzJzogMCxcbiAgJ2FyZWE6OmhyZWYnOiAxLFxuICAnYXJlYTo6bm9ocmVmJzogMCxcbiAgJ2FyZWE6Om9uYmx1cic6IDIsXG4gICdhcmVhOjpvbmZvY3VzJzogMixcbiAgJ2FyZWE6OnNoYXBlJzogMCxcbiAgJ2FyZWE6OnRhYmluZGV4JzogMCxcbiAgJ2FyZWE6OnRhcmdldCc6IDEwLFxuICAnYXVkaW86OmNvbnRyb2xzJzogMCxcbiAgJ2F1ZGlvOjpsb29wJzogMCxcbiAgJ2F1ZGlvOjptZWRpYWdyb3VwJzogNSxcbiAgJ2F1ZGlvOjptdXRlZCc6IDAsXG4gICdhdWRpbzo6cHJlbG9hZCc6IDAsXG4gICdiZG86OmRpcic6IDAsXG4gICdibG9ja3F1b3RlOjpjaXRlJzogMSxcbiAgJ2JyOjpjbGVhcic6IDAsXG4gICdidXR0b246OmFjY2Vzc2tleSc6IDAsXG4gICdidXR0b246OmRpc2FibGVkJzogMCxcbiAgJ2J1dHRvbjo6bmFtZSc6IDgsXG4gICdidXR0b246Om9uYmx1cic6IDIsXG4gICdidXR0b246Om9uZm9jdXMnOiAyLFxuICAnYnV0dG9uOjp0YWJpbmRleCc6IDAsXG4gICdidXR0b246OnR5cGUnOiAwLFxuICAnYnV0dG9uOjp2YWx1ZSc6IDAsXG4gICdjYW52YXM6OmhlaWdodCc6IDAsXG4gICdjYW52YXM6OndpZHRoJzogMCxcbiAgJ2NhcHRpb246OmFsaWduJzogMCxcbiAgJ2NvbDo6YWxpZ24nOiAwLFxuICAnY29sOjpjaGFyJzogMCxcbiAgJ2NvbDo6Y2hhcm9mZic6IDAsXG4gICdjb2w6OnNwYW4nOiAwLFxuICAnY29sOjp2YWxpZ24nOiAwLFxuICAnY29sOjp3aWR0aCc6IDAsXG4gICdjb2xncm91cDo6YWxpZ24nOiAwLFxuICAnY29sZ3JvdXA6OmNoYXInOiAwLFxuICAnY29sZ3JvdXA6OmNoYXJvZmYnOiAwLFxuICAnY29sZ3JvdXA6OnNwYW4nOiAwLFxuICAnY29sZ3JvdXA6OnZhbGlnbic6IDAsXG4gICdjb2xncm91cDo6d2lkdGgnOiAwLFxuICAnY29tbWFuZDo6Y2hlY2tlZCc6IDAsXG4gICdjb21tYW5kOjpjb21tYW5kJzogNSxcbiAgJ2NvbW1hbmQ6OmRpc2FibGVkJzogMCxcbiAgJ2NvbW1hbmQ6Omljb24nOiAxLFxuICAnY29tbWFuZDo6bGFiZWwnOiAwLFxuICAnY29tbWFuZDo6cmFkaW9ncm91cCc6IDAsXG4gICdjb21tYW5kOjp0eXBlJzogMCxcbiAgJ2RhdGE6OnZhbHVlJzogMCxcbiAgJ2RlbDo6Y2l0ZSc6IDEsXG4gICdkZWw6OmRhdGV0aW1lJzogMCxcbiAgJ2RldGFpbHM6Om9wZW4nOiAwLFxuICAnZGlyOjpjb21wYWN0JzogMCxcbiAgJ2Rpdjo6YWxpZ24nOiAwLFxuICAnZGw6OmNvbXBhY3QnOiAwLFxuICAnZmllbGRzZXQ6OmRpc2FibGVkJzogMCxcbiAgJ2ZvbnQ6OmNvbG9yJzogMCxcbiAgJ2ZvbnQ6OmZhY2UnOiAwLFxuICAnZm9udDo6c2l6ZSc6IDAsXG4gICdmb3JtOjphY2NlcHQnOiAwLFxuICAnZm9ybTo6YWN0aW9uJzogMSxcbiAgJ2Zvcm06OmF1dG9jb21wbGV0ZSc6IDAsXG4gICdmb3JtOjplbmN0eXBlJzogMCxcbiAgJ2Zvcm06Om1ldGhvZCc6IDAsXG4gICdmb3JtOjpuYW1lJzogNyxcbiAgJ2Zvcm06Om5vdmFsaWRhdGUnOiAwLFxuICAnZm9ybTo6b25yZXNldCc6IDIsXG4gICdmb3JtOjpvbnN1Ym1pdCc6IDIsXG4gICdmb3JtOjp0YXJnZXQnOiAxMCxcbiAgJ2gxOjphbGlnbic6IDAsXG4gICdoMjo6YWxpZ24nOiAwLFxuICAnaDM6OmFsaWduJzogMCxcbiAgJ2g0OjphbGlnbic6IDAsXG4gICdoNTo6YWxpZ24nOiAwLFxuICAnaDY6OmFsaWduJzogMCxcbiAgJ2hyOjphbGlnbic6IDAsXG4gICdocjo6bm9zaGFkZSc6IDAsXG4gICdocjo6c2l6ZSc6IDAsXG4gICdocjo6d2lkdGgnOiAwLFxuICAnaWZyYW1lOjphbGlnbic6IDAsXG4gICdpZnJhbWU6OmZyYW1lYm9yZGVyJzogMCxcbiAgJ2lmcmFtZTo6aGVpZ2h0JzogMCxcbiAgJ2lmcmFtZTo6bWFyZ2luaGVpZ2h0JzogMCxcbiAgJ2lmcmFtZTo6bWFyZ2lud2lkdGgnOiAwLFxuICAnaWZyYW1lOjp3aWR0aCc6IDAsXG4gICdpbWc6OmFsaWduJzogMCxcbiAgJ2ltZzo6YWx0JzogMCxcbiAgJ2ltZzo6Ym9yZGVyJzogMCxcbiAgJ2ltZzo6aGVpZ2h0JzogMCxcbiAgJ2ltZzo6aHNwYWNlJzogMCxcbiAgJ2ltZzo6aXNtYXAnOiAwLFxuICAnaW1nOjpuYW1lJzogNyxcbiAgJ2ltZzo6c3JjJzogMSxcbiAgJ2ltZzo6dXNlbWFwJzogMTEsXG4gICdpbWc6OnZzcGFjZSc6IDAsXG4gICdpbWc6OndpZHRoJzogMCxcbiAgJ2lucHV0OjphY2NlcHQnOiAwLFxuICAnaW5wdXQ6OmFjY2Vzc2tleSc6IDAsXG4gICdpbnB1dDo6YWxpZ24nOiAwLFxuICAnaW5wdXQ6OmFsdCc6IDAsXG4gICdpbnB1dDo6YXV0b2NvbXBsZXRlJzogMCxcbiAgJ2lucHV0OjpjaGVja2VkJzogMCxcbiAgJ2lucHV0OjpkaXNhYmxlZCc6IDAsXG4gICdpbnB1dDo6aW5wdXRtb2RlJzogMCxcbiAgJ2lucHV0Ojppc21hcCc6IDAsXG4gICdpbnB1dDo6bGlzdCc6IDUsXG4gICdpbnB1dDo6bWF4JzogMCxcbiAgJ2lucHV0OjptYXhsZW5ndGgnOiAwLFxuICAnaW5wdXQ6Om1pbic6IDAsXG4gICdpbnB1dDo6bXVsdGlwbGUnOiAwLFxuICAnaW5wdXQ6Om5hbWUnOiA4LFxuICAnaW5wdXQ6Om9uYmx1cic6IDIsXG4gICdpbnB1dDo6b25jaGFuZ2UnOiAyLFxuICAnaW5wdXQ6Om9uZm9jdXMnOiAyLFxuICAnaW5wdXQ6Om9uc2VsZWN0JzogMixcbiAgJ2lucHV0OjpwbGFjZWhvbGRlcic6IDAsXG4gICdpbnB1dDo6cmVhZG9ubHknOiAwLFxuICAnaW5wdXQ6OnJlcXVpcmVkJzogMCxcbiAgJ2lucHV0OjpzaXplJzogMCxcbiAgJ2lucHV0OjpzcmMnOiAxLFxuICAnaW5wdXQ6OnN0ZXAnOiAwLFxuICAnaW5wdXQ6OnRhYmluZGV4JzogMCxcbiAgJ2lucHV0Ojp0eXBlJzogMCxcbiAgJ2lucHV0Ojp1c2VtYXAnOiAxMSxcbiAgJ2lucHV0Ojp2YWx1ZSc6IDAsXG4gICdpbnM6OmNpdGUnOiAxLFxuICAnaW5zOjpkYXRldGltZSc6IDAsXG4gICdsYWJlbDo6YWNjZXNza2V5JzogMCxcbiAgJ2xhYmVsOjpmb3InOiA1LFxuICAnbGFiZWw6Om9uYmx1cic6IDIsXG4gICdsYWJlbDo6b25mb2N1cyc6IDIsXG4gICdsZWdlbmQ6OmFjY2Vzc2tleSc6IDAsXG4gICdsZWdlbmQ6OmFsaWduJzogMCxcbiAgJ2xpOjp0eXBlJzogMCxcbiAgJ2xpOjp2YWx1ZSc6IDAsXG4gICdtYXA6Om5hbWUnOiA3LFxuICAnbWVudTo6Y29tcGFjdCc6IDAsXG4gICdtZW51OjpsYWJlbCc6IDAsXG4gICdtZW51Ojp0eXBlJzogMCxcbiAgJ21ldGVyOjpoaWdoJzogMCxcbiAgJ21ldGVyOjpsb3cnOiAwLFxuICAnbWV0ZXI6Om1heCc6IDAsXG4gICdtZXRlcjo6bWluJzogMCxcbiAgJ21ldGVyOjp2YWx1ZSc6IDAsXG4gICdvbDo6Y29tcGFjdCc6IDAsXG4gICdvbDo6cmV2ZXJzZWQnOiAwLFxuICAnb2w6OnN0YXJ0JzogMCxcbiAgJ29sOjp0eXBlJzogMCxcbiAgJ29wdGdyb3VwOjpkaXNhYmxlZCc6IDAsXG4gICdvcHRncm91cDo6bGFiZWwnOiAwLFxuICAnb3B0aW9uOjpkaXNhYmxlZCc6IDAsXG4gICdvcHRpb246OmxhYmVsJzogMCxcbiAgJ29wdGlvbjo6c2VsZWN0ZWQnOiAwLFxuICAnb3B0aW9uOjp2YWx1ZSc6IDAsXG4gICdvdXRwdXQ6OmZvcic6IDYsXG4gICdvdXRwdXQ6Om5hbWUnOiA4LFxuICAncDo6YWxpZ24nOiAwLFxuICAncHJlOjp3aWR0aCc6IDAsXG4gICdwcm9ncmVzczo6bWF4JzogMCxcbiAgJ3Byb2dyZXNzOjptaW4nOiAwLFxuICAncHJvZ3Jlc3M6OnZhbHVlJzogMCxcbiAgJ3E6OmNpdGUnOiAxLFxuICAnc2VsZWN0OjphdXRvY29tcGxldGUnOiAwLFxuICAnc2VsZWN0OjpkaXNhYmxlZCc6IDAsXG4gICdzZWxlY3Q6Om11bHRpcGxlJzogMCxcbiAgJ3NlbGVjdDo6bmFtZSc6IDgsXG4gICdzZWxlY3Q6Om9uYmx1cic6IDIsXG4gICdzZWxlY3Q6Om9uY2hhbmdlJzogMixcbiAgJ3NlbGVjdDo6b25mb2N1cyc6IDIsXG4gICdzZWxlY3Q6OnJlcXVpcmVkJzogMCxcbiAgJ3NlbGVjdDo6c2l6ZSc6IDAsXG4gICdzZWxlY3Q6OnRhYmluZGV4JzogMCxcbiAgJ3NvdXJjZTo6dHlwZSc6IDAsXG4gICd0YWJsZTo6YWxpZ24nOiAwLFxuICAndGFibGU6OmJnY29sb3InOiAwLFxuICAndGFibGU6OmJvcmRlcic6IDAsXG4gICd0YWJsZTo6Y2VsbHBhZGRpbmcnOiAwLFxuICAndGFibGU6OmNlbGxzcGFjaW5nJzogMCxcbiAgJ3RhYmxlOjpmcmFtZSc6IDAsXG4gICd0YWJsZTo6cnVsZXMnOiAwLFxuICAndGFibGU6OnN1bW1hcnknOiAwLFxuICAndGFibGU6OndpZHRoJzogMCxcbiAgJ3Rib2R5OjphbGlnbic6IDAsXG4gICd0Ym9keTo6Y2hhcic6IDAsXG4gICd0Ym9keTo6Y2hhcm9mZic6IDAsXG4gICd0Ym9keTo6dmFsaWduJzogMCxcbiAgJ3RkOjphYmJyJzogMCxcbiAgJ3RkOjphbGlnbic6IDAsXG4gICd0ZDo6YXhpcyc6IDAsXG4gICd0ZDo6Ymdjb2xvcic6IDAsXG4gICd0ZDo6Y2hhcic6IDAsXG4gICd0ZDo6Y2hhcm9mZic6IDAsXG4gICd0ZDo6Y29sc3Bhbic6IDAsXG4gICd0ZDo6aGVhZGVycyc6IDYsXG4gICd0ZDo6aGVpZ2h0JzogMCxcbiAgJ3RkOjpub3dyYXAnOiAwLFxuICAndGQ6OnJvd3NwYW4nOiAwLFxuICAndGQ6OnNjb3BlJzogMCxcbiAgJ3RkOjp2YWxpZ24nOiAwLFxuICAndGQ6OndpZHRoJzogMCxcbiAgJ3RleHRhcmVhOjphY2Nlc3NrZXknOiAwLFxuICAndGV4dGFyZWE6OmF1dG9jb21wbGV0ZSc6IDAsXG4gICd0ZXh0YXJlYTo6Y29scyc6IDAsXG4gICd0ZXh0YXJlYTo6ZGlzYWJsZWQnOiAwLFxuICAndGV4dGFyZWE6OmlucHV0bW9kZSc6IDAsXG4gICd0ZXh0YXJlYTo6bmFtZSc6IDgsXG4gICd0ZXh0YXJlYTo6b25ibHVyJzogMixcbiAgJ3RleHRhcmVhOjpvbmNoYW5nZSc6IDIsXG4gICd0ZXh0YXJlYTo6b25mb2N1cyc6IDIsXG4gICd0ZXh0YXJlYTo6b25zZWxlY3QnOiAyLFxuICAndGV4dGFyZWE6OnBsYWNlaG9sZGVyJzogMCxcbiAgJ3RleHRhcmVhOjpyZWFkb25seSc6IDAsXG4gICd0ZXh0YXJlYTo6cmVxdWlyZWQnOiAwLFxuICAndGV4dGFyZWE6OnJvd3MnOiAwLFxuICAndGV4dGFyZWE6OnRhYmluZGV4JzogMCxcbiAgJ3RleHRhcmVhOjp3cmFwJzogMCxcbiAgJ3Rmb290OjphbGlnbic6IDAsXG4gICd0Zm9vdDo6Y2hhcic6IDAsXG4gICd0Zm9vdDo6Y2hhcm9mZic6IDAsXG4gICd0Zm9vdDo6dmFsaWduJzogMCxcbiAgJ3RoOjphYmJyJzogMCxcbiAgJ3RoOjphbGlnbic6IDAsXG4gICd0aDo6YXhpcyc6IDAsXG4gICd0aDo6Ymdjb2xvcic6IDAsXG4gICd0aDo6Y2hhcic6IDAsXG4gICd0aDo6Y2hhcm9mZic6IDAsXG4gICd0aDo6Y29sc3Bhbic6IDAsXG4gICd0aDo6aGVhZGVycyc6IDYsXG4gICd0aDo6aGVpZ2h0JzogMCxcbiAgJ3RoOjpub3dyYXAnOiAwLFxuICAndGg6OnJvd3NwYW4nOiAwLFxuICAndGg6OnNjb3BlJzogMCxcbiAgJ3RoOjp2YWxpZ24nOiAwLFxuICAndGg6OndpZHRoJzogMCxcbiAgJ3RoZWFkOjphbGlnbic6IDAsXG4gICd0aGVhZDo6Y2hhcic6IDAsXG4gICd0aGVhZDo6Y2hhcm9mZic6IDAsXG4gICd0aGVhZDo6dmFsaWduJzogMCxcbiAgJ3RyOjphbGlnbic6IDAsXG4gICd0cjo6Ymdjb2xvcic6IDAsXG4gICd0cjo6Y2hhcic6IDAsXG4gICd0cjo6Y2hhcm9mZic6IDAsXG4gICd0cjo6dmFsaWduJzogMCxcbiAgJ3RyYWNrOjpkZWZhdWx0JzogMCxcbiAgJ3RyYWNrOjpraW5kJzogMCxcbiAgJ3RyYWNrOjpsYWJlbCc6IDAsXG4gICd0cmFjazo6c3JjbGFuZyc6IDAsXG4gICd1bDo6Y29tcGFjdCc6IDAsXG4gICd1bDo6dHlwZSc6IDAsXG4gICd2aWRlbzo6Y29udHJvbHMnOiAwLFxuICAndmlkZW86OmhlaWdodCc6IDAsXG4gICd2aWRlbzo6bG9vcCc6IDAsXG4gICd2aWRlbzo6bWVkaWFncm91cCc6IDUsXG4gICd2aWRlbzo6bXV0ZWQnOiAwLFxuICAndmlkZW86OnBvc3Rlcic6IDEsXG4gICd2aWRlbzo6cHJlbG9hZCc6IDAsXG4gICd2aWRlbzo6d2lkdGgnOiAwXG59O1xuaHRtbDRbICdBVFRSSUJTJyBdID0gaHRtbDQuQVRUUklCUztcbmh0bWw0LmVmbGFncyA9IHtcbiAgJ09QVElPTkFMX0VORFRBRyc6IDEsXG4gICdFTVBUWSc6IDIsXG4gICdDREFUQSc6IDQsXG4gICdSQ0RBVEEnOiA4LFxuICAnVU5TQUZFJzogMTYsXG4gICdGT0xEQUJMRSc6IDMyLFxuICAnU0NSSVBUJzogNjQsXG4gICdTVFlMRSc6IDEyOCxcbiAgJ1ZJUlRVQUxJWkVEJzogMjU2XG59O1xuaHRtbDRbICdlZmxhZ3MnIF0gPSBodG1sNC5lZmxhZ3M7XG5odG1sNC5FTEVNRU5UUyA9IHtcbiAgJ2EnOiAwLFxuICAnYWJicic6IDAsXG4gICdhY3JvbnltJzogMCxcbiAgJ2FkZHJlc3MnOiAwLFxuICAnYXBwbGV0JzogMjcyLFxuICAnYXJlYSc6IDIsXG4gICdhcnRpY2xlJzogMCxcbiAgJ2FzaWRlJzogMCxcbiAgJ2F1ZGlvJzogMCxcbiAgJ2InOiAwLFxuICAnYmFzZSc6IDI3NCxcbiAgJ2Jhc2Vmb250JzogMjc0LFxuICAnYmRpJzogMCxcbiAgJ2Jkbyc6IDAsXG4gICdiaWcnOiAwLFxuICAnYmxvY2txdW90ZSc6IDAsXG4gICdib2R5JzogMzA1LFxuICAnYnInOiAyLFxuICAnYnV0dG9uJzogMCxcbiAgJ2NhbnZhcyc6IDAsXG4gICdjYXB0aW9uJzogMCxcbiAgJ2NlbnRlcic6IDAsXG4gICdjaXRlJzogMCxcbiAgJ2NvZGUnOiAwLFxuICAnY29sJzogMixcbiAgJ2NvbGdyb3VwJzogMSxcbiAgJ2NvbW1hbmQnOiAyLFxuICAnZGF0YSc6IDAsXG4gICdkYXRhbGlzdCc6IDAsXG4gICdkZCc6IDEsXG4gICdkZWwnOiAwLFxuICAnZGV0YWlscyc6IDAsXG4gICdkZm4nOiAwLFxuICAnZGlhbG9nJzogMjcyLFxuICAnZGlyJzogMCxcbiAgJ2Rpdic6IDAsXG4gICdkbCc6IDAsXG4gICdkdCc6IDEsXG4gICdlbSc6IDAsXG4gICdmaWVsZHNldCc6IDAsXG4gICdmaWdjYXB0aW9uJzogMCxcbiAgJ2ZpZ3VyZSc6IDAsXG4gICdmb250JzogMCxcbiAgJ2Zvb3Rlcic6IDAsXG4gICdmb3JtJzogMCxcbiAgJ2ZyYW1lJzogMjc0LFxuICAnZnJhbWVzZXQnOiAyNzIsXG4gICdoMSc6IDAsXG4gICdoMic6IDAsXG4gICdoMyc6IDAsXG4gICdoNCc6IDAsXG4gICdoNSc6IDAsXG4gICdoNic6IDAsXG4gICdoZWFkJzogMzA1LFxuICAnaGVhZGVyJzogMCxcbiAgJ2hncm91cCc6IDAsXG4gICdocic6IDIsXG4gICdodG1sJzogMzA1LFxuICAnaSc6IDAsXG4gICdpZnJhbWUnOiA0LFxuICAnaW1nJzogMixcbiAgJ2lucHV0JzogMixcbiAgJ2lucyc6IDAsXG4gICdpc2luZGV4JzogMjc0LFxuICAna2JkJzogMCxcbiAgJ2tleWdlbic6IDI3NCxcbiAgJ2xhYmVsJzogMCxcbiAgJ2xlZ2VuZCc6IDAsXG4gICdsaSc6IDEsXG4gICdsaW5rJzogMjc0LFxuICAnbWFwJzogMCxcbiAgJ21hcmsnOiAwLFxuICAnbWVudSc6IDAsXG4gICdtZXRhJzogMjc0LFxuICAnbWV0ZXInOiAwLFxuICAnbmF2JzogMCxcbiAgJ25vYnInOiAwLFxuICAnbm9lbWJlZCc6IDI3NixcbiAgJ25vZnJhbWVzJzogMjc2LFxuICAnbm9zY3JpcHQnOiAyNzYsXG4gICdvYmplY3QnOiAyNzIsXG4gICdvbCc6IDAsXG4gICdvcHRncm91cCc6IDAsXG4gICdvcHRpb24nOiAxLFxuICAnb3V0cHV0JzogMCxcbiAgJ3AnOiAxLFxuICAncGFyYW0nOiAyNzQsXG4gICdwcmUnOiAwLFxuICAncHJvZ3Jlc3MnOiAwLFxuICAncSc6IDAsXG4gICdzJzogMCxcbiAgJ3NhbXAnOiAwLFxuICAnc2NyaXB0JzogODQsXG4gICdzZWN0aW9uJzogMCxcbiAgJ3NlbGVjdCc6IDAsXG4gICdzbWFsbCc6IDAsXG4gICdzb3VyY2UnOiAyLFxuICAnc3Bhbic6IDAsXG4gICdzdHJpa2UnOiAwLFxuICAnc3Ryb25nJzogMCxcbiAgJ3N0eWxlJzogMTQ4LFxuICAnc3ViJzogMCxcbiAgJ3N1bW1hcnknOiAwLFxuICAnc3VwJzogMCxcbiAgJ3RhYmxlJzogMCxcbiAgJ3Rib2R5JzogMSxcbiAgJ3RkJzogMSxcbiAgJ3RleHRhcmVhJzogOCxcbiAgJ3Rmb290JzogMSxcbiAgJ3RoJzogMSxcbiAgJ3RoZWFkJzogMSxcbiAgJ3RpbWUnOiAwLFxuICAndGl0bGUnOiAyODAsXG4gICd0cic6IDEsXG4gICd0cmFjayc6IDIsXG4gICd0dCc6IDAsXG4gICd1JzogMCxcbiAgJ3VsJzogMCxcbiAgJ3Zhcic6IDAsXG4gICd2aWRlbyc6IDAsXG4gICd3YnInOiAyXG59O1xuaHRtbDRbICdFTEVNRU5UUycgXSA9IGh0bWw0LkVMRU1FTlRTO1xuaHRtbDQuRUxFTUVOVF9ET01fSU5URVJGQUNFUyA9IHtcbiAgJ2EnOiAnSFRNTEFuY2hvckVsZW1lbnQnLFxuICAnYWJicic6ICdIVE1MRWxlbWVudCcsXG4gICdhY3JvbnltJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2FkZHJlc3MnOiAnSFRNTEVsZW1lbnQnLFxuICAnYXBwbGV0JzogJ0hUTUxBcHBsZXRFbGVtZW50JyxcbiAgJ2FyZWEnOiAnSFRNTEFyZWFFbGVtZW50JyxcbiAgJ2FydGljbGUnOiAnSFRNTEVsZW1lbnQnLFxuICAnYXNpZGUnOiAnSFRNTEVsZW1lbnQnLFxuICAnYXVkaW8nOiAnSFRNTEF1ZGlvRWxlbWVudCcsXG4gICdiJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2Jhc2UnOiAnSFRNTEJhc2VFbGVtZW50JyxcbiAgJ2Jhc2Vmb250JzogJ0hUTUxCYXNlRm9udEVsZW1lbnQnLFxuICAnYmRpJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2Jkbyc6ICdIVE1MRWxlbWVudCcsXG4gICdiaWcnOiAnSFRNTEVsZW1lbnQnLFxuICAnYmxvY2txdW90ZSc6ICdIVE1MUXVvdGVFbGVtZW50JyxcbiAgJ2JvZHknOiAnSFRNTEJvZHlFbGVtZW50JyxcbiAgJ2JyJzogJ0hUTUxCUkVsZW1lbnQnLFxuICAnYnV0dG9uJzogJ0hUTUxCdXR0b25FbGVtZW50JyxcbiAgJ2NhbnZhcyc6ICdIVE1MQ2FudmFzRWxlbWVudCcsXG4gICdjYXB0aW9uJzogJ0hUTUxUYWJsZUNhcHRpb25FbGVtZW50JyxcbiAgJ2NlbnRlcic6ICdIVE1MRWxlbWVudCcsXG4gICdjaXRlJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2NvZGUnOiAnSFRNTEVsZW1lbnQnLFxuICAnY29sJzogJ0hUTUxUYWJsZUNvbEVsZW1lbnQnLFxuICAnY29sZ3JvdXAnOiAnSFRNTFRhYmxlQ29sRWxlbWVudCcsXG4gICdjb21tYW5kJzogJ0hUTUxDb21tYW5kRWxlbWVudCcsXG4gICdkYXRhJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2RhdGFsaXN0JzogJ0hUTUxEYXRhTGlzdEVsZW1lbnQnLFxuICAnZGQnOiAnSFRNTEVsZW1lbnQnLFxuICAnZGVsJzogJ0hUTUxNb2RFbGVtZW50JyxcbiAgJ2RldGFpbHMnOiAnSFRNTERldGFpbHNFbGVtZW50JyxcbiAgJ2Rmbic6ICdIVE1MRWxlbWVudCcsXG4gICdkaWFsb2cnOiAnSFRNTERpYWxvZ0VsZW1lbnQnLFxuICAnZGlyJzogJ0hUTUxEaXJlY3RvcnlFbGVtZW50JyxcbiAgJ2Rpdic6ICdIVE1MRGl2RWxlbWVudCcsXG4gICdkbCc6ICdIVE1MRExpc3RFbGVtZW50JyxcbiAgJ2R0JzogJ0hUTUxFbGVtZW50JyxcbiAgJ2VtJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2ZpZWxkc2V0JzogJ0hUTUxGaWVsZFNldEVsZW1lbnQnLFxuICAnZmlnY2FwdGlvbic6ICdIVE1MRWxlbWVudCcsXG4gICdmaWd1cmUnOiAnSFRNTEVsZW1lbnQnLFxuICAnZm9udCc6ICdIVE1MRm9udEVsZW1lbnQnLFxuICAnZm9vdGVyJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2Zvcm0nOiAnSFRNTEZvcm1FbGVtZW50JyxcbiAgJ2ZyYW1lJzogJ0hUTUxGcmFtZUVsZW1lbnQnLFxuICAnZnJhbWVzZXQnOiAnSFRNTEZyYW1lU2V0RWxlbWVudCcsXG4gICdoMSc6ICdIVE1MSGVhZGluZ0VsZW1lbnQnLFxuICAnaDInOiAnSFRNTEhlYWRpbmdFbGVtZW50JyxcbiAgJ2gzJzogJ0hUTUxIZWFkaW5nRWxlbWVudCcsXG4gICdoNCc6ICdIVE1MSGVhZGluZ0VsZW1lbnQnLFxuICAnaDUnOiAnSFRNTEhlYWRpbmdFbGVtZW50JyxcbiAgJ2g2JzogJ0hUTUxIZWFkaW5nRWxlbWVudCcsXG4gICdoZWFkJzogJ0hUTUxIZWFkRWxlbWVudCcsXG4gICdoZWFkZXInOiAnSFRNTEVsZW1lbnQnLFxuICAnaGdyb3VwJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2hyJzogJ0hUTUxIUkVsZW1lbnQnLFxuICAnaHRtbCc6ICdIVE1MSHRtbEVsZW1lbnQnLFxuICAnaSc6ICdIVE1MRWxlbWVudCcsXG4gICdpZnJhbWUnOiAnSFRNTElGcmFtZUVsZW1lbnQnLFxuICAnaW1nJzogJ0hUTUxJbWFnZUVsZW1lbnQnLFxuICAnaW5wdXQnOiAnSFRNTElucHV0RWxlbWVudCcsXG4gICdpbnMnOiAnSFRNTE1vZEVsZW1lbnQnLFxuICAnaXNpbmRleCc6ICdIVE1MVW5rbm93bkVsZW1lbnQnLFxuICAna2JkJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2tleWdlbic6ICdIVE1MS2V5Z2VuRWxlbWVudCcsXG4gICdsYWJlbCc6ICdIVE1MTGFiZWxFbGVtZW50JyxcbiAgJ2xlZ2VuZCc6ICdIVE1MTGVnZW5kRWxlbWVudCcsXG4gICdsaSc6ICdIVE1MTElFbGVtZW50JyxcbiAgJ2xpbmsnOiAnSFRNTExpbmtFbGVtZW50JyxcbiAgJ21hcCc6ICdIVE1MTWFwRWxlbWVudCcsXG4gICdtYXJrJzogJ0hUTUxFbGVtZW50JyxcbiAgJ21lbnUnOiAnSFRNTE1lbnVFbGVtZW50JyxcbiAgJ21ldGEnOiAnSFRNTE1ldGFFbGVtZW50JyxcbiAgJ21ldGVyJzogJ0hUTUxNZXRlckVsZW1lbnQnLFxuICAnbmF2JzogJ0hUTUxFbGVtZW50JyxcbiAgJ25vYnInOiAnSFRNTEVsZW1lbnQnLFxuICAnbm9lbWJlZCc6ICdIVE1MRWxlbWVudCcsXG4gICdub2ZyYW1lcyc6ICdIVE1MRWxlbWVudCcsXG4gICdub3NjcmlwdCc6ICdIVE1MRWxlbWVudCcsXG4gICdvYmplY3QnOiAnSFRNTE9iamVjdEVsZW1lbnQnLFxuICAnb2wnOiAnSFRNTE9MaXN0RWxlbWVudCcsXG4gICdvcHRncm91cCc6ICdIVE1MT3B0R3JvdXBFbGVtZW50JyxcbiAgJ29wdGlvbic6ICdIVE1MT3B0aW9uRWxlbWVudCcsXG4gICdvdXRwdXQnOiAnSFRNTE91dHB1dEVsZW1lbnQnLFxuICAncCc6ICdIVE1MUGFyYWdyYXBoRWxlbWVudCcsXG4gICdwYXJhbSc6ICdIVE1MUGFyYW1FbGVtZW50JyxcbiAgJ3ByZSc6ICdIVE1MUHJlRWxlbWVudCcsXG4gICdwcm9ncmVzcyc6ICdIVE1MUHJvZ3Jlc3NFbGVtZW50JyxcbiAgJ3EnOiAnSFRNTFF1b3RlRWxlbWVudCcsXG4gICdzJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3NhbXAnOiAnSFRNTEVsZW1lbnQnLFxuICAnc2NyaXB0JzogJ0hUTUxTY3JpcHRFbGVtZW50JyxcbiAgJ3NlY3Rpb24nOiAnSFRNTEVsZW1lbnQnLFxuICAnc2VsZWN0JzogJ0hUTUxTZWxlY3RFbGVtZW50JyxcbiAgJ3NtYWxsJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3NvdXJjZSc6ICdIVE1MU291cmNlRWxlbWVudCcsXG4gICdzcGFuJzogJ0hUTUxTcGFuRWxlbWVudCcsXG4gICdzdHJpa2UnOiAnSFRNTEVsZW1lbnQnLFxuICAnc3Ryb25nJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3N0eWxlJzogJ0hUTUxTdHlsZUVsZW1lbnQnLFxuICAnc3ViJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3N1bW1hcnknOiAnSFRNTEVsZW1lbnQnLFxuICAnc3VwJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3RhYmxlJzogJ0hUTUxUYWJsZUVsZW1lbnQnLFxuICAndGJvZHknOiAnSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQnLFxuICAndGQnOiAnSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50JyxcbiAgJ3RleHRhcmVhJzogJ0hUTUxUZXh0QXJlYUVsZW1lbnQnLFxuICAndGZvb3QnOiAnSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQnLFxuICAndGgnOiAnSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQnLFxuICAndGhlYWQnOiAnSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQnLFxuICAndGltZSc6ICdIVE1MVGltZUVsZW1lbnQnLFxuICAndGl0bGUnOiAnSFRNTFRpdGxlRWxlbWVudCcsXG4gICd0cic6ICdIVE1MVGFibGVSb3dFbGVtZW50JyxcbiAgJ3RyYWNrJzogJ0hUTUxUcmFja0VsZW1lbnQnLFxuICAndHQnOiAnSFRNTEVsZW1lbnQnLFxuICAndSc6ICdIVE1MRWxlbWVudCcsXG4gICd1bCc6ICdIVE1MVUxpc3RFbGVtZW50JyxcbiAgJ3Zhcic6ICdIVE1MRWxlbWVudCcsXG4gICd2aWRlbyc6ICdIVE1MVmlkZW9FbGVtZW50JyxcbiAgJ3dicic6ICdIVE1MRWxlbWVudCdcbn07XG5odG1sNFsgJ0VMRU1FTlRfRE9NX0lOVEVSRkFDRVMnIF0gPSBodG1sNC5FTEVNRU5UX0RPTV9JTlRFUkZBQ0VTO1xuaHRtbDQudWVmZmVjdHMgPSB7XG4gICdOT1RfTE9BREVEJzogMCxcbiAgJ1NBTUVfRE9DVU1FTlQnOiAxLFxuICAnTkVXX0RPQ1VNRU5UJzogMlxufTtcbmh0bWw0WyAndWVmZmVjdHMnIF0gPSBodG1sNC51ZWZmZWN0cztcbmh0bWw0LlVSSUVGRkVDVFMgPSB7XG4gICdhOjpocmVmJzogMixcbiAgJ2FyZWE6OmhyZWYnOiAyLFxuICAnYmxvY2txdW90ZTo6Y2l0ZSc6IDAsXG4gICdjb21tYW5kOjppY29uJzogMSxcbiAgJ2RlbDo6Y2l0ZSc6IDAsXG4gICdmb3JtOjphY3Rpb24nOiAyLFxuICAnaW1nOjpzcmMnOiAxLFxuICAnaW5wdXQ6OnNyYyc6IDEsXG4gICdpbnM6OmNpdGUnOiAwLFxuICAncTo6Y2l0ZSc6IDAsXG4gICd2aWRlbzo6cG9zdGVyJzogMVxufTtcbmh0bWw0WyAnVVJJRUZGRUNUUycgXSA9IGh0bWw0LlVSSUVGRkVDVFM7XG5odG1sNC5sdHlwZXMgPSB7XG4gICdVTlNBTkRCT1hFRCc6IDIsXG4gICdTQU5EQk9YRUQnOiAxLFxuICAnREFUQSc6IDBcbn07XG5odG1sNFsgJ2x0eXBlcycgXSA9IGh0bWw0Lmx0eXBlcztcbmh0bWw0LkxPQURFUlRZUEVTID0ge1xuICAnYTo6aHJlZic6IDIsXG4gICdhcmVhOjpocmVmJzogMixcbiAgJ2Jsb2NrcXVvdGU6OmNpdGUnOiAyLFxuICAnY29tbWFuZDo6aWNvbic6IDEsXG4gICdkZWw6OmNpdGUnOiAyLFxuICAnZm9ybTo6YWN0aW9uJzogMixcbiAgJ2ltZzo6c3JjJzogMSxcbiAgJ2lucHV0OjpzcmMnOiAxLFxuICAnaW5zOjpjaXRlJzogMixcbiAgJ3E6OmNpdGUnOiAyLFxuICAndmlkZW86OnBvc3Rlcic6IDFcbn07XG5odG1sNFsgJ0xPQURFUlRZUEVTJyBdID0gaHRtbDQuTE9BREVSVFlQRVM7XG5cbi8vIENvcHlyaWdodCAoQykgMjAwNiBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQW4gSFRNTCBzYW5pdGl6ZXIgdGhhdCBjYW4gc2F0aXNmeSBhIHZhcmlldHkgb2Ygc2VjdXJpdHkgcG9saWNpZXMuXG4gKlxuICogPHA+XG4gKiBUaGUgSFRNTCBzYW5pdGl6ZXIgaXMgYnVpbHQgYXJvdW5kIGEgU0FYIHBhcnNlciBhbmQgSFRNTCBlbGVtZW50IGFuZFxuICogYXR0cmlidXRlcyBzY2hlbWFzLlxuICpcbiAqIElmIHRoZSBjc3NwYXJzZXIgaXMgbG9hZGVkLCBpbmxpbmUgc3R5bGVzIGFyZSBzYW5pdGl6ZWQgdXNpbmcgdGhlXG4gKiBjc3MgcHJvcGVydHkgYW5kIHZhbHVlIHNjaGVtYXMuICBFbHNlIHRoZXkgYXJlIHJlbW92ZSBkdXJpbmdcbiAqIHNhbml0aXphdGlvbi5cbiAqXG4gKiBJZiBpdCBleGlzdHMsIHVzZXMgcGFyc2VDc3NEZWNsYXJhdGlvbnMsIHNhbml0aXplQ3NzUHJvcGVydHksICBjc3NTY2hlbWFcbiAqXG4gKiBAYXV0aG9yIG1pa2VzYW11ZWxAZ21haWwuY29tXG4gKiBAYXV0aG9yIGphc3ZpckBnbWFpbC5jb21cbiAqIFxcQHJlcXVpcmVzIGh0bWw0LCBVUklcbiAqIFxcQG92ZXJyaWRlcyB3aW5kb3dcbiAqIFxcQHByb3ZpZGVzIGh0bWwsIGh0bWxfc2FuaXRpemVcbiAqL1xuXG4vLyBUaGUgVHVya2lzaCBpIHNlZW1zIHRvIGJlIGEgbm9uLWlzc3VlLCBidXQgYWJvcnQgaW4gY2FzZSBpdCBpcy5cbmlmICgnSScudG9Mb3dlckNhc2UoKSAhPT0gJ2knKSB7IHRocm93ICdJL2kgcHJvYmxlbSc7IH1cblxuLyoqXG4gKiBcXEBuYW1lc3BhY2VcbiAqL1xudmFyIGh0bWwgPSAoZnVuY3Rpb24oaHRtbDQpIHtcblxuICAvLyBGb3IgY2xvc3VyZSBjb21waWxlclxuICB2YXIgcGFyc2VDc3NEZWNsYXJhdGlvbnMsIHNhbml0aXplQ3NzUHJvcGVydHksIGNzc1NjaGVtYTtcbiAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2Ygd2luZG93KSB7XG4gICAgcGFyc2VDc3NEZWNsYXJhdGlvbnMgPSB3aW5kb3dbJ3BhcnNlQ3NzRGVjbGFyYXRpb25zJ107XG4gICAgc2FuaXRpemVDc3NQcm9wZXJ0eSA9IHdpbmRvd1snc2FuaXRpemVDc3NQcm9wZXJ0eSddO1xuICAgIGNzc1NjaGVtYSA9IHdpbmRvd1snY3NzU2NoZW1hJ107XG4gIH1cblxuICAvLyBUaGUga2V5cyBvZiB0aGlzIG9iamVjdCBtdXN0IGJlICdxdW90ZWQnIG9yIEpTQ29tcGlsZXIgd2lsbCBtYW5nbGUgdGhlbSFcbiAgLy8gVGhpcyBpcyBhIHBhcnRpYWwgbGlzdCAtLSBsb29rdXBFbnRpdHkoKSB1c2VzIHRoZSBob3N0IGJyb3dzZXIncyBwYXJzZXJcbiAgLy8gKHdoZW4gYXZhaWxhYmxlKSB0byBpbXBsZW1lbnQgZnVsbCBlbnRpdHkgbG9va3VwLlxuICAvLyBOb3RlIHRoYXQgZW50aXRpZXMgYXJlIGluIGdlbmVyYWwgY2FzZS1zZW5zaXRpdmU7IHRoZSB1cHBlcmNhc2Ugb25lcyBhcmVcbiAgLy8gZXhwbGljaXRseSBkZWZpbmVkIGJ5IEhUTUw1IChwcmVzdW1hYmx5IGFzIGNvbXBhdGliaWxpdHkpLlxuICB2YXIgRU5USVRJRVMgPSB7XG4gICAgJ2x0JzogJzwnLFxuICAgICdMVCc6ICc8JyxcbiAgICAnZ3QnOiAnPicsXG4gICAgJ0dUJzogJz4nLFxuICAgICdhbXAnOiAnJicsXG4gICAgJ0FNUCc6ICcmJyxcbiAgICAncXVvdCc6ICdcIicsXG4gICAgJ2Fwb3MnOiAnXFwnJyxcbiAgICAnbmJzcCc6ICdcXDI0MCdcbiAgfTtcblxuICAvLyBQYXR0ZXJucyBmb3IgdHlwZXMgb2YgZW50aXR5L2NoYXJhY3RlciByZWZlcmVuY2UgbmFtZXMuXG4gIHZhciBkZWNpbWFsRXNjYXBlUmUgPSAvXiMoXFxkKykkLztcbiAgdmFyIGhleEVzY2FwZVJlID0gL14jeChbMC05QS1GYS1mXSspJC87XG4gIC8vIGNvbnRhaW5zIGV2ZXJ5IGVudGl0eSBwZXIgaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9XRC1odG1sNS0yMDExMDExMy9uYW1lZC1jaGFyYWN0ZXItcmVmZXJlbmNlcy5odG1sXG4gIHZhciBzYWZlRW50aXR5TmFtZVJlID0gL15bQS1aYS16XVtBLXphLXowLTldKyQvO1xuICAvLyBVc2VkIGFzIGEgaG9vayB0byBpbnZva2UgdGhlIGJyb3dzZXIncyBlbnRpdHkgcGFyc2luZy4gPHRleHRhcmVhPiBpcyB1c2VkXG4gIC8vIGJlY2F1c2UgaXRzIGNvbnRlbnQgaXMgcGFyc2VkIGZvciBlbnRpdGllcyBidXQgbm90IHRhZ3MuXG4gIC8vIFRPRE8oa3ByZWlkKTogVGhpcyByZXRyaWV2YWwgaXMgYSBrbHVkZ2UgYW5kIGxlYWRzIHRvIHNpbGVudCBsb3NzIG9mXG4gIC8vIGZ1bmN0aW9uYWxpdHkgaWYgdGhlIGRvY3VtZW50IGlzbid0IGF2YWlsYWJsZS5cbiAgdmFyIGVudGl0eUxvb2t1cEVsZW1lbnQgPVxuICAgICAgKCd1bmRlZmluZWQnICE9PSB0eXBlb2Ygd2luZG93ICYmIHdpbmRvd1snZG9jdW1lbnQnXSlcbiAgICAgICAgICA/IHdpbmRvd1snZG9jdW1lbnQnXS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpIDogbnVsbDtcbiAgLyoqXG4gICAqIERlY29kZXMgYW4gSFRNTCBlbnRpdHkuXG4gICAqXG4gICAqIHtcXEB1cGRvY1xuICAgKiAkIGxvb2t1cEVudGl0eSgnbHQnKVxuICAgKiAjICc8J1xuICAgKiAkIGxvb2t1cEVudGl0eSgnR1QnKVxuICAgKiAjICc+J1xuICAgKiAkIGxvb2t1cEVudGl0eSgnYW1wJylcbiAgICogIyAnJidcbiAgICogJCBsb29rdXBFbnRpdHkoJ25ic3AnKVxuICAgKiAjICdcXHhBMCdcbiAgICogJCBsb29rdXBFbnRpdHkoJ2Fwb3MnKVxuICAgKiAjIFwiJ1wiXG4gICAqICQgbG9va3VwRW50aXR5KCdxdW90JylcbiAgICogIyAnXCInXG4gICAqICQgbG9va3VwRW50aXR5KCcjeGEnKVxuICAgKiAjICdcXG4nXG4gICAqICQgbG9va3VwRW50aXR5KCcjMTAnKVxuICAgKiAjICdcXG4nXG4gICAqICQgbG9va3VwRW50aXR5KCcjeDBhJylcbiAgICogIyAnXFxuJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgnIzAxMCcpXG4gICAqICMgJ1xcbidcbiAgICogJCBsb29rdXBFbnRpdHkoJyN4MDBBJylcbiAgICogIyAnXFxuJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgnUGknKSAgICAgIC8vIEtub3duIGZhaWx1cmVcbiAgICogIyAnXFx1MDNBMCdcbiAgICogJCBsb29rdXBFbnRpdHkoJ3BpJykgICAgICAvLyBLbm93biBmYWlsdXJlXG4gICAqICMgJ1xcdTAzQzAnXG4gICAqIH1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGNvbnRlbnQgYmV0d2VlbiB0aGUgJyYnIGFuZCB0aGUgJzsnLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGEgc2luZ2xlIHVuaWNvZGUgY29kZS1wb2ludCBhcyBhIHN0cmluZy5cbiAgICovXG4gIGZ1bmN0aW9uIGxvb2t1cEVudGl0eShuYW1lKSB7XG4gICAgLy8gVE9ETzogZW50aXR5IGxvb2t1cCBhcyBzcGVjaWZpZWQgYnkgSFRNTDUgYWN0dWFsbHkgZGVwZW5kcyBvbiB0aGVcbiAgICAvLyBwcmVzZW5jZSBvZiB0aGUgXCI7XCIuXG4gICAgaWYgKEVOVElUSUVTLmhhc093blByb3BlcnR5KG5hbWUpKSB7IHJldHVybiBFTlRJVElFU1tuYW1lXTsgfVxuICAgIHZhciBtID0gbmFtZS5tYXRjaChkZWNpbWFsRXNjYXBlUmUpO1xuICAgIGlmIChtKSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChtWzFdLCAxMCkpO1xuICAgIH0gZWxzZSBpZiAoISEobSA9IG5hbWUubWF0Y2goaGV4RXNjYXBlUmUpKSkge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobVsxXSwgMTYpKTtcbiAgICB9IGVsc2UgaWYgKGVudGl0eUxvb2t1cEVsZW1lbnQgJiYgc2FmZUVudGl0eU5hbWVSZS50ZXN0KG5hbWUpKSB7XG4gICAgICBlbnRpdHlMb29rdXBFbGVtZW50LmlubmVySFRNTCA9ICcmJyArIG5hbWUgKyAnOyc7XG4gICAgICB2YXIgdGV4dCA9IGVudGl0eUxvb2t1cEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICBFTlRJVElFU1tuYW1lXSA9IHRleHQ7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcmJyArIG5hbWUgKyAnOyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlT25lRW50aXR5KF8sIG5hbWUpIHtcbiAgICByZXR1cm4gbG9va3VwRW50aXR5KG5hbWUpO1xuICB9XG5cbiAgdmFyIG51bFJlID0gL1xcMC9nO1xuICBmdW5jdGlvbiBzdHJpcE5VTHMocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UobnVsUmUsICcnKTtcbiAgfVxuXG4gIHZhciBFTlRJVFlfUkVfMSA9IC8mKCNbMC05XSt8I1t4WF1bMC05QS1GYS1mXSt8XFx3Kyk7L2c7XG4gIHZhciBFTlRJVFlfUkVfMiA9IC9eKCNbMC05XSt8I1t4WF1bMC05QS1GYS1mXSt8XFx3Kyk7LztcbiAgLyoqXG4gICAqIFRoZSBwbGFpbiB0ZXh0IG9mIGEgY2h1bmsgb2YgSFRNTCBDREFUQSB3aGljaCBwb3NzaWJseSBjb250YWluaW5nLlxuICAgKlxuICAgKiB7XFxAdXBkb2NcbiAgICogJCB1bmVzY2FwZUVudGl0aWVzKCcnKVxuICAgKiAjICcnXG4gICAqICQgdW5lc2NhcGVFbnRpdGllcygnaGVsbG8gV29ybGQhJylcbiAgICogIyAnaGVsbG8gV29ybGQhJ1xuICAgKiAkIHVuZXNjYXBlRW50aXRpZXMoJzEgJmx0OyAyICZhbXA7JkFNUDsgNCAmZ3Q7IDMmIzEwOycpXG4gICAqICMgJzEgPCAyICYmIDQgPiAzXFxuJ1xuICAgKiAkIHVuZXNjYXBlRW50aXRpZXMoJyZsdDsmbHQgPC0gdW5maW5pc2hlZCBlbnRpdHkmZ3Q7JylcbiAgICogIyAnPCZsdCA8LSB1bmZpbmlzaGVkIGVudGl0eT4nXG4gICAqICQgdW5lc2NhcGVFbnRpdGllcygnL2Zvbz9iYXI9YmF6JmNvcHk9dHJ1ZScpICAvLyAmIG9mdGVuIHVuZXNjYXBlZCBpbiBVUkxTXG4gICAqICMgJy9mb28/YmFyPWJheiZjb3B5PXRydWUnXG4gICAqICQgdW5lc2NhcGVFbnRpdGllcygncGk9JnBpOyYjeDNjMDssIFBpPSZQaTtcXHUwM0EwJykgLy8gRklYTUU6IGtub3duIGZhaWx1cmVcbiAgICogIyAncGk9XFx1MDNDMFxcdTAzYzAsIFBpPVxcdTAzQTBcXHUwM0EwJ1xuICAgKiB9XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzIGEgY2h1bmsgb2YgSFRNTCBDREFUQS4gIEl0IG11c3Qgbm90IHN0YXJ0IG9yIGVuZCBpbnNpZGVcbiAgICogICAgIGFuIEhUTUwgZW50aXR5LlxuICAgKi9cbiAgZnVuY3Rpb24gdW5lc2NhcGVFbnRpdGllcyhzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShFTlRJVFlfUkVfMSwgZGVjb2RlT25lRW50aXR5KTtcbiAgfVxuXG4gIHZhciBhbXBSZSA9IC8mL2c7XG4gIHZhciBsb29zZUFtcFJlID0gLyYoW15hLXojXXwjKD86W14wLTl4XXx4KD86W14wLTlhLWZdfCQpfCQpfCQpL2dpO1xuICB2YXIgbHRSZSA9IC9bPF0vZztcbiAgdmFyIGd0UmUgPSAvPi9nO1xuICB2YXIgcXVvdFJlID0gL1xcXCIvZztcblxuICAvKipcbiAgICogRXNjYXBlcyBIVE1MIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBhdHRyaWJ1dGUgdmFsdWVzLlxuICAgKlxuICAgKiB7XFxAdXBkb2NcbiAgICogJCBlc2NhcGVBdHRyaWIoJycpXG4gICAqICMgJydcbiAgICogJCBlc2NhcGVBdHRyaWIoJ1wiPDwmPT0mPj5cIicpICAvLyBEbyBub3QganVzdCBlc2NhcGUgdGhlIGZpcnN0IG9jY3VycmVuY2UuXG4gICAqICMgJyYjMzQ7Jmx0OyZsdDsmYW1wOyYjNjE7JiM2MTsmYW1wOyZndDsmZ3Q7JiMzNDsnXG4gICAqICQgZXNjYXBlQXR0cmliKCdIZWxsbyA8V29ybGQ+IScpXG4gICAqICMgJ0hlbGxvICZsdDtXb3JsZCZndDshJ1xuICAgKiB9XG4gICAqL1xuICBmdW5jdGlvbiBlc2NhcGVBdHRyaWIocykge1xuICAgIHJldHVybiAoJycgKyBzKS5yZXBsYWNlKGFtcFJlLCAnJmFtcDsnKS5yZXBsYWNlKGx0UmUsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoZ3RSZSwgJyZndDsnKS5yZXBsYWNlKHF1b3RSZSwgJyYjMzQ7Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXNjYXBlIGVudGl0aWVzIGluIFJDREFUQSB0aGF0IGNhbiBiZSBlc2NhcGVkIHdpdGhvdXQgY2hhbmdpbmcgdGhlIG1lYW5pbmcuXG4gICAqIHtcXEB1cGRvY1xuICAgKiAkIG5vcm1hbGl6ZVJDRGF0YSgnMSA8IDIgJiZhbXA7IDMgPiA0ICZhbXA7JiA1ICZsdDsgNyY4JylcbiAgICogIyAnMSAmbHQ7IDIgJmFtcDsmYW1wOyAzICZndDsgNCAmYW1wOyZhbXA7IDUgJmx0OyA3JmFtcDs4J1xuICAgKiB9XG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVSQ0RhdGEocmNkYXRhKSB7XG4gICAgcmV0dXJuIHJjZGF0YVxuICAgICAgICAucmVwbGFjZShsb29zZUFtcFJlLCAnJmFtcDskMScpXG4gICAgICAgIC5yZXBsYWNlKGx0UmUsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoZ3RSZSwgJyZndDsnKTtcbiAgfVxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IHZhbGlkYXRlIHNhbml0aXplciByZWdleHMgYWdhaW5zdCB0aGUgSFRNTDUgZ3JhbW1hciBhdFxuICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9zeW50YXguaHRtbFxuICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9wYXJzaW5nLmh0bWxcbiAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdG9rZW5pemF0aW9uLmh0bWxcbiAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdHJlZS1jb25zdHJ1Y3Rpb24uaHRtbFxuXG4gIC8vIFdlIGluaXRpYWxseSBzcGxpdCBpbnB1dCBzbyB0aGF0IHBvdGVudGlhbGx5IG1lYW5pbmdmdWwgY2hhcmFjdGVyc1xuICAvLyBsaWtlICc8JyBhbmQgJz4nIGFyZSBzZXBhcmF0ZSB0b2tlbnMsIHVzaW5nIGEgZmFzdCBkdW1iIHByb2Nlc3MgdGhhdFxuICAvLyBpZ25vcmVzIHF1b3RpbmcuICBUaGVuIHdlIHdhbGsgdGhhdCB0b2tlbiBzdHJlYW0sIGFuZCB3aGVuIHdlIHNlZSBhXG4gIC8vICc8JyB0aGF0J3MgdGhlIHN0YXJ0IG9mIGEgdGFnLCB3ZSB1c2UgQVRUUl9SRSB0byBleHRyYWN0IHRhZ1xuICAvLyBhdHRyaWJ1dGVzIGZyb20gdGhlIG5leHQgdG9rZW4uICBUaGF0IHRva2VuIHdpbGwgbmV2ZXIgaGF2ZSBhICc+J1xuICAvLyBjaGFyYWN0ZXIuICBIb3dldmVyLCBpdCBtaWdodCBoYXZlIGFuIHVuYmFsYW5jZWQgcXVvdGUgY2hhcmFjdGVyLCBhbmRcbiAgLy8gd2hlbiB3ZSBzZWUgdGhhdCwgd2UgY29tYmluZSBhZGRpdGlvbmFsIHRva2VucyB0byBiYWxhbmNlIHRoZSBxdW90ZS5cblxuICB2YXIgQVRUUl9SRSA9IG5ldyBSZWdFeHAoXG4gICAgJ15cXFxccyonICtcbiAgICAnKFstLjpcXFxcd10rKScgKyAgICAgICAgICAgICAvLyAxID0gQXR0cmlidXRlIG5hbWVcbiAgICAnKD86JyArIChcbiAgICAgICdcXFxccyooPSlcXFxccyonICsgICAgICAgICAgIC8vIDIgPSBJcyB0aGVyZSBhIHZhbHVlP1xuICAgICAgJygnICsgKCAgICAgICAgICAgICAgICAgICAvLyAzID0gQXR0cmlidXRlIHZhbHVlXG4gICAgICAgIC8vIFRPRE8oZmVsaXg4YSk6IG1heWJlIHVzZSBiYWNrcmVmIHRvIG1hdGNoIHF1b3Rlc1xuICAgICAgICAnKFxcXCIpW15cXFwiXSooXFxcInwkKScgKyAgICAvLyA0LCA1ID0gRG91YmxlLXF1b3RlZCBzdHJpbmdcbiAgICAgICAgJ3wnICtcbiAgICAgICAgJyhcXCcpW15cXCddKihcXCd8JCknICsgICAgLy8gNiwgNyA9IFNpbmdsZS1xdW90ZWQgc3RyaW5nXG4gICAgICAgICd8JyArXG4gICAgICAgIC8vIFBvc2l0aXZlIGxvb2thaGVhZCB0byBwcmV2ZW50IGludGVycHJldGF0aW9uIG9mXG4gICAgICAgIC8vIDxmb28gYT0gYj1jPiBhcyA8Zm9vIGE9J2I9Yyc+XG4gICAgICAgIC8vIFRPRE8oZmVsaXg4YSk6IG1pZ2h0IGJlIGFibGUgdG8gZHJvcCB0aGlzIGNhc2VcbiAgICAgICAgJyg/PVthLXpdWy1cXFxcd10qXFxcXHMqPSknICtcbiAgICAgICAgJ3wnICtcbiAgICAgICAgLy8gVW5xdW90ZWQgdmFsdWUgdGhhdCBpc24ndCBhbiBhdHRyaWJ1dGUgbmFtZVxuICAgICAgICAvLyAoc2luY2Ugd2UgZGlkbid0IG1hdGNoIHRoZSBwb3NpdGl2ZSBsb29rYWhlYWQgYWJvdmUpXG4gICAgICAgICdbXlxcXCJcXCdcXFxcc10qJyApICtcbiAgICAgICcpJyApICtcbiAgICAnKT8nLFxuICAgICdpJyk7XG5cbiAgLy8gZmFsc2Ugb24gSUU8PTgsIHRydWUgb24gbW9zdCBvdGhlciBicm93c2Vyc1xuICB2YXIgc3BsaXRXaWxsQ2FwdHVyZSA9ICgnYSxiJy5zcGxpdCgvKCwpLykubGVuZ3RoID09PSAzKTtcblxuICAvLyBiaXRtYXNrIGZvciB0YWdzIHdpdGggc3BlY2lhbCBwYXJzaW5nLCBsaWtlIDxzY3JpcHQ+IGFuZCA8dGV4dGFyZWE+XG4gIHZhciBFRkxBR1NfVEVYVCA9IGh0bWw0LmVmbGFnc1snQ0RBVEEnXSB8IGh0bWw0LmVmbGFnc1snUkNEQVRBJ107XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgU0FYLWxpa2UgZXZlbnQgaGFuZGxlciwgcHJvZHVjZSBhIGZ1bmN0aW9uIHRoYXQgZmVlZHMgdGhvc2VcbiAgICogZXZlbnRzIGFuZCBhIHBhcmFtZXRlciB0byB0aGUgZXZlbnQgaGFuZGxlci5cbiAgICpcbiAgICogVGhlIGV2ZW50IGhhbmRsZXIgaGFzIHRoZSBmb3JtOntAY29kZVxuICAgKiB7XG4gICAqICAgLy8gTmFtZSBpcyBhbiB1cHBlci1jYXNlIEhUTUwgdGFnIG5hbWUuICBBdHRyaWJzIGlzIGFuIGFycmF5IG9mXG4gICAqICAgLy8gYWx0ZXJuYXRpbmcgdXBwZXItY2FzZSBhdHRyaWJ1dGUgbmFtZXMsIGFuZCBhdHRyaWJ1dGUgdmFsdWVzLiAgVGhlXG4gICAqICAgLy8gYXR0cmlicyBhcnJheSBpcyByZXVzZWQgYnkgdGhlIHBhcnNlci4gIFBhcmFtIGlzIHRoZSB2YWx1ZSBwYXNzZWQgdG9cbiAgICogICAvLyB0aGUgc2F4UGFyc2VyLlxuICAgKiAgIHN0YXJ0VGFnOiBmdW5jdGlvbiAobmFtZSwgYXR0cmlicywgcGFyYW0pIHsgLi4uIH0sXG4gICAqICAgZW5kVGFnOiAgIGZ1bmN0aW9uIChuYW1lLCBwYXJhbSkgeyAuLi4gfSxcbiAgICogICBwY2RhdGE6ICAgZnVuY3Rpb24gKHRleHQsIHBhcmFtKSB7IC4uLiB9LFxuICAgKiAgIHJjZGF0YTogICBmdW5jdGlvbiAodGV4dCwgcGFyYW0pIHsgLi4uIH0sXG4gICAqICAgY2RhdGE6ICAgIGZ1bmN0aW9uICh0ZXh0LCBwYXJhbSkgeyAuLi4gfSxcbiAgICogICBzdGFydERvYzogZnVuY3Rpb24gKHBhcmFtKSB7IC4uLiB9LFxuICAgKiAgIGVuZERvYzogICBmdW5jdGlvbiAocGFyYW0pIHsgLi4uIH1cbiAgICogfX1cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIgYSByZWNvcmQgY29udGFpbmluZyBldmVudCBoYW5kbGVycy5cbiAgICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nLCBPYmplY3QpfSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBjaHVuayBvZiBIVE1MXG4gICAqICAgICBhbmQgYSBwYXJhbWV0ZXIuICBUaGUgcGFyYW1ldGVyIGlzIHBhc3NlZCBvbiB0byB0aGUgaGFuZGxlciBtZXRob2RzLlxuICAgKi9cbiAgZnVuY3Rpb24gbWFrZVNheFBhcnNlcihoYW5kbGVyKSB7XG4gICAgLy8gQWNjZXB0IHF1b3RlZCBvciB1bnF1b3RlZCBrZXlzIChDbG9zdXJlIGNvbXBhdClcbiAgICB2YXIgaGNvcHkgPSB7XG4gICAgICBjZGF0YTogaGFuZGxlci5jZGF0YSB8fCBoYW5kbGVyWydjZGF0YSddLFxuICAgICAgY29tbWVudDogaGFuZGxlci5jb21tZW50IHx8IGhhbmRsZXJbJ2NvbW1lbnQnXSxcbiAgICAgIGVuZERvYzogaGFuZGxlci5lbmREb2MgfHwgaGFuZGxlclsnZW5kRG9jJ10sXG4gICAgICBlbmRUYWc6IGhhbmRsZXIuZW5kVGFnIHx8IGhhbmRsZXJbJ2VuZFRhZyddLFxuICAgICAgcGNkYXRhOiBoYW5kbGVyLnBjZGF0YSB8fCBoYW5kbGVyWydwY2RhdGEnXSxcbiAgICAgIHJjZGF0YTogaGFuZGxlci5yY2RhdGEgfHwgaGFuZGxlclsncmNkYXRhJ10sXG4gICAgICBzdGFydERvYzogaGFuZGxlci5zdGFydERvYyB8fCBoYW5kbGVyWydzdGFydERvYyddLFxuICAgICAgc3RhcnRUYWc6IGhhbmRsZXIuc3RhcnRUYWcgfHwgaGFuZGxlclsnc3RhcnRUYWcnXVxuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGh0bWxUZXh0LCBwYXJhbSkge1xuICAgICAgcmV0dXJuIHBhcnNlKGh0bWxUZXh0LCBoY29weSwgcGFyYW0pO1xuICAgIH07XG4gIH1cblxuICAvLyBQYXJzaW5nIHN0cmF0ZWd5IGlzIHRvIHNwbGl0IGlucHV0IGludG8gcGFydHMgdGhhdCBtaWdodCBiZSBsZXhpY2FsbHlcbiAgLy8gbWVhbmluZ2Z1bCAoZXZlcnkgXCI+XCIgYmVjb21lcyBhIHNlcGFyYXRlIHBhcnQpLCBhbmQgdGhlbiByZWNvbWJpbmVcbiAgLy8gcGFydHMgaWYgd2UgZGlzY292ZXIgdGhleSdyZSBpbiBhIGRpZmZlcmVudCBjb250ZXh0LlxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IFNpZ25pZmljYW50IHBlcmZvcm1hbmNlIHJlZ3Jlc3Npb25zIGZyb20gLWxlZ2FjeSxcbiAgLy8gdGVzdGVkIG9uXG4gIC8vICAgIENocm9tZSAxOC4wXG4gIC8vICAgIEZpcmVmb3ggMTEuMFxuICAvLyAgICBJRSA2LCA3LCA4LCA5XG4gIC8vICAgIE9wZXJhIDExLjYxXG4gIC8vICAgIFNhZmFyaSA1LjEuM1xuICAvLyBNYW55IG9mIHRoZXNlIGFyZSB1bnVzdWFsIHBhdHRlcm5zIHRoYXQgYXJlIGxpbmVhcmx5IHNsb3dlciBhbmQgc3RpbGxcbiAgLy8gcHJldHR5IGZhc3QgKGVnIDFtcyB0byA1bXMpLCBzbyBub3QgbmVjZXNzYXJpbHkgd29ydGggZml4aW5nLlxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IFwiPHNjcmlwdD4gJiYgJiYgJiYgLi4uIDxcXC9zY3JpcHQ+XCIgaXMgc2xvd2VyIG9uIGFsbFxuICAvLyBicm93c2Vycy4gIFRoZSBob3RzcG90IGlzIGh0bWxTcGxpdC5cblxuICAvLyBUT0RPKGZlbGl4OGEpOiBcIjxwIHRpdGxlPSc+Pj4+Li4uJz48XFwvcD5cIiBpcyBzbG93ZXIgb24gYWxsIGJyb3dzZXJzLlxuICAvLyBUaGlzIGlzIHBhcnRseSBodG1sU3BsaXQsIGJ1dCB0aGUgaG90c3BvdCBpcyBwYXJzZVRhZ0FuZEF0dHJzLlxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IFwiPGE+PFxcL2E+PGE+PFxcL2E+Li4uXCIgaXMgc2xvd2VyIG9uIElFOS5cbiAgLy8gXCI8YT4xPFxcL2E+PGE+MTxcXC9hPi4uLlwiIGlzIGZhc3RlciwgXCI8YT48XFwvYT4yPGE+PFxcL2E+Mi4uLlwiIGlzIGZhc3Rlci5cblxuICAvLyBUT0RPKGZlbGl4OGEpOiBcIjxwPHA8cC4uLlwiIGlzIHNsb3dlciBvbiBJRVs2LThdXG5cbiAgdmFyIGNvbnRpbnVhdGlvbk1hcmtlciA9IHt9O1xuICBmdW5jdGlvbiBwYXJzZShodG1sVGV4dCwgaGFuZGxlciwgcGFyYW0pIHtcbiAgICB2YXIgbSwgcCwgdGFnTmFtZTtcbiAgICB2YXIgcGFydHMgPSBodG1sU3BsaXQoaHRtbFRleHQpO1xuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIG5vTW9yZUdUOiBmYWxzZSxcbiAgICAgIG5vTW9yZUVuZENvbW1lbnRzOiBmYWxzZVxuICAgIH07XG4gICAgcGFyc2VDUFMoaGFuZGxlciwgcGFydHMsIDAsIHN0YXRlLCBwYXJhbSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgaW5pdGlhbCwgc3RhdGUsIHBhcmFtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhcnNlQ1BTKGgsIHBhcnRzLCBpbml0aWFsLCBzdGF0ZSwgcGFyYW0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUNQUyhoLCBwYXJ0cywgaW5pdGlhbCwgc3RhdGUsIHBhcmFtKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChoLnN0YXJ0RG9jICYmIGluaXRpYWwgPT0gMCkgeyBoLnN0YXJ0RG9jKHBhcmFtKTsgfVxuICAgICAgdmFyIG0sIHAsIHRhZ05hbWU7XG4gICAgICBmb3IgKHZhciBwb3MgPSBpbml0aWFsLCBlbmQgPSBwYXJ0cy5sZW5ndGg7IHBvcyA8IGVuZDspIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBwYXJ0c1twb3MrK107XG4gICAgICAgIHZhciBuZXh0ID0gcGFydHNbcG9zXTtcbiAgICAgICAgc3dpdGNoIChjdXJyZW50KSB7XG4gICAgICAgIGNhc2UgJyYnOlxuICAgICAgICAgIGlmIChFTlRJVFlfUkVfMi50ZXN0KG5leHQpKSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgaC5wY2RhdGEoJyYnICsgbmV4dCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHsgaC5wY2RhdGEoXCImYW1wO1wiLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnPFxcLyc6XG4gICAgICAgICAgaWYgKG0gPSAvXihbLVxcdzpdKylbXlxcJ1xcXCJdKi8uZXhlYyhuZXh0KSkge1xuICAgICAgICAgICAgaWYgKG1bMF0ubGVuZ3RoID09PSBuZXh0Lmxlbmd0aCAmJiBwYXJ0c1twb3MgKyAxXSA9PT0gJz4nKSB7XG4gICAgICAgICAgICAgIC8vIGZhc3QgY2FzZSwgbm8gYXR0cmlidXRlIHBhcnNpbmcgbmVlZGVkXG4gICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICB0YWdOYW1lID0gbVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICBpZiAoaC5lbmRUYWcpIHtcbiAgICAgICAgICAgICAgICBoLmVuZFRhZyh0YWdOYW1lLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHNsb3cgY2FzZSwgbmVlZCB0byBwYXJzZSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIC8vIFRPRE8oZmVsaXg4YSk6IGRvIHdlIHJlYWxseSBjYXJlIGFib3V0IG1pc3BhcnNpbmcgdGhpcz9cbiAgICAgICAgICAgICAgcG9zID0gcGFyc2VFbmRUYWcoXG4gICAgICAgICAgICAgICAgcGFydHMsIHBvcywgaCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlciwgc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgaC5wY2RhdGEoJyZsdDsvJywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgIGlmIChtID0gL14oWy1cXHc6XSspXFxzKlxcLz8vLmV4ZWMobmV4dCkpIHtcbiAgICAgICAgICAgIGlmIChtWzBdLmxlbmd0aCA9PT0gbmV4dC5sZW5ndGggJiYgcGFydHNbcG9zICsgMV0gPT09ICc+Jykge1xuICAgICAgICAgICAgICAvLyBmYXN0IGNhc2UsIG5vIGF0dHJpYnV0ZSBwYXJzaW5nIG5lZWRlZFxuICAgICAgICAgICAgICBwb3MgKz0gMjtcbiAgICAgICAgICAgICAgdGFnTmFtZSA9IG1bMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgaWYgKGguc3RhcnRUYWcpIHtcbiAgICAgICAgICAgICAgICBoLnN0YXJ0VGFnKHRhZ05hbWUsIFtdLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gdGFncyBsaWtlIDxzY3JpcHQ+IGFuZCA8dGV4dGFyZWE+IGhhdmUgc3BlY2lhbCBwYXJzaW5nXG4gICAgICAgICAgICAgIHZhciBlZmxhZ3MgPSBodG1sNC5FTEVNRU5UU1t0YWdOYW1lXTtcbiAgICAgICAgICAgICAgaWYgKGVmbGFncyAmIEVGTEFHU19URVhUKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHsgbmFtZTogdGFnTmFtZSwgbmV4dDogcG9zLCBlZmxhZ3M6IGVmbGFncyB9O1xuICAgICAgICAgICAgICAgIHBvcyA9IHBhcnNlVGV4dChcbiAgICAgICAgICAgICAgICAgIHBhcnRzLCB0YWcsIGgsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gc2xvdyBjYXNlLCBuZWVkIHRvIHBhcnNlIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgcG9zID0gcGFyc2VTdGFydFRhZyhcbiAgICAgICAgICAgICAgICBwYXJ0cywgcG9zLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgICBoLnBjZGF0YSgnJmx0OycsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc8XFwhLS0nOlxuICAgICAgICAgIC8vIFRoZSBwYXRob2xvZ2ljYWwgY2FzZSBpcyBuIGNvcGllcyBvZiAnPFxcIS0tJyB3aXRob3V0ICctLT4nLCBhbmRcbiAgICAgICAgICAvLyByZXBlYXRlZCBmYWlsdXJlIHRvIGZpbmQgJy0tPicgaXMgcXVhZHJhdGljLiAgV2UgYXZvaWQgdGhhdCBieVxuICAgICAgICAgIC8vIHJlbWVtYmVyaW5nIHdoZW4gc2VhcmNoIGZvciAnLS0+JyBmYWlscy5cbiAgICAgICAgICBpZiAoIXN0YXRlLm5vTW9yZUVuZENvbW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBBIGNvbW1lbnQgPFxcIS0teC0tPiBpcyBzcGxpdCBpbnRvIHRocmVlIHRva2VuczpcbiAgICAgICAgICAgIC8vICAgJzxcXCEtLScsICd4LS0nLCAnPidcbiAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gZmluZCB0aGUgbmV4dCAnPicgdG9rZW4gdGhhdCBoYXMgYSBwcmVjZWRpbmcgJy0tJy5cbiAgICAgICAgICAgIC8vIHBvcyBpcyBhdCB0aGUgJ3gtLScuXG4gICAgICAgICAgICBmb3IgKHAgPSBwb3MgKyAxOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnRzW3BdID09PSAnPicgJiYgLy0tJC8udGVzdChwYXJ0c1twIC0gMV0pKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocCA8IGVuZCkge1xuICAgICAgICAgICAgICBpZiAoaC5jb21tZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBwYXJ0cy5zbGljZShwb3MsIHApLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIGguY29tbWVudChcbiAgICAgICAgICAgICAgICAgIGNvbW1lbnQuc3Vic3RyKDAsIGNvbW1lbnQubGVuZ3RoIC0gMiksIHBhcmFtLFxuICAgICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHAgKyAxLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwb3MgPSBwICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0YXRlLm5vTW9yZUVuZENvbW1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0YXRlLm5vTW9yZUVuZENvbW1lbnRzKSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgaC5wY2RhdGEoJyZsdDshLS0nLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnPFxcISc6XG4gICAgICAgICAgaWYgKCEvXlxcdy8udGVzdChuZXh0KSkge1xuICAgICAgICAgICAgaWYgKGgucGNkYXRhKSB7XG4gICAgICAgICAgICAgIGgucGNkYXRhKCcmbHQ7IScsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNpbWlsYXIgdG8gbm9Nb3JlRW5kQ29tbWVudCBsb2dpY1xuICAgICAgICAgICAgaWYgKCFzdGF0ZS5ub01vcmVHVCkge1xuICAgICAgICAgICAgICBmb3IgKHAgPSBwb3MgKyAxOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbcF0gPT09ICc+JykgeyBicmVhazsgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChwIDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgcG9zID0gcCArIDE7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUubm9Nb3JlR1QgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUubm9Nb3JlR1QpIHtcbiAgICAgICAgICAgICAgaWYgKGgucGNkYXRhKSB7XG4gICAgICAgICAgICAgICAgaC5wY2RhdGEoJyZsdDshJywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc8Pyc6XG4gICAgICAgICAgLy8gc2ltaWxhciB0byBub01vcmVFbmRDb21tZW50IGxvZ2ljXG4gICAgICAgICAgaWYgKCFzdGF0ZS5ub01vcmVHVCkge1xuICAgICAgICAgICAgZm9yIChwID0gcG9zICsgMTsgcCA8IGVuZDsgcCsrKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJ0c1twXSA9PT0gJz4nKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocCA8IGVuZCkge1xuICAgICAgICAgICAgICBwb3MgPSBwICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0YXRlLm5vTW9yZUdUID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0YXRlLm5vTW9yZUdUKSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgaC5wY2RhdGEoJyZsdDs/JywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgaC5wY2RhdGEoXCImZ3Q7XCIsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgIGgucGNkYXRhKGN1cnJlbnQsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGguZW5kRG9jKSB7IGguZW5kRG9jKHBhcmFtKTsgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlICE9PSBjb250aW51YXRpb25NYXJrZXIpIHsgdGhyb3cgZTsgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNwbGl0IHN0ciBpbnRvIHBhcnRzIGZvciB0aGUgaHRtbCBwYXJzZXIuXG4gIGZ1bmN0aW9uIGh0bWxTcGxpdChzdHIpIHtcbiAgICAvLyBjYW4ndCBob2lzdCB0aGlzIG91dCBvZiB0aGUgZnVuY3Rpb24gYmVjYXVzZSBvZiB0aGUgcmUuZXhlYyBsb29wLlxuICAgIHZhciByZSA9IC8oPFxcL3w8XFwhLS18PFshP118WyY8Pl0pL2c7XG4gICAgc3RyICs9ICcnO1xuICAgIGlmIChzcGxpdFdpbGxDYXB0dXJlKSB7XG4gICAgICByZXR1cm4gc3RyLnNwbGl0KHJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICB2YXIgbGFzdFBvcyA9IDA7XG4gICAgICB2YXIgbTtcbiAgICAgIHdoaWxlICgobSA9IHJlLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICAgICAgcGFydHMucHVzaChzdHIuc3Vic3RyaW5nKGxhc3RQb3MsIG0uaW5kZXgpKTtcbiAgICAgICAgcGFydHMucHVzaChtWzBdKTtcbiAgICAgICAgbGFzdFBvcyA9IG0uaW5kZXggKyBtWzBdLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHBhcnRzLnB1c2goc3RyLnN1YnN0cmluZyhsYXN0UG9zKSk7XG4gICAgICByZXR1cm4gcGFydHM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VFbmRUYWcocGFydHMsIHBvcywgaCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlciwgc3RhdGUpIHtcbiAgICB2YXIgdGFnID0gcGFyc2VUYWdBbmRBdHRycyhwYXJ0cywgcG9zKTtcbiAgICAvLyBkcm9wIHVuY2xvc2VkIHRhZ3NcbiAgICBpZiAoIXRhZykgeyByZXR1cm4gcGFydHMubGVuZ3RoOyB9XG4gICAgaWYgKGguZW5kVGFnKSB7XG4gICAgICBoLmVuZFRhZyh0YWcubmFtZSwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgfVxuICAgIHJldHVybiB0YWcubmV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlU3RhcnRUYWcocGFydHMsIHBvcywgaCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlciwgc3RhdGUpIHtcbiAgICB2YXIgdGFnID0gcGFyc2VUYWdBbmRBdHRycyhwYXJ0cywgcG9zKTtcbiAgICAvLyBkcm9wIHVuY2xvc2VkIHRhZ3NcbiAgICBpZiAoIXRhZykgeyByZXR1cm4gcGFydHMubGVuZ3RoOyB9XG4gICAgaWYgKGguc3RhcnRUYWcpIHtcbiAgICAgIGguc3RhcnRUYWcodGFnLm5hbWUsIHRhZy5hdHRycywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHRhZy5uZXh0LCBzdGF0ZSwgcGFyYW0pKTtcbiAgICB9XG4gICAgLy8gdGFncyBsaWtlIDxzY3JpcHQ+IGFuZCA8dGV4dGFyZWE+IGhhdmUgc3BlY2lhbCBwYXJzaW5nXG4gICAgaWYgKHRhZy5lZmxhZ3MgJiBFRkxBR1NfVEVYVCkge1xuICAgICAgcmV0dXJuIHBhcnNlVGV4dChwYXJ0cywgdGFnLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YWcubmV4dDtcbiAgICB9XG4gIH1cblxuICB2YXIgZW5kVGFnUmUgPSB7fTtcblxuICAvLyBUYWdzIGxpa2UgPHNjcmlwdD4gYW5kIDx0ZXh0YXJlYT4gYXJlIGZsYWdnZWQgYXMgQ0RBVEEgb3IgUkNEQVRBLFxuICAvLyB3aGljaCBtZWFucyBldmVyeXRoaW5nIGlzIHRleHQgdW50aWwgd2Ugc2VlIHRoZSBjb3JyZWN0IGNsb3NpbmcgdGFnLlxuICBmdW5jdGlvbiBwYXJzZVRleHQocGFydHMsIHRhZywgaCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlciwgc3RhdGUpIHtcbiAgICB2YXIgZW5kID0gcGFydHMubGVuZ3RoO1xuICAgIGlmICghZW5kVGFnUmUuaGFzT3duUHJvcGVydHkodGFnLm5hbWUpKSB7XG4gICAgICBlbmRUYWdSZVt0YWcubmFtZV0gPSBuZXcgUmVnRXhwKCdeJyArIHRhZy5uYW1lICsgJyg/OltcXFxcc1xcXFwvXXwkKScsICdpJyk7XG4gICAgfVxuICAgIHZhciByZSA9IGVuZFRhZ1JlW3RhZy5uYW1lXTtcbiAgICB2YXIgZmlyc3QgPSB0YWcubmV4dDtcbiAgICB2YXIgcCA9IHRhZy5uZXh0ICsgMTtcbiAgICBmb3IgKDsgcCA8IGVuZDsgcCsrKSB7XG4gICAgICBpZiAocGFydHNbcCAtIDFdID09PSAnPFxcLycgJiYgcmUudGVzdChwYXJ0c1twXSkpIHsgYnJlYWs7IH1cbiAgICB9XG4gICAgaWYgKHAgPCBlbmQpIHsgcCAtPSAxOyB9XG4gICAgdmFyIGJ1ZiA9IHBhcnRzLnNsaWNlKGZpcnN0LCBwKS5qb2luKCcnKTtcbiAgICBpZiAodGFnLmVmbGFncyAmIGh0bWw0LmVmbGFnc1snQ0RBVEEnXSkge1xuICAgICAgaWYgKGguY2RhdGEpIHtcbiAgICAgICAgaC5jZGF0YShidWYsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHAsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFnLmVmbGFncyAmIGh0bWw0LmVmbGFnc1snUkNEQVRBJ10pIHtcbiAgICAgIGlmIChoLnJjZGF0YSkge1xuICAgICAgICBoLnJjZGF0YShub3JtYWxpemVSQ0RhdGEoYnVmKSwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcCwgc3RhdGUsIHBhcmFtKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYnVnJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9XG5cbiAgLy8gYXQgdGhpcyBwb2ludCwgcGFydHNbcG9zLTFdIGlzIGVpdGhlciBcIjxcIiBvciBcIjxcXC9cIi5cbiAgZnVuY3Rpb24gcGFyc2VUYWdBbmRBdHRycyhwYXJ0cywgcG9zKSB7XG4gICAgdmFyIG0gPSAvXihbLVxcdzpdKykvLmV4ZWMocGFydHNbcG9zXSk7XG4gICAgdmFyIHRhZyA9IHt9O1xuICAgIHRhZy5uYW1lID0gbVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgIHRhZy5lZmxhZ3MgPSBodG1sNC5FTEVNRU5UU1t0YWcubmFtZV07XG4gICAgdmFyIGJ1ZiA9IHBhcnRzW3Bvc10uc3Vic3RyKG1bMF0ubGVuZ3RoKTtcbiAgICAvLyBGaW5kIHRoZSBuZXh0ICc+Jy4gIFdlIG9wdGltaXN0aWNhbGx5IGFzc3VtZSB0aGlzICc+JyBpcyBub3QgaW4gYVxuICAgIC8vIHF1b3RlZCBjb250ZXh0LCBhbmQgZnVydGhlciBkb3duIHdlIGZpeCB0aGluZ3MgdXAgaWYgaXQgdHVybnMgb3V0IHRvXG4gICAgLy8gYmUgcXVvdGVkLlxuICAgIHZhciBwID0gcG9zICsgMTtcbiAgICB2YXIgZW5kID0gcGFydHMubGVuZ3RoO1xuICAgIGZvciAoOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgIGlmIChwYXJ0c1twXSA9PT0gJz4nKSB7IGJyZWFrOyB9XG4gICAgICBidWYgKz0gcGFydHNbcF07XG4gICAgfVxuICAgIGlmIChlbmQgPD0gcCkgeyByZXR1cm4gdm9pZCAwOyB9XG4gICAgdmFyIGF0dHJzID0gW107XG4gICAgd2hpbGUgKGJ1ZiAhPT0gJycpIHtcbiAgICAgIG0gPSBBVFRSX1JFLmV4ZWMoYnVmKTtcbiAgICAgIGlmICghbSkge1xuICAgICAgICAvLyBObyBhdHRyaWJ1dGUgZm91bmQ6IHNraXAgZ2FyYmFnZVxuICAgICAgICBidWYgPSBidWYucmVwbGFjZSgvXltcXHNcXFNdW15hLXpcXHNdKi8sICcnKTtcblxuICAgICAgfSBlbHNlIGlmICgobVs0XSAmJiAhbVs1XSkgfHwgKG1bNl0gJiYgIW1bN10pKSB7XG4gICAgICAgIC8vIFVudGVybWluYXRlZCBxdW90ZTogc2x1cnAgdG8gdGhlIG5leHQgdW5xdW90ZWQgJz4nXG4gICAgICAgIHZhciBxdW90ZSA9IG1bNF0gfHwgbVs2XTtcbiAgICAgICAgdmFyIHNhd1F1b3RlID0gZmFsc2U7XG4gICAgICAgIHZhciBhYnVmID0gW2J1ZiwgcGFydHNbcCsrXV07XG4gICAgICAgIGZvciAoOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgICAgICBpZiAoc2F3UXVvdGUpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0c1twXSA9PT0gJz4nKSB7IGJyZWFrOyB9XG4gICAgICAgICAgfSBlbHNlIGlmICgwIDw9IHBhcnRzW3BdLmluZGV4T2YocXVvdGUpKSB7XG4gICAgICAgICAgICBzYXdRdW90ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFidWYucHVzaChwYXJ0c1twXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2x1cnAgZmFpbGVkOiBsb3NlIHRoZSBnYXJiYWdlXG4gICAgICAgIGlmIChlbmQgPD0gcCkgeyBicmVhazsgfVxuICAgICAgICAvLyBPdGhlcndpc2UgcmV0cnkgYXR0cmlidXRlIHBhcnNpbmdcbiAgICAgICAgYnVmID0gYWJ1Zi5qb2luKCcnKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGhhdmUgYW4gYXR0cmlidXRlXG4gICAgICAgIHZhciBhTmFtZSA9IG1bMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIGFWYWx1ZSA9IG1bMl0gPyBkZWNvZGVWYWx1ZShtWzNdKSA6ICcnO1xuICAgICAgICBhdHRycy5wdXNoKGFOYW1lLCBhVmFsdWUpO1xuICAgICAgICBidWYgPSBidWYuc3Vic3RyKG1bMF0ubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFnLmF0dHJzID0gYXR0cnM7XG4gICAgdGFnLm5leHQgPSBwICsgMTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlVmFsdWUodikge1xuICAgIHZhciBxID0gdi5jaGFyQ29kZUF0KDApO1xuICAgIGlmIChxID09PSAweDIyIHx8IHEgPT09IDB4MjcpIHsgLy8gXCIgb3IgJ1xuICAgICAgdiA9IHYuc3Vic3RyKDEsIHYubGVuZ3RoIC0gMik7XG4gICAgfVxuICAgIHJldHVybiB1bmVzY2FwZUVudGl0aWVzKHN0cmlwTlVMcyh2KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgc3RyaXBzIHVuc2FmZSB0YWdzIGFuZCBhdHRyaWJ1dGVzIGZyb20gaHRtbC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIEFycmF5LjxzdHJpbmc+KTogP0FycmF5LjxzdHJpbmc+fSB0YWdQb2xpY3lcbiAgICogICAgIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyAodGFnTmFtZSwgYXR0cmlic1tdKSwgd2hlcmUgdGFnTmFtZSBpcyBhIGtleSBpblxuICAgKiAgICAgaHRtbDQuRUxFTUVOVFMgYW5kIGF0dHJpYnMgaXMgYW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgYXR0cmlidXRlIG5hbWVzXG4gICAqICAgICBhbmQgdmFsdWVzLiAgSXQgc2hvdWxkIHJldHVybiBhIHJlY29yZCAoYXMgZm9sbG93cyksIG9yIG51bGwgdG8gZGVsZXRlXG4gICAqICAgICB0aGUgZWxlbWVudC4gIEl0J3Mgb2theSBmb3IgdGFnUG9saWN5IHRvIG1vZGlmeSB0aGUgYXR0cmlicyBhcnJheSxcbiAgICogICAgIGJ1dCB0aGUgc2FtZSBhcnJheSBpcyByZXVzZWQsIHNvIGl0IHNob3VsZCBub3QgYmUgaGVsZCBiZXR3ZWVuIGNhbGxzLlxuICAgKiAgICAgUmVjb3JkIGtleXM6XG4gICAqICAgICAgICBhdHRyaWJzOiAocmVxdWlyZWQpIFNhbml0aXplZCBhdHRyaWJ1dGVzIGFycmF5LlxuICAgKiAgICAgICAgdGFnTmFtZTogUmVwbGFjZW1lbnQgdGFnIG5hbWUuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZywgQXJyYXkpfSBBIGZ1bmN0aW9uIHRoYXQgc2FuaXRpemVzIGEgc3RyaW5nIG9mXG4gICAqICAgICBIVE1MIGFuZCBhcHBlbmRzIHJlc3VsdCBzdHJpbmdzIHRvIHRoZSBzZWNvbmQgYXJndW1lbnQsIGFuIGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gbWFrZUh0bWxTYW5pdGl6ZXIodGFnUG9saWN5KSB7XG4gICAgdmFyIHN0YWNrO1xuICAgIHZhciBpZ25vcmluZztcbiAgICB2YXIgZW1pdCA9IGZ1bmN0aW9uICh0ZXh0LCBvdXQpIHtcbiAgICAgIGlmICghaWdub3JpbmcpIHsgb3V0LnB1c2godGV4dCk7IH1cbiAgICB9O1xuICAgIHJldHVybiBtYWtlU2F4UGFyc2VyKHtcbiAgICAgICdzdGFydERvYyc6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgc3RhY2sgPSBbXTtcbiAgICAgICAgaWdub3JpbmcgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICAnc3RhcnRUYWcnOiBmdW5jdGlvbih0YWdOYW1lT3JpZywgYXR0cmlicywgb3V0KSB7XG4gICAgICAgIGlmIChpZ25vcmluZykgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKCFodG1sNC5FTEVNRU5UUy5oYXNPd25Qcm9wZXJ0eSh0YWdOYW1lT3JpZykpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBlZmxhZ3NPcmlnID0gaHRtbDQuRUxFTUVOVFNbdGFnTmFtZU9yaWddO1xuICAgICAgICBpZiAoZWZsYWdzT3JpZyAmIGh0bWw0LmVmbGFnc1snRk9MREFCTEUnXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWNpc2lvbiA9IHRhZ1BvbGljeSh0YWdOYW1lT3JpZywgYXR0cmlicyk7XG4gICAgICAgIGlmICghZGVjaXNpb24pIHtcbiAgICAgICAgICBpZ25vcmluZyA9ICEoZWZsYWdzT3JpZyAmIGh0bWw0LmVmbGFnc1snRU1QVFknXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWNpc2lvbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhZ1BvbGljeSBkaWQgbm90IHJldHVybiBvYmplY3QgKG9sZCBBUEk/KScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnYXR0cmlicycgaW4gZGVjaXNpb24pIHtcbiAgICAgICAgICBhdHRyaWJzID0gZGVjaXNpb25bJ2F0dHJpYnMnXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhZ1BvbGljeSBnYXZlIG5vIGF0dHJpYnMnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWZsYWdzUmVwO1xuICAgICAgICB2YXIgdGFnTmFtZVJlcDtcbiAgICAgICAgaWYgKCd0YWdOYW1lJyBpbiBkZWNpc2lvbikge1xuICAgICAgICAgIHRhZ05hbWVSZXAgPSBkZWNpc2lvblsndGFnTmFtZSddO1xuICAgICAgICAgIGVmbGFnc1JlcCA9IGh0bWw0LkVMRU1FTlRTW3RhZ05hbWVSZXBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhZ05hbWVSZXAgPSB0YWdOYW1lT3JpZztcbiAgICAgICAgICBlZmxhZ3NSZXAgPSBlZmxhZ3NPcmlnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8obWlrZXNhbXVlbCk6IHJlbHlpbmcgb24gdGFnUG9saWN5IG5vdCB0byBpbnNlcnQgdW5zYWZlXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lcy5cblxuICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIG9wdGlvbmFsLWVuZC10YWcgZWxlbWVudCBhbmQgZWl0aGVyIHRoaXMgZWxlbWVudCBvciBpdHNcbiAgICAgICAgLy8gcHJldmlvdXMgbGlrZSBzaWJsaW5nIHdhcyByZXdyaXR0ZW4sIHRoZW4gaW5zZXJ0IGEgY2xvc2UgdGFnIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIHN0cnVjdHVyZS5cbiAgICAgICAgaWYgKGVmbGFnc09yaWcgJiBodG1sNC5lZmxhZ3NbJ09QVElPTkFMX0VORFRBRyddKSB7XG4gICAgICAgICAgdmFyIG9uU3RhY2sgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAob25TdGFjayAmJiBvblN0YWNrLm9yaWcgPT09IHRhZ05hbWVPcmlnICYmXG4gICAgICAgICAgICAgIChvblN0YWNrLnJlcCAhPT0gdGFnTmFtZVJlcCB8fCB0YWdOYW1lT3JpZyAhPT0gdGFnTmFtZVJlcCkpIHtcbiAgICAgICAgICAgICAgICBvdXQucHVzaCgnPFxcLycsIG9uU3RhY2sucmVwLCAnPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGVmbGFnc09yaWcgJiBodG1sNC5lZmxhZ3NbJ0VNUFRZJ10pKSB7XG4gICAgICAgICAgc3RhY2sucHVzaCh7b3JpZzogdGFnTmFtZU9yaWcsIHJlcDogdGFnTmFtZVJlcH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0LnB1c2goJzwnLCB0YWdOYW1lUmVwKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhdHRyaWJzLmxlbmd0aDsgaSA8IG47IGkgKz0gMikge1xuICAgICAgICAgIHZhciBhdHRyaWJOYW1lID0gYXR0cmlic1tpXSxcbiAgICAgICAgICAgICAgdmFsdWUgPSBhdHRyaWJzW2kgKyAxXTtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goJyAnLCBhdHRyaWJOYW1lLCAnPVwiJywgZXNjYXBlQXR0cmliKHZhbHVlKSwgJ1wiJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG91dC5wdXNoKCc+Jyk7XG5cbiAgICAgICAgaWYgKChlZmxhZ3NPcmlnICYgaHRtbDQuZWZsYWdzWydFTVBUWSddKVxuICAgICAgICAgICAgJiYgIShlZmxhZ3NSZXAgJiBodG1sNC5lZmxhZ3NbJ0VNUFRZJ10pKSB7XG4gICAgICAgICAgLy8gcmVwbGFjZW1lbnQgaXMgbm9uLWVtcHR5LCBzeW50aGVzaXplIGVuZCB0YWdcbiAgICAgICAgICBvdXQucHVzaCgnPFxcLycsIHRhZ05hbWVSZXAsICc+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnZW5kVGFnJzogZnVuY3Rpb24odGFnTmFtZSwgb3V0KSB7XG4gICAgICAgIGlmIChpZ25vcmluZykge1xuICAgICAgICAgIGlnbm9yaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHRtbDQuRUxFTUVOVFMuaGFzT3duUHJvcGVydHkodGFnTmFtZSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBlZmxhZ3MgPSBodG1sNC5FTEVNRU5UU1t0YWdOYW1lXTtcbiAgICAgICAgaWYgKCEoZWZsYWdzICYgKGh0bWw0LmVmbGFnc1snRU1QVFknXSB8IGh0bWw0LmVmbGFnc1snRk9MREFCTEUnXSkpKSB7XG4gICAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICAgIGlmIChlZmxhZ3MgJiBodG1sNC5lZmxhZ3NbJ09QVElPTkFMX0VORFRBRyddKSB7XG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gc3RhY2subGVuZ3RoOyAtLWluZGV4ID49IDA7KSB7XG4gICAgICAgICAgICAgIHZhciBzdGFja0VsT3JpZ1RhZyA9IHN0YWNrW2luZGV4XS5vcmlnO1xuICAgICAgICAgICAgICBpZiAoc3RhY2tFbE9yaWdUYWcgPT09IHRhZ05hbWUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgaWYgKCEoaHRtbDQuRUxFTUVOVFNbc3RhY2tFbE9yaWdUYWddICZcbiAgICAgICAgICAgICAgICAgICAgaHRtbDQuZWZsYWdzWydPUFRJT05BTF9FTkRUQUcnXSkpIHtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBwb3Agbm9uIG9wdGlvbmFsIGVuZCB0YWdzIGxvb2tpbmcgZm9yIGEgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoaW5kZXggPSBzdGFjay5sZW5ndGg7IC0taW5kZXggPj0gMDspIHtcbiAgICAgICAgICAgICAgaWYgKHN0YWNrW2luZGV4XS5vcmlnID09PSB0YWdOYW1lKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCA8IDApIHsgcmV0dXJuOyB9ICAvLyBOb3Qgb3BlbmVkLlxuICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFjay5sZW5ndGg7IC0taSA+IGluZGV4Oykge1xuICAgICAgICAgICAgdmFyIHN0YWNrRWxSZXBUYWcgPSBzdGFja1tpXS5yZXA7XG4gICAgICAgICAgICBpZiAoIShodG1sNC5FTEVNRU5UU1tzdGFja0VsUmVwVGFnXSAmXG4gICAgICAgICAgICAgICAgICBodG1sNC5lZmxhZ3NbJ09QVElPTkFMX0VORFRBRyddKSkge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnPFxcLycsIHN0YWNrRWxSZXBUYWcsICc+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCA8IHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFnTmFtZSA9IHN0YWNrW2luZGV4XS5yZXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YWNrLmxlbmd0aCA9IGluZGV4O1xuICAgICAgICAgIG91dC5wdXNoKCc8XFwvJywgdGFnTmFtZSwgJz4nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdwY2RhdGEnOiBlbWl0LFxuICAgICAgJ3JjZGF0YSc6IGVtaXQsXG4gICAgICAnY2RhdGEnOiBlbWl0LFxuICAgICAgJ2VuZERvYyc6IGZ1bmN0aW9uKG91dCkge1xuICAgICAgICBmb3IgKDsgc3RhY2subGVuZ3RoOyBzdGFjay5sZW5ndGgtLSkge1xuICAgICAgICAgIG91dC5wdXNoKCc8XFwvJywgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0ucmVwLCAnPicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgQUxMT1dFRF9VUklfU0NIRU1FUyA9IC9eKD86aHR0cHM/fG1haWx0b3xkYXRhKSQvaTtcblxuICBmdW5jdGlvbiBzYWZlVXJpKHVyaSwgZWZmZWN0LCBsdHlwZSwgaGludHMsIG5haXZlVXJpUmV3cml0ZXIpIHtcbiAgICBpZiAoIW5haXZlVXJpUmV3cml0ZXIpIHsgcmV0dXJuIG51bGw7IH1cbiAgICB0cnkge1xuICAgICAgdmFyIHBhcnNlZCA9IFVSSS5wYXJzZSgnJyArIHVyaSk7XG4gICAgICBpZiAocGFyc2VkKSB7XG4gICAgICAgIGlmICghcGFyc2VkLmhhc1NjaGVtZSgpIHx8XG4gICAgICAgICAgICBBTExPV0VEX1VSSV9TQ0hFTUVTLnRlc3QocGFyc2VkLmdldFNjaGVtZSgpKSkge1xuICAgICAgICAgIHZhciBzYWZlID0gbmFpdmVVcmlSZXdyaXRlcihwYXJzZWQsIGVmZmVjdCwgbHR5cGUsIGhpbnRzKTtcbiAgICAgICAgICByZXR1cm4gc2FmZSA/IHNhZmUudG9TdHJpbmcoKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBsb2cobG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAoIWF0dHJpYk5hbWUpIHtcbiAgICAgIGxvZ2dlcih0YWdOYW1lICsgXCIgcmVtb3ZlZFwiLCB7XG4gICAgICAgIGNoYW5nZTogXCJyZW1vdmVkXCIsXG4gICAgICAgIHRhZ05hbWU6IHRhZ05hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB2YXIgY2hhbmdlZCA9IFwiY2hhbmdlZFwiO1xuICAgICAgaWYgKG9sZFZhbHVlICYmICFuZXdWYWx1ZSkge1xuICAgICAgICBjaGFuZ2VkID0gXCJyZW1vdmVkXCI7XG4gICAgICB9IGVsc2UgaWYgKCFvbGRWYWx1ZSAmJiBuZXdWYWx1ZSkgIHtcbiAgICAgICAgY2hhbmdlZCA9IFwiYWRkZWRcIjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlcih0YWdOYW1lICsgXCIuXCIgKyBhdHRyaWJOYW1lICsgXCIgXCIgKyBjaGFuZ2VkLCB7XG4gICAgICAgIGNoYW5nZTogY2hhbmdlZCxcbiAgICAgICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICAgICAgYXR0cmliTmFtZTogYXR0cmliTmFtZSxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb2t1cEF0dHJpYnV0ZShtYXAsIHRhZ05hbWUsIGF0dHJpYk5hbWUpIHtcbiAgICB2YXIgYXR0cmliS2V5O1xuICAgIGF0dHJpYktleSA9IHRhZ05hbWUgKyAnOjonICsgYXR0cmliTmFtZTtcbiAgICBpZiAobWFwLmhhc093blByb3BlcnR5KGF0dHJpYktleSkpIHtcbiAgICAgIHJldHVybiBtYXBbYXR0cmliS2V5XTtcbiAgICB9XG4gICAgYXR0cmliS2V5ID0gJyo6OicgKyBhdHRyaWJOYW1lO1xuICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkge1xuICAgICAgcmV0dXJuIG1hcFthdHRyaWJLZXldO1xuICAgIH1cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIGZ1bmN0aW9uIGdldEF0dHJpYnV0ZVR5cGUodGFnTmFtZSwgYXR0cmliTmFtZSkge1xuICAgIHJldHVybiBsb29rdXBBdHRyaWJ1dGUoaHRtbDQuQVRUUklCUywgdGFnTmFtZSwgYXR0cmliTmFtZSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0TG9hZGVyVHlwZSh0YWdOYW1lLCBhdHRyaWJOYW1lKSB7XG4gICAgcmV0dXJuIGxvb2t1cEF0dHJpYnV0ZShodG1sNC5MT0FERVJUWVBFUywgdGFnTmFtZSwgYXR0cmliTmFtZSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0VXJpRWZmZWN0KHRhZ05hbWUsIGF0dHJpYk5hbWUpIHtcbiAgICByZXR1cm4gbG9va3VwQXR0cmlidXRlKGh0bWw0LlVSSUVGRkVDVFMsIHRhZ05hbWUsIGF0dHJpYk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplcyBhdHRyaWJ1dGVzIG9uIGFuIEhUTUwgdGFnLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBBbiBIVE1MIHRhZyBuYW1lIGluIGxvd2VyY2FzZS5cbiAgICogQHBhcmFtIHtBcnJheS48P3N0cmluZz59IGF0dHJpYnMgQW4gYXJyYXkgb2YgYWx0ZXJuYXRpbmcgbmFtZXMgYW5kIHZhbHVlcy5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb24oP3N0cmluZyk6ID9zdHJpbmd9IG9wdF9uYWl2ZVVyaVJld3JpdGVyIEEgdHJhbnNmb3JtIHRvXG4gICAqICAgICBhcHBseSB0byBVUkkgYXR0cmlidXRlczsgaXQgY2FuIHJldHVybiBhIG5ldyBzdHJpbmcgdmFsdWUsIG9yIG51bGwgdG9cbiAgICogICAgIGRlbGV0ZSB0aGUgYXR0cmlidXRlLiAgSWYgdW5zcGVjaWZpZWQsIFVSSSBhdHRyaWJ1dGVzIGFyZSBkZWxldGVkLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKD9zdHJpbmcpOiA/c3RyaW5nfSBvcHRfbm1Ub2tlblBvbGljeSBBIHRyYW5zZm9ybSB0byBhcHBseVxuICAgKiAgICAgdG8gYXR0cmlidXRlcyBjb250YWluaW5nIEhUTUwgbmFtZXMsIGVsZW1lbnQgSURzLCBhbmQgc3BhY2Utc2VwYXJhdGVkXG4gICAqICAgICBsaXN0cyBvZiBjbGFzc2VzOyBpdCBjYW4gcmV0dXJuIGEgbmV3IHN0cmluZyB2YWx1ZSwgb3IgbnVsbCB0byBkZWxldGVcbiAgICogICAgIHRoZSBhdHRyaWJ1dGUuICBJZiB1bnNwZWNpZmllZCwgdGhlc2UgYXR0cmlidXRlcyBhcmUga2VwdCB1bmNoYW5nZWQuXG4gICAqIEByZXR1cm4ge0FycmF5Ljw/c3RyaW5nPn0gVGhlIHNhbml0aXplZCBhdHRyaWJ1dGVzIGFzIGEgbGlzdCBvZiBhbHRlcm5hdGluZ1xuICAgKiAgICAgbmFtZXMgYW5kIHZhbHVlcywgd2hlcmUgYSBudWxsIHZhbHVlIG1lYW5zIHRvIG9taXQgdGhlIGF0dHJpYnV0ZS5cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplQXR0cmlicyh0YWdOYW1lLCBhdHRyaWJzLFxuICAgIG9wdF9uYWl2ZVVyaVJld3JpdGVyLCBvcHRfbm1Ub2tlblBvbGljeSwgb3B0X2xvZ2dlcikge1xuICAgIC8vIFRPRE8oZmVsaXg4YSk6IGl0J3Mgb2Jub3hpb3VzIHRoYXQgZG9tYWRvIGR1cGxpY2F0ZXMgbXVjaCBvZiB0aGlzXG4gICAgLy8gVE9ETyhmZWxpeDhhKTogbWF5YmUgY29uc2lzdGVudGx5IGVuZm9yY2UgY29uc3RyYWludHMgbGlrZSB0YXJnZXQ9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRyaWJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB2YXIgYXR0cmliTmFtZSA9IGF0dHJpYnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyaWJzW2kgKyAxXTtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuICAgICAgdmFyIGF0eXBlID0gbnVsbCwgYXR0cmliS2V5O1xuICAgICAgaWYgKChhdHRyaWJLZXkgPSB0YWdOYW1lICsgJzo6JyArIGF0dHJpYk5hbWUsXG4gICAgICAgICAgIGh0bWw0LkFUVFJJQlMuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkgfHxcbiAgICAgICAgICAoYXR0cmliS2V5ID0gJyo6OicgKyBhdHRyaWJOYW1lLFxuICAgICAgICAgICBodG1sNC5BVFRSSUJTLmhhc093blByb3BlcnR5KGF0dHJpYktleSkpKSB7XG4gICAgICAgIGF0eXBlID0gaHRtbDQuQVRUUklCU1thdHRyaWJLZXldO1xuICAgICAgfVxuICAgICAgaWYgKGF0eXBlICE9PSBudWxsKSB7XG4gICAgICAgIHN3aXRjaCAoYXR5cGUpIHtcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydOT05FJ106IGJyZWFrO1xuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ1NDUklQVCddOlxuICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydTVFlMRSddOlxuICAgICAgICAgICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgcGFyc2VDc3NEZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAob3B0X2xvZ2dlcikge1xuICAgICAgICAgICAgICAgIGxvZyhvcHRfbG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgdmFsdWUpO1xuXHQgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNhbml0aXplZERlY2xhcmF0aW9ucyA9IFtdO1xuICAgICAgICAgICAgcGFyc2VDc3NEZWNsYXJhdGlvbnMoXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb246IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3JtUHJvcCA9IHByb3BlcnR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2hlbWEgPSBjc3NTY2hlbWFbbm9ybVByb3BdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUNzc1Byb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybVByb3AsIHNjaGVtYSwgdG9rZW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0X25haXZlVXJpUmV3cml0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzYWZlVXJpKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwsIGh0bWw0LnVlZmZlY3RzLlNBTUVfRE9DVU1FTlQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw0Lmx0eXBlcy5TQU5EQk9YRUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRZUEVcIjogXCJDU1NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNTU19QUk9QXCI6IG5vcm1Qcm9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdF9uYWl2ZVVyaVJld3JpdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVkRGVjbGFyYXRpb25zLnB1c2gocHJvcGVydHkgKyAnOiAnICsgdG9rZW5zLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWx1ZSA9IHNhbml0aXplZERlY2xhcmF0aW9ucy5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgc2FuaXRpemVkRGVjbGFyYXRpb25zLmpvaW4oJyA7ICcpIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIGxvZyhvcHRfbG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnSUQnXTpcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydJRFJFRiddOlxuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ0lEUkVGUyddOlxuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ0dMT0JBTF9OQU1FJ106XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnTE9DQUxfTkFNRSddOlxuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ0NMQVNTRVMnXTpcbiAgICAgICAgICAgIHZhbHVlID0gb3B0X25tVG9rZW5Qb2xpY3kgPyBvcHRfbm1Ub2tlblBvbGljeSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIGxvZyhvcHRfbG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnVVJJJ106XG4gICAgICAgICAgICB2YWx1ZSA9IHNhZmVVcmkodmFsdWUsXG4gICAgICAgICAgICAgIGdldFVyaUVmZmVjdCh0YWdOYW1lLCBhdHRyaWJOYW1lKSxcbiAgICAgICAgICAgICAgZ2V0TG9hZGVyVHlwZSh0YWdOYW1lLCBhdHRyaWJOYW1lKSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiVFlQRVwiOiBcIk1BUktVUFwiLFxuICAgICAgICAgICAgICAgIFwiWE1MX0FUVFJcIjogYXR0cmliTmFtZSxcbiAgICAgICAgICAgICAgICBcIlhNTF9UQUdcIjogdGFnTmFtZVxuICAgICAgICAgICAgICB9LCBvcHRfbmFpdmVVcmlSZXdyaXRlcik7XG4gICAgICAgICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIGxvZyhvcHRfbG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnVVJJX0ZSQUdNRU5UJ106XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgJyMnID09PSB2YWx1ZS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSk7ICAvLyByZW1vdmUgdGhlIGxlYWRpbmcgJyMnXG4gICAgICAgICAgICAgIHZhbHVlID0gb3B0X25tVG9rZW5Qb2xpY3kgPyBvcHRfbm1Ub2tlblBvbGljeSh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcjJyArIHZhbHVlOyAgLy8gcmVzdG9yZSB0aGUgbGVhZGluZyAnIydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAob3B0X2xvZ2dlcikge1xuICAgICAgICAgIGxvZyhvcHRfbG9nZ2VyLCB0YWdOYW1lLCBhdHRyaWJOYW1lLCBvbGRWYWx1ZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdHRyaWJzW2kgKyAxXSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlicztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdGFnIHBvbGljeSB0aGF0IG9taXRzIGFsbCB0YWdzIG1hcmtlZCBVTlNBRkUgaW4gaHRtbDQtZGVmcy5qc1xuICAgKiBhbmQgYXBwbGllcyB0aGUgZGVmYXVsdCBhdHRyaWJ1dGUgc2FuaXRpemVyIHdpdGggdGhlIHN1cHBsaWVkIHBvbGljeSBmb3JcbiAgICogVVJJIGF0dHJpYnV0ZXMgYW5kIE5NVE9LRU4gYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb24oP3N0cmluZyk6ID9zdHJpbmd9IG9wdF9uYWl2ZVVyaVJld3JpdGVyIEEgdHJhbnNmb3JtIHRvXG4gICAqICAgICBhcHBseSB0byBVUkkgYXR0cmlidXRlcy4gIElmIG5vdCBnaXZlbiwgVVJJIGF0dHJpYnV0ZXMgYXJlIGRlbGV0ZWQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oP3N0cmluZyk6ID9zdHJpbmd9IG9wdF9ubVRva2VuUG9saWN5IEEgdHJhbnNmb3JtIHRvIGFwcGx5XG4gICAqICAgICB0byBhdHRyaWJ1dGVzIGNvbnRhaW5pbmcgSFRNTCBuYW1lcywgZWxlbWVudCBJRHMsIGFuZCBzcGFjZS1zZXBhcmF0ZWRcbiAgICogICAgIGxpc3RzIG9mIGNsYXNzZXMuICBJZiBub3QgZ2l2ZW4sIHN1Y2ggYXR0cmlidXRlcyBhcmUgbGVmdCB1bmNoYW5nZWQuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9uKHN0cmluZywgQXJyYXkuPD9zdHJpbmc+KX0gQSB0YWdQb2xpY3kgc3VpdGFibGUgZm9yXG4gICAqICAgICBwYXNzaW5nIHRvIGh0bWwuc2FuaXRpemUuXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlVGFnUG9saWN5KFxuICAgIG9wdF9uYWl2ZVVyaVJld3JpdGVyLCBvcHRfbm1Ub2tlblBvbGljeSwgb3B0X2xvZ2dlcikge1xuICAgIHJldHVybiBmdW5jdGlvbih0YWdOYW1lLCBhdHRyaWJzKSB7XG4gICAgICBpZiAoIShodG1sNC5FTEVNRU5UU1t0YWdOYW1lXSAmIGh0bWw0LmVmbGFnc1snVU5TQUZFJ10pKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgJ2F0dHJpYnMnOiBzYW5pdGl6ZUF0dHJpYnModGFnTmFtZSwgYXR0cmlicyxcbiAgICAgICAgICAgIG9wdF9uYWl2ZVVyaVJld3JpdGVyLCBvcHRfbm1Ub2tlblBvbGljeSwgb3B0X2xvZ2dlcilcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZXMgSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFjY29yZGluZyB0byBhIGdpdmVuIHBvbGljeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0SHRtbCBUaGUgSFRNTCB0byBzYW5pdGl6ZS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihzdHJpbmcsIEFycmF5Ljw/c3RyaW5nPil9IHRhZ1BvbGljeSBBIGZ1bmN0aW9uIHRoYXRcbiAgICogICAgIGRlY2lkZXMgd2hpY2ggdGFncyB0byBhY2NlcHQgYW5kIHNhbml0aXplcyB0aGVpciBhdHRyaWJ1dGVzIChzZWVcbiAgICogICAgIG1ha2VIdG1sU2FuaXRpemVyIGFib3ZlIGZvciBkZXRhaWxzKS5cbiAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc2FuaXRpemVkIEhUTUwuXG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVdpdGhQb2xpY3koaW5wdXRIdG1sLCB0YWdQb2xpY3kpIHtcbiAgICB2YXIgb3V0cHV0QXJyYXkgPSBbXTtcbiAgICBtYWtlSHRtbFNhbml0aXplcih0YWdQb2xpY3kpKGlucHV0SHRtbCwgb3V0cHV0QXJyYXkpO1xuICAgIHJldHVybiBvdXRwdXRBcnJheS5qb2luKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcHMgdW5zYWZlIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgZnJvbSBIVE1MLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRIdG1sIFRoZSBIVE1MIHRvIHNhbml0aXplLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbig/c3RyaW5nKTogP3N0cmluZ30gb3B0X25haXZlVXJpUmV3cml0ZXIgQSB0cmFuc2Zvcm0gdG9cbiAgICogICAgIGFwcGx5IHRvIFVSSSBhdHRyaWJ1dGVzLiAgSWYgbm90IGdpdmVuLCBVUkkgYXR0cmlidXRlcyBhcmUgZGVsZXRlZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbig/c3RyaW5nKTogP3N0cmluZ30gb3B0X25tVG9rZW5Qb2xpY3kgQSB0cmFuc2Zvcm0gdG8gYXBwbHlcbiAgICogICAgIHRvIGF0dHJpYnV0ZXMgY29udGFpbmluZyBIVE1MIG5hbWVzLCBlbGVtZW50IElEcywgYW5kIHNwYWNlLXNlcGFyYXRlZFxuICAgKiAgICAgbGlzdHMgb2YgY2xhc3Nlcy4gIElmIG5vdCBnaXZlbiwgc3VjaCBhdHRyaWJ1dGVzIGFyZSBsZWZ0IHVuY2hhbmdlZC5cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplKGlucHV0SHRtbCxcbiAgICBvcHRfbmFpdmVVcmlSZXdyaXRlciwgb3B0X25tVG9rZW5Qb2xpY3ksIG9wdF9sb2dnZXIpIHtcbiAgICB2YXIgdGFnUG9saWN5ID0gbWFrZVRhZ1BvbGljeShcbiAgICAgIG9wdF9uYWl2ZVVyaVJld3JpdGVyLCBvcHRfbm1Ub2tlblBvbGljeSwgb3B0X2xvZ2dlcik7XG4gICAgcmV0dXJuIHNhbml0aXplV2l0aFBvbGljeShpbnB1dEh0bWwsIHRhZ1BvbGljeSk7XG4gIH1cblxuICAvLyBFeHBvcnQgYm90aCBxdW90ZWQgYW5kIHVucXVvdGVkIG5hbWVzIGZvciBDbG9zdXJlIGxpbmthZ2UuXG4gIHZhciBodG1sID0ge307XG4gIGh0bWwuZXNjYXBlQXR0cmliID0gaHRtbFsnZXNjYXBlQXR0cmliJ10gPSBlc2NhcGVBdHRyaWI7XG4gIGh0bWwubWFrZUh0bWxTYW5pdGl6ZXIgPSBodG1sWydtYWtlSHRtbFNhbml0aXplciddID0gbWFrZUh0bWxTYW5pdGl6ZXI7XG4gIGh0bWwubWFrZVNheFBhcnNlciA9IGh0bWxbJ21ha2VTYXhQYXJzZXInXSA9IG1ha2VTYXhQYXJzZXI7XG4gIGh0bWwubWFrZVRhZ1BvbGljeSA9IGh0bWxbJ21ha2VUYWdQb2xpY3knXSA9IG1ha2VUYWdQb2xpY3k7XG4gIGh0bWwubm9ybWFsaXplUkNEYXRhID0gaHRtbFsnbm9ybWFsaXplUkNEYXRhJ10gPSBub3JtYWxpemVSQ0RhdGE7XG4gIGh0bWwuc2FuaXRpemUgPSBodG1sWydzYW5pdGl6ZSddID0gc2FuaXRpemU7XG4gIGh0bWwuc2FuaXRpemVBdHRyaWJzID0gaHRtbFsnc2FuaXRpemVBdHRyaWJzJ10gPSBzYW5pdGl6ZUF0dHJpYnM7XG4gIGh0bWwuc2FuaXRpemVXaXRoUG9saWN5ID0gaHRtbFsnc2FuaXRpemVXaXRoUG9saWN5J10gPSBzYW5pdGl6ZVdpdGhQb2xpY3k7XG4gIGh0bWwudW5lc2NhcGVFbnRpdGllcyA9IGh0bWxbJ3VuZXNjYXBlRW50aXRpZXMnXSA9IHVuZXNjYXBlRW50aXRpZXM7XG4gIHJldHVybiBodG1sO1xufSkoaHRtbDQpO1xuXG52YXIgaHRtbF9zYW5pdGl6ZSA9IGh0bWxbJ3Nhbml0aXplJ107XG5cbi8vIExvb3NlbiByZXN0cmljdGlvbnMgb2YgQ2FqYSdzXG4vLyBodG1sLXNhbml0aXplciB0byBhbGxvdyBmb3Igc3R5bGluZ1xuaHRtbDQuQVRUUklCU1snKjo6c3R5bGUnXSA9IDA7XG5odG1sNC5FTEVNRU5UU1snc3R5bGUnXSA9IDA7XG5odG1sNC5BVFRSSUJTWydhOjp0YXJnZXQnXSA9IDA7XG5odG1sNC5FTEVNRU5UU1sndmlkZW8nXSA9IDA7XG5odG1sNC5BVFRSSUJTWyd2aWRlbzo6c3JjJ10gPSAwO1xuaHRtbDQuQVRUUklCU1sndmlkZW86OnBvc3RlciddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ3ZpZGVvOjpjb250cm9scyddID0gMDtcbmh0bWw0LkVMRU1FTlRTWydhdWRpbyddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ2F1ZGlvOjpzcmMnXSA9IDA7XG5odG1sNC5BVFRSSUJTWyd2aWRlbzo6YXV0b3BsYXknXSA9IDA7XG5odG1sNC5BVFRSSUJTWyd2aWRlbzo6Y29udHJvbHMnXSA9IDA7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gaHRtbF9zYW5pdGl6ZTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbi8vIFJldHVybiB0aGUgYmFzZSB1cmwgb2YgYSBzcGVjaWZpYyB2ZXJzaW9uIG9mIE1hcEJveCdzIEFQSS5cbi8vXG4vLyBgaGFzaGAsIGlmIHByb3ZpZGVkIG11c3QgYmUgYSBudW1iZXIgYW5kIGlzIHVzZWQgdG8gZGlzdHJpYnV0ZSByZXF1ZXN0c1xuLy8gYWdhaW5zdCBtdWx0aXBsZSBgQ05BTUVgcyBpbiBvcmRlciB0byBhdm9pZCBjb25uZWN0aW9uIGxpbWl0cyBpbiBicm93c2Vyc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNTU0w6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ2h0dHBzOicgPT09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sIHx8IGNvbmZpZy5GT1JDRV9IVFRQUztcbiAgICB9LFxuICAgIGJhc2U6IGZ1bmN0aW9uKGhhc2gpIHtcbiAgICAgICAgLy8gQnkgZGVmYXVsdCwgdXNlIHB1YmxpYyBIVFRQIHVybHNcbiAgICAgICAgLy8gU3VwcG9ydCBIVFRQUyBpZiB0aGUgdXNlciBoYXMgc3BlY2lmaWVkIEhUVFBTIHVybHMgdG8gdXNlLCBhbmQgdGhpc1xuICAgICAgICAvLyBwYWdlIGlzIHVuZGVyIEhUVFBTXG4gICAgICAgIHZhciB1cmxzID0gdGhpcy5pc1NTTCgpID8gY29uZmlnLkhUVFBTX1VSTFMgOiBjb25maWcuSFRUUF9VUkxTO1xuICAgICAgICBpZiAoaGFzaCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBoYXNoICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHVybHNbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsc1toYXNoICUgdXJscy5sZW5ndGhdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBSZXF1ZXN0cyB0aGF0IGNvbnRhaW4gVVJMcyBuZWVkIGEgc2VjdXJlIGZsYWcgYXBwZW5kZWRcbiAgICAvLyB0byB0aGVpciBVUkxzIHNvIHRoYXQgdGhlIHNlcnZlciBrbm93cyB0byBzZW5kIFNTTC1pZmllZFxuICAgIC8vIHJlc291cmNlIHJlZmVyZW5jZXMuXG4gICAgc2VjdXJlRmxhZzogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NTTCgpKSByZXR1cm4gdXJsO1xuICAgICAgICBlbHNlIGlmICh1cmwubWF0Y2goLyhcXD98JilzZWN1cmUvKSkgcmV0dXJuIHVybDtcbiAgICAgICAgZWxzZSBpZiAodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHJldHVybiB1cmwgKyAnJnNlY3VyZSc7XG4gICAgICAgIGVsc2UgcmV0dXJuIHVybCArICc/c2VjdXJlJztcbiAgICB9LFxuICAgIC8vIENvbnZlcnQgYSBKU09OUCB1cmwgdG8gYSBKU09OIFVSTC4gKE1hcEJveCBUaWxlSlNPTiBzb21ldGltZXMgaGFyZGNvZGVzIEpTT05QLilcbiAgICBqc29uaWZ5OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC9cXC4oZ2VvKT9qc29ucCg/PSR8XFw/KS8sICcuJDFqc29uJyk7XG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVybCA9IHJlcXVpcmUoJy4vdXJsJyksXG4gICAgc2FuaXRpemUgPSByZXF1aXJlKCdzYW5pdGl6ZS1jYWphJyk7XG5cbi8vIG1hcGJveC1yZWxhdGVkIG1hcmtlcnMgZnVuY3Rpb25hbGl0eVxuLy8gcHJvdmlkZSBhbiBpY29uIGZyb20gbWFwYm94J3Mgc2ltcGxlLXN0eWxlIHNwZWMgYW5kIGhvc3RlZCBtYXJrZXJzXG4vLyBzZXJ2aWNlXG5mdW5jdGlvbiBpY29uKGZwKSB7XG4gICAgZnAgPSBmcCB8fCB7fTtcblxuICAgIHZhciBzaXplcyA9IHtcbiAgICAgICAgICAgIHNtYWxsOiBbMjAsIDUwXSxcbiAgICAgICAgICAgIG1lZGl1bTogWzMwLCA3MF0sXG4gICAgICAgICAgICBsYXJnZTogWzM1LCA5MF1cbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZSA9IGZwWydtYXJrZXItc2l6ZSddIHx8ICdtZWRpdW0nLFxuICAgICAgICBzeW1ib2wgPSAoZnBbJ21hcmtlci1zeW1ib2wnXSkgPyAnLScgKyBmcFsnbWFya2VyLXN5bWJvbCddIDogJycsXG4gICAgICAgIGNvbG9yID0gKGZwWydtYXJrZXItY29sb3InXSB8fCAnN2U3ZTdlJykucmVwbGFjZSgnIycsICcnKTtcblxuICAgIHJldHVybiBMLmljb24oe1xuICAgICAgICBpY29uVXJsOiB1cmwuYmFzZSgpICsgJ21hcmtlci8nICtcbiAgICAgICAgICAgICdwaW4tJyArIHNpemUuY2hhckF0KDApICsgc3ltYm9sICsgJysnICsgY29sb3IgK1xuICAgICAgICAgICAgLy8gZGV0ZWN0IGFuZCB1c2UgcmV0aW5hIG1hcmtlcnMsIHdoaWNoIGFyZSB4MiByZXNvbHV0aW9uXG4gICAgICAgICAgICAoKEwuQnJvd3Nlci5yZXRpbmEpID8gJ0AyeCcgOiAnJykgKyAnLnBuZycsXG4gICAgICAgIGljb25TaXplOiBzaXplc1tzaXplXSxcbiAgICAgICAgaWNvbkFuY2hvcjogW3NpemVzW3NpemVdWzBdIC8gMiwgc2l6ZXNbc2l6ZV1bMV0gLyAyXSxcbiAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtc2l6ZXNbc2l6ZV1bMV0gLyAyXVxuICAgIH0pO1xufVxuXG4vLyBhIGZhY3RvcnkgdGhhdCBwcm92aWRlcyBtYXJrZXJzIGZvciBMZWFmbGV0IGZyb20gTWFwQm94J3Ncbi8vIFtzaW1wbGUtc3R5bGUgc3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9zaW1wbGVzdHlsZS1zcGVjKVxuLy8gYW5kIFtNYXJrZXJzIEFQSV0oaHR0cDovL21hcGJveC5jb20vZGV2ZWxvcGVycy9hcGkvI21hcmtlcnMpLlxuZnVuY3Rpb24gc3R5bGUoZiwgbGF0bG9uKSB7XG4gICAgcmV0dXJuIEwubWFya2VyKGxhdGxvbiwge1xuICAgICAgICBpY29uOiBpY29uKGYucHJvcGVydGllcyksXG4gICAgICAgIHRpdGxlOiAoZi5wcm9wZXJ0aWVzICYmIGYucHJvcGVydGllcy50aXRsZSkgfHwgJydcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9wdXAoZiwgc2FuaXRpemVyKSB7XG4gICAgaWYgKCFmIHx8ICFmLnByb3BlcnRpZXMpIHJldHVybiAnJztcbiAgICB2YXIgcG9wdXAgPSAnJztcblxuICAgIGlmIChmLnByb3BlcnRpZXMudGl0bGUpIHtcbiAgICAgICAgcG9wdXAgKz0gJzxkaXYgY2xhc3M9XCJtYXJrZXItdGl0bGVcIj4nICsgZi5wcm9wZXJ0aWVzLnRpdGxlICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgaWYgKGYucHJvcGVydGllcy5kZXNjcmlwdGlvbikge1xuICAgICAgICBwb3B1cCArPSAnPGRpdiBjbGFzcz1cIm1hcmtlci1kZXNjcmlwdGlvblwiPicgKyBmLnByb3BlcnRpZXMuZGVzY3JpcHRpb24gKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICByZXR1cm4gKHNhbml0aXplciB8fCBzYW5pdGl6ZSkocG9wdXApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpY29uOiBpY29uLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBjcmVhdGVQb3B1cDogY3JlYXRlUG9wdXBcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBMZWdlbmRDb250cm9sID0gTC5Db250cm9sLmV4dGVuZCh7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnLFxuICAgICAgICBzYW5pdGl6ZXI6IHJlcXVpcmUoJ3Nhbml0aXplLWNhamEnKVxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbGVnZW5kcyA9IHt9O1xuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdtYXAtbGVnZW5kcyB3YXgtbGVnZW5kcycpO1xuICAgICAgICBMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKHRoaXMuX2NvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcbiAgICB9LFxuXG4gICAgYWRkTGVnZW5kOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIGlmICghdGV4dCkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIGlmICghdGhpcy5fbGVnZW5kc1t0ZXh0XSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnZW5kc1t0ZXh0XSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sZWdlbmRzW3RleHRdKys7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGUoKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlTGVnZW5kOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIGlmICghdGV4dCkgeyByZXR1cm4gdGhpczsgfVxuICAgICAgICBpZiAodGhpcy5fbGVnZW5kc1t0ZXh0XSkgdGhpcy5fbGVnZW5kc1t0ZXh0XS0tO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX21hcCkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdmFyIGhpZGUgPSAnbm9uZSc7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLl9sZWdlbmRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGVnZW5kcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLl9sZWdlbmRzW2ldKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9IHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTmFtZSA9ICdtYXAtbGVnZW5kIHdheC1sZWdlbmQnO1xuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKGkpO1xuICAgICAgICAgICAgICAgIGhpZGUgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGlkZSB0aGUgY29udHJvbCBlbnRpcmVseSB1bmxlc3MgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGxlZ2VuZDtcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHRoZXJlIHdpbGwgYmUgYSBzbWFsbCBncmV5IGJsZW1pc2ggb24gdGhlIG1hcC5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBoaWRlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IExlZ2VuZENvbnRyb2wob3B0aW9ucyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxuICAgIHVybCA9IHJlcXVpcmUoJy4vdXJsJyksXG4gICAgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfbG9hZFRpbGVKU09OOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChfLmluZGV4T2YoJy8nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIF8gPSB1cmwuYmFzZSgpICsgXyArICcuanNvbic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3QodXJsLnNlY3VyZUZsYWcoXyksIEwuYmluZChmdW5jdGlvbihlcnIsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwubG9nKCdjb3VsZCBub3QgbG9hZCBUaWxlSlNPTiBhdCAnICsgXyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnZXJyb3InLCB7ZXJyb3I6IGVycn0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoanNvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaWxlSlNPTihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChfICYmIHR5cGVvZiBfID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5fc2V0VGlsZUpTT04oXyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIE11c3RhY2hlID0gcmVxdWlyZSgnbXVzdGFjaGUnKTtcblxudmFyIEdyaWRDb250cm9sID0gTC5Db250cm9sLmV4dGVuZCh7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBpbm5hYmxlOiB0cnVlLFxuICAgICAgICBmb2xsb3c6IGZhbHNlLFxuICAgICAgICBzYW5pdGl6ZXI6IHJlcXVpcmUoJ3Nhbml0aXplLWNhamEnKSxcbiAgICAgICAgdG91Y2hUZWFzZXI6IHRydWUsXG4gICAgICAgIGxvY2F0aW9uOiB0cnVlXG4gICAgfSxcblxuICAgIF9jdXJyZW50Q29udGVudDogJycsXG5cbiAgICAvLyBwaW5uZWQgbWVhbnMgdGhhdCB0aGlzIGNvbnRyb2wgaXMgb24gYSBmZWF0dXJlIGFuZCB0aGUgdXNlciBoYXMgbGlrZWx5XG4gICAgLy8gY2xpY2tlZC4gcGlubmVkIHdpbGwgbm90IGJlY29tZSBmYWxzZSB1bmxlc3MgdGhlIHVzZXIgY2xpY2tzIG9mZlxuICAgIC8vIG9mIHRoZSBmZWF0dXJlIG9udG8gYW5vdGhlciBvciBjbGlja3MgeFxuICAgIF9waW5uZWQ6IGZhbHNlLFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgICAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdXRpbC5zdHJpY3RfaW5zdGFuY2UoXywgTC5DbGFzcywgJ0wubWFwYm94LmdyaWRMYXllcicpO1xuICAgICAgICB0aGlzLl9sYXllciA9IF87XG4gICAgfSxcblxuICAgIHNldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB9LFxuXG4gICAgX3RlbXBsYXRlOiBmdW5jdGlvbihmb3JtYXQsIGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZSB8fCB0aGlzLl9sYXllci5nZXRUaWxlSlNPTigpLnRlbXBsYXRlO1xuICAgICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciBkID0ge307XG4gICAgICAgICAgICBkWydfXycgKyBmb3JtYXQgKyAnX18nXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNhbml0aXplcihcbiAgICAgICAgICAgICAgICBNdXN0YWNoZS50b19odG1sKHRlbXBsYXRlLCBMLmV4dGVuZChkLCBkYXRhKSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGNoYW5nZSB0aGUgY29udGVudCBvZiB0aGUgdG9vbHRpcCBIVE1MIGlmIGl0IGhhcyBjaGFuZ2VkLCBvdGhlcndpc2VcbiAgICAvLyBub29wXG4gICAgX3Nob3c6IGZ1bmN0aW9uKGNvbnRlbnQsIG8pIHtcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09IHRoaXMuX2N1cnJlbnRDb250ZW50KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9sbG93KSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnNldExhdExuZyhvLmxhdExuZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwLl9wb3B1cCAhPT0gdGhpcy5fcG9wdXApIHRoaXMuX3BvcHVwLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFdyYXBwZXIuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9ICcnO1xuXG4gICAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKCk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl9jb250ZW50V3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnY2xvc2FibGUnKTtcbiAgICB9LFxuXG4gICAgX21vdXNlb3ZlcjogZnVuY3Rpb24obykge1xuICAgICAgICBpZiAoby5kYXRhKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdtYXAtY2xpY2thYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdtYXAtY2xpY2thYmxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGlubmVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl90ZW1wbGF0ZSgndGVhc2VyJywgby5kYXRhKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coY29udGVudCwgbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX21vdXNlbW92ZTogZnVuY3Rpb24obykge1xuICAgICAgICBpZiAodGhpcy5fcGlubmVkKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmZvbGxvdykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwLnNldExhdExuZyhvLmxhdExuZyk7XG4gICAgfSxcblxuICAgIF9uYXZpZ2F0ZVRvOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH0sXG5cbiAgICBfY2xpY2s6IGZ1bmN0aW9uKG8pIHtcblxuICAgICAgICB2YXIgbG9jYXRpb25fZm9ybWF0dGVkID0gdGhpcy5fdGVtcGxhdGUoJ2xvY2F0aW9uJywgby5kYXRhKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2NhdGlvbiAmJiBsb2NhdGlvbl9mb3JtYXR0ZWQgJiZcbiAgICAgICAgICAgIGxvY2F0aW9uX2Zvcm1hdHRlZC5zZWFyY2goL15odHRwcz86LykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0ZVRvKHRoaXMuX3RlbXBsYXRlKCdsb2NhdGlvbicsIG8uZGF0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGlubmFibGUpIHJldHVybjtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX3RlbXBsYXRlKCdmdWxsJywgby5kYXRhKTtcblxuICAgICAgICBpZiAoIWNvbnRlbnQgJiYgdGhpcy5vcHRpb25zLnRvdWNoVGVhc2VyICYmIEwuQnJvd3Nlci50b3VjaCkge1xuICAgICAgICAgICAgY29udGVudCA9IHRoaXMuX3RlbXBsYXRlKCd0ZWFzZXInLCBvLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdjbG9zYWJsZScpO1xuICAgICAgICAgICAgdGhpcy5fcGlubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coY29udGVudCwgbyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcGlubmVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnY2xvc2FibGUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblBvcHVwQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlQ2xvc2VidXR0b246IGZ1bmN0aW9uKGNvbnRhaW5lciwgZm4pIHtcbiAgICAgICAgdmFyIGxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgJ2Nsb3NlJywgY29udGFpbmVyKTtcblxuICAgICAgICBsaW5rLmlubmVySFRNTCA9ICdjbG9zZSc7XG4gICAgICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICAgICAgbGluay50aXRsZSA9ICdjbG9zZSc7XG5cbiAgICAgICAgTC5Eb21FdmVudFxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICAgICAgLm9uKGxpbmssICdtb3VzZWRvd24nLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIC5vbihsaW5rLCAnZGJsY2xpY2snLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIC5vbihsaW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIGZuLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gbGluaztcbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XG5cbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdsZWFmbGV0LWNvbnRyb2wtZ3JpZCBtYXAtdG9vbHRpcCcsXG4gICAgICAgICAgICBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUpLFxuICAgICAgICAgICAgY29udGVudFdyYXBwZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbWFwLXRvb2x0aXAtY29udGVudCcpO1xuXG4gICAgICAgIC8vIGhpZGUgdGhlIGNvbnRhaW5lciBlbGVtZW50IGluaXRpYWxseVxuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2xvc2VidXR0b24oY29udGFpbmVyLCB0aGlzLl9oaWRlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnRXcmFwcGVyKTtcblxuICAgICAgICB0aGlzLl9jb250ZW50V3JhcHBlciA9IGNvbnRlbnRXcmFwcGVyO1xuICAgICAgICB0aGlzLl9wb3B1cCA9IG5ldyBMLlBvcHVwKHsgYXV0b1BhbjogZmFsc2UsIGNsb3NlT25DbGljazogZmFsc2UgfSk7XG5cbiAgICAgICAgbWFwLm9uKCdwb3B1cGNsb3NlJywgdGhpcy5fb25Qb3B1cENsb3NlLCB0aGlzKTtcblxuICAgICAgICBMLkRvbUV2ZW50XG4gICAgICAgICAgICAuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24oY29udGFpbmVyKVxuICAgICAgICAgICAgLy8gYWxsb3cgcGVvcGxlIHRvIHNjcm9sbCB0b29sdGlwcyB3aXRoIG1vdXNld2hlZWxcbiAgICAgICAgICAgIC5hZGRMaXN0ZW5lcihjb250YWluZXIsICdtb3VzZXdoZWVsJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2xheWVyXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX21vdXNlb3ZlciwgdGhpcylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2Vtb3ZlLCB0aGlzKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuXG4gICAgICAgIG1hcC5vZmYoJ3BvcHVwY2xvc2UnLCB0aGlzLl9vblBvcHVwQ2xvc2UsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2xheWVyXG4gICAgICAgICAgICAub2ZmKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZW92ZXIsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZW1vdmUsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHcmlkQ29udHJvbChfLCBvcHRpb25zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgdXJsaGVscGVyID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0Jyk7XG52YXIgbWFya2VyID0gcmVxdWlyZSgnLi9tYXJrZXInKTtcblxuLy8gIyBtYXJrZXJMYXllclxuLy9cbi8vIEEgbGF5ZXIgb2YgbWFya2VycywgbG9hZGVkIGZyb20gTWFwQm94IG9yIGVsc2UuIEFkZHMgdGhlIGFiaWxpdHlcbi8vIHRvIHJlc2V0IG1hcmtlcnMsIGZpbHRlciB0aGVtLCBhbmQgbG9hZCB0aGVtIGZyb20gYSBHZW9KU09OIFVSTC5cbnZhciBNYXJrZXJMYXllciA9IEwuRmVhdHVyZUdyb3VwLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgc2FuaXRpemVyOiByZXF1aXJlKCdzYW5pdGl6ZS1jYWphJylcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgICAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdXRpbC5pZFVybChfLCB0aGlzKTtcbiAgICAgICAgLy8gamF2YXNjcmlwdCBvYmplY3Qgb2YgVGlsZUpTT04gZGF0YVxuICAgICAgICB9IGVsc2UgaWYgKF8gJiYgdHlwZW9mIF8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEdlb0pTT04oXyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0R2VvSlNPTjogZnVuY3Rpb24oXykge1xuICAgICAgICB0aGlzLl9nZW9qc29uID0gXztcbiAgICAgICAgdGhpcy5jbGVhckxheWVycygpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplKF8pO1xuICAgIH0sXG5cbiAgICBnZXRHZW9KU09OOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dlb2pzb247XG4gICAgfSxcblxuICAgIGxvYWRVUkw6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCAmJiAnYWJvcnQnIGluIHRoaXMuX3JlcXVlc3QpIHRoaXMuX3JlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgdXJsID0gdXJsaGVscGVyLmpzb25pZnkodXJsKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3QodXJsLCBMLmJpbmQoZnVuY3Rpb24oZXJyLCBqc29uKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChlcnIgJiYgZXJyLnR5cGUgIT09ICdhYm9ydCcpIHtcbiAgICAgICAgICAgICAgICB1dGlsLmxvZygnY291bGQgbm90IGxvYWQgbWFya2VycyBhdCAnICsgdXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ2Vycm9yJywge2Vycm9yOiBlcnJ9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoanNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0R2VvSlNPTihqc29uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3JlYWR5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGxvYWRJRDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFVSTCh1cmxoZWxwZXIuYmFzZSgpICsgaWQgKyAnL21hcmtlcnMuZ2VvanNvbicpO1xuICAgIH0sXG5cbiAgICBzZXRGaWx0ZXI6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmZpbHRlciA9IF87XG4gICAgICAgIGlmICh0aGlzLl9nZW9qc29uKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplKHRoaXMuX2dlb2pzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBnZXRGaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcjtcbiAgICB9LFxuXG4gICAgX2luaXRpYWxpemU6IGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gTC5VdGlsLmlzQXJyYXkoanNvbikgPyBqc29uIDoganNvbi5mZWF0dXJlcyxcbiAgICAgICAgICAgIGksIGxlbjtcblxuICAgICAgICBpZiAoZmVhdHVyZXMpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGZlYXR1cmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBhZGQgdGhpcyBpZiBnZW9tZXRyeSBvciBnZW9tZXRyaWVzIGFyZSBzZXQgYW5kIG5vdCBudWxsXG4gICAgICAgICAgICAgICAgaWYgKGZlYXR1cmVzW2ldLmdlb21ldHJpZXMgfHwgZmVhdHVyZXNbaV0uZ2VvbWV0cnkgfHwgZmVhdHVyZXNbaV0uZmVhdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZShmZWF0dXJlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXIoanNvbikpIHtcblxuICAgICAgICAgICAgdmFyIGxheWVyID0gTC5HZW9KU09OLmdlb21ldHJ5VG9MYXllcihqc29uLCBtYXJrZXIuc3R5bGUpLFxuICAgICAgICAgICAgICAgIHBvcHVwSHRtbCA9IG1hcmtlci5jcmVhdGVQb3B1cChqc29uLCB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKTtcblxuICAgICAgICAgICAgbGF5ZXIuZmVhdHVyZSA9IGpzb247XG5cbiAgICAgICAgICAgIGlmIChwb3B1cEh0bWwpIHtcbiAgICAgICAgICAgICAgICBsYXllci5iaW5kUG9wdXAocG9wdXBIdG1sLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE1hcmtlckxheWVyKF8sIG9wdGlvbnMpO1xufTtcbiIsInZhciBjb3JzbGl0ZSA9IHJlcXVpcmUoJ2NvcnNsaXRlJyksXG4gICAgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpLFxuICAgIHN0cmljdCA9IHJlcXVpcmUoJy4vdXRpbCcpLnN0cmljdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHN0cmljdCh1cmwsICdzdHJpbmcnKTtcbiAgICBzdHJpY3QoY2FsbGJhY2ssICdmdW5jdGlvbicpO1xuICAgIHJldHVybiBjb3JzbGl0ZSh1cmwsIG9ubG9hZCk7XG4gICAgZnVuY3Rpb24gb25sb2FkKGVyciwgcmVzcCkge1xuICAgICAgICBpZiAoIWVyciAmJiByZXNwKSB7XG4gICAgICAgICAgICAvLyBoYXJkY29kZWQgZ3JpZCByZXNwb25zZVxuICAgICAgICAgICAgaWYgKHJlc3AucmVzcG9uc2VUZXh0WzBdID09ICdnJykge1xuICAgICAgICAgICAgICAgIHJlc3AgPSBKU09OMy5wYXJzZShyZXNwLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDUsIHJlc3AucmVzcG9uc2VUZXh0Lmxlbmd0aCAtIDIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcCA9IEpTT04zLnBhcnNlKHJlc3AucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3ApO1xuICAgIH1cbn07XG4iLCJmdW5jdGlvbiB4aHIodXJsLCBjYWxsYmFjaywgY29ycykge1xuICAgIHZhciBzZW50ID0gZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVycm9yKCdCcm93c2VyIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjb3JzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbSA9IHVybC5tYXRjaCgvXlxccypodHRwcz86XFwvXFwvW15cXC9dKi8pO1xuICAgICAgICBjb3JzID0gbSAmJiAobVswXSAhPT0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uZG9tYWluICtcbiAgICAgICAgICAgICAgICAobG9jYXRpb24ucG9ydCA/ICc6JyArIGxvY2F0aW9uLnBvcnQgOiAnJykpO1xuICAgIH1cblxuICAgIHZhciB4O1xuXG4gICAgZnVuY3Rpb24gaXNTdWNjZXNzZnVsKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDAgfHwgc3RhdHVzID09PSAzMDQ7XG4gICAgfVxuXG4gICAgaWYgKGNvcnMgJiYgKFxuICAgICAgICAvLyBJRTctOSBRdWlya3MgJiBDb21wYXRpYmlsaXR5XG4gICAgICAgIHR5cGVvZiB3aW5kb3cuWERvbWFpblJlcXVlc3QgPT09ICdvYmplY3QnIHx8XG4gICAgICAgIC8vIElFOSBTdGFuZGFyZHMgbW9kZVxuICAgICAgICB0eXBlb2Ygd2luZG93LlhEb21haW5SZXF1ZXN0ID09PSAnZnVuY3Rpb24nXG4gICAgKSkge1xuICAgICAgICAvLyBJRTgtMTBcbiAgICAgICAgeCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcblxuICAgICAgICAvLyBFbnN1cmUgY2FsbGJhY2sgaXMgbmV2ZXIgY2FsbGVkIHN5bmNocm9ub3VzbHksIGkuZS4sIGJlZm9yZVxuICAgICAgICAvLyB4LnNlbmQoKSByZXR1cm5zICh0aGlzIGhhcyBiZWVuIG9ic2VydmVkIGluIHRoZSB3aWxkKS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LmpzL2lzc3Vlcy80NzJcbiAgICAgICAgdmFyIG9yaWdpbmFsID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc2VudCkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZGVkKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyBYRG9tYWluUmVxdWVzdFxuICAgICAgICAgICAgeC5zdGF0dXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgLy8gbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgICAgICBpc1N1Y2Nlc3NmdWwoeC5zdGF0dXMpKSBjYWxsYmFjay5jYWxsKHgsIG51bGwsIHgpO1xuICAgICAgICBlbHNlIGNhbGxiYWNrLmNhbGwoeCwgeCwgbnVsbCk7XG4gICAgfVxuXG4gICAgLy8gQm90aCBgb25yZWFkeXN0YXRlY2hhbmdlYCBhbmQgYG9ubG9hZGAgY2FuIGZpcmUuIGBvbnJlYWR5c3RhdGVjaGFuZ2VgXG4gICAgLy8gaGFzIFtiZWVuIHN1cHBvcnRlZCBmb3IgbG9uZ2VyXShodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MTgxNTA4LzIyOTAwMSkuXG4gICAgaWYgKCdvbmxvYWQnIGluIHgpIHtcbiAgICAgICAgeC5vbmxvYWQgPSBsb2FkZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiByZWFkeXN0YXRlKCkge1xuICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGxvYWRlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIFhNTEh0dHBSZXF1ZXN0IG9iamVjdCBhcyBhbiBlcnJvciBhbmQgcHJldmVudFxuICAgIC8vIGl0IGZyb20gZXZlciBiZWluZyBjYWxsZWQgYWdhaW4gYnkgcmVhc3NpZ25pbmcgaXQgdG8gYG5vb3BgXG4gICAgeC5vbmVycm9yID0gZnVuY3Rpb24gZXJyb3IoZXZ0KSB7XG4gICAgICAgIC8vIFhEb21haW5SZXF1ZXN0IHByb3ZpZGVzIG5vIGV2dCBwYXJhbWV0ZXJcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldnQgfHwgdHJ1ZSwgbnVsbCk7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7IH07XG4gICAgfTtcblxuICAgIC8vIElFOSBtdXN0IGhhdmUgb25wcm9ncmVzcyBiZSBzZXQgdG8gYSB1bmlxdWUgZnVuY3Rpb24uXG4gICAgeC5vbnByb2dyZXNzID0gZnVuY3Rpb24oKSB7IH07XG5cbiAgICB4Lm9udGltZW91dCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2dCwgbnVsbCk7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7IH07XG4gICAgfTtcblxuICAgIHgub25hYm9ydCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2dCwgbnVsbCk7XG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7IH07XG4gICAgfTtcblxuICAgIC8vIEdFVCBpcyB0aGUgb25seSBzdXBwb3J0ZWQgSFRUUCBWZXJiIGJ5IFhEb21haW5SZXF1ZXN0IGFuZCBpcyB0aGVcbiAgICAvLyBvbmx5IG9uZSBzdXBwb3J0ZWQgaGVyZS5cbiAgICB4Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0LiBTZW5kaW5nIGRhdGEgaXMgbm90IHN1cHBvcnRlZC5cbiAgICB4LnNlbmQobnVsbCk7XG4gICAgc2VudCA9IHRydWU7XG5cbiAgICByZXR1cm4geDtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHhocjtcbiIsIi8qISBKU09OIHYzLjIuNSB8IGh0dHA6Ly9iZXN0aWVqcy5naXRodWIuaW8vanNvbjMgfCBDb3B5cmlnaHQgMjAxMi0yMDEzLCBLaXQgQ2FtYnJpZGdlIHwgaHR0cDovL2tpdC5taXQtbGljZW5zZS5vcmcgKi9cbjsoZnVuY3Rpb24gKHdpbmRvdykge1xuICAvLyBDb252ZW5pZW5jZSBhbGlhc2VzLlxuICB2YXIgZ2V0Q2xhc3MgPSB7fS50b1N0cmluZywgaXNQcm9wZXJ0eSwgZm9yRWFjaCwgdW5kZWY7XG5cbiAgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4gIC8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG4gIHZhciBpc0xvYWRlciA9IHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kLCBKU09OMyA9IHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgZXhwb3J0cztcblxuICBpZiAoSlNPTjMgfHwgaXNMb2FkZXIpIHtcbiAgICBpZiAodHlwZW9mIEpTT04gPT0gXCJvYmplY3RcIiAmJiBKU09OKSB7XG4gICAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGltcGxlbWVudGF0aW9ucyBpblxuICAgICAgLy8gYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzIGFuZCBDb21tb25KUyBlbnZpcm9ubWVudHMuXG4gICAgICBpZiAoSlNPTjMpIHtcbiAgICAgICAgSlNPTjMuc3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnk7XG4gICAgICAgIEpTT04zLnBhcnNlID0gSlNPTi5wYXJzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEpTT04zID0gSlNPTjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzTG9hZGVyKSB7XG4gICAgICBKU09OMyA9IHdpbmRvdy5KU09OID0ge307XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gICAgSlNPTjMgPSB3aW5kb3cuSlNPTiB8fCAod2luZG93LkpTT04gPSB7fSk7XG4gIH1cblxuICAvLyBUZXN0IHRoZSBgRGF0ZSNnZXRVVEMqYCBtZXRob2RzLiBCYXNlZCBvbiB3b3JrIGJ5IEBZYWZmbGUuXG4gIHZhciBpc0V4dGVuZGVkID0gbmV3IERhdGUoLTM1MDk4MjczMzQ1NzMyOTIpO1xuICB0cnkge1xuICAgIC8vIFRoZSBgZ2V0VVRDRnVsbFllYXJgLCBgTW9udGhgLCBhbmQgYERhdGVgIG1ldGhvZHMgcmV0dXJuIG5vbnNlbnNpY2FsXG4gICAgLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbiAgICBpc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmXG4gICAgICAvLyBTYWZhcmkgPCAyLjAuMiBzdG9yZXMgdGhlIGludGVybmFsIG1pbGxpc2Vjb25kIHRpbWUgdmFsdWUgY29ycmVjdGx5LFxuICAgICAgLy8gYnV0IGNsaXBzIHRoZSB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGRhdGUgbWV0aG9kcyB0byB0aGUgcmFuZ2Ugb2ZcbiAgICAgIC8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbiAgICAgIGlzRXh0ZW5kZWQuZ2V0VVRDSG91cnMoKSA9PSAxMCAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbnV0ZXMoKSA9PSAzNyAmJiBpc0V4dGVuZGVkLmdldFVUQ1NlY29uZHMoKSA9PSA2ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgPT0gNzA4O1xuICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG5cbiAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbiAgLy8gaW1wbGVtZW50YXRpb25zIGFyZSBzcGVjLWNvbXBsaWFudC4gQmFzZWQgb24gd29yayBieSBLZW4gU255ZGVyLlxuICBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgIGlmIChuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpIHtcbiAgICAgIC8vIElFIDw9IDcgZG9lc24ndCBzdXBwb3J0IGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyB1c2luZyBzcXVhcmVcbiAgICAgIC8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuICAgICAgcmV0dXJuIFwiYVwiWzBdICE9IFwiYVwiO1xuICAgIH1cbiAgICB2YXIgdmFsdWUsIHNlcmlhbGl6ZWQgPSAne1wiYVwiOlsxLHRydWUsZmFsc2UsbnVsbCxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcIl19JywgaXNBbGwgPSBuYW1lID09IFwianNvblwiO1xuICAgIGlmIChpc0FsbCB8fCBuYW1lID09IFwianNvbi1zdHJpbmdpZnlcIiB8fCBuYW1lID09IFwianNvbi1wYXJzZVwiKSB7XG4gICAgICAvLyBUZXN0IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICBpZiAobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIgfHwgaXNBbGwpIHtcbiAgICAgICAgdmFyIHN0cmluZ2lmeSA9IEpTT04zLnN0cmluZ2lmeSwgc3RyaW5naWZ5U3VwcG9ydGVkID0gdHlwZW9mIHN0cmluZ2lmeSA9PSBcImZ1bmN0aW9uXCIgJiYgaXNFeHRlbmRlZDtcbiAgICAgICAgaWYgKHN0cmluZ2lmeVN1cHBvcnRlZCkge1xuICAgICAgICAgIC8vIEEgdGVzdCBmdW5jdGlvbiBvYmplY3Qgd2l0aCBhIGN1c3RvbSBgdG9KU09OYCBtZXRob2QuXG4gICAgICAgICAgKHZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgfSkudG9KU09OID0gdmFsdWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9XG4gICAgICAgICAgICAgIC8vIEZpcmVmb3ggMy4xYjEgYW5kIGIyIHNlcmlhbGl6ZSBzdHJpbmcsIG51bWJlciwgYW5kIGJvb2xlYW5cbiAgICAgICAgICAgICAgLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSgwKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyLCBhbmQgSlNPTiAyIHNlcmlhbGl6ZSB3cmFwcGVkIHByaW1pdGl2ZXMgYXMgb2JqZWN0XG4gICAgICAgICAgICAgIC8vIGxpdGVyYWxzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IE51bWJlcigpKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBTdHJpbmcoKSkgPT0gJ1wiXCInICYmXG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBgdG9KU09OYCBwcm9wZXJ0aWVzIGFzIHdlbGwsICp1bmxlc3MqIHRoZXkgYXJlIG5lc3RlZFxuICAgICAgICAgICAgICAvLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gSUUgOCBzZXJpYWxpemVzIGB1bmRlZmluZWRgIGFzIGBcInVuZGVmaW5lZFwiYC4gU2FmYXJpIDw9IDUuMS43IGFuZFxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBwYXNzIHRoaXMgdGVzdC5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS43IGFuZCBGRiAzLjFiMyB0aHJvdyBgRXJyb3JgcyBhbmQgYFR5cGVFcnJvcmBzLFxuICAgICAgICAgICAgICAvLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5LlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCBhIG51bWJlcixcbiAgICAgICAgICAgICAgLy8gc3RyaW5nLCBhcnJheSwgb2JqZWN0LCBCb29sZWFuLCBvciBgbnVsbGAgbGl0ZXJhbC4gVGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgIC8vIGluc2lkZSBvYmplY3Qgb3IgYXJyYXkgbGl0ZXJhbHMuIFlVSSAzLjAuMGIxIGlnbm9yZXMgY3VzdG9tIGB0b0pTT05gXG4gICAgICAgICAgICAgIC8vIG1ldGhvZHMgZW50aXJlbHkuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdmFsdWVdKSA9PSBcIlsxXVwiICYmXG4gICAgICAgICAgICAgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBzZXJpYWxpemVzIGBbdW5kZWZpbmVkXWAgYXMgYFwiW11cImAgaW5zdGVhZCBvZlxuICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWZdKSA9PSBcIltudWxsXVwiICYmXG4gICAgICAgICAgICAgIC8vIFlVSSAzLjAuMGIxIGZhaWxzIHRvIHNlcmlhbGl6ZSBgbnVsbGAgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJlxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4gICAgICAgICAgICAgIC8vIGBbMSwgdHJ1ZSwgZ2V0Q2xhc3MsIDFdYCBzZXJpYWxpemVzIGFzIFwiWzEsdHJ1ZSxdLFwiLiBUaGVzZSB2ZXJzaW9uc1xuICAgICAgICAgICAgICAvLyBvZiBGaXJlZm94IGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuICAgICAgICAgICAgICAvLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWYsIGdldENsYXNzLCBudWxsXSkgPT0gXCJbbnVsbCxudWxsLG51bGxdXCIgJiZcbiAgICAgICAgICAgICAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgLy8gd2hlcmUgY2hhcmFjdGVyIGVzY2FwZSBjb2RlcyBhcmUgZXhwZWN0ZWQgKGUuZy4sIGBcXGJgID0+IGBcXHUwMDA4YCkuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh7IFwiYVwiOiBbdmFsdWUsIHRydWUsIGZhbHNlLCBudWxsLCBcIlxceDAwXFxiXFxuXFxmXFxyXFx0XCJdIH0pID09IHNlcmlhbGl6ZWQgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobnVsbCwgdmFsdWUpID09PSBcIjFcIiAmJlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoWzEsIDJdLCBudWxsLCAxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIiAmJlxuICAgICAgICAgICAgICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4gICAgICAgICAgICAgIC8vIHNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycy5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC04LjY0ZTE1KSkgPT0gJ1wiLTI3MTgyMS0wNC0yMFQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSg4LjY0ZTE1KSkgPT0gJ1wiKzI3NTc2MC0wOS0xM1QwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgIC8vIEZpcmVmb3ggPD0gMTEuMCBpbmNvcnJlY3RseSBzZXJpYWxpemVzIHllYXJzIHByaW9yIHRvIDAgYXMgbmVnYXRpdmVcbiAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC02MjE5ODc1NTJlNSkpID09ICdcIi0wMDAwMDEtMDEtMDFUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjUgYW5kIE9wZXJhID49IDEwLjUzIGluY29ycmVjdGx5IHNlcmlhbGl6ZSBtaWxsaXNlY29uZFxuICAgICAgICAgICAgICAvLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtMSkpID09ICdcIjE5NjktMTItMzFUMjM6NTk6NTkuOTk5WlwiJztcbiAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVGVzdCBgSlNPTi5wYXJzZWAuXG4gICAgICBpZiAobmFtZSA9PSBcImpzb24tcGFyc2VcIiB8fCBpc0FsbCkge1xuICAgICAgICB2YXIgcGFyc2UgPSBKU09OMy5wYXJzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGEgYmFyZSBsaXRlcmFsIGlzIHByb3ZpZGVkLlxuICAgICAgICAgICAgLy8gQ29uZm9ybWluZyBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGFsc28gY29lcmNlIHRoZSBpbml0aWFsIGFyZ3VtZW50IHRvXG4gICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgaWYgKHBhcnNlKFwiMFwiKSA9PT0gMCAmJiAhcGFyc2UoZmFsc2UpKSB7XG4gICAgICAgICAgICAgIC8vIFNpbXBsZSBwYXJzaW5nIHRlc3QuXG4gICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgIHZhciBwYXJzZVN1cHBvcnRlZCA9IHZhbHVlW1wiYVwiXS5sZW5ndGggPT0gNSAmJiB2YWx1ZVtcImFcIl1bMF0gPT09IDE7XG4gICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjIgYW5kIEZGIDMuMWIxIGFsbG93IHVuZXNjYXBlZCB0YWJzIGluIHN0cmluZ3MuXG4gICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9ICFwYXJzZSgnXCJcXHRcIicpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMsIGFuZCBsZWFkaW5nIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFpbGluZyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzb1xuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlU3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U3VwcG9ydGVkICYmIHBhcnNlU3VwcG9ydGVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaGFzKFwianNvblwiKSkge1xuICAgIC8vIENvbW1vbiBgW1tDbGFzc11dYCBuYW1lIGFsaWFzZXMuXG4gICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG4gICAgdmFyIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiO1xuICAgIHZhciBudW1iZXJDbGFzcyA9IFwiW29iamVjdCBOdW1iZXJdXCI7XG4gICAgdmFyIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgICB2YXIgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB2YXIgYm9vbGVhbkNsYXNzID0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG5cbiAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgLy8gRGVmaW5lIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzIGlmIHRoZSBgRGF0ZWAgbWV0aG9kcyBhcmUgYnVnZ3kuXG4gICAgaWYgKCFpc0V4dGVuZGVkKSB7XG4gICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbiAgICAgIC8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG4gICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgIC8vIEludGVybmFsOiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuIHRoZSBVbml4IGVwb2NoIGFuZCB0aGVcbiAgICAgIC8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBNb250aHNbbW9udGhdICsgMzY1ICogKHllYXIgLSAxOTcwKSArIGZsb29yKCh5ZWFyIC0gMTk2OSArIChtb250aCA9ICsobW9udGggPiAxKSkpIC8gNCkgLSBmbG9vcigoeWVhciAtIDE5MDEgKyBtb250aCkgLyAxMDApICsgZmxvb3IoKHllYXIgLSAxNjAxICsgbW9udGgpIC8gNDAwKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgaWYgYSBwcm9wZXJ0eSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW5cbiAgICAvLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbiAgICBpZiAoIShpc1Byb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHZhciBtZW1iZXJzID0ge30sIGNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCwgbWVtYmVycy5fX3Byb3RvX18gPSB7XG4gICAgICAgICAgLy8gVGhlICpwcm90byogcHJvcGVydHkgY2Fubm90IGJlIHNldCBtdWx0aXBsZSB0aW1lcyBpbiByZWNlbnRcbiAgICAgICAgICAvLyB2ZXJzaW9ucyBvZiBGaXJlZm94IGFuZCBTZWFNb25rZXkuXG4gICAgICAgICAgXCJ0b1N0cmluZ1wiOiAxXG4gICAgICAgIH0sIG1lbWJlcnMpLnRvU3RyaW5nICE9IGdldENsYXNzKSB7XG4gICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbiAgICAgICAgICAvLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIC8vIENhcHR1cmUgYW5kIGJyZWFrIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4gKHNlZSBzZWN0aW9uIDguNi4yXG4gICAgICAgICAgICAvLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4gICAgICAgICAgICAvLyB1bnNhZmUgdHJhbnNmb3JtYXRpb24gYnkgdGhlIENsb3N1cmUgQ29tcGlsZXIuXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9fcHJvdG9fXywgcmVzdWx0ID0gcHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICB0aGlzLl9fcHJvdG9fXyA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgLy8gVXNlIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IHRvIHNpbXVsYXRlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGluXG4gICAgICAgICAgLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAodGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbWVtYmVycyA9IG51bGw7XG4gICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcm5hbDogQSBzZXQgb2YgcHJpbWl0aXZlIHR5cGVzIHVzZWQgYnkgYGlzSG9zdFR5cGVgLlxuICAgIHZhciBQcmltaXRpdmVUeXBlcyA9IHtcbiAgICAgICdib29sZWFuJzogMSxcbiAgICAgICdudW1iZXInOiAxLFxuICAgICAgJ3N0cmluZyc6IDEsXG4gICAgICAndW5kZWZpbmVkJzogMVxuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGBwcm9wZXJ0eWAgdmFsdWUgaXMgYVxuICAgIC8vIG5vbi1wcmltaXRpdmUuXG4gICAgdmFyIGlzSG9zdFR5cGUgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgIHJldHVybiB0eXBlID09ICdvYmplY3QnID8gISFvYmplY3RbcHJvcGVydHldIDogIVByaW1pdGl2ZVR5cGVzW3R5cGVdO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgIC8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbiAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzaXplID0gMCwgUHJvcGVydGllcywgbWVtYmVycywgcHJvcGVydHksIGZvckVhY2g7XG5cbiAgICAgIC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuICAgICAgLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbiAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgKFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmFsdWVPZiA9IDA7XG4gICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxuICAgICAgbWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgLy8gSWdub3JlIGFsbCBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBzaXplKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBpdGVyYXRpb24gYWxnb3JpdGhtLlxuICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgbWVtYmVycyA9IFtcInZhbHVlT2ZcIiwgXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwicHJvcGVydHlJc0VudW1lcmFibGVcIiwgXCJpc1Byb3RvdHlwZU9mXCIsIFwiaGFzT3duUHJvcGVydHlcIiwgXCJjb25zdHJ1Y3RvclwiXTtcbiAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBsZW5ndGg7XG4gICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSAnZnVuY3Rpb24nICYmIGlzSG9zdFR5cGUob2JqZWN0LCAnaGFzT3duUHJvcGVydHknKSA/IG9iamVjdC5oYXNPd25Qcm9wZXJ0eSA6IGlzUHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbiAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAyKSB7XG4gICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4gICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgLy8gZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBpc0NvbnN0cnVjdG9yO1xuICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuICAgICAgICAgIC8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCAocHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKSkge1xuICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JFYWNoKG9iamVjdCwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4gICAgLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbiAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbiAgICAvLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgIGlmICghaGFzKFwianNvbi1zdHJpbmdpZnlcIikpIHtcbiAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgOTI6IFwiXFxcXFxcXFxcIixcbiAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgIDEyOiBcIlxcXFxmXCIsXG4gICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgIDk6IFwiXFxcXHRcIlxuICAgICAgfTtcblxuICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAvLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxuICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4gICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgIC8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgIHZhciBxdW90ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJ1wiJywgaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsIGlzTGFyZ2UgPSBsZW5ndGggPiAxMCAmJiBjaGFySW5kZXhCdWdneSwgc3ltYm9scztcbiAgICAgICAgaWYgKGlzTGFyZ2UpIHtcbiAgICAgICAgICBzeW1ib2xzID0gdmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgdmFyIGNoYXJDb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3JcbiAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgODogY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEyOiBjYXNlIDEzOiBjYXNlIDM0OiBjYXNlIDkyOlxuICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0ICs9IGlzTGFyZ2UgPyBzeW1ib2xzW2luZGV4XSA6IGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KGluZGV4KSA6IHZhbHVlW2luZGV4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdCArICdcIic7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAvLyBgU3RyKGtleSwgaG9sZGVyKWAsIGBKTyh2YWx1ZSlgLCBhbmQgYEpBKHZhbHVlKWAgb3BlcmF0aW9ucy5cbiAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldLCBjbGFzc05hbWUsIHllYXIsIG1vbnRoLCBkYXRlLCB0aW1lLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzLCByZXN1bHRzLCBlbGVtZW50LCBpbmRleCwgbGVuZ3RoLCBwcmVmaXgsIGhhc01lbWJlcnMsIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBOZWNlc3NhcnkgZm9yIGhvc3Qgb2JqZWN0IHN1cHBvcnQuXG4gICAgICAgICAgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO1xuICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gZGF0ZUNsYXNzICYmICFpc1Byb3BlcnR5LmNhbGwodmFsdWUsIFwidG9KU09OXCIpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCkge1xuICAgICAgICAgICAgICAvLyBEYXRlcyBhcmUgc2VyaWFsaXplZCBhY2NvcmRpbmcgdG8gdGhlIGBEYXRlI3RvSlNPTmAgbWV0aG9kXG4gICAgICAgICAgICAgIC8vIHNwZWNpZmllZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS45LjUuNDQuIFNlZSBzZWN0aW9uIDE1LjkuMS4xNVxuICAgICAgICAgICAgICAvLyBmb3IgdGhlIElTTyA4NjAxIGRhdGUgdGltZSBzdHJpbmcgZm9ybWF0LlxuICAgICAgICAgICAgICBpZiAoZ2V0RGF5KSB7XG4gICAgICAgICAgICAgICAgLy8gTWFudWFsbHkgY29tcHV0ZSB0aGUgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLFxuICAgICAgICAgICAgICAgIC8vIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgaWYgdGhlIGBnZXRVVEMqYCBtZXRob2RzIGFyZVxuICAgICAgICAgICAgICAgIC8vIGJ1Z2d5LiBBZGFwdGVkIGZyb20gQFlhZmZsZSdzIGBkYXRlLXNoaW1gIHByb2plY3QuXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGZsb29yKHZhbHVlIC8gODY0ZTUpO1xuICAgICAgICAgICAgICAgIGZvciAoeWVhciA9IGZsb29yKGRhdGUgLyAzNjUuMjQyNSkgKyAxOTcwIC0gMTsgZ2V0RGF5KHllYXIgKyAxLCAwKSA8PSBkYXRlOyB5ZWFyKyspO1xuICAgICAgICAgICAgICAgIGZvciAobW9udGggPSBmbG9vcigoZGF0ZSAtIGdldERheSh5ZWFyLCAwKSkgLyAzMC40Mik7IGdldERheSh5ZWFyLCBtb250aCArIDEpIDw9IGRhdGU7IG1vbnRoKyspO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAxICsgZGF0ZSAtIGdldERheSh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGB0aW1lYCB2YWx1ZSBzcGVjaWZpZXMgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkgKHNlZSBFU1xuICAgICAgICAgICAgICAgIC8vIDUuMSBzZWN0aW9uIDE1LjkuMS4yKS4gVGhlIGZvcm11bGEgYChBICUgQiArIEIpICUgQmAgaXMgdXNlZFxuICAgICAgICAgICAgICAgIC8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4gICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZCB0byB0aGUgYG1vZHVsb2Agb3BlcmF0aW9uIGZvciBuZWdhdGl2ZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgIHRpbWUgPSAodmFsdWUgJSA4NjRlNSArIDg2NGU1KSAlIDg2NGU1O1xuICAgICAgICAgICAgICAgIC8vIFRoZSBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBhcmUgb2J0YWluZWQgYnlcbiAgICAgICAgICAgICAgICAvLyBkZWNvbXBvc2luZyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheS4gU2VlIHNlY3Rpb24gMTUuOS4xLjEwLlxuICAgICAgICAgICAgICAgIGhvdXJzID0gZmxvb3IodGltZSAvIDM2ZTUpICUgMjQ7XG4gICAgICAgICAgICAgICAgbWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7XG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7XG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gdGltZSAlIDFlMztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICBtb250aCA9IHZhbHVlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHZhbHVlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgICAgICBob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgICAgICAgbWludXRlcyA9IHZhbHVlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gdmFsdWUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgIHZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlNCA/ICh5ZWFyIDwgMCA/IFwiLVwiIDogXCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNiwgeWVhciA8IDAgPyAteWVhciA6IHllYXIpIDogdG9QYWRkZWRTdHJpbmcoNCwgeWVhcikpICtcbiAgICAgICAgICAgICAgICBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1vbnRoICsgMSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIGRhdGUpICtcbiAgICAgICAgICAgICAgICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4gICAgICAgICAgICAgICAgLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG4gICAgICAgICAgICAgICAgXCJUXCIgKyB0b1BhZGRlZFN0cmluZygyLCBob3VycykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1pbnV0ZXMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLCBzZWNvbmRzKSArXG4gICAgICAgICAgICAgICAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLCBtaWxsaXNlY29uZHMpICsgXCJaXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUudG9KU09OID09IFwiZnVuY3Rpb25cIiAmJiAoKGNsYXNzTmFtZSAhPSBudW1iZXJDbGFzcyAmJiBjbGFzc05hbWUgIT0gc3RyaW5nQ2xhc3MgJiYgY2xhc3NOYW1lICE9IGFycmF5Q2xhc3MpIHx8IGlzUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJ0b0pTT05cIikpKSB7XG4gICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbiAgICAgICAgICAgIC8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbiAgICAgICAgICAgIC8vIGlnbm9yZXMgYWxsIGB0b0pTT05gIG1ldGhvZHMgb24gdGhlc2Ugb2JqZWN0cyB1bmxlc3MgdGhleSBhcmVcbiAgICAgICAgICAgIC8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIC8vIElmIGEgcmVwbGFjZW1lbnQgZnVuY3Rpb24gd2FzIHByb3ZpZGVkLCBjYWxsIGl0IHRvIG9idGFpbiB0aGUgdmFsdWVcbiAgICAgICAgICAvLyBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpIHtcbiAgICAgICAgICAvLyBCb29sZWFucyBhcmUgcmVwcmVzZW50ZWQgbGl0ZXJhbGx5LlxuICAgICAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBgSW5maW5pdHlgIGFuZCBgTmFOYCBhcmUgc2VyaWFsaXplZCBhc1xuICAgICAgICAgIC8vIGBcIm51bGxcImAuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAvLyBTdHJpbmdzIGFyZSBkb3VibGUtcXVvdGVkIGFuZCBlc2NhcGVkLlxuICAgICAgICAgIHJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4gICAgICAgICAgLy8gaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICBmb3IgKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICBpZiAoc3RhY2tbbGVuZ3RoXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgLy8gQ3ljbGljIHN0cnVjdHVyZXMgY2Fubm90IGJlIHNlcmlhbGl6ZWQgYnkgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxuICAgICAgICAgIHByZWZpeCA9IGluZGVudGF0aW9uO1xuICAgICAgICAgIGluZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7XG4gICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpLCBpbmRleCsrKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IGhhc01lbWJlcnMgPyAod2hpdGVzcGFjZSA/IFwiW1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJdXCIgOiAoXCJbXCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJdXCIpKSA6IFwiW11cIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4gICAgICAgICAgICAvLyBlaXRoZXIgYSB1c2VyLXNwZWNpZmllZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzLCBvciB0aGUgb2JqZWN0XG4gICAgICAgICAgICAvLyBpdHNlbGYuXG4gICAgICAgICAgICBmb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHNlcmlhbGl6ZShwcm9wZXJ0eSwgdmFsdWUsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBpbmRlbnRhdGlvbiwgc3RhY2spO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbiAgICAgICAgICAgICAgICAvLyBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgbGV0IGBtZW1iZXJgIHtxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIn1cbiAgICAgICAgICAgICAgICAvLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4gICAgICAgICAgICAgICAgLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2VcbiAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXIsIG5vdCB0aGUgYHNwYWNlYCB7d2lkdGh9IGFyZ3VtZW50IHByb3ZpZGVkIHRvXG4gICAgICAgICAgICAgICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZSA/IFwiIFwiIDogXCJcIikgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhc01lbWJlcnMgPyAod2hpdGVzcGFjZSA/IFwie1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJ9XCIgOiAoXCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCIpKSA6IFwie31cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBQdWJsaWM6IGBKU09OLnN0cmluZ2lmeWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgSlNPTjMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHNvdXJjZSwgZmlsdGVyLCB3aWR0aCkge1xuICAgICAgICB2YXIgd2hpdGVzcGFjZSwgY2FsbGJhY2ssIHByb3BlcnRpZXM7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyID09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgZmlsdGVyID09IFwib2JqZWN0XCIgJiYgZmlsdGVyKSB7XG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwoZmlsdGVyKSA9PSBmdW5jdGlvbkNsYXNzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGZpbHRlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdldENsYXNzLmNhbGwoZmlsdGVyKSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBwcm9wZXJ0eSBuYW1lcyBhcnJheSBpbnRvIGEgbWFrZXNoaWZ0IHNldC5cbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOyB2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwgKChnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdDbGFzcyB8fCBnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBudW1iZXJDbGFzcykgJiYgKHByb3BlcnRpZXNbdmFsdWVdID0gMSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwod2lkdGgpID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAvLyBgd2lkdGhgIG51bWJlciBvZiBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgaWYgKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCkge1xuICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChnZXRDbGFzcy5jYWxsKHdpZHRoKSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgICAgd2hpdGVzcGFjZSA9IHdpZHRoLmxlbmd0aCA8PSAxMCA/IHdpZHRoIDogd2lkdGguc2xpY2UoMCwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgZGlzY2FyZHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZW1wdHkgc3RyaW5nIGtleXNcbiAgICAgICAgLy8gKGBcIlwiYCkgb25seSBpZiB0aGV5IGFyZSB1c2VkIGRpcmVjdGx5IHdpdGhpbiBhbiBvYmplY3QgbWVtYmVyIGxpc3RcbiAgICAgICAgLy8gKGUuZy4sIGAhKFwiXCIgaW4geyBcIlwiOiAxfSlgKS5cbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShcIlwiLCAodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSBzb3VyY2UsIHZhbHVlKSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIFwiXCIsIFtdKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUHVibGljOiBQYXJzZXMgYSBKU09OIHNvdXJjZSBzdHJpbmcuXG4gICAgaWYgKCFoYXMoXCJqc29uLXBhcnNlXCIpKSB7XG4gICAgICB2YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuICAgICAgLy8gSW50ZXJuYWw6IEEgbWFwIG9mIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciB1bmVzY2FwZWRcbiAgICAgIC8vIGVxdWl2YWxlbnRzLlxuICAgICAgdmFyIFVuZXNjYXBlcyA9IHtcbiAgICAgICAgOTI6IFwiXFxcXFwiLFxuICAgICAgICAzNDogJ1wiJyxcbiAgICAgICAgNDc6IFwiL1wiLFxuICAgICAgICA5ODogXCJcXGJcIixcbiAgICAgICAgMTE2OiBcIlxcdFwiLFxuICAgICAgICAxMTA6IFwiXFxuXCIsXG4gICAgICAgIDEwMjogXCJcXGZcIixcbiAgICAgICAgMTE0OiBcIlxcclwiXG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogU3RvcmVzIHRoZSBwYXJzZXIgc3RhdGUuXG4gICAgICB2YXIgSW5kZXgsIFNvdXJjZTtcblxuICAgICAgLy8gSW50ZXJuYWw6IFJlc2V0cyB0aGUgcGFyc2VyIHN0YXRlIGFuZCB0aHJvd3MgYSBgU3ludGF4RXJyb3JgLlxuICAgICAgdmFyIGFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBSZXR1cm5zIHRoZSBuZXh0IHRva2VuLCBvciBgXCIkXCJgIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWRcbiAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuICAgICAgLy8gbGl0ZXJhbCwgb3IgQm9vbGVhbiBsaXRlcmFsLlxuICAgICAgdmFyIGxleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFNvdXJjZSwgbGVuZ3RoID0gc291cmNlLmxlbmd0aCwgdmFsdWUsIGJlZ2luLCBwb3NpdGlvbiwgaXNTaWduZWQsIGNoYXJDb2RlO1xuICAgICAgICB3aGlsZSAoSW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDk6IGNhc2UgMTA6IGNhc2UgMTM6IGNhc2UgMzI6XG4gICAgICAgICAgICAgIC8vIFNraXAgd2hpdGVzcGFjZSB0b2tlbnMsIGluY2x1ZGluZyB0YWJzLCBjYXJyaWFnZSByZXR1cm5zLCBsaW5lXG4gICAgICAgICAgICAgIC8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyMzogY2FzZSAxMjU6IGNhc2UgOTE6IGNhc2UgOTM6IGNhc2UgNTg6IGNhc2UgNDQ6XG4gICAgICAgICAgICAgIC8vIFBhcnNlIGEgcHVuY3R1YXRvciB0b2tlbiAoYHtgLCBgfWAsIGBbYCwgYF1gLCBgOmAsIG9yIGAsYCkgYXRcbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgIC8vIGBcImAgZGVsaW1pdHMgYSBKU09OIHN0cmluZzsgYWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kXG4gICAgICAgICAgICAgIC8vIGJlZ2luIHBhcnNpbmcgdGhlIHN0cmluZy4gU3RyaW5nIHRva2VucyBhcmUgcHJlZml4ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgIC8vIGVuZC1vZi1zdHJpbmcgdG9rZW5zLlxuICAgICAgICAgICAgICBmb3IgKHZhbHVlID0gXCJAXCIsIEluZGV4Kys7IEluZGV4IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDMyKSB7XG4gICAgICAgICAgICAgICAgICAvLyBVbmVzY2FwZWQgQVNDSUkgY29udHJvbCBjaGFyYWN0ZXJzICh0aG9zZSB3aXRoIGEgY29kZSB1bml0XG4gICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gOTIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnRyb2wgY2hhcmFjdGVyIChpbmNsdWRpbmcgYFwiYCwgYFxcYCwgYW5kIGAvYCkgb3IgVW5pY29kZVxuICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5MjogY2FzZSAzNDogY2FzZSA0NzogY2FzZSA5ODogY2FzZSAxMTY6IGNhc2UgMTEwOiBjYXNlIDEwMjogY2FzZSAxMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IFVuZXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTc6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gYFxcdWAgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCBjb2RlIHBvaW50LlxuICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gKytJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXggKyA0OyBJbmRleCA8IHBvc2l0aW9uOyBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgdmFsaWQgc2VxdWVuY2UgY29tcHJpc2VzIGZvdXIgaGV4ZGlnaXRzIChjYXNlLVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3IHx8IGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEwMiB8fCBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA3MCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBmcm9tQ2hhckNvZGUoXCIweFwiICsgc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSAzNCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICBiZWdpbiA9IEluZGV4O1xuICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaGFyQ29kZSA+PSAzMiAmJiBjaGFyQ29kZSAhPSA5MiAmJiBjaGFyQ29kZSAhPSAzNCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzdHJpbmcgYXMtaXMuXG4gICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSAzNCkge1xuICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFVudGVybWluYXRlZCBzdHJpbmcuXG4gICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAvLyBQYXJzZSBudW1iZXJzIGFuZCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBQYXJzZSBhbiBpbnRlZ2VyIG9yIGZsb2F0aW5nLXBvaW50IHZhbHVlLlxuICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICAgICAgICAvLyBMZWFkaW5nIHplcm9lcyBhcmUgaW50ZXJwcmV0ZWQgYXMgb2N0YWwgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ4ICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDEpKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBpbnRlZ2VyIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICBmb3IgKDsgSW5kZXggPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgSW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBpcyBhbHJlYWR5IGFjY291bnRlZCBmb3IgYnkgdGhlIHBhcnNlci5cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDQ2KSB7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZGVjaW1hbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICBmb3IgKDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCB0cmFpbGluZyBkZWNpbWFsLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuICAgICAgICAgICAgICAgIC8vIGNhc2UtaW5zZW5zaXRpdmUuXG4gICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSkge1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgIC8vIFNraXAgcGFzdCB0aGUgc2lnbiBmb2xsb3dpbmcgdGhlIGV4cG9uZW50LCBpZiBvbmUgaXNcbiAgICAgICAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0MyB8fCBjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGV4cG9uZW50aWFsIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCBlbXB0eSBleHBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG4gICAgICAgICAgICAgICAgcmV0dXJuICtzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuICAgICAgICAgICAgICBpZiAoaXNTaWduZWQpIHtcbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDUpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbnRpbmVsIGAkYCBjaGFyYWN0ZXIgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIC8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxuICAgICAgICByZXR1cm4gXCIkXCI7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUGFyc2VzIGEgSlNPTiBgdmFsdWVgIHRva2VuLlxuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0cywgaGFzTWVtYmVycztcbiAgICAgICAgaWYgKHZhbHVlID09IFwiJFwiKSB7XG4gICAgICAgICAgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG4gICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBpZiAoKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pID09IFwiQFwiKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFBhcnNlIG9iamVjdCBhbmQgYXJyYXkgbGl0ZXJhbHMuXG4gICAgICAgICAgaWYgKHZhbHVlID09IFwiW1wiKSB7XG4gICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIGFycmF5LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBhcnJheS5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgIC8vIEEgY2xvc2luZyBzcXVhcmUgYnJhY2tldCBtYXJrcyB0aGUgZW5kIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdGluZyB0aGUgcHJldmlvdXMgZWxlbWVudCBmcm9tIHRoZVxuICAgICAgICAgICAgICAvLyBuZXh0LlxuICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggYXJyYXkgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZ2V0KHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IFwie1wiKSB7XG4gICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIG9iamVjdCwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgZm9yICg7OyBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJZiB0aGUgb2JqZWN0IGxpdGVyYWwgY29udGFpbnMgbWVtYmVycywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdG9yLlxuICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBvYmplY3QgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIG9iamVjdCBtZW1iZXIuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbiAgICAgICAgICAgICAgLy8gZG91YmxlLXF1b3RlZCBzdHJpbmdzLCBhbmQgYSBgOmAgbXVzdCBzZXBhcmF0ZSBlYWNoIHByb3BlcnR5XG4gICAgICAgICAgICAgIC8vIG5hbWUgYW5kIHZhbHVlLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVW5leHBlY3RlZCB0b2tlbiBlbmNvdW50ZXJlZC5cbiAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG4gICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB3YWxrKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmKSB7XG4gICAgICAgICAgZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuICAgICAgLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgIC8vIGBXYWxrKGhvbGRlciwgbmFtZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIChzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldLCBsZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgIC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbiAgICAgICAgICAvLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbiAgICAgICAgICAvLyBmb3IgYXJyYXkgaW5kaWNlcyAoZS5nLiwgYCFbMSwgMiwgM10uaGFzT3duUHJvcGVydHkoXCIwXCIpYCkuXG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwodmFsdWUpID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgIGZvciAobGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgdXBkYXRlKHZhbHVlLCBsZW5ndGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBQdWJsaWM6IGBKU09OLnBhcnNlYC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICBKU09OMy5wYXJzZSA9IGZ1bmN0aW9uIChzb3VyY2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHQsIHZhbHVlO1xuICAgICAgICBJbmRleCA9IDA7XG4gICAgICAgIFNvdXJjZSA9IFwiXCIgKyBzb3VyY2U7XG4gICAgICAgIHJlc3VsdCA9IGdldChsZXgoKSk7XG4gICAgICAgIC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuICAgICAgICBpZiAobGV4KCkgIT0gXCIkXCIpIHtcbiAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IHRoZSBwYXJzZXIgc3RhdGUuXG4gICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3MgPyB3YWxrKCh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHJlc3VsdCwgdmFsdWUpLCBcIlwiLCBjYWxsYmFjaykgOiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuICBpZiAoaXNMb2FkZXIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEpTT04zO1xuICAgIH0pO1xuICB9XG59KHRoaXMpKTtcbiJdfQ==
;