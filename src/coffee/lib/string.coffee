###
# String
# @author Caro.Huang
###
do ->
  self = caro
  changeCase = (str, type, startOrCb = 0, end = null) ->
    cb = null
    end = str.length unless end
    strArr = str.split('')
    if typeof startOrCb is 'function'
      cb = startOrCb
      for letter, i in strArr
        strArr[i] = letter[type]() if cb(letter, i) is true
    else
      for letter, i in strArr
        strArr[i] = letter[type]() if i >= startOrCb and i < end
    strArr.join('')

  ###
  # add the head to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addHead = (str, addStr) ->
    str = addStr + str if str.indexOf(addStr) < 0
    str

  ###
  # add the tail to string if not exist
  # @param {string} str
  # @param {string} addStr
  # @returns {*}
  ###
  self.addTail = (str, addStr) ->
    length = addStr.length
    str += addStr if str.lastIndexOf(addStr) isnt str.length - length
    str

  ###
  # replace the <br /> to \n
  # @param {string} str
  # @returns {string}
  ###
  self.brToWrap = (str) ->
    regex = /<br\s*[\/]?>/gi
    str.replace regex, '\n'

  ###
  # insert string to another
  # @param {string} str1
  # @param {string} str2 the string want to insert
  # postion {integer} [position]
  ###
  self.insertStr = (str1, str2, position) ->
    position = position or str1.length
    [str1.slice(0, position), str2, str1.slice(position)].join('');

  ###
  # lowercase string
  # @param {string} str
  # @param {object} [opt]
  # @param {number|function} [opt.startOrCb] the start-index you want to lowercase
  # or callback-function, will lowercase when callback return true
  # @param {number} [opt.end] the end-index you want to lowercase
  # @param {boolean} [opt.force] if force cover to string
  # @returns {*}
  ###
  self.lowerStr = (str, startOrCb, end) ->
    changeCase str, 'toLowerCase', startOrCb, end

  ###
  # replace all find in string
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###
  self.replaceAll = (str, find, replace) ->
    find = find.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    regex = new RegExp(find, 'g')
    str.replace regex, replace

  ###
  # replace last find in string
  # @param {string} str
  # @param {string} find
  # @param {string} replace
  # @returns {*|string}
  ###
  self.replaceLast = (str, find, replace) ->
    lastIndex = str.lastIndexOf(find)
    str1 = str.slice(0, lastIndex)
    str2 = str.slice(lastIndex)
    str1 + str2.replace(find, replace)

  ###
    # split to array by '\r\n' | '\n' | '\r'
    # @param {string} str
    # @returns {*}
    ###
  self.splitByWrap = (str) ->
    aWrap = [
      '\r\n'
      '\r'
      '\n'
    ]
    caro.splitStr str, aWrap

  ###
    # split string
    # @param {string} str
    # @param {string|string[]} splitter it should be string-array or string
    # @returns {*}
    ###
  self.splitStr = (str, splitter) ->
    return str if Array.isArray(str)
    return [] if !splitter
    splitter = [splitter] unless Array.isArray(splitter)
    # e.g. splitter=['aa', 'ab', 'c', 'd']; => mainSplit='c'
    mainSplit = splitter[0]
    for eachSplit in splitter
      continue if typeof eachSplit isnt 'string'
      break if mainSplit.length < 2
      mainSplit = eachSplit if mainSplit.length > eachSplit.length
    return [] if typeof mainSplit isnt 'string'

    ### replace all splitter to mainSplitter
    # e.g. string='caro.huang, is handsome'; splitter=['.', ','];
    # => string='caro,huang, is handsome'
    ###
    for eachSplit in splitter
      continue if typeof eachSplit isnt 'string'
      str = caro.replaceAll(str, eachSplit, mainSplit)
    str.split mainSplit

  ###
  # check string if ("true" | not-empty) / ("false" | empty) and covert to boolean
  # @param {string} str
  # @returns {boolean}
  ###
  self.strToBool = (str) ->
    str = str.toLowerCase()
    # return false when string='false' or '', otherwise return true
    str != '' and str != 'false'

  ###
  # uppercase string
  # @param {string} str
  # @param {number|function} [startOrCb] the start-index you want to uppercase
  # or callback-function, will uppercase when callback return true
  # @param {number} [end] the end-index you want to uppercase
  # @returns {*}
  ###
  self.upperStr = (str, startOrCb, end) ->
    changeCase str, 'toUpperCase', startOrCb, end

  ###
  # replace \r\n | \r | \n to <br/>
  # @param {string} str
  # @returns {string}
  ###
  self.wrapToBr = (str) ->
    str = str.replace(/\r\n/g, '<br />')
    str = str.replace(/\n/g, '<br />')
    str = str.replace(/\r/g, '<br />')
    str

  return