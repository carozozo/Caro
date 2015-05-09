
/**
 * Log
 * @author Caro.Huang
 */
(function() {
  var normalizeLogPath, self;
  if (!caro.isNode) {
    return;
  }
  self = caro;
  normalizeLogPath = function(logPath) {
    logPath = caro.normalizePath(logPath);
    return caro.addTail(logPath, '.log');
  };

  /**
   * read log-file ,and create it if not exists
   * @param logPath
   * @returns {*}
   */
  self.readLog = function(logPath) {
    var e;
    logPath = normalizeLogPath(logPath);
    try {
      if (!caro.fsExists(logPath)) {
        return null;
      }
      return caro.readFileCaro(logPath);
    } catch (_error) {
      e = _error;
      console.error('caro.log', e);
      return null;
    }
  };

  /**
   * write log-file with data
   * create empty-file if data is empty
   * @param logPath
   * @param [data]
   * @returns {*}
   */
  self.writeLog = function(logPath, data) {
    var e, maxSize, size;
    data = data || '';
    logPath = normalizeLogPath(logPath);
    try {
      size = caro.getFsSize(logPath);
      maxSize = Math.pow(10, 6);
      if (size > maxSize) {
        console.error('caro.log: ', logPath + ' size ' + size + ' is more thane 1 MB');
        return;
      }
      data = caro.coverToStr(data);
      caro.writeFileCaro(logPath, data);
    } catch (_error) {
      e = _error;
      console.error('caro.log: ', e);
    }
  };

  /**
   * update log data
   * OPT
   * ifWrap: bool (default: true) - add wrap with add-data
   * prepend: bool (default: false) - add data in front of origin-data
  #
   * @param logPath
   * @param data
   * @param [opt]
   */
  self.updateLog = function(logPath, data, opt) {
    var ifWrap, originData, prepend, wrap;
    originData = caro.readLog(logPath);
    wrap = '\r\n';
    ifWrap = true;
    prepend = false;
    if (opt) {
      ifWrap = opt.ifWrap !== false;
      prepend = opt.prepend === true;
    }
    originData = originData || '';
    data = caro.coverToStr(data);
    if (originData && ifWrap) {
      if (prepend) {
        data += wrap;
      } else {
        originData += wrap;
      }
    }
    if (prepend) {
      data += originData;
    } else {
      data = originData + data;
    }
    caro.writeLog(logPath, data);
  };
  self.updateLogWithDayFileName = function(logPath, data, opt) {
    var today;
    today = caro.formatNow('YYYYMMDD');
    logPath = caro.addTail(logPath, '_' + today);
    caro.updateLog(logPath, data, opt);
  };

  /**
   * convenient-logger to [trace.log]
   * @param data
   * @param [opt]
   */
  self.traceLog = function(data, opt) {
    var logPath;
    logPath = 'trace';
    caro.updateLog(logPath, data, opt);
  };
})();