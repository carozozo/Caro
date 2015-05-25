###*
# Helper
# @namespace caro
# @author Caro.Huang
###
do ->
  self = caro

  ###*
  # cover to array
  # @param arg
  # @returns {*}
  ###
  self.toArray = (arg) ->
    return arg if caro.isArray(arg)
    return [arg] if caro.isNumber(arg)
    Array(arg)

  ###*
  # cover to string
  # @param arg
  # @returns {*}
  ###
  self.toString = (arg) ->
    String(arg)

  ###*
  # cover to integer
  # @param arg
  # @returns {*}
  ###
  self.toInteger = (arg) ->
    parseInt(arg)

  ###*
  # cover to number
  # @param arg
  # @returns {*}
  ###
  self.toNumber = (arg) ->
    Number(arg)

  ###*
  # cover to fixed-number
  # @param arg
  # @param {boolean} [dec=2] decimal-number
  # @returns {*}
  ###
  self.toFixedNumber = (arg, dec=2) ->
    r = caro.toString(arg);
    r = r.replace(/5$/, '6') if(arg % 1)
    Number((+r).toFixed(dec))

  ###*
  # @param arg
  # @param {object} [opt]
  # @param {boolean} [opt.force=true] if force cover to JSON
  # @param {function=null} [opt.replacer] the replace-function in each element
  # @param {space=4} [opt.space] the space for easy-reading after cover to JSON
  # @returns {*}
  ###
  self.toJson = (arg, opt) ->
    json = ''
    opt = opt or {};
    force = opt.force != false
    replacer = opt.replacer or null
    space = if opt.space? then opt.space else 4
    if space
      json = JSON.stringify(arg, replacer, space)
    else
      json = JSON.stringify(arg, replacer)
    return json if caro.isJson(json)
    return arg if !force
    ''

  return