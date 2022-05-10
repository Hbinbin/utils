export const isUndefined = val => typeof val === 'undefined'
export const isNull = val => val === null
export const isFunction = val => typeof val === 'function'
export const isString = val => typeof val === 'string'
export const isExist = val => !(isUndefined(val) || isNull(val))

/**
 * get 安全取值
 * @param {object} obj - 取值的对象
 * @param {string | array} keys - 取值方式
 * @param {any} defaultValue - 取不到值时的默认值
 * @desc 例：get(obj, 'a.b')；get(obj, ['a', 'b'])；get(obj, 'c.b')；带默认值：get(obj, 'c.b', 1)
 */
export const get = (obj, keys = [], defaultValue) => {
  try {
    const result = (isString(keys) ? keys.split('.') : keys).reduce(
      (res, key) => res[key],
      obj
    )
    return isUndefined(result) ? defaultValue : result
  } catch (e) {
    return defaultValue
  }
}

/**
 * run 安全运行（可保护上下文）
 * @param {object} obj - 取值的对象
 * @param {string | array} keys - 取值方式
 * @param  {...any} args 可执行函数的参数
 */
export const run = (obj, keys = [], ...args) => {
  keys = isString(keys) ? keys.split('.') : keys
  const func = get(obj, keys)
  const context = get(obj, keys.slice(0, -1))
  return isFunction(func) ? func.call(context, ...args) : func
}
/**
 * value 多层默认值（只在值为`undefined`情况下生效）
 * @param  {...any} values
 * @desc var v1, v2, v3 = 'default'
 * @desc value(v1, v2, v3) // default
 * @desc value(v1, 0, v3) // 0
 */
export const value = (...values) =>
  values.reduce(
    (value, nextValue) => (isUndefined(value) ? run(nextValue) : run(value)),
    undefined
  )
