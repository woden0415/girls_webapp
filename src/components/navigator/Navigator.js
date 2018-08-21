/*
 * @Author: woden0415@163.com
 * @Date: 2018-08-02 20:57:59
 * @Description: 底部栏
 */

import React, { Component } from 'react'
import './navigator.css'
import { connect } from 'dva';

class Navigator extends Component {
  constructor(props){
    super(props);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.home && nextProps.home) {
      if (JSON.stringify(this.props.home.arrNav) === JSON.stringify(nextProps.home.arrNav)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
    // return true
  }

  /**
   * @description 点击当前底部按钮
   * @param {Number} index 当前点击项的下表
   */
  handleNavItemClick(index){
    switch (index) {
      case 0:
        // @TODO 切换当前刷新状态
        this.props.dispatch({
          type: 'home/changeFootIcon',
          payload: {
            index
          }
        })

        // 通过dispatch请求新的数据
        let that = this;
        setTimeout(()=>{
          that.props.dispatch({
            type: 'home/fetchImgsUrl',
            payload: {
              params: {
                pageNo: Number.parseInt(Math.random() * 112, 10),
                pageSize: 10
              }
            }
          });
        }, 500)


        break;

      default:
        break;
    }
  }

  render(){
    console.log('Navigator')
    if (this.props.home) {
      let {
        arrNav,
        activeTab
      } = this.props.home;

      return (
        <div className = "nav-container">
          <div className="nav-content">
            {
              arrNav.map((navItem, index, arr) => {
                return (
                  <div
                    className={`${activeTab === index ? 'active': ''} nav-item`}
                    key={index}
                    onClick={()=>{this.handleNavItemClick(index)}}>
                    {
                      navItem.icon ? <span className="iconfont icon-shuaxin icon-loading"></span> : <span>{navItem.name}</span>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

// export default Navigator
export default connect(({ home }) => ({
  home,
}))(Navigator);
