export const debounce = (fn: Function, delay: number) => {
    // 用一个变量来保存定时器的id
    let timer: number | null = null;
    // 返回一个新的函数
    return function(this: any, ...args: any[]) {
      // 如果已经有定时器，就清除掉
      if (timer) {
        clearTimeout(timer);
      }
      // 设置一个新的定时器，延迟执行函数
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }