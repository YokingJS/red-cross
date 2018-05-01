
import React from 'react';
import { List, InputItem, ImagePicker } from 'antd-mobile';
import request from '../components/request';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bannerFiles: [],
      donorFiles: []
    };
    this.renderButton = this.renderButton.bind(this);
    this.onBannerChange = this.onBannerChange.bind(this);
  }

  onBannerChange(bannerFiles, type, index) {
    this.setState({
      bannerFiles,
    });
  }

  renderButton() {
    return (
      <div style={styles.fixedButton}>
        <div style={styles.helpButton} onClick={this.onSubmit}>爱心提交</div>
      </div>
    );
  }
  
  render() {
    const { bannerFiles = [], donorFiles = [] } = this.state || {};
    return (
      <div style={styles.fillInfo}>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐赠总金额:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>333元</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐赠总人数:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>333人</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem', height: '20rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>banner图片:</span>
          <div style={{...styles.boxWithBorder, height: '20rem', width: '20rem'}} className="pickerBox">
            <ImagePicker
              files={bannerFiles}
              onChange={this.onBannerChange}
              selectable={bannerFiles.length < 1}
            />
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>标题:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>求助信息:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem', height: '20rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>求助图片:</span>
          <div style={{...styles.boxWithBorder, height: '20rem', width: '20rem'}} className="pickerBox">
            <ImagePicker
              files={donorFiles}
              onChange={this.onImageChange}
              selectable={donorFiles.length < 1}
            />
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>求助视频:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请正确填写url，否则链接无法访问"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>救助人姓名:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>救助人性别:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="男/女"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>联系电话:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请输入手机号"
              type="phone"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>救助人年龄:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="number"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>已筹金额:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="money"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>捐款人数:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              type="number"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>项目状态:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="输入0~2;0未开始;1进行中;2已结束"
              type="number"
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>发布单位:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder=""
            ></InputItem>
          </div>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>发布时间:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>自动获取发布点击时的时间</span>
        </div>
        <div style={{...styles.rowLine, marginTop: '3.5rem'}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: '28rem', textAlign: 'right'}}>项目跟进:</span>
          <div style={styles.boxWithBorder} className="pickerBox">
            <InputItem
              clear
              placeholder="请正确填写url，否则跟进链接无法访问"
            ></InputItem>
          </div>
        </div>
        {this.renderButton()}
        <div style={{height: '19rem'}}/>
      </div>
    );
  }
}

export default Page;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  fillInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  rowLine: {
    flex: 1,
    height: '10rem',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 4rem',
    alignItems: 'center'
  },
  boxWithBorder: {
    marginLeft: '2rem',
    border: '1px solid #999999',
    borderRadius: '1rem',
    height: '10rem',
    flex: 1,
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center'
  },
  largeText: {
    lineHeight: '5rem',
    fontSize: '4.8rem',
    color: '#666666'
  }
};