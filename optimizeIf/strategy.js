/**
 * 单纯的 if else
 * @param {string} op 运算标识
 * @param {number} x 操作数1
 * @param {number} y 操作数2
 */
function calc(op, x, y) {
    if (op === 'ADD') {
        return x + y
    } else if (op === 'SUB') {
        return x - y
    }
    return 0
}

/**
 * 用函数进行代码优化
 * @param {string} op 运算标识
 * @param {number} x 操作数1
 * @param {number} y 操作数2
 */
function calc1(op, x, y) {
    if (op === 'ADD') {
        return add(x, y)
    } else if (op === 'SUB') {
        return sub(x, y)
    }
    return 0
}
function add(x, y) {
    return x + y
}
function sub(x, y) {
    return x - y
}

/**
 * 用策略模式进行代码优化
 * @param {string} op 运算标识
 * @param {number} x 操作数1
 * @param {number} y 操作数2
 */
let strategy = {
    'ADD': function (x, y) {
        return x + y
    },
    'SUB': function (x, y) {
        return x - y
    }
}
function calc3(op, x, y) {
    return strategy[op](x, y)
}
