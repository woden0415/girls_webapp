/*
 * @Author: woden0415@163.com
 * @Date: 2018-08-02 20:57:59
 * @Description: 底部栏
 */

import React, { Component } from 'react'
import './navigator.css'
import { connect } from 'dva';
import { setPageIndex } from '../../utils/tools'
import history from '../../utils/history'

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
  }

  /**
   * @description 点击当前底部按钮
   * @param {Number} index 当前点击项的下表
   */
  handleNavItemClick(index) {
    switch (index) {
      case 0:
        this.props.dispatch({
          type: 'app/changeFootIcon',
          payload: {
            index
          }
        })
        history.push('/home')
        setPageIndex(Number.parseInt(Math.random() * 1173, 10), 10, 0)
        setTimeout(() => {
          window.location.reload()
        }, 200);
        break;

      default:
        break;
    }
  }

  render(){
    console.log('Navigator')
    if (this.props.app) {
      let {
        arrNav

      } = this.props.app;

      return (
        <div className = "nav-container">
          <div className="nav-content">
            {
              arrNav.map((navItem, index, arr) => {
                return (
                  <div
                    className={'active nav-item'}
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
export default connect(({ app }) => ({
  app,
}))(Navigator);
