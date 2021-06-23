!function(){
    /**
     * if else
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
    function calc2(op, x, y) {
        return strategy[op](x, y)
    }

    /**
     * 使用
     */
    let param1 = document.querySelector('.ifTest [name=x]')
    let param2 = document.querySelector('.ifTest [name=y]')
    let result = document.querySelector('#result')
    document.querySelector('#add').addEventListener('click', ()=>{
        let x = +param1.value
        let y = +param2.value
        result.innerText = calc('ADD', x, y)
    })
    document.querySelector('#sub').addEventListener('click', ()=>{
        let x = +param1.value
        let y = +param2.value
        result.innerText = calc('SUB', x, y)
    })

    let param11 = document.querySelector('.strategyTest [name=x]')
    let param21 = document.querySelector('.strategyTest [name=y]')
    let result1 = document.querySelector('#result1')
    document.querySelector('#add1').addEventListener('click', ()=>{
        let x = +param11.value
        let y = +param21.value
        result1.innerText = calc2('ADD', x, y)
    })
    document.querySelector('#sub1').addEventListener('click', ()=>{
        let x = +param11.value
        let y = +param21.value
        result1.innerText = calc2('SUB', x, y)
    })
}.call(undefined)