
import React from 'react';
import { List, InputItem, ImagePicker } from 'antd-mobile';
import request from '../components/request';
import ListItem from './components/listItem'

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      baseModel: [],
      bannerFiles: [],
    };
    this.reRender = this.reRender.bind(this);
    this.onBannerChange = this.onBannerChange.bind(this);

  }
  
  reRender() {
    this.setState({
      ...this.state
    });
  }

  onBannerChange(bannerFiles, type, index) {
    this.setState({
      bannerFiles,
    });
  }

  componentWillMount() {
    request.getDeployAppealList().then(res => {
      if (!res.errorMsg) {
        this.state.baseModel = res.data || []
      }
      this.reRender();
    });
  }

  render() {
    const { baseModel = {}, bannerFiles = [] } = this.state || {};
    const MARGINTOP = '10px';
    const TITLEWIDTH = '100px';
    const IMAGEWIDTH = '100px';
    return (
      <div style={styles.page}>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐赠总金额:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>333元</span>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐赠总人数:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>333人</span>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP, height: IMAGEWIDTH}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>banner图片:</span>
          <div style={{...styles.boxWithBorder, height: IMAGEWIDTH, width: IMAGEWIDTH}} className="pickerBox">
            <ImagePicker
              files={bannerFiles}
              onChange={this.onBannerChange}
              selectable={bannerFiles.length < 1}
            />
          </div>
        </div>
        {baseModel.map((item, index) => {
          return (
            <ListItem
              key={index}
              data={item}
            />
          );
        })}
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
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '10px',
    backgroundColor: '#f5f5f5'
  },
  boxWithBorder: {
    marginLeft: '5px',
    height: '40px',
    flex: 1,
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center'
  },
  rowLine: {
    flex: 1,
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 5px',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  largeText: {
    lineHeight: '50px',
    fontSize: '12px',
    color: '#666666'
  }
};