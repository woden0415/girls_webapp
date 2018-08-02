
import axios from 'axios'

import {
  imgList
} from '../config/api'

export default {

  namespace: 'home',

  state: {
    name:'这是home的model',
    arrImgUrls: []
  },

  subscriptions: {

  },

  effects: {
    * fetchImgsUrl({ payload }, { call, put }) {

      const response = yield call(axios.get, imgList, payload);
      yield put({
        type: 'fetchImgsUrlFn',
        payload: response.data.list,
      });
    },
  },

  reducers: {
    fetchImgsUrlFn(state, action) {
      return {
        ...state,
        arrImgUrls: action.payload
      }
    }
  },

};
