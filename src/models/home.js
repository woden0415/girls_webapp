
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
    arrImgUrls: []
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
    },
  },

  reducers: {
    // 获取图片数据
    fetchImgsUrlFn(state, action) {
      let arrTmp = []
      if (isPreventImgUrl) {
        arrTmp = action.payload.map((imgUrlItem, index, arr) => {
          imgUrlItem.coverUrl = `${imgUrl}?url=${imgUrlItem.coverUrl}`
          return imgUrlItem;
        })
      } else {
        arrTmp = action.payload;
      }
      return {
        ...state,
        arrImgUrls: arrTmp
      }
    },
  },

};
