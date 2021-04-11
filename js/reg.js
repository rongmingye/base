export function checkEmail(value) {
    let re = /^\d+@\w+.\w+$/gim
    return re.test(value)
}

export function checkPhone(value) {
    let re = /^(\d{11}|\d{7})$/
    return re.test(value)
}