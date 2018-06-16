import React from 'react';
import {Link} from 'react-router-dom';
import request from '../../components/request';
import { Toast } from 'antd-mobile';

class ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cancelDeploy = this.cancelDeploy.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onSetTop = this.onSetTop.bind(this);
  }

  cancelDeploy() {
    const data = this.props.data || {};
    const {
      id = ''
    } = data;
    request.undeployAppealRecord('?id=' + id).then(res => {
      if (!res.errorMsg) {
        Toast.success('取消成功~', 1.5);
      }
      window.location.href = window.location.href;
    });
  }

  onDeleteItem() {
    const data = this.props.data || {};
    const index = this.props.index;
    const isWeaker = this.props.isWeaker || false;
    const onDeleteWeaker = this.props.onDeleteWeaker;
    const {
      id = ''
    } = data;
    if (id && onDeleteWeaker) {
      onDeleteWeaker && onDeleteWeaker(id, index);
    }
  }

  onSetTop() {
    const data = this.props.data || {};
    const index = this.props.index;
    const isWeaker = this.props.isWeaker || false;
    const onSetTop = this.props.onSetTop;
    const {
      id = '', top = false
    } = data;
    if (id && onSetTop) {
      onSetTop && onSetTop(id, index, top);
    }
  }

  render() {
    const data = this.props.data || {};
    const isWeaker = this.props.isWeaker || false;
    const itemIndex = this.props.index || 0;
    const {
      age = '', name = '', currentMoney = '', donatorNum = '', status = '', gmtModify = '', id = '', mobile = '',
      money = '', donateTime = '', isNeedInvoice = '', weixinPayId = '', appealRecordTitle = '', remark = '', top = false
    } = data;
    // 救助姓名、已筹金额、捐款人数，项目状态、发布时间
    return (
      <div style={styles.listItem}>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>序号</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{parseInt(itemIndex, 10) + 1}</span>
        </div>
        {isWeaker ? null : [
          <div style={styles.modelItem} key={1}>
            <span style={styles.modelItemTitle}>用户id</span>
            <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{id}</span>
          </div>,
          <div style={styles.modelItem} key={2}>
            <span style={styles.modelItemTitle}>微信订单</span>
            <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{weixinPayId}</span>
          </div>,
          <div style={styles.modelItem} key={3}>
            <span style={styles.modelItemTitle}>捐助项目</span>
            <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{appealRecordTitle}</span>
          </div>
        ]}
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '救助人姓名' : '姓名/公司'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{name}</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '救助人年龄' : '捐助人电话'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{isWeaker ? age : mobile}</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '已筹金额' : '捐助金额'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{isWeaker ? currentMoney / 100 : money / 100}元</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '捐款人数' : '捐助时间'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>
            {isWeaker ? donatorNum + '人' : (new Date(gmtModify)).toLocaleDateString()}
          </span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '项目状态' : '需要发票'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>
            {isWeaker ? parseInt(status, 10) === 1 ? '进行中' : (parseInt(status, 10) === 2 ? "已结束" : "未开始") : (isNeedInvoice ? '是' : '否')}
          </span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>{isWeaker ? '发布时间' : '备注信息'}</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>
            {isWeaker ? (new Date(gmtModify)).toLocaleDateString() : remark}
          </span>
        </div>
        {isWeaker ? <div style={{...styles.modelItem, ...styles.buttonBox}}>
          <div style={styles.modelItemButton} onClick={this.onSetTop}>{top ? '取消置顶' : '置顶'}</div>
        </div> : null}
        {
          isWeaker ? <Link style={{...styles.modelItem, ...styles.buttonBox}} to={'/backStage-fill/' + id}>
            <div style={styles.modelItemButton}>编辑</div>
          </Link> : null
        }
        {parseInt(status, 10) !== 1 || !isWeaker ? null : <div style={{...styles.modelItem, ...styles.buttonBox}}>
          <div style={styles.modelItemButton} onClick={this.cancelDeploy}>取消发布</div>
        </div>}
        {isWeaker ? <div style={{...styles.modelItem, ...styles.buttonBox}}>
          <div style={styles.modelItemButton} onClick={this.onDeleteItem}>删除</div>
        </div> : null}
      </div>
    );
  }
}

export default ListItem;

const LINEHEIGHT = '36px';
const HALFHEIGHT = '18px';

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  listItem: {
    width: '100%',
    borderRadius: '5px',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingBottom: '5px',
    backgroundColor: '#fff'
  },
  modelItem: {
    width: '100px',
    height: LINEHEIGHT,
    borderRadius: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    backgroundColor: '#F0FFFF',
    display: 'flex',
    flexDirection: 'column'
  },
  modelItemTitle: {
    flex: 1,
    height: HALFHEIGHT,
    fontSize: '12px',
    color: '#4682B4',
    lineHeight: '20px',
    textAlign: 'center'
  },
  modelItemButton: {
    flex: 1,
    height: '26px',
    fontSize: '14px',
    fontWeight: 300,
    color: '#fff',
    lineHeight: '26px',
    textAlign: 'center'
  },
  buttonBox: {
    width: '70px',
    height: '26px',
    backgroundColor: '#EE2C2C'
  }
};