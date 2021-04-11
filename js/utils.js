// 防抖
export function debounce(func, ms = 2000) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func.apply(this, args)
        }, ms)
    }
}

// 节流-时间戳方式
export function throttle(func, ms = 2000) {
    let previous = 0
    return function (...args) {
        if (new Date().getTime() - previous >= ms) {
            previous = new Date().getTime()

            setTimeout(() => {
                func.apply(this, args)
            }, ms)
        }
    }
}

// 节流
export function throttle2(func, ms = 2000) {
    let canRun = true
    return function (...args) {
        if (!canRun) return null
        canRun = false
        setTimeout(() => {
            canRun = true
            func.apply(this, args)
        }, ms)
    }
}

// 深拷贝
export function deepCopy(obj) {
    let newObj = {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] !== 'object') {
                newObj[key] = obj[key]
            } else {
                newObj[key] = deepCopy(obj[key])
            }
        }
    }
    return newObj
}

 // 事件总线, 发布-订阅模式
export class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(name, func) {
        if (this.cache[name]) {
            this.cache[name].push(func)
        } else {
            this.cache[name] = [func]
        }
    }

    off(name, func) {
        if (this.cache[name]) {
            const index = this.cache[name].findIndex(item => item === func || item.callback == func)
            if (index >= 0) {
                this.cache.splice(index, 1)
            }
        }
    }

    emit(name, once = false) {
        if (this.cache[name]) {
            const tasks = this.cache[name].slice()

            for (let func of tasks) {
                func()
            }

            if(once) {
                delete this.cache[name]
            }
        }
    }
}

// 数组扁平
export function arrayFlat(arr = []) {
    const res = []
    arr.forEach(item => {
        if (Aarray.isArray(arr)) {
            res.push(...arrayFlat(item))
        } else {
            res.push(item)
        }
    })
    return res
}

export function arrayFlat2(arr = []) {
    return arr.flat()
}

// 对象扁平
export function objectFlat(obj = {}) {
    const res = {}
    Object.keys(obj).forEach((key) => {
        let item = obj[key]
        if (item && typeof item === 'object') {
            res[key] = objectFlat(item)
        } else {
            res[key] = item
        }
    })

    return res
}

export function myCall(obj = window, ...args) {
    // ...args剩余参数用法
    if (typeof this !== 'function') {
        return new Error('not a function')
    }

    const key = Symbol('key')
    obj[key] = this
    const res = obj[key](...args)
    delete obj[key]
    return res
}

export function myApply(obj = window, ...args) {
    if(typeof this !== 'function') {
        return new Error('not a function')
    }

    const key = Symbol('key')
    obj[key] = this

    let res
    if (args[0]) {
        res = obj[key](...args[0])
    } else {
        res = obj[key]()
    }
    delete obj[key]
    return res
}

// 手写请求
export function http({method = 'get', url='', params, header, onprogress, async=true}) {
    header = header || {
        'Content-type': 'application/json;charset:utf-8'
    }

    if(method === 'get' && params) {
        url += getParams(params)
    }

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        request.open(method, url, async)
        request.setRequestHeader(header)
        request.send(params)
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                resolve(JSON.parse(request.responseText))
            } else {
                reject(new Error(req.statusText));
            } 
        }
        request.onprogress = onprogress
    })
}

getParams(obj) {
    let res = ''
    for(let key in obj) {
        if(obj[key] && obj.hasOwnProperty(key)) {
            res += `&${key}=${obj[key]}`
        }
    }
    res ? res = '?' + res.slice(1) : null
    return res
}

// 图片懒加载
export function imgLazy() {
    let imgs = document.querySelector('.img-lazy')

    imgs.forEach(item => {
        if(isInView(item)) {
            item.src = item.dataset.src
            item.classList.remove('img-lazy')
        }
    })

     // 当全部处理完了，移除监听
     if (lazyImages.length === 0) {
        document.removeEventListener("scroll", lazyLoad)
        window.removeEventListener("resize", lazyLoad)
     }
}

function isInView(img) {
    const elem = img.getBoundingClientRect()
    if(elem.top < window.innerHeight && elem.bottom > 0) {
        return true
    }

    return false
}