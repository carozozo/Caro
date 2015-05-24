
/**
 * TypeCheck
 * @namespace caro
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * check if arg is boolean | string | number
   * @param {...} arg
   * @returns {boolean}
   */
  self.isBasicVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      return !(!caro.isBoolean(arg) && !caro.isString(arg) && !caro.isNumber(arg));
    });
  };

  /**
   * check if value is empty ( {} | [] | null | '' | undefined )
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEmptyVal = function(arg) {
    return caro.checkIfPassCb(arguments, function(arg) {
      if (caro.isObject(arg)) {
        return caro.getObjLength(arg) < 1;
      }
      if (caro.isArray(arg)) {
        return arg.length < 1;
      }
      return !arg && arg !== 0 && arg !== false;
    });
  };

  /**
   * check if value is true | 'true' | 1
   * @param {...} arg
   * @returns {boolean}
   */
  self.isEasingTrue = function(arg) {
    if (caro.isString(arg)) {
      arg = arg.toLowerCase();
    }
    return arg === true || arg === 'true' || arg === 1;
  };

  /**
   * check if value is false | 'false' | 0
   * @param arg
   * @returns {boolean}
   */
  self.isEasingFalse = function(arg) {
    if (caro.isString(arg)) {
      arg = arg.toLowerCase();
    }
    return arg === false || arg === 'false' || arg === 0;
  };

  /**
   * check if integer
   * @param {*} arg
   * @returns {boolean}
   */
  self.isInteger = function(arg) {
    var int;
    if (!caro.isNumber(arg)) {
      return false;
    }
    int = parseInt(arg);
    return int === arg;
  };

  /**
   * check if JSON, return false is one of them not match
   * @param {*} arg
   * @returns {boolean}
   */
  self.isJson = function(arg) {
    var e;
    try {
      JSON.parse(arg);
    } catch (_error) {
      e = _error;
      return false;
    }
    return true;
  };

  /**
   * check if argument is object-like JSON, return false is one of them not match
   * @param {...} arg
   * @returns {boolean}
   */
  self.isObjJson = function(arg) {
    var e, r;
    try {
      r = JSON.parse(arg);
      return caro.isObject(r);
    } catch (_error) {
      e = _error;
    }
    return false;
  };

  /**
   * check if string is uppercase
   * @param {...string} str
   * @returns {boolean}
   */
  self.isUpper = function(str) {
    var upp;
    upp = str.toUpperCase();
    if (upp !== str) {
      return false;
    }
    return true;
  };

  /**
   * check if string is lowercase
   * @param {string} str
   * @returns {boolean}
   */
  self.isLower = function(str) {
    var low;
    low = str.toLowerCase();
    if (low !== str) {
      return false;
    }
    return true;
  };
})();
