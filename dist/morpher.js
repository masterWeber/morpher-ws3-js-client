(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Morpher = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var browser = createCommonjsModule(function (module, exports) {

    var getGlobal = function getGlobal() {
      // the only reliable means to get the global object is
      // `Function('return this')()`
      // However, this causes CSP violations in Chrome apps.
      if (typeof self !== 'undefined') {
        return self;
      }

      if (typeof window !== 'undefined') {
        return window;
      }

      if (typeof global !== 'undefined') {
        return global;
      }

      throw new Error('unable to locate global object');
    };

    var global = getGlobal();
    module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

    if (global.fetch) {
      exports["default"] = global.fetch.bind(global);
    }

    exports.Headers = global.Headers;
    exports.Request = global.Request;
    exports.Response = global.Response;
  });

  if (!commonjsGlobal.fetch) {
    commonjsGlobal.fetch = browser;
  }

  var Communicator = /*#__PURE__*/function () {
    function Communicator() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Communicator);

      _defineProperty(this, "baseUrl", 'https://ws3.morpher.ru');

      _defineProperty(this, "token", null);

      _defineProperty(this, "timeoutMs", 3000);

      if (params.baseUrl !== undefined) {
        if (params.baseUrl.indexOf('http') !== -1) {
          this.baseUrl = params.baseUrl;
        } else {
          this.baseUrl = 'http://' + params.baseUrl;
        }
      }

      if (params.token !== undefined) {
        this.token = params.token;
      }

      if (params.timeoutMs !== undefined) {
        this.timeoutMs = params.timeoutMs;
      }
    }

    _createClass(Communicator, [{
      key: "request",
      value: function request(path, params, method) {
        var _this = this;

        var url = this.buildUrl(path, params);
        var contentType = this.isPost(method) ? 'application/x-www-form-urlencoded' : 'application/json';
        var init = {
          method: method,
          headers: {
            'Content-Type': contentType,
            'Accept': 'application/json'
          }
        };
        return new Promise(function (resolve, reject) {
          var timer = setTimeout(function () {
            return reject(new Error('TIMEOUT'));
          }, _this.timeoutMs);

          _this.fetcher(url, init).then(function (value) {
            clearTimeout(timer);
            resolve(value);
          })["catch"](function (reason) {
            clearTimeout(timer);
            reject(reason);
          });
        });
      }
    }, {
      key: "buildUrl",
      value: function buildUrl(path, params) {
        var url = new URL(path, this.baseUrl);
        params.forEach(function (value, name) {
          url.searchParams.append(name, value);
        });

        if (this.token) {
          url.searchParams.append('token', this.token);
        }

        return url.toString();
      }
    }, {
      key: "_fetcher",
      value: function _fetcher(url, init) {
        return fetch(url, init);
      }
    }, {
      key: "fetcher",
      get: function get() {
        return this._fetcher;
      },
      set: function set(fn) {
        this._fetcher = fn;
      }
    }, {
      key: "isPost",
      value: function isPost(method) {
        return method.toUpperCase() === Communicator.METHOD_POST;
      }
    }]);

    return Communicator;
  }();

  _defineProperty(Communicator, "METHOD_GET", 'GET');

  _defineProperty(Communicator, "METHOD_DELETE", 'DELETE');

  _defineProperty(Communicator, "METHOD_POST", 'POST');

  var communicator = Communicator;

  var DeclensionForms = function DeclensionForms(props) {
    _classCallCheck(this, DeclensionForms);

    if (props['И'] !== undefined) {
      this.nominative = props['И'];
      this['именительный'] = this.nominative;
    }

    this.genitive = props['Р'];
    this['родительный'] = this.genitive;
    this.dative = props['Д'];
    this['дательный'] = this.dative;
    this.accusative = props['В'];
    this['винительный'] = this.accusative;
    this.instrumental = props['Т'];
    this['творительный'] = this.instrumental;
    this.prepositional = props['П'];
    this['предложный'] = this.prepositional;

    if (props['П_о'] !== undefined) {
      this.prepositional_O = props['П_о'];
      this['предложный_О'] = this.prepositional_O;
    }
  };

  var declensionForms = DeclensionForms;

  var FullName = function FullName(props) {
    _classCallCheck(this, FullName);

    this.name = props['И'];
    this['имя'] = this.name;
    this.surname = props['Ф'];
    this['фамилия'] = this.surname;
    this.patronymic = props['О'];
    this['отчество'] = this.patronymic;
  };

  var fullName = FullName;

  var DeclensionResult = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(DeclensionResult, _DeclensionForms);

    var _super = _createSuper(DeclensionResult);

    function DeclensionResult(props) {
      var _this;

      _classCallCheck(this, DeclensionResult);

      _this = _super.call(this, props);

      if (props['род'] !== undefined) {
        _this.gender = props['род'];
        _this['род'] = _this.gender;
      }

      if (props['множественное'] !== undefined) {
        _this.plural = new declensionForms(props['множественное']);
        _this['множественное'] = _this['plural'];
      }

      if (props['где'] !== undefined) {
        _this.where = props['где'];
        _this.locative = _this.where;
        _this.gde = _this.where;
        _this['где'] = _this.where;
      }

      if (props['куда'] !== undefined) {
        _this.where_to = props['куда'];
        _this.kuda = _this.where_to;
        _this['куда'] = _this.where_to;
      }

      if (props['откуда'] !== undefined) {
        _this.where_from = props['откуда'];
        _this.whence = _this.where_from;
        _this.otkuda = _this.where_from;
        _this['откуда'] = _this.where_from;
      }

      if (props['ФИО'] !== undefined) {
        _this.fullName = new fullName(props['ФИО']);
        _this['фио'] = _this.fullName;
      }

      return _this;
    }

    return DeclensionResult;
  }(declensionForms);

  var declensionResult = DeclensionResult;

  var NumberSpellingResult = function NumberSpellingResult(props) {
    _classCallCheck(this, NumberSpellingResult);

    this.n = new declensionForms(props['n']);
    this.unit = new declensionForms(props['unit']);
  };

  var numberSpellingResult = NumberSpellingResult;

  var MorpherError = /*#__PURE__*/function (_Error) {
    _inherits(MorpherError, _Error);

    var _super = _createSuper(MorpherError);

    function MorpherError(message, code) {
      var _this;

      _classCallCheck(this, MorpherError);

      _this = _super.call(this, message);
      _this.code = code;
      return _this;
    }

    return MorpherError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var morpherError = MorpherError;

  var Client = /*#__PURE__*/function () {
    function Client(communicator) {
      _classCallCheck(this, Client);

      _defineProperty(this, "prefix", '/russian');

      this.communicator = communicator;
    }

    _createClass(Client, [{
      key: "declension",
      value: function declension(phrase) {
        var params = new Map();
        params.set('s', phrase);

        for (var _len = arguments.length, flags = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          flags[_key - 1] = arguments[_key];
        }

        if (flags.length > 0) {
          params.set('flags', flags.join(','));
        }

        var path = this.prefix + '/declension';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new declensionResult(data);
        });
      }
    }, {
      key: "spell",
      value: function spell() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var params = new Map();
        params.set('n', number);
        params.set('unit', unit);
        var path = this.prefix + '/spell';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new numberSpellingResult(data);
        });
      }
    }]);

    return Client;
  }();

  var client = Client;

  var DeclensionForms$1 = function DeclensionForms(props) {
    _classCallCheck(this, DeclensionForms);

    if (props['A'] !== undefined) {
      this.nominative = props['A'];
      this['атау'] = this.nominative;
    }

    this.genitive = props['І'];
    this['ілік'] = this.genitive;
    this.dative = props['Б'];
    this['барыс'] = this.dative;
    this.accusative = props['Т'];
    this['табыс'] = this.accusative;
    this.ablative = props['Ш'];
    this['шығыс'] = this.ablative;
    this.locative = props['Ж'];
    this['жатыс'] = this.locative;
    this.instrumental = props['К'];
    this['көмектес'] = this.instrumental;
  };

  var declensionForms$1 = DeclensionForms$1;

  var SameNumberForms = /*#__PURE__*/function (_DeclensionForms) {
    _inherits(SameNumberForms, _DeclensionForms);

    var _super = _createSuper(SameNumberForms);

    function SameNumberForms(props) {
      var _this;

      _classCallCheck(this, SameNumberForms);

      _this = _super.call(this, props);
      _this.firstPerson = new declensionForms$1(props['менің']);
      _this['менің'] = _this.firstPerson;
      _this.secondPerson = new declensionForms$1(props['сенің']);
      _this['сенің'] = _this.secondPerson;
      _this.secondPersonRespectful = new declensionForms$1(props['сіздің']);
      _this['сіздің'] = _this.secondPersonRespectful;
      _this.thirdPerson = new declensionForms$1(props['оның']);
      _this['оның'] = _this.thirdPerson;
      _this.firstPersonPlural = new declensionForms$1(props['біздің']);
      _this['біздің'] = _this.firstPersonPlural;
      _this.secondPersonPlural = new declensionForms$1(props['сендердің']);
      _this['сендердің'] = _this.secondPersonPlural;
      _this.secondPersonRespectfulPlural = new declensionForms$1(props['сіздердің']);
      _this['сіздердің'] = _this.secondPersonRespectfulPlural;
      _this.thirdPersonPlural = new declensionForms$1(props['олардың']);
      _this['олардың'] = _this.thirdPersonPlural;
      return _this;
    }

    return SameNumberForms;
  }(declensionForms$1);

  var sameNumberForms = SameNumberForms;

  var DeclensionResult$1 = /*#__PURE__*/function (_SameNumberForms) {
    _inherits(DeclensionResult, _SameNumberForms);

    var _super = _createSuper(DeclensionResult);

    function DeclensionResult(props) {
      var _this;

      _classCallCheck(this, DeclensionResult);

      _this = _super.call(this, props);
      _this.plural = new sameNumberForms(props['көпше']);
      _this['көпше'] = _this.plural;
      return _this;
    }

    return DeclensionResult;
  }(sameNumberForms);

  var declensionResult$1 = DeclensionResult$1;

  var Client$1 = /*#__PURE__*/function () {
    function Client(communicator) {
      _classCallCheck(this, Client);

      _defineProperty(this, "prefix", '/qazaq');

      this.communicator = communicator;
    }

    _createClass(Client, [{
      key: "declension",
      value: function declension(phrase) {
        var params = new Map();
        params.set('s', phrase);
        var path = this.prefix + '/declension';
        return this.communicator.request(path, params, communicator.METHOD_GET).then(function (response) {
          return response.json();
        }).then(function (data) {
          if (data['message'] && data['code']) {
            throw new morpherError(data['message'], data['code']);
          }

          return new declensionResult$1(data);
        });
      }
    }]);

    return Client;
  }();

  var client$1 = Client$1;

  var Morpher = /*#__PURE__*/function () {
    function Morpher(params) {
      _classCallCheck(this, Morpher);

      this.communicator = new communicator(params);
    }

    _createClass(Morpher, [{
      key: "communicator",
      get: function get() {
        return this._communicator;
      },
      set: function set(value) {
        this._communicator = value;
      }
    }, {
      key: "russian",
      get: function get() {
        return new client(this.communicator);
      }
    }, {
      key: "qazaq",
      get: function get() {
        return new client$1(this.communicator);
      }
    }]);

    return Morpher;
  }();

  _defineProperty(Morpher, "FLAG_FEMININE", 'feminine');

  _defineProperty(Morpher, "FLAG_MASCULINE", 'masculine');

  _defineProperty(Morpher, "FLAG_ANIMATE", 'animate');

  _defineProperty(Morpher, "FLAG_INANIMATE", 'inanimate');

  _defineProperty(Morpher, "FLAG_COMMON", 'common');

  _defineProperty(Morpher, "FLAG_NAME", 'name');

  _defineProperty(Morpher, "FLAG_NEUTER", 'neuter');

  _defineProperty(Morpher, "FLAG_PLURAL", 'plural');

  var morpher = Morpher;

  return morpher;

})));
//# sourceMappingURL=morpher.js.map
