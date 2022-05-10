

/**
 * 深克隆
 * * 解决循环引用问题
 * @param {Object|Array} obj - 引用类型Object、Array
 * @returns {Object|Array}
 */
export const cloneDeep = function (obj) {
  if (typeof obj !== 'object' || obj === null) return obj

  // 用来记录已克隆的对象
  const weekMap = new WeakMap()

  const recClone = obj => {
    // 解决对象循环引用的问题
    if (weekMap.has(obj)) return weekMap.get(obj)
    const cloneObj = Object.assign({}, obj)
    weekMap.set(obj, cloneObj)

    // 如果属性值是引用类型，递归
    Object.keys(obj).forEach(key => {
      cloneObj[key] =
        typeof obj[key] === 'object' && obj !== null
          ? recClone(obj[key])
          : obj[key]
    })

    // 如果obj是数组，Object.assign会将数据转换为对象，此处用Array.from转回数组
    return Array.isArray(obj)
      ? (cloneObj.length = obj.length) && Array.from(cloneObj)
      : cloneObj
  }
  return recClone(obj)
}

/**
 * 防抖
 * @desc wait时间内只触发一次，如果wait时间内再次触发，则重新计算时间
 * @param {Function} fn - 回调函数
 * @param {Number} wait - 防抖时间：非DOM操作 > 4ms，DOM操作 > 16.7ms
 * @returns {Function}
 */
export const debounce = function (fn, wait) {
  let timer = null
  return function (...args) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流
 * @desc wait时间内只会触发一次
 * @param {Function} fn - 回调函数
 * @param {Number} wait - 节流时间：非DOM操作 > 4ms，DOM操作 > 16.7ms
 * @returns {Function}
 */
export const throttle = function (fn, wait) {
  let flag = false
  return function (...args) {
    if (flag) return
    flag = true
    setTimeout(() => {
      fn.apply(this, args)
      flag = false
    }, wait)
  }
}

/**
 * 数字的千分位处理
 * (?:pattern) 
  非获取匹配，匹配pattern但不获取匹配结果，不进行存储供以后使用。这在使用或字符“(|)”来组合一个模式的各个部分是很有用。例如“industr(?:y|ies)”就是一个比“industry|industries”更简略的表达式。
  (?=pattern)
  非获取匹配，正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
  (?!pattern)
  非获取匹配，正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”。
  (?<=pattern)
  非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。例如，“(?<=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，但不能匹配“3.1Windows”中的“Windows”。
  (?<!pattern)
  非获取匹配，反向否定预查，与正向否定预查类似，只是方向相反。例如“(?<!95|98|NT|2000)Windows”能匹配“3.1Windows”中的“Windows”，但不能匹配“2000Windows”中的“Windows”。这个地方不正确，有问题 
  分类
 */
export const toThousand = function (num) {
  const reg = /(\d{1,3})(?=(\d{3})+$)/g // ?= 正向肯定预查 + 至少一次多了不限
  return (num + '').replace(reg, '$1,')
}

/**
 * 模糊搜索实现
 * .* 就是单个字符匹配任意次，即贪婪匹配
 */
export function fuzzySearch (query, inputs) {
  query = query.toLowerCase()
  const searchRes = []
  const reg = new RegExp(query.split('').join('.*'))
  inputs.forEach(item => {
    const lowerCaseItem = item.toLowerCase()
    reg.test(lowerCaseItem) && searchRes.push(item)
  })
  return searchRes
}

/**
 * 时间戳：可添加自定义头部
 * @param {String} [prefix=''] - Date对象
 * @returns {String}
 */
export const timeStamp = ({ prefix = '' } = {}) => {
  return prefix + new Date().getTime()
}

/**
 * 格式化时间
 * @param {Date} [date = new Date()] - 时间对象
 * @param {Date} [dateSeparator = '/'] - 日期分隔符
 * @param {String} [timeSeparator = ':'] - 时间分隔符
 * @param {String} [type = 'en'] - 中式时间/英式时间
 * @param {Boolean} [week = false] - 是否显示星期周几
 * @param {Boolean} [meridiem = false] - 是否显示上下午
 * @param {Number} [day = 0] - 当前天数的增减量
 * @param {Number} [hour = 0] - 当前小时的增减量
 * @param {Number} [minutes = 0] - 当前分钟的增减量
 * @param {Number} [second = 0] - 当前秒钟的增减量
 * @returns {String}
 */
export const formatTime = ({ date = new Date(), dateSeparator = '/', timeSeparator = ':', type = 'en', week = false, meridiem = false, day = 0, hour = 0, minutes = 0, second = 0 } = {}) =>{
  const newDate = new Date(date.getTime() + (parseFloat(day) * 24 * 3600 + parseFloat(hour) * 3600 + parseFloat(minutes) * 60 + parseFloat(second)) * 1000)
  const [weekDayCn, weekDayEn] = [["日", "一", "二", "三", "四", "五", "六"], ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']]
  let [y, M, d, w, h, m, s, mer] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getDay(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()]
  M < 10 && (M = "0" + M) // 月
  d < 10 && (d = "0" + d) // 日
  h > 12 && (h = h - 12) // 小时
  h < 10 && (h = "0" + h)
  m < 10 && (m = "0" + m) // 分
  s < 10 && (s = "0" + s) // 秒
  return type === 'en' ?
    [[y, M, d].join(dateSeparator), week ? `${weekDayEn[w]}` : '', meridiem ? `${h < 12 ? "am" : "pm"}` : '', [h, m, s].join(timeSeparator)].filter(val => val !== '').join(' ') :
    type === 'cn' ? [y + '年' + M + '月' + d + '日', week ? `星期${weekDayCn[w]}` : '', meridiem ? `${h < 12 ? "上午" : "下午"}` : '', [h, m, s].join(timeSeparator)].filter(val => val !== '').join(' ') :
      [[y, M, d].join(dateSeparator), [h, m, s].join(timeSeparator)].join(' ')
}

/**
 * 判断浏览器类型
 * @returns Boolean
 */
export const browserType = () => {
  let userAgent = navigator.userAgent,
      isOpera = userAgent.indexOf('Opera') > -1, // 判断是否Opera浏览器
      isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera, // 判断是否IE浏览器
      isEdge = userAgent.indexOf('Edge') > -1 && !isIE, // 判断是否IE的Edge浏览器
      isFF = userAgent.indexOf('Firefox') > -1, // 判断是否Firefox浏览器
      isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1, // 判断是否Safari浏览器
      isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
  if (isIE || isEdge) {
    console.log('您当前是IE浏览器，请使用Chrome浏览器，打开标记工具！')
  } else if (isOpera) {
    console.log('您当前是Opera浏览器，请使用Chrome浏览器，打开标记工具！')
  } else if (isFF) {
    console.log('您当前是FireFox浏览器，请使用Chrome浏览器，打开标记工具！')
  } else if (isSafari) {
    console.log('您当前是Safari浏览器，请使用Chrome浏览器，打开标记工具！')
  } else if (isChrome) {
    let regChrome = /chrome\/[\d.]+/gi
    let version = String(userAgent.match(regChrome)).split('/')[1]
    let firstVersionNum = version.split('.')[0]
    if (firstVersionNum < 50) { // 版本小于50，提示升级
      console.log(`您当前Chrome版本是：${version},请升级到最新版本`)
      return false
    } else {
      return true
    }
  } else {
    console.log('请使用Chrome浏览器，打开标记工具！')
  }
}
/**
 * 随机生成汉字、大小写字母、1~10的数字
 * @param {String} type - 字符的类型
 * @returns {String}
 */
export const getCharacter = (type) =>  {
  switch (type) {
    case 'cn': // 汉字19968~40868
      return String.fromCodePoint(Math.round(Math.random() * 20901) + 19968)
    case 'lowerCase': //97~122 a~z
      return String.fromCodePoint(Math.round(Math.random() * (122 - 97 + 1)) + 97)
    case 'upperCase': // 65~90 A~Z
      return String.fromCodePoint(Math.round(Math.random() * (90 - 65 + 1)) + 65)
    case 'number': // 48~57 0~9
      return String.fromCodePoint(Math.round(Math.random() * (57 - 48 + 1)) + 48)
  }
}

/**
 * url添加参数
 * @param {string} url - 需要添加参数的url
 * @param {object} params - 添加的参数，参数是'key:value'形式
 * @param {boolean} [isEncode=false] - 传入的url是否被编码过
 * @param {boolean} [needEncode=false] - 返回的url是否需要编码
 * @returns {string}
 */
export const addParams = ({ url = '', params = {}, isEncode = false, needEncode = false } = {}) => {
  url = isEncode ? decodeURIComponent(url) : url;
  if (url.indexOf('?') > -1) {
    let oldParams = {};
    url.split('?')[1].split('&').forEach(val => {
      let newVal = val.split('=');
      oldParams[newVal[0]] = newVal[1];
    });
    // 合并、去重参数
    params = { ...oldParams, ...params };
  }
  let [paramsStr, i] = ['', 1];
  for (let [key, val] of Object.entries(params)) {
    paramsStr += i > 1 ? `&${key}=${val}` : `${key}=${val}`;
    i++;
  }
  return needEncode ? encodeURIComponent(`${url.split('?')[0]}?${paramsStr}`) : `${url.split('?')[0]}?${paramsStr}`;
}

/**
 * url参数查询
 * @param {string} [url=location.search] - url地址
 * @param {string} [query] - 查询参数
 * @returns {Object|String}
 */
export const getParams = function({ url = location.search, query } = {}) {
  const params = {}
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_,k,v) => params[k] = v);
  return query ? params[query] : params;
}
/**
 * url参数查询
 * @param {String} url - url地址
 * @param {String} query - 查询参数
 * @returns {Object|String}
 */
export const getParamsOld = ({ url = '', query } = {}) => {
  let paramStr = url.split('?')[1];
  let [paramArr, params] = [paramStr && paramStr.split('&') || [], {}];
  paramArr.forEach((param, i) => {
    param = param.split('=');
    params[param[0]] = param[1];
  });
  return query ? params[query] : params;
}
/**
 * 小程序路径层级
 * @static
 * @param {Array} array - 数组
 * @returns {Array}
 * @memberof Utils
 */
export const pagePath = ({ path = '', moduleName = 'pages', data = {} } = {}) => {
  let currentPages = getCurrentPages();
  let currentRoute = currentPages[currentPages.length - 1].route;
  let [routeLevel, backLevel] = [currentRoute.split('/').length, ""];
  for (let i = 0; i < routeLevel - 1; i++) {
    backLevel += '../'
  }
  return this.addParams({
    url: backLevel + path,
    params: data,
  });
}

/**
 * 启动单独的线程去执行耗时的计算
 * @param {*} fn 
 */
export const runAsync = fn => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = err => {
      rej(err), worker.terminate();
    };
  });
};

/**
 * 生成长度为11的随机字母数字字符串
 */
export const getRandomId = function() {
  return Math.random().toString(36).substring(2);
}

/**
 * 检查对象或集合是否为空
 */
 export const isEmpty = val => val === null || !(Object.keys(val) || val).length
 /**
  * 检查对象是否为某个类型
  * * is(Array, [1]); // true
  * * is(ArrayBuffer, new ArrayBuffer()); // true
  * * is(Map, new Map()); // true
  * * is(RegExp, /./g); // true
  * * is(Set, new Set()); // true
  * * is(WeakMap, new WeakMap()); // true
  * * is(WeakSet, new WeakSet()); // true
  * * is(String, ''); // true
  * * is(String, new String('')); // true
  * * is(Number, 1); // true
  * * is(Number, new Number(1)); // true
  * * is(Boolean, true); // true
  * * is(Boolean, new Boolean(true)); // true
  */
  export const isType = (type, val) => ![, null].includes(val) && val.constructor === type
/**
 * 获取对象类型
 */
 export const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase());


 /**
 * 十六进制转rgb
 */
export const hexToRgb = function (color) {
  const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

  const hwxReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  color = color.toLowerCase()
  if (hexReg.test(color)) {
    color = color.slice(1) // 去除 '#'
    if (color.length === 3) {
      // 三位转六位
      let newColor = ''
      for (let i = 0; i < color.length; i++) {
        newColor += color[i].repeat(2)
      }
      color = newColor
    }
    if (color.length === 6) {
      let changeColor = []
      for (let i = 0; i < 6; i += 2) {
        // parseInt的第一个参数如果是以0x开头的字符串，会把其余部分转换为十六进制整数
        changeColor.push(parseInt('0x' + color.slice(i, i + 2)))
      }
      return `rgb(${changeColor.join()})`
    }
  }
  return color
}

/**
 * rgb转十六进制
 */
const rgbToHex = function (color) {
  const rgbReg = /^(rgb|RGB)/
  if (rgbReg.test(color)) {
    // ?:pattern表示非获取匹配，匹配pattern但不获取匹配结果
    const rgbArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    const color16 = rgbArr.reduce((sum, cur) => {
      let str16 = Number(cur).toString(16)
      if (str16 === '0') str16 = str16.repeat(2)
      return sum + str16
    }, '#')
    return color16
  }
  return color
}

/**
 * 随机色-rgba
 * @param {Number} opacity - 透明度
 * @param {String} opacityType - 透明度是否随机
 * @returns {String}
 */
 export const getRGBAColor = ({ opacity = 1, randomOpa = false } = {}) => {
  let randomColor = []
  for (let i = 0; i < 3; i++) {
    randomColor[i] = Math.floor(Math.random() * 256)
  }
  opacity = randomOpa ? Math.random() : 1
  return `rgba(${randomColor[0]},${randomColor[1]},${randomColor[2]},${opacity})`
}
/**
 * 随机色-十六进制
 */
export const get16Color = () => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
}


