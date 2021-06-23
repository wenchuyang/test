!function(){
    // 直接访问
    /**
     * 不考虑闰年的情况下，输入月份返回天数
     * if 做判断
     * @param {number} month 月份
     * @returns 天数
     */
    function getDays(month) {
        if(month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            return 31
        }
        if(month === 2) {
            return 28
        }
        if(month === 4 || month === 6 || month === 9 || month === 11) {
            return 30
        }
        return 0
    }

    /**
     * 表驱动，直接访问
     * 不考虑闰年的情况下，输入月份返回天数
     * @param {number} month 月份
     * @returns 天数
     */
    function getDays1(month) {
        let daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        return daysArr[month-1] || 0
    }

    // 索引访问
    /**
     * 输入编码获得对应的中文名称
     * @param {string} code 名字对应的编码
     */
    function getName(code) {
        if (code === 'alipay') {
            return '支付宝'
        }
        if (code === 'wechat') {
            return '微信'
        }
        if (code === 'weibo') {
            return '微博'
        }
        return ''
    }

    /**
     * 表驱动，索引访问
     * 输入编码获得对应的中文名称
     * @param {string} code 名字对应的编码
     * @returns 
     */
    function getName1(code) {
        let map = {
            'alipay': '支付宝',
            'wechat': '微信',
            'weibo': '微博'
        }
        return map[code] || ''
    }

    // 阶梯访问
    /**
     * 输入年龄，得到该年龄的描述
     * @param {number} age 年龄
     * @returns 描述
     */
    function getDesc(age) {
        if (age < 0) {
            return 'wrong'
        }
        if (age <= 3) {
            return '婴幼儿'
        }
        if (age <= 10) {
            // 3 ~ 10 岁之间，因为前面小于3的已经 return 了，这里不需要做重复判断
            return '小屁孩'
        }
        if (age <= 18) {
            return '少年'
        }
        if (age <= 28) {
            return '青年'
        }
        if (age <= 40) {
            return '青壮年'
        }
        if (age <= 55) {
            return '中年'
        }
        if (age <= 85) {
            return '中老年'
        }
        if (age <= 500) {
            return '老年'
        }
        if (age > 500) {
            return '妖怪'
        }
        return ''
    }

    /**
     * 表驱动，阶梯访问
     * 输入年龄，得到该年龄的描述
     * @param {number} age 年龄
     * @returns 描述
     */
    function getDesc1(age) {
        const ageRanges = [0, 3, 10, 18, 28, 40, 55, 85, 500, Infinity]
        const descriptions = ['wrong', '婴幼儿', '小屁孩', '少年', '青年', '青壮年', '中年', '中老年', '老年', '妖怪']
        const len = descriptions.length    
        for (let i = 0; i < len; i++) {
            if (age <= ageRanges[i]) {
                return descriptions[i]
            }
        }
        return ''
    }


    /**
     * 使用
     */
    // 直接访问
    // if
    const month = document.querySelector('[name=month]')
    const day = document.querySelector('#day')
    document.querySelector('#getDays').addEventListener('click', ()=>{
        day.innerText = getDays(+month.value)
    })
    // 表驱动
    const month1 = document.querySelector('[name=month1]')
    const day1 = document.querySelector('#day1')
    document.querySelector('#getDays1').addEventListener('click', ()=>{
        day1.innerText = getDays1(+month1.value)
    })

    // 索引访问

    // 阶梯访问


}.call(undefined)
