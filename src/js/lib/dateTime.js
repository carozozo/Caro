
/**
 * DateTime
 * @author Caro.Huang
 */
(function() {
  'use strict';
  var coverFormatType, coverLocale, defLocale, getDateTimeObj, oShorthandFormat, returnMomentObjIfNoFormatType, self;
  if (caro.nMoment == null) {
    return;
  }
  self = caro;
  defLocale = 'en';
  oShorthandFormat = {};
  getDateTimeObj = function(dateTime) {
    if (dateTime) {
      return nMoment(dateTime);
    }
    return nMoment();
  };
  coverLocale = function(locale) {
    locale = caro.coverToStr(locale, false);
    return locale || defLocale;
  };
  coverFormatType = function(shorthandFormat, locale) {
    var oLocale;
    locale = coverLocale(locale);
    oLocale = oShorthandFormat[locale] || oShorthandFormat[defLocale] || {};
    return oLocale[shorthandFormat] || shorthandFormat;
  };
  returnMomentObjIfNoFormatType = function(oDateTime, formatType) {
    if (formatType === void 0) {
      return oDateTime;
    }
    return caro.formatDateTime(oDateTime, formatType);
  };

  /**
   * if set default locale first, then use formatDateTime(), will return format type by it
   * @param {string} locale
   */
  self.setDefaultLocale = function(locale) {
    locale = coverLocale(locale);
    defLocale = locale;
  };

  /**
   * @param {string} shorthandFormat the shorthand format type
   * @param {string} formatType the format type
   * @param {string} [locale] you can set different format type by locale
   */
  self.addDateTimeShortFormat = function(shorthandFormat, formatType, locale) {
    locale = coverLocale(locale);
    oShorthandFormat[locale] = oShorthandFormat[locale] || {};
    oShorthandFormat[locale][shorthandFormat] = formatType;
  };

  /**
   * @param {?string|object} dateTime
   * @param {string} [formatType] format-type
   * @param {string} [locale] localize date
   * @returns {string}
   */
  self.formatDateTime = function(dateTime, formatType, locale) {
    var oDateTime, returnVal;
    locale = coverLocale(locale);
    if (locale) {
      nMoment.locale(locale);
    }
    formatType = coverFormatType(formatType, locale);
    oDateTime = getDateTimeObj(dateTime);
    returnVal = oDateTime.format(formatType);
    nMoment.locale(defLocale);
    return returnVal;
  };

  /**
   * get now-time
   * @param {string} [fmt] format-type
   * @param {string} [locale] localize date
   * @returns {string}
   */
  self.formatNow = function(fmt, locale) {
    return caro.formatDateTime(null, fmt, locale);
  };

  /**
   * add date-time unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/add/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {number|string} amount
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
   * @returns {*}
   */
  self.addDateTime = function(dateTime, amount, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    if (caro.isObj(amount)) {
      oDateTime.add(amount);
    } else {
      oDateTime.add(amount, unit);
    }
    return returnMomentObjIfNoFormatType(oDateTime, formatType);
  };

  /**
   * subtract date-time unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/subtract/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {number|string} amount
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
   * @returns {*}
   */
  self.subtractDateTime = function(dateTime, amount, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    if (caro.isObj(amount)) {
      oDateTime.subtract(amount);
    } else {
      oDateTime.subtract(amount, unit);
    }
    return returnMomentObjIfNoFormatType(oDateTime, formatType);
  };

  /**
   * get start of the unit
   * e.g. startOf('2013-01-01 23:00:00','day') = 2013-01-01 00:00:00
   * please refer {@link http://momentjs.com/docs/#/manipulating/start-of/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
   * @returns {moment.Moment|*}
   */
  self.startOfDateTime = function(dateTime, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.startOf(unit);
    return returnMomentObjIfNoFormatType(oDateTime, formatType);
  };

  /**
   * get end of the unit
   * please refer {@link http://momentjs.com/docs/#/manipulating/end-of/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {string} unit time-unit
   * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
   * @returns {moment.Moment|*}
   */
  self.endOfDateTime = function(dateTime, unit, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.endOf(unit);
    return returnMomentObjIfNoFormatType(oDateTime, formatType);
  };

  /**
   * get date-time with UTC
   * please refer {@link http://momentjs.com/docs/#/parsing/utc/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {?string} [formatType] will return formatted-str if set, otherwise return moment-obj
   * @returns {*}
   */
  self.getUtc = function(dateTime, formatType) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime.utc();
    return returnMomentObjIfNoFormatType(oDateTime, formatType);
  };

  /**
   * compare date-time if before target
   * please refer {@link http://momentjs.com/docs/#/query/is-before/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isBeforeDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime2 = getDateTimeObj(targetDateTime);
    return oDateTime.isBefore(oDateTime2, unit);
  };

  /**
   * check date-time if after target
   * please refer {@link http://momentjs.com/docs/#/query/is-after/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isAfterDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime2 = getDateTimeObj(targetDateTime);
    return oDateTime.isAfter(oDateTime2, unit);
  };

  /**
   * check date-time if same as target
   * please refer {@link http://momentjs.com/docs/#/query/is-same/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {?string|object} targetDateTime the str with date-time format, or moment-obj
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isSameDateTime = function(dateTime, targetDateTime, unit) {
    var oDateTime, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime2 = getDateTimeObj(targetDateTime);
    return oDateTime.isSame(oDateTime2, unit);
  };

  /**
   * check if a moment is between two other moments
   * please refer {@link http://momentjs.com/docs/#/query/is-between/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @param {?string|object} dateTime1 the str with date-time format, or moment-obj
   * @param {?string|object} dateTime2 the str with date-time format, or moment-obj
   * @param {string} [unit] time-unit
   * @returns {*}
   */
  self.isBetweenDateTime = function(dateTime, dateTime1, dateTime2, unit) {
    var oDateTime, oDateTime1, oDateTime2;
    oDateTime = getDateTimeObj(dateTime);
    oDateTime1 = getDateTimeObj(dateTime1);
    oDateTime2 = getDateTimeObj(dateTime2);
    return oDateTime.isBetween(oDateTime1, oDateTime2, unit);
  };

  /**
   * validate is date-time format
   * please refer {@link http://momentjs.com/docs/#/utilities/invalid/}
   * @param {?string|object} dateTime the str with date-time format, or moment-obj
   * @returns {*}
   */
  self.isValidDateTime = function(dateTime) {
    var oDateTime;
    oDateTime = getDateTimeObj(dateTime);
    return oDateTime.isValid();
  };

  /**
   * get different between 2 date-time
   * please refer {@link http://momentjs.com/docs/#/displaying/difference/}
   * @param {?string|object} dateTime1 the str with date-time format, or moment-obj
   * @param {?string|object} dateTime2 the str with date-time format, or moment-obj
   * @param {string} [unit] time-unit
   * @param {boolean} [withFloat=false]
   * @returns {number|*}
   */
  self.getDateTimeDiff = function(dateTime1, dateTime2, unit, withFloat) {
    var oDateTime1, oDateTime2;
    withFloat = withFloat === true;
    oDateTime1 = getDateTimeObj(dateTime1);
    oDateTime2 = getDateTimeObj(dateTime2);
    return oDateTime1.diff(oDateTime2, unit, withFloat);
  };
})();