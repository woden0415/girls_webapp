export default {

  namespace: 'app',

  state: {
    name:'这是app的model',
    arrNav: [
      { icon: false, name: '首页', },
      { icon: false, name: '关注' },
      { icon: false, name: '消息' },
      { icon: false, name: '我' }
    ],
  },

  subscriptions: {

  },

  effects: {
    // 改变按钮刷新状态
    * changeFootIcon({ payload }, {call, put}) {
      let { index } = payload;
      yield put({
        type: 'changeFootIconFn',
        payload: index,
      })
    }
  },

  reducers: {
    // 改变按钮刷新状态
    changeFootIconFn(state, action){
      let { arrNav } = state;
      let arrTmp = JSON.parse(JSON.stringify(arrNav));
      if (action.payload !== undefined) {
        for (let i = 0; i < arrTmp.length; i++) {
          if ( i === action.payload ) {
            arrTmp[i].icon = true
          }
        }
      } else {
        for (let i = 0; i < arrTmp.length; i++) {
          arrTmp[i].icon = false
        }
      }
      return {
        ...state,
        arrNav: arrTmp
      }
    },
  }

};
