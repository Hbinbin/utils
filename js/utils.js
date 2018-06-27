class Utils {
  /**
   * 深克隆
   * 
   * @static
   * @param {Object|Array} obj - 引用类型Object、Array
   * @returns {Object|Array}
   * @memberof Utils
   */
  static deepClone(obj) {
    let clone = Object.assign({}, obj) // 浅克隆
    Object.keys(obj).forEach(key => {
      clone[key] = typeof obj[key] === 'object' ? this.deepClone(obj[key]) : obj[key]
    })
    return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone
  }
  /**
   * 防抖
   * 
   * @static
   * @param {Function} fn - 回调函数
   * @param {Number} ms - 防抖时间
   * @returns {Function}
   * @memberof Utils
   */
  static debounce(fn, ms = 0) {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  /**
   * 时间戳：可添加自定义头部
   *
   * @static
   * @param {Date} date - Date对象
   * @returns {String}
   * @memberof Utils
   */
  static timeStamp({ prefix = '' } = {}) {
    return prefix + new Date().getTime()
  }
  /**
   * 格式化时间
   *
   * @static
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
   * @memberof Utils
   */
  static formatTime({ date = new Date(), dateSeparator = '/', timeSeparator = ':', type = 'en', week = false, meridiem = false, day = 0, hour = 0, minutes = 0, second = 0 } = {}) {
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
   * @static
   * @returns Boolean
   * @memberof Utils
   */
  static browserType() {
    let userAgent = navigator.userAgent
    let isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
    let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    let isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
    let isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
    let isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
    if (isIE || isEdge) {
      window.vue.$alarm.showError('您当前是IE浏览器，请使用Chrome浏览器，打开标记工具！')
      return false
    } else if (isOpera) {
      window.vue.$alarm.showError('您当前是Opera浏览器，请使用Chrome浏览器，打开标记工具！')
      return false
    } else if (isFF) {
      window.vue.$alarm.showError('您当前是FireFox浏览器，请使用Chrome浏览器，打开标记工具！')
      return false
    } else if (isSafari) {
      window.vue.$alarm.showError('您当前是Safari浏览器，请使用Chrome浏览器，打开标记工具！')
      return false
    } else if (isChrome) {
      let regChrome = /chrome\/[\d.]+/gi
      let version = String(userAgent.match(regChrome)).split('/')[1]
      let firstVersionNum = version.split('.')[0]
      if (firstVersionNum < 50) { // 版本小于50，提示升级
        window.vue.$alarm.showWarning(`您当前Chrome版本是：${version},请升级到最新版本`)
        return false
      } else {
        // window.vue.$alarm.showSuccess(`欢迎使用标记工具！`)
        return true
      }
    } else {
      window.vue.$alarm.showError('请使用Chrome浏览器，打开标记工具！')
      return false
    }
  }
  /**
   * 随机生成汉字、大小写字母、1~10的数字
   * 
   * @static
   * @param {String} type - 字符的类型
   * @returns {String}
   * @memberof Utils
   */
  static getCharacter(type) {
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
  * 随机色
  * 
  * @param {Number} opacity - 透明度
  * @param {String} opacityType - 透明度是否随机
  * @static
  * @returns {String}
  * @memberof Utils
  */
  static getColor({ opacity = 1, randomOpa = false } = {}) {
    let randomColor = []
    for (let i = 0; i < 3; i++) {
      randomColor[i] = Math.floor(Math.random() * 256)
    }
    opacity = randomOpa ? Math.random() : 1
    return `rgba(${randomColor[0]},${randomColor[1]},${randomColor[2]},${opacity})`
  }

}
