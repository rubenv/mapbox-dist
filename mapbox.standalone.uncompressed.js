;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
module.exports={
  "author": {
    "name": "MapBox"
  },
  "name": "mapbox.js",
  "description": "mapbox javascript api",
  "version": "1.3.1",
  "homepage": "http://mapbox.com/",
  "repository": {
    "type": "git",
    "url": "git://github.com/mapbox/mapbox.js.git"
  },
  "main": "index.js",
  "dependencies": {
    "leaflet": "0.6.2",
    "mustache": "~0.7.2",
    "corslite": "0.0.3",
    "json3": "~3.2.5"
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
    "happen": "~0.1.2",
    "browserify": "~2.22.0"
  },
  "optionalDependencies": {},
  "engines": {
    "node": "*"
  },
  "readme": "# mapbox.js\n\n[![Build Status](https://travis-ci.org/mapbox/mapbox.js.png?branch=v1)](https://travis-ci.org/mapbox/mapbox.js)\n\nThis is the MapBox Javascript API, version 1.x. It's built as a [Leaflet](http://leafletjs.com/)\nplugin. You can [read about its launch](http://mapbox.com/blog/mapbox-js-with-leaflet/).\n\n## [API](http://mapbox.com/mapbox.js/api/)\n\nManaged as Markdown in `API.md`, following the standards in `DOCUMENTING.md`\n\n## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)\n\n## Building\n\n    git clone https://github.com/mapbox/mapbox.js.git\n    npm install\n    make\n\nThis project uses [browserify](https://github.com/substack/node-browserify) to combine\ndependencies and installs a local copy when you run `npm install`.\n`make` will build the project in `dist/`.\n\n### Tests\n\nTest with [phantomjs](http://phantomjs.org/):\n\n    npm test\n\nTo test in a browser, run a [local development server](https://gist.github.com/tmcw/4989751)\nand go to `/test`.\n\n### Version v0.x.x\n\n[Version v0.x.x can be accessed in the old master branch.](https://github.com/mapbox/mapbox.js/tree/master).\n",
  "readmeFilename": "README.md",
  "bugs": {
    "url": "https://github.com/mapbox/mapbox.js/issues"
  },
  "_id": "mapbox.js@1.3.1",
  "_from": "mapbox.js@1.3.1"
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
    sanitize: require('./src/sanitize'),
    template: require('mustache').to_html
};

},{"./package.json":1,"./src/config":2,"./src/geocoder":4,"./src/geocoder_control":9,"./src/grid_control":10,"./src/grid_layer":11,"./src/legend_control":8,"./src/map":13,"./src/marker":5,"./src/marker_layer":12,"./src/sanitize":14,"./src/share_control":7,"./src/tile_layer":6,"mustache":15}],14:[function(require,module,exports){
'use strict';

var html_sanitize = require('../ext/sanitizer/html-sanitizer-bundle.js');

// https://bugzilla.mozilla.org/show_bug.cgi?id=255107
function cleanUrl(url) {
    if (/^https?/.test(url.getScheme())) return url.toString();
    if ('data' == url.getScheme() && /^image/.test(url.getPath())) {
        return url.toString();
    }
}

function cleanId(id) {
    return id;
}

module.exports = function(_) {
    if (!_) return '';
    return html_sanitize(_, cleanUrl, cleanId);
};

},{"../ext/sanitizer/html-sanitizer-bundle.js":16}],15:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    module.exports = factory; // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(factory); // AMD
  } else {
    root.Mustache = factory; // <script>
  }
}(this, (function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.2";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  function escapeRe(string) {
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

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

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
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
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
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var fn = compileTokens(tokens);
    var self = this;

    return function (view, partials) {
      if (partials) {
        if (typeof partials === "function") {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return fn(self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  Writer.prototype._section = function (name, context, text, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(this, context.push(value[i]));
        }

        return buffer;
      }

      return value ? callback(this, context.push(value)) : "";
    case "function":
      var self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };

      var result = value.call(context.view, text, scopedRender);
      return result != null ? result : "";
    default:
      if (value) {
        return callback(this, context);
      }
    }

    return "";
  };

  Writer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0)) {
      return callback(this, context);
    }

    return "";
  };

  Writer.prototype._partial = function (name, context) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    var fn = this._partialCache[name];

    return fn ? fn(context) : "";
  };

  Writer.prototype._name = function (name, context) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    return (value == null) ? "" : String(value);
  };

  Writer.prototype._escaped = function (name, context) {
    return exports.escape(this._name(name, context));
  };

  /**
   * Low-level function that compiles the given `tokens` into a function
   * that accepts three arguments: a Writer, a Context, and the template.
   */
  function compileTokens(tokens) {
    var subRenders = {};

    function subRender(i, tokens, template) {
      if (!subRenders[i]) {
        var fn = compileTokens(tokens);
        subRenders[i] = function (writer, context) {
          return fn(writer, context, template);
        };
      }

      return subRenders[i];
    }

    return function (writer, context, template) {
      var buffer = "";
      var token, sectionText;

      for (var i = 0, len = tokens.length; i < len; ++i) {
        token = tokens[i];

        switch (token[0]) {
        case "#":
          sectionText = template.slice(token[3], token[5]);
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;
        case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;
        case ">":
          buffer += writer._partial(token[1], context);
          break;
        case "&":
          buffer += writer._name(token[1], context);
          break;
        case "name":
          buffer += writer._escaped(token[1], context);
          break;
        case "text":
          buffer += token[1];
          break;
        }
      }

      return buffer;
    };
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
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        lastToken = token;
        squashedTokens.push(token);
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  exports.parse = function (template, tags) {
    template = template || '';
    tags = tags || exports.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags.join(', '));
    }

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
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr;
    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      start = scanner.pos;

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      // Check section nesting.
      if (type === '/') {
        if (sections.length === 0) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }

        var section = sections.pop();

        if (section[1] !== value) {
          throw new Error('Unclosed section "' + section[1] + '" at ' + start);
        }
      }

      var token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      } else if (type === "=") {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);

        if (tags.length !== 2) {
          throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        }

        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    var section = sections.pop();
    if (section) {
      throw new Error('Unclosed section "' + section[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  };

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default writer.
  var _writer = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));

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

},{"./request":19,"./url":18,"./util":17}],5:[function(require,module,exports){
'use strict';

var url = require('./url'),
    sanitize = require('./sanitize');

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
        title: f.properties.title
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

},{"./sanitize":14,"./url":18}],6:[function(require,module,exports){
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

    // disable the setUrl function, which is not available on mapbox tilelayers
    setUrl: null,

    _setTileJSON: function(json) {
        util.strict(json, 'object');

        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
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
            index = Math.abs(tilePoint.x + tilePoint.y) % tiles.length,
            url = tiles[index];

        var templated = L.Util.template(url, tilePoint);
        if (!templated) return templated;
        else return templated.replace('.png', '.' + this.options.format);
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

},{"./load_tilejson":20,"./url":18,"./util":17}],7:[function(require,module,exports){
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

        L.DomEvent.addListener(link, 'click', this._share, this);
        L.DomEvent.disableClickPropagation(container);

        // Close any open popups


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

    _share: function(e) {
        L.DomEvent.stop(e);

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

},{"./load_tilejson":20}],8:[function(require,module,exports){
'use strict';

var LegendControl = L.Control.extend({

    options: {
        position: 'bottomright',
        sanitizer: require('./sanitize')
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

},{"./sanitize":14}],9:[function(require,module,exports){
'use strict';

var geocoder = require('./geocoder');

var GeocoderControl = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'topleft'
    },

    initialize: function(_) {
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
        if (L.DomUtil.hasClass(this._container, 'active')) {
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

        L.DomEvent.addListener(link, 'click', this._toggle, this);
        L.DomEvent.addListener(form, 'submit', this._geocode, this);
        L.DomEvent.disableClickPropagation(container);

        this._map = map;
        this._results = results;
        this._input = input;
        this._form = form;

        this._map.on('click', this._closeIfOpen, this);

        return container;
    },

    _geocode: function(e) {
        L.DomEvent.preventDefault(e);
        L.DomUtil.addClass(this._container, 'searching');
        var map = this._map;
        this.geocoder.query(this._input.value, L.bind(function(err, resp) {
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
                            resp.results[i][j].name && name.push(resp.results[i][j].name);
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
        }, this));
    }
});

module.exports = function(options) {
    return new GeocoderControl(options);
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
            point = map.project(latlng),
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

},{"./grid":21,"./load_tilejson":20,"./request":19,"./url":18,"./util":17}],12:[function(require,module,exports){
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
        sanitizer: require('./sanitize')
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
        url = urlhelper.jsonify(url);
        request(url, L.bind(function(err, json) {
            if (err) {
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

},{"./marker":5,"./request":19,"./sanitize":14,"./url":18,"./util":17}],13:[function(require,module,exports){
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

},{"./grid_control":10,"./grid_layer":11,"./legend_control":8,"./load_tilejson":20,"./marker_layer":12,"./tile_layer":6,"./util":17}],16:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./config":2}],20:[function(require,module,exports){
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

},{"./request":19,"./url":18,"./util":17}],10:[function(require,module,exports){
'use strict';

var util = require('./util'),
    Mustache = require('mustache');

var GridControl = L.Control.extend({

    options: {
        pinnable: true,
        follow: false,
        sanitizer: require('./sanitize'),
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

},{"./sanitize":14,"./util":17,"mustache":15}],19:[function(require,module,exports){
'use strict';

var corslite = require('corslite'),
    JSON3 = require('json3'),
    strict = require('./util').strict;

module.exports = function(url, callback) {
    strict(url, 'string');
    strict(callback, 'function');
    corslite(url, function(err, resp) {
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
    });
};

},{"./util":17,"corslite":22,"json3":23}],22:[function(require,module,exports){
function xhr(url, callback, cors) {

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
        callback.call(this, evt, null);
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

    return xhr;
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9wYWNrYWdlLmpzb24iLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvY29uZmlnLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbWFwYm94LmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL3Nhbml0aXplLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvbm9kZV9tb2R1bGVzL211c3RhY2hlL211c3RhY2hlLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2dlb2NvZGVyLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL21hcmtlci5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy90aWxlX2xheWVyLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL3NoYXJlX2NvbnRyb2wuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvbGVnZW5kX2NvbnRyb2wuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvZ2VvY29kZXJfY29udHJvbC5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy9ncmlkX2xheWVyLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL21hcmtlcl9sYXllci5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy9tYXAuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9leHQvc2FuaXRpemVyL2h0bWwtc2FuaXRpemVyLWJ1bmRsZS5qcyIsIi9Vc2Vycy9ydWJlbi9Qcm9qZWN0cy9IYWNrcy9tYXBib3gtZGlzdC9ub2RlX21vZHVsZXMvbWFwYm94LmpzL3NyYy91dGlsLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2dyaWQuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvdXJsLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL2xvYWRfdGlsZWpzb24uanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9zcmMvZ3JpZF9jb250cm9sLmpzIiwiL1VzZXJzL3J1YmVuL1Byb2plY3RzL0hhY2tzL21hcGJveC1kaXN0L25vZGVfbW9kdWxlcy9tYXBib3guanMvc3JjL3JlcXVlc3QuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9ub2RlX21vZHVsZXMvY29yc2xpdGUvY29yc2xpdGUuanMiLCIvVXNlcnMvcnViZW4vUHJvamVjdHMvSGFja3MvbWFwYm94LWRpc3Qvbm9kZV9tb2R1bGVzL21hcGJveC5qcy9ub2RlX21vZHVsZXMvanNvbjMvbGliL2pzb24zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNzRFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwiTWFwQm94XCJcbiAgfSxcbiAgXCJuYW1lXCI6IFwibWFwYm94LmpzXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJtYXBib3ggamF2YXNjcmlwdCBhcGlcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4zLjFcIixcbiAgXCJob21lcGFnZVwiOiBcImh0dHA6Ly9tYXBib3guY29tL1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0Oi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LmpzLmdpdFwiXG4gIH0sXG4gIFwibWFpblwiOiBcImluZGV4LmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImxlYWZsZXRcIjogXCIwLjYuMlwiLFxuICAgIFwibXVzdGFjaGVcIjogXCJ+MC43LjJcIixcbiAgICBcImNvcnNsaXRlXCI6IFwiMC4wLjNcIixcbiAgICBcImpzb24zXCI6IFwifjMuMi41XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcInRlc3RcIjogXCJtb2NoYS1waGFudG9tanMgdGVzdC9pbmRleC5odG1sXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibGVhZmxldC1oYXNoXCI6IFwiZ2l0Oi8vZ2l0aHViLmNvbS9tbGV2YW5zL2xlYWZsZXQtaGFzaC5naXQjYjAzOWEzYWE0ZTI0OTJhNWM3NDQ4MDc1MTcyYWMyNjc2OWU2MDFkNlwiLFxuICAgIFwibGVhZmxldC1mdWxsc2NyZWVuXCI6IFwiMC4wLjBcIixcbiAgICBcInVnbGlmeS1qc1wiOiBcIn4yLjIuNVwiLFxuICAgIFwibW9jaGFcIjogXCJ+MS45XCIsXG4gICAgXCJleHBlY3QuanNcIjogXCJ+MC4yLjBcIixcbiAgICBcInNpbm9uXCI6IFwifjEuNy4zXCIsXG4gICAgXCJtb2NoYS1waGFudG9tanNcIjogXCJ+MS4xLjFcIixcbiAgICBcImhhcHBlblwiOiBcIn4wLjEuMlwiLFxuICAgIFwiYnJvd3NlcmlmeVwiOiBcIn4yLjIyLjBcIlxuICB9LFxuICBcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHt9LFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIipcIlxuICB9LFxuICBcInJlYWRtZVwiOiBcIiMgbWFwYm94LmpzXFxuXFxuWyFbQnVpbGQgU3RhdHVzXShodHRwczovL3RyYXZpcy1jaS5vcmcvbWFwYm94L21hcGJveC5qcy5wbmc/YnJhbmNoPXYxKV0oaHR0cHM6Ly90cmF2aXMtY2kub3JnL21hcGJveC9tYXBib3guanMpXFxuXFxuVGhpcyBpcyB0aGUgTWFwQm94IEphdmFzY3JpcHQgQVBJLCB2ZXJzaW9uIDEueC4gSXQncyBidWlsdCBhcyBhIFtMZWFmbGV0XShodHRwOi8vbGVhZmxldGpzLmNvbS8pXFxucGx1Z2luLiBZb3UgY2FuIFtyZWFkIGFib3V0IGl0cyBsYXVuY2hdKGh0dHA6Ly9tYXBib3guY29tL2Jsb2cvbWFwYm94LWpzLXdpdGgtbGVhZmxldC8pLlxcblxcbiMjIFtBUEldKGh0dHA6Ly9tYXBib3guY29tL21hcGJveC5qcy9hcGkvKVxcblxcbk1hbmFnZWQgYXMgTWFya2Rvd24gaW4gYEFQSS5tZGAsIGZvbGxvd2luZyB0aGUgc3RhbmRhcmRzIGluIGBET0NVTUVOVElORy5tZGBcXG5cXG4jIyBbRXhhbXBsZXNdKGh0dHA6Ly9tYXBib3guY29tL21hcGJveC5qcy9leGFtcGxlL3YxLjAuMC8pXFxuXFxuIyMgQnVpbGRpbmdcXG5cXG4gICAgZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LmpzLmdpdFxcbiAgICBucG0gaW5zdGFsbFxcbiAgICBtYWtlXFxuXFxuVGhpcyBwcm9qZWN0IHVzZXMgW2Jyb3dzZXJpZnldKGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9ub2RlLWJyb3dzZXJpZnkpIHRvIGNvbWJpbmVcXG5kZXBlbmRlbmNpZXMgYW5kIGluc3RhbGxzIGEgbG9jYWwgY29weSB3aGVuIHlvdSBydW4gYG5wbSBpbnN0YWxsYC5cXG5gbWFrZWAgd2lsbCBidWlsZCB0aGUgcHJvamVjdCBpbiBgZGlzdC9gLlxcblxcbiMjIyBUZXN0c1xcblxcblRlc3Qgd2l0aCBbcGhhbnRvbWpzXShodHRwOi8vcGhhbnRvbWpzLm9yZy8pOlxcblxcbiAgICBucG0gdGVzdFxcblxcblRvIHRlc3QgaW4gYSBicm93c2VyLCBydW4gYSBbbG9jYWwgZGV2ZWxvcG1lbnQgc2VydmVyXShodHRwczovL2dpc3QuZ2l0aHViLmNvbS90bWN3LzQ5ODk3NTEpXFxuYW5kIGdvIHRvIGAvdGVzdGAuXFxuXFxuIyMjIFZlcnNpb24gdjAueC54XFxuXFxuW1ZlcnNpb24gdjAueC54IGNhbiBiZSBhY2Nlc3NlZCBpbiB0aGUgb2xkIG1hc3RlciBicmFuY2guXShodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC5qcy90cmVlL21hc3RlcikuXFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LmpzL2lzc3Vlc1wiXG4gIH0sXG4gIFwiX2lkXCI6IFwibWFwYm94LmpzQDEuMy4xXCIsXG4gIFwiX2Zyb21cIjogXCJtYXBib3guanNAMS4zLjFcIlxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIEhUVFBfVVJMUzogW1xuICAgICAgICAnaHR0cDovL2EudGlsZXMubWFwYm94LmNvbS92My8nLFxuICAgICAgICAnaHR0cDovL2IudGlsZXMubWFwYm94LmNvbS92My8nLFxuICAgICAgICAnaHR0cDovL2MudGlsZXMubWFwYm94LmNvbS92My8nLFxuICAgICAgICAnaHR0cDovL2QudGlsZXMubWFwYm94LmNvbS92My8nXSxcblxuICAgIEZPUkNFX0hUVFBTOiBmYWxzZSxcblxuICAgIEhUVFBTX1VSTFM6IFtcbiAgICAgICAgJ2h0dHBzOi8vYS50aWxlcy5tYXBib3guY29tL3YzLycsXG4gICAgICAgICdodHRwczovL2IudGlsZXMubWFwYm94LmNvbS92My8nLFxuICAgICAgICAnaHR0cHM6Ly9jLnRpbGVzLm1hcGJveC5jb20vdjMvJyxcbiAgICAgICAgJ2h0dHBzOi8vZC50aWxlcy5tYXBib3guY29tL3YzLyddXG59O1xuIiwiLy8gSGFyZGNvZGUgaW1hZ2UgcGF0aCwgYmVjYXVzZSBMZWFmbGV0J3MgYXV0b2RldGVjdGlvblxuLy8gZmFpbHMsIGJlY2F1c2UgbWFwYm94LmpzIGlzIG5vdCBuYW1lZCBsZWFmbGV0LmpzXG53aW5kb3cuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gJy8vYXBpLnRpbGVzLm1hcGJveC5jb20vbWFwYm94LmpzLycgKyAndicgK1xuICAgIHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJykudmVyc2lvbiArICcvaW1hZ2VzJztcblxuTC5tYXBib3ggPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBWRVJTSU9OOiByZXF1aXJlKCcuL3BhY2thZ2UuanNvbicpLnZlcnNpb24sXG4gICAgZ2VvY29kZXI6IHJlcXVpcmUoJy4vc3JjL2dlb2NvZGVyJyksXG4gICAgbWFya2VyOiByZXF1aXJlKCcuL3NyYy9tYXJrZXInKSxcbiAgICB0aWxlTGF5ZXI6IHJlcXVpcmUoJy4vc3JjL3RpbGVfbGF5ZXInKSxcbiAgICBzaGFyZUNvbnRyb2w6IHJlcXVpcmUoJy4vc3JjL3NoYXJlX2NvbnRyb2wnKSxcbiAgICBsZWdlbmRDb250cm9sOiByZXF1aXJlKCcuL3NyYy9sZWdlbmRfY29udHJvbCcpLFxuICAgIGdlb2NvZGVyQ29udHJvbDogcmVxdWlyZSgnLi9zcmMvZ2VvY29kZXJfY29udHJvbCcpLFxuICAgIGdyaWRDb250cm9sOiByZXF1aXJlKCcuL3NyYy9ncmlkX2NvbnRyb2wnKSxcbiAgICBncmlkTGF5ZXI6IHJlcXVpcmUoJy4vc3JjL2dyaWRfbGF5ZXInKSxcbiAgICBtYXJrZXJMYXllcjogcmVxdWlyZSgnLi9zcmMvbWFya2VyX2xheWVyJyksXG4gICAgbWFwOiByZXF1aXJlKCcuL3NyYy9tYXAnKSxcbiAgICBjb25maWc6IHJlcXVpcmUoJy4vc3JjL2NvbmZpZycpLFxuICAgIHNhbml0aXplOiByZXF1aXJlKCcuL3NyYy9zYW5pdGl6ZScpLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCdtdXN0YWNoZScpLnRvX2h0bWxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBodG1sX3Nhbml0aXplID0gcmVxdWlyZSgnLi4vZXh0L3Nhbml0aXplci9odG1sLXNhbml0aXplci1idW5kbGUuanMnKTtcblxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjU1MTA3XG5mdW5jdGlvbiBjbGVhblVybCh1cmwpIHtcbiAgICBpZiAoL15odHRwcz8vLnRlc3QodXJsLmdldFNjaGVtZSgpKSkgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIGlmICgnZGF0YScgPT0gdXJsLmdldFNjaGVtZSgpICYmIC9eaW1hZ2UvLnRlc3QodXJsLmdldFBhdGgoKSkpIHtcbiAgICAgICAgcmV0dXJuIHVybC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5JZChpZCkge1xuICAgIHJldHVybiBpZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfKSB7XG4gICAgaWYgKCFfKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGh0bWxfc2FuaXRpemUoXywgY2xlYW5VcmwsIGNsZWFuSWQpO1xufTtcbiIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKi9cblxuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgJiYgZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmYWN0b3J5KTsgLy8gQU1EXG4gIH0gZWxzZSB7XG4gICAgcm9vdC5NdXN0YWNoZSA9IGZhY3Rvcnk7IC8vIDxzY3JpcHQ+XG4gIH1cbn0odGhpcywgKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZXhwb3J0cyA9IHt9O1xuXG4gIGV4cG9ydHMubmFtZSA9IFwibXVzdGFjaGUuanNcIjtcbiAgZXhwb3J0cy52ZXJzaW9uID0gXCIwLjcuMlwiO1xuICBleHBvcnRzLnRhZ3MgPSBbXCJ7e1wiLCBcIn19XCJdO1xuXG4gIGV4cG9ydHMuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIGV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4gIGV4cG9ydHMuV3JpdGVyID0gV3JpdGVyO1xuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcbiAgdmFyIGVxUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICBmdW5jdGlvbiB0ZXN0UmUocmUsIHN0cmluZykge1xuICAgIHJldHVybiBSZWdFeHAucHJvdG90eXBlLnRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZShub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVSZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCBcIlxcXFwkJlwiKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgIFwiL1wiOiAnJiN4MkY7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIGZ1bmN0aW9uIFNjYW5uZXIoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gXCJcIjtcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmIChtYXRjaCAmJiBtYXRjaC5pbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgcmV0dXJuIG1hdGNoWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gKHJlKSB7XG4gICAgdmFyIG1hdGNoLCBwb3MgPSB0aGlzLnRhaWwuc2VhcmNoKHJlKTtcblxuICAgIHN3aXRjaCAocG9zKSB7XG4gICAgY2FzZSAtMTpcbiAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgdGhpcy5wb3MgKz0gdGhpcy50YWlsLmxlbmd0aDtcbiAgICAgIHRoaXMudGFpbCA9IFwiXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDA6XG4gICAgICBtYXRjaCA9IFwiXCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHBvcyk7XG4gICAgICB0aGlzLnBvcyArPSBwb3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIGZ1bmN0aW9uIENvbnRleHQodmlldywgcGFyZW50KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgfVxuXG4gIENvbnRleHQubWFrZSA9IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgcmV0dXJuICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gIH07XG5cbiAgQ29udGV4dC5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jYWNoZSA9IHt9O1xuICB9O1xuXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAodmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuX2NhY2hlW25hbWVdO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgaWYgKG5hbWUgPT09IFwiLlwiKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy52aWV3O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgICAgaWYgKG5hbWUuaW5kZXhPZihcIi5cIikgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbmFtZXMgPSBuYW1lLnNwbGl0KFwiLlwiKSwgaSA9IDA7XG5cbiAgICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuXG4gICAgICAgICAgICB3aGlsZSAodmFsdWUgJiYgaSA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2krK11dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2xlYXJDYWNoZSgpO1xuICB9XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgdGhpcy5fcGFydGlhbENhY2hlID0ge307XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGZuID0gdGhpcy5fY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKCFmbikge1xuICAgICAgdmFyIHRva2VucyA9IGV4cG9ydHMucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICAgICAgZm4gPSB0aGlzLl9jYWNoZVt0ZW1wbGF0ZV0gPSB0aGlzLmNvbXBpbGVUb2tlbnModG9rZW5zLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuY29tcGlsZVBhcnRpYWwgPSBmdW5jdGlvbiAobmFtZSwgdGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgZm4gPSB0aGlzLmNvbXBpbGUodGVtcGxhdGUsIHRhZ3MpO1xuICAgIHRoaXMuX3BhcnRpYWxDYWNoZVtuYW1lXSA9IGZuO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmNvbXBpbGVUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCB0ZW1wbGF0ZSkge1xuICAgIHZhciBmbiA9IGNvbXBpbGVUb2tlbnModG9rZW5zKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgICBpZiAocGFydGlhbHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFscyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgc2VsZi5fbG9hZFBhcnRpYWwgPSBwYXJ0aWFscztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICBzZWxmLmNvbXBpbGVQYXJ0aWFsKG5hbWUsIHBhcnRpYWxzW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKHNlbGYsIENvbnRleHQubWFrZSh2aWV3KSwgdGVtcGxhdGUpO1xuICAgIH07XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29tcGlsZSh0ZW1wbGF0ZSkodmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuX3NlY3Rpb24gPSBmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgdGV4dCwgY2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cChuYW1lKTtcblxuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBcIlwiO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgIGJ1ZmZlciArPSBjYWxsYmFjayh0aGlzLCBjb250ZXh0LnB1c2godmFsdWVbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZSA/IGNhbGxiYWNrKHRoaXMsIGNvbnRleHQucHVzaCh2YWx1ZSkpIDogXCJcIjtcbiAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBzY29wZWRSZW5kZXIgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZS5jYWxsKGNvbnRleHQudmlldywgdGV4dCwgc2NvcGVkUmVuZGVyKTtcbiAgICAgIHJldHVybiByZXN1bHQgIT0gbnVsbCA/IHJlc3VsdCA6IFwiXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcywgY29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5faW52ZXJ0ZWQgPSBmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cChuYW1lKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5fcGFydGlhbCA9IGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0KSB7XG4gICAgaWYgKCEobmFtZSBpbiB0aGlzLl9wYXJ0aWFsQ2FjaGUpICYmIHRoaXMuX2xvYWRQYXJ0aWFsKSB7XG4gICAgICB0aGlzLmNvbXBpbGVQYXJ0aWFsKG5hbWUsIHRoaXMuX2xvYWRQYXJ0aWFsKG5hbWUpKTtcbiAgICB9XG5cbiAgICB2YXIgZm4gPSB0aGlzLl9wYXJ0aWFsQ2FjaGVbbmFtZV07XG5cbiAgICByZXR1cm4gZm4gPyBmbihjb250ZXh0KSA6IFwiXCI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5fbmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAobmFtZSk7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcpO1xuICAgIH1cblxuICAgIHJldHVybiAodmFsdWUgPT0gbnVsbCkgPyBcIlwiIDogU3RyaW5nKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLl9lc2NhcGVkID0gZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lc2NhcGUodGhpcy5fbmFtZShuYW1lLCBjb250ZXh0KSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBmdW5jdGlvbiB0aGF0IGNvbXBpbGVzIHRoZSBnaXZlbiBgdG9rZW5zYCBpbnRvIGEgZnVuY3Rpb25cbiAgICogdGhhdCBhY2NlcHRzIHRocmVlIGFyZ3VtZW50czogYSBXcml0ZXIsIGEgQ29udGV4dCwgYW5kIHRoZSB0ZW1wbGF0ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBpbGVUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHN1YlJlbmRlcnMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlcihpLCB0b2tlbnMsIHRlbXBsYXRlKSB7XG4gICAgICBpZiAoIXN1YlJlbmRlcnNbaV0pIHtcbiAgICAgICAgdmFyIGZuID0gY29tcGlsZVRva2Vucyh0b2tlbnMpO1xuICAgICAgICBzdWJSZW5kZXJzW2ldID0gZnVuY3Rpb24gKHdyaXRlciwgY29udGV4dCkge1xuICAgICAgICAgIHJldHVybiBmbih3cml0ZXIsIGNvbnRleHQsIHRlbXBsYXRlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YlJlbmRlcnNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh3cml0ZXIsIGNvbnRleHQsIHRlbXBsYXRlKSB7XG4gICAgICB2YXIgYnVmZmVyID0gXCJcIjtcbiAgICAgIHZhciB0b2tlbiwgc2VjdGlvblRleHQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2tlbnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlIFwiI1wiOlxuICAgICAgICAgIHNlY3Rpb25UZXh0ID0gdGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKTtcbiAgICAgICAgICBidWZmZXIgKz0gd3JpdGVyLl9zZWN0aW9uKHRva2VuWzFdLCBjb250ZXh0LCBzZWN0aW9uVGV4dCwgc3ViUmVuZGVyKGksIHRva2VuWzRdLCB0ZW1wbGF0ZSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiXlwiOlxuICAgICAgICAgIGJ1ZmZlciArPSB3cml0ZXIuX2ludmVydGVkKHRva2VuWzFdLCBjb250ZXh0LCBzdWJSZW5kZXIoaSwgdG9rZW5bNF0sIHRlbXBsYXRlKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCI+XCI6XG4gICAgICAgICAgYnVmZmVyICs9IHdyaXRlci5fcGFydGlhbCh0b2tlblsxXSwgY29udGV4dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCImXCI6XG4gICAgICAgICAgYnVmZmVyICs9IHdyaXRlci5fbmFtZSh0b2tlblsxXSwgY29udGV4dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgYnVmZmVyICs9IHdyaXRlci5fZXNjYXBlZCh0b2tlblsxXSwgY29udGV4dCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgYnVmZmVyICs9IHRva2VuWzFdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWZmZXI7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHRyZWUgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gdHJlZTtcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9rZW5zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgIGNhc2UgJyMnOlxuICAgICAgY2FzZSAnXic6XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIHZhciBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogdHJlZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyZWU7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdG9rZW5zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVRhZ3ModGFncykge1xuICAgIHJldHVybiBbXG4gICAgICBuZXcgUmVnRXhwKGVzY2FwZVJlKHRhZ3NbMF0pICsgXCJcXFxccypcIiksXG4gICAgICBuZXcgUmVnRXhwKFwiXFxcXHMqXCIgKyBlc2NhcGVSZSh0YWdzWzFdKSlcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW4gb2JqZWN0cy4gSWZcbiAgICogYHRhZ3NgIGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFtcIjwlXCIsIFwiJT5cIl0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gTXVzdGFjaGUudGFncykuXG4gICAqL1xuICBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZSB8fCAnJztcbiAgICB0YWdzID0gdGFncyB8fCBleHBvcnRzLnRhZ3M7XG5cbiAgICBpZiAodHlwZW9mIHRhZ3MgPT09ICdzdHJpbmcnKSB0YWdzID0gdGFncy5zcGxpdChzcGFjZVJlKTtcbiAgICBpZiAodGFncy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFncy5qb2luKCcsICcpKTtcbiAgICB9XG5cbiAgICB2YXIgdGFnUmVzID0gZXNjYXBlVGFncyh0YWdzKTtcbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgdG9rZW5zLnNwbGljZShzcGFjZXMucG9wKCksIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNocjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKHRhZ1Jlc1swXSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goW1widGV4dFwiLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgaWYgKGNociA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgc3RyaXBTcGFjZSgpOyAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2Nhbih0YWdSZXNbMF0pKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgXCJuYW1lXCI7XG5cbiAgICAgIC8vIFNraXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0YWcgYW5kIHZhbHVlLlxuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBFeHRyYWN0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gXCI9XCIpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbCh0YWdSZXNbMV0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIntcIikge1xuICAgICAgICB2YXIgY2xvc2VSZSA9IG5ldyBSZWdFeHAoXCJcXFxccypcIiArIGVzY2FwZVJlKFwifVwiICsgdGFnc1sxXSkpO1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NlUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKHRhZ1Jlc1sxXSk7XG4gICAgICAgIHR5cGUgPSBcIiZcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwodGFnUmVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4odGFnUmVzWzFdKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIGlmIChzZWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKHNlY3Rpb25bMV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIHNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdG9rZW4gPSBbdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvc107XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIm5hbWVcIiB8fCB0eXBlID09PSBcIntcIiB8fCB0eXBlID09PSBcIiZcIikge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiPVwiKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIHRhZ3MgPSB2YWx1ZS5zcGxpdChzcGFjZVJlKTtcblxuICAgICAgICBpZiAodGFncy5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFncyBhdCAnICsgc3RhcnQgKyAnOiAnICsgdGFncy5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhZ1JlcyA9IGVzY2FwZVRhZ3ModGFncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICB2YXIgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgc2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfTtcblxuICAvLyBUaGUgaGlnaC1sZXZlbCBjbGVhckNhY2hlLCBjb21waWxlLCBjb21waWxlUGFydGlhbCwgYW5kIHJlbmRlciBmdW5jdGlvbnNcbiAgLy8gdXNlIHRoaXMgZGVmYXVsdCB3cml0ZXIuXG4gIHZhciBfd3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgYW5kIHBhcnRpYWxzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIGV4cG9ydHMuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3dyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHRvIGEgcmV1c2FibGUgZnVuY3Rpb24gdXNpbmcgdGhlIGRlZmF1bHRcbiAgICogd3JpdGVyLlxuICAgKi9cbiAgZXhwb3J0cy5jb21waWxlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIF93cml0ZXIuY29tcGlsZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBwYXJ0aWFsIHdpdGggdGhlIGdpdmVuIGBuYW1lYCBhbmQgYHRlbXBsYXRlYCB0byBhIHJldXNhYmxlXG4gICAqIGZ1bmN0aW9uIHVzaW5nIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIGV4cG9ydHMuY29tcGlsZVBhcnRpYWwgPSBmdW5jdGlvbiAobmFtZSwgdGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gX3dyaXRlci5jb21waWxlUGFydGlhbChuYW1lLCB0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBhcnJheSBvZiB0b2tlbnMgKHRoZSBvdXRwdXQgb2YgYSBwYXJzZSkgdG8gYSByZXVzYWJsZVxuICAgKiBmdW5jdGlvbiB1c2luZyB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBleHBvcnRzLmNvbXBpbGVUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCB0ZW1wbGF0ZSkge1xuICAgIHJldHVybiBfd3JpdGVyLmNvbXBpbGVUb2tlbnModG9rZW5zLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIGV4cG9ydHMucmVuZGVyID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHJldHVybiBfd3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC5cbiAgZXhwb3J0cy50b19odG1sID0gZnVuY3Rpb24gKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIHZhciByZXN1bHQgPSBleHBvcnRzLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKHR5cGVvZiBzZW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oKSkpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB1cmxoZWxwZXIgPSByZXF1aXJlKCcuL3VybCcpLFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxuLy8gTG93LWxldmVsIGdlb2NvZGluZyBpbnRlcmZhY2UgLSB3cmFwcyBzcGVjaWZpYyBBUEkgY2FsbHMgYW5kIHRoZWlyXG4vLyByZXR1cm4gdmFsdWVzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfKSB7XG4gICAgdmFyIGdlb2NvZGVyID0ge30sIHVybDtcblxuICAgIGdlb2NvZGVyLmdldFVSTCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIuc2V0VVJMID0gZnVuY3Rpb24oXykge1xuICAgICAgICB1cmwgPSB1cmxoZWxwZXIuanNvbmlmeShfKTtcbiAgICAgICAgcmV0dXJuIGdlb2NvZGVyO1xuICAgIH07XG5cbiAgICBnZW9jb2Rlci5zZXRJRCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgdXRpbC5zdHJpY3QoXywgJ3N0cmluZycpO1xuICAgICAgICBnZW9jb2Rlci5zZXRVUkwodXJsaGVscGVyLmJhc2UoKSArIF8gKyAnL2dlb2NvZGUve3F1ZXJ5fS5qc29uJyk7XG4gICAgICAgIHJldHVybiBnZW9jb2RlcjtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIuc2V0VGlsZUpTT04gPSBmdW5jdGlvbihfKSB7XG4gICAgICAgIHV0aWwuc3RyaWN0KF8sICdvYmplY3QnKTtcbiAgICAgICAgZ2VvY29kZXIuc2V0VVJMKF8uZ2VvY29kZXIpO1xuICAgICAgICByZXR1cm4gZ2VvY29kZXI7XG4gICAgfTtcblxuICAgIGdlb2NvZGVyLnF1ZXJ5VVJMID0gZnVuY3Rpb24oXykge1xuICAgICAgICB1dGlsLnN0cmljdChfLCAnc3RyaW5nJyk7XG4gICAgICAgIGlmICghZ2VvY29kZXIuZ2V0VVJMKCkpIHRocm93IG5ldyBFcnJvcignR2VvY29kaW5nIG1hcCBJRCBub3Qgc2V0Jyk7XG4gICAgICAgIHJldHVybiBMLlV0aWwudGVtcGxhdGUoZ2VvY29kZXIuZ2V0VVJMKCksIHsgcXVlcnk6IGVuY29kZVVSSUNvbXBvbmVudChfKSB9KTtcbiAgICB9O1xuXG4gICAgZ2VvY29kZXIucXVlcnkgPSBmdW5jdGlvbihfLCBjYWxsYmFjaykge1xuICAgICAgICB1dGlsLnN0cmljdChfLCAnc3RyaW5nJyk7XG4gICAgICAgIHV0aWwuc3RyaWN0KGNhbGxiYWNrLCAnZnVuY3Rpb24nKTtcbiAgICAgICAgcmVxdWVzdChnZW9jb2Rlci5xdWVyeVVSTChfKSwgZnVuY3Rpb24oZXJyLCBqc29uKSB7XG4gICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLnJlc3VsdHMgJiYganNvbi5yZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IGpzb24ucmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgbGF0bG5nOiBbanNvbi5yZXN1bHRzWzBdWzBdLmxhdCwganNvbi5yZXN1bHRzWzBdWzBdLmxvbl1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChqc29uLnJlc3VsdHNbMF1bMF0uYm91bmRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmJvdW5kcyA9IGpzb24ucmVzdWx0c1swXVswXS5ib3VuZHM7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5sYm91bmRzID0gdXRpbC5sYm91bmRzKHJlcy5ib3VuZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGNhbGxiYWNrKGVyciB8fCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGdlb2NvZGVyO1xuICAgIH07XG5cbiAgICAvLyBhIHJldmVyc2UgZ2VvY29kZTpcbiAgICAvL1xuICAgIC8vICBnZW9jb2Rlci5yZXZlcnNlUXVlcnkoWzgwLCAyMF0pXG4gICAgZ2VvY29kZXIucmV2ZXJzZVF1ZXJ5ID0gZnVuY3Rpb24oXywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHEgPSAnJztcblxuICAgICAgICBmdW5jdGlvbiBub3JtKHgpIHtcbiAgICAgICAgICAgIGlmICh4LmxhdCAhPT0gdW5kZWZpbmVkICYmIHgubG5nICE9PSB1bmRlZmluZWQpIHJldHVybiB4LmxuZyArICcsJyArIHgubGF0O1xuICAgICAgICAgICAgZWxzZSBpZiAoeC5sYXQgIT09IHVuZGVmaW5lZCAmJiB4LmxvbiAhPT0gdW5kZWZpbmVkKSByZXR1cm4geC5sb24gKyAnLCcgKyB4LmxhdDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHhbMF0gKyAnLCcgKyB4WzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ubGVuZ3RoICYmIF9bMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcHRzID0gW107IGkgPCBfLmxlbmd0aDsgaSsrKSBwdHMucHVzaChub3JtKF9baV0pKTtcbiAgICAgICAgICAgIHEgPSBwdHMuam9pbignOycpO1xuICAgICAgICB9IGVsc2UgcSA9IG5vcm0oXyk7XG5cbiAgICAgICAgcmVxdWVzdChnZW9jb2Rlci5xdWVyeVVSTChxKSwgZnVuY3Rpb24oZXJyLCBqc29uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIGpzb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZ2VvY29kZXI7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKF8uaW5kZXhPZignLycpID09IC0xKSBnZW9jb2Rlci5zZXRJRChfKTtcbiAgICAgICAgZWxzZSBnZW9jb2Rlci5zZXRVUkwoXyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBfID09PSAnb2JqZWN0JykgZ2VvY29kZXIuc2V0VGlsZUpTT04oXyk7XG5cbiAgICByZXR1cm4gZ2VvY29kZXI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsID0gcmVxdWlyZSgnLi91cmwnKSxcbiAgICBzYW5pdGl6ZSA9IHJlcXVpcmUoJy4vc2FuaXRpemUnKTtcblxuLy8gbWFwYm94LXJlbGF0ZWQgbWFya2VycyBmdW5jdGlvbmFsaXR5XG4vLyBwcm92aWRlIGFuIGljb24gZnJvbSBtYXBib3gncyBzaW1wbGUtc3R5bGUgc3BlYyBhbmQgaG9zdGVkIG1hcmtlcnNcbi8vIHNlcnZpY2VcbmZ1bmN0aW9uIGljb24oZnApIHtcbiAgICBmcCA9IGZwIHx8IHt9O1xuXG4gICAgdmFyIHNpemVzID0ge1xuICAgICAgICAgICAgc21hbGw6IFsyMCwgNTBdLFxuICAgICAgICAgICAgbWVkaXVtOiBbMzAsIDcwXSxcbiAgICAgICAgICAgIGxhcmdlOiBbMzUsIDkwXVxuICAgICAgICB9LFxuICAgICAgICBzaXplID0gZnBbJ21hcmtlci1zaXplJ10gfHwgJ21lZGl1bScsXG4gICAgICAgIHN5bWJvbCA9IChmcFsnbWFya2VyLXN5bWJvbCddKSA/ICctJyArIGZwWydtYXJrZXItc3ltYm9sJ10gOiAnJyxcbiAgICAgICAgY29sb3IgPSAoZnBbJ21hcmtlci1jb2xvciddIHx8ICc3ZTdlN2UnKS5yZXBsYWNlKCcjJywgJycpO1xuXG4gICAgcmV0dXJuIEwuaWNvbih7XG4gICAgICAgIGljb25Vcmw6IHVybC5iYXNlKCkgKyAnbWFya2VyLycgK1xuICAgICAgICAgICAgJ3Bpbi0nICsgc2l6ZS5jaGFyQXQoMCkgKyBzeW1ib2wgKyAnKycgKyBjb2xvciArXG4gICAgICAgICAgICAvLyBkZXRlY3QgYW5kIHVzZSByZXRpbmEgbWFya2Vycywgd2hpY2ggYXJlIHgyIHJlc29sdXRpb25cbiAgICAgICAgICAgICgoTC5Ccm93c2VyLnJldGluYSkgPyAnQDJ4JyA6ICcnKSArICcucG5nJyxcbiAgICAgICAgaWNvblNpemU6IHNpemVzW3NpemVdLFxuICAgICAgICBpY29uQW5jaG9yOiBbc2l6ZXNbc2l6ZV1bMF0gLyAyLCBzaXplc1tzaXplXVsxXSAvIDJdLFxuICAgICAgICBwb3B1cEFuY2hvcjogWzAsIC1zaXplc1tzaXplXVsxXSAvIDJdXG4gICAgfSk7XG59XG5cbi8vIGEgZmFjdG9yeSB0aGF0IHByb3ZpZGVzIG1hcmtlcnMgZm9yIExlYWZsZXQgZnJvbSBNYXBCb3gnc1xuLy8gW3NpbXBsZS1zdHlsZSBzcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L3NpbXBsZXN0eWxlLXNwZWMpXG4vLyBhbmQgW01hcmtlcnMgQVBJXShodHRwOi8vbWFwYm94LmNvbS9kZXZlbG9wZXJzL2FwaS8jbWFya2VycykuXG5mdW5jdGlvbiBzdHlsZShmLCBsYXRsb24pIHtcbiAgICByZXR1cm4gTC5tYXJrZXIobGF0bG9uLCB7XG4gICAgICAgIGljb246IGljb24oZi5wcm9wZXJ0aWVzKSxcbiAgICAgICAgdGl0bGU6IGYucHJvcGVydGllcy50aXRsZVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQb3B1cChmLCBzYW5pdGl6ZXIpIHtcbiAgICBpZiAoIWYgfHwgIWYucHJvcGVydGllcykgcmV0dXJuICcnO1xuICAgIHZhciBwb3B1cCA9ICcnO1xuXG4gICAgaWYgKGYucHJvcGVydGllcy50aXRsZSkge1xuICAgICAgICBwb3B1cCArPSAnPGRpdiBjbGFzcz1cIm1hcmtlci10aXRsZVwiPicgKyBmLnByb3BlcnRpZXMudGl0bGUgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBpZiAoZi5wcm9wZXJ0aWVzLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHBvcHVwICs9ICc8ZGl2IGNsYXNzPVwibWFya2VyLWRlc2NyaXB0aW9uXCI+JyArIGYucHJvcGVydGllcy5kZXNjcmlwdGlvbiArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHJldHVybiAoc2FuaXRpemVyIHx8IHNhbml0aXplKShwb3B1cCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGljb246IGljb24sXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGNyZWF0ZVBvcHVwOiBjcmVhdGVQb3B1cFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB1cmwgPSByZXF1aXJlKCcuL3VybCcpO1xuXG52YXIgVGlsZUxheWVyID0gTC5UaWxlTGF5ZXIuZXh0ZW5kKHtcbiAgICBpbmNsdWRlczogW3JlcXVpcmUoJy4vbG9hZF90aWxlanNvbicpXSxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZm9ybWF0OiAncG5nJ1xuICAgIH0sXG5cbiAgICAvLyBodHRwOi8vbWFwYm94LmNvbS9kZXZlbG9wZXJzL2FwaS8jaW1hZ2VfcXVhbGl0eVxuICAgIGZvcm1hdHM6IFtcbiAgICAgICAgJ3BuZycsXG4gICAgICAgIC8vIFBOR1xuICAgICAgICAncG5nMzInLCAncG5nNjQnLCAncG5nMTI4JywgJ3BuZzI1NicsXG4gICAgICAgIC8vIEpQR1xuICAgICAgICAnanBnNzAnLCAnanBnODAnLCAnanBnOTAnXSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICAgICAgTC5UaWxlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCB1bmRlZmluZWQsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX3RpbGVqc29uID0ge307XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5kZXRlY3RSZXRpbmEgJiZcbiAgICAgICAgICAgIEwuQnJvd3Nlci5yZXRpbmEgJiYgb3B0aW9ucy5yZXRpbmFWZXJzaW9uKSB7XG4gICAgICAgICAgICBfID0gb3B0aW9ucy5yZXRpbmFWZXJzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5mb3JtYXQpIHtcbiAgICAgICAgICAgIHV0aWwuc3RyaWN0X29uZW9mKG9wdGlvbnMuZm9ybWF0LCB0aGlzLmZvcm1hdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZFRpbGVKU09OKF8pO1xuICAgIH0sXG5cbiAgICBzZXRGb3JtYXQ6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgdXRpbC5zdHJpY3QoXywgJ3N0cmluZycpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9ybWF0ID0gXztcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIGRpc2FibGUgdGhlIHNldFVybCBmdW5jdGlvbiwgd2hpY2ggaXMgbm90IGF2YWlsYWJsZSBvbiBtYXBib3ggdGlsZWxheWVyc1xuICAgIHNldFVybDogbnVsbCxcblxuICAgIF9zZXRUaWxlSlNPTjogZnVuY3Rpb24oanNvbikge1xuICAgICAgICB1dGlsLnN0cmljdChqc29uLCAnb2JqZWN0Jyk7XG5cbiAgICAgICAgTC5leHRlbmQodGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICB0aWxlczoganNvbi50aWxlcyxcbiAgICAgICAgICAgIGF0dHJpYnV0aW9uOiBqc29uLmF0dHJpYnV0aW9uLFxuICAgICAgICAgICAgbWluWm9vbToganNvbi5taW56b29tLFxuICAgICAgICAgICAgbWF4Wm9vbToganNvbi5tYXh6b29tLFxuICAgICAgICAgICAgdG1zOiBqc29uLnNjaGVtZSA9PT0gJ3RtcycsXG4gICAgICAgICAgICBib3VuZHM6IGpzb24uYm91bmRzICYmIHV0aWwubGJvdW5kcyhqc29uLmJvdW5kcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdGlsZWpzb24gPSBqc29uO1xuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0VGlsZUpTT046IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZWpzb247XG4gICAgfSxcblxuICAgIC8vIHRoaXMgaXMgYW4gZXhjZXB0aW9uIHRvIG1hcGJveC5qcyBuYW1pbmcgcnVsZXMgYmVjYXVzZSBpdCdzIGNhbGxlZFxuICAgIC8vIGJ5IGBMLm1hcGBcbiAgICBnZXRUaWxlVXJsOiBmdW5jdGlvbih0aWxlUG9pbnQpIHtcbiAgICAgICAgdmFyIHRpbGVzID0gdGhpcy5vcHRpb25zLnRpbGVzLFxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRpbGVzLmxlbmd0aCxcbiAgICAgICAgICAgIHVybCA9IHRpbGVzW2luZGV4XTtcblxuICAgICAgICB2YXIgdGVtcGxhdGVkID0gTC5VdGlsLnRlbXBsYXRlKHVybCwgdGlsZVBvaW50KTtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZWQpIHJldHVybiB0ZW1wbGF0ZWQ7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRlbXBsYXRlZC5yZXBsYWNlKCcucG5nJywgJy4nICsgdGhpcy5vcHRpb25zLmZvcm1hdCk7XG4gICAgfSxcblxuICAgIC8vIFRpbGVKU09OLlRpbGVMYXllcnMgYXJlIGFkZGVkIHRvIHRoZSBtYXAgaW1tZWRpYXRlbHksIHNvIHRoYXQgdGhleSBnZXRcbiAgICAvLyB0aGUgZGVzaXJlZCB6LWluZGV4LCBidXQgZG8gbm90IHVwZGF0ZSB1bnRpbCB0aGUgVGlsZUpTT04gaGFzIGJlZW4gbG9hZGVkLlxuICAgIF91cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzKSB7XG4gICAgICAgICAgICBMLlRpbGVMYXllci5wcm90b3R5cGUuX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgVGlsZUxheWVyKF8sIG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFNoYXJlQ29udHJvbCA9IEwuQ29udHJvbC5leHRlbmQoe1xuICAgIGluY2x1ZGVzOiBbcmVxdWlyZSgnLi9sb2FkX3RpbGVqc29uJyldLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxuICAgICAgICB1cmw6ICcnXG4gICAgfSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICAgICAgTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sb2FkVGlsZUpTT04oXyk7XG4gICAgfSxcblxuICAgIF9zZXRUaWxlSlNPTjogZnVuY3Rpb24oanNvbikge1xuICAgICAgICB0aGlzLl90aWxlanNvbiA9IGpzb247XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sLW1hcGJveC1zaGFyZSBsZWFmbGV0LWJhcicpO1xuICAgICAgICB2YXIgbGluayA9IEwuRG9tVXRpbC5jcmVhdGUoJ2EnLCAnbWFwYm94LXNoYXJlIG1hcGJveC1pY29uIG1hcGJveC1pY29uLXNoYXJlJywgY29udGFpbmVyKTtcbiAgICAgICAgbGluay5ocmVmID0gJyMnO1xuXG4gICAgICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIobGluaywgJ2NsaWNrJywgdGhpcy5fc2hhcmUsIHRoaXMpO1xuICAgICAgICBMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKGNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gQ2xvc2UgYW55IG9wZW4gcG9wdXBzXG5cblxuICAgICAgICB0aGlzLl9tYXAub24oJ21vdXNlZG93bicsIHRoaXMuX2NsaWNrT3V0LCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBfY2xpY2tPdXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fcG9wdXApO1xuICAgICAgICAgICAgdGhpcy5fcG9wdXAgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zaGFyZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBMLkRvbUV2ZW50LnN0b3AoZSk7XG5cbiAgICAgICAgdmFyIHRpbGVqc29uID0gdGhpcy5fdGlsZWpzb24gfHwgdGhpcy5fbWFwLl90aWxlanNvbiB8fCB7fSxcbiAgICAgICAgICAgIHR3aXR0ZXIgPSAnaHR0cDovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD9zdGF0dXM9JyArXG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHRpbGVqc29uLm5hbWUgKyAnXFxuJyArICh0aWxlanNvbi53ZWJwYWdlIHx8IHdpbmRvdy5sb2NhdGlvbikpLFxuICAgICAgICAgICAgZmFjZWJvb2sgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT0nICtcbiAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodGhpcy5vcHRpb25zLnVybCB8fCB0aWxlanNvbi53ZWJwYWdlIHx8IHdpbmRvdy5sb2NhdGlvbikgK1xuICAgICAgICAgICAgICAgICcmdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRpbGVqc29uLm5hbWUpLFxuICAgICAgICAgICAgc2hhcmUgPVxuICAgICAgICAgICAgICAgIFwiPGEgY2xhc3M9J2xlYWZsZXQtcG9wdXAtY2xvc2UtYnV0dG9uJyBocmVmPScjY2xvc2UnPsOXPC9hPlwiICtcbiAgICAgICAgICAgICAgICAoXCI8aDM+U2hhcmUgdGhpcyBtYXA8L2gzPlwiICtcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdtYXBib3gtc2hhcmUtYnV0dG9ucyc+PGEgY2xhc3M9J21hcGJveC1zaGFyZS1mYWNlYm9vayBtYXBib3gtaWNvbiBtYXBib3gtaWNvbi1mYWNlYm9vaycgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J3t7ZmFjZWJvb2t9fSc+RmFjZWJvb2s8L2E+XCIgK1xuICAgICAgICAgICAgICAgICAgICBcIjxhIGNsYXNzPSdtYXBib3gtc2hhcmUtdHdpdHRlciBtYXBib3gtaWNvbiBtYXBib3gtaWNvbi10d2l0dGVyJyB0YXJnZXQ9J19ibGFuaycgaHJlZj0ne3t0d2l0dGVyfX0nPlR3aXR0ZXI8L2E+PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e3R3aXR0ZXJ9fScsIHR3aXR0ZXIpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2ZhY2Vib29rfX0nLCBmYWNlYm9vaykgK1xuICAgICAgICAgICAgICAgIChcIjxoMz5HZXQgdGhlIGVtYmVkIGNvZGU8L2gzPlwiICtcbiAgICAgICAgICAgICAgICBcIjxzbWFsbD5Db3B5IGFuZCBwYXN0ZSB0aGlzIEhUTUwgaW50byB5b3VyIHdlYnNpdGUgb3IgYmxvZy48L3NtYWxsPlwiKSArXG4gICAgICAgICAgICAgICAgXCI8dGV4dGFyZWEgcm93cz00Pnt7dmFsdWV9fTwvdGV4dGFyZWE+XCJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t7dmFsdWV9fScsIChcIiZsdDtpZnJhbWUgd2lkdGg9JzUwMCcgaGVpZ2h0PSczMDAnIGZyYW1lQm9yZGVyPScwJyBzcmM9J3t7ZW1iZWR9fScmZ3Q7Jmx0Oy9pZnJhbWUmZ3Q7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7e2VtYmVkfX0nLCB0aWxlanNvbi5lbWJlZCB8fCB3aW5kb3cubG9jYXRpb24pKSk7XG5cbiAgICAgICAgdGhpcy5fcG9wdXAgPSBMLm1hcmtlcih0aGlzLl9tYXAuZ2V0Q2VudGVyKCksIHtcbiAgICAgICAgICAgIHpJbmRleE9mZnNldDogMTAwMDAsXG4gICAgICAgICAgICBpY29uOiBMLmRpdkljb24oe1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ21hcGJveC1zaGFyZS1wb3B1cCcsXG4gICAgICAgICAgICAgICAgaWNvblNpemU6IEwucG9pbnQoMzYwLCAyNDApLFxuICAgICAgICAgICAgICAgIGljb25BbmNob3I6IEwucG9pbnQoMTgwLCAxMjApLFxuICAgICAgICAgICAgICAgIGh0bWw6IHNoYXJlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUub3JpZ2luYWxFdmVudCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2snLCBjbGlja1BvcHVwLCB0aGlzKS5hZGRUbyh0aGlzLl9tYXApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsaWNrUG9wdXAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNlbGVjdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gJyNjbG9zZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlja091dChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEwuRG9tRXZlbnQuc3RvcChlLm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgU2hhcmVDb250cm9sKF8sIG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIExlZ2VuZENvbnRyb2wgPSBMLkNvbnRyb2wuZXh0ZW5kKHtcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcG9zaXRpb246ICdib3R0b21yaWdodCcsXG4gICAgICAgIHNhbml0aXplcjogcmVxdWlyZSgnLi9zYW5pdGl6ZScpXG4gICAgfSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sZWdlbmRzID0ge307XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ21hcC1sZWdlbmRzIHdheC1sZWdlbmRzJyk7XG4gICAgICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBhZGRMZWdlbmQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgaWYgKCF0ZXh0KSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9sZWdlbmRzW3RleHRdKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdlbmRzW3RleHRdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xlZ2VuZHNbdGV4dF0rKztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZSgpO1xuICAgIH0sXG5cbiAgICByZW1vdmVMZWdlbmQ6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgaWYgKCF0ZXh0KSB7IHJldHVybiB0aGlzOyB9XG4gICAgICAgIGlmICh0aGlzLl9sZWdlbmRzW3RleHRdKSB0aGlzLl9sZWdlbmRzW3RleHRdLS07XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGUoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWFwKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB2YXIgaGlkZSA9ICdub25lJztcblxuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xlZ2VuZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sZWdlbmRzLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMuX2xlZ2VuZHNbaV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gJ21hcC1sZWdlbmQgd2F4LWxlZ2VuZCc7XG4gICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoaSk7XG4gICAgICAgICAgICAgICAgaGlkZSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoaWRlIHRoZSBjb250cm9sIGVudGlyZWx5IHVubGVzcyB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgbGVnZW5kO1xuICAgICAgICAvLyBvdGhlcndpc2UgdGhlcmUgd2lsbCBiZSBhIHNtYWxsIGdyZXkgYmxlbWlzaCBvbiB0aGUgbWFwLlxuICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IGhpZGU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgTGVnZW5kQ29udHJvbChvcHRpb25zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZW9jb2RlciA9IHJlcXVpcmUoJy4vZ2VvY29kZXInKTtcblxudmFyIEdlb2NvZGVyQ29udHJvbCA9IEwuQ29udHJvbC5leHRlbmQoe1xuICAgIGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcblxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcG9zaXRpb246ICd0b3BsZWZ0J1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIgPSBnZW9jb2RlcihfKTtcbiAgICB9LFxuXG4gICAgc2V0VVJMOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIuc2V0VVJMKF8pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZ2V0VVJMOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvY29kZXIuZ2V0VVJMKCk7XG4gICAgfSxcblxuICAgIHNldElEOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIuc2V0SUQoXyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXRUaWxlSlNPTjogZnVuY3Rpb24oXykge1xuICAgICAgICB0aGlzLmdlb2NvZGVyLnNldFRpbGVKU09OKF8pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3RvZ2dsZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSkgTC5Eb21FdmVudC5zdG9wKGUpO1xuICAgICAgICBpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jbG9zZUlmT3BlbjogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoTC5Eb21VdGlsLmhhc0NsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXIgbGVhZmxldC1iYXIgbGVhZmxldC1jb250cm9sJyksXG4gICAgICAgICAgICBsaW5rID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsICdsZWFmbGV0LWNvbnRyb2wtbWFwYm94LWdlb2NvZGVyLXRvZ2dsZSBtYXBib3gtaWNvbiBtYXBib3gtaWNvbi1nZW9jb2RlcicsIGNvbnRhaW5lciksXG4gICAgICAgICAgICByZXN1bHRzID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXItcmVzdWx0cycsIGNvbnRhaW5lciksXG4gICAgICAgICAgICB3cmFwID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tYXBib3gtZ2VvY29kZXItd3JhcCcsIGNvbnRhaW5lciksXG4gICAgICAgICAgICBmb3JtID0gTC5Eb21VdGlsLmNyZWF0ZSgnZm9ybScsICdsZWFmbGV0LWNvbnRyb2wtbWFwYm94LWdlb2NvZGVyLWZvcm0nLCB3cmFwKSxcbiAgICAgICAgICAgIGlucHV0ICA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJycsIGZvcm0pO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSAnJm5ic3A7JztcblxuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ1NlYXJjaCcpO1xuXG4gICAgICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIobGluaywgJ2NsaWNrJywgdGhpcy5fdG9nZ2xlLCB0aGlzKTtcbiAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihmb3JtLCAnc3VibWl0JywgdGhpcy5fZ2VvY29kZSwgdGhpcyk7XG4gICAgICAgIEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24oY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMuX3Jlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLl9mb3JtID0gZm9ybTtcblxuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5fY2xvc2VJZk9wZW4sIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfSxcblxuICAgIF9nZW9jb2RlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XG4gICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdzZWFyY2hpbmcnKTtcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICAgICAgdGhpcy5nZW9jb2Rlci5xdWVyeSh0aGlzLl9pbnB1dC52YWx1ZSwgTC5iaW5kKGZ1bmN0aW9uKGVyciwgcmVzcCkge1xuICAgICAgICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ3NlYXJjaGluZycpO1xuICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzcCB8fCAhcmVzcC5yZXN1bHRzIHx8ICFyZXNwLnJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdlcnJvcicsIHtlcnJvcjogZXJyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AucmVzdWx0cy5sZW5ndGggPT09IDEgJiYgcmVzcC5sYm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcC5maXRCb3VuZHMocmVzcC5sYm91bmRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2VJZk9wZW4oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IE1hdGgubWluKHJlc3AucmVzdWx0cy5sZW5ndGgsIDUpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXNwLnJlc3VsdHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwLnJlc3VsdHNbaV1bal0ubmFtZSAmJiBuYW1lLnB1c2gocmVzcC5yZXN1bHRzW2ldW2pdLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuYW1lLmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByID0gTC5Eb21VdGlsLmNyZWF0ZSgnYScsICcnLCB0aGlzLl9yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHIuaW5uZXJIVE1MID0gbmFtZS5qb2luKCcsICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgci5ocmVmID0gJyMnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihyLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfID0gcmVzdWx0WzBdLmJvdW5kcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhMLmxhdExuZ0JvdW5kcyhbW19bMV0sIF9bMF1dLCBbX1szXSwgX1syXV1dKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEwuRG9tRXZlbnQuc3RvcChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKHJlc3AucmVzdWx0c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AucmVzdWx0cy5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0b2YgPSBMLkRvbVV0aWwuY3JlYXRlKCdzcGFuJywgJycsIHRoaXMuX3Jlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0b2YuaW5uZXJIVE1MID0gJ1RvcCA1IG9mICcgKyByZXNwLnJlc3VsdHMubGVuZ3RoICsgJyAgcmVzdWx0cyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdmb3VuZCcsIHJlc3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgR2VvY29kZXJDb250cm9sKG9wdGlvbnMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICB1cmwgPSByZXF1aXJlKCcuL3VybCcpLFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcbiAgICBncmlkID0gcmVxdWlyZSgnLi9ncmlkJyk7XG5cbi8vIGZvcmtlZCBmcm9tIGRhbnplbC9MLlVURkdyaWRcbnZhciBHcmlkTGF5ZXIgPSBMLkNsYXNzLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtMLk1peGluLkV2ZW50cywgcmVxdWlyZSgnLi9sb2FkX3RpbGVqc29uJyldLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24oKSB7IHJldHVybiAnJzsgfVxuICAgIH0sXG5cbiAgICBfbW91c2VPbjogbnVsbCxcbiAgICBfdGlsZWpzb246IHt9LFxuICAgIF9jYWNoZToge30sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sb2FkVGlsZUpTT04oXyk7XG4gICAgfSxcblxuICAgIF9zZXRUaWxlSlNPTjogZnVuY3Rpb24oanNvbikge1xuICAgICAgICB1dGlsLnN0cmljdChqc29uLCAnb2JqZWN0Jyk7XG5cbiAgICAgICAgTC5leHRlbmQodGhpcy5vcHRpb25zLCB7XG4gICAgICAgICAgICBncmlkczoganNvbi5ncmlkcyxcbiAgICAgICAgICAgIG1pblpvb206IGpzb24ubWluem9vbSxcbiAgICAgICAgICAgIG1heFpvb206IGpzb24ubWF4em9vbSxcbiAgICAgICAgICAgIGJvdW5kczoganNvbi5ib3VuZHMgJiYgdXRpbC5sYm91bmRzKGpzb24uYm91bmRzKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl90aWxlanNvbiA9IGpzb247XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBnZXRUaWxlSlNPTjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlanNvbjtcbiAgICB9LFxuXG4gICAgYWN0aXZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuX21hcCAmJiB0aGlzLm9wdGlvbnMuZ3JpZHMgJiYgdGhpcy5vcHRpb25zLmdyaWRzLmxlbmd0aCk7XG4gICAgfSxcblxuICAgIGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xuICAgICAgICB0aGlzLl91cGRhdGUoKTtcblxuICAgICAgICB0aGlzLl9tYXBcbiAgICAgICAgICAgIC5vbignY2xpY2snLCB0aGlzLl9jbGljaywgdGhpcylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fbW92ZSwgdGhpcylcbiAgICAgICAgICAgIC5vbignbW92ZWVuZCcsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fbWFwXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKVxuICAgICAgICAgICAgLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fbW92ZSwgdGhpcylcbiAgICAgICAgICAgIC5vZmYoJ21vdmVlbmQnLCB0aGlzLl91cGRhdGUsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBnZXREYXRhOiBmdW5jdGlvbihsYXRsbmcsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXAgPSB0aGlzLl9tYXAsXG4gICAgICAgICAgICBwb2ludCA9IG1hcC5wcm9qZWN0KGxhdGxuZyksXG4gICAgICAgICAgICB0aWxlU2l6ZSA9IDI1NixcbiAgICAgICAgICAgIHJlc29sdXRpb24gPSA0LFxuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IocG9pbnQueCAvIHRpbGVTaXplKSxcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHBvaW50LnkgLyB0aWxlU2l6ZSksXG4gICAgICAgICAgICBtYXggPSBtYXAub3B0aW9ucy5jcnMuc2NhbGUobWFwLmdldFpvb20oKSkgLyB0aWxlU2l6ZTtcblxuICAgICAgICB4ID0gKHggKyBtYXgpICUgbWF4O1xuICAgICAgICB5ID0gKHkgKyBtYXgpICUgbWF4O1xuXG4gICAgICAgIHRoaXMuX2dldFRpbGUobWFwLmdldFpvb20oKSwgeCwgeSwgZnVuY3Rpb24oZ3JpZCkge1xuICAgICAgICAgICAgdmFyIGdyaWRYID0gTWF0aC5mbG9vcigocG9pbnQueCAtICh4ICogdGlsZVNpemUpKSAvIHJlc29sdXRpb24pLFxuICAgICAgICAgICAgICAgIGdyaWRZID0gTWF0aC5mbG9vcigocG9pbnQueSAtICh5ICogdGlsZVNpemUpKSAvIHJlc29sdXRpb24pO1xuXG4gICAgICAgICAgICBjYWxsYmFjayhncmlkKGdyaWRYLCBncmlkWSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX2NsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YShlLmxhdGxuZywgTC5iaW5kKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZSgnY2xpY2snLCB7XG4gICAgICAgICAgICAgICAgbGF0TG5nOiBlLmxhdGxuZyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBfbW92ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmdldERhdGEoZS5sYXRsbmcsIEwuYmluZChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSAhPT0gdGhpcy5fbW91c2VPbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZU9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnbW91c2VvdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRMbmc6IGUubGF0bG5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5fbW91c2VPblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ21vdXNlb3ZlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgbGF0TG5nOiBlLmxhdGxuZyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VPbiA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnbW91c2Vtb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICBsYXRMbmc6IGUubGF0bG5nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2dldFRpbGVVUkw6IGZ1bmN0aW9uKHRpbGVQb2ludCkge1xuICAgICAgICB2YXIgdXJscyA9IHRoaXMub3B0aW9ucy5ncmlkcyxcbiAgICAgICAgICAgIGluZGV4ID0gKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdXJscy5sZW5ndGgsXG4gICAgICAgICAgICB1cmwgPSB1cmxzW2luZGV4XTtcblxuICAgICAgICByZXR1cm4gTC5VdGlsLnRlbXBsYXRlKHVybCwgdGlsZVBvaW50KTtcbiAgICB9LFxuXG4gICAgLy8gTG9hZCB1cCBhbGwgcmVxdWlyZWQganNvbiBncmlkIGZpbGVzXG4gICAgX3VwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBib3VuZHMgPSB0aGlzLl9tYXAuZ2V0UGl4ZWxCb3VuZHMoKSxcbiAgICAgICAgICAgIHogPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpLFxuICAgICAgICAgICAgdGlsZVNpemUgPSAyNTY7XG5cbiAgICAgICAgaWYgKHogPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6IDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHJldHVybjtcblxuICAgICAgICB2YXIgbndUaWxlUG9pbnQgPSBuZXcgTC5Qb2ludChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5taW4ueCAvIHRpbGVTaXplKSxcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGJvdW5kcy5taW4ueSAvIHRpbGVTaXplKSksXG4gICAgICAgICAgICBzZVRpbGVQb2ludCA9IG5ldyBMLlBvaW50KFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYm91bmRzLm1heC54IC8gdGlsZVNpemUpLFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoYm91bmRzLm1heC55IC8gdGlsZVNpemUpKSxcbiAgICAgICAgICAgIG1heCA9IHRoaXMuX21hcC5vcHRpb25zLmNycy5zY2FsZSh6KSAvIHRpbGVTaXplO1xuXG4gICAgICAgIGZvciAodmFyIHggPSBud1RpbGVQb2ludC54OyB4IDw9IHNlVGlsZVBvaW50Lng7IHgrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IG53VGlsZVBvaW50Lnk7IHkgPD0gc2VUaWxlUG9pbnQueTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgLy8geCB3cmFwcGVkXG4gICAgICAgICAgICAgICAgdmFyIHh3ID0gKHggKyBtYXgpICUgbWF4LCB5dyA9ICh5ICsgbWF4KSAlIG1heDtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRUaWxlKHosIHh3LCB5dyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldFRpbGU6IGZ1bmN0aW9uKHosIHgsIHksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBrZXkgPSB6ICsgJ18nICsgeCArICdfJyArIHksXG4gICAgICAgICAgICB0aWxlUG9pbnQgPSBMLnBvaW50KHgsIHkpO1xuXG4gICAgICAgIHRpbGVQb2ludC56ID0gejtcblxuICAgICAgICBpZiAoIXRoaXMuX3RpbGVTaG91bGRCZUxvYWRlZCh0aWxlUG9pbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5IGluIHRoaXMuX2NhY2hlKSB7XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY2FjaGVba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX2NhY2hlW2tleV0pOyAvLyBBbHJlYWR5IGxvYWRlZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZVtrZXldLnB1c2goY2FsbGJhY2spOyAvLyBQZW5kaW5nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSBbXTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0KHRoaXMuX2dldFRpbGVVUkwodGlsZVBvaW50KSwgTC5iaW5kKGZ1bmN0aW9uKGVyciwganNvbikge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhY2hlW2tleV07XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVtrZXldID0gZ3JpZChqc29uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKHRoaXMuX2NhY2hlW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfSxcblxuICAgIF90aWxlU2hvdWxkQmVMb2FkZWQ6IGZ1bmN0aW9uKHRpbGVQb2ludCkge1xuICAgICAgICBpZiAodGlsZVBvaW50LnogPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB0aWxlUG9pbnQueiA8IHRoaXMub3B0aW9ucy5taW5ab29tKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmJvdW5kcykge1xuICAgICAgICAgICAgdmFyIHRpbGVTaXplID0gMjU2LFxuICAgICAgICAgICAgICAgIG53UG9pbnQgPSB0aWxlUG9pbnQubXVsdGlwbHlCeSh0aWxlU2l6ZSksXG4gICAgICAgICAgICAgICAgc2VQb2ludCA9IG53UG9pbnQuYWRkKG5ldyBMLlBvaW50KHRpbGVTaXplLCB0aWxlU2l6ZSkpLFxuICAgICAgICAgICAgICAgIG53ID0gdGhpcy5fbWFwLnVucHJvamVjdChud1BvaW50KSxcbiAgICAgICAgICAgICAgICBzZSA9IHRoaXMuX21hcC51bnByb2plY3Qoc2VQb2ludCksXG4gICAgICAgICAgICAgICAgYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKFtudywgc2VdKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYm91bmRzLmludGVyc2VjdHMoYm91bmRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKF8sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEdyaWRMYXllcihfLCBvcHRpb25zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgdXJsaGVscGVyID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0Jyk7XG52YXIgbWFya2VyID0gcmVxdWlyZSgnLi9tYXJrZXInKTtcblxuLy8gIyBtYXJrZXJMYXllclxuLy9cbi8vIEEgbGF5ZXIgb2YgbWFya2VycywgbG9hZGVkIGZyb20gTWFwQm94IG9yIGVsc2UuIEFkZHMgdGhlIGFiaWxpdHlcbi8vIHRvIHJlc2V0IG1hcmtlcnMsIGZpbHRlciB0aGVtLCBhbmQgbG9hZCB0aGVtIGZyb20gYSBHZW9KU09OIFVSTC5cbnZhciBNYXJrZXJMYXllciA9IEwuRmVhdHVyZUdyb3VwLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgc2FuaXRpemVyOiByZXF1aXJlKCcuL3Nhbml0aXplJylcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgICAgICBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdXRpbC5pZFVybChfLCB0aGlzKTtcbiAgICAgICAgLy8gamF2YXNjcmlwdCBvYmplY3Qgb2YgVGlsZUpTT04gZGF0YVxuICAgICAgICB9IGVsc2UgaWYgKF8gJiYgdHlwZW9mIF8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEdlb0pTT04oXyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0R2VvSlNPTjogZnVuY3Rpb24oXykge1xuICAgICAgICB0aGlzLl9nZW9qc29uID0gXztcbiAgICAgICAgdGhpcy5jbGVhckxheWVycygpO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplKF8pO1xuICAgIH0sXG5cbiAgICBnZXRHZW9KU09OOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dlb2pzb247XG4gICAgfSxcblxuICAgIGxvYWRVUkw6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB1cmwgPSB1cmxoZWxwZXIuanNvbmlmeSh1cmwpO1xuICAgICAgICByZXF1ZXN0KHVybCwgTC5iaW5kKGZ1bmN0aW9uKGVyciwganNvbikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHV0aWwubG9nKCdjb3VsZCBub3QgbG9hZCBtYXJrZXJzIGF0ICcgKyB1cmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnZXJyb3InLCB7ZXJyb3I6IGVycn0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqc29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRHZW9KU09OKGpzb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncmVhZHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgbG9hZElEOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkVVJMKHVybGhlbHBlci5iYXNlKCkgKyBpZCArICcvbWFya2Vycy5nZW9qc29uJyk7XG4gICAgfSxcblxuICAgIHNldEZpbHRlcjogZnVuY3Rpb24oXykge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyID0gXztcbiAgICAgICAgaWYgKHRoaXMuX2dlb2pzb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMYXllcnMoKTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemUodGhpcy5fZ2VvanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGdldEZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyO1xuICAgIH0sXG5cbiAgICBfaW5pdGlhbGl6ZTogZnVuY3Rpb24oanNvbikge1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBMLlV0aWwuaXNBcnJheShqc29uKSA/IGpzb24gOiBqc29uLmZlYXR1cmVzLFxuICAgICAgICAgICAgaSwgbGVuO1xuXG4gICAgICAgIGlmIChmZWF0dXJlcykge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gZmVhdHVyZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGFkZCB0aGlzIGlmIGdlb21ldHJ5IG9yIGdlb21ldHJpZXMgYXJlIHNldCBhbmQgbm90IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZXNbaV0uZ2VvbWV0cmllcyB8fCBmZWF0dXJlc1tpXS5nZW9tZXRyeSB8fCBmZWF0dXJlc1tpXS5mZWF0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplKGZlYXR1cmVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmZpbHRlcihqc29uKSkge1xuXG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBMLkdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGpzb24sIG1hcmtlci5zdHlsZSksXG4gICAgICAgICAgICAgICAgcG9wdXBIdG1sID0gbWFya2VyLmNyZWF0ZVBvcHVwKGpzb24sIHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIpO1xuXG4gICAgICAgICAgICBsYXllci5mZWF0dXJlID0ganNvbjtcblxuICAgICAgICAgICAgaWYgKHBvcHVwSHRtbCkge1xuICAgICAgICAgICAgICAgIGxheWVyLmJpbmRQb3B1cChwb3B1cEh0bWwsIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgTWFya2VyTGF5ZXIoXywgb3B0aW9ucyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIHRpbGVMYXllciA9IHJlcXVpcmUoJy4vdGlsZV9sYXllcicpLFxuICAgIG1hcmtlckxheWVyID0gcmVxdWlyZSgnLi9tYXJrZXJfbGF5ZXInKSxcbiAgICBncmlkTGF5ZXIgPSByZXF1aXJlKCcuL2dyaWRfbGF5ZXInKSxcbiAgICBncmlkQ29udHJvbCA9IHJlcXVpcmUoJy4vZ3JpZF9jb250cm9sJyksXG4gICAgbGVnZW5kQ29udHJvbCA9IHJlcXVpcmUoJy4vbGVnZW5kX2NvbnRyb2wnKTtcblxudmFyIE1hcCA9IEwuTWFwLmV4dGVuZCh7XG4gICAgaW5jbHVkZXM6IFtyZXF1aXJlKCcuL2xvYWRfdGlsZWpzb24nKV0sXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHRpbGVMYXllcjoge30sXG4gICAgICAgIG1hcmtlckxheWVyOiB7fSxcbiAgICAgICAgZ3JpZExheWVyOiB7fSxcbiAgICAgICAgbGVnZW5kQ29udHJvbDoge30sXG4gICAgICAgIGdyaWRDb250cm9sOiB7fVxuICAgIH0sXG5cbiAgICBfdGlsZWpzb246IHt9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oZWxlbWVudCwgXywgb3B0aW9ucykge1xuICAgICAgICBMLk1hcC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGRpc2FibGUgdGhlIGRlZmF1bHQgJ1Bvd2VyZWQgYnkgTGVhZmxldCcgdGV4dFxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wpIHRoaXMuYXR0cmlidXRpb25Db250cm9sLnNldFByZWZpeCgnJyk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aWxlTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGlsZUxheWVyID0gdGlsZUxheWVyKHVuZGVmaW5lZCwgdGhpcy5vcHRpb25zLnRpbGVMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMudGlsZUxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubWFya2VyTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFya2VyTGF5ZXIgPSBtYXJrZXJMYXllcih1bmRlZmluZWQsIHRoaXMub3B0aW9ucy5tYXJrZXJMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMubWFya2VyTGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5ncmlkTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZExheWVyID0gZ3JpZExheWVyKHVuZGVmaW5lZCwgdGhpcy5vcHRpb25zLmdyaWRMYXllcik7XG4gICAgICAgICAgICB0aGlzLmFkZExheWVyKHRoaXMuZ3JpZExheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JpZExheWVyICYmIHRoaXMub3B0aW9ucy5ncmlkQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5ncmlkQ29udHJvbCA9IGdyaWRDb250cm9sKHRoaXMuZ3JpZExheWVyLCB0aGlzLm9wdGlvbnMuZ3JpZENvbnRyb2wpO1xuICAgICAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMuZ3JpZENvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZWdlbmRDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmxlZ2VuZENvbnRyb2wgPSBsZWdlbmRDb250cm9sKHRoaXMub3B0aW9ucy5sZWdlbmRDb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29udHJvbCh0aGlzLmxlZ2VuZENvbnRyb2wpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9hZFRpbGVKU09OKF8pO1xuICAgIH0sXG5cbiAgICAvLyBVcGRhdGUgY2VydGFpbiBwcm9wZXJ0aWVzIG9uICdyZWFkeScgZXZlbnRcbiAgICBhZGRMYXllcjogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgaWYgKCdvbicgaW4gbGF5ZXIpIHsgbGF5ZXIub24oJ3JlYWR5JywgTC5iaW5kKGZ1bmN0aW9uKCkgeyB0aGlzLl91cGRhdGVMYXllcihsYXllcik7IH0sIHRoaXMpKTsgfVxuICAgICAgICByZXR1cm4gTC5NYXAucHJvdG90eXBlLmFkZExheWVyLmNhbGwodGhpcywgbGF5ZXIpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgYSBqYXZhc2NyaXB0IG9iamVjdCBvZiB0aWxlanNvbiBkYXRhIHRvIGNvbmZpZ3VyZSB0aGlzIGxheWVyXG4gICAgX3NldFRpbGVKU09OOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHRoaXMuX3RpbGVqc29uID0gXztcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZShfKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGdldFRpbGVKU09OOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVqc29uO1xuICAgIH0sXG5cbiAgICBfaW5pdGlhbGl6ZTogZnVuY3Rpb24oanNvbikge1xuICAgICAgICBpZiAodGhpcy50aWxlTGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGlsZUxheWVyLl9zZXRUaWxlSlNPTihqc29uKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyKHRoaXMudGlsZUxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1hcmtlckxheWVyICYmICF0aGlzLm1hcmtlckxheWVyLmdldEdlb0pTT04oKSAmJiBqc29uLmRhdGEgJiYganNvbi5kYXRhWzBdKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlckxheWVyLmxvYWRVUkwoanNvbi5kYXRhWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdyaWRMYXllcikge1xuICAgICAgICAgICAgdGhpcy5ncmlkTGF5ZXIuX3NldFRpbGVKU09OKGpzb24pO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGF5ZXIodGhpcy5ncmlkTGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGVnZW5kQ29udHJvbCAmJiBqc29uLmxlZ2VuZCkge1xuICAgICAgICAgICAgdGhpcy5sZWdlbmRDb250cm9sLmFkZExlZ2VuZChqc29uLmxlZ2VuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2xvYWRlZCkge1xuICAgICAgICAgICAgdmFyIHpvb20gPSBqc29uLmNlbnRlclsyXSxcbiAgICAgICAgICAgICAgICBjZW50ZXIgPSBMLmxhdExuZyhqc29uLmNlbnRlclsxXSwganNvbi5jZW50ZXJbMF0pO1xuXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcoY2VudGVyLCB6b29tKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlTGF5ZXI6IGZ1bmN0aW9uKGxheWVyKSB7XG5cbiAgICAgICAgaWYgKCFsYXllci5vcHRpb25zKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRpb25Db250cm9sICYmIHRoaXMuX2xvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wuYWRkQXR0cmlidXRpb24obGF5ZXIub3B0aW9ucy5hdHRyaWJ1dGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIShMLnN0YW1wKGxheWVyKSBpbiB0aGlzLl96b29tQm91bmRMYXllcnMpICYmXG4gICAgICAgICAgICAgICAgKGxheWVyLm9wdGlvbnMubWF4Wm9vbSB8fCBsYXllci5vcHRpb25zLm1pblpvb20pKSB7XG4gICAgICAgICAgICB0aGlzLl96b29tQm91bmRMYXllcnNbTC5zdGFtcChsYXllcildID0gbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVab29tTGV2ZWxzKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWxlbWVudCwgXywgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgTWFwKGVsZW1lbnQsIF8sIG9wdGlvbnMpO1xufTtcbiIsIi8vIENvcHlyaWdodCAoQykgMjAxMCBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogSW1wbGVtZW50cyBSRkMgMzk4NiBmb3IgcGFyc2luZy9mb3JtYXR0aW5nIFVSSXMuXG4gKlxuICogQGF1dGhvciBtaWtlc2FtdWVsQGdtYWlsLmNvbVxuICogXFxAcHJvdmlkZXMgVVJJXG4gKiBcXEBvdmVycmlkZXMgd2luZG93XG4gKi9cblxudmFyIFVSSSA9IChmdW5jdGlvbiAoKSB7XG5cbi8qKlxuICogY3JlYXRlcyBhIHVyaSBmcm9tIHRoZSBzdHJpbmcgZm9ybS4gIFRoZSBwYXJzZXIgaXMgcmVsYXhlZCwgc28gc3BlY2lhbFxuICogY2hhcmFjdGVycyB0aGF0IGFyZW4ndCBlc2NhcGVkIGJ1dCBkb24ndCBjYXVzZSBhbWJpZ3VpdGllcyB3aWxsIG5vdCBjYXVzZVxuICogcGFyc2UgZmFpbHVyZXMuXG4gKlxuICogQHJldHVybiB7VVJJfG51bGx9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHVyaVN0cikge1xuICB2YXIgbSA9ICgnJyArIHVyaVN0cikubWF0Y2goVVJJX1JFXyk7XG4gIGlmICghbSkgeyByZXR1cm4gbnVsbDsgfVxuICByZXR1cm4gbmV3IFVSSShcbiAgICAgIG51bGxJZkFic2VudChtWzFdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzJdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzNdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzRdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzVdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzZdKSxcbiAgICAgIG51bGxJZkFic2VudChtWzddKSk7XG59XG5cblxuLyoqXG4gKiBjcmVhdGVzIGEgdXJpIGZyb20gdGhlIGdpdmVuIHBhcnRzLlxuICpcbiAqIEBwYXJhbSBzY2hlbWUge3N0cmluZ30gYW4gdW5lbmNvZGVkIHNjaGVtZSBzdWNoIGFzIFwiaHR0cFwiIG9yIG51bGxcbiAqIEBwYXJhbSBjcmVkZW50aWFscyB7c3RyaW5nfSB1bmVuY29kZWQgdXNlciBjcmVkZW50aWFscyBvciBudWxsXG4gKiBAcGFyYW0gZG9tYWluIHtzdHJpbmd9IGFuIHVuZW5jb2RlZCBkb21haW4gbmFtZSBvciBudWxsXG4gKiBAcGFyYW0gcG9ydCB7bnVtYmVyfSBhIHBvcnQgbnVtYmVyIGluIFsxLCAzMjc2OF0uXG4gKiAgICAtMSBpbmRpY2F0ZXMgbm8gcG9ydCwgYXMgZG9lcyBudWxsLlxuICogQHBhcmFtIHBhdGgge3N0cmluZ30gYW4gdW5lbmNvZGVkIHBhdGhcbiAqIEBwYXJhbSBxdWVyeSB7QXJyYXkuPHN0cmluZz58c3RyaW5nfG51bGx9IGEgbGlzdCBvZiB1bmVuY29kZWQgY2dpXG4gKiAgIHBhcmFtZXRlcnMgd2hlcmUgZXZlbiB2YWx1ZXMgYXJlIGtleXMgYW5kIG9kZHMgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzXG4gKiAgIG9yIGFuIHVuZW5jb2RlZCBxdWVyeS5cbiAqIEBwYXJhbSBmcmFnbWVudCB7c3RyaW5nfSBhbiB1bmVuY29kZWQgZnJhZ21lbnQgd2l0aG91dCB0aGUgXCIjXCIgb3IgbnVsbC5cbiAqIEByZXR1cm4ge1VSSX1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlKHNjaGVtZSwgY3JlZGVudGlhbHMsIGRvbWFpbiwgcG9ydCwgcGF0aCwgcXVlcnksIGZyYWdtZW50KSB7XG4gIHZhciB1cmkgPSBuZXcgVVJJKFxuICAgICAgZW5jb2RlSWZFeGlzdHMyKHNjaGVtZSwgVVJJX0RJU0FMTE9XRURfSU5fU0NIRU1FX09SX0NSRURFTlRJQUxTXyksXG4gICAgICBlbmNvZGVJZkV4aXN0czIoXG4gICAgICAgICAgY3JlZGVudGlhbHMsIFVSSV9ESVNBTExPV0VEX0lOX1NDSEVNRV9PUl9DUkVERU5USUFMU18pLFxuICAgICAgZW5jb2RlSWZFeGlzdHMoZG9tYWluKSxcbiAgICAgIHBvcnQgPiAwID8gcG9ydC50b1N0cmluZygpIDogbnVsbCxcbiAgICAgIGVuY29kZUlmRXhpc3RzMihwYXRoLCBVUklfRElTQUxMT1dFRF9JTl9QQVRIXyksXG4gICAgICBudWxsLFxuICAgICAgZW5jb2RlSWZFeGlzdHMoZnJhZ21lbnQpKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcXVlcnkpIHtcbiAgICAgIHVyaS5zZXRSYXdRdWVyeShxdWVyeS5yZXBsYWNlKC9bXj8mPTAtOUEtWmEtel9cXC1+LiVdL2csIGVuY29kZU9uZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmkuc2V0QWxsUGFyYW1ldGVycyhxdWVyeSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmk7XG59XG5mdW5jdGlvbiBlbmNvZGVJZkV4aXN0cyh1bmVzY2FwZWRQYXJ0KSB7XG4gIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgdW5lc2NhcGVkUGFydCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodW5lc2NhcGVkUGFydCk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuLyoqXG4gKiBpZiB1bmVzY2FwZWRQYXJ0IGlzIG5vbiBudWxsLCB0aGVuIGVzY2FwZXMgYW55IGNoYXJhY3RlcnMgaW4gaXQgdGhhdCBhcmVuJ3RcbiAqIHZhbGlkIGNoYXJhY3RlcnMgaW4gYSB1cmwgYW5kIGFsc28gZXNjYXBlcyBhbnkgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXRcbiAqIGFwcGVhciBpbiBleHRyYS5cbiAqXG4gKiBAcGFyYW0gdW5lc2NhcGVkUGFydCB7c3RyaW5nfVxuICogQHBhcmFtIGV4dHJhIHtSZWdFeHB9IGEgY2hhcmFjdGVyIHNldCBvZiBjaGFyYWN0ZXJzIGluIFtcXDAxLVxcMTc3XS5cbiAqIEByZXR1cm4ge3N0cmluZ3xudWxsfSBudWxsIGlmZiB1bmVzY2FwZWRQYXJ0ID09IG51bGwuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZUlmRXhpc3RzMih1bmVzY2FwZWRQYXJ0LCBleHRyYSkge1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHVuZXNjYXBlZFBhcnQpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJKHVuZXNjYXBlZFBhcnQpLnJlcGxhY2UoZXh0cmEsIGVuY29kZU9uZSk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuLyoqIGNvbnZlcnRzIGEgY2hhcmFjdGVyIGluIFtcXDAxLVxcMTc3XSB0byBpdHMgdXJsIGVuY29kZWQgZXF1aXZhbGVudC4gKi9cbmZ1bmN0aW9uIGVuY29kZU9uZShjaCkge1xuICB2YXIgbiA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gIHJldHVybiAnJScgKyAnMDEyMzQ1Njc4OUFCQ0RFRicuY2hhckF0KChuID4+IDQpICYgMHhmKSArXG4gICAgICAnMDEyMzQ1Njc4OUFCQ0RFRicuY2hhckF0KG4gJiAweGYpO1xufVxuXG4vKipcbiAqIHtAdXBkb2NcbiAqICAkIG5vcm1QYXRoKCdmb28vLi9iYXInKVxuICogICMgJ2Zvby9iYXInXG4gKiAgJCBub3JtUGF0aCgnLi9mb28nKVxuICogICMgJ2ZvbydcbiAqICAkIG5vcm1QYXRoKCdmb28vLicpXG4gKiAgIyAnZm9vJ1xuICogICQgbm9ybVBhdGgoJ2Zvby8vYmFyJylcbiAqICAjICdmb28vYmFyJ1xuICogfVxuICovXG5mdW5jdGlvbiBub3JtUGF0aChwYXRoKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoLyhefFxcLylcXC4oPzpcXC98JCkvZywgJyQxJykucmVwbGFjZSgvXFwvezIsfS9nLCAnLycpO1xufVxuXG52YXIgUEFSRU5UX0RJUkVDVE9SWV9IQU5ETEVSID0gbmV3IFJlZ0V4cChcbiAgICAnJ1xuICAgIC8vIEEgcGF0aCBicmVha1xuICAgICsgJygvfF4pJ1xuICAgIC8vIGZvbGxvd2VkIGJ5IGEgbm9uIC4uIHBhdGggZWxlbWVudFxuICAgIC8vIChjYW5ub3QgYmUgLiBiZWNhdXNlIG5vcm1QYXRoIGlzIHVzZWQgcHJpb3IgdG8gdGhpcyBSZWdFeHApXG4gICAgKyAnKD86W14uL11bXi9dKnxcXFxcLnsyLH0oPzpbXi4vXVteL10qKXxcXFxcLnszLH1bXi9dKiknXG4gICAgLy8gZm9sbG93ZWQgYnkgLi4gZm9sbG93ZWQgYnkgYSBwYXRoIGJyZWFrLlxuICAgICsgJy9cXFxcLlxcXFwuKD86L3wkKScpO1xuXG52YXIgUEFSRU5UX0RJUkVDVE9SWV9IQU5ETEVSX1JFID0gbmV3IFJlZ0V4cChQQVJFTlRfRElSRUNUT1JZX0hBTkRMRVIpO1xuXG52YXIgRVhUUkFfUEFSRU5UX1BBVEhTX1JFID0gL14oPzpcXC5cXC5cXC8pKig/OlxcLlxcLiQpPy87XG5cbi8qKlxuICogTm9ybWFsaXplcyBpdHMgaW5wdXQgcGF0aCBhbmQgY29sbGFwc2VzIGFsbCAuIGFuZCAuLiBzZXF1ZW5jZXMgZXhjZXB0IGZvclxuICogLi4gc2VxdWVuY2VzIHRoYXQgd291bGQgdGFrZSBpdCBhYm92ZSB0aGUgcm9vdCBvZiB0aGUgY3VycmVudCBwYXJlbnRcbiAqIGRpcmVjdG9yeS5cbiAqIHtAdXBkb2NcbiAqICAkIGNvbGxhcHNlX2RvdHMoJ2Zvby8uLi9iYXInKVxuICogICMgJ2JhcidcbiAqICAkIGNvbGxhcHNlX2RvdHMoJ2Zvby8uL2JhcicpXG4gKiAgIyAnZm9vL2JhcidcbiAqICAkIGNvbGxhcHNlX2RvdHMoJ2Zvby8uLi9iYXIvLi8uLi8uLi9iYXonKVxuICogICMgJ2JheidcbiAqICAkIGNvbGxhcHNlX2RvdHMoJy4uL2ZvbycpXG4gKiAgIyAnLi4vZm9vJ1xuICogICQgY29sbGFwc2VfZG90cygnLi4vZm9vJykucmVwbGFjZShFWFRSQV9QQVJFTlRfUEFUSFNfUkUsICcnKVxuICogICMgJ2ZvbydcbiAqIH1cbiAqL1xuZnVuY3Rpb24gY29sbGFwc2VfZG90cyhwYXRoKSB7XG4gIGlmIChwYXRoID09PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gIHZhciBwID0gbm9ybVBhdGgocGF0aCk7XG4gIC8vIE9ubHkgLy4uLyBsZWZ0IHRvIGZsYXR0ZW5cbiAgdmFyIHIgPSBQQVJFTlRfRElSRUNUT1JZX0hBTkRMRVJfUkU7XG4gIC8vIFdlIHJlcGxhY2Ugd2l0aCAkMSB3aGljaCBtYXRjaGVzIGEgLyBiZWZvcmUgdGhlIC4uIGJlY2F1c2UgdGhpc1xuICAvLyBndWFyYW50ZWVzIHRoYXQ6XG4gIC8vICgxKSB3ZSBoYXZlIGF0IG1vc3QgMSAvIGJldHdlZW4gdGhlIGFkamFjZW50IHBsYWNlLFxuICAvLyAoMikgYWx3YXlzIGhhdmUgYSBzbGFzaCBpZiB0aGVyZSBpcyBhIHByZWNlZGluZyBwYXRoIHNlY3Rpb24sIGFuZFxuICAvLyAoMykgd2UgbmV2ZXIgdHVybiBhIHJlbGF0aXZlIHBhdGggaW50byBhbiBhYnNvbHV0ZSBwYXRoLlxuICBmb3IgKHZhciBxOyAocSA9IHAucmVwbGFjZShyLCAnJDEnKSkgIT0gcDsgcCA9IHEpIHt9O1xuICByZXR1cm4gcDtcbn1cblxuLyoqXG4gKiByZXNvbHZlcyBhIHJlbGF0aXZlIHVybCBzdHJpbmcgdG8gYSBiYXNlIHVyaS5cbiAqIEByZXR1cm4ge1VSSX1cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZShiYXNlVXJpLCByZWxhdGl2ZVVyaSkge1xuICAvLyB0aGVyZSBhcmUgc2V2ZXJhbCBraW5kcyBvZiByZWxhdGl2ZSB1cmxzOlxuICAvLyAxLiAvL2ZvbyAtIHJlcGxhY2VzIGV2ZXJ5dGhpbmcgZnJvbSB0aGUgZG9tYWluIG9uLiAgZm9vIGlzIGEgZG9tYWluIG5hbWVcbiAgLy8gMi4gZm9vIC0gcmVwbGFjZXMgdGhlIGxhc3QgcGFydCBvZiB0aGUgcGF0aCwgdGhlIHdob2xlIHF1ZXJ5IGFuZCBmcmFnbWVudFxuICAvLyAzLiAvZm9vIC0gcmVwbGFjZXMgdGhlIHRoZSBwYXRoLCB0aGUgcXVlcnkgYW5kIGZyYWdtZW50XG4gIC8vIDQuID9mb28gLSByZXBsYWNlIHRoZSBxdWVyeSBhbmQgZnJhZ21lbnRcbiAgLy8gNS4gI2ZvbyAtIHJlcGxhY2UgdGhlIGZyYWdtZW50IG9ubHlcblxuICB2YXIgYWJzb2x1dGVVcmkgPSBiYXNlVXJpLmNsb25lKCk7XG4gIC8vIHdlIHNhdGlzZnkgdGhlc2UgY29uZGl0aW9ucyBieSBsb29raW5nIGZvciB0aGUgZmlyc3QgcGFydCBvZiByZWxhdGl2ZVVyaVxuICAvLyB0aGF0IGlzIG5vdCBibGFuayBhbmQgYXBwbHlpbmcgZGVmYXVsdHMgdG8gdGhlIHJlc3RcblxuICB2YXIgb3ZlcnJpZGRlbiA9IHJlbGF0aXZlVXJpLmhhc1NjaGVtZSgpO1xuXG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UmF3U2NoZW1lKHJlbGF0aXZlVXJpLmdldFJhd1NjaGVtZSgpKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVycmlkZGVuID0gcmVsYXRpdmVVcmkuaGFzQ3JlZGVudGlhbHMoKTtcbiAgfVxuXG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UmF3Q3JlZGVudGlhbHMocmVsYXRpdmVVcmkuZ2V0UmF3Q3JlZGVudGlhbHMoKSk7XG4gIH0gZWxzZSB7XG4gICAgb3ZlcnJpZGRlbiA9IHJlbGF0aXZlVXJpLmhhc0RvbWFpbigpO1xuICB9XG5cbiAgaWYgKG92ZXJyaWRkZW4pIHtcbiAgICBhYnNvbHV0ZVVyaS5zZXRSYXdEb21haW4ocmVsYXRpdmVVcmkuZ2V0UmF3RG9tYWluKCkpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJyaWRkZW4gPSByZWxhdGl2ZVVyaS5oYXNQb3J0KCk7XG4gIH1cblxuICB2YXIgcmF3UGF0aCA9IHJlbGF0aXZlVXJpLmdldFJhd1BhdGgoKTtcbiAgdmFyIHNpbXBsaWZpZWRQYXRoID0gY29sbGFwc2VfZG90cyhyYXdQYXRoKTtcbiAgaWYgKG92ZXJyaWRkZW4pIHtcbiAgICBhYnNvbHV0ZVVyaS5zZXRQb3J0KHJlbGF0aXZlVXJpLmdldFBvcnQoKSk7XG4gICAgc2ltcGxpZmllZFBhdGggPSBzaW1wbGlmaWVkUGF0aFxuICAgICAgICAmJiBzaW1wbGlmaWVkUGF0aC5yZXBsYWNlKEVYVFJBX1BBUkVOVF9QQVRIU19SRSwgJycpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJyaWRkZW4gPSAhIXJhd1BhdGg7XG4gICAgaWYgKG92ZXJyaWRkZW4pIHtcbiAgICAgIC8vIHJlc29sdmUgcGF0aCBwcm9wZXJseVxuICAgICAgaWYgKHNpbXBsaWZpZWRQYXRoLmNoYXJDb2RlQXQoMCkgIT09IDB4MmYgLyogLyAqLykgeyAgLy8gcGF0aCBpcyByZWxhdGl2ZVxuICAgICAgICB2YXIgYWJzUmF3UGF0aCA9IGNvbGxhcHNlX2RvdHMoYWJzb2x1dGVVcmkuZ2V0UmF3UGF0aCgpIHx8ICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVhUUkFfUEFSRU5UX1BBVEhTX1JFLCAnJyk7XG4gICAgICAgIHZhciBzbGFzaCA9IGFic1Jhd1BhdGgubGFzdEluZGV4T2YoJy8nKSArIDE7XG4gICAgICAgIHNpbXBsaWZpZWRQYXRoID0gY29sbGFwc2VfZG90cyhcbiAgICAgICAgICAgIChzbGFzaCA/IGFic1Jhd1BhdGguc3Vic3RyaW5nKDAsIHNsYXNoKSA6ICcnKVxuICAgICAgICAgICAgKyBjb2xsYXBzZV9kb3RzKHJhd1BhdGgpKVxuICAgICAgICAgICAgLnJlcGxhY2UoRVhUUkFfUEFSRU5UX1BBVEhTX1JFLCAnJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpbXBsaWZpZWRQYXRoID0gc2ltcGxpZmllZFBhdGhcbiAgICAgICAgICAmJiBzaW1wbGlmaWVkUGF0aC5yZXBsYWNlKEVYVFJBX1BBUkVOVF9QQVRIU19SRSwgJycpO1xuICAgICAgaWYgKHNpbXBsaWZpZWRQYXRoICE9PSByYXdQYXRoKSB7XG4gICAgICAgIGFic29sdXRlVXJpLnNldFJhd1BhdGgoc2ltcGxpZmllZFBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvdmVycmlkZGVuKSB7XG4gICAgYWJzb2x1dGVVcmkuc2V0UmF3UGF0aChzaW1wbGlmaWVkUGF0aCk7XG4gIH0gZWxzZSB7XG4gICAgb3ZlcnJpZGRlbiA9IHJlbGF0aXZlVXJpLmhhc1F1ZXJ5KCk7XG4gIH1cblxuICBpZiAob3ZlcnJpZGRlbikge1xuICAgIGFic29sdXRlVXJpLnNldFJhd1F1ZXJ5KHJlbGF0aXZlVXJpLmdldFJhd1F1ZXJ5KCkpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJyaWRkZW4gPSByZWxhdGl2ZVVyaS5oYXNGcmFnbWVudCgpO1xuICB9XG5cbiAgaWYgKG92ZXJyaWRkZW4pIHtcbiAgICBhYnNvbHV0ZVVyaS5zZXRSYXdGcmFnbWVudChyZWxhdGl2ZVVyaS5nZXRSYXdGcmFnbWVudCgpKTtcbiAgfVxuXG4gIHJldHVybiBhYnNvbHV0ZVVyaTtcbn1cblxuLyoqXG4gKiBhIG11dGFibGUgVVJJLlxuICpcbiAqIFRoaXMgY2xhc3MgY29udGFpbnMgc2V0dGVycyBhbmQgZ2V0dGVycyBmb3IgdGhlIHBhcnRzIG9mIHRoZSBVUkkuXG4gKiBUaGUgPHR0PmdldFhZWjwvdHQ+Lzx0dD5zZXRYWVo8L3R0PiBtZXRob2RzIHJldHVybiB0aGUgZGVjb2RlZCBwYXJ0IC0tIHNvXG4gKiA8Y29kZT51cmkucGFyc2UoJy9mb28lMjBiYXInKS5nZXRQYXRoKCk8L2NvZGU+IHdpbGwgcmV0dXJuIHRoZSBkZWNvZGVkIHBhdGgsXG4gKiA8dHQ+L2ZvbyBiYXI8L3R0Pi5cbiAqXG4gKiA8cD5UaGUgcmF3IHZlcnNpb25zIG9mIGZpZWxkcyBhcmUgYXZhaWxhYmxlIHRvby5cbiAqIDxjb2RlPnVyaS5wYXJzZSgnL2ZvbyUyMGJhcicpLmdldFJhd1BhdGgoKTwvY29kZT4gd2lsbCByZXR1cm4gdGhlIHJhdyBwYXRoLFxuICogPHR0Pi9mb28lMjBiYXI8L3R0Pi4gIFVzZSB0aGUgcmF3IHNldHRlcnMgd2l0aCBjYXJlLCBzaW5jZVxuICogPGNvZGU+VVJJOjp0b1N0cmluZzwvY29kZT4gaXMgbm90IGd1YXJhbnRlZWQgdG8gcmV0dXJuIGEgdmFsaWQgdXJsIGlmIGFcbiAqIHJhdyBzZXR0ZXIgd2FzIHVzZWQuXG4gKlxuICogPHA+QWxsIHNldHRlcnMgcmV0dXJuIDx0dD50aGlzPC90dD4gYW5kIHNvIG1heSBiZSBjaGFpbmVkLCBhIGxhXG4gKiA8Y29kZT51cmkucGFyc2UoJy9mb28nKS5zZXRGcmFnbWVudCgncGFydCcpLnRvU3RyaW5nKCk8L2NvZGU+LlxuICpcbiAqIDxwPllvdSBzaG91bGQgbm90IHVzZSB0aGlzIGNvbnN0cnVjdG9yIGRpcmVjdGx5IC0tIHBsZWFzZSBwcmVmZXIgdGhlIGZhY3RvcnlcbiAqIGZ1bmN0aW9ucyB7QGxpbmsgdXJpLnBhcnNlfSwge0BsaW5rIHVyaS5jcmVhdGV9LCB7QGxpbmsgdXJpLnJlc29sdmV9XG4gKiBpbnN0ZWFkLjwvcD5cbiAqXG4gKiA8cD5UaGUgcGFyYW1ldGVycyBhcmUgYWxsIHJhdyAoYXNzdW1lZCB0byBiZSBwcm9wZXJseSBlc2NhcGVkKSBwYXJ0cywgYW5kXG4gKiBhbnkgKGJ1dCBub3QgYWxsKSBtYXkgYmUgbnVsbC4gIFVuZGVmaW5lZCBpcyBub3QgYWxsb3dlZC48L3A+XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVSSShcbiAgICByYXdTY2hlbWUsXG4gICAgcmF3Q3JlZGVudGlhbHMsIHJhd0RvbWFpbiwgcG9ydCxcbiAgICByYXdQYXRoLCByYXdRdWVyeSwgcmF3RnJhZ21lbnQpIHtcbiAgdGhpcy5zY2hlbWVfID0gcmF3U2NoZW1lO1xuICB0aGlzLmNyZWRlbnRpYWxzXyA9IHJhd0NyZWRlbnRpYWxzO1xuICB0aGlzLmRvbWFpbl8gPSByYXdEb21haW47XG4gIHRoaXMucG9ydF8gPSBwb3J0O1xuICB0aGlzLnBhdGhfID0gcmF3UGF0aDtcbiAgdGhpcy5xdWVyeV8gPSByYXdRdWVyeTtcbiAgdGhpcy5mcmFnbWVudF8gPSByYXdGcmFnbWVudDtcbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheXxudWxsfVxuICAgKi9cbiAgdGhpcy5wYXJhbUNhY2hlXyA9IG51bGw7XG59XG5cbi8qKiByZXR1cm5zIHRoZSBzdHJpbmcgZm9ybSBvZiB0aGUgdXJsLiAqL1xuVVJJLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdO1xuICBpZiAobnVsbCAhPT0gdGhpcy5zY2hlbWVfKSB7IG91dC5wdXNoKHRoaXMuc2NoZW1lXywgJzonKTsgfVxuICBpZiAobnVsbCAhPT0gdGhpcy5kb21haW5fKSB7XG4gICAgb3V0LnB1c2goJy8vJyk7XG4gICAgaWYgKG51bGwgIT09IHRoaXMuY3JlZGVudGlhbHNfKSB7IG91dC5wdXNoKHRoaXMuY3JlZGVudGlhbHNfLCAnQCcpOyB9XG4gICAgb3V0LnB1c2godGhpcy5kb21haW5fKTtcbiAgICBpZiAobnVsbCAhPT0gdGhpcy5wb3J0XykgeyBvdXQucHVzaCgnOicsIHRoaXMucG9ydF8udG9TdHJpbmcoKSk7IH1cbiAgfVxuICBpZiAobnVsbCAhPT0gdGhpcy5wYXRoXykgeyBvdXQucHVzaCh0aGlzLnBhdGhfKTsgfVxuICBpZiAobnVsbCAhPT0gdGhpcy5xdWVyeV8pIHsgb3V0LnB1c2goJz8nLCB0aGlzLnF1ZXJ5Xyk7IH1cbiAgaWYgKG51bGwgIT09IHRoaXMuZnJhZ21lbnRfKSB7IG91dC5wdXNoKCcjJywgdGhpcy5mcmFnbWVudF8pOyB9XG4gIHJldHVybiBvdXQuam9pbignJyk7XG59O1xuXG5VUkkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IFVSSSh0aGlzLnNjaGVtZV8sIHRoaXMuY3JlZGVudGlhbHNfLCB0aGlzLmRvbWFpbl8sIHRoaXMucG9ydF8sXG4gICAgICAgICAgICAgICAgIHRoaXMucGF0aF8sIHRoaXMucXVlcnlfLCB0aGlzLmZyYWdtZW50Xyk7XG59O1xuXG5VUkkucHJvdG90eXBlLmdldFNjaGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gSFRNTDUgc3BlYyBkb2VzIG5vdCByZXF1aXJlIHRoZSBzY2hlbWUgdG8gYmUgbG93ZXJjYXNlZCBidXRcbiAgLy8gYWxsIGNvbW1vbiBicm93c2VycyBleGNlcHQgU2FmYXJpIGxvd2VyY2FzZSB0aGUgc2NoZW1lLlxuICByZXR1cm4gdGhpcy5zY2hlbWVfICYmIGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnNjaGVtZV8pLnRvTG93ZXJDYXNlKCk7XG59O1xuVVJJLnByb3RvdHlwZS5nZXRSYXdTY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNjaGVtZV87XG59O1xuVVJJLnByb3RvdHlwZS5zZXRTY2hlbWUgPSBmdW5jdGlvbiAobmV3U2NoZW1lKSB7XG4gIHRoaXMuc2NoZW1lXyA9IGVuY29kZUlmRXhpc3RzMihcbiAgICAgIG5ld1NjaGVtZSwgVVJJX0RJU0FMTE9XRURfSU5fU0NIRU1FX09SX0NSRURFTlRJQUxTXyk7XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UmF3U2NoZW1lID0gZnVuY3Rpb24gKG5ld1NjaGVtZSkge1xuICB0aGlzLnNjaGVtZV8gPSBuZXdTY2hlbWUgPyBuZXdTY2hlbWUgOiBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc1NjaGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG51bGwgIT09IHRoaXMuc2NoZW1lXztcbn07XG5cblxuVVJJLnByb3RvdHlwZS5nZXRDcmVkZW50aWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbHNfICYmIGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLmNyZWRlbnRpYWxzXyk7XG59O1xuVVJJLnByb3RvdHlwZS5nZXRSYXdDcmVkZW50aWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbHNfO1xufTtcblVSSS5wcm90b3R5cGUuc2V0Q3JlZGVudGlhbHMgPSBmdW5jdGlvbiAobmV3Q3JlZGVudGlhbHMpIHtcbiAgdGhpcy5jcmVkZW50aWFsc18gPSBlbmNvZGVJZkV4aXN0czIoXG4gICAgICBuZXdDcmVkZW50aWFscywgVVJJX0RJU0FMTE9XRURfSU5fU0NIRU1FX09SX0NSRURFTlRJQUxTXyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5zZXRSYXdDcmVkZW50aWFscyA9IGZ1bmN0aW9uIChuZXdDcmVkZW50aWFscykge1xuICB0aGlzLmNyZWRlbnRpYWxzXyA9IG5ld0NyZWRlbnRpYWxzID8gbmV3Q3JlZGVudGlhbHMgOiBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc0NyZWRlbnRpYWxzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbnVsbCAhPT0gdGhpcy5jcmVkZW50aWFsc187XG59O1xuXG5cblVSSS5wcm90b3R5cGUuZ2V0RG9tYWluID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5kb21haW5fICYmIGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLmRvbWFpbl8pO1xufTtcblVSSS5wcm90b3R5cGUuZ2V0UmF3RG9tYWluID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5kb21haW5fO1xufTtcblVSSS5wcm90b3R5cGUuc2V0RG9tYWluID0gZnVuY3Rpb24gKG5ld0RvbWFpbikge1xuICByZXR1cm4gdGhpcy5zZXRSYXdEb21haW4obmV3RG9tYWluICYmIGVuY29kZVVSSUNvbXBvbmVudChuZXdEb21haW4pKTtcbn07XG5VUkkucHJvdG90eXBlLnNldFJhd0RvbWFpbiA9IGZ1bmN0aW9uIChuZXdEb21haW4pIHtcbiAgdGhpcy5kb21haW5fID0gbmV3RG9tYWluID8gbmV3RG9tYWluIDogbnVsbDtcbiAgLy8gTWFpbnRhaW4gdGhlIGludmFyaWFudCB0aGF0IHBhdGhzIG11c3Qgc3RhcnQgd2l0aCBhIHNsYXNoIHdoZW4gdGhlIFVSSVxuICAvLyBpcyBub3QgcGF0aC1yZWxhdGl2ZS5cbiAgcmV0dXJuIHRoaXMuc2V0UmF3UGF0aCh0aGlzLnBhdGhfKTtcbn07XG5VUkkucHJvdG90eXBlLmhhc0RvbWFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG51bGwgIT09IHRoaXMuZG9tYWluXztcbn07XG5cblxuVVJJLnByb3RvdHlwZS5nZXRQb3J0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wb3J0XyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5wb3J0Xyk7XG59O1xuVVJJLnByb3RvdHlwZS5zZXRQb3J0ID0gZnVuY3Rpb24gKG5ld1BvcnQpIHtcbiAgaWYgKG5ld1BvcnQpIHtcbiAgICBuZXdQb3J0ID0gTnVtYmVyKG5ld1BvcnQpO1xuICAgIGlmIChuZXdQb3J0ICE9PSAobmV3UG9ydCAmIDB4ZmZmZikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQmFkIHBvcnQgbnVtYmVyICcgKyBuZXdQb3J0KTtcbiAgICB9XG4gICAgdGhpcy5wb3J0XyA9ICcnICsgbmV3UG9ydDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnBvcnRfID0gbnVsbDtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc1BvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBudWxsICE9PSB0aGlzLnBvcnRfO1xufTtcblxuXG5VUkkucHJvdG90eXBlLmdldFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBhdGhfICYmIGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnBhdGhfKTtcbn07XG5VUkkucHJvdG90eXBlLmdldFJhd1BhdGggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBhdGhfO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UGF0aCA9IGZ1bmN0aW9uIChuZXdQYXRoKSB7XG4gIHJldHVybiB0aGlzLnNldFJhd1BhdGgoZW5jb2RlSWZFeGlzdHMyKG5ld1BhdGgsIFVSSV9ESVNBTExPV0VEX0lOX1BBVEhfKSk7XG59O1xuVVJJLnByb3RvdHlwZS5zZXRSYXdQYXRoID0gZnVuY3Rpb24gKG5ld1BhdGgpIHtcbiAgaWYgKG5ld1BhdGgpIHtcbiAgICBuZXdQYXRoID0gU3RyaW5nKG5ld1BhdGgpO1xuICAgIHRoaXMucGF0aF8gPSBcbiAgICAgIC8vIFBhdGhzIG11c3Qgc3RhcnQgd2l0aCAnLycgdW5sZXNzIHRoaXMgaXMgYSBwYXRoLXJlbGF0aXZlIFVSTC5cbiAgICAgICghdGhpcy5kb21haW5fIHx8IC9eXFwvLy50ZXN0KG5ld1BhdGgpKSA/IG5ld1BhdGggOiAnLycgKyBuZXdQYXRoO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGF0aF8gPSBudWxsO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuaGFzUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG51bGwgIT09IHRoaXMucGF0aF87XG59O1xuXG5cblVSSS5wcm90b3R5cGUuZ2V0UXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIEZyb20gaHR0cDovL3d3dy53My5vcmcvQWRkcmVzc2luZy9VUkwvNF9VUklfUmVjb21tZW50YXRpb25zLmh0bWxcbiAgLy8gV2l0aGluIHRoZSBxdWVyeSBzdHJpbmcsIHRoZSBwbHVzIHNpZ24gaXMgcmVzZXJ2ZWQgYXMgc2hvcnRoYW5kIG5vdGF0aW9uXG4gIC8vIGZvciBhIHNwYWNlLlxuICByZXR1cm4gdGhpcy5xdWVyeV8gJiYgZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMucXVlcnlfKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbn07XG5VUkkucHJvdG90eXBlLmdldFJhd1F1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5xdWVyeV87XG59O1xuVVJJLnByb3RvdHlwZS5zZXRRdWVyeSA9IGZ1bmN0aW9uIChuZXdRdWVyeSkge1xuICB0aGlzLnBhcmFtQ2FjaGVfID0gbnVsbDtcbiAgdGhpcy5xdWVyeV8gPSBlbmNvZGVJZkV4aXN0cyhuZXdRdWVyeSk7XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuc2V0UmF3UXVlcnkgPSBmdW5jdGlvbiAobmV3UXVlcnkpIHtcbiAgdGhpcy5wYXJhbUNhY2hlXyA9IG51bGw7XG4gIHRoaXMucXVlcnlfID0gbmV3UXVlcnkgPyBuZXdRdWVyeSA6IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuaGFzUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBudWxsICE9PSB0aGlzLnF1ZXJ5Xztcbn07XG5cbi8qKlxuICogc2V0cyB0aGUgcXVlcnkgZ2l2ZW4gYSBsaXN0IG9mIHN0cmluZ3Mgb2YgdGhlIGZvcm1cbiAqIFsga2V5MCwgdmFsdWUwLCBrZXkxLCB2YWx1ZTEsIC4uLiBdLlxuICpcbiAqIDxwPjxjb2RlPnVyaS5zZXRBbGxQYXJhbWV0ZXJzKFsnYScsICdiJywgJ2MnLCAnZCddKS5nZXRRdWVyeSgpPC9jb2RlPlxuICogd2lsbCB5aWVsZCA8Y29kZT4nYT1iJmM9ZCc8L2NvZGU+LlxuICovXG5VUkkucHJvdG90eXBlLnNldEFsbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgIGlmICghKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAmJiAocGFyYW1zIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgICB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGFyYW1zKSAhPT0gJ1tvYmplY3QgQXJyYXldJykpIHtcbiAgICAgIHZhciBuZXdQYXJhbXMgPSBbXTtcbiAgICAgIHZhciBpID0gLTE7XG4gICAgICBmb3IgKHZhciBrIGluIHBhcmFtcykge1xuICAgICAgICB2YXIgdiA9IHBhcmFtc1trXTtcbiAgICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2Ygdikge1xuICAgICAgICAgIG5ld1BhcmFtc1srK2ldID0gaztcbiAgICAgICAgICBuZXdQYXJhbXNbKytpXSA9IHY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBhcmFtcyA9IG5ld1BhcmFtcztcbiAgICB9XG4gIH1cbiAgdGhpcy5wYXJhbUNhY2hlXyA9IG51bGw7XG4gIHZhciBxdWVyeUJ1ZiA9IFtdO1xuICB2YXIgc2VwYXJhdG9yID0gJyc7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFyYW1zLmxlbmd0aDspIHtcbiAgICB2YXIgayA9IHBhcmFtc1tqKytdO1xuICAgIHZhciB2ID0gcGFyYW1zW2orK107XG4gICAgcXVlcnlCdWYucHVzaChzZXBhcmF0b3IsIGVuY29kZVVSSUNvbXBvbmVudChrLnRvU3RyaW5nKCkpKTtcbiAgICBzZXBhcmF0b3IgPSAnJic7XG4gICAgaWYgKHYpIHtcbiAgICAgIHF1ZXJ5QnVmLnB1c2goJz0nLCBlbmNvZGVVUklDb21wb25lbnQodi50b1N0cmluZygpKSk7XG4gICAgfVxuICB9XG4gIHRoaXMucXVlcnlfID0gcXVlcnlCdWYuam9pbignJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblVSSS5wcm90b3R5cGUuY2hlY2tQYXJhbWV0ZXJDYWNoZV8gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5wYXJhbUNhY2hlXykge1xuICAgIHZhciBxID0gdGhpcy5xdWVyeV87XG4gICAgaWYgKCFxKSB7XG4gICAgICB0aGlzLnBhcmFtQ2FjaGVfID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjZ2lQYXJhbXMgPSBxLnNwbGl0KC9bJlxcP10vKTtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIHZhciBrID0gLTE7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNnaVBhcmFtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbSA9IGNnaVBhcmFtc1tpXS5tYXRjaCgvXihbXj1dKikoPzo9KC4qKSk/JC8pO1xuICAgICAgICAvLyBGcm9tIGh0dHA6Ly93d3cudzMub3JnL0FkZHJlc3NpbmcvVVJMLzRfVVJJX1JlY29tbWVudGF0aW9ucy5odG1sXG4gICAgICAgIC8vIFdpdGhpbiB0aGUgcXVlcnkgc3RyaW5nLCB0aGUgcGx1cyBzaWduIGlzIHJlc2VydmVkIGFzIHNob3J0aGFuZFxuICAgICAgICAvLyBub3RhdGlvbiBmb3IgYSBzcGFjZS5cbiAgICAgICAgb3V0Wysra10gPSBkZWNvZGVVUklDb21wb25lbnQobVsxXSkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgIG91dFsrK2tdID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0gfHwgJycpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbUNhY2hlXyA9IG91dDtcbiAgICB9XG4gIH1cbn07XG4vKipcbiAqIHNldHMgdGhlIHZhbHVlcyBvZiB0aGUgbmFtZWQgY2dpIHBhcmFtZXRlcnMuXG4gKlxuICogPHA+U28sIDxjb2RlPnVyaS5wYXJzZSgnZm9vP2E9YiZjPWQmZT1mJykuc2V0UGFyYW1ldGVyVmFsdWVzKCdjJywgWyduZXcnXSlcbiAqIDwvY29kZT4geWllbGRzIDx0dD5mb28/YT1iJmM9bmV3JmU9ZjwvdHQ+LjwvcD5cbiAqXG4gKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gKiBAcGFyYW0gdmFsdWVzIHtBcnJheS48c3RyaW5nPn0gdGhlIG5ldyB2YWx1ZXMuICBJZiB2YWx1ZXMgaXMgYSBzaW5nbGUgc3RyaW5nXG4gKiAgIHRoZW4gaXQgd2lsbCBiZSB0cmVhdGVkIGFzIHRoZSBzb2xlIHZhbHVlLlxuICovXG5VUkkucHJvdG90eXBlLnNldFBhcmFtZXRlclZhbHVlcyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlcykge1xuICAvLyBiZSBuaWNlIGFuZCBhdm9pZCBzdWJ0bGUgYnVncyB3aGVyZSBbXSBvcGVyYXRvciBvbiBzdHJpbmcgcGVyZm9ybXMgY2hhckF0XG4gIC8vIG9uIHNvbWUgYnJvd3NlcnMgYW5kIGNyYXNoZXMgb24gSUVcbiAgaWYgKHR5cGVvZiB2YWx1ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWVzID0gWyB2YWx1ZXMgXTtcbiAgfVxuXG4gIHRoaXMuY2hlY2tQYXJhbWV0ZXJDYWNoZV8oKTtcbiAgdmFyIG5ld1ZhbHVlSW5kZXggPSAwO1xuICB2YXIgcGMgPSB0aGlzLnBhcmFtQ2FjaGVfO1xuICB2YXIgcGFyYW1zID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBrID0gMDsgaSA8IHBjLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgaWYgKGtleSA9PT0gcGNbaV0pIHtcbiAgICAgIGlmIChuZXdWYWx1ZUluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucHVzaChrZXksIHZhbHVlc1tuZXdWYWx1ZUluZGV4KytdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLnB1c2gocGNbaV0sIHBjW2kgKyAxXSk7XG4gICAgfVxuICB9XG4gIHdoaWxlIChuZXdWYWx1ZUluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgIHBhcmFtcy5wdXNoKGtleSwgdmFsdWVzW25ld1ZhbHVlSW5kZXgrK10pO1xuICB9XG4gIHRoaXMuc2V0QWxsUGFyYW1ldGVycyhwYXJhbXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLnJlbW92ZVBhcmFtZXRlciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuc2V0UGFyYW1ldGVyVmFsdWVzKGtleSwgW10pO1xufTtcbi8qKlxuICogcmV0dXJucyB0aGUgcGFyYW1ldGVycyBzcGVjaWZpZWQgaW4gdGhlIHF1ZXJ5IHBhcnQgb2YgdGhlIHVyaSBhcyBhIGxpc3Qgb2ZcbiAqIGtleXMgYW5kIHZhbHVlcyBsaWtlIFsga2V5MCwgdmFsdWUwLCBrZXkxLCB2YWx1ZTEsIC4uLiBdLlxuICpcbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fVxuICovXG5VUkkucHJvdG90eXBlLmdldEFsbFBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2hlY2tQYXJhbWV0ZXJDYWNoZV8oKTtcbiAgcmV0dXJuIHRoaXMucGFyYW1DYWNoZV8uc2xpY2UoMCwgdGhpcy5wYXJhbUNhY2hlXy5sZW5ndGgpO1xufTtcbi8qKlxuICogcmV0dXJucyB0aGUgdmFsdWU8Yj5zPC9iPiBmb3IgYSBnaXZlbiBjZ2kgcGFyYW1ldGVyIGFzIGEgbGlzdCBvZiBkZWNvZGVkXG4gKiBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzLlxuICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59XG4gKi9cblVSSS5wcm90b3R5cGUuZ2V0UGFyYW1ldGVyVmFsdWVzID0gZnVuY3Rpb24gKHBhcmFtTmFtZVVuZXNjYXBlZCkge1xuICB0aGlzLmNoZWNrUGFyYW1ldGVyQ2FjaGVfKCk7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcmFtQ2FjaGVfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgaWYgKHBhcmFtTmFtZVVuZXNjYXBlZCA9PT0gdGhpcy5wYXJhbUNhY2hlX1tpXSkge1xuICAgICAgdmFsdWVzLnB1c2godGhpcy5wYXJhbUNhY2hlX1tpICsgMV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufTtcbi8qKlxuICogcmV0dXJucyBhIG1hcCBvZiBjZ2kgcGFyYW1ldGVyIG5hbWVzIHRvIChub24tZW1wdHkpIGxpc3RzIG9mIHZhbHVlcy5cbiAqIEByZXR1cm4ge09iamVjdC48c3RyaW5nLEFycmF5LjxzdHJpbmc+Pn1cbiAqL1xuVVJJLnByb3RvdHlwZS5nZXRQYXJhbWV0ZXJNYXAgPSBmdW5jdGlvbiAocGFyYW1OYW1lVW5lc2NhcGVkKSB7XG4gIHRoaXMuY2hlY2tQYXJhbWV0ZXJDYWNoZV8oKTtcbiAgdmFyIHBhcmFtTWFwID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXJhbUNhY2hlXy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBrZXkgPSB0aGlzLnBhcmFtQ2FjaGVfW2krK10sXG4gICAgICB2YWx1ZSA9IHRoaXMucGFyYW1DYWNoZV9baSsrXTtcbiAgICBpZiAoIShrZXkgaW4gcGFyYW1NYXApKSB7XG4gICAgICBwYXJhbU1hcFtrZXldID0gW3ZhbHVlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1NYXBba2V5XS5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhcmFtTWFwO1xufTtcbi8qKlxuICogcmV0dXJucyB0aGUgZmlyc3QgdmFsdWUgZm9yIGEgZ2l2ZW4gY2dpIHBhcmFtZXRlciBvciBudWxsIGlmIHRoZSBnaXZlblxuICogcGFyYW1ldGVyIG5hbWUgZG9lcyBub3QgYXBwZWFyIGluIHRoZSBxdWVyeSBzdHJpbmcuXG4gKiBJZiB0aGUgZ2l2ZW4gcGFyYW1ldGVyIG5hbWUgZG9lcyBhcHBlYXIsIGJ1dCBoYXMgbm8gJzx0dD49PC90dD4nIGZvbGxvd2luZ1xuICogaXQsIHRoZW4gdGhlIGVtcHR5IHN0cmluZyB3aWxsIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7c3RyaW5nfG51bGx9XG4gKi9cblVSSS5wcm90b3R5cGUuZ2V0UGFyYW1ldGVyVmFsdWUgPSBmdW5jdGlvbiAocGFyYW1OYW1lVW5lc2NhcGVkKSB7XG4gIHRoaXMuY2hlY2tQYXJhbWV0ZXJDYWNoZV8oKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhcmFtQ2FjaGVfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgaWYgKHBhcmFtTmFtZVVuZXNjYXBlZCA9PT0gdGhpcy5wYXJhbUNhY2hlX1tpXSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1DYWNoZV9baSArIDFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cblVSSS5wcm90b3R5cGUuZ2V0RnJhZ21lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmZyYWdtZW50XyAmJiBkZWNvZGVVUklDb21wb25lbnQodGhpcy5mcmFnbWVudF8pO1xufTtcblVSSS5wcm90b3R5cGUuZ2V0UmF3RnJhZ21lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmZyYWdtZW50Xztcbn07XG5VUkkucHJvdG90eXBlLnNldEZyYWdtZW50ID0gZnVuY3Rpb24gKG5ld0ZyYWdtZW50KSB7XG4gIHRoaXMuZnJhZ21lbnRfID0gbmV3RnJhZ21lbnQgPyBlbmNvZGVVUklDb21wb25lbnQobmV3RnJhZ21lbnQpIDogbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuVVJJLnByb3RvdHlwZS5zZXRSYXdGcmFnbWVudCA9IGZ1bmN0aW9uIChuZXdGcmFnbWVudCkge1xuICB0aGlzLmZyYWdtZW50XyA9IG5ld0ZyYWdtZW50ID8gbmV3RnJhZ21lbnQgOiBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5VUkkucHJvdG90eXBlLmhhc0ZyYWdtZW50ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbnVsbCAhPT0gdGhpcy5mcmFnbWVudF87XG59O1xuXG5mdW5jdGlvbiBudWxsSWZBYnNlbnQobWF0Y2hQYXJ0KSB7XG4gIHJldHVybiAoJ3N0cmluZycgPT0gdHlwZW9mIG1hdGNoUGFydCkgJiYgKG1hdGNoUGFydC5sZW5ndGggPiAwKVxuICAgICAgICAgPyBtYXRjaFBhcnRcbiAgICAgICAgIDogbnVsbDtcbn1cblxuXG5cblxuLyoqXG4gKiBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgYnJlYWtpbmcgYSBVUkkgaW50byBpdHMgY29tcG9uZW50IHBhcnRzLlxuICpcbiAqIDxwPmh0dHA6Ly93d3cuZ2Jpdi5jb20vcHJvdG9jb2xzL3VyaS9yZmMvcmZjMzk4Ni5odG1sI1JGQzIyMzQgc2F5c1xuICogQXMgdGhlIFwiZmlyc3QtbWF0Y2gtd2luc1wiIGFsZ29yaXRobSBpcyBpZGVudGljYWwgdG8gdGhlIFwiZ3JlZWR5XCJcbiAqIGRpc2FtYmlndWF0aW9uIG1ldGhvZCB1c2VkIGJ5IFBPU0lYIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGl0IGlzIG5hdHVyYWwgYW5kXG4gKiBjb21tb25wbGFjZSB0byB1c2UgYSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIHBhcnNpbmcgdGhlIHBvdGVudGlhbCBmaXZlXG4gKiBjb21wb25lbnRzIG9mIGEgVVJJIHJlZmVyZW5jZS5cbiAqXG4gKiA8cD5UaGUgZm9sbG93aW5nIGxpbmUgaXMgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgYnJlYWtpbmctZG93biBhXG4gKiB3ZWxsLWZvcm1lZCBVUkkgcmVmZXJlbmNlIGludG8gaXRzIGNvbXBvbmVudHMuXG4gKlxuICogPHByZT5cbiAqIF4oKFteOi8/I10rKTopPygvLyhbXi8/I10qKSk/KFtePyNdKikoXFw/KFteI10qKSk/KCMoLiopKT9cbiAqICAxMiAgICAgICAgICAgIDMgIDQgICAgICAgICAgNSAgICAgICA2ICA3ICAgICAgICA4IDlcbiAqIDwvcHJlPlxuICpcbiAqIDxwPlRoZSBudW1iZXJzIGluIHRoZSBzZWNvbmQgbGluZSBhYm92ZSBhcmUgb25seSB0byBhc3Npc3QgcmVhZGFiaWxpdHk7IHRoZXlcbiAqIGluZGljYXRlIHRoZSByZWZlcmVuY2UgcG9pbnRzIGZvciBlYWNoIHN1YmV4cHJlc3Npb24gKGkuZS4sIGVhY2ggcGFpcmVkXG4gKiBwYXJlbnRoZXNpcykuIFdlIHJlZmVyIHRvIHRoZSB2YWx1ZSBtYXRjaGVkIGZvciBzdWJleHByZXNzaW9uIDxuPiBhcyAkPG4+LlxuICogRm9yIGV4YW1wbGUsIG1hdGNoaW5nIHRoZSBhYm92ZSBleHByZXNzaW9uIHRvXG4gKiA8cHJlPlxuICogICAgIGh0dHA6Ly93d3cuaWNzLnVjaS5lZHUvcHViL2lldGYvdXJpLyNSZWxhdGVkXG4gKiA8L3ByZT5cbiAqIHJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZyBzdWJleHByZXNzaW9uIG1hdGNoZXM6XG4gKiA8cHJlPlxuICogICAgJDEgPSBodHRwOlxuICogICAgJDIgPSBodHRwXG4gKiAgICAkMyA9IC8vd3d3Lmljcy51Y2kuZWR1XG4gKiAgICAkNCA9IHd3dy5pY3MudWNpLmVkdVxuICogICAgJDUgPSAvcHViL2lldGYvdXJpL1xuICogICAgJDYgPSA8dW5kZWZpbmVkPlxuICogICAgJDcgPSA8dW5kZWZpbmVkPlxuICogICAgJDggPSAjUmVsYXRlZFxuICogICAgJDkgPSBSZWxhdGVkXG4gKiA8L3ByZT5cbiAqIHdoZXJlIDx1bmRlZmluZWQ+IGluZGljYXRlcyB0aGF0IHRoZSBjb21wb25lbnQgaXMgbm90IHByZXNlbnQsIGFzIGlzIHRoZVxuICogY2FzZSBmb3IgdGhlIHF1ZXJ5IGNvbXBvbmVudCBpbiB0aGUgYWJvdmUgZXhhbXBsZS4gVGhlcmVmb3JlLCB3ZSBjYW5cbiAqIGRldGVybWluZSB0aGUgdmFsdWUgb2YgdGhlIGZpdmUgY29tcG9uZW50cyBhc1xuICogPHByZT5cbiAqICAgIHNjaGVtZSAgICA9ICQyXG4gKiAgICBhdXRob3JpdHkgPSAkNFxuICogICAgcGF0aCAgICAgID0gJDVcbiAqICAgIHF1ZXJ5ICAgICA9ICQ3XG4gKiAgICBmcmFnbWVudCAgPSAkOVxuICogPC9wcmU+XG4gKlxuICogPHA+bXNhbXVlbDogSSBoYXZlIG1vZGlmaWVkIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gc2xpZ2h0bHkgdG8gZXhwb3NlIHRoZVxuICogY3JlZGVudGlhbHMsIGRvbWFpbiwgYW5kIHBvcnQgc2VwYXJhdGVseSBmcm9tIHRoZSBhdXRob3JpdHkuXG4gKiBUaGUgbW9kaWZpZWQgdmVyc2lvbiB5aWVsZHNcbiAqIDxwcmU+XG4gKiAgICAkMSA9IGh0dHAgICAgICAgICAgICAgIHNjaGVtZVxuICogICAgJDIgPSA8dW5kZWZpbmVkPiAgICAgICBjcmVkZW50aWFscyAtXFxcbiAqICAgICQzID0gd3d3Lmljcy51Y2kuZWR1ICAgZG9tYWluICAgICAgIHwgYXV0aG9yaXR5XG4gKiAgICAkNCA9IDx1bmRlZmluZWQ+ICAgICAgIHBvcnQgICAgICAgIC0vXG4gKiAgICAkNSA9IC9wdWIvaWV0Zi91cmkvICAgIHBhdGhcbiAqICAgICQ2ID0gPHVuZGVmaW5lZD4gICAgICAgcXVlcnkgd2l0aG91dCA/XG4gKiAgICAkNyA9IFJlbGF0ZWQgICAgICAgICAgIGZyYWdtZW50IHdpdGhvdXQgI1xuICogPC9wcmU+XG4gKi9cbnZhciBVUklfUkVfID0gbmV3IFJlZ0V4cChcbiAgICAgIFwiXlwiICtcbiAgICAgIFwiKD86XCIgK1xuICAgICAgICBcIihbXjovPyNdKylcIiArICAgICAgICAgLy8gc2NoZW1lXG4gICAgICBcIjopP1wiICtcbiAgICAgIFwiKD86Ly9cIiArXG4gICAgICAgIFwiKD86KFteLz8jXSopQCk/XCIgKyAgICAvLyBjcmVkZW50aWFsc1xuICAgICAgICBcIihbXi8/IzpAXSopXCIgKyAgICAgICAgLy8gZG9tYWluXG4gICAgICAgIFwiKD86OihbMC05XSspKT9cIiArICAgICAvLyBwb3J0XG4gICAgICBcIik/XCIgK1xuICAgICAgXCIoW14/I10rKT9cIiArICAgICAgICAgICAgLy8gcGF0aFxuICAgICAgXCIoPzpcXFxcPyhbXiNdKikpP1wiICsgICAgICAvLyBxdWVyeVxuICAgICAgXCIoPzojKC4qKSk/XCIgKyAgICAgICAgICAgLy8gZnJhZ21lbnRcbiAgICAgIFwiJFwiXG4gICAgICApO1xuXG52YXIgVVJJX0RJU0FMTE9XRURfSU5fU0NIRU1FX09SX0NSRURFTlRJQUxTXyA9IC9bI1xcL1xcP0BdL2c7XG52YXIgVVJJX0RJU0FMTE9XRURfSU5fUEFUSF8gPSAvW1xcI1xcP10vZztcblxuVVJJLnBhcnNlID0gcGFyc2U7XG5VUkkuY3JlYXRlID0gY3JlYXRlO1xuVVJJLnJlc29sdmUgPSByZXNvbHZlO1xuVVJJLmNvbGxhcHNlX2RvdHMgPSBjb2xsYXBzZV9kb3RzOyAgLy8gVmlzaWJsZSBmb3IgdGVzdGluZy5cblxuLy8gbGlnaHR3ZWlnaHQgc3RyaW5nLWJhc2VkIGFwaSBmb3IgbG9hZE1vZHVsZU1ha2VyXG5VUkkudXRpbHMgPSB7XG4gIG1pbWVUeXBlT2Y6IGZ1bmN0aW9uICh1cmkpIHtcbiAgICB2YXIgdXJpT2JqID0gcGFyc2UodXJpKTtcbiAgICBpZiAoL1xcLmh0bWwkLy50ZXN0KHVyaU9iai5nZXRQYXRoKCkpKSB7XG4gICAgICByZXR1cm4gJ3RleHQvaHRtbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCc7XG4gICAgfVxuICB9LFxuICByZXNvbHZlOiBmdW5jdGlvbiAoYmFzZSwgdXJpKSB7XG4gICAgaWYgKGJhc2UpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKHBhcnNlKGJhc2UpLCBwYXJzZSh1cmkpKS50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJycgKyB1cmk7XG4gICAgfVxuICB9XG59O1xuXG5cbnJldHVybiBVUkk7XG59KSgpO1xuXG4vLyBDb3B5cmlnaHQgR29vZ2xlIEluYy5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5jZSBWZXJzaW9uIDIuMFxuLy8gQXV0b2dlbmVyYXRlZCBhdCBNb24gRmViIDI1IDEzOjA1OjQyIEVTVCAyMDEzXG4vLyBAb3ZlcnJpZGVzIHdpbmRvd1xuLy8gQHByb3ZpZGVzIGh0bWw0XG52YXIgaHRtbDQgPSB7fTtcbmh0bWw0LmF0eXBlID0ge1xuICAnTk9ORSc6IDAsXG4gICdVUkknOiAxLFxuICAnVVJJX0ZSQUdNRU5UJzogMTEsXG4gICdTQ1JJUFQnOiAyLFxuICAnU1RZTEUnOiAzLFxuICAnSFRNTCc6IDEyLFxuICAnSUQnOiA0LFxuICAnSURSRUYnOiA1LFxuICAnSURSRUZTJzogNixcbiAgJ0dMT0JBTF9OQU1FJzogNyxcbiAgJ0xPQ0FMX05BTUUnOiA4LFxuICAnQ0xBU1NFUyc6IDksXG4gICdGUkFNRV9UQVJHRVQnOiAxMCxcbiAgJ01FRElBX1FVRVJZJzogMTNcbn07XG5odG1sNFsgJ2F0eXBlJyBdID0gaHRtbDQuYXR5cGU7XG5odG1sNC5BVFRSSUJTID0ge1xuICAnKjo6Y2xhc3MnOiA5LFxuICAnKjo6ZGlyJzogMCxcbiAgJyo6OmRyYWdnYWJsZSc6IDAsXG4gICcqOjpoaWRkZW4nOiAwLFxuICAnKjo6aWQnOiA0LFxuICAnKjo6aW5lcnQnOiAwLFxuICAnKjo6aXRlbXByb3AnOiAwLFxuICAnKjo6aXRlbXJlZic6IDYsXG4gICcqOjppdGVtc2NvcGUnOiAwLFxuICAnKjo6bGFuZyc6IDAsXG4gICcqOjpvbmJsdXInOiAyLFxuICAnKjo6b25jaGFuZ2UnOiAyLFxuICAnKjo6b25jbGljayc6IDIsXG4gICcqOjpvbmRibGNsaWNrJzogMixcbiAgJyo6Om9uZm9jdXMnOiAyLFxuICAnKjo6b25rZXlkb3duJzogMixcbiAgJyo6Om9ua2V5cHJlc3MnOiAyLFxuICAnKjo6b25rZXl1cCc6IDIsXG4gICcqOjpvbmxvYWQnOiAyLFxuICAnKjo6b25tb3VzZWRvd24nOiAyLFxuICAnKjo6b25tb3VzZW1vdmUnOiAyLFxuICAnKjo6b25tb3VzZW91dCc6IDIsXG4gICcqOjpvbm1vdXNlb3Zlcic6IDIsXG4gICcqOjpvbm1vdXNldXAnOiAyLFxuICAnKjo6b25yZXNldCc6IDIsXG4gICcqOjpvbnNjcm9sbCc6IDIsXG4gICcqOjpvbnNlbGVjdCc6IDIsXG4gICcqOjpvbnN1Ym1pdCc6IDIsXG4gICcqOjpvbnVubG9hZCc6IDIsXG4gICcqOjpzcGVsbGNoZWNrJzogMCxcbiAgJyo6OnN0eWxlJzogMyxcbiAgJyo6OnRpdGxlJzogMCxcbiAgJyo6OnRyYW5zbGF0ZSc6IDAsXG4gICdhOjphY2Nlc3NrZXknOiAwLFxuICAnYTo6Y29vcmRzJzogMCxcbiAgJ2E6OmhyZWYnOiAxLFxuICAnYTo6aHJlZmxhbmcnOiAwLFxuICAnYTo6bmFtZSc6IDcsXG4gICdhOjpvbmJsdXInOiAyLFxuICAnYTo6b25mb2N1cyc6IDIsXG4gICdhOjpzaGFwZSc6IDAsXG4gICdhOjp0YWJpbmRleCc6IDAsXG4gICdhOjp0YXJnZXQnOiAxMCxcbiAgJ2E6OnR5cGUnOiAwLFxuICAnYXJlYTo6YWNjZXNza2V5JzogMCxcbiAgJ2FyZWE6OmFsdCc6IDAsXG4gICdhcmVhOjpjb29yZHMnOiAwLFxuICAnYXJlYTo6aHJlZic6IDEsXG4gICdhcmVhOjpub2hyZWYnOiAwLFxuICAnYXJlYTo6b25ibHVyJzogMixcbiAgJ2FyZWE6Om9uZm9jdXMnOiAyLFxuICAnYXJlYTo6c2hhcGUnOiAwLFxuICAnYXJlYTo6dGFiaW5kZXgnOiAwLFxuICAnYXJlYTo6dGFyZ2V0JzogMTAsXG4gICdhdWRpbzo6Y29udHJvbHMnOiAwLFxuICAnYXVkaW86Omxvb3AnOiAwLFxuICAnYXVkaW86Om1lZGlhZ3JvdXAnOiA1LFxuICAnYXVkaW86Om11dGVkJzogMCxcbiAgJ2F1ZGlvOjpwcmVsb2FkJzogMCxcbiAgJ2Jkbzo6ZGlyJzogMCxcbiAgJ2Jsb2NrcXVvdGU6OmNpdGUnOiAxLFxuICAnYnI6OmNsZWFyJzogMCxcbiAgJ2J1dHRvbjo6YWNjZXNza2V5JzogMCxcbiAgJ2J1dHRvbjo6ZGlzYWJsZWQnOiAwLFxuICAnYnV0dG9uOjpuYW1lJzogOCxcbiAgJ2J1dHRvbjo6b25ibHVyJzogMixcbiAgJ2J1dHRvbjo6b25mb2N1cyc6IDIsXG4gICdidXR0b246OnRhYmluZGV4JzogMCxcbiAgJ2J1dHRvbjo6dHlwZSc6IDAsXG4gICdidXR0b246OnZhbHVlJzogMCxcbiAgJ2NhbnZhczo6aGVpZ2h0JzogMCxcbiAgJ2NhbnZhczo6d2lkdGgnOiAwLFxuICAnY2FwdGlvbjo6YWxpZ24nOiAwLFxuICAnY29sOjphbGlnbic6IDAsXG4gICdjb2w6OmNoYXInOiAwLFxuICAnY29sOjpjaGFyb2ZmJzogMCxcbiAgJ2NvbDo6c3Bhbic6IDAsXG4gICdjb2w6OnZhbGlnbic6IDAsXG4gICdjb2w6OndpZHRoJzogMCxcbiAgJ2NvbGdyb3VwOjphbGlnbic6IDAsXG4gICdjb2xncm91cDo6Y2hhcic6IDAsXG4gICdjb2xncm91cDo6Y2hhcm9mZic6IDAsXG4gICdjb2xncm91cDo6c3Bhbic6IDAsXG4gICdjb2xncm91cDo6dmFsaWduJzogMCxcbiAgJ2NvbGdyb3VwOjp3aWR0aCc6IDAsXG4gICdjb21tYW5kOjpjaGVja2VkJzogMCxcbiAgJ2NvbW1hbmQ6OmNvbW1hbmQnOiA1LFxuICAnY29tbWFuZDo6ZGlzYWJsZWQnOiAwLFxuICAnY29tbWFuZDo6aWNvbic6IDEsXG4gICdjb21tYW5kOjpsYWJlbCc6IDAsXG4gICdjb21tYW5kOjpyYWRpb2dyb3VwJzogMCxcbiAgJ2NvbW1hbmQ6OnR5cGUnOiAwLFxuICAnZGF0YTo6dmFsdWUnOiAwLFxuICAnZGVsOjpjaXRlJzogMSxcbiAgJ2RlbDo6ZGF0ZXRpbWUnOiAwLFxuICAnZGV0YWlsczo6b3Blbic6IDAsXG4gICdkaXI6OmNvbXBhY3QnOiAwLFxuICAnZGl2OjphbGlnbic6IDAsXG4gICdkbDo6Y29tcGFjdCc6IDAsXG4gICdmaWVsZHNldDo6ZGlzYWJsZWQnOiAwLFxuICAnZm9udDo6Y29sb3InOiAwLFxuICAnZm9udDo6ZmFjZSc6IDAsXG4gICdmb250OjpzaXplJzogMCxcbiAgJ2Zvcm06OmFjY2VwdCc6IDAsXG4gICdmb3JtOjphY3Rpb24nOiAxLFxuICAnZm9ybTo6YXV0b2NvbXBsZXRlJzogMCxcbiAgJ2Zvcm06OmVuY3R5cGUnOiAwLFxuICAnZm9ybTo6bWV0aG9kJzogMCxcbiAgJ2Zvcm06Om5hbWUnOiA3LFxuICAnZm9ybTo6bm92YWxpZGF0ZSc6IDAsXG4gICdmb3JtOjpvbnJlc2V0JzogMixcbiAgJ2Zvcm06Om9uc3VibWl0JzogMixcbiAgJ2Zvcm06OnRhcmdldCc6IDEwLFxuICAnaDE6OmFsaWduJzogMCxcbiAgJ2gyOjphbGlnbic6IDAsXG4gICdoMzo6YWxpZ24nOiAwLFxuICAnaDQ6OmFsaWduJzogMCxcbiAgJ2g1OjphbGlnbic6IDAsXG4gICdoNjo6YWxpZ24nOiAwLFxuICAnaHI6OmFsaWduJzogMCxcbiAgJ2hyOjpub3NoYWRlJzogMCxcbiAgJ2hyOjpzaXplJzogMCxcbiAgJ2hyOjp3aWR0aCc6IDAsXG4gICdpZnJhbWU6OmFsaWduJzogMCxcbiAgJ2lmcmFtZTo6ZnJhbWVib3JkZXInOiAwLFxuICAnaWZyYW1lOjpoZWlnaHQnOiAwLFxuICAnaWZyYW1lOjptYXJnaW5oZWlnaHQnOiAwLFxuICAnaWZyYW1lOjptYXJnaW53aWR0aCc6IDAsXG4gICdpZnJhbWU6OndpZHRoJzogMCxcbiAgJ2ltZzo6YWxpZ24nOiAwLFxuICAnaW1nOjphbHQnOiAwLFxuICAnaW1nOjpib3JkZXInOiAwLFxuICAnaW1nOjpoZWlnaHQnOiAwLFxuICAnaW1nOjpoc3BhY2UnOiAwLFxuICAnaW1nOjppc21hcCc6IDAsXG4gICdpbWc6Om5hbWUnOiA3LFxuICAnaW1nOjpzcmMnOiAxLFxuICAnaW1nOjp1c2VtYXAnOiAxMSxcbiAgJ2ltZzo6dnNwYWNlJzogMCxcbiAgJ2ltZzo6d2lkdGgnOiAwLFxuICAnaW5wdXQ6OmFjY2VwdCc6IDAsXG4gICdpbnB1dDo6YWNjZXNza2V5JzogMCxcbiAgJ2lucHV0OjphbGlnbic6IDAsXG4gICdpbnB1dDo6YWx0JzogMCxcbiAgJ2lucHV0OjphdXRvY29tcGxldGUnOiAwLFxuICAnaW5wdXQ6OmNoZWNrZWQnOiAwLFxuICAnaW5wdXQ6OmRpc2FibGVkJzogMCxcbiAgJ2lucHV0OjppbnB1dG1vZGUnOiAwLFxuICAnaW5wdXQ6OmlzbWFwJzogMCxcbiAgJ2lucHV0OjpsaXN0JzogNSxcbiAgJ2lucHV0OjptYXgnOiAwLFxuICAnaW5wdXQ6Om1heGxlbmd0aCc6IDAsXG4gICdpbnB1dDo6bWluJzogMCxcbiAgJ2lucHV0OjptdWx0aXBsZSc6IDAsXG4gICdpbnB1dDo6bmFtZSc6IDgsXG4gICdpbnB1dDo6b25ibHVyJzogMixcbiAgJ2lucHV0OjpvbmNoYW5nZSc6IDIsXG4gICdpbnB1dDo6b25mb2N1cyc6IDIsXG4gICdpbnB1dDo6b25zZWxlY3QnOiAyLFxuICAnaW5wdXQ6OnBsYWNlaG9sZGVyJzogMCxcbiAgJ2lucHV0OjpyZWFkb25seSc6IDAsXG4gICdpbnB1dDo6cmVxdWlyZWQnOiAwLFxuICAnaW5wdXQ6OnNpemUnOiAwLFxuICAnaW5wdXQ6OnNyYyc6IDEsXG4gICdpbnB1dDo6c3RlcCc6IDAsXG4gICdpbnB1dDo6dGFiaW5kZXgnOiAwLFxuICAnaW5wdXQ6OnR5cGUnOiAwLFxuICAnaW5wdXQ6OnVzZW1hcCc6IDExLFxuICAnaW5wdXQ6OnZhbHVlJzogMCxcbiAgJ2luczo6Y2l0ZSc6IDEsXG4gICdpbnM6OmRhdGV0aW1lJzogMCxcbiAgJ2xhYmVsOjphY2Nlc3NrZXknOiAwLFxuICAnbGFiZWw6OmZvcic6IDUsXG4gICdsYWJlbDo6b25ibHVyJzogMixcbiAgJ2xhYmVsOjpvbmZvY3VzJzogMixcbiAgJ2xlZ2VuZDo6YWNjZXNza2V5JzogMCxcbiAgJ2xlZ2VuZDo6YWxpZ24nOiAwLFxuICAnbGk6OnR5cGUnOiAwLFxuICAnbGk6OnZhbHVlJzogMCxcbiAgJ21hcDo6bmFtZSc6IDcsXG4gICdtZW51Ojpjb21wYWN0JzogMCxcbiAgJ21lbnU6OmxhYmVsJzogMCxcbiAgJ21lbnU6OnR5cGUnOiAwLFxuICAnbWV0ZXI6OmhpZ2gnOiAwLFxuICAnbWV0ZXI6Omxvdyc6IDAsXG4gICdtZXRlcjo6bWF4JzogMCxcbiAgJ21ldGVyOjptaW4nOiAwLFxuICAnbWV0ZXI6OnZhbHVlJzogMCxcbiAgJ29sOjpjb21wYWN0JzogMCxcbiAgJ29sOjpyZXZlcnNlZCc6IDAsXG4gICdvbDo6c3RhcnQnOiAwLFxuICAnb2w6OnR5cGUnOiAwLFxuICAnb3B0Z3JvdXA6OmRpc2FibGVkJzogMCxcbiAgJ29wdGdyb3VwOjpsYWJlbCc6IDAsXG4gICdvcHRpb246OmRpc2FibGVkJzogMCxcbiAgJ29wdGlvbjo6bGFiZWwnOiAwLFxuICAnb3B0aW9uOjpzZWxlY3RlZCc6IDAsXG4gICdvcHRpb246OnZhbHVlJzogMCxcbiAgJ291dHB1dDo6Zm9yJzogNixcbiAgJ291dHB1dDo6bmFtZSc6IDgsXG4gICdwOjphbGlnbic6IDAsXG4gICdwcmU6OndpZHRoJzogMCxcbiAgJ3Byb2dyZXNzOjptYXgnOiAwLFxuICAncHJvZ3Jlc3M6Om1pbic6IDAsXG4gICdwcm9ncmVzczo6dmFsdWUnOiAwLFxuICAncTo6Y2l0ZSc6IDEsXG4gICdzZWxlY3Q6OmF1dG9jb21wbGV0ZSc6IDAsXG4gICdzZWxlY3Q6OmRpc2FibGVkJzogMCxcbiAgJ3NlbGVjdDo6bXVsdGlwbGUnOiAwLFxuICAnc2VsZWN0OjpuYW1lJzogOCxcbiAgJ3NlbGVjdDo6b25ibHVyJzogMixcbiAgJ3NlbGVjdDo6b25jaGFuZ2UnOiAyLFxuICAnc2VsZWN0OjpvbmZvY3VzJzogMixcbiAgJ3NlbGVjdDo6cmVxdWlyZWQnOiAwLFxuICAnc2VsZWN0OjpzaXplJzogMCxcbiAgJ3NlbGVjdDo6dGFiaW5kZXgnOiAwLFxuICAnc291cmNlOjp0eXBlJzogMCxcbiAgJ3RhYmxlOjphbGlnbic6IDAsXG4gICd0YWJsZTo6Ymdjb2xvcic6IDAsXG4gICd0YWJsZTo6Ym9yZGVyJzogMCxcbiAgJ3RhYmxlOjpjZWxscGFkZGluZyc6IDAsXG4gICd0YWJsZTo6Y2VsbHNwYWNpbmcnOiAwLFxuICAndGFibGU6OmZyYW1lJzogMCxcbiAgJ3RhYmxlOjpydWxlcyc6IDAsXG4gICd0YWJsZTo6c3VtbWFyeSc6IDAsXG4gICd0YWJsZTo6d2lkdGgnOiAwLFxuICAndGJvZHk6OmFsaWduJzogMCxcbiAgJ3Rib2R5OjpjaGFyJzogMCxcbiAgJ3Rib2R5OjpjaGFyb2ZmJzogMCxcbiAgJ3Rib2R5Ojp2YWxpZ24nOiAwLFxuICAndGQ6OmFiYnInOiAwLFxuICAndGQ6OmFsaWduJzogMCxcbiAgJ3RkOjpheGlzJzogMCxcbiAgJ3RkOjpiZ2NvbG9yJzogMCxcbiAgJ3RkOjpjaGFyJzogMCxcbiAgJ3RkOjpjaGFyb2ZmJzogMCxcbiAgJ3RkOjpjb2xzcGFuJzogMCxcbiAgJ3RkOjpoZWFkZXJzJzogNixcbiAgJ3RkOjpoZWlnaHQnOiAwLFxuICAndGQ6Om5vd3JhcCc6IDAsXG4gICd0ZDo6cm93c3Bhbic6IDAsXG4gICd0ZDo6c2NvcGUnOiAwLFxuICAndGQ6OnZhbGlnbic6IDAsXG4gICd0ZDo6d2lkdGgnOiAwLFxuICAndGV4dGFyZWE6OmFjY2Vzc2tleSc6IDAsXG4gICd0ZXh0YXJlYTo6YXV0b2NvbXBsZXRlJzogMCxcbiAgJ3RleHRhcmVhOjpjb2xzJzogMCxcbiAgJ3RleHRhcmVhOjpkaXNhYmxlZCc6IDAsXG4gICd0ZXh0YXJlYTo6aW5wdXRtb2RlJzogMCxcbiAgJ3RleHRhcmVhOjpuYW1lJzogOCxcbiAgJ3RleHRhcmVhOjpvbmJsdXInOiAyLFxuICAndGV4dGFyZWE6Om9uY2hhbmdlJzogMixcbiAgJ3RleHRhcmVhOjpvbmZvY3VzJzogMixcbiAgJ3RleHRhcmVhOjpvbnNlbGVjdCc6IDIsXG4gICd0ZXh0YXJlYTo6cGxhY2Vob2xkZXInOiAwLFxuICAndGV4dGFyZWE6OnJlYWRvbmx5JzogMCxcbiAgJ3RleHRhcmVhOjpyZXF1aXJlZCc6IDAsXG4gICd0ZXh0YXJlYTo6cm93cyc6IDAsXG4gICd0ZXh0YXJlYTo6dGFiaW5kZXgnOiAwLFxuICAndGV4dGFyZWE6OndyYXAnOiAwLFxuICAndGZvb3Q6OmFsaWduJzogMCxcbiAgJ3Rmb290OjpjaGFyJzogMCxcbiAgJ3Rmb290OjpjaGFyb2ZmJzogMCxcbiAgJ3Rmb290Ojp2YWxpZ24nOiAwLFxuICAndGg6OmFiYnInOiAwLFxuICAndGg6OmFsaWduJzogMCxcbiAgJ3RoOjpheGlzJzogMCxcbiAgJ3RoOjpiZ2NvbG9yJzogMCxcbiAgJ3RoOjpjaGFyJzogMCxcbiAgJ3RoOjpjaGFyb2ZmJzogMCxcbiAgJ3RoOjpjb2xzcGFuJzogMCxcbiAgJ3RoOjpoZWFkZXJzJzogNixcbiAgJ3RoOjpoZWlnaHQnOiAwLFxuICAndGg6Om5vd3JhcCc6IDAsXG4gICd0aDo6cm93c3Bhbic6IDAsXG4gICd0aDo6c2NvcGUnOiAwLFxuICAndGg6OnZhbGlnbic6IDAsXG4gICd0aDo6d2lkdGgnOiAwLFxuICAndGhlYWQ6OmFsaWduJzogMCxcbiAgJ3RoZWFkOjpjaGFyJzogMCxcbiAgJ3RoZWFkOjpjaGFyb2ZmJzogMCxcbiAgJ3RoZWFkOjp2YWxpZ24nOiAwLFxuICAndHI6OmFsaWduJzogMCxcbiAgJ3RyOjpiZ2NvbG9yJzogMCxcbiAgJ3RyOjpjaGFyJzogMCxcbiAgJ3RyOjpjaGFyb2ZmJzogMCxcbiAgJ3RyOjp2YWxpZ24nOiAwLFxuICAndHJhY2s6OmRlZmF1bHQnOiAwLFxuICAndHJhY2s6OmtpbmQnOiAwLFxuICAndHJhY2s6OmxhYmVsJzogMCxcbiAgJ3RyYWNrOjpzcmNsYW5nJzogMCxcbiAgJ3VsOjpjb21wYWN0JzogMCxcbiAgJ3VsOjp0eXBlJzogMCxcbiAgJ3ZpZGVvOjpjb250cm9scyc6IDAsXG4gICd2aWRlbzo6aGVpZ2h0JzogMCxcbiAgJ3ZpZGVvOjpsb29wJzogMCxcbiAgJ3ZpZGVvOjptZWRpYWdyb3VwJzogNSxcbiAgJ3ZpZGVvOjptdXRlZCc6IDAsXG4gICd2aWRlbzo6cG9zdGVyJzogMSxcbiAgJ3ZpZGVvOjpwcmVsb2FkJzogMCxcbiAgJ3ZpZGVvOjp3aWR0aCc6IDBcbn07XG5odG1sNFsgJ0FUVFJJQlMnIF0gPSBodG1sNC5BVFRSSUJTO1xuaHRtbDQuZWZsYWdzID0ge1xuICAnT1BUSU9OQUxfRU5EVEFHJzogMSxcbiAgJ0VNUFRZJzogMixcbiAgJ0NEQVRBJzogNCxcbiAgJ1JDREFUQSc6IDgsXG4gICdVTlNBRkUnOiAxNixcbiAgJ0ZPTERBQkxFJzogMzIsXG4gICdTQ1JJUFQnOiA2NCxcbiAgJ1NUWUxFJzogMTI4LFxuICAnVklSVFVBTElaRUQnOiAyNTZcbn07XG5odG1sNFsgJ2VmbGFncycgXSA9IGh0bWw0LmVmbGFncztcbmh0bWw0LkVMRU1FTlRTID0ge1xuICAnYSc6IDAsXG4gICdhYmJyJzogMCxcbiAgJ2Fjcm9ueW0nOiAwLFxuICAnYWRkcmVzcyc6IDAsXG4gICdhcHBsZXQnOiAyNzIsXG4gICdhcmVhJzogMixcbiAgJ2FydGljbGUnOiAwLFxuICAnYXNpZGUnOiAwLFxuICAnYXVkaW8nOiAwLFxuICAnYic6IDAsXG4gICdiYXNlJzogMjc0LFxuICAnYmFzZWZvbnQnOiAyNzQsXG4gICdiZGknOiAwLFxuICAnYmRvJzogMCxcbiAgJ2JpZyc6IDAsXG4gICdibG9ja3F1b3RlJzogMCxcbiAgJ2JvZHknOiAzMDUsXG4gICdicic6IDIsXG4gICdidXR0b24nOiAwLFxuICAnY2FudmFzJzogMCxcbiAgJ2NhcHRpb24nOiAwLFxuICAnY2VudGVyJzogMCxcbiAgJ2NpdGUnOiAwLFxuICAnY29kZSc6IDAsXG4gICdjb2wnOiAyLFxuICAnY29sZ3JvdXAnOiAxLFxuICAnY29tbWFuZCc6IDIsXG4gICdkYXRhJzogMCxcbiAgJ2RhdGFsaXN0JzogMCxcbiAgJ2RkJzogMSxcbiAgJ2RlbCc6IDAsXG4gICdkZXRhaWxzJzogMCxcbiAgJ2Rmbic6IDAsXG4gICdkaWFsb2cnOiAyNzIsXG4gICdkaXInOiAwLFxuICAnZGl2JzogMCxcbiAgJ2RsJzogMCxcbiAgJ2R0JzogMSxcbiAgJ2VtJzogMCxcbiAgJ2ZpZWxkc2V0JzogMCxcbiAgJ2ZpZ2NhcHRpb24nOiAwLFxuICAnZmlndXJlJzogMCxcbiAgJ2ZvbnQnOiAwLFxuICAnZm9vdGVyJzogMCxcbiAgJ2Zvcm0nOiAwLFxuICAnZnJhbWUnOiAyNzQsXG4gICdmcmFtZXNldCc6IDI3MixcbiAgJ2gxJzogMCxcbiAgJ2gyJzogMCxcbiAgJ2gzJzogMCxcbiAgJ2g0JzogMCxcbiAgJ2g1JzogMCxcbiAgJ2g2JzogMCxcbiAgJ2hlYWQnOiAzMDUsXG4gICdoZWFkZXInOiAwLFxuICAnaGdyb3VwJzogMCxcbiAgJ2hyJzogMixcbiAgJ2h0bWwnOiAzMDUsXG4gICdpJzogMCxcbiAgJ2lmcmFtZSc6IDQsXG4gICdpbWcnOiAyLFxuICAnaW5wdXQnOiAyLFxuICAnaW5zJzogMCxcbiAgJ2lzaW5kZXgnOiAyNzQsXG4gICdrYmQnOiAwLFxuICAna2V5Z2VuJzogMjc0LFxuICAnbGFiZWwnOiAwLFxuICAnbGVnZW5kJzogMCxcbiAgJ2xpJzogMSxcbiAgJ2xpbmsnOiAyNzQsXG4gICdtYXAnOiAwLFxuICAnbWFyayc6IDAsXG4gICdtZW51JzogMCxcbiAgJ21ldGEnOiAyNzQsXG4gICdtZXRlcic6IDAsXG4gICduYXYnOiAwLFxuICAnbm9icic6IDAsXG4gICdub2VtYmVkJzogMjc2LFxuICAnbm9mcmFtZXMnOiAyNzYsXG4gICdub3NjcmlwdCc6IDI3NixcbiAgJ29iamVjdCc6IDI3MixcbiAgJ29sJzogMCxcbiAgJ29wdGdyb3VwJzogMCxcbiAgJ29wdGlvbic6IDEsXG4gICdvdXRwdXQnOiAwLFxuICAncCc6IDEsXG4gICdwYXJhbSc6IDI3NCxcbiAgJ3ByZSc6IDAsXG4gICdwcm9ncmVzcyc6IDAsXG4gICdxJzogMCxcbiAgJ3MnOiAwLFxuICAnc2FtcCc6IDAsXG4gICdzY3JpcHQnOiA4NCxcbiAgJ3NlY3Rpb24nOiAwLFxuICAnc2VsZWN0JzogMCxcbiAgJ3NtYWxsJzogMCxcbiAgJ3NvdXJjZSc6IDIsXG4gICdzcGFuJzogMCxcbiAgJ3N0cmlrZSc6IDAsXG4gICdzdHJvbmcnOiAwLFxuICAnc3R5bGUnOiAxNDgsXG4gICdzdWInOiAwLFxuICAnc3VtbWFyeSc6IDAsXG4gICdzdXAnOiAwLFxuICAndGFibGUnOiAwLFxuICAndGJvZHknOiAxLFxuICAndGQnOiAxLFxuICAndGV4dGFyZWEnOiA4LFxuICAndGZvb3QnOiAxLFxuICAndGgnOiAxLFxuICAndGhlYWQnOiAxLFxuICAndGltZSc6IDAsXG4gICd0aXRsZSc6IDI4MCxcbiAgJ3RyJzogMSxcbiAgJ3RyYWNrJzogMixcbiAgJ3R0JzogMCxcbiAgJ3UnOiAwLFxuICAndWwnOiAwLFxuICAndmFyJzogMCxcbiAgJ3ZpZGVvJzogMCxcbiAgJ3dicic6IDJcbn07XG5odG1sNFsgJ0VMRU1FTlRTJyBdID0gaHRtbDQuRUxFTUVOVFM7XG5odG1sNC5FTEVNRU5UX0RPTV9JTlRFUkZBQ0VTID0ge1xuICAnYSc6ICdIVE1MQW5jaG9yRWxlbWVudCcsXG4gICdhYmJyJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2Fjcm9ueW0nOiAnSFRNTEVsZW1lbnQnLFxuICAnYWRkcmVzcyc6ICdIVE1MRWxlbWVudCcsXG4gICdhcHBsZXQnOiAnSFRNTEFwcGxldEVsZW1lbnQnLFxuICAnYXJlYSc6ICdIVE1MQXJlYUVsZW1lbnQnLFxuICAnYXJ0aWNsZSc6ICdIVE1MRWxlbWVudCcsXG4gICdhc2lkZSc6ICdIVE1MRWxlbWVudCcsXG4gICdhdWRpbyc6ICdIVE1MQXVkaW9FbGVtZW50JyxcbiAgJ2InOiAnSFRNTEVsZW1lbnQnLFxuICAnYmFzZSc6ICdIVE1MQmFzZUVsZW1lbnQnLFxuICAnYmFzZWZvbnQnOiAnSFRNTEJhc2VGb250RWxlbWVudCcsXG4gICdiZGknOiAnSFRNTEVsZW1lbnQnLFxuICAnYmRvJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2JpZyc6ICdIVE1MRWxlbWVudCcsXG4gICdibG9ja3F1b3RlJzogJ0hUTUxRdW90ZUVsZW1lbnQnLFxuICAnYm9keSc6ICdIVE1MQm9keUVsZW1lbnQnLFxuICAnYnInOiAnSFRNTEJSRWxlbWVudCcsXG4gICdidXR0b24nOiAnSFRNTEJ1dHRvbkVsZW1lbnQnLFxuICAnY2FudmFzJzogJ0hUTUxDYW52YXNFbGVtZW50JyxcbiAgJ2NhcHRpb24nOiAnSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnQnLFxuICAnY2VudGVyJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2NpdGUnOiAnSFRNTEVsZW1lbnQnLFxuICAnY29kZSc6ICdIVE1MRWxlbWVudCcsXG4gICdjb2wnOiAnSFRNTFRhYmxlQ29sRWxlbWVudCcsXG4gICdjb2xncm91cCc6ICdIVE1MVGFibGVDb2xFbGVtZW50JyxcbiAgJ2NvbW1hbmQnOiAnSFRNTENvbW1hbmRFbGVtZW50JyxcbiAgJ2RhdGEnOiAnSFRNTEVsZW1lbnQnLFxuICAnZGF0YWxpc3QnOiAnSFRNTERhdGFMaXN0RWxlbWVudCcsXG4gICdkZCc6ICdIVE1MRWxlbWVudCcsXG4gICdkZWwnOiAnSFRNTE1vZEVsZW1lbnQnLFxuICAnZGV0YWlscyc6ICdIVE1MRGV0YWlsc0VsZW1lbnQnLFxuICAnZGZuJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2RpYWxvZyc6ICdIVE1MRGlhbG9nRWxlbWVudCcsXG4gICdkaXInOiAnSFRNTERpcmVjdG9yeUVsZW1lbnQnLFxuICAnZGl2JzogJ0hUTUxEaXZFbGVtZW50JyxcbiAgJ2RsJzogJ0hUTUxETGlzdEVsZW1lbnQnLFxuICAnZHQnOiAnSFRNTEVsZW1lbnQnLFxuICAnZW0nOiAnSFRNTEVsZW1lbnQnLFxuICAnZmllbGRzZXQnOiAnSFRNTEZpZWxkU2V0RWxlbWVudCcsXG4gICdmaWdjYXB0aW9uJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2ZpZ3VyZSc6ICdIVE1MRWxlbWVudCcsXG4gICdmb250JzogJ0hUTUxGb250RWxlbWVudCcsXG4gICdmb290ZXInOiAnSFRNTEVsZW1lbnQnLFxuICAnZm9ybSc6ICdIVE1MRm9ybUVsZW1lbnQnLFxuICAnZnJhbWUnOiAnSFRNTEZyYW1lRWxlbWVudCcsXG4gICdmcmFtZXNldCc6ICdIVE1MRnJhbWVTZXRFbGVtZW50JyxcbiAgJ2gxJzogJ0hUTUxIZWFkaW5nRWxlbWVudCcsXG4gICdoMic6ICdIVE1MSGVhZGluZ0VsZW1lbnQnLFxuICAnaDMnOiAnSFRNTEhlYWRpbmdFbGVtZW50JyxcbiAgJ2g0JzogJ0hUTUxIZWFkaW5nRWxlbWVudCcsXG4gICdoNSc6ICdIVE1MSGVhZGluZ0VsZW1lbnQnLFxuICAnaDYnOiAnSFRNTEhlYWRpbmdFbGVtZW50JyxcbiAgJ2hlYWQnOiAnSFRNTEhlYWRFbGVtZW50JyxcbiAgJ2hlYWRlcic6ICdIVE1MRWxlbWVudCcsXG4gICdoZ3JvdXAnOiAnSFRNTEVsZW1lbnQnLFxuICAnaHInOiAnSFRNTEhSRWxlbWVudCcsXG4gICdodG1sJzogJ0hUTUxIdG1sRWxlbWVudCcsXG4gICdpJzogJ0hUTUxFbGVtZW50JyxcbiAgJ2lmcmFtZSc6ICdIVE1MSUZyYW1lRWxlbWVudCcsXG4gICdpbWcnOiAnSFRNTEltYWdlRWxlbWVudCcsXG4gICdpbnB1dCc6ICdIVE1MSW5wdXRFbGVtZW50JyxcbiAgJ2lucyc6ICdIVE1MTW9kRWxlbWVudCcsXG4gICdpc2luZGV4JzogJ0hUTUxVbmtub3duRWxlbWVudCcsXG4gICdrYmQnOiAnSFRNTEVsZW1lbnQnLFxuICAna2V5Z2VuJzogJ0hUTUxLZXlnZW5FbGVtZW50JyxcbiAgJ2xhYmVsJzogJ0hUTUxMYWJlbEVsZW1lbnQnLFxuICAnbGVnZW5kJzogJ0hUTUxMZWdlbmRFbGVtZW50JyxcbiAgJ2xpJzogJ0hUTUxMSUVsZW1lbnQnLFxuICAnbGluayc6ICdIVE1MTGlua0VsZW1lbnQnLFxuICAnbWFwJzogJ0hUTUxNYXBFbGVtZW50JyxcbiAgJ21hcmsnOiAnSFRNTEVsZW1lbnQnLFxuICAnbWVudSc6ICdIVE1MTWVudUVsZW1lbnQnLFxuICAnbWV0YSc6ICdIVE1MTWV0YUVsZW1lbnQnLFxuICAnbWV0ZXInOiAnSFRNTE1ldGVyRWxlbWVudCcsXG4gICduYXYnOiAnSFRNTEVsZW1lbnQnLFxuICAnbm9icic6ICdIVE1MRWxlbWVudCcsXG4gICdub2VtYmVkJzogJ0hUTUxFbGVtZW50JyxcbiAgJ25vZnJhbWVzJzogJ0hUTUxFbGVtZW50JyxcbiAgJ25vc2NyaXB0JzogJ0hUTUxFbGVtZW50JyxcbiAgJ29iamVjdCc6ICdIVE1MT2JqZWN0RWxlbWVudCcsXG4gICdvbCc6ICdIVE1MT0xpc3RFbGVtZW50JyxcbiAgJ29wdGdyb3VwJzogJ0hUTUxPcHRHcm91cEVsZW1lbnQnLFxuICAnb3B0aW9uJzogJ0hUTUxPcHRpb25FbGVtZW50JyxcbiAgJ291dHB1dCc6ICdIVE1MT3V0cHV0RWxlbWVudCcsXG4gICdwJzogJ0hUTUxQYXJhZ3JhcGhFbGVtZW50JyxcbiAgJ3BhcmFtJzogJ0hUTUxQYXJhbUVsZW1lbnQnLFxuICAncHJlJzogJ0hUTUxQcmVFbGVtZW50JyxcbiAgJ3Byb2dyZXNzJzogJ0hUTUxQcm9ncmVzc0VsZW1lbnQnLFxuICAncSc6ICdIVE1MUXVvdGVFbGVtZW50JyxcbiAgJ3MnOiAnSFRNTEVsZW1lbnQnLFxuICAnc2FtcCc6ICdIVE1MRWxlbWVudCcsXG4gICdzY3JpcHQnOiAnSFRNTFNjcmlwdEVsZW1lbnQnLFxuICAnc2VjdGlvbic6ICdIVE1MRWxlbWVudCcsXG4gICdzZWxlY3QnOiAnSFRNTFNlbGVjdEVsZW1lbnQnLFxuICAnc21hbGwnOiAnSFRNTEVsZW1lbnQnLFxuICAnc291cmNlJzogJ0hUTUxTb3VyY2VFbGVtZW50JyxcbiAgJ3NwYW4nOiAnSFRNTFNwYW5FbGVtZW50JyxcbiAgJ3N0cmlrZSc6ICdIVE1MRWxlbWVudCcsXG4gICdzdHJvbmcnOiAnSFRNTEVsZW1lbnQnLFxuICAnc3R5bGUnOiAnSFRNTFN0eWxlRWxlbWVudCcsXG4gICdzdWInOiAnSFRNTEVsZW1lbnQnLFxuICAnc3VtbWFyeSc6ICdIVE1MRWxlbWVudCcsXG4gICdzdXAnOiAnSFRNTEVsZW1lbnQnLFxuICAndGFibGUnOiAnSFRNTFRhYmxlRWxlbWVudCcsXG4gICd0Ym9keSc6ICdIVE1MVGFibGVTZWN0aW9uRWxlbWVudCcsXG4gICd0ZCc6ICdIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnQnLFxuICAndGV4dGFyZWEnOiAnSFRNTFRleHRBcmVhRWxlbWVudCcsXG4gICd0Zm9vdCc6ICdIVE1MVGFibGVTZWN0aW9uRWxlbWVudCcsXG4gICd0aCc6ICdIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudCcsXG4gICd0aGVhZCc6ICdIVE1MVGFibGVTZWN0aW9uRWxlbWVudCcsXG4gICd0aW1lJzogJ0hUTUxUaW1lRWxlbWVudCcsXG4gICd0aXRsZSc6ICdIVE1MVGl0bGVFbGVtZW50JyxcbiAgJ3RyJzogJ0hUTUxUYWJsZVJvd0VsZW1lbnQnLFxuICAndHJhY2snOiAnSFRNTFRyYWNrRWxlbWVudCcsXG4gICd0dCc6ICdIVE1MRWxlbWVudCcsXG4gICd1JzogJ0hUTUxFbGVtZW50JyxcbiAgJ3VsJzogJ0hUTUxVTGlzdEVsZW1lbnQnLFxuICAndmFyJzogJ0hUTUxFbGVtZW50JyxcbiAgJ3ZpZGVvJzogJ0hUTUxWaWRlb0VsZW1lbnQnLFxuICAnd2JyJzogJ0hUTUxFbGVtZW50J1xufTtcbmh0bWw0WyAnRUxFTUVOVF9ET01fSU5URVJGQUNFUycgXSA9IGh0bWw0LkVMRU1FTlRfRE9NX0lOVEVSRkFDRVM7XG5odG1sNC51ZWZmZWN0cyA9IHtcbiAgJ05PVF9MT0FERUQnOiAwLFxuICAnU0FNRV9ET0NVTUVOVCc6IDEsXG4gICdORVdfRE9DVU1FTlQnOiAyXG59O1xuaHRtbDRbICd1ZWZmZWN0cycgXSA9IGh0bWw0LnVlZmZlY3RzO1xuaHRtbDQuVVJJRUZGRUNUUyA9IHtcbiAgJ2E6OmhyZWYnOiAyLFxuICAnYXJlYTo6aHJlZic6IDIsXG4gICdibG9ja3F1b3RlOjpjaXRlJzogMCxcbiAgJ2NvbW1hbmQ6Omljb24nOiAxLFxuICAnZGVsOjpjaXRlJzogMCxcbiAgJ2Zvcm06OmFjdGlvbic6IDIsXG4gICdpbWc6OnNyYyc6IDEsXG4gICdpbnB1dDo6c3JjJzogMSxcbiAgJ2luczo6Y2l0ZSc6IDAsXG4gICdxOjpjaXRlJzogMCxcbiAgJ3ZpZGVvOjpwb3N0ZXInOiAxXG59O1xuaHRtbDRbICdVUklFRkZFQ1RTJyBdID0gaHRtbDQuVVJJRUZGRUNUUztcbmh0bWw0Lmx0eXBlcyA9IHtcbiAgJ1VOU0FOREJPWEVEJzogMixcbiAgJ1NBTkRCT1hFRCc6IDEsXG4gICdEQVRBJzogMFxufTtcbmh0bWw0WyAnbHR5cGVzJyBdID0gaHRtbDQubHR5cGVzO1xuaHRtbDQuTE9BREVSVFlQRVMgPSB7XG4gICdhOjpocmVmJzogMixcbiAgJ2FyZWE6OmhyZWYnOiAyLFxuICAnYmxvY2txdW90ZTo6Y2l0ZSc6IDIsXG4gICdjb21tYW5kOjppY29uJzogMSxcbiAgJ2RlbDo6Y2l0ZSc6IDIsXG4gICdmb3JtOjphY3Rpb24nOiAyLFxuICAnaW1nOjpzcmMnOiAxLFxuICAnaW5wdXQ6OnNyYyc6IDEsXG4gICdpbnM6OmNpdGUnOiAyLFxuICAncTo6Y2l0ZSc6IDIsXG4gICd2aWRlbzo6cG9zdGVyJzogMVxufTtcbmh0bWw0WyAnTE9BREVSVFlQRVMnIF0gPSBodG1sNC5MT0FERVJUWVBFUztcblxuLy8gQ29weXJpZ2h0IChDKSAyMDA2IEdvb2dsZSBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBBbiBIVE1MIHNhbml0aXplciB0aGF0IGNhbiBzYXRpc2Z5IGEgdmFyaWV0eSBvZiBzZWN1cml0eSBwb2xpY2llcy5cbiAqXG4gKiA8cD5cbiAqIFRoZSBIVE1MIHNhbml0aXplciBpcyBidWlsdCBhcm91bmQgYSBTQVggcGFyc2VyIGFuZCBIVE1MIGVsZW1lbnQgYW5kXG4gKiBhdHRyaWJ1dGVzIHNjaGVtYXMuXG4gKlxuICogSWYgdGhlIGNzc3BhcnNlciBpcyBsb2FkZWQsIGlubGluZSBzdHlsZXMgYXJlIHNhbml0aXplZCB1c2luZyB0aGVcbiAqIGNzcyBwcm9wZXJ0eSBhbmQgdmFsdWUgc2NoZW1hcy4gIEVsc2UgdGhleSBhcmUgcmVtb3ZlIGR1cmluZ1xuICogc2FuaXRpemF0aW9uLlxuICpcbiAqIElmIGl0IGV4aXN0cywgdXNlcyBwYXJzZUNzc0RlY2xhcmF0aW9ucywgc2FuaXRpemVDc3NQcm9wZXJ0eSwgIGNzc1NjaGVtYVxuICpcbiAqIEBhdXRob3IgbWlrZXNhbXVlbEBnbWFpbC5jb21cbiAqIEBhdXRob3IgamFzdmlyQGdtYWlsLmNvbVxuICogXFxAcmVxdWlyZXMgaHRtbDQsIFVSSVxuICogXFxAb3ZlcnJpZGVzIHdpbmRvd1xuICogXFxAcHJvdmlkZXMgaHRtbCwgaHRtbF9zYW5pdGl6ZVxuICovXG5cbi8vIFRoZSBUdXJraXNoIGkgc2VlbXMgdG8gYmUgYSBub24taXNzdWUsIGJ1dCBhYm9ydCBpbiBjYXNlIGl0IGlzLlxuaWYgKCdJJy50b0xvd2VyQ2FzZSgpICE9PSAnaScpIHsgdGhyb3cgJ0kvaSBwcm9ibGVtJzsgfVxuXG4vKipcbiAqIFxcQG5hbWVzcGFjZVxuICovXG52YXIgaHRtbCA9IChmdW5jdGlvbihodG1sNCkge1xuXG4gIC8vIEZvciBjbG9zdXJlIGNvbXBpbGVyXG4gIHZhciBwYXJzZUNzc0RlY2xhcmF0aW9ucywgc2FuaXRpemVDc3NQcm9wZXJ0eSwgY3NzU2NoZW1hO1xuICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB3aW5kb3cpIHtcbiAgICBwYXJzZUNzc0RlY2xhcmF0aW9ucyA9IHdpbmRvd1sncGFyc2VDc3NEZWNsYXJhdGlvbnMnXTtcbiAgICBzYW5pdGl6ZUNzc1Byb3BlcnR5ID0gd2luZG93WydzYW5pdGl6ZUNzc1Byb3BlcnR5J107XG4gICAgY3NzU2NoZW1hID0gd2luZG93Wydjc3NTY2hlbWEnXTtcbiAgfVxuXG4gIC8vIFRoZSBrZXlzIG9mIHRoaXMgb2JqZWN0IG11c3QgYmUgJ3F1b3RlZCcgb3IgSlNDb21waWxlciB3aWxsIG1hbmdsZSB0aGVtIVxuICAvLyBUaGlzIGlzIGEgcGFydGlhbCBsaXN0IC0tIGxvb2t1cEVudGl0eSgpIHVzZXMgdGhlIGhvc3QgYnJvd3NlcidzIHBhcnNlclxuICAvLyAod2hlbiBhdmFpbGFibGUpIHRvIGltcGxlbWVudCBmdWxsIGVudGl0eSBsb29rdXAuXG4gIC8vIE5vdGUgdGhhdCBlbnRpdGllcyBhcmUgaW4gZ2VuZXJhbCBjYXNlLXNlbnNpdGl2ZTsgdGhlIHVwcGVyY2FzZSBvbmVzIGFyZVxuICAvLyBleHBsaWNpdGx5IGRlZmluZWQgYnkgSFRNTDUgKHByZXN1bWFibHkgYXMgY29tcGF0aWJpbGl0eSkuXG4gIHZhciBFTlRJVElFUyA9IHtcbiAgICAnbHQnOiAnPCcsXG4gICAgJ0xUJzogJzwnLFxuICAgICdndCc6ICc+JyxcbiAgICAnR1QnOiAnPicsXG4gICAgJ2FtcCc6ICcmJyxcbiAgICAnQU1QJzogJyYnLFxuICAgICdxdW90JzogJ1wiJyxcbiAgICAnYXBvcyc6ICdcXCcnLFxuICAgICduYnNwJzogJ1xcMjQwJ1xuICB9O1xuXG4gIC8vIFBhdHRlcm5zIGZvciB0eXBlcyBvZiBlbnRpdHkvY2hhcmFjdGVyIHJlZmVyZW5jZSBuYW1lcy5cbiAgdmFyIGRlY2ltYWxFc2NhcGVSZSA9IC9eIyhcXGQrKSQvO1xuICB2YXIgaGV4RXNjYXBlUmUgPSAvXiN4KFswLTlBLUZhLWZdKykkLztcbiAgLy8gY29udGFpbnMgZXZlcnkgZW50aXR5IHBlciBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1dELWh0bWw1LTIwMTEwMTEzL25hbWVkLWNoYXJhY3Rlci1yZWZlcmVuY2VzLmh0bWxcbiAgdmFyIHNhZmVFbnRpdHlOYW1lUmUgPSAvXltBLVphLXpdW0EtemEtejAtOV0rJC87XG4gIC8vIFVzZWQgYXMgYSBob29rIHRvIGludm9rZSB0aGUgYnJvd3NlcidzIGVudGl0eSBwYXJzaW5nLiA8dGV4dGFyZWE+IGlzIHVzZWRcbiAgLy8gYmVjYXVzZSBpdHMgY29udGVudCBpcyBwYXJzZWQgZm9yIGVudGl0aWVzIGJ1dCBub3QgdGFncy5cbiAgLy8gVE9ETyhrcHJlaWQpOiBUaGlzIHJldHJpZXZhbCBpcyBhIGtsdWRnZSBhbmQgbGVhZHMgdG8gc2lsZW50IGxvc3Mgb2ZcbiAgLy8gZnVuY3Rpb25hbGl0eSBpZiB0aGUgZG9jdW1lbnQgaXNuJ3QgYXZhaWxhYmxlLlxuICB2YXIgZW50aXR5TG9va3VwRWxlbWVudCA9XG4gICAgICAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB3aW5kb3cgJiYgd2luZG93Wydkb2N1bWVudCddKVxuICAgICAgICAgID8gd2luZG93Wydkb2N1bWVudCddLmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJykgOiBudWxsO1xuICAvKipcbiAgICogRGVjb2RlcyBhbiBIVE1MIGVudGl0eS5cbiAgICpcbiAgICoge1xcQHVwZG9jXG4gICAqICQgbG9va3VwRW50aXR5KCdsdCcpXG4gICAqICMgJzwnXG4gICAqICQgbG9va3VwRW50aXR5KCdHVCcpXG4gICAqICMgJz4nXG4gICAqICQgbG9va3VwRW50aXR5KCdhbXAnKVxuICAgKiAjICcmJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgnbmJzcCcpXG4gICAqICMgJ1xceEEwJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgnYXBvcycpXG4gICAqICMgXCInXCJcbiAgICogJCBsb29rdXBFbnRpdHkoJ3F1b3QnKVxuICAgKiAjICdcIidcbiAgICogJCBsb29rdXBFbnRpdHkoJyN4YScpXG4gICAqICMgJ1xcbidcbiAgICogJCBsb29rdXBFbnRpdHkoJyMxMCcpXG4gICAqICMgJ1xcbidcbiAgICogJCBsb29rdXBFbnRpdHkoJyN4MGEnKVxuICAgKiAjICdcXG4nXG4gICAqICQgbG9va3VwRW50aXR5KCcjMDEwJylcbiAgICogIyAnXFxuJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgnI3gwMEEnKVxuICAgKiAjICdcXG4nXG4gICAqICQgbG9va3VwRW50aXR5KCdQaScpICAgICAgLy8gS25vd24gZmFpbHVyZVxuICAgKiAjICdcXHUwM0EwJ1xuICAgKiAkIGxvb2t1cEVudGl0eSgncGknKSAgICAgIC8vIEtub3duIGZhaWx1cmVcbiAgICogIyAnXFx1MDNDMCdcbiAgICogfVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgY29udGVudCBiZXR3ZWVuIHRoZSAnJicgYW5kIHRoZSAnOycuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gYSBzaW5nbGUgdW5pY29kZSBjb2RlLXBvaW50IGFzIGEgc3RyaW5nLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwRW50aXR5KG5hbWUpIHtcbiAgICAvLyBUT0RPOiBlbnRpdHkgbG9va3VwIGFzIHNwZWNpZmllZCBieSBIVE1MNSBhY3R1YWxseSBkZXBlbmRzIG9uIHRoZVxuICAgIC8vIHByZXNlbmNlIG9mIHRoZSBcIjtcIi5cbiAgICBpZiAoRU5USVRJRVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHsgcmV0dXJuIEVOVElUSUVTW25hbWVdOyB9XG4gICAgdmFyIG0gPSBuYW1lLm1hdGNoKGRlY2ltYWxFc2NhcGVSZSk7XG4gICAgaWYgKG0pIHtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG1bMV0sIDEwKSk7XG4gICAgfSBlbHNlIGlmICghIShtID0gbmFtZS5tYXRjaChoZXhFc2NhcGVSZSkpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChtWzFdLCAxNikpO1xuICAgIH0gZWxzZSBpZiAoZW50aXR5TG9va3VwRWxlbWVudCAmJiBzYWZlRW50aXR5TmFtZVJlLnRlc3QobmFtZSkpIHtcbiAgICAgIGVudGl0eUxvb2t1cEVsZW1lbnQuaW5uZXJIVE1MID0gJyYnICsgbmFtZSArICc7JztcbiAgICAgIHZhciB0ZXh0ID0gZW50aXR5TG9va3VwRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgIEVOVElUSUVTW25hbWVdID0gdGV4dDtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyYnICsgbmFtZSArICc7JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGVPbmVFbnRpdHkoXywgbmFtZSkge1xuICAgIHJldHVybiBsb29rdXBFbnRpdHkobmFtZSk7XG4gIH1cblxuICB2YXIgbnVsUmUgPSAvXFwwL2c7XG4gIGZ1bmN0aW9uIHN0cmlwTlVMcyhzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShudWxSZSwgJycpO1xuICB9XG5cbiAgdmFyIEVOVElUWV9SRV8xID0gLyYoI1swLTldK3wjW3hYXVswLTlBLUZhLWZdK3xcXHcrKTsvZztcbiAgdmFyIEVOVElUWV9SRV8yID0gL14oI1swLTldK3wjW3hYXVswLTlBLUZhLWZdK3xcXHcrKTsvO1xuICAvKipcbiAgICogVGhlIHBsYWluIHRleHQgb2YgYSBjaHVuayBvZiBIVE1MIENEQVRBIHdoaWNoIHBvc3NpYmx5IGNvbnRhaW5pbmcuXG4gICAqXG4gICAqIHtcXEB1cGRvY1xuICAgKiAkIHVuZXNjYXBlRW50aXRpZXMoJycpXG4gICAqICMgJydcbiAgICogJCB1bmVzY2FwZUVudGl0aWVzKCdoZWxsbyBXb3JsZCEnKVxuICAgKiAjICdoZWxsbyBXb3JsZCEnXG4gICAqICQgdW5lc2NhcGVFbnRpdGllcygnMSAmbHQ7IDIgJmFtcDsmQU1QOyA0ICZndDsgMyYjMTA7JylcbiAgICogIyAnMSA8IDIgJiYgNCA+IDNcXG4nXG4gICAqICQgdW5lc2NhcGVFbnRpdGllcygnJmx0OyZsdCA8LSB1bmZpbmlzaGVkIGVudGl0eSZndDsnKVxuICAgKiAjICc8Jmx0IDwtIHVuZmluaXNoZWQgZW50aXR5PidcbiAgICogJCB1bmVzY2FwZUVudGl0aWVzKCcvZm9vP2Jhcj1iYXomY29weT10cnVlJykgIC8vICYgb2Z0ZW4gdW5lc2NhcGVkIGluIFVSTFNcbiAgICogIyAnL2Zvbz9iYXI9YmF6JmNvcHk9dHJ1ZSdcbiAgICogJCB1bmVzY2FwZUVudGl0aWVzKCdwaT0mcGk7JiN4M2MwOywgUGk9JlBpO1xcdTAzQTAnKSAvLyBGSVhNRToga25vd24gZmFpbHVyZVxuICAgKiAjICdwaT1cXHUwM0MwXFx1MDNjMCwgUGk9XFx1MDNBMFxcdTAzQTAnXG4gICAqIH1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHMgYSBjaHVuayBvZiBIVE1MIENEQVRBLiAgSXQgbXVzdCBub3Qgc3RhcnQgb3IgZW5kIGluc2lkZVxuICAgKiAgICAgYW4gSFRNTCBlbnRpdHkuXG4gICAqL1xuICBmdW5jdGlvbiB1bmVzY2FwZUVudGl0aWVzKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKEVOVElUWV9SRV8xLCBkZWNvZGVPbmVFbnRpdHkpO1xuICB9XG5cbiAgdmFyIGFtcFJlID0gLyYvZztcbiAgdmFyIGxvb3NlQW1wUmUgPSAvJihbXmEteiNdfCMoPzpbXjAtOXhdfHgoPzpbXjAtOWEtZl18JCl8JCl8JCkvZ2k7XG4gIHZhciBsdFJlID0gL1s8XS9nO1xuICB2YXIgZ3RSZSA9IC8+L2c7XG4gIHZhciBxdW90UmUgPSAvXFxcIi9nO1xuXG4gIC8qKlxuICAgKiBFc2NhcGVzIEhUTUwgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGF0dHJpYnV0ZSB2YWx1ZXMuXG4gICAqXG4gICAqIHtcXEB1cGRvY1xuICAgKiAkIGVzY2FwZUF0dHJpYignJylcbiAgICogIyAnJ1xuICAgKiAkIGVzY2FwZUF0dHJpYignXCI8PCY9PSY+PlwiJykgIC8vIERvIG5vdCBqdXN0IGVzY2FwZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZS5cbiAgICogIyAnJiMzNDsmbHQ7Jmx0OyZhbXA7JiM2MTsmIzYxOyZhbXA7Jmd0OyZndDsmIzM0OydcbiAgICogJCBlc2NhcGVBdHRyaWIoJ0hlbGxvIDxXb3JsZD4hJylcbiAgICogIyAnSGVsbG8gJmx0O1dvcmxkJmd0OyEnXG4gICAqIH1cbiAgICovXG4gIGZ1bmN0aW9uIGVzY2FwZUF0dHJpYihzKSB7XG4gICAgcmV0dXJuICgnJyArIHMpLnJlcGxhY2UoYW1wUmUsICcmYW1wOycpLnJlcGxhY2UobHRSZSwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShndFJlLCAnJmd0OycpLnJlcGxhY2UocXVvdFJlLCAnJiMzNDsnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFc2NhcGUgZW50aXRpZXMgaW4gUkNEQVRBIHRoYXQgY2FuIGJlIGVzY2FwZWQgd2l0aG91dCBjaGFuZ2luZyB0aGUgbWVhbmluZy5cbiAgICoge1xcQHVwZG9jXG4gICAqICQgbm9ybWFsaXplUkNEYXRhKCcxIDwgMiAmJmFtcDsgMyA+IDQgJmFtcDsmIDUgJmx0OyA3JjgnKVxuICAgKiAjICcxICZsdDsgMiAmYW1wOyZhbXA7IDMgJmd0OyA0ICZhbXA7JmFtcDsgNSAmbHQ7IDcmYW1wOzgnXG4gICAqIH1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVJDRGF0YShyY2RhdGEpIHtcbiAgICByZXR1cm4gcmNkYXRhXG4gICAgICAgIC5yZXBsYWNlKGxvb3NlQW1wUmUsICcmYW1wOyQxJylcbiAgICAgICAgLnJlcGxhY2UobHRSZSwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShndFJlLCAnJmd0OycpO1xuICB9XG5cbiAgLy8gVE9ETyhmZWxpeDhhKTogdmFsaWRhdGUgc2FuaXRpemVyIHJlZ2V4cyBhZ2FpbnN0IHRoZSBIVE1MNSBncmFtbWFyIGF0XG4gIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3N5bnRheC5odG1sXG4gIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3BhcnNpbmcuaHRtbFxuICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90b2tlbml6YXRpb24uaHRtbFxuICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90cmVlLWNvbnN0cnVjdGlvbi5odG1sXG5cbiAgLy8gV2UgaW5pdGlhbGx5IHNwbGl0IGlucHV0IHNvIHRoYXQgcG90ZW50aWFsbHkgbWVhbmluZ2Z1bCBjaGFyYWN0ZXJzXG4gIC8vIGxpa2UgJzwnIGFuZCAnPicgYXJlIHNlcGFyYXRlIHRva2VucywgdXNpbmcgYSBmYXN0IGR1bWIgcHJvY2VzcyB0aGF0XG4gIC8vIGlnbm9yZXMgcXVvdGluZy4gIFRoZW4gd2Ugd2FsayB0aGF0IHRva2VuIHN0cmVhbSwgYW5kIHdoZW4gd2Ugc2VlIGFcbiAgLy8gJzwnIHRoYXQncyB0aGUgc3RhcnQgb2YgYSB0YWcsIHdlIHVzZSBBVFRSX1JFIHRvIGV4dHJhY3QgdGFnXG4gIC8vIGF0dHJpYnV0ZXMgZnJvbSB0aGUgbmV4dCB0b2tlbi4gIFRoYXQgdG9rZW4gd2lsbCBuZXZlciBoYXZlIGEgJz4nXG4gIC8vIGNoYXJhY3Rlci4gIEhvd2V2ZXIsIGl0IG1pZ2h0IGhhdmUgYW4gdW5iYWxhbmNlZCBxdW90ZSBjaGFyYWN0ZXIsIGFuZFxuICAvLyB3aGVuIHdlIHNlZSB0aGF0LCB3ZSBjb21iaW5lIGFkZGl0aW9uYWwgdG9rZW5zIHRvIGJhbGFuY2UgdGhlIHF1b3RlLlxuXG4gIHZhciBBVFRSX1JFID0gbmV3IFJlZ0V4cChcbiAgICAnXlxcXFxzKicgK1xuICAgICcoWy0uOlxcXFx3XSspJyArICAgICAgICAgICAgIC8vIDEgPSBBdHRyaWJ1dGUgbmFtZVxuICAgICcoPzonICsgKFxuICAgICAgJ1xcXFxzKig9KVxcXFxzKicgKyAgICAgICAgICAgLy8gMiA9IElzIHRoZXJlIGEgdmFsdWU/XG4gICAgICAnKCcgKyAoICAgICAgICAgICAgICAgICAgIC8vIDMgPSBBdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgLy8gVE9ETyhmZWxpeDhhKTogbWF5YmUgdXNlIGJhY2tyZWYgdG8gbWF0Y2ggcXVvdGVzXG4gICAgICAgICcoXFxcIilbXlxcXCJdKihcXFwifCQpJyArICAgIC8vIDQsIDUgPSBEb3VibGUtcXVvdGVkIHN0cmluZ1xuICAgICAgICAnfCcgK1xuICAgICAgICAnKFxcJylbXlxcJ10qKFxcJ3wkKScgKyAgICAvLyA2LCA3ID0gU2luZ2xlLXF1b3RlZCBzdHJpbmdcbiAgICAgICAgJ3wnICtcbiAgICAgICAgLy8gUG9zaXRpdmUgbG9va2FoZWFkIHRvIHByZXZlbnQgaW50ZXJwcmV0YXRpb24gb2ZcbiAgICAgICAgLy8gPGZvbyBhPSBiPWM+IGFzIDxmb28gYT0nYj1jJz5cbiAgICAgICAgLy8gVE9ETyhmZWxpeDhhKTogbWlnaHQgYmUgYWJsZSB0byBkcm9wIHRoaXMgY2FzZVxuICAgICAgICAnKD89W2Etel1bLVxcXFx3XSpcXFxccyo9KScgK1xuICAgICAgICAnfCcgK1xuICAgICAgICAvLyBVbnF1b3RlZCB2YWx1ZSB0aGF0IGlzbid0IGFuIGF0dHJpYnV0ZSBuYW1lXG4gICAgICAgIC8vIChzaW5jZSB3ZSBkaWRuJ3QgbWF0Y2ggdGhlIHBvc2l0aXZlIGxvb2thaGVhZCBhYm92ZSlcbiAgICAgICAgJ1teXFxcIlxcJ1xcXFxzXSonICkgK1xuICAgICAgJyknICkgK1xuICAgICcpPycsXG4gICAgJ2knKTtcblxuICAvLyBmYWxzZSBvbiBJRTw9OCwgdHJ1ZSBvbiBtb3N0IG90aGVyIGJyb3dzZXJzXG4gIHZhciBzcGxpdFdpbGxDYXB0dXJlID0gKCdhLGInLnNwbGl0KC8oLCkvKS5sZW5ndGggPT09IDMpO1xuXG4gIC8vIGJpdG1hc2sgZm9yIHRhZ3Mgd2l0aCBzcGVjaWFsIHBhcnNpbmcsIGxpa2UgPHNjcmlwdD4gYW5kIDx0ZXh0YXJlYT5cbiAgdmFyIEVGTEFHU19URVhUID0gaHRtbDQuZWZsYWdzWydDREFUQSddIHwgaHRtbDQuZWZsYWdzWydSQ0RBVEEnXTtcblxuICAvKipcbiAgICogR2l2ZW4gYSBTQVgtbGlrZSBldmVudCBoYW5kbGVyLCBwcm9kdWNlIGEgZnVuY3Rpb24gdGhhdCBmZWVkcyB0aG9zZVxuICAgKiBldmVudHMgYW5kIGEgcGFyYW1ldGVyIHRvIHRoZSBldmVudCBoYW5kbGVyLlxuICAgKlxuICAgKiBUaGUgZXZlbnQgaGFuZGxlciBoYXMgdGhlIGZvcm06e0Bjb2RlXG4gICAqIHtcbiAgICogICAvLyBOYW1lIGlzIGFuIHVwcGVyLWNhc2UgSFRNTCB0YWcgbmFtZS4gIEF0dHJpYnMgaXMgYW4gYXJyYXkgb2ZcbiAgICogICAvLyBhbHRlcm5hdGluZyB1cHBlci1jYXNlIGF0dHJpYnV0ZSBuYW1lcywgYW5kIGF0dHJpYnV0ZSB2YWx1ZXMuICBUaGVcbiAgICogICAvLyBhdHRyaWJzIGFycmF5IGlzIHJldXNlZCBieSB0aGUgcGFyc2VyLiAgUGFyYW0gaXMgdGhlIHZhbHVlIHBhc3NlZCB0b1xuICAgKiAgIC8vIHRoZSBzYXhQYXJzZXIuXG4gICAqICAgc3RhcnRUYWc6IGZ1bmN0aW9uIChuYW1lLCBhdHRyaWJzLCBwYXJhbSkgeyAuLi4gfSxcbiAgICogICBlbmRUYWc6ICAgZnVuY3Rpb24gKG5hbWUsIHBhcmFtKSB7IC4uLiB9LFxuICAgKiAgIHBjZGF0YTogICBmdW5jdGlvbiAodGV4dCwgcGFyYW0pIHsgLi4uIH0sXG4gICAqICAgcmNkYXRhOiAgIGZ1bmN0aW9uICh0ZXh0LCBwYXJhbSkgeyAuLi4gfSxcbiAgICogICBjZGF0YTogICAgZnVuY3Rpb24gKHRleHQsIHBhcmFtKSB7IC4uLiB9LFxuICAgKiAgIHN0YXJ0RG9jOiBmdW5jdGlvbiAocGFyYW0pIHsgLi4uIH0sXG4gICAqICAgZW5kRG9jOiAgIGZ1bmN0aW9uIChwYXJhbSkgeyAuLi4gfVxuICAgKiB9fVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlciBhIHJlY29yZCBjb250YWluaW5nIGV2ZW50IGhhbmRsZXJzLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcsIE9iamVjdCl9IEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIGNodW5rIG9mIEhUTUxcbiAgICogICAgIGFuZCBhIHBhcmFtZXRlci4gIFRoZSBwYXJhbWV0ZXIgaXMgcGFzc2VkIG9uIHRvIHRoZSBoYW5kbGVyIG1ldGhvZHMuXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlU2F4UGFyc2VyKGhhbmRsZXIpIHtcbiAgICAvLyBBY2NlcHQgcXVvdGVkIG9yIHVucXVvdGVkIGtleXMgKENsb3N1cmUgY29tcGF0KVxuICAgIHZhciBoY29weSA9IHtcbiAgICAgIGNkYXRhOiBoYW5kbGVyLmNkYXRhIHx8IGhhbmRsZXJbJ2NkYXRhJ10sXG4gICAgICBjb21tZW50OiBoYW5kbGVyLmNvbW1lbnQgfHwgaGFuZGxlclsnY29tbWVudCddLFxuICAgICAgZW5kRG9jOiBoYW5kbGVyLmVuZERvYyB8fCBoYW5kbGVyWydlbmREb2MnXSxcbiAgICAgIGVuZFRhZzogaGFuZGxlci5lbmRUYWcgfHwgaGFuZGxlclsnZW5kVGFnJ10sXG4gICAgICBwY2RhdGE6IGhhbmRsZXIucGNkYXRhIHx8IGhhbmRsZXJbJ3BjZGF0YSddLFxuICAgICAgcmNkYXRhOiBoYW5kbGVyLnJjZGF0YSB8fCBoYW5kbGVyWydyY2RhdGEnXSxcbiAgICAgIHN0YXJ0RG9jOiBoYW5kbGVyLnN0YXJ0RG9jIHx8IGhhbmRsZXJbJ3N0YXJ0RG9jJ10sXG4gICAgICBzdGFydFRhZzogaGFuZGxlci5zdGFydFRhZyB8fCBoYW5kbGVyWydzdGFydFRhZyddXG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24oaHRtbFRleHQsIHBhcmFtKSB7XG4gICAgICByZXR1cm4gcGFyc2UoaHRtbFRleHQsIGhjb3B5LCBwYXJhbSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFBhcnNpbmcgc3RyYXRlZ3kgaXMgdG8gc3BsaXQgaW5wdXQgaW50byBwYXJ0cyB0aGF0IG1pZ2h0IGJlIGxleGljYWxseVxuICAvLyBtZWFuaW5nZnVsIChldmVyeSBcIj5cIiBiZWNvbWVzIGEgc2VwYXJhdGUgcGFydCksIGFuZCB0aGVuIHJlY29tYmluZVxuICAvLyBwYXJ0cyBpZiB3ZSBkaXNjb3ZlciB0aGV5J3JlIGluIGEgZGlmZmVyZW50IGNvbnRleHQuXG5cbiAgLy8gVE9ETyhmZWxpeDhhKTogU2lnbmlmaWNhbnQgcGVyZm9ybWFuY2UgcmVncmVzc2lvbnMgZnJvbSAtbGVnYWN5LFxuICAvLyB0ZXN0ZWQgb25cbiAgLy8gICAgQ2hyb21lIDE4LjBcbiAgLy8gICAgRmlyZWZveCAxMS4wXG4gIC8vICAgIElFIDYsIDcsIDgsIDlcbiAgLy8gICAgT3BlcmEgMTEuNjFcbiAgLy8gICAgU2FmYXJpIDUuMS4zXG4gIC8vIE1hbnkgb2YgdGhlc2UgYXJlIHVudXN1YWwgcGF0dGVybnMgdGhhdCBhcmUgbGluZWFybHkgc2xvd2VyIGFuZCBzdGlsbFxuICAvLyBwcmV0dHkgZmFzdCAoZWcgMW1zIHRvIDVtcyksIHNvIG5vdCBuZWNlc3NhcmlseSB3b3J0aCBmaXhpbmcuXG5cbiAgLy8gVE9ETyhmZWxpeDhhKTogXCI8c2NyaXB0PiAmJiAmJiAmJiAuLi4gPFxcL3NjcmlwdD5cIiBpcyBzbG93ZXIgb24gYWxsXG4gIC8vIGJyb3dzZXJzLiAgVGhlIGhvdHNwb3QgaXMgaHRtbFNwbGl0LlxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IFwiPHAgdGl0bGU9Jz4+Pj4uLi4nPjxcXC9wPlwiIGlzIHNsb3dlciBvbiBhbGwgYnJvd3NlcnMuXG4gIC8vIFRoaXMgaXMgcGFydGx5IGh0bWxTcGxpdCwgYnV0IHRoZSBob3RzcG90IGlzIHBhcnNlVGFnQW5kQXR0cnMuXG5cbiAgLy8gVE9ETyhmZWxpeDhhKTogXCI8YT48XFwvYT48YT48XFwvYT4uLi5cIiBpcyBzbG93ZXIgb24gSUU5LlxuICAvLyBcIjxhPjE8XFwvYT48YT4xPFxcL2E+Li4uXCIgaXMgZmFzdGVyLCBcIjxhPjxcXC9hPjI8YT48XFwvYT4yLi4uXCIgaXMgZmFzdGVyLlxuXG4gIC8vIFRPRE8oZmVsaXg4YSk6IFwiPHA8cDxwLi4uXCIgaXMgc2xvd2VyIG9uIElFWzYtOF1cblxuICB2YXIgY29udGludWF0aW9uTWFya2VyID0ge307XG4gIGZ1bmN0aW9uIHBhcnNlKGh0bWxUZXh0LCBoYW5kbGVyLCBwYXJhbSkge1xuICAgIHZhciBtLCBwLCB0YWdOYW1lO1xuICAgIHZhciBwYXJ0cyA9IGh0bWxTcGxpdChodG1sVGV4dCk7XG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbm9Nb3JlR1Q6IGZhbHNlLFxuICAgICAgbm9Nb3JlRW5kQ29tbWVudHM6IGZhbHNlXG4gICAgfTtcbiAgICBwYXJzZUNQUyhoYW5kbGVyLCBwYXJ0cywgMCwgc3RhdGUsIHBhcmFtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBpbml0aWFsLCBzdGF0ZSwgcGFyYW0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcGFyc2VDUFMoaCwgcGFydHMsIGluaXRpYWwsIHN0YXRlLCBwYXJhbSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQ1BTKGgsIHBhcnRzLCBpbml0aWFsLCBzdGF0ZSwgcGFyYW0pIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGguc3RhcnREb2MgJiYgaW5pdGlhbCA9PSAwKSB7IGguc3RhcnREb2MocGFyYW0pOyB9XG4gICAgICB2YXIgbSwgcCwgdGFnTmFtZTtcbiAgICAgIGZvciAodmFyIHBvcyA9IGluaXRpYWwsIGVuZCA9IHBhcnRzLmxlbmd0aDsgcG9zIDwgZW5kOykge1xuICAgICAgICB2YXIgY3VycmVudCA9IHBhcnRzW3BvcysrXTtcbiAgICAgICAgdmFyIG5leHQgPSBwYXJ0c1twb3NdO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnQpIHtcbiAgICAgICAgY2FzZSAnJic6XG4gICAgICAgICAgaWYgKEVOVElUWV9SRV8yLnRlc3QobmV4dCkpIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgICBoLnBjZGF0YSgnJicgKyBuZXh0LCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkgeyBoLnBjZGF0YShcIiZhbXA7XCIsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc8XFwvJzpcbiAgICAgICAgICBpZiAobSA9IC9eKFstXFx3Ol0rKVteXFwnXFxcIl0qLy5leGVjKG5leHQpKSB7XG4gICAgICAgICAgICBpZiAobVswXS5sZW5ndGggPT09IG5leHQubGVuZ3RoICYmIHBhcnRzW3BvcyArIDFdID09PSAnPicpIHtcbiAgICAgICAgICAgICAgLy8gZmFzdCBjYXNlLCBubyBhdHRyaWJ1dGUgcGFyc2luZyBuZWVkZWRcbiAgICAgICAgICAgICAgcG9zICs9IDI7XG4gICAgICAgICAgICAgIHRhZ05hbWUgPSBtWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIGlmIChoLmVuZFRhZykge1xuICAgICAgICAgICAgICAgIGguZW5kVGFnKHRhZ05hbWUsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gc2xvdyBjYXNlLCBuZWVkIHRvIHBhcnNlIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgLy8gVE9ETyhmZWxpeDhhKTogZG8gd2UgcmVhbGx5IGNhcmUgYWJvdXQgbWlzcGFyc2luZyB0aGlzP1xuICAgICAgICAgICAgICBwb3MgPSBwYXJzZUVuZFRhZyhcbiAgICAgICAgICAgICAgICBwYXJ0cywgcG9zLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgICBoLnBjZGF0YSgnJmx0Oy8nLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgaWYgKG0gPSAvXihbLVxcdzpdKylcXHMqXFwvPy8uZXhlYyhuZXh0KSkge1xuICAgICAgICAgICAgaWYgKG1bMF0ubGVuZ3RoID09PSBuZXh0Lmxlbmd0aCAmJiBwYXJ0c1twb3MgKyAxXSA9PT0gJz4nKSB7XG4gICAgICAgICAgICAgIC8vIGZhc3QgY2FzZSwgbm8gYXR0cmlidXRlIHBhcnNpbmcgbmVlZGVkXG4gICAgICAgICAgICAgIHBvcyArPSAyO1xuICAgICAgICAgICAgICB0YWdOYW1lID0gbVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICBpZiAoaC5zdGFydFRhZykge1xuICAgICAgICAgICAgICAgIGguc3RhcnRUYWcodGFnTmFtZSwgW10sIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyB0YWdzIGxpa2UgPHNjcmlwdD4gYW5kIDx0ZXh0YXJlYT4gaGF2ZSBzcGVjaWFsIHBhcnNpbmdcbiAgICAgICAgICAgICAgdmFyIGVmbGFncyA9IGh0bWw0LkVMRU1FTlRTW3RhZ05hbWVdO1xuICAgICAgICAgICAgICBpZiAoZWZsYWdzICYgRUZMQUdTX1RFWFQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0geyBuYW1lOiB0YWdOYW1lLCBuZXh0OiBwb3MsIGVmbGFnczogZWZsYWdzIH07XG4gICAgICAgICAgICAgICAgcG9zID0gcGFyc2VUZXh0KFxuICAgICAgICAgICAgICAgICAgcGFydHMsIHRhZywgaCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlciwgc3RhdGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBzbG93IGNhc2UsIG5lZWQgdG8gcGFyc2UgYXR0cmlidXRlc1xuICAgICAgICAgICAgICBwb3MgPSBwYXJzZVN0YXJ0VGFnKFxuICAgICAgICAgICAgICAgIHBhcnRzLCBwb3MsIGgsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsIHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGgucGNkYXRhKSB7XG4gICAgICAgICAgICAgIGgucGNkYXRhKCcmbHQ7JywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzxcXCEtLSc6XG4gICAgICAgICAgLy8gVGhlIHBhdGhvbG9naWNhbCBjYXNlIGlzIG4gY29waWVzIG9mICc8XFwhLS0nIHdpdGhvdXQgJy0tPicsIGFuZFxuICAgICAgICAgIC8vIHJlcGVhdGVkIGZhaWx1cmUgdG8gZmluZCAnLS0+JyBpcyBxdWFkcmF0aWMuICBXZSBhdm9pZCB0aGF0IGJ5XG4gICAgICAgICAgLy8gcmVtZW1iZXJpbmcgd2hlbiBzZWFyY2ggZm9yICctLT4nIGZhaWxzLlxuICAgICAgICAgIGlmICghc3RhdGUubm9Nb3JlRW5kQ29tbWVudHMpIHtcbiAgICAgICAgICAgIC8vIEEgY29tbWVudCA8XFwhLS14LS0+IGlzIHNwbGl0IGludG8gdGhyZWUgdG9rZW5zOlxuICAgICAgICAgICAgLy8gICAnPFxcIS0tJywgJ3gtLScsICc+J1xuICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBmaW5kIHRoZSBuZXh0ICc+JyB0b2tlbiB0aGF0IGhhcyBhIHByZWNlZGluZyAnLS0nLlxuICAgICAgICAgICAgLy8gcG9zIGlzIGF0IHRoZSAneC0tJy5cbiAgICAgICAgICAgIGZvciAocCA9IHBvcyArIDE7IHAgPCBlbmQ7IHArKykge1xuICAgICAgICAgICAgICBpZiAocGFydHNbcF0gPT09ICc+JyAmJiAvLS0kLy50ZXN0KHBhcnRzW3AgLSAxXSkpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwIDwgZW5kKSB7XG4gICAgICAgICAgICAgIGlmIChoLmNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IHBhcnRzLnNsaWNlKHBvcywgcCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgaC5jb21tZW50KFxuICAgICAgICAgICAgICAgICAgY29tbWVudC5zdWJzdHIoMCwgY29tbWVudC5sZW5ndGggLSAyKSwgcGFyYW0sXG4gICAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcCArIDEsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBvcyA9IHAgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhdGUubm9Nb3JlRW5kQ29tbWVudHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUubm9Nb3JlRW5kQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgICBoLnBjZGF0YSgnJmx0OyEtLScsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsXG4gICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc8XFwhJzpcbiAgICAgICAgICBpZiAoIS9eXFx3Ly50ZXN0KG5leHQpKSB7XG4gICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgaC5wY2RhdGEoJyZsdDshJywgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2ltaWxhciB0byBub01vcmVFbmRDb21tZW50IGxvZ2ljXG4gICAgICAgICAgICBpZiAoIXN0YXRlLm5vTW9yZUdUKSB7XG4gICAgICAgICAgICAgIGZvciAocCA9IHBvcyArIDE7IHAgPCBlbmQ7IHArKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1twXSA9PT0gJz4nKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHAgPCBlbmQpIHtcbiAgICAgICAgICAgICAgICBwb3MgPSBwICsgMTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5ub01vcmVHVCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZS5ub01vcmVHVCkge1xuICAgICAgICAgICAgICBpZiAoaC5wY2RhdGEpIHtcbiAgICAgICAgICAgICAgICBoLnBjZGF0YSgnJmx0OyEnLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzw/JzpcbiAgICAgICAgICAvLyBzaW1pbGFyIHRvIG5vTW9yZUVuZENvbW1lbnQgbG9naWNcbiAgICAgICAgICBpZiAoIXN0YXRlLm5vTW9yZUdUKSB7XG4gICAgICAgICAgICBmb3IgKHAgPSBwb3MgKyAxOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnRzW3BdID09PSAnPicpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwIDwgZW5kKSB7XG4gICAgICAgICAgICAgIHBvcyA9IHAgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhdGUubm9Nb3JlR1QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUubm9Nb3JlR1QpIHtcbiAgICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgICBoLnBjZGF0YSgnJmx0Oz8nLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwb3MsIHN0YXRlLCBwYXJhbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGgucGNkYXRhKSB7XG4gICAgICAgICAgICBoLnBjZGF0YShcIiZndDtcIiwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmIChoLnBjZGF0YSkge1xuICAgICAgICAgICAgaC5wY2RhdGEoY3VycmVudCwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICAgICAgY29udGludWF0aW9uTWFrZXIoaCwgcGFydHMsIHBvcywgc3RhdGUsIHBhcmFtKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaC5lbmREb2MpIHsgaC5lbmREb2MocGFyYW0pOyB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgIT09IGNvbnRpbnVhdGlvbk1hcmtlcikgeyB0aHJvdyBlOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gU3BsaXQgc3RyIGludG8gcGFydHMgZm9yIHRoZSBodG1sIHBhcnNlci5cbiAgZnVuY3Rpb24gaHRtbFNwbGl0KHN0cikge1xuICAgIC8vIGNhbid0IGhvaXN0IHRoaXMgb3V0IG9mIHRoZSBmdW5jdGlvbiBiZWNhdXNlIG9mIHRoZSByZS5leGVjIGxvb3AuXG4gICAgdmFyIHJlID0gLyg8XFwvfDxcXCEtLXw8WyE/XXxbJjw+XSkvZztcbiAgICBzdHIgKz0gJyc7XG4gICAgaWYgKHNwbGl0V2lsbENhcHR1cmUpIHtcbiAgICAgIHJldHVybiBzdHIuc3BsaXQocmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgIHZhciBsYXN0UG9zID0gMDtcbiAgICAgIHZhciBtO1xuICAgICAgd2hpbGUgKChtID0gcmUuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgICAgICBwYXJ0cy5wdXNoKHN0ci5zdWJzdHJpbmcobGFzdFBvcywgbS5pbmRleCkpO1xuICAgICAgICBwYXJ0cy5wdXNoKG1bMF0pO1xuICAgICAgICBsYXN0UG9zID0gbS5pbmRleCArIG1bMF0ubGVuZ3RoO1xuICAgICAgfVxuICAgICAgcGFydHMucHVzaChzdHIuc3Vic3RyaW5nKGxhc3RQb3MpKTtcbiAgICAgIHJldHVybiBwYXJ0cztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUVuZFRhZyhwYXJ0cywgcG9zLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSkge1xuICAgIHZhciB0YWcgPSBwYXJzZVRhZ0FuZEF0dHJzKHBhcnRzLCBwb3MpO1xuICAgIC8vIGRyb3AgdW5jbG9zZWQgdGFnc1xuICAgIGlmICghdGFnKSB7IHJldHVybiBwYXJ0cy5sZW5ndGg7IH1cbiAgICBpZiAoaC5lbmRUYWcpIHtcbiAgICAgIGguZW5kVGFnKHRhZy5uYW1lLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcG9zLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhZy5uZXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VTdGFydFRhZyhwYXJ0cywgcG9zLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSkge1xuICAgIHZhciB0YWcgPSBwYXJzZVRhZ0FuZEF0dHJzKHBhcnRzLCBwb3MpO1xuICAgIC8vIGRyb3AgdW5jbG9zZWQgdGFnc1xuICAgIGlmICghdGFnKSB7IHJldHVybiBwYXJ0cy5sZW5ndGg7IH1cbiAgICBpZiAoaC5zdGFydFRhZykge1xuICAgICAgaC5zdGFydFRhZyh0YWcubmFtZSwgdGFnLmF0dHJzLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgdGFnLm5leHQsIHN0YXRlLCBwYXJhbSkpO1xuICAgIH1cbiAgICAvLyB0YWdzIGxpa2UgPHNjcmlwdD4gYW5kIDx0ZXh0YXJlYT4gaGF2ZSBzcGVjaWFsIHBhcnNpbmdcbiAgICBpZiAodGFnLmVmbGFncyAmIEVGTEFHU19URVhUKSB7XG4gICAgICByZXR1cm4gcGFyc2VUZXh0KHBhcnRzLCB0YWcsIGgsIHBhcmFtLCBjb250aW51YXRpb25NYXJrZXIsIHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRhZy5uZXh0O1xuICAgIH1cbiAgfVxuXG4gIHZhciBlbmRUYWdSZSA9IHt9O1xuXG4gIC8vIFRhZ3MgbGlrZSA8c2NyaXB0PiBhbmQgPHRleHRhcmVhPiBhcmUgZmxhZ2dlZCBhcyBDREFUQSBvciBSQ0RBVEEsXG4gIC8vIHdoaWNoIG1lYW5zIGV2ZXJ5dGhpbmcgaXMgdGV4dCB1bnRpbCB3ZSBzZWUgdGhlIGNvcnJlY3QgY2xvc2luZyB0YWcuXG4gIGZ1bmN0aW9uIHBhcnNlVGV4dChwYXJ0cywgdGFnLCBoLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLCBzdGF0ZSkge1xuICAgIHZhciBlbmQgPSBwYXJ0cy5sZW5ndGg7XG4gICAgaWYgKCFlbmRUYWdSZS5oYXNPd25Qcm9wZXJ0eSh0YWcubmFtZSkpIHtcbiAgICAgIGVuZFRhZ1JlW3RhZy5uYW1lXSA9IG5ldyBSZWdFeHAoJ14nICsgdGFnLm5hbWUgKyAnKD86W1xcXFxzXFxcXC9dfCQpJywgJ2knKTtcbiAgICB9XG4gICAgdmFyIHJlID0gZW5kVGFnUmVbdGFnLm5hbWVdO1xuICAgIHZhciBmaXJzdCA9IHRhZy5uZXh0O1xuICAgIHZhciBwID0gdGFnLm5leHQgKyAxO1xuICAgIGZvciAoOyBwIDwgZW5kOyBwKyspIHtcbiAgICAgIGlmIChwYXJ0c1twIC0gMV0gPT09ICc8XFwvJyAmJiByZS50ZXN0KHBhcnRzW3BdKSkgeyBicmVhazsgfVxuICAgIH1cbiAgICBpZiAocCA8IGVuZCkgeyBwIC09IDE7IH1cbiAgICB2YXIgYnVmID0gcGFydHMuc2xpY2UoZmlyc3QsIHApLmpvaW4oJycpO1xuICAgIGlmICh0YWcuZWZsYWdzICYgaHRtbDQuZWZsYWdzWydDREFUQSddKSB7XG4gICAgICBpZiAoaC5jZGF0YSkge1xuICAgICAgICBoLmNkYXRhKGJ1ZiwgcGFyYW0sIGNvbnRpbnVhdGlvbk1hcmtlcixcbiAgICAgICAgICBjb250aW51YXRpb25NYWtlcihoLCBwYXJ0cywgcCwgc3RhdGUsIHBhcmFtKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0YWcuZWZsYWdzICYgaHRtbDQuZWZsYWdzWydSQ0RBVEEnXSkge1xuICAgICAgaWYgKGgucmNkYXRhKSB7XG4gICAgICAgIGgucmNkYXRhKG5vcm1hbGl6ZVJDRGF0YShidWYpLCBwYXJhbSwgY29udGludWF0aW9uTWFya2VyLFxuICAgICAgICAgIGNvbnRpbnVhdGlvbk1ha2VyKGgsIHBhcnRzLCBwLCBzdGF0ZSwgcGFyYW0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdidWcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICAvLyBhdCB0aGlzIHBvaW50LCBwYXJ0c1twb3MtMV0gaXMgZWl0aGVyIFwiPFwiIG9yIFwiPFxcL1wiLlxuICBmdW5jdGlvbiBwYXJzZVRhZ0FuZEF0dHJzKHBhcnRzLCBwb3MpIHtcbiAgICB2YXIgbSA9IC9eKFstXFx3Ol0rKS8uZXhlYyhwYXJ0c1twb3NdKTtcbiAgICB2YXIgdGFnID0ge307XG4gICAgdGFnLm5hbWUgPSBtWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgdGFnLmVmbGFncyA9IGh0bWw0LkVMRU1FTlRTW3RhZy5uYW1lXTtcbiAgICB2YXIgYnVmID0gcGFydHNbcG9zXS5zdWJzdHIobVswXS5sZW5ndGgpO1xuICAgIC8vIEZpbmQgdGhlIG5leHQgJz4nLiAgV2Ugb3B0aW1pc3RpY2FsbHkgYXNzdW1lIHRoaXMgJz4nIGlzIG5vdCBpbiBhXG4gICAgLy8gcXVvdGVkIGNvbnRleHQsIGFuZCBmdXJ0aGVyIGRvd24gd2UgZml4IHRoaW5ncyB1cCBpZiBpdCB0dXJucyBvdXQgdG9cbiAgICAvLyBiZSBxdW90ZWQuXG4gICAgdmFyIHAgPSBwb3MgKyAxO1xuICAgIHZhciBlbmQgPSBwYXJ0cy5sZW5ndGg7XG4gICAgZm9yICg7IHAgPCBlbmQ7IHArKykge1xuICAgICAgaWYgKHBhcnRzW3BdID09PSAnPicpIHsgYnJlYWs7IH1cbiAgICAgIGJ1ZiArPSBwYXJ0c1twXTtcbiAgICB9XG4gICAgaWYgKGVuZCA8PSBwKSB7IHJldHVybiB2b2lkIDA7IH1cbiAgICB2YXIgYXR0cnMgPSBbXTtcbiAgICB3aGlsZSAoYnVmICE9PSAnJykge1xuICAgICAgbSA9IEFUVFJfUkUuZXhlYyhidWYpO1xuICAgICAgaWYgKCFtKSB7XG4gICAgICAgIC8vIE5vIGF0dHJpYnV0ZSBmb3VuZDogc2tpcCBnYXJiYWdlXG4gICAgICAgIGJ1ZiA9IGJ1Zi5yZXBsYWNlKC9eW1xcc1xcU11bXmEtelxcc10qLywgJycpO1xuXG4gICAgICB9IGVsc2UgaWYgKChtWzRdICYmICFtWzVdKSB8fCAobVs2XSAmJiAhbVs3XSkpIHtcbiAgICAgICAgLy8gVW50ZXJtaW5hdGVkIHF1b3RlOiBzbHVycCB0byB0aGUgbmV4dCB1bnF1b3RlZCAnPidcbiAgICAgICAgdmFyIHF1b3RlID0gbVs0XSB8fCBtWzZdO1xuICAgICAgICB2YXIgc2F3UXVvdGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGFidWYgPSBbYnVmLCBwYXJ0c1twKytdXTtcbiAgICAgICAgZm9yICg7IHAgPCBlbmQ7IHArKykge1xuICAgICAgICAgIGlmIChzYXdRdW90ZSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW3BdID09PSAnPicpIHsgYnJlYWs7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKDAgPD0gcGFydHNbcF0uaW5kZXhPZihxdW90ZSkpIHtcbiAgICAgICAgICAgIHNhd1F1b3RlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWJ1Zi5wdXNoKHBhcnRzW3BdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTbHVycCBmYWlsZWQ6IGxvc2UgdGhlIGdhcmJhZ2VcbiAgICAgICAgaWYgKGVuZCA8PSBwKSB7IGJyZWFrOyB9XG4gICAgICAgIC8vIE90aGVyd2lzZSByZXRyeSBhdHRyaWJ1dGUgcGFyc2luZ1xuICAgICAgICBidWYgPSBhYnVmLmpvaW4oJycpO1xuICAgICAgICBjb250aW51ZTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBhbiBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGFOYW1lID0gbVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgYVZhbHVlID0gbVsyXSA/IGRlY29kZVZhbHVlKG1bM10pIDogJyc7XG4gICAgICAgIGF0dHJzLnB1c2goYU5hbWUsIGFWYWx1ZSk7XG4gICAgICAgIGJ1ZiA9IGJ1Zi5zdWJzdHIobVswXS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICB0YWcuYXR0cnMgPSBhdHRycztcbiAgICB0YWcubmV4dCA9IHAgKyAxO1xuICAgIHJldHVybiB0YWc7XG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGVWYWx1ZSh2KSB7XG4gICAgdmFyIHEgPSB2LmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKHEgPT09IDB4MjIgfHwgcSA9PT0gMHgyNykgeyAvLyBcIiBvciAnXG4gICAgICB2ID0gdi5zdWJzdHIoMSwgdi5sZW5ndGggLSAyKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZXNjYXBlRW50aXRpZXMoc3RyaXBOVUxzKHYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBzdHJpcHMgdW5zYWZlIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgZnJvbSBodG1sLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZywgQXJyYXkuPHN0cmluZz4pOiA/QXJyYXkuPHN0cmluZz59IHRhZ1BvbGljeVxuICAgKiAgICAgQSBmdW5jdGlvbiB0aGF0IHRha2VzICh0YWdOYW1lLCBhdHRyaWJzW10pLCB3aGVyZSB0YWdOYW1lIGlzIGEga2V5IGluXG4gICAqICAgICBodG1sNC5FTEVNRU5UUyBhbmQgYXR0cmlicyBpcyBhbiBhcnJheSBvZiBhbHRlcm5hdGluZyBhdHRyaWJ1dGUgbmFtZXNcbiAgICogICAgIGFuZCB2YWx1ZXMuICBJdCBzaG91bGQgcmV0dXJuIGEgcmVjb3JkIChhcyBmb2xsb3dzKSwgb3IgbnVsbCB0byBkZWxldGVcbiAgICogICAgIHRoZSBlbGVtZW50LiAgSXQncyBva2F5IGZvciB0YWdQb2xpY3kgdG8gbW9kaWZ5IHRoZSBhdHRyaWJzIGFycmF5LFxuICAgKiAgICAgYnV0IHRoZSBzYW1lIGFycmF5IGlzIHJldXNlZCwgc28gaXQgc2hvdWxkIG5vdCBiZSBoZWxkIGJldHdlZW4gY2FsbHMuXG4gICAqICAgICBSZWNvcmQga2V5czpcbiAgICogICAgICAgIGF0dHJpYnM6IChyZXF1aXJlZCkgU2FuaXRpemVkIGF0dHJpYnV0ZXMgYXJyYXkuXG4gICAqICAgICAgICB0YWdOYW1lOiBSZXBsYWNlbWVudCB0YWcgbmFtZS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nLCBBcnJheSl9IEEgZnVuY3Rpb24gdGhhdCBzYW5pdGl6ZXMgYSBzdHJpbmcgb2ZcbiAgICogICAgIEhUTUwgYW5kIGFwcGVuZHMgcmVzdWx0IHN0cmluZ3MgdG8gdGhlIHNlY29uZCBhcmd1bWVudCwgYW4gYXJyYXkuXG4gICAqL1xuICBmdW5jdGlvbiBtYWtlSHRtbFNhbml0aXplcih0YWdQb2xpY3kpIHtcbiAgICB2YXIgc3RhY2s7XG4gICAgdmFyIGlnbm9yaW5nO1xuICAgIHZhciBlbWl0ID0gZnVuY3Rpb24gKHRleHQsIG91dCkge1xuICAgICAgaWYgKCFpZ25vcmluZykgeyBvdXQucHVzaCh0ZXh0KTsgfVxuICAgIH07XG4gICAgcmV0dXJuIG1ha2VTYXhQYXJzZXIoe1xuICAgICAgJ3N0YXJ0RG9jJzogZnVuY3Rpb24oXykge1xuICAgICAgICBzdGFjayA9IFtdO1xuICAgICAgICBpZ25vcmluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgICdzdGFydFRhZyc6IGZ1bmN0aW9uKHRhZ05hbWVPcmlnLCBhdHRyaWJzLCBvdXQpIHtcbiAgICAgICAgaWYgKGlnbm9yaW5nKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoIWh0bWw0LkVMRU1FTlRTLmhhc093blByb3BlcnR5KHRhZ05hbWVPcmlnKSkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGVmbGFnc09yaWcgPSBodG1sNC5FTEVNRU5UU1t0YWdOYW1lT3JpZ107XG4gICAgICAgIGlmIChlZmxhZ3NPcmlnICYgaHRtbDQuZWZsYWdzWydGT0xEQUJMRSddKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlY2lzaW9uID0gdGFnUG9saWN5KHRhZ05hbWVPcmlnLCBhdHRyaWJzKTtcbiAgICAgICAgaWYgKCFkZWNpc2lvbikge1xuICAgICAgICAgIGlnbm9yaW5nID0gIShlZmxhZ3NPcmlnICYgaHRtbDQuZWZsYWdzWydFTVBUWSddKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlY2lzaW9uICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFnUG9saWN5IGRpZCBub3QgcmV0dXJuIG9iamVjdCAob2xkIEFQST8pJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdhdHRyaWJzJyBpbiBkZWNpc2lvbikge1xuICAgICAgICAgIGF0dHJpYnMgPSBkZWNpc2lvblsnYXR0cmlicyddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGFnUG9saWN5IGdhdmUgbm8gYXR0cmlicycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlZmxhZ3NSZXA7XG4gICAgICAgIHZhciB0YWdOYW1lUmVwO1xuICAgICAgICBpZiAoJ3RhZ05hbWUnIGluIGRlY2lzaW9uKSB7XG4gICAgICAgICAgdGFnTmFtZVJlcCA9IGRlY2lzaW9uWyd0YWdOYW1lJ107XG4gICAgICAgICAgZWZsYWdzUmVwID0gaHRtbDQuRUxFTUVOVFNbdGFnTmFtZVJlcF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFnTmFtZVJlcCA9IHRhZ05hbWVPcmlnO1xuICAgICAgICAgIGVmbGFnc1JlcCA9IGVmbGFnc09yaWc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETyhtaWtlc2FtdWVsKTogcmVseWluZyBvbiB0YWdQb2xpY3kgbm90IHRvIGluc2VydCB1bnNhZmVcbiAgICAgICAgLy8gYXR0cmlidXRlIG5hbWVzLlxuXG4gICAgICAgIC8vIElmIHRoaXMgaXMgYW4gb3B0aW9uYWwtZW5kLXRhZyBlbGVtZW50IGFuZCBlaXRoZXIgdGhpcyBlbGVtZW50IG9yIGl0c1xuICAgICAgICAvLyBwcmV2aW91cyBsaWtlIHNpYmxpbmcgd2FzIHJld3JpdHRlbiwgdGhlbiBpbnNlcnQgYSBjbG9zZSB0YWcgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgc3RydWN0dXJlLlxuICAgICAgICBpZiAoZWZsYWdzT3JpZyAmIGh0bWw0LmVmbGFnc1snT1BUSU9OQUxfRU5EVEFHJ10pIHtcbiAgICAgICAgICB2YXIgb25TdGFjayA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmIChvblN0YWNrICYmIG9uU3RhY2sub3JpZyA9PT0gdGFnTmFtZU9yaWcgJiZcbiAgICAgICAgICAgICAgKG9uU3RhY2sucmVwICE9PSB0YWdOYW1lUmVwIHx8IHRhZ05hbWVPcmlnICE9PSB0YWdOYW1lUmVwKSkge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKCc8XFwvJywgb25TdGFjay5yZXAsICc+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoZWZsYWdzT3JpZyAmIGh0bWw0LmVmbGFnc1snRU1QVFknXSkpIHtcbiAgICAgICAgICBzdGFjay5wdXNoKHtvcmlnOiB0YWdOYW1lT3JpZywgcmVwOiB0YWdOYW1lUmVwfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXQucHVzaCgnPCcsIHRhZ05hbWVSZXApO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGF0dHJpYnMubGVuZ3RoOyBpIDwgbjsgaSArPSAyKSB7XG4gICAgICAgICAgdmFyIGF0dHJpYk5hbWUgPSBhdHRyaWJzW2ldLFxuICAgICAgICAgICAgICB2YWx1ZSA9IGF0dHJpYnNbaSArIDFdO1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBvdXQucHVzaCgnICcsIGF0dHJpYk5hbWUsICc9XCInLCBlc2NhcGVBdHRyaWIodmFsdWUpLCAnXCInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0LnB1c2goJz4nKTtcblxuICAgICAgICBpZiAoKGVmbGFnc09yaWcgJiBodG1sNC5lZmxhZ3NbJ0VNUFRZJ10pXG4gICAgICAgICAgICAmJiAhKGVmbGFnc1JlcCAmIGh0bWw0LmVmbGFnc1snRU1QVFknXSkpIHtcbiAgICAgICAgICAvLyByZXBsYWNlbWVudCBpcyBub24tZW1wdHksIHN5bnRoZXNpemUgZW5kIHRhZ1xuICAgICAgICAgIG91dC5wdXNoKCc8XFwvJywgdGFnTmFtZVJlcCwgJz4nKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdlbmRUYWcnOiBmdW5jdGlvbih0YWdOYW1lLCBvdXQpIHtcbiAgICAgICAgaWYgKGlnbm9yaW5nKSB7XG4gICAgICAgICAgaWdub3JpbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodG1sNC5FTEVNRU5UUy5oYXNPd25Qcm9wZXJ0eSh0YWdOYW1lKSkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGVmbGFncyA9IGh0bWw0LkVMRU1FTlRTW3RhZ05hbWVdO1xuICAgICAgICBpZiAoIShlZmxhZ3MgJiAoaHRtbDQuZWZsYWdzWydFTVBUWSddIHwgaHRtbDQuZWZsYWdzWydGT0xEQUJMRSddKSkpIHtcbiAgICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgICAgaWYgKGVmbGFncyAmIGh0bWw0LmVmbGFnc1snT1BUSU9OQUxfRU5EVEFHJ10pIHtcbiAgICAgICAgICAgIGZvciAoaW5kZXggPSBzdGFjay5sZW5ndGg7IC0taW5kZXggPj0gMDspIHtcbiAgICAgICAgICAgICAgdmFyIHN0YWNrRWxPcmlnVGFnID0gc3RhY2tbaW5kZXhdLm9yaWc7XG4gICAgICAgICAgICAgIGlmIChzdGFja0VsT3JpZ1RhZyA9PT0gdGFnTmFtZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgICBpZiAoIShodG1sNC5FTEVNRU5UU1tzdGFja0VsT3JpZ1RhZ10gJlxuICAgICAgICAgICAgICAgICAgICBodG1sNC5lZmxhZ3NbJ09QVElPTkFMX0VORFRBRyddKSkge1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHBvcCBub24gb3B0aW9uYWwgZW5kIHRhZ3MgbG9va2luZyBmb3IgYSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChpbmRleCA9IHN0YWNrLmxlbmd0aDsgLS1pbmRleCA+PSAwOykge1xuICAgICAgICAgICAgICBpZiAoc3RhY2tbaW5kZXhdLm9yaWcgPT09IHRhZ05hbWUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4IDwgMCkgeyByZXR1cm47IH0gIC8vIE5vdCBvcGVuZWQuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHN0YWNrLmxlbmd0aDsgLS1pID4gaW5kZXg7KSB7XG4gICAgICAgICAgICB2YXIgc3RhY2tFbFJlcFRhZyA9IHN0YWNrW2ldLnJlcDtcbiAgICAgICAgICAgIGlmICghKGh0bWw0LkVMRU1FTlRTW3N0YWNrRWxSZXBUYWddICZcbiAgICAgICAgICAgICAgICAgIGh0bWw0LmVmbGFnc1snT1BUSU9OQUxfRU5EVEFHJ10pKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCc8XFwvJywgc3RhY2tFbFJlcFRhZywgJz4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4IDwgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gc3RhY2tbaW5kZXhdLnJlcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhY2subGVuZ3RoID0gaW5kZXg7XG4gICAgICAgICAgb3V0LnB1c2goJzxcXC8nLCB0YWdOYW1lLCAnPicpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3BjZGF0YSc6IGVtaXQsXG4gICAgICAncmNkYXRhJzogZW1pdCxcbiAgICAgICdjZGF0YSc6IGVtaXQsXG4gICAgICAnZW5kRG9jJzogZnVuY3Rpb24ob3V0KSB7XG4gICAgICAgIGZvciAoOyBzdGFjay5sZW5ndGg7IHN0YWNrLmxlbmd0aC0tKSB7XG4gICAgICAgICAgb3V0LnB1c2goJzxcXC8nLCBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5yZXAsICc+Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBBTExPV0VEX1VSSV9TQ0hFTUVTID0gL14oPzpodHRwcz98bWFpbHRvfGRhdGEpJC9pO1xuXG4gIGZ1bmN0aW9uIHNhZmVVcmkodXJpLCBlZmZlY3QsIGx0eXBlLCBoaW50cywgbmFpdmVVcmlSZXdyaXRlcikge1xuICAgIGlmICghbmFpdmVVcmlSZXdyaXRlcikgeyByZXR1cm4gbnVsbDsgfVxuICAgIHRyeSB7XG4gICAgICB2YXIgcGFyc2VkID0gVVJJLnBhcnNlKCcnICsgdXJpKTtcbiAgICAgIGlmIChwYXJzZWQpIHtcbiAgICAgICAgaWYgKCFwYXJzZWQuaGFzU2NoZW1lKCkgfHxcbiAgICAgICAgICAgIEFMTE9XRURfVVJJX1NDSEVNRVMudGVzdChwYXJzZWQuZ2V0U2NoZW1lKCkpKSB7XG4gICAgICAgICAgdmFyIHNhZmUgPSBuYWl2ZVVyaVJld3JpdGVyKHBhcnNlZCwgZWZmZWN0LCBsdHlwZSwgaGludHMpO1xuICAgICAgICAgIHJldHVybiBzYWZlID8gc2FmZS50b1N0cmluZygpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZyhsb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmICghYXR0cmliTmFtZSkge1xuICAgICAgbG9nZ2VyKHRhZ05hbWUgKyBcIiByZW1vdmVkXCIsIHtcbiAgICAgICAgY2hhbmdlOiBcInJlbW92ZWRcIixcbiAgICAgICAgdGFnTmFtZTogdGFnTmFtZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHZhciBjaGFuZ2VkID0gXCJjaGFuZ2VkXCI7XG4gICAgICBpZiAob2xkVmFsdWUgJiYgIW5ld1ZhbHVlKSB7XG4gICAgICAgIGNoYW5nZWQgPSBcInJlbW92ZWRcIjtcbiAgICAgIH0gZWxzZSBpZiAoIW9sZFZhbHVlICYmIG5ld1ZhbHVlKSAge1xuICAgICAgICBjaGFuZ2VkID0gXCJhZGRlZFwiO1xuICAgICAgfVxuICAgICAgbG9nZ2VyKHRhZ05hbWUgKyBcIi5cIiArIGF0dHJpYk5hbWUgKyBcIiBcIiArIGNoYW5nZWQsIHtcbiAgICAgICAgY2hhbmdlOiBjaGFuZ2VkLFxuICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICBhdHRyaWJOYW1lOiBhdHRyaWJOYW1lLFxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9va3VwQXR0cmlidXRlKG1hcCwgdGFnTmFtZSwgYXR0cmliTmFtZSkge1xuICAgIHZhciBhdHRyaWJLZXk7XG4gICAgYXR0cmliS2V5ID0gdGFnTmFtZSArICc6OicgKyBhdHRyaWJOYW1lO1xuICAgIGlmIChtYXAuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkge1xuICAgICAgcmV0dXJuIG1hcFthdHRyaWJLZXldO1xuICAgIH1cbiAgICBhdHRyaWJLZXkgPSAnKjo6JyArIGF0dHJpYk5hbWU7XG4gICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShhdHRyaWJLZXkpKSB7XG4gICAgICByZXR1cm4gbWFwW2F0dHJpYktleV07XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0QXR0cmlidXRlVHlwZSh0YWdOYW1lLCBhdHRyaWJOYW1lKSB7XG4gICAgcmV0dXJuIGxvb2t1cEF0dHJpYnV0ZShodG1sNC5BVFRSSUJTLCB0YWdOYW1lLCBhdHRyaWJOYW1lKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRMb2FkZXJUeXBlKHRhZ05hbWUsIGF0dHJpYk5hbWUpIHtcbiAgICByZXR1cm4gbG9va3VwQXR0cmlidXRlKGh0bWw0LkxPQURFUlRZUEVTLCB0YWdOYW1lLCBhdHRyaWJOYW1lKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRVcmlFZmZlY3QodGFnTmFtZSwgYXR0cmliTmFtZSkge1xuICAgIHJldHVybiBsb29rdXBBdHRyaWJ1dGUoaHRtbDQuVVJJRUZGRUNUUywgdGFnTmFtZSwgYXR0cmliTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2FuaXRpemVzIGF0dHJpYnV0ZXMgb24gYW4gSFRNTCB0YWcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIEFuIEhUTUwgdGFnIG5hbWUgaW4gbG93ZXJjYXNlLlxuICAgKiBAcGFyYW0ge0FycmF5Ljw/c3RyaW5nPn0gYXR0cmlicyBBbiBhcnJheSBvZiBhbHRlcm5hdGluZyBuYW1lcyBhbmQgdmFsdWVzLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbig/c3RyaW5nKTogP3N0cmluZ30gb3B0X25haXZlVXJpUmV3cml0ZXIgQSB0cmFuc2Zvcm0gdG9cbiAgICogICAgIGFwcGx5IHRvIFVSSSBhdHRyaWJ1dGVzOyBpdCBjYW4gcmV0dXJuIGEgbmV3IHN0cmluZyB2YWx1ZSwgb3IgbnVsbCB0b1xuICAgKiAgICAgZGVsZXRlIHRoZSBhdHRyaWJ1dGUuICBJZiB1bnNwZWNpZmllZCwgVVJJIGF0dHJpYnV0ZXMgYXJlIGRlbGV0ZWQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oP3N0cmluZyk6ID9zdHJpbmd9IG9wdF9ubVRva2VuUG9saWN5IEEgdHJhbnNmb3JtIHRvIGFwcGx5XG4gICAqICAgICB0byBhdHRyaWJ1dGVzIGNvbnRhaW5pbmcgSFRNTCBuYW1lcywgZWxlbWVudCBJRHMsIGFuZCBzcGFjZS1zZXBhcmF0ZWRcbiAgICogICAgIGxpc3RzIG9mIGNsYXNzZXM7IGl0IGNhbiByZXR1cm4gYSBuZXcgc3RyaW5nIHZhbHVlLCBvciBudWxsIHRvIGRlbGV0ZVxuICAgKiAgICAgdGhlIGF0dHJpYnV0ZS4gIElmIHVuc3BlY2lmaWVkLCB0aGVzZSBhdHRyaWJ1dGVzIGFyZSBrZXB0IHVuY2hhbmdlZC5cbiAgICogQHJldHVybiB7QXJyYXkuPD9zdHJpbmc+fSBUaGUgc2FuaXRpemVkIGF0dHJpYnV0ZXMgYXMgYSBsaXN0IG9mIGFsdGVybmF0aW5nXG4gICAqICAgICBuYW1lcyBhbmQgdmFsdWVzLCB3aGVyZSBhIG51bGwgdmFsdWUgbWVhbnMgdG8gb21pdCB0aGUgYXR0cmlidXRlLlxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVBdHRyaWJzKHRhZ05hbWUsIGF0dHJpYnMsXG4gICAgb3B0X25haXZlVXJpUmV3cml0ZXIsIG9wdF9ubVRva2VuUG9saWN5LCBvcHRfbG9nZ2VyKSB7XG4gICAgLy8gVE9ETyhmZWxpeDhhKTogaXQncyBvYm5veGlvdXMgdGhhdCBkb21hZG8gZHVwbGljYXRlcyBtdWNoIG9mIHRoaXNcbiAgICAvLyBUT0RPKGZlbGl4OGEpOiBtYXliZSBjb25zaXN0ZW50bHkgZW5mb3JjZSBjb25zdHJhaW50cyBsaWtlIHRhcmdldD1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJpYnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBhdHRyaWJOYW1lID0gYXR0cmlic1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHJpYnNbaSArIDFdO1xuICAgICAgdmFyIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgICB2YXIgYXR5cGUgPSBudWxsLCBhdHRyaWJLZXk7XG4gICAgICBpZiAoKGF0dHJpYktleSA9IHRhZ05hbWUgKyAnOjonICsgYXR0cmliTmFtZSxcbiAgICAgICAgICAgaHRtbDQuQVRUUklCUy5oYXNPd25Qcm9wZXJ0eShhdHRyaWJLZXkpKSB8fFxuICAgICAgICAgIChhdHRyaWJLZXkgPSAnKjo6JyArIGF0dHJpYk5hbWUsXG4gICAgICAgICAgIGh0bWw0LkFUVFJJQlMuaGFzT3duUHJvcGVydHkoYXR0cmliS2V5KSkpIHtcbiAgICAgICAgYXR5cGUgPSBodG1sNC5BVFRSSUJTW2F0dHJpYktleV07XG4gICAgICB9XG4gICAgICBpZiAoYXR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChhdHlwZSkge1xuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ05PTkUnXTogYnJlYWs7XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnU0NSSVBUJ106XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAob3B0X2xvZ2dlcikge1xuICAgICAgICAgICAgICBsb2cob3B0X2xvZ2dlciwgdGFnTmFtZSwgYXR0cmliTmFtZSwgb2xkVmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ1NUWUxFJ106XG4gICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBwYXJzZUNzc0RlY2xhcmF0aW9ucykge1xuICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG5cdCAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2FuaXRpemVkRGVjbGFyYXRpb25zID0gW107XG4gICAgICAgICAgICBwYXJzZUNzc0RlY2xhcmF0aW9ucyhcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbjogZnVuY3Rpb24gKHByb3BlcnR5LCB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vcm1Qcm9wID0gcHJvcGVydHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjaGVtYSA9IGNzc1NjaGVtYVtub3JtUHJvcF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplQ3NzUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtUHJvcCwgc2NoZW1hLCB0b2tlbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRfbmFpdmVVcmlSZXdyaXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNhZmVVcmkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCwgaHRtbDQudWVmZmVjdHMuU0FNRV9ET0NVTUVOVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDQubHR5cGVzLlNBTkRCT1hFRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVFlQRVwiOiBcIkNTU1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ1NTX1BST1BcIjogbm9ybVByb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb3B0X25haXZlVXJpUmV3cml0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZWREZWNsYXJhdGlvbnMucHVzaChwcm9wZXJ0eSArICc6ICcgKyB0b2tlbnMuam9pbignICcpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbHVlID0gc2FuaXRpemVkRGVjbGFyYXRpb25zLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBzYW5pdGl6ZWREZWNsYXJhdGlvbnMuam9pbignIDsgJykgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydJRCddOlxuICAgICAgICAgIGNhc2UgaHRtbDQuYXR5cGVbJ0lEUkVGJ106XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnSURSRUZTJ106XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnR0xPQkFMX05BTUUnXTpcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydMT0NBTF9OQU1FJ106XG4gICAgICAgICAgY2FzZSBodG1sNC5hdHlwZVsnQ0xBU1NFUyddOlxuICAgICAgICAgICAgdmFsdWUgPSBvcHRfbm1Ub2tlblBvbGljeSA/IG9wdF9ubVRva2VuUG9saWN5KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydVUkknXTpcbiAgICAgICAgICAgIHZhbHVlID0gc2FmZVVyaSh2YWx1ZSxcbiAgICAgICAgICAgICAgZ2V0VXJpRWZmZWN0KHRhZ05hbWUsIGF0dHJpYk5hbWUpLFxuICAgICAgICAgICAgICBnZXRMb2FkZXJUeXBlKHRhZ05hbWUsIGF0dHJpYk5hbWUpLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJUWVBFXCI6IFwiTUFSS1VQXCIsXG4gICAgICAgICAgICAgICAgXCJYTUxfQVRUUlwiOiBhdHRyaWJOYW1lLFxuICAgICAgICAgICAgICAgIFwiWE1MX1RBR1wiOiB0YWdOYW1lXG4gICAgICAgICAgICAgIH0sIG9wdF9uYWl2ZVVyaVJld3JpdGVyKTtcbiAgICAgICAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGh0bWw0LmF0eXBlWydVUklfRlJBR01FTlQnXTpcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAnIycgPT09IHZhbHVlLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxKTsgIC8vIHJlbW92ZSB0aGUgbGVhZGluZyAnIydcbiAgICAgICAgICAgICAgdmFsdWUgPSBvcHRfbm1Ub2tlblBvbGljeSA/IG9wdF9ubVRva2VuUG9saWN5KHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJyMnICsgdmFsdWU7ICAvLyByZXN0b3JlIHRoZSBsZWFkaW5nICcjJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0X2xvZ2dlcikge1xuICAgICAgICAgICAgICBsb2cob3B0X2xvZ2dlciwgdGFnTmFtZSwgYXR0cmliTmFtZSwgb2xkVmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAob3B0X2xvZ2dlcikge1xuICAgICAgICAgICAgICBsb2cob3B0X2xvZ2dlciwgdGFnTmFtZSwgYXR0cmliTmFtZSwgb2xkVmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIGlmIChvcHRfbG9nZ2VyKSB7XG4gICAgICAgICAgbG9nKG9wdF9sb2dnZXIsIHRhZ05hbWUsIGF0dHJpYk5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF0dHJpYnNbaSArIDFdID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBhdHRyaWJzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB0YWcgcG9saWN5IHRoYXQgb21pdHMgYWxsIHRhZ3MgbWFya2VkIFVOU0FGRSBpbiBodG1sNC1kZWZzLmpzXG4gICAqIGFuZCBhcHBsaWVzIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZSBzYW5pdGl6ZXIgd2l0aCB0aGUgc3VwcGxpZWQgcG9saWN5IGZvclxuICAgKiBVUkkgYXR0cmlidXRlcyBhbmQgTk1UT0tFTiBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbig/c3RyaW5nKTogP3N0cmluZ30gb3B0X25haXZlVXJpUmV3cml0ZXIgQSB0cmFuc2Zvcm0gdG9cbiAgICogICAgIGFwcGx5IHRvIFVSSSBhdHRyaWJ1dGVzLiAgSWYgbm90IGdpdmVuLCBVUkkgYXR0cmlidXRlcyBhcmUgZGVsZXRlZC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbig/c3RyaW5nKTogP3N0cmluZ30gb3B0X25tVG9rZW5Qb2xpY3kgQSB0cmFuc2Zvcm0gdG8gYXBwbHlcbiAgICogICAgIHRvIGF0dHJpYnV0ZXMgY29udGFpbmluZyBIVE1MIG5hbWVzLCBlbGVtZW50IElEcywgYW5kIHNwYWNlLXNlcGFyYXRlZFxuICAgKiAgICAgbGlzdHMgb2YgY2xhc3Nlcy4gIElmIG5vdCBnaXZlbiwgc3VjaCBhdHRyaWJ1dGVzIGFyZSBsZWZ0IHVuY2hhbmdlZC5cbiAgICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nLCBBcnJheS48P3N0cmluZz4pfSBBIHRhZ1BvbGljeSBzdWl0YWJsZSBmb3JcbiAgICogICAgIHBhc3NpbmcgdG8gaHRtbC5zYW5pdGl6ZS5cbiAgICovXG4gIGZ1bmN0aW9uIG1ha2VUYWdQb2xpY3koXG4gICAgb3B0X25haXZlVXJpUmV3cml0ZXIsIG9wdF9ubVRva2VuUG9saWN5LCBvcHRfbG9nZ2VyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhZ05hbWUsIGF0dHJpYnMpIHtcbiAgICAgIGlmICghKGh0bWw0LkVMRU1FTlRTW3RhZ05hbWVdICYgaHRtbDQuZWZsYWdzWydVTlNBRkUnXSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAnYXR0cmlicyc6IHNhbml0aXplQXR0cmlicyh0YWdOYW1lLCBhdHRyaWJzLFxuICAgICAgICAgICAgb3B0X25haXZlVXJpUmV3cml0ZXIsIG9wdF9ubVRva2VuUG9saWN5LCBvcHRfbG9nZ2VyKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wdF9sb2dnZXIpIHtcbiAgICAgICAgICBsb2cob3B0X2xvZ2dlciwgdGFnTmFtZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbml0aXplcyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYWNjb3JkaW5nIHRvIGEgZ2l2ZW4gcG9saWN5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRIdG1sIFRoZSBIVE1MIHRvIHNhbml0aXplLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZywgQXJyYXkuPD9zdHJpbmc+KX0gdGFnUG9saWN5IEEgZnVuY3Rpb24gdGhhdFxuICAgKiAgICAgZGVjaWRlcyB3aGljaCB0YWdzIHRvIGFjY2VwdCBhbmQgc2FuaXRpemVzIHRoZWlyIGF0dHJpYnV0ZXMgKHNlZVxuICAgKiAgICAgbWFrZUh0bWxTYW5pdGl6ZXIgYWJvdmUgZm9yIGRldGFpbHMpLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzYW5pdGl6ZWQgSFRNTC5cbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplV2l0aFBvbGljeShpbnB1dEh0bWwsIHRhZ1BvbGljeSkge1xuICAgIHZhciBvdXRwdXRBcnJheSA9IFtdO1xuICAgIG1ha2VIdG1sU2FuaXRpemVyKHRhZ1BvbGljeSkoaW5wdXRIdG1sLCBvdXRwdXRBcnJheSk7XG4gICAgcmV0dXJuIG91dHB1dEFycmF5LmpvaW4oJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmlwcyB1bnNhZmUgdGFncyBhbmQgYXR0cmlidXRlcyBmcm9tIEhUTUwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dEh0bWwgVGhlIEhUTUwgdG8gc2FuaXRpemUuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9uKD9zdHJpbmcpOiA/c3RyaW5nfSBvcHRfbmFpdmVVcmlSZXdyaXRlciBBIHRyYW5zZm9ybSB0b1xuICAgKiAgICAgYXBwbHkgdG8gVVJJIGF0dHJpYnV0ZXMuICBJZiBub3QgZ2l2ZW4sIFVSSSBhdHRyaWJ1dGVzIGFyZSBkZWxldGVkLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKD9zdHJpbmcpOiA/c3RyaW5nfSBvcHRfbm1Ub2tlblBvbGljeSBBIHRyYW5zZm9ybSB0byBhcHBseVxuICAgKiAgICAgdG8gYXR0cmlidXRlcyBjb250YWluaW5nIEhUTUwgbmFtZXMsIGVsZW1lbnQgSURzLCBhbmQgc3BhY2Utc2VwYXJhdGVkXG4gICAqICAgICBsaXN0cyBvZiBjbGFzc2VzLiAgSWYgbm90IGdpdmVuLCBzdWNoIGF0dHJpYnV0ZXMgYXJlIGxlZnQgdW5jaGFuZ2VkLlxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemUoaW5wdXRIdG1sLFxuICAgIG9wdF9uYWl2ZVVyaVJld3JpdGVyLCBvcHRfbm1Ub2tlblBvbGljeSwgb3B0X2xvZ2dlcikge1xuICAgIHZhciB0YWdQb2xpY3kgPSBtYWtlVGFnUG9saWN5KFxuICAgICAgb3B0X25haXZlVXJpUmV3cml0ZXIsIG9wdF9ubVRva2VuUG9saWN5LCBvcHRfbG9nZ2VyKTtcbiAgICByZXR1cm4gc2FuaXRpemVXaXRoUG9saWN5KGlucHV0SHRtbCwgdGFnUG9saWN5KTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBib3RoIHF1b3RlZCBhbmQgdW5xdW90ZWQgbmFtZXMgZm9yIENsb3N1cmUgbGlua2FnZS5cbiAgdmFyIGh0bWwgPSB7fTtcbiAgaHRtbC5lc2NhcGVBdHRyaWIgPSBodG1sWydlc2NhcGVBdHRyaWInXSA9IGVzY2FwZUF0dHJpYjtcbiAgaHRtbC5tYWtlSHRtbFNhbml0aXplciA9IGh0bWxbJ21ha2VIdG1sU2FuaXRpemVyJ10gPSBtYWtlSHRtbFNhbml0aXplcjtcbiAgaHRtbC5tYWtlU2F4UGFyc2VyID0gaHRtbFsnbWFrZVNheFBhcnNlciddID0gbWFrZVNheFBhcnNlcjtcbiAgaHRtbC5tYWtlVGFnUG9saWN5ID0gaHRtbFsnbWFrZVRhZ1BvbGljeSddID0gbWFrZVRhZ1BvbGljeTtcbiAgaHRtbC5ub3JtYWxpemVSQ0RhdGEgPSBodG1sWydub3JtYWxpemVSQ0RhdGEnXSA9IG5vcm1hbGl6ZVJDRGF0YTtcbiAgaHRtbC5zYW5pdGl6ZSA9IGh0bWxbJ3Nhbml0aXplJ10gPSBzYW5pdGl6ZTtcbiAgaHRtbC5zYW5pdGl6ZUF0dHJpYnMgPSBodG1sWydzYW5pdGl6ZUF0dHJpYnMnXSA9IHNhbml0aXplQXR0cmlicztcbiAgaHRtbC5zYW5pdGl6ZVdpdGhQb2xpY3kgPSBodG1sWydzYW5pdGl6ZVdpdGhQb2xpY3knXSA9IHNhbml0aXplV2l0aFBvbGljeTtcbiAgaHRtbC51bmVzY2FwZUVudGl0aWVzID0gaHRtbFsndW5lc2NhcGVFbnRpdGllcyddID0gdW5lc2NhcGVFbnRpdGllcztcbiAgcmV0dXJuIGh0bWw7XG59KShodG1sNCk7XG5cbnZhciBodG1sX3Nhbml0aXplID0gaHRtbFsnc2FuaXRpemUnXTtcblxuLy8gTG9vc2VuIHJlc3RyaWN0aW9ucyBvZiBDYWphJ3Ncbi8vIGh0bWwtc2FuaXRpemVyIHRvIGFsbG93IGZvciBzdHlsaW5nXG5odG1sNC5BVFRSSUJTWycqOjpzdHlsZSddID0gMDtcbmh0bWw0LkVMRU1FTlRTWydzdHlsZSddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ2E6OnRhcmdldCddID0gMDtcbmh0bWw0LkVMRU1FTlRTWyd2aWRlbyddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ3ZpZGVvOjpzcmMnXSA9IDA7XG5odG1sNC5BVFRSSUJTWyd2aWRlbzo6cG9zdGVyJ10gPSAwO1xuaHRtbDQuQVRUUklCU1sndmlkZW86OmNvbnRyb2xzJ10gPSAwO1xuaHRtbDQuRUxFTUVOVFNbJ2F1ZGlvJ10gPSAwO1xuaHRtbDQuQVRUUklCU1snYXVkaW86OnNyYyddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ3ZpZGVvOjphdXRvcGxheSddID0gMDtcbmh0bWw0LkFUVFJJQlNbJ3ZpZGVvOjpjb250cm9scyddID0gMDtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBodG1sX3Nhbml0aXplO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpZFVybDogZnVuY3Rpb24oXywgdCkge1xuICAgICAgICBpZiAoXy5pbmRleE9mKCcvJykgPT0gLTEpIHQubG9hZElEKF8pO1xuICAgICAgICBlbHNlIHQubG9hZFVSTChfKTtcbiAgICB9LFxuICAgIGxvZzogZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoY29uc29sZSAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihfKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RyaWN0OiBmdW5jdGlvbihfLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgXyAhPT0gdHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50OiAnICsgdHlwZSArICcgZXhwZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RyaWN0X2luc3RhbmNlOiBmdW5jdGlvbihfLCBrbGFzcywgbmFtZSkge1xuICAgICAgICBpZiAoIShfIGluc3RhbmNlb2Yga2xhc3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBuYW1lICsgJyBleHBlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzdHJpY3Rfb25lb2Y6IGZ1bmN0aW9uKF8sIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzLmluZGV4T2YoXykgPT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIF8gKyAnIGdpdmVuLCB2YWxpZCB2YWx1ZXMgYXJlICcgK1xuICAgICAgICAgICAgICAgIHZhbHVlcy5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbGJvdW5kczogZnVuY3Rpb24oXykge1xuICAgICAgICAvLyBsZWFmbGV0LWNvbXBhdGlibGUgYm91bmRzLCBzaW5jZSBsZWFmbGV0IGRvZXMgbm90IGRvIGdlb2pzb25cbiAgICAgICAgcmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhbW19bMV0sIF9bMF1dLCBbX1szXSwgX1syXV1dKTtcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB1dGZEZWNvZGUoYykge1xuICAgIGlmIChjID49IDkzKSBjLS07XG4gICAgaWYgKGMgPj0gMzUpIGMtLTtcbiAgICByZXR1cm4gYyAtIDMyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICAgICAgdmFyIGlkeCA9IHV0ZkRlY29kZShkYXRhLmdyaWRbeV0uY2hhckNvZGVBdCh4KSksXG4gICAgICAgICAgICBrZXkgPSBkYXRhLmtleXNbaWR4XTtcbiAgICAgICAgcmV0dXJuIGRhdGEuZGF0YVtrZXldO1xuICAgIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcblxuLy8gUmV0dXJuIHRoZSBiYXNlIHVybCBvZiBhIHNwZWNpZmljIHZlcnNpb24gb2YgTWFwQm94J3MgQVBJLlxuLy9cbi8vIGBoYXNoYCwgaWYgcHJvdmlkZWQgbXVzdCBiZSBhIG51bWJlciBhbmQgaXMgdXNlZCB0byBkaXN0cmlidXRlIHJlcXVlc3RzXG4vLyBhZ2FpbnN0IG11bHRpcGxlIGBDTkFNRWBzIGluIG9yZGVyIHRvIGF2b2lkIGNvbm5lY3Rpb24gbGltaXRzIGluIGJyb3dzZXJzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc1NTTDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnaHR0cHM6JyA9PT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgfHwgY29uZmlnLkZPUkNFX0hUVFBTO1xuICAgIH0sXG4gICAgYmFzZTogZnVuY3Rpb24oaGFzaCkge1xuICAgICAgICAvLyBCeSBkZWZhdWx0LCB1c2UgcHVibGljIEhUVFAgdXJsc1xuICAgICAgICAvLyBTdXBwb3J0IEhUVFBTIGlmIHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQgSFRUUFMgdXJscyB0byB1c2UsIGFuZCB0aGlzXG4gICAgICAgIC8vIHBhZ2UgaXMgdW5kZXIgSFRUUFNcbiAgICAgICAgdmFyIHVybHMgPSB0aGlzLmlzU1NMKCkgPyBjb25maWcuSFRUUFNfVVJMUyA6IGNvbmZpZy5IVFRQX1VSTFM7XG4gICAgICAgIGlmIChoYXNoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGhhc2ggIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1cmxzW2hhc2ggJSB1cmxzLmxlbmd0aF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIFJlcXVlc3RzIHRoYXQgY29udGFpbiBVUkxzIG5lZWQgYSBzZWN1cmUgZmxhZyBhcHBlbmRlZFxuICAgIC8vIHRvIHRoZWlyIFVSTHMgc28gdGhhdCB0aGUgc2VydmVyIGtub3dzIHRvIHNlbmQgU1NMLWlmaWVkXG4gICAgLy8gcmVzb3VyY2UgcmVmZXJlbmNlcy5cbiAgICBzZWN1cmVGbGFnOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU1NMKCkpIHJldHVybiB1cmw7XG4gICAgICAgIGVsc2UgaWYgKHVybC5tYXRjaCgvKFxcP3wmKXNlY3VyZS8pKSByZXR1cm4gdXJsO1xuICAgICAgICBlbHNlIGlmICh1cmwuaW5kZXhPZignPycpICE9PSAtMSkgcmV0dXJuIHVybCArICcmc2VjdXJlJztcbiAgICAgICAgZWxzZSByZXR1cm4gdXJsICsgJz9zZWN1cmUnO1xuICAgIH0sXG4gICAgLy8gQ29udmVydCBhIEpTT05QIHVybCB0byBhIEpTT04gVVJMLiAoTWFwQm94IFRpbGVKU09OIHNvbWV0aW1lcyBoYXJkY29kZXMgSlNPTlAuKVxuICAgIGpzb25pZnk6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcLihnZW8pP2pzb25wKD89JHxcXD8pLywgJy4kMWpzb24nKTtcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxuICAgIHVybCA9IHJlcXVpcmUoJy4vdXJsJyksXG4gICAgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfbG9hZFRpbGVKU09OOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIGlmICh0eXBlb2YgXyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChfLmluZGV4T2YoJy8nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIF8gPSB1cmwuYmFzZSgpICsgXyArICcuanNvbic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcXVlc3QodXJsLnNlY3VyZUZsYWcoXyksIEwuYmluZChmdW5jdGlvbihlcnIsIGpzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwubG9nKCdjb3VsZCBub3QgbG9hZCBUaWxlSlNPTiBhdCAnICsgXyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnZXJyb3InLCB7ZXJyb3I6IGVycn0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoanNvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRUaWxlSlNPTihqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIGlmIChfICYmIHR5cGVvZiBfID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5fc2V0VGlsZUpTT04oXyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIE11c3RhY2hlID0gcmVxdWlyZSgnbXVzdGFjaGUnKTtcblxudmFyIEdyaWRDb250cm9sID0gTC5Db250cm9sLmV4dGVuZCh7XG5cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBpbm5hYmxlOiB0cnVlLFxuICAgICAgICBmb2xsb3c6IGZhbHNlLFxuICAgICAgICBzYW5pdGl6ZXI6IHJlcXVpcmUoJy4vc2FuaXRpemUnKSxcbiAgICAgICAgdG91Y2hUZWFzZXI6IHRydWUsXG4gICAgICAgIGxvY2F0aW9uOiB0cnVlXG4gICAgfSxcblxuICAgIF9jdXJyZW50Q29udGVudDogJycsXG5cbiAgICAvLyBwaW5uZWQgbWVhbnMgdGhhdCB0aGlzIGNvbnRyb2wgaXMgb24gYSBmZWF0dXJlIGFuZCB0aGUgdXNlciBoYXMgbGlrZWx5XG4gICAgLy8gY2xpY2tlZC4gcGlubmVkIHdpbGwgbm90IGJlY29tZSBmYWxzZSB1bmxlc3MgdGhlIHVzZXIgY2xpY2tzIG9mZlxuICAgIC8vIG9mIHRoZSBmZWF0dXJlIG9udG8gYW5vdGhlciBvciBjbGlja3MgeFxuICAgIF9waW5uZWQ6IGZhbHNlLFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oXywgb3B0aW9ucykge1xuICAgICAgICBMLlV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgdXRpbC5zdHJpY3RfaW5zdGFuY2UoXywgTC5DbGFzcywgJ0wubWFwYm94LmdyaWRMYXllcicpO1xuICAgICAgICB0aGlzLl9sYXllciA9IF87XG4gICAgfSxcblxuICAgIHNldFRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB9LFxuXG4gICAgX3RlbXBsYXRlOiBmdW5jdGlvbihmb3JtYXQsIGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZSB8fCB0aGlzLl9sYXllci5nZXRUaWxlSlNPTigpLnRlbXBsYXRlO1xuICAgICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciBkID0ge307XG4gICAgICAgICAgICBkWydfXycgKyBmb3JtYXQgKyAnX18nXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNhbml0aXplcihcbiAgICAgICAgICAgICAgICBNdXN0YWNoZS50b19odG1sKHRlbXBsYXRlLCBMLmV4dGVuZChkLCBkYXRhKSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGNoYW5nZSB0aGUgY29udGVudCBvZiB0aGUgdG9vbHRpcCBIVE1MIGlmIGl0IGhhcyBjaGFuZ2VkLCBvdGhlcndpc2VcbiAgICAvLyBub29wXG4gICAgX3Nob3c6IGZ1bmN0aW9uKGNvbnRlbnQsIG8pIHtcbiAgICAgICAgaWYgKGNvbnRlbnQgPT09IHRoaXMuX2N1cnJlbnRDb250ZW50KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZm9sbG93KSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnNldExhdExuZyhvLmxhdExuZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwLl9wb3B1cCAhPT0gdGhpcy5fcG9wdXApIHRoaXMuX3BvcHVwLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5fY29udGVudFdyYXBwZXIuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9ICcnO1xuXG4gICAgICAgIHRoaXMuX21hcC5jbG9zZVBvcHVwKCk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl9jb250ZW50V3JhcHBlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnY2xvc2FibGUnKTtcbiAgICB9LFxuXG4gICAgX21vdXNlb3ZlcjogZnVuY3Rpb24obykge1xuICAgICAgICBpZiAoby5kYXRhKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdtYXAtY2xpY2thYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fbWFwLl9jb250YWluZXIsICdtYXAtY2xpY2thYmxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcGlubmVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl90ZW1wbGF0ZSgndGVhc2VyJywgby5kYXRhKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coY29udGVudCwgbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX21vdXNlbW92ZTogZnVuY3Rpb24obykge1xuICAgICAgICBpZiAodGhpcy5fcGlubmVkKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmZvbGxvdykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3BvcHVwLnNldExhdExuZyhvLmxhdExuZyk7XG4gICAgfSxcblxuICAgIF9uYXZpZ2F0ZVRvOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgd2luZG93LnRvcC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH0sXG5cbiAgICBfY2xpY2s6IGZ1bmN0aW9uKG8pIHtcblxuICAgICAgICB2YXIgbG9jYXRpb25fZm9ybWF0dGVkID0gdGhpcy5fdGVtcGxhdGUoJ2xvY2F0aW9uJywgby5kYXRhKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sb2NhdGlvbiAmJiBsb2NhdGlvbl9mb3JtYXR0ZWQgJiZcbiAgICAgICAgICAgIGxvY2F0aW9uX2Zvcm1hdHRlZC5zZWFyY2goL15odHRwcz86LykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0ZVRvKHRoaXMuX3RlbXBsYXRlKCdsb2NhdGlvbicsIG8uZGF0YSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGlubmFibGUpIHJldHVybjtcblxuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuX3RlbXBsYXRlKCdmdWxsJywgby5kYXRhKTtcblxuICAgICAgICBpZiAoIWNvbnRlbnQgJiYgdGhpcy5vcHRpb25zLnRvdWNoVGVhc2VyICYmIEwuQnJvd3Nlci50b3VjaCkge1xuICAgICAgICAgICAgY29udGVudCA9IHRoaXMuX3RlbXBsYXRlKCd0ZWFzZXInLCBvLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9jb250YWluZXIsICdjbG9zYWJsZScpO1xuICAgICAgICAgICAgdGhpcy5fcGlubmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3coY29udGVudCwgbyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcGlubmVkKSB7XG4gICAgICAgICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnY2xvc2FibGUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblBvcHVwQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bpbm5lZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlQ2xvc2VidXR0b246IGZ1bmN0aW9uKGNvbnRhaW5lciwgZm4pIHtcbiAgICAgICAgdmFyIGxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgJ2Nsb3NlJywgY29udGFpbmVyKTtcblxuICAgICAgICBsaW5rLmlubmVySFRNTCA9ICdjbG9zZSc7XG4gICAgICAgIGxpbmsuaHJlZiA9ICcjJztcbiAgICAgICAgbGluay50aXRsZSA9ICdjbG9zZSc7XG5cbiAgICAgICAgTC5Eb21FdmVudFxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICAgICAgLm9uKGxpbmssICdtb3VzZWRvd24nLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIC5vbihsaW5rLCAnZGJsY2xpY2snLCBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIC5vbihsaW5rLCAnY2xpY2snLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIGZuLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gbGluaztcbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICB0aGlzLl9tYXAgPSBtYXA7XG5cbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICdsZWFmbGV0LWNvbnRyb2wtZ3JpZCBtYXAtdG9vbHRpcCcsXG4gICAgICAgICAgICBjb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUpLFxuICAgICAgICAgICAgY29udGVudFdyYXBwZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbWFwLXRvb2x0aXAtY29udGVudCcpO1xuXG4gICAgICAgIC8vIGhpZGUgdGhlIGNvbnRhaW5lciBlbGVtZW50IGluaXRpYWxseVxuICAgICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2xvc2VidXR0b24oY29udGFpbmVyLCB0aGlzLl9oaWRlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnRXcmFwcGVyKTtcblxuICAgICAgICB0aGlzLl9jb250ZW50V3JhcHBlciA9IGNvbnRlbnRXcmFwcGVyO1xuICAgICAgICB0aGlzLl9wb3B1cCA9IG5ldyBMLlBvcHVwKHsgYXV0b1BhbjogZmFsc2UsIGNsb3NlT25DbGljazogZmFsc2UgfSk7XG5cbiAgICAgICAgbWFwLm9uKCdwb3B1cGNsb3NlJywgdGhpcy5fb25Qb3B1cENsb3NlLCB0aGlzKTtcblxuICAgICAgICBMLkRvbUV2ZW50XG4gICAgICAgICAgICAuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24oY29udGFpbmVyKVxuICAgICAgICAgICAgLy8gYWxsb3cgcGVvcGxlIHRvIHNjcm9sbCB0b29sdGlwcyB3aXRoIG1vdXNld2hlZWxcbiAgICAgICAgICAgIC5hZGRMaXN0ZW5lcihjb250YWluZXIsICdtb3VzZXdoZWVsJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2xheWVyXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIHRoaXMuX21vdXNlb3ZlciwgdGhpcylcbiAgICAgICAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fbW91c2Vtb3ZlLCB0aGlzKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuXG4gICAgICAgIG1hcC5vZmYoJ3BvcHVwY2xvc2UnLCB0aGlzLl9vblBvcHVwQ2xvc2UsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2xheWVyXG4gICAgICAgICAgICAub2ZmKCdtb3VzZW92ZXInLCB0aGlzLl9tb3VzZW92ZXIsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZW1vdmUsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKCdjbGljaycsIHRoaXMuX2NsaWNrLCB0aGlzKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihfLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHcmlkQ29udHJvbChfLCBvcHRpb25zKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjb3JzbGl0ZSA9IHJlcXVpcmUoJ2NvcnNsaXRlJyksXG4gICAgSlNPTjMgPSByZXF1aXJlKCdqc29uMycpLFxuICAgIHN0cmljdCA9IHJlcXVpcmUoJy4vdXRpbCcpLnN0cmljdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gICAgc3RyaWN0KHVybCwgJ3N0cmluZycpO1xuICAgIHN0cmljdChjYWxsYmFjaywgJ2Z1bmN0aW9uJyk7XG4gICAgY29yc2xpdGUodXJsLCBmdW5jdGlvbihlcnIsIHJlc3ApIHtcbiAgICAgICAgaWYgKCFlcnIgJiYgcmVzcCkge1xuICAgICAgICAgICAgLy8gaGFyZGNvZGVkIGdyaWQgcmVzcG9uc2VcbiAgICAgICAgICAgIGlmIChyZXNwLnJlc3BvbnNlVGV4dFswXSA9PSAnZycpIHtcbiAgICAgICAgICAgICAgICByZXNwID0gSlNPTjMucGFyc2UocmVzcC5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZyg1LCByZXNwLnJlc3BvbnNlVGV4dC5sZW5ndGggLSAyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3AgPSBKU09OMy5wYXJzZShyZXNwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwKTtcbiAgICB9KTtcbn07XG4iLCJmdW5jdGlvbiB4aHIodXJsLCBjYWxsYmFjaywgY29ycykge1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhFcnJvcignQnJvd3NlciBub3Qgc3VwcG9ydGVkJykpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29ycyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIG0gPSB1cmwubWF0Y2goL15cXHMqaHR0cHM/OlxcL1xcL1teXFwvXSovKTtcbiAgICAgICAgY29ycyA9IG0gJiYgKG1bMF0gIT09IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmRvbWFpbiArXG4gICAgICAgICAgICAgICAgKGxvY2F0aW9uLnBvcnQgPyAnOicgKyBsb2NhdGlvbi5wb3J0IDogJycpKTtcbiAgICB9XG5cbiAgICB2YXIgeDtcblxuICAgIGZ1bmN0aW9uIGlzU3VjY2Vzc2Z1bChzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuICAgIH1cblxuICAgIGlmIChjb3JzICYmIChcbiAgICAgICAgLy8gSUU3LTkgUXVpcmtzICYgQ29tcGF0aWJpbGl0eVxuICAgICAgICB0eXBlb2Ygd2luZG93LlhEb21haW5SZXF1ZXN0ID09PSAnb2JqZWN0JyB8fFxuICAgICAgICAvLyBJRTkgU3RhbmRhcmRzIG1vZGVcbiAgICAgICAgdHlwZW9mIHdpbmRvdy5YRG9tYWluUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkpIHtcbiAgICAgICAgLy8gSUU4LTEwXG4gICAgICAgIHggPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkZWQoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIFhEb21haW5SZXF1ZXN0XG4gICAgICAgICAgICB4LnN0YXR1cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAvLyBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgICAgIGlzU3VjY2Vzc2Z1bCh4LnN0YXR1cykpIGNhbGxiYWNrLmNhbGwoeCwgbnVsbCwgeCk7XG4gICAgICAgIGVsc2UgY2FsbGJhY2suY2FsbCh4LCB4LCBudWxsKTtcbiAgICB9XG5cbiAgICAvLyBCb3RoIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIGFuZCBgb25sb2FkYCBjYW4gZmlyZS4gYG9ucmVhZHlzdGF0ZWNoYW5nZWBcbiAgICAvLyBoYXMgW2JlZW4gc3VwcG9ydGVkIGZvciBsb25nZXJdKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzkxODE1MDgvMjI5MDAxKS5cbiAgICBpZiAoJ29ubG9hZCcgaW4geCkge1xuICAgICAgICB4Lm9ubG9hZCA9IGxvYWRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIHJlYWR5c3RhdGUoKSB7XG4gICAgICAgICAgICBpZiAoeC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IGFzIGFuIGVycm9yIGFuZCBwcmV2ZW50XG4gICAgLy8gaXQgZnJvbSBldmVyIGJlaW5nIGNhbGxlZCBhZ2FpbiBieSByZWFzc2lnbmluZyBpdCB0byBgbm9vcGBcbiAgICB4Lm9uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihldnQpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldnQsIG51bGwpO1xuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKCkgeyB9O1xuICAgIH07XG5cbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHgub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCkgeyB9O1xuXG4gICAgeC5vbnRpbWVvdXQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldnQsIG51bGwpO1xuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKCkgeyB9O1xuICAgIH07XG5cbiAgICB4Lm9uYWJvcnQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldnQsIG51bGwpO1xuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKCkgeyB9O1xuICAgIH07XG5cbiAgICAvLyBHRVQgaXMgdGhlIG9ubHkgc3VwcG9ydGVkIEhUVFAgVmVyYiBieSBYRG9tYWluUmVxdWVzdCBhbmQgaXMgdGhlXG4gICAgLy8gb25seSBvbmUgc3VwcG9ydGVkIGhlcmUuXG4gICAgeC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdC4gU2VuZGluZyBkYXRhIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgeC5zZW5kKG51bGwpO1xuXG4gICAgcmV0dXJuIHhocjtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHhocjtcbiIsIi8qISBKU09OIHYzLjIuNSB8IGh0dHA6Ly9iZXN0aWVqcy5naXRodWIuaW8vanNvbjMgfCBDb3B5cmlnaHQgMjAxMi0yMDEzLCBLaXQgQ2FtYnJpZGdlIHwgaHR0cDovL2tpdC5taXQtbGljZW5zZS5vcmcgKi9cbjsoZnVuY3Rpb24gKHdpbmRvdykge1xuICAvLyBDb252ZW5pZW5jZSBhbGlhc2VzLlxuICB2YXIgZ2V0Q2xhc3MgPSB7fS50b1N0cmluZywgaXNQcm9wZXJ0eSwgZm9yRWFjaCwgdW5kZWY7XG5cbiAgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4gIC8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG4gIHZhciBpc0xvYWRlciA9IHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kLCBKU09OMyA9IHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgZXhwb3J0cztcblxuICBpZiAoSlNPTjMgfHwgaXNMb2FkZXIpIHtcbiAgICBpZiAodHlwZW9mIEpTT04gPT0gXCJvYmplY3RcIiAmJiBKU09OKSB7XG4gICAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGltcGxlbWVudGF0aW9ucyBpblxuICAgICAgLy8gYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzIGFuZCBDb21tb25KUyBlbnZpcm9ubWVudHMuXG4gICAgICBpZiAoSlNPTjMpIHtcbiAgICAgICAgSlNPTjMuc3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnk7XG4gICAgICAgIEpTT04zLnBhcnNlID0gSlNPTi5wYXJzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEpTT04zID0gSlNPTjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzTG9hZGVyKSB7XG4gICAgICBKU09OMyA9IHdpbmRvdy5KU09OID0ge307XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gICAgSlNPTjMgPSB3aW5kb3cuSlNPTiB8fCAod2luZG93LkpTT04gPSB7fSk7XG4gIH1cblxuICAvLyBUZXN0IHRoZSBgRGF0ZSNnZXRVVEMqYCBtZXRob2RzLiBCYXNlZCBvbiB3b3JrIGJ5IEBZYWZmbGUuXG4gIHZhciBpc0V4dGVuZGVkID0gbmV3IERhdGUoLTM1MDk4MjczMzQ1NzMyOTIpO1xuICB0cnkge1xuICAgIC8vIFRoZSBgZ2V0VVRDRnVsbFllYXJgLCBgTW9udGhgLCBhbmQgYERhdGVgIG1ldGhvZHMgcmV0dXJuIG5vbnNlbnNpY2FsXG4gICAgLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbiAgICBpc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmXG4gICAgICAvLyBTYWZhcmkgPCAyLjAuMiBzdG9yZXMgdGhlIGludGVybmFsIG1pbGxpc2Vjb25kIHRpbWUgdmFsdWUgY29ycmVjdGx5LFxuICAgICAgLy8gYnV0IGNsaXBzIHRoZSB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGRhdGUgbWV0aG9kcyB0byB0aGUgcmFuZ2Ugb2ZcbiAgICAgIC8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbiAgICAgIGlzRXh0ZW5kZWQuZ2V0VVRDSG91cnMoKSA9PSAxMCAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbnV0ZXMoKSA9PSAzNyAmJiBpc0V4dGVuZGVkLmdldFVUQ1NlY29uZHMoKSA9PSA2ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgPT0gNzA4O1xuICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG5cbiAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbiAgLy8gaW1wbGVtZW50YXRpb25zIGFyZSBzcGVjLWNvbXBsaWFudC4gQmFzZWQgb24gd29yayBieSBLZW4gU255ZGVyLlxuICBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgIGlmIChuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpIHtcbiAgICAgIC8vIElFIDw9IDcgZG9lc24ndCBzdXBwb3J0IGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyB1c2luZyBzcXVhcmVcbiAgICAgIC8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuICAgICAgcmV0dXJuIFwiYVwiWzBdICE9IFwiYVwiO1xuICAgIH1cbiAgICB2YXIgdmFsdWUsIHNlcmlhbGl6ZWQgPSAne1wiYVwiOlsxLHRydWUsZmFsc2UsbnVsbCxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcIl19JywgaXNBbGwgPSBuYW1lID09IFwianNvblwiO1xuICAgIGlmIChpc0FsbCB8fCBuYW1lID09IFwianNvbi1zdHJpbmdpZnlcIiB8fCBuYW1lID09IFwianNvbi1wYXJzZVwiKSB7XG4gICAgICAvLyBUZXN0IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICBpZiAobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIgfHwgaXNBbGwpIHtcbiAgICAgICAgdmFyIHN0cmluZ2lmeSA9IEpTT04zLnN0cmluZ2lmeSwgc3RyaW5naWZ5U3VwcG9ydGVkID0gdHlwZW9mIHN0cmluZ2lmeSA9PSBcImZ1bmN0aW9uXCIgJiYgaXNFeHRlbmRlZDtcbiAgICAgICAgaWYgKHN0cmluZ2lmeVN1cHBvcnRlZCkge1xuICAgICAgICAgIC8vIEEgdGVzdCBmdW5jdGlvbiBvYmplY3Qgd2l0aCBhIGN1c3RvbSBgdG9KU09OYCBtZXRob2QuXG4gICAgICAgICAgKHZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgfSkudG9KU09OID0gdmFsdWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9XG4gICAgICAgICAgICAgIC8vIEZpcmVmb3ggMy4xYjEgYW5kIGIyIHNlcmlhbGl6ZSBzdHJpbmcsIG51bWJlciwgYW5kIGJvb2xlYW5cbiAgICAgICAgICAgICAgLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSgwKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyLCBhbmQgSlNPTiAyIHNlcmlhbGl6ZSB3cmFwcGVkIHByaW1pdGl2ZXMgYXMgb2JqZWN0XG4gICAgICAgICAgICAgIC8vIGxpdGVyYWxzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IE51bWJlcigpKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBTdHJpbmcoKSkgPT0gJ1wiXCInICYmXG4gICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBgdG9KU09OYCBwcm9wZXJ0aWVzIGFzIHdlbGwsICp1bmxlc3MqIHRoZXkgYXJlIG5lc3RlZFxuICAgICAgICAgICAgICAvLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gSUUgOCBzZXJpYWxpemVzIGB1bmRlZmluZWRgIGFzIGBcInVuZGVmaW5lZFwiYC4gU2FmYXJpIDw9IDUuMS43IGFuZFxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBwYXNzIHRoaXMgdGVzdC5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS43IGFuZCBGRiAzLjFiMyB0aHJvdyBgRXJyb3JgcyBhbmQgYFR5cGVFcnJvcmBzLFxuICAgICAgICAgICAgICAvLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5LlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCBhIG51bWJlcixcbiAgICAgICAgICAgICAgLy8gc3RyaW5nLCBhcnJheSwgb2JqZWN0LCBCb29sZWFuLCBvciBgbnVsbGAgbGl0ZXJhbC4gVGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgIC8vIGluc2lkZSBvYmplY3Qgb3IgYXJyYXkgbGl0ZXJhbHMuIFlVSSAzLjAuMGIxIGlnbm9yZXMgY3VzdG9tIGB0b0pTT05gXG4gICAgICAgICAgICAgIC8vIG1ldGhvZHMgZW50aXJlbHkuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdmFsdWVdKSA9PSBcIlsxXVwiICYmXG4gICAgICAgICAgICAgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBzZXJpYWxpemVzIGBbdW5kZWZpbmVkXWAgYXMgYFwiW11cImAgaW5zdGVhZCBvZlxuICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWZdKSA9PSBcIltudWxsXVwiICYmXG4gICAgICAgICAgICAgIC8vIFlVSSAzLjAuMGIxIGZhaWxzIHRvIHNlcmlhbGl6ZSBgbnVsbGAgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJlxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4gICAgICAgICAgICAgIC8vIGBbMSwgdHJ1ZSwgZ2V0Q2xhc3MsIDFdYCBzZXJpYWxpemVzIGFzIFwiWzEsdHJ1ZSxdLFwiLiBUaGVzZSB2ZXJzaW9uc1xuICAgICAgICAgICAgICAvLyBvZiBGaXJlZm94IGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuICAgICAgICAgICAgICAvLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWYsIGdldENsYXNzLCBudWxsXSkgPT0gXCJbbnVsbCxudWxsLG51bGxdXCIgJiZcbiAgICAgICAgICAgICAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgLy8gd2hlcmUgY2hhcmFjdGVyIGVzY2FwZSBjb2RlcyBhcmUgZXhwZWN0ZWQgKGUuZy4sIGBcXGJgID0+IGBcXHUwMDA4YCkuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeSh7IFwiYVwiOiBbdmFsdWUsIHRydWUsIGZhbHNlLCBudWxsLCBcIlxceDAwXFxiXFxuXFxmXFxyXFx0XCJdIH0pID09IHNlcmlhbGl6ZWQgJiZcbiAgICAgICAgICAgICAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuICAgICAgICAgICAgICBzdHJpbmdpZnkobnVsbCwgdmFsdWUpID09PSBcIjFcIiAmJlxuICAgICAgICAgICAgICBzdHJpbmdpZnkoWzEsIDJdLCBudWxsLCAxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIiAmJlxuICAgICAgICAgICAgICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4gICAgICAgICAgICAgIC8vIHNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycy5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC04LjY0ZTE1KSkgPT0gJ1wiLTI3MTgyMS0wNC0yMFQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSg4LjY0ZTE1KSkgPT0gJ1wiKzI3NTc2MC0wOS0xM1QwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgIC8vIEZpcmVmb3ggPD0gMTEuMCBpbmNvcnJlY3RseSBzZXJpYWxpemVzIHllYXJzIHByaW9yIHRvIDAgYXMgbmVnYXRpdmVcbiAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC02MjE5ODc1NTJlNSkpID09ICdcIi0wMDAwMDEtMDEtMDFUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjUgYW5kIE9wZXJhID49IDEwLjUzIGluY29ycmVjdGx5IHNlcmlhbGl6ZSBtaWxsaXNlY29uZFxuICAgICAgICAgICAgICAvLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtMSkpID09ICdcIjE5NjktMTItMzFUMjM6NTk6NTkuOTk5WlwiJztcbiAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVGVzdCBgSlNPTi5wYXJzZWAuXG4gICAgICBpZiAobmFtZSA9PSBcImpzb24tcGFyc2VcIiB8fCBpc0FsbCkge1xuICAgICAgICB2YXIgcGFyc2UgPSBKU09OMy5wYXJzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGEgYmFyZSBsaXRlcmFsIGlzIHByb3ZpZGVkLlxuICAgICAgICAgICAgLy8gQ29uZm9ybWluZyBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGFsc28gY29lcmNlIHRoZSBpbml0aWFsIGFyZ3VtZW50IHRvXG4gICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgaWYgKHBhcnNlKFwiMFwiKSA9PT0gMCAmJiAhcGFyc2UoZmFsc2UpKSB7XG4gICAgICAgICAgICAgIC8vIFNpbXBsZSBwYXJzaW5nIHRlc3QuXG4gICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgIHZhciBwYXJzZVN1cHBvcnRlZCA9IHZhbHVlW1wiYVwiXS5sZW5ndGggPT0gNSAmJiB2YWx1ZVtcImFcIl1bMF0gPT09IDE7XG4gICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjIgYW5kIEZGIDMuMWIxIGFsbG93IHVuZXNjYXBlZCB0YWJzIGluIHN0cmluZ3MuXG4gICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9ICFwYXJzZSgnXCJcXHRcIicpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMsIGFuZCBsZWFkaW5nIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFpbGluZyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzb1xuICAgICAgICAgICAgICAgICAgICAvLyBhbGxvdyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlU3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U3VwcG9ydGVkICYmIHBhcnNlU3VwcG9ydGVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaGFzKFwianNvblwiKSkge1xuICAgIC8vIENvbW1vbiBgW1tDbGFzc11dYCBuYW1lIGFsaWFzZXMuXG4gICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG4gICAgdmFyIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiO1xuICAgIHZhciBudW1iZXJDbGFzcyA9IFwiW29iamVjdCBOdW1iZXJdXCI7XG4gICAgdmFyIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgICB2YXIgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICB2YXIgYm9vbGVhbkNsYXNzID0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG5cbiAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgLy8gRGVmaW5lIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzIGlmIHRoZSBgRGF0ZWAgbWV0aG9kcyBhcmUgYnVnZ3kuXG4gICAgaWYgKCFpc0V4dGVuZGVkKSB7XG4gICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbiAgICAgIC8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG4gICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgIC8vIEludGVybmFsOiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuIHRoZSBVbml4IGVwb2NoIGFuZCB0aGVcbiAgICAgIC8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHJldHVybiBNb250aHNbbW9udGhdICsgMzY1ICogKHllYXIgLSAxOTcwKSArIGZsb29yKCh5ZWFyIC0gMTk2OSArIChtb250aCA9ICsobW9udGggPiAxKSkpIC8gNCkgLSBmbG9vcigoeWVhciAtIDE5MDEgKyBtb250aCkgLyAxMDApICsgZmxvb3IoKHllYXIgLSAxNjAxICsgbW9udGgpIC8gNDAwKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgaWYgYSBwcm9wZXJ0eSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW5cbiAgICAvLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbiAgICBpZiAoIShpc1Byb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIHZhciBtZW1iZXJzID0ge30sIGNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCwgbWVtYmVycy5fX3Byb3RvX18gPSB7XG4gICAgICAgICAgLy8gVGhlICpwcm90byogcHJvcGVydHkgY2Fubm90IGJlIHNldCBtdWx0aXBsZSB0aW1lcyBpbiByZWNlbnRcbiAgICAgICAgICAvLyB2ZXJzaW9ucyBvZiBGaXJlZm94IGFuZCBTZWFNb25rZXkuXG4gICAgICAgICAgXCJ0b1N0cmluZ1wiOiAxXG4gICAgICAgIH0sIG1lbWJlcnMpLnRvU3RyaW5nICE9IGdldENsYXNzKSB7XG4gICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbiAgICAgICAgICAvLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIC8vIENhcHR1cmUgYW5kIGJyZWFrIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4gKHNlZSBzZWN0aW9uIDguNi4yXG4gICAgICAgICAgICAvLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4gICAgICAgICAgICAvLyB1bnNhZmUgdHJhbnNmb3JtYXRpb24gYnkgdGhlIENsb3N1cmUgQ29tcGlsZXIuXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSB0aGlzLl9fcHJvdG9fXywgcmVzdWx0ID0gcHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICB0aGlzLl9fcHJvdG9fXyA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgLy8gVXNlIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IHRvIHNpbXVsYXRlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGluXG4gICAgICAgICAgLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAodGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbWVtYmVycyA9IG51bGw7XG4gICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbnRlcm5hbDogQSBzZXQgb2YgcHJpbWl0aXZlIHR5cGVzIHVzZWQgYnkgYGlzSG9zdFR5cGVgLlxuICAgIHZhciBQcmltaXRpdmVUeXBlcyA9IHtcbiAgICAgICdib29sZWFuJzogMSxcbiAgICAgICdudW1iZXInOiAxLFxuICAgICAgJ3N0cmluZyc6IDEsXG4gICAgICAndW5kZWZpbmVkJzogMVxuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGBwcm9wZXJ0eWAgdmFsdWUgaXMgYVxuICAgIC8vIG5vbi1wcmltaXRpdmUuXG4gICAgdmFyIGlzSG9zdFR5cGUgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgIHJldHVybiB0eXBlID09ICdvYmplY3QnID8gISFvYmplY3RbcHJvcGVydHldIDogIVByaW1pdGl2ZVR5cGVzW3R5cGVdO1xuICAgIH07XG5cbiAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgIC8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbiAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzaXplID0gMCwgUHJvcGVydGllcywgbWVtYmVycywgcHJvcGVydHksIGZvckVhY2g7XG5cbiAgICAgIC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuICAgICAgLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbiAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgKFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudmFsdWVPZiA9IDA7XG4gICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxuICAgICAgbWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgLy8gSWdub3JlIGFsbCBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBzaXplKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBpdGVyYXRpb24gYWxnb3JpdGhtLlxuICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgbWVtYmVycyA9IFtcInZhbHVlT2ZcIiwgXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwicHJvcGVydHlJc0VudW1lcmFibGVcIiwgXCJpc1Byb3RvdHlwZU9mXCIsIFwiaGFzT3duUHJvcGVydHlcIiwgXCJjb25zdHJ1Y3RvclwiXTtcbiAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBsZW5ndGg7XG4gICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSAnZnVuY3Rpb24nICYmIGlzSG9zdFR5cGUob2JqZWN0LCAnaGFzT3duUHJvcGVydHknKSA/IG9iamVjdC5oYXNPd25Qcm9wZXJ0eSA6IGlzUHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbiAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAyKSB7XG4gICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHk7XG4gICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4gICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgLy8gZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsIHByb3BlcnR5LCBpc0NvbnN0cnVjdG9yO1xuICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuICAgICAgICAgIC8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCAocHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKSkge1xuICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JFYWNoKG9iamVjdCwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4gICAgLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbiAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAvLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbiAgICAvLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgIGlmICghaGFzKFwianNvbi1zdHJpbmdpZnlcIikpIHtcbiAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgOTI6IFwiXFxcXFxcXFxcIixcbiAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgIDEyOiBcIlxcXFxmXCIsXG4gICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgIDk6IFwiXFxcXHRcIlxuICAgICAgfTtcblxuICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAvLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxuICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4gICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgIC8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgIHZhciBxdW90ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gJ1wiJywgaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsIGlzTGFyZ2UgPSBsZW5ndGggPiAxMCAmJiBjaGFySW5kZXhCdWdneSwgc3ltYm9scztcbiAgICAgICAgaWYgKGlzTGFyZ2UpIHtcbiAgICAgICAgICBzeW1ib2xzID0gdmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgdmFyIGNoYXJDb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3JcbiAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgODogY2FzZSA5OiBjYXNlIDEwOiBjYXNlIDEyOiBjYXNlIDEzOiBjYXNlIDM0OiBjYXNlIDkyOlxuICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0ICs9IGlzTGFyZ2UgPyBzeW1ib2xzW2luZGV4XSA6IGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KGluZGV4KSA6IHZhbHVlW2luZGV4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdCArICdcIic7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAvLyBgU3RyKGtleSwgaG9sZGVyKWAsIGBKTyh2YWx1ZSlgLCBhbmQgYEpBKHZhbHVlKWAgb3BlcmF0aW9ucy5cbiAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldLCBjbGFzc05hbWUsIHllYXIsIG1vbnRoLCBkYXRlLCB0aW1lLCBob3VycywgbWludXRlcywgc2Vjb25kcywgbWlsbGlzZWNvbmRzLCByZXN1bHRzLCBlbGVtZW50LCBpbmRleCwgbGVuZ3RoLCBwcmVmaXgsIGhhc01lbWJlcnMsIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBOZWNlc3NhcnkgZm9yIGhvc3Qgb2JqZWN0IHN1cHBvcnQuXG4gICAgICAgICAgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgIGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO1xuICAgICAgICAgIGlmIChjbGFzc05hbWUgPT0gZGF0ZUNsYXNzICYmICFpc1Byb3BlcnR5LmNhbGwodmFsdWUsIFwidG9KU09OXCIpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCkge1xuICAgICAgICAgICAgICAvLyBEYXRlcyBhcmUgc2VyaWFsaXplZCBhY2NvcmRpbmcgdG8gdGhlIGBEYXRlI3RvSlNPTmAgbWV0aG9kXG4gICAgICAgICAgICAgIC8vIHNwZWNpZmllZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS45LjUuNDQuIFNlZSBzZWN0aW9uIDE1LjkuMS4xNVxuICAgICAgICAgICAgICAvLyBmb3IgdGhlIElTTyA4NjAxIGRhdGUgdGltZSBzdHJpbmcgZm9ybWF0LlxuICAgICAgICAgICAgICBpZiAoZ2V0RGF5KSB7XG4gICAgICAgICAgICAgICAgLy8gTWFudWFsbHkgY29tcHV0ZSB0aGUgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLFxuICAgICAgICAgICAgICAgIC8vIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgaWYgdGhlIGBnZXRVVEMqYCBtZXRob2RzIGFyZVxuICAgICAgICAgICAgICAgIC8vIGJ1Z2d5LiBBZGFwdGVkIGZyb20gQFlhZmZsZSdzIGBkYXRlLXNoaW1gIHByb2plY3QuXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGZsb29yKHZhbHVlIC8gODY0ZTUpO1xuICAgICAgICAgICAgICAgIGZvciAoeWVhciA9IGZsb29yKGRhdGUgLyAzNjUuMjQyNSkgKyAxOTcwIC0gMTsgZ2V0RGF5KHllYXIgKyAxLCAwKSA8PSBkYXRlOyB5ZWFyKyspO1xuICAgICAgICAgICAgICAgIGZvciAobW9udGggPSBmbG9vcigoZGF0ZSAtIGdldERheSh5ZWFyLCAwKSkgLyAzMC40Mik7IGdldERheSh5ZWFyLCBtb250aCArIDEpIDw9IGRhdGU7IG1vbnRoKyspO1xuICAgICAgICAgICAgICAgIGRhdGUgPSAxICsgZGF0ZSAtIGdldERheSh5ZWFyLCBtb250aCk7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGB0aW1lYCB2YWx1ZSBzcGVjaWZpZXMgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkgKHNlZSBFU1xuICAgICAgICAgICAgICAgIC8vIDUuMSBzZWN0aW9uIDE1LjkuMS4yKS4gVGhlIGZvcm11bGEgYChBICUgQiArIEIpICUgQmAgaXMgdXNlZFxuICAgICAgICAgICAgICAgIC8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4gICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZCB0byB0aGUgYG1vZHVsb2Agb3BlcmF0aW9uIGZvciBuZWdhdGl2ZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgIHRpbWUgPSAodmFsdWUgJSA4NjRlNSArIDg2NGU1KSAlIDg2NGU1O1xuICAgICAgICAgICAgICAgIC8vIFRoZSBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBhcmUgb2J0YWluZWQgYnlcbiAgICAgICAgICAgICAgICAvLyBkZWNvbXBvc2luZyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheS4gU2VlIHNlY3Rpb24gMTUuOS4xLjEwLlxuICAgICAgICAgICAgICAgIGhvdXJzID0gZmxvb3IodGltZSAvIDM2ZTUpICUgMjQ7XG4gICAgICAgICAgICAgICAgbWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7XG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7XG4gICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gdGltZSAlIDFlMztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICBtb250aCA9IHZhbHVlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHZhbHVlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgICAgICBob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgICAgICAgbWludXRlcyA9IHZhbHVlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gdmFsdWUuZ2V0VVRDU2Vjb25kcygpO1xuICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgIHZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlNCA/ICh5ZWFyIDwgMCA/IFwiLVwiIDogXCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNiwgeWVhciA8IDAgPyAteWVhciA6IHllYXIpIDogdG9QYWRkZWRTdHJpbmcoNCwgeWVhcikpICtcbiAgICAgICAgICAgICAgICBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1vbnRoICsgMSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIGRhdGUpICtcbiAgICAgICAgICAgICAgICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4gICAgICAgICAgICAgICAgLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG4gICAgICAgICAgICAgICAgXCJUXCIgKyB0b1BhZGRlZFN0cmluZygyLCBob3VycykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1pbnV0ZXMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLCBzZWNvbmRzKSArXG4gICAgICAgICAgICAgICAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLCBtaWxsaXNlY29uZHMpICsgXCJaXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUudG9KU09OID09IFwiZnVuY3Rpb25cIiAmJiAoKGNsYXNzTmFtZSAhPSBudW1iZXJDbGFzcyAmJiBjbGFzc05hbWUgIT0gc3RyaW5nQ2xhc3MgJiYgY2xhc3NOYW1lICE9IGFycmF5Q2xhc3MpIHx8IGlzUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJ0b0pTT05cIikpKSB7XG4gICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbiAgICAgICAgICAgIC8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbiAgICAgICAgICAgIC8vIGlnbm9yZXMgYWxsIGB0b0pTT05gIG1ldGhvZHMgb24gdGhlc2Ugb2JqZWN0cyB1bmxlc3MgdGhleSBhcmVcbiAgICAgICAgICAgIC8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIC8vIElmIGEgcmVwbGFjZW1lbnQgZnVuY3Rpb24gd2FzIHByb3ZpZGVkLCBjYWxsIGl0IHRvIG9idGFpbiB0aGUgdmFsdWVcbiAgICAgICAgICAvLyBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpIHtcbiAgICAgICAgICAvLyBCb29sZWFucyBhcmUgcmVwcmVzZW50ZWQgbGl0ZXJhbGx5LlxuICAgICAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBgSW5maW5pdHlgIGFuZCBgTmFOYCBhcmUgc2VyaWFsaXplZCBhc1xuICAgICAgICAgIC8vIGBcIm51bGxcImAuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAvLyBTdHJpbmdzIGFyZSBkb3VibGUtcXVvdGVkIGFuZCBlc2NhcGVkLlxuICAgICAgICAgIHJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4gICAgICAgICAgLy8gaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICBmb3IgKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICBpZiAoc3RhY2tbbGVuZ3RoXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgLy8gQ3ljbGljIHN0cnVjdHVyZXMgY2Fubm90IGJlIHNlcmlhbGl6ZWQgYnkgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxuICAgICAgICAgIHByZWZpeCA9IGluZGVudGF0aW9uO1xuICAgICAgICAgIGluZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7XG4gICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpLCBpbmRleCsrKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IGhhc01lbWJlcnMgPyAod2hpdGVzcGFjZSA/IFwiW1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJdXCIgOiAoXCJbXCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJdXCIpKSA6IFwiW11cIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4gICAgICAgICAgICAvLyBlaXRoZXIgYSB1c2VyLXNwZWNpZmllZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzLCBvciB0aGUgb2JqZWN0XG4gICAgICAgICAgICAvLyBpdHNlbGYuXG4gICAgICAgICAgICBmb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHNlcmlhbGl6ZShwcm9wZXJ0eSwgdmFsdWUsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBpbmRlbnRhdGlvbiwgc3RhY2spO1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbiAgICAgICAgICAgICAgICAvLyBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgbGV0IGBtZW1iZXJgIHtxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIn1cbiAgICAgICAgICAgICAgICAvLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4gICAgICAgICAgICAgICAgLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2VcbiAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXIsIG5vdCB0aGUgYHNwYWNlYCB7d2lkdGh9IGFyZ3VtZW50IHByb3ZpZGVkIHRvXG4gICAgICAgICAgICAgICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZSA/IFwiIFwiIDogXCJcIikgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhc01lbWJlcnMgPyAod2hpdGVzcGFjZSA/IFwie1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJ9XCIgOiAoXCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCIpKSA6IFwie31cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBQdWJsaWM6IGBKU09OLnN0cmluZ2lmeWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgSlNPTjMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHNvdXJjZSwgZmlsdGVyLCB3aWR0aCkge1xuICAgICAgICB2YXIgd2hpdGVzcGFjZSwgY2FsbGJhY2ssIHByb3BlcnRpZXM7XG4gICAgICAgIGlmICh0eXBlb2YgZmlsdGVyID09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgZmlsdGVyID09IFwib2JqZWN0XCIgJiYgZmlsdGVyKSB7XG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwoZmlsdGVyKSA9PSBmdW5jdGlvbkNsYXNzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGZpbHRlcjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdldENsYXNzLmNhbGwoZmlsdGVyKSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBwcm9wZXJ0eSBuYW1lcyBhcnJheSBpbnRvIGEgbWFrZXNoaWZ0IHNldC5cbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOyB2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwgKChnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdDbGFzcyB8fCBnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBudW1iZXJDbGFzcykgJiYgKHByb3BlcnRpZXNbdmFsdWVdID0gMSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwod2lkdGgpID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAvLyBgd2lkdGhgIG51bWJlciBvZiBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgaWYgKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCkge1xuICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChnZXRDbGFzcy5jYWxsKHdpZHRoKSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgICAgd2hpdGVzcGFjZSA9IHdpZHRoLmxlbmd0aCA8PSAxMCA/IHdpZHRoIDogd2lkdGguc2xpY2UoMCwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgZGlzY2FyZHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZW1wdHkgc3RyaW5nIGtleXNcbiAgICAgICAgLy8gKGBcIlwiYCkgb25seSBpZiB0aGV5IGFyZSB1c2VkIGRpcmVjdGx5IHdpdGhpbiBhbiBvYmplY3QgbWVtYmVyIGxpc3RcbiAgICAgICAgLy8gKGUuZy4sIGAhKFwiXCIgaW4geyBcIlwiOiAxfSlgKS5cbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZShcIlwiLCAodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSBzb3VyY2UsIHZhbHVlKSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIFwiXCIsIFtdKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUHVibGljOiBQYXJzZXMgYSBKU09OIHNvdXJjZSBzdHJpbmcuXG4gICAgaWYgKCFoYXMoXCJqc29uLXBhcnNlXCIpKSB7XG4gICAgICB2YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuICAgICAgLy8gSW50ZXJuYWw6IEEgbWFwIG9mIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciB1bmVzY2FwZWRcbiAgICAgIC8vIGVxdWl2YWxlbnRzLlxuICAgICAgdmFyIFVuZXNjYXBlcyA9IHtcbiAgICAgICAgOTI6IFwiXFxcXFwiLFxuICAgICAgICAzNDogJ1wiJyxcbiAgICAgICAgNDc6IFwiL1wiLFxuICAgICAgICA5ODogXCJcXGJcIixcbiAgICAgICAgMTE2OiBcIlxcdFwiLFxuICAgICAgICAxMTA6IFwiXFxuXCIsXG4gICAgICAgIDEwMjogXCJcXGZcIixcbiAgICAgICAgMTE0OiBcIlxcclwiXG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogU3RvcmVzIHRoZSBwYXJzZXIgc3RhdGUuXG4gICAgICB2YXIgSW5kZXgsIFNvdXJjZTtcblxuICAgICAgLy8gSW50ZXJuYWw6IFJlc2V0cyB0aGUgcGFyc2VyIHN0YXRlIGFuZCB0aHJvd3MgYSBgU3ludGF4RXJyb3JgLlxuICAgICAgdmFyIGFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBSZXR1cm5zIHRoZSBuZXh0IHRva2VuLCBvciBgXCIkXCJgIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWRcbiAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuICAgICAgLy8gbGl0ZXJhbCwgb3IgQm9vbGVhbiBsaXRlcmFsLlxuICAgICAgdmFyIGxleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFNvdXJjZSwgbGVuZ3RoID0gc291cmNlLmxlbmd0aCwgdmFsdWUsIGJlZ2luLCBwb3NpdGlvbiwgaXNTaWduZWQsIGNoYXJDb2RlO1xuICAgICAgICB3aGlsZSAoSW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDk6IGNhc2UgMTA6IGNhc2UgMTM6IGNhc2UgMzI6XG4gICAgICAgICAgICAgIC8vIFNraXAgd2hpdGVzcGFjZSB0b2tlbnMsIGluY2x1ZGluZyB0YWJzLCBjYXJyaWFnZSByZXR1cm5zLCBsaW5lXG4gICAgICAgICAgICAgIC8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyMzogY2FzZSAxMjU6IGNhc2UgOTE6IGNhc2UgOTM6IGNhc2UgNTg6IGNhc2UgNDQ6XG4gICAgICAgICAgICAgIC8vIFBhcnNlIGEgcHVuY3R1YXRvciB0b2tlbiAoYHtgLCBgfWAsIGBbYCwgYF1gLCBgOmAsIG9yIGAsYCkgYXRcbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgIC8vIGBcImAgZGVsaW1pdHMgYSBKU09OIHN0cmluZzsgYWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kXG4gICAgICAgICAgICAgIC8vIGJlZ2luIHBhcnNpbmcgdGhlIHN0cmluZy4gU3RyaW5nIHRva2VucyBhcmUgcHJlZml4ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgIC8vIGVuZC1vZi1zdHJpbmcgdG9rZW5zLlxuICAgICAgICAgICAgICBmb3IgKHZhbHVlID0gXCJAXCIsIEluZGV4Kys7IEluZGV4IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDMyKSB7XG4gICAgICAgICAgICAgICAgICAvLyBVbmVzY2FwZWQgQVNDSUkgY29udHJvbCBjaGFyYWN0ZXJzICh0aG9zZSB3aXRoIGEgY29kZSB1bml0XG4gICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gOTIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnRyb2wgY2hhcmFjdGVyIChpbmNsdWRpbmcgYFwiYCwgYFxcYCwgYW5kIGAvYCkgb3IgVW5pY29kZVxuICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5MjogY2FzZSAzNDogY2FzZSA0NzogY2FzZSA5ODogY2FzZSAxMTY6IGNhc2UgMTEwOiBjYXNlIDEwMjogY2FzZSAxMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IFVuZXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTc6XG4gICAgICAgICAgICAgICAgICAgICAgLy8gYFxcdWAgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCBjb2RlIHBvaW50LlxuICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gKytJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXggKyA0OyBJbmRleCA8IHBvc2l0aW9uOyBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgdmFsaWQgc2VxdWVuY2UgY29tcHJpc2VzIGZvdXIgaGV4ZGlnaXRzIChjYXNlLVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3IHx8IGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEwMiB8fCBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA3MCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBmcm9tQ2hhckNvZGUoXCIweFwiICsgc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSAzNCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICBiZWdpbiA9IEluZGV4O1xuICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbiAgICAgICAgICAgICAgICAgIHdoaWxlIChjaGFyQ29kZSA+PSAzMiAmJiBjaGFyQ29kZSAhPSA5MiAmJiBjaGFyQ29kZSAhPSAzNCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzdHJpbmcgYXMtaXMuXG4gICAgICAgICAgICAgICAgICB2YWx1ZSArPSBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSAzNCkge1xuICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIFVudGVybWluYXRlZCBzdHJpbmcuXG4gICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAvLyBQYXJzZSBudW1iZXJzIGFuZCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBQYXJzZSBhbiBpbnRlZ2VyIG9yIGZsb2F0aW5nLXBvaW50IHZhbHVlLlxuICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICAgICAgICAvLyBMZWFkaW5nIHplcm9lcyBhcmUgaW50ZXJwcmV0ZWQgYXMgb2N0YWwgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ4ICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDEpKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBpbnRlZ2VyIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICBmb3IgKDsgSW5kZXggPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgSW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgLy8gY2FzZSBpcyBhbHJlYWR5IGFjY291bnRlZCBmb3IgYnkgdGhlIHBhcnNlci5cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDQ2KSB7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZGVjaW1hbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICBmb3IgKDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCB0cmFpbGluZyBkZWNpbWFsLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuICAgICAgICAgICAgICAgIC8vIGNhc2UtaW5zZW5zaXRpdmUuXG4gICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSkge1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgIC8vIFNraXAgcGFzdCB0aGUgc2lnbiBmb2xsb3dpbmcgdGhlIGV4cG9uZW50LCBpZiBvbmUgaXNcbiAgICAgICAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0MyB8fCBjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGV4cG9uZW50aWFsIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCBlbXB0eSBleHBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG4gICAgICAgICAgICAgICAgcmV0dXJuICtzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuICAgICAgICAgICAgICBpZiAoaXNTaWduZWQpIHtcbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDUpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbnRpbmVsIGAkYCBjaGFyYWN0ZXIgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIC8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxuICAgICAgICByZXR1cm4gXCIkXCI7XG4gICAgICB9O1xuXG4gICAgICAvLyBJbnRlcm5hbDogUGFyc2VzIGEgSlNPTiBgdmFsdWVgIHRva2VuLlxuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0cywgaGFzTWVtYmVycztcbiAgICAgICAgaWYgKHZhbHVlID09IFwiJFwiKSB7XG4gICAgICAgICAgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG4gICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBpZiAoKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pID09IFwiQFwiKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFBhcnNlIG9iamVjdCBhbmQgYXJyYXkgbGl0ZXJhbHMuXG4gICAgICAgICAgaWYgKHZhbHVlID09IFwiW1wiKSB7XG4gICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIGFycmF5LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBhcnJheS5cbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgIC8vIEEgY2xvc2luZyBzcXVhcmUgYnJhY2tldCBtYXJrcyB0aGUgZW5kIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdGluZyB0aGUgcHJldmlvdXMgZWxlbWVudCBmcm9tIHRoZVxuICAgICAgICAgICAgICAvLyBuZXh0LlxuICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggYXJyYXkgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZ2V0KHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IFwie1wiKSB7XG4gICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIG9iamVjdCwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgZm9yICg7OyBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBJZiB0aGUgb2JqZWN0IGxpdGVyYWwgY29udGFpbnMgbWVtYmVycywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdG9yLlxuICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBvYmplY3QgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIG9iamVjdCBtZW1iZXIuXG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbiAgICAgICAgICAgICAgLy8gZG91YmxlLXF1b3RlZCBzdHJpbmdzLCBhbmQgYSBgOmAgbXVzdCBzZXBhcmF0ZSBlYWNoIHByb3BlcnR5XG4gICAgICAgICAgICAgIC8vIG5hbWUgYW5kIHZhbHVlLlxuICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVW5leHBlY3RlZCB0b2tlbiBlbmNvdW50ZXJlZC5cbiAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG4gICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB3YWxrKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmKSB7XG4gICAgICAgICAgZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuICAgICAgLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgIC8vIGBXYWxrKGhvbGRlciwgbmFtZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIChzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldLCBsZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgIC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbiAgICAgICAgICAvLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbiAgICAgICAgICAvLyBmb3IgYXJyYXkgaW5kaWNlcyAoZS5nLiwgYCFbMSwgMiwgM10uaGFzT3duUHJvcGVydHkoXCIwXCIpYCkuXG4gICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwodmFsdWUpID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgIGZvciAobGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgdXBkYXRlKHZhbHVlLCBsZW5ndGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBQdWJsaWM6IGBKU09OLnBhcnNlYC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICBKU09OMy5wYXJzZSA9IGZ1bmN0aW9uIChzb3VyY2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXN1bHQsIHZhbHVlO1xuICAgICAgICBJbmRleCA9IDA7XG4gICAgICAgIFNvdXJjZSA9IFwiXCIgKyBzb3VyY2U7XG4gICAgICAgIHJlc3VsdCA9IGdldChsZXgoKSk7XG4gICAgICAgIC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuICAgICAgICBpZiAobGV4KCkgIT0gXCIkXCIpIHtcbiAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IHRoZSBwYXJzZXIgc3RhdGUuXG4gICAgICAgIEluZGV4ID0gU291cmNlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3MgPyB3YWxrKCh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHJlc3VsdCwgdmFsdWUpLCBcIlwiLCBjYWxsYmFjaykgOiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuICBpZiAoaXNMb2FkZXIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEpTT04zO1xuICAgIH0pO1xuICB9XG59KHRoaXMpKTtcbiJdfQ==
;