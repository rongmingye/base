/**
 * 快速排序
 * 中心思想是用二分实现的快速排序，能够很快的完成排序任务
 * 找到基准值
 * 比基准值小的放左边，比基准值大的放右边, 相同的放中间
 * 递归
 * 优点：速度快，O(n*log n)
 **/ 

export function quickSort(arr = []) {
    if(arr.length <= 1) return arr

    let base = arr[0]

    let left = []
    let right = []
    let same = []
    arr.forEach((item) => {
        if (item < base) {
            left.push(item)
        } else if(item > base) {
            right.push(item)
        } else {
            same.push(item)
        }
    })
    return [...quickSort(left), ...same, ...quickSort(right)]
}

/* 
* 冒泡排序
* 对比相邻的两个数，小的放左边，大的放右边

* 缺点：时间复杂度O(n^2)，计算慢
*/
export function diffSort(arr = []) {
    for (let i = 0; i < arr.length - 1; i++) {
        for(let j=0; j < arr.length - i; j++) {
            const current = arr[j]
            const next = arr[j + 1]
            if(arr[j] > arr[j + 1]) {
                arr[j] = next
                arrp[j+1] = current
            }
        }
    }
}

/*
* 选择排序
* 从数组内遍历出最小值，加入新数组，将最小值从原数组中删除
* 优点：上手比较简单，比较符合人的正常思路逻辑
* 缺点：时间复杂度O(n^2)，运算速度很慢，当数组元素个数比较多时，时间增速惊人
*/

export function selectSort(arr = []) {
    let res = []
    arr = [...arr]
    while(arr.length) {
        let min = 0
        let minIndex = 0
        arr.forEach((item, index) => {
            if(item < min) {
                min = item
                minIndex = index
            }
        })
        res.push(arr.splice(minIndex, 1)[0])
    }
    return res
}

// 数组去重
export function unique(arr) {
    return [...new Set(arr)]
}

export function unique1(arr) {
    let res = []
    arr.forEach(item => {
        if(!res.includes(item)) {
            res.push(item)
        }
    })
    return res
}

// 数组乱序
export function shuffle1(arr) {
    return arr.sort((a, b) => Math.random() - 0.5)
}

/**
 * 
 * 遍历数组，产生一个随机数下标，获取他的值，并在原数组删除，添加到新的数组，直到原数组为空
 */
export function shuffle2(arr) {
    let res = []
    while(arr.length > 0) {
        let randomIndex = Math.floor(Math.random() * arr.length)
        res.push(arr.splice(randomIndex, 1)[0])
    }
    return res
}