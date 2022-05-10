/**
 * 数组去重
 * @param {Array} array - 数组
 * @returns {Array}
 */
export const unique = (array = []) => {
  return [...new Set(array)];
}
/**
 * 俩数组交集
 * @param {Array} array1 - 数组1
 * @param {Array} array2 - 数组2
 * @returns {Array}
 */
export const intersect = (arr1 = [], arr2 = []) => {
  return new Set([...arr1].filter(item => arr2.has(item)));
}
/**
 * 俩数组差集
 * @param {Array} array1 - 数组1
 * @param {Array} array2 - 数组2
 * @returns {Array}
 */
export const difference = (arr1 = [], arr2 = []) => {
  return new Set([...arr1].filter(item => !arr2.has(item)));
}
/**
 * 数组降维
 * @param {Array} array - 多维数组
 * @returns {Array}
 */
export const arrFlat = (arr = [], level = Infinity) => {
  return arr.flat(level)
}
/**
 * 数组乱序
 * @desc 数组元素只支持：String、Number
 * @param {Array} array - 数组
 * @returns {Array}
 */
export const randomArray = (array) => {
  return array.sort(function () {
    return Math.random() - 0.5
  })
}

/**
 * 数组分组
 * @param {*} arr 
 * @param {string} key - 需要分组key
 */
export const groupBy = (arr, key) => {
  const groupRes = arr.reduce((group, cur) => {
    let newKey = cur[key]
    if (!group[newKey]) {
      group[newKey] = []
    }
    group[newKey].push(cur)
    return group
  }, {})
  return groupRes
}






