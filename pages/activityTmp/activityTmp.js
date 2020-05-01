Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataFromParent: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPersonal(event){
      console.log("goPersonal");
      var myEventDetail={
        userId:event.currentTarget.dataset.id
      }
      var myEventOption={}
       // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
       this.triggerEvent('parentEvent', myEventDetail, myEventOption)
    }
  }
})