
/**
 * Object
 * @author Caro.Huang
 */
(function() {
  var self;
  self = caro;

  /**
   * show object/array by string
   * @param {object} obj
   */
  self.toWord = function(arg) {
    var toWord;
    toWord = function(arg, spaceLength) {
      var addSpace, reg, ret, space;
      spaceLength = spaceLength || 0;
      ret = '';
      spaceLength += 2;
      space = '    ';
      addSpace = caro.repeat(' ', spaceLength);
      space += addSpace;
      try {
        ret = JSON.stringify(arg, function(key, val) {
          if (!key) {
            return val;
          }
          return toWord(val, spaceLength);
        }, 2);
        ret = ret.replace(/\\r\\n/g, '\r\n  ');
        ret = ret.replace(/\\r/g, '\r  ');
        ret = ret.replace(/\\n/g, '\n  ');
        ret = ret.replace(/"/g, '');
      } catch (_error) {}
      if (ret) {
        return ret;
      }
      try {
        ret = arg.toString();
        reg = new RegExp('\r\n' + space, 'g');
        ret = ret.replace(reg, '\r\n');
        reg = new RegExp('\r' + space, 'g');
        ret = ret.replace(reg, '\r');
        reg = new RegExp('\n' + space, 'g');
        ret = ret.replace(reg, '\n');
        ret = ret.replace(/"/g, '');
      } catch (_error) {}
      return ret;
    };
    return toWord(arg, 0);
  };
})();
