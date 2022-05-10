import { getType } from './utils.common'
/**
 * 扁平化对象
 */
 export const flattenObj = obj => {
  const newObj = {}
  const recFlatten = (path, obj) => {
    const objType = getType(obj) // 判断值的类型
    if (objType === 'array' || objType === 'object') {
      for (let [k, v] of Object.entries(obj)) {
        let newKey = !path
          ? k
          : objType === 'array'
          ? `${path}[${k}]`
          : `${path}.${k}`
        recFlatten(newKey, v)
      }
    } else {
      // 非array、object类型直接赋值
      path && (newObj[path] = obj)
    }
  }
  recFlatten('', obj)
  return newObj
}

/**
 * 判断两个普通对象是否相等
 *
 * 举例：
 * const value1 = { a: 1, b: '1', c: [{a: 1}], d: {a: 1}}
 * const value2 = { a: 1, b: 1, c: [{a: 2}], d: {a: 1, b: 1}}
 *
 * isEqual(value1, value2) === false;
 * isEqual(value1, {...value1}) === true;
 * isEqual(value1, value1) === true;
 */
// 获取对象类型
export const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) return false
  for (let i = 0; i < obj1Keys.length; i++) {
    const value1 = obj1[obj1Keys[i]]
    const value2 = obj2[obj2Keys[i]]
    const value1IsObj = getType(value1) === 'object'
    const value2IsObj = getType(value2) === 'object'
    const value1IsArr = getType(value1) === 'array'
    const value2IsArr = getType(value2) === 'array'
    if ((value1IsObj && value2IsObj) || (value1IsArr && value2IsArr)) {
      // 两个都是对象或数组，递归
      return isEqual(value1, value2)
    } else if (value1 !== value2) {
      return false
    }
  }
  return true
}

/**
 * 根据 object对象的path路径获取值
 * 实现 lodash get 方法：根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代
 * @param {Object} object - 要检索的对象
 * @param {String} path - 要获取属性的路径
 * @param {Any} defaultValue - 如果解析值是 undefined ，这值会被返回
 *
 * 举例：
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * get(object, 'a[0].b.c') = 3;
 * get(object, ['a', '0', 'b', 'c']) = 3;
 * get(object, 'a.b.c', 'default') = 'default';
 */
 export const get = (obj, path, defaultVal) => {
   const pathArr = Array.isArray(path)
     ? path
     : path.replace(/\[(\d+)\]/g, '.$1').split('.')
   const res = pathArr.reduce((val, key) => {
     return val[key] ?? defaultVal
   }, obj)
   return res
 }