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
 * 移除数组元素
 * @param {Array} arr - 数组
 * @param {Function} fn - 过滤规则
 * @returns {Array}
 */
export const remove = (arr, fn) =>{
  return Array.isArray(arr)
    ? arr.filter(fn).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
}
/**
 * 深克隆
 * @param {Object|Array} obj - 引用类型Object、Array
 * @returns {Object|Array}
 */
export const deepClone = obj => {
  if (obj === null) return null
  let clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  return Array.isArray(obj)
    ? (clone.length = obj.length) && Array.from(clone)
    : clone
}
/**
 * 防抖
 * @param {Function} fn - 回调函数
 * @param {Number} ms - 防抖时间：非DOM操作 > 4ms，DOM操作 > 16.7ms
 * @returns {Function}
 */
export const debounce = (fn, ms = 0) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * 节流
 * @param {Function} fn - 回调函数
 * @param {Number} wait - 节流时间：非DOM操作 > 4ms，DOM操作 > 16.7ms
 * @returns {Function}
 */
export const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/**
 * 时间戳：可添加自定义头部
 * @param {String} [prefix=''] - Date对象
 * @returns {String}
 */
export const  timeStamp = ({ prefix = '' } = {}) => {
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
 * runAsync
 * @param {*} fn 
 */
const runAsync = fn => {
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

