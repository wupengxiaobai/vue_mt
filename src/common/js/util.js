/**
 * 输入框防抖
 * @param {*} func 
 * @param {*} delay 
 */
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay);
    }
}
