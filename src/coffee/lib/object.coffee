###
# Object
# @author Caro.Huang
###
do ->
  self = caro

  ###
  # assign elements to from obj2 to obj1 by keys
  # won't replace obj1 value if exists when argument-replace is false
  # @param {object} obj1
  # @param {object} obj2
  # @param {array} keys the keys in obj2 that you want sand to obj1
  # @param {boolean} [replace=true] won't replace obj1 elements if obj1 has same key when false
  ###
  self.assignByKeys = (obj1, obj2, keys, replace = true) ->
    caro.reduce(keys, (obj, key) ->
      if caro.has(obj2, key) and (replace or not caro.has(obj, key))
        obj[key] = obj2[key]
      return obj
    , obj1)

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

  ###
  # get keys that is same between objects
  # @param {object} obj1
  # @param {object} obj2
  # @return {array}
  ###
  self.sameKeys = (obj1, obj2) ->
    keys = caro.keys(obj1)
    diffKeys = caro.differentKeys(obj1, obj2)
    caro.reduce(keys, (result, val) ->
      result.push(val) if caro.indexOf(diffKeys, val) < 0
      return result
    , [])

  return