###
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # display object/array by string
  # @param {object|array} obj
  # @param {number} [spaceLength=2] the space before each line
  ###
  self.toWord = (arg, spaceLength) ->
    toWord = (arg, spaceLength, layer) ->
      spaceLength = spaceLength or 2
      layer = layer or 0
      fnSpaceLength = layer * 2 + 6
      space = caro.repeat(' ', spaceLength)
      fnSpace = caro.repeat(' ', fnSpaceLength)
      layer++
      try
        ret = JSON.stringify(arg, (key, val) ->
          return val if !key
          return toWord(val, spaceLength, layer)
        , spaceLength)
        ret = ret.replace(/\\r\\n/g, '\r\n' + space)
        ret = ret.replace(/\\r/g, '\r' + space)
        ret = ret.replace(/\\n/g, '\n' + space)
        ret = ret.replace(/"/g, '')
      return ret if ret
      try
        ret = arg.toString()
        if caro.isFunction(arg)
          reg = new RegExp('\r\n' + fnSpace, 'g')
          ret = ret.replace(reg, '\r\n')
          reg = new RegExp('\r' + fnSpace, 'g')
          ret = ret.replace(reg, '\r')
          reg = new RegExp('\\n' + fnSpace, 'g')
          ret = ret.replace(reg, '\n')
          ret = ret.replace(/"/g, '')
      return ret
    return toWord(arg, spaceLength)

  ###
  # group by argument type
  # @param {object|array} arg
  # @return {object}
  ###
  self.classify = (arg) ->
    aStr = []
    aBool = []
    aArr = []
    aNum = []
    aObj = []
    aFn = []
    caro.forEach(arg, (a) ->
      if caro.isBoolean(a)
        aBool.push a
      else if caro.isString(a)
        aStr.push a
        return
      else if caro.isNumber(a)
        aNum.push a
      else if caro.isArray(a)
        aArr.push a
      else if caro.isPlainObject(a)
        aObj.push(a)
      else if caro.isFunction(a)
        aFn.push a
    )
    bool: aBool
    str: aStr
    num: aNum
    arr: aArr
    obj: aObj
    fn: aFn

  ###
  # catch other object-values to target-object
  # @param {object} obj
  # @return {object}
  ###
  self.catching = (obj) ->
    args = caro.drop(arguments)
    caro.forEach(args, (eachObj) ->
      caro.forEach(eachObj, (eachVal, eachKey) ->
        obj[eachKey] = eachVal if obj.hasOwnProperty(eachKey)
      )
    )
    obj

  ###
  # get keys that object1 has but object2 not
  # @param {object} obj1
  # @param {object} obj2
  # @return {array}
  ###
  self.differentKeys = (obj1, obj2, reverse) ->
    keys1 = caro.keys(obj1)
    keys2 = caro.keys(obj2)
    return caro.difference(keys1, keys2) unless reverse
    caro.difference(keys2, keys1)

  ###
  # check if all keys are equal between objects
  # @param {object} obj1
  # @param {object} obj2
  # @return {boolean}
  ###
  self.hasEqualKeys = (obj1, obj2) ->
    size1 = caro.size(caro.differentKeys(obj1, obj2))
    size2 = caro.size(caro.differentKeys(obj1, obj2, true))
    size1 is 0 and size2 is 0

  return