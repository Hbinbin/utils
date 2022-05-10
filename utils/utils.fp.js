/**
 * 函数式编程
 * 1. 纯函数
 * 2. 函数柯里华
 * 3. 函数组合
 * 4. Point Free
 * https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html
 */
// 函数组合
// 传入多个功能函数
export const compose = (...fns) => {
  // 传入待处理的参数
  return x => {
    // 从右向左用传入的功能函数处理参数
    return fns.reduceRight((value, fn) => {
      return fn(value)
    }, x)
  }
}