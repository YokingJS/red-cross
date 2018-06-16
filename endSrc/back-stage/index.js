
import React from 'react';
import {Link} from 'react-router-dom';
import { ImagePicker, Modal, Toast } from 'antd-mobile';

import request from '../components/request';
import ListItem from './components/listItem'

const ALERT = Modal.alert;
const MARGINTOP = '10px';
const TITLEWIDTH = '100px';
const IMAGEWIDTH = '100px';

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      weakerBaseModel: [],
      donorBaseModel: [],
      bannerFiles: [],
      totalMoney: 0,
      totalDonator: 0,
      bannerList: []
    };
    this.reRender = this.reRender.bind(this);
    this.onBannerChange = this.onBannerChange.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.renderBannerList = this.renderBannerList.bind(this);
    this.onDeleteWeaker = this.onDeleteWeaker.bind(this);
    this.onSetTop = this.onSetTop.bind(this);
  }
  
  reRender() {
    this.setState({
      ...this.state
    });
  }

  componentWillMount() {
    request.getDrftAppealList().then(res => {
      if (!res.errorMsg) {
        this.state.weakerBaseModel = res.data || []
      }
      this.reRender();
    });

    request.getDonateOrderList().then(res => {
      if (!res.errorMsg) {
        this.state.donorBaseModel = res.data || []
      }
      this.reRender();
    });

    request.getTotalStatisticsData().then(res => {
      if (!res.errorMsg) {
        this.state.totalDonator = (res.data || []).totalDonator || 0;
        this.state.totalMoney = (res.data || []).totalMoney || 0;
        this.state.bannerList = (res.data || []).bannerList || [];
      }
      this.reRender();
    });

  }

  deleteBanner(index) {
    return () => {
      let bannerList = this.state.bannerList
      if (bannerList[index] && bannerList[index].id) request.deleteBannerImageById('?id=' + bannerList[index].id).then(resS => {
        if (!resS.errorMsg) {
          bannerList.splice(index, 1);
          this.setState({
            bannerList: bannerList
          });
        } else {
          Toast.fail(resS.errorMsg, 1.5);
        }
      }, resE => {
        Toast.fail('删除失败,稍后再试', 1.5);
      });
    };
  }

  onBannerChange(bannerFiles, type, index) {
    this.setState({
      bannerFiles,
    });
    let imageData = (bannerFiles[0] || {}).url;
    if (imageData) {
      request.insertBannerImage({
        imageData: imageData
      }).then(resS => {
        if (resS.errorMsg) {
          Toast.fail('上传失败，请重试', 1.5);
        } else {
          window.location.href = window.location.href;
        }
      });
    }
  }

  onDeleteWeaker(id, index) {
    const alertInstance = ALERT('确认提醒', '你确认要删除吗？？？', [
      { text: '取消', onPress: () => {}, style: 'default' },
      { 
        text: '确认',
        onPress: () => {
          request.deleteAppealRecordById('?id=' + id).then(resS => {
            if(!resS.errorMsg) {
              const { weakerBaseModel = [] } = this.state || {};
              weakerBaseModel.splice(index, 1);
              this.setState({
                weakerBaseModel: weakerBaseModel
              });
            } else {
              Toast.fail(resS.errorMsg, 1.5);
            }
          }, resE => {
            Toast.fail('删除失败，请稍后再试', 1.5);
          });
       }
      },
    ]);
  }

  onSetTop(id, index, isTop) {
    if (isTop) {
      request.unsetAppealRecordTop('?id=' + id).then(resS => {
        if(!resS.errorMsg) {
          const { weakerBaseModel = [] } = this.state || {};
          let targetItem = weakerBaseModel[index];
          targetItem.top = false;
          weakerBaseModel.splice(index, 1);
          weakerBaseModel.push(targetItem);
          this.setState({
            weakerBaseModel: weakerBaseModel
          });
        } else {
          Toast.fail(resS.errorMsg, 1.5);
        }
      }, resE => {
        Toast.fail('取消失败，请稍后再试', 1.5);
      });
    } else {
      request.setAppealRecordTop('?id=' + id).then(resS => {
        if(!resS.errorMsg) {
          const { weakerBaseModel = [] } = this.state || {};
          let targetItem = weakerBaseModel[index];
          targetItem.top = true;
          weakerBaseModel.splice(index, 1);
          weakerBaseModel.unshift(targetItem);
          this.setState({
            weakerBaseModel: weakerBaseModel
          });
        } else {
          Toast.fail(resS.errorMsg, 1.5);
        }
      }, resE => {
        Toast.fail('置顶失败，请稍后再试', 1.5);
      });
    }
  }

  onDownload() {
    const XLSX = require('xlsx');
    let json = this.state.donorBaseModel || [];
    json.map((item, index) => {
      if (item.money) {
        json[index].money = item.money / 100;
      }
      if (item.gmtCreate) {
        json[index].gmtCreate = (new Date(item.gmtCreate)).toLocaleDateString();
      }
      if (item.gmtModify) {
        json[index].gmtModify = (new Date(item.gmtModify)).toLocaleDateString();
      }
      if (item.isDisclosure || item.isDisclosure === 0 || item.isDisclosure === '0') {
        json[index].isDisclosure = item.isDisclosure === 1 || item.isDisclosure === '1' ? '公开' : '不公开';
      }
      if (item.donateType || item.donateType === 0 || item.donateType === '0') {
        json[index].donateType = item.donateType === 1 || item.donateType === '1' ? '个人' : '公司';
      }
      if (item.isPaySuccess || item.isPaySuccess === 0 || item.isPaySuccess === '0') {
        json[index].isPaySuccess = item.isPaySuccess === 1 || item.isPaySuccess === '1' ? '成功' : '失败';
      }
      if (item.isNeedInvoice || item.isNeedInvoice === 0 || item.isNeedInvoice === '0') {
        json[index].isNeedInvoice = item.isNeedInvoice === 1 || item.isNeedInvoice === '1' ? '要' : '不要';
      }
    });
    let titleLine = {
      id: 'ID',
      name: '姓名',
      appealRecordId: '捐助项目ID',
      weixinPayId: '账单号',  
      appealRecordTitle: '捐助项目',
      money: '金额',
      mobile: '电话',
      donateTime: '初始时间',
      donateType: '公司/个人',
      isNeedInvoice: '索要发票',
      invoiceHeader: '发票抬头',
      invoiceName: '发票名',
      invoiceMobile: '发票电话',
      invoiceAddress: '发票地址',
      remark: '备注',
      isDisclosure: '是否公开',
      isPaySuccess: '成功支付',
      openId: 'openId',
      spbillCreateIp: '用户IP',
      gmtCreate: '数据创建',
      gmtModify: '捐助时间'
    };
    let keyMap = [] // 获取键
    for (let k in json[0]) {
      keyMap.push(k);
    }
    if (json[0].id !== 'ID' && json[0].mobile !== '电话') json.unshift(titleLine);
    let tmpdata = [] // 用来保存转换好的json

    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。  
    let getCharCol = (n) => {  
      let temCol = '',  
          s = '',  
          m = 0  
      while(n > 0) {  
          m = n % 26 + 1  
          s = String.fromCharCode(m + 64) + s  
          n = (n - m) / 26  
      }
      return s;
    }  

    json.map((v, i) => {
      return keyMap.map((k, j) => Object.assign({}, {
        v: (k === 'donateTime' || k === 'gmtCreate' || k === 'gmtModify') && v[k] ? v[k] : v[k],
        // i + 2 : 从2开始，第一行留给标题。所以数据都向下移动一行
        position: (j > 24 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }));
    }).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
      tmpdata[v.position] = {
        v: v.v
      }
    });

    let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
    let tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, // 内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
          })
      }
    }
    let s2ab = (s) => { //字符串转字符流  
      var buf = new ArrayBuffer(s.length);  
      var view = new Uint8Array(buf);  
      for(var i = 0; i != s.length; ++i) {  
          view[i] = s.charCodeAt(i) & 0xFF;  
      }  
      return buf;  
    } 
    let tmpDown = new Blob([
      s2ab(XLSX.write(
        tmpWB,
        {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        } // 这里的数据是用来定义导出的格式类型
      ))
    ], {
      type: ''
    });  // 创建二进制对象写入转换好的字节流

    let href = URL.createObjectURL(tmpDown); //创建对象超链接  
    document.getElementById("hf").href = href; //绑定a标签  
    document.getElementById("hf").click(); //模拟点击实现下载  
    setTimeout(function() { //延时释放  
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL  
    }, 100); 
  }

  renderBannerList() {
    const {
      bannerList = []
    } = this.state || {};
    return (
      <div style={{...styles.rowLine, marginTop: MARGINTOP, height: IMAGEWIDTH}}>
        <span style={{...styles.largeText, color: 'transparent'}}>*</span>
        <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>删除banner:</span>
        <div style={{...styles.boxWithBorder, height: IMAGEWIDTH, flexDirection: 'row'}} className="pickerBox">
          {bannerList.map((item, index) => {
            const { imageUrl = ''} = item;
            return <div style={{...styles.deleteImage, marginLeft: index === 0 ? '0' : '10px'}}>
              {imageUrl ? <img src={imageUrl} style={styles.deleteImage}/> : null}
              <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAsCAMAAAAUyMtVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcZmZmZiYmJiYmJubm5iYmJqampiYmJiYmJeXl5mZmZiYmJeXl5mZmZ6enp+fn5eXl5iYmJiYmJiYmKqqqqqqqpiYmJqampmZmZmZmZeXl6gE920AAAAadFJOUwBV9P4zhib8V+54r1YPIgjlVPmhCQPJWDeEA4yj+wAAAMVJREFUSMft1NsOgjAQRdEBhVYQwbvO/3+oMm0VsJdTX5WnkqxNAiSH6Itr10Gsr8/mcOSyAPx64MtJns/MSqf95un246krkUI83+RcqHRh/N3eaSm2SV+97lPF0rtCwz5e+Hys8PtwEfKhIuz9Rcz7irj/LFJ+WaT9vED8tMD8u0C9KxrY22KFe1tkeKJGnt/C3rwvsgwzDxfGtwot3PfXKmOv5PtgxfT/anivKmhLwnul/3v1o3vVD/BeHerxWGfs1ZXoAYfgJMTOIOBgAAAAAElFTkSuQmCC'
                style={styles.deleteButton}
                onClick={this.deleteBanner(index)}
                />
            </div>;
          })}
        </div>
      </div>
    );
  }
  render() {
    const {
      weakerBaseModel = [], donorBaseModel = [], bannerFiles = [], totalDonator = 0, totalMoney = 0
    } = this.state || {};
    return (
      <div style={styles.page}>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐赠总金额:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>{totalMoney / 100}元</span>
        </div>
        <div style={{...styles.rowLine, marginTop: MARGINTOP}}>
          <span style={{...styles.largeText, color: 'transparent'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>捐赠总人数:</span>
          <span style={{...styles.largeText, ...styles.boxWithBorder, ...styles.textOverflow}}>{totalDonator}人</span>
        </div>
        {this.renderBannerList()}
        <div style={{...styles.rowLine, marginTop: MARGINTOP, height: IMAGEWIDTH}}>
          <span style={{...styles.largeText, color: '#ff3322'}}>*</span>
          <span style={{...styles.largeText, width: TITLEWIDTH, textAlign: 'right'}}>上传banner图片:</span>
          <div style={{...styles.boxWithBorder, height: IMAGEWIDTH, width: IMAGEWIDTH}} className="pickerBox">
            <ImagePicker
              files={bannerFiles}
              onChange={this.onBannerChange}
              selectable={bannerFiles.length < 1}
            />
          </div>
        </div>
        <div style={{lineHeight: '70px', fontSize: '20px', color: '#333333', textAlign: 'left', marginTop: '10px'}}>救助信息列表</div>
        <Link  to={'/backStage-fill'} style={styles.addNewWeaker}>新增救助信息</Link>
        {weakerBaseModel.map((item, index) => {
          return (
            <ListItem
              key={index + 'weaker'}
              data={item}
              isWeaker={true}
              index={index}
              onDeleteWeaker={this.onDeleteWeaker}
              onSetTop={this.onSetTop}
            />
          );
        })}
        {donorBaseModel.length > 0 ? <div style={{lineHeight: '70px', fontSize: '20px', color: '#333333', textAlign: 'left', marginTop: '10px'}}>捐助信息列表</div> : null}
        {donorBaseModel.map((item, index) => {
          return (
            <ListItem
              key={index + 'dornor'}
              data={item}
              index={index}
              isWeaker={false}
            />
          );
        })}
        {donorBaseModel.length > 0 ? <div style={styles.downloadButton} onClick={this.onDownload}>导出捐助信息</div> : null}
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
  },
  addNewWeaker: {
    width: '150px',
    lineHeight: '30px',
    fontSize: '12px',
    color: '#fff',
    textAlign: 'left',
    marginLeft: '30px',
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: '#ff3323'
  },
  downloadButton: {
    width: '200px',
    lineHeight: '60px',
    fontSize: '16px',
    color: '#fff',
    textAlign: 'left',
    marginTop: '10px',
    marginLeft: '50%',
    transform: 'translate(-50%)',
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: '#ff3323'
  },
  deleteImage: {
    width: '108px',
    height: '50px',
    backgroundColor: '#eee',
    borderRadius: '10px',
    position: 'relative'
  },
  deleteButton: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    padding: '4px',
    borderRadius: '8px',
    right: '5px',
    top: '5px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 2
  }
};