import React from 'react'
import './index.less'
import { getGoods } from './request' 
class Index extends React.Component {
  componentDidMount () {
    getGoods().then(res => {
      console.log('data', res.data)
    }).catch(err => {
      console.error('error ---> ', err )
    })
  }

  render () {
    return(
      <div className="index">
        <header className="header">我是头部自适应</header>
        <content className="content">我是内容部分</content>
        <button onClick={() => this.close()}>点击关闭</button>
      </div>
    )
  }
}

export default Index
