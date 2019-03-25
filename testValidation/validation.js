window.FormValid = function(){
  var _en = {
    "Empty": "This value is required",
    "Email_Error": "Email not vaild",
    "Phone_Error": "Phone not valid",
    "Equal_Error": "The passwords entered are not the same",
    "Greater_Error": "There is no interval"
  }
  var _cn = {
    "Empty": "请填写",
    "Email_Error": "邮件输入格式有误",
    "Phone_Error": "手机号输入格式有误",
    "Equal_Error": "两次输入的密码不一致",
    "Greater_Error": "区间不存在"
  }
  let _rule = {  /*需要匹配的规则的集合*/
    "required": {
      reg: /^[\s\S]*.*[^\s][\s\S]*$/ /*{
        test: function(value){
          if(value === undefined || value.toString().trim() === ""){ return false; }
          return true;
        }}*/,
      text: "Empty"
    },
    "email": {
      reg: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      text: "Email_Error"
    },
    "phone": {
      reg: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,
      text: "Phone_Error"
    },
    "equal": {
      text: "Equal_Error"
    },
    "greater": {
      text: "Greater_Error"
    }
  };
  function singleValid(ele, condition, errMsgMap){ /*输入DOM元素和需要匹配的条件，匹配成功返回true失败返回false并更新errMsgMap对象*/
    let flag = true;
    if(!_rule[condition]["reg"].test($(ele).val())){
      errMsgMap[$(ele).attr("name")] = _rule[condition]["text"];   //这里map的key为input的name，value为_rule里边的text
      flag = false;
    }
    return flag;
  }

  /* 输入元素标志，比如"#myForm",或者"form[name='myForm']". 
  ** 在需要验证的input框里边加自定义属性reg-key,值为需要进行验证的条件，比如required、phone、email等，按验证顺序排列，中间用空格隔开。
  ** 如果需要验证某个input值等于另一个input的值，请加上自定义属性reg-equal,值为需要比较的那个input的name，比如reg-equal="password"。
  ** 如果需要验证某个input值大于等于另一个input的值，请加上自定义属性reg-greater,值为需要比较的那个input的name，比如reg-greater="startTime"。
  ** 返回的是包含错误信息的数组，可以使用show方法进行错误信息的展示。
  */
  var _validation = function(form){  
    let inputArr = Array.prototype.slice.call($(form+" input[reg-key]"));  //需要验证的input数组
    let $beEqual = $(form+" input[reg-equal]") || ""; 
    let $greaterThan = $(form+" input[reg-greater]") || ""; 
    let errMsgMap = {};  
    inputArr.forEach(function(ele){   /*遍历需要验证的input框*/
      let regKey = $(ele).attr("reg-key").split(" ");  //得到需要满足的regular数组
      let can = true;  
      regKey.forEach(function(condition){
        if(can){
          if(!singleValid(ele, condition, errMsgMap)){ can = false; }
        }
      })
    })
    if($beEqual.length !== 0 && !errMsgMap[$beEqual.attr("name")]){
      let $equalName = $(`${form} [name=${$beEqual.attr("reg-equal")}]`);
      if($beEqual.val().trim() !== $equalName.val().trim()){
        errMsgMap[$beEqual.attr("name")] = _rule["equal"]["text"];
      }
    }
    if($greaterThan.length !== 0 && !errMsgMap[$greaterThan.attr("name")]){
      let $greaterName = $(`${form} [name=${$greaterThan.attr("reg-greater")}]`);
      if(Number($greaterThan.val().trim()) < Number($greaterName.val().trim())){
        errMsgMap[$greaterThan.attr("name")] = _rule["greater"]["text"];
      }
    }
    return errMsgMap;
  }
  
  /* 错误信息的展示。form为验证的元素的标志，errMsgMap为错误信息的对象，language为需要展示的语言类型 0 -> en, 1 -> cn
  ** 用于将错误信息展示在页面上。在有错误的input框的父级元素后边追加一个span，类名为form-error-message
  */
  var _show = function(form, errMsgMap, language){ 
    var lan = _en;
    switch (language || "") {
      case "1": case 1: lan = _cn; break;
    }
    $(form+" input[reg-key]").on("click", function(){  /*聚焦的时候移除提示信息*/
      let _this = this;
      $(_this).parent(".form-error-input-wrap").replaceWith(_this);
      $(_this).focus();
    })
    for(var key in errMsgMap){
      let $ele = $(form).find("[name="+key+"]");
      if($ele.parent().children(".form-error-message").length<=0){ 
        $ele.wrap("<div class='form-error-input-wrap'></div>");
        $ele.parent().append("<span class='form-error-message'>"+lan[errMsgMap[key]]+"</span>");
      }
    }
  }
  
  /* 传入语言对象 */
  var _setLanguage = function (en, cn) { 
    if(!$.isEmptyObject(en)){
      for(var key in en){
        _en[key] = en[key]
      }
    }
    if(!$.isEmptyObject(cn)){
      for(var key in cn){
        _cn[key] = cn[key]
      }
    }
  }

  
  return {
    show: _show,
    validation: _validation,
    setLanguage: _setLanguage
  }
}();