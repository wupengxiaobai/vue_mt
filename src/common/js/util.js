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


/**
 * 时间格式化
 * @param {*} date 
 */
export function formatTime(date, showTime = true) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (!showTime) return [year, month, day].map(formatNumber).join('-')
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
