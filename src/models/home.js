
import axios from 'axios'

import {
  imgList,
  imgUrl
} from '../config/api'

// 启用反防盗链技术
let isPreventImgUrl = true;

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
      let arrTmp = []
      if (isPreventImgUrl) {
        arrTmp = action.payload.map((imgUrlItem, index, arr) => {
          return `${imgUrl}?url=${imgUrlItem.coverUrl}`;
        })
      } else {
        arrTmp = action.payload;
      }
      return {
        ...state,
        arrImgUrls: arrTmp
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
