/*
 * @Author: woden0415@163.com
 * @Date: 2018-08-26 13:59:06
 * @Description: 专辑首页
 */


import axios from 'axios'

import {
  albumInfo,
  imgUrl
} from '../config/api'

let isPreventImgUrl = true;


export default {

  namespace: 'album',

  state: {
    name:'这是album的model',
    objAlbumInfo: {
      id: '',
      title: '',
      desc: '',
      coverUrl: '',
      imgLists: []
    }
  },

  subscriptions: {

  },

  effects: {
    // 获取图片数据
    * fetchAlbumList({ payload }, { call, put }) {
      const response = yield call(axios.get, albumInfo, {params: payload});

      if(isPreventImgUrl) {
        let arrTmp = response.data.imgLists.map((imgUrlItem, index, arr) => {
          imgUrlItem = `${imgUrl}?url=${imgUrlItem}`;
          return imgUrlItem;
        })
        response.data.imgLists = arrTmp;
      }

      yield put({
        type: 'fetchAlbumListFn',
        payload: response.data
      });
    },
  },

  reducers: {
    fetchAlbumListFn(state, action) {
      let newState = {...state};
      newState.objAlbumInfo = action.payload
      return {
        ...state,
        ...newState
      }
    }
  }

};
