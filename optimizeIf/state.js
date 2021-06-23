!function(){
    /**
     * 初始状态是 state0，在点击按钮的时候打印 000 并把状态改成 state1
     * 再次点击按钮打印 111 并把状态改成 state2
     * 再次点击按钮打印 222 并把状态改成 state0
     * 重复以上循环
     */

    /**
     * if else
     */
    let StateTest = function(){
        this.state = 'state0'
        this.button = null
    }
    StateTest.prototype.init = function(){
        this.button = document.querySelector('[state-button]')
        this.button.onclick = () => {
            this.buttonWasPressed()
        }
    }
    StateTest.prototype.buttonWasPressed = function(){
        if (this.state === 'state0') {
            this.state = 'state1'
            console.log('000')
        } else if (this.state === 'state1') {
            this.state = 'state2'
            console.log('111')
        } else if (this.state === 'state2') {
            this.state = 'state0'
            console.log('222')
        }
    }
    // 使用
    let stateTest = new StateTest()
    stateTest.init()


    /**
     * 状态模式
     */
    let State0 = function(state){
        this.state = state
    }
    State0.prototype.buttonWasPressed = function(){
        this.state.setState(this.state.state1)
        console.log('000')
    }
    let State1 = function(state){
        this.state = state
    }
    State1.prototype.buttonWasPressed = function(){
        this.state.setState(this.state.state2)
        console.log('111')
    }
    let State2 = function(state){
        this.state = state
    }
    State2.prototype.buttonWasPressed = function(){
        this.state.setState(this.state.state0)
        console.log('222')
    }
    
    let StateTest1 = function(){
        this.state0 = new State0(this)
        this.state1 = new State1(this)
        this.state2 = new State2(this)
        this.currState = this.state0
        this.button = null
    };
    StateTest1.prototype.init = function(){
        this.button = document.querySelector('[state-button1]')
        this.button.onclick = () => {
            this.currState.buttonWasPressed()
        }
    }
    StateTest1.prototype.setState = function( newState ){
        this.currState = newState
    }
    // 使用
    let stateTest1 = new StateTest1()
    stateTest1.init()

}.call(undefined)