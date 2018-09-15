/*
* @Author: woden0415@163.com
* @Date: 2018-08-26 14:25:36
* @Description:
*/

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import Hammer from 'hammerjs';

import ImgLazyLoad from '../../utils/imgLazyLoad';
import "./Album.css";

class Album extends PureComponent {
  constructor() {
    super();
    this.state={

    };
    this.handleGoList = this.handleGoList.bind(this);
  }

  componentDidMount() {
    let albumId = this.props.match.params.albumid;
    console.log('albumId', albumId)
    this.props.dispatch({
      type: 'album/fetchAlbumList',
      payload: {
        albumId
      }
    })
  }

  componentDidUpdate() {
    let imgLazyLoad = new ImgLazyLoad(); // 添加懒加载
    imgLazyLoad.monitorScroll();

    let domBtnGoBack = document.querySelector('.iconfont.icon-fanhui1');
    if (domBtnGoBack) {
      let hammerBack = new Hammer(domBtnGoBack);
      hammerBack.on('tap', (e) => {
        this.props.history.push(`/home`, {some: {
          albumId: this.props.match.params.albumid
        }})
      })
    }
  }


  handleGoList(index) {
    let albumid = this.props.match.params.albumid;
    this.props.history.push(`/album/list/${albumid}/${index}`)
  }

  render(){
    let objAlbumInfo = this.props.objAlbumInfo;
    if (objAlbumInfo.imgLists.length > 0) {
      return (
        <div className="album-box">
          <div className="album-header">
            <span className="iconfont icon-fanhui1 js-goback" ref="btngoback"></span>
            <div className="album-cover img-bg" data-src={`/imgApi/imgUrl/url?url=${objAlbumInfo.coverUrl}`}></div>
            <h1 className="album-title" data-id={objAlbumInfo.id}>{objAlbumInfo.title}</h1>
            <p className="album-desc">{objAlbumInfo.albumDesc}</p>
          </div>
          <ul className="album-imgList-ul">
            {objAlbumInfo.imgLists.map((item, index, arr) => {
              return (
                <li
                  className="album-imgList-li img-bg"
                  key={index}
                  data-src={item}
                  onClick={(e) => {
                    this.handleGoList(index)
                  }}>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <h1>没有相关数据</h1>
    }
  }
}

export default connect(({ album }) => ({
  objAlbumInfo: album.objAlbumInfo
}))(Album);