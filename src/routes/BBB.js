import React, { Component } from 'react'
import { connect } from "dva";
import { Link } from "dva/router";

class BBB extends Component {
  render(){
    console.log(this.props)
    return (
      <div>
        <p>
          BBB
        </p>
        <Link  to={'/aaa'} >去AAA页面</Link>
        <br/>
        <Link  to={'/ccc'} >去CCC页面</Link>
      </div>
    )
  }
}
/* export default BBB; */

export default connect(({ app }) => ({
  app,
}))(BBB);
