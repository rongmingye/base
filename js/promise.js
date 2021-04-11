export class myPromise {
    constructor(func) {
        this.status = 'pending' // pending fulfilled reject
        this.value = ''
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)

        this.resolvedTasks = []
        this.rejectedTasks = []

        try {
            func(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        this.status = 'fulfilled'
        this.value = value
        this.resolvedTasks.forEach(t => t(value))
    }

    reject(value) {
        this.status = 'rejected'
        this.value = value
        console.log(this.rejectedTasks)
        this.rejectedTasks.forEach(t => t(value))
    }

    then(onFulfilled, onRejected) {
        console.log(onRejected);
        return new myPromise((resolve, reject) => {
            onFulfilled && this.resolvedTasks.push((value) => {
                try {
                    const res = onFulfilled(value)
                    if (res instanceof myPromise) {
                        res.then(resolve, reject)
                    } else {
                        resolve(res)
                    }
                } catch (error) {
                    reject(error)
                }
            })
            onRejected && this.rejectedTasks.push((value) => {
                try {
                    const res = onRejected(value)
                    if (res instanceof myPromise) {
                        res.then(resolve, reject)
                    } else {
                        reject(res)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    catch (onRejected) {
        return this.then(null, onRejected)
    }
}

function runTest() {
    new myPromise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
            // resolve(3)
            reject(4)
        }, 2000)
    }).then((res) => {
        console.log(res)
        console.log(2)
    }).catch((error) => {
        console.log(error)
    })
}