
import axios from 'axios'

import {
  imgList
} from '../config/api'

export default {

  namespace: 'home',

  state: {
    name:'这是home的model',
    arrImgUrls: [],
    arrNav: [
      { icon: false, name: '首页', },
      { icon: false, name: '关注' },
      { icon: false, name: '消息' },
      { icon: false, name: '我' }
    ],
    activeTab: 0
  },

  subscriptions: {

  },

  effects: {
    // 获取图片数据
    * fetchImgsUrl({ payload }, { call, put }) {
      const response = yield call(axios.get, imgList, payload);
      yield put({
        type: 'fetchImgsUrlFn',
        payload: response.data.list,
      });
      yield put({
        type: 'changeFootIconFn',
        payload: undefined
      })

    },

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
    // 获取图片数据
    fetchImgsUrlFn(state, action) {
      return {
        ...state,
        arrImgUrls: action.payload
      }
    },

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
    }
  },

};
