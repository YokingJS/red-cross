import React from 'react';
import {Link} from 'react-router-dom';
import request from '../../components/request';

class ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cancelDeploy = this.cancelDeploy.bind(this);
  }

  cancelDeploy() {
    const data = this.props.data || {};
    const {
      id = ''
    } = data;
    request.undeployAppealRecord('?id=' + id).then(res => {
      if (!res.errorMsg) {
        alert('取消成功');
      }
      window.location.href = window.location.href;
    });
  }

  render() {
    const data = this.props.data || {};
    const isWeaker = this.props.isWeaker || false;
    const {
      age = '', name = '', currentMoney = '', donatorNum = '', status = '', gmtModify = '', id = '', mobile = '',
      money = '', donateTime = '', isNeedInvoice = '', weixinPayId = '', appealRecordTitle = '', remark = ''
    } = data;
    // 救助姓名、已筹金额、捐款人数，项目状态、发布时间
    return (
      <div style={styles.listItem}>
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
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{isWeaker ? currentMoney : money / 100}元</span>
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
        {
          isWeaker ? <Link style={styles.modelItem} to={'/backStage-fill/' + id}>
            <div style={styles.modelItemButton}>编辑</div>
          </Link> : null
        }
        {parseInt(status, 10) !== 1 || !isWeaker ? null : <div style={styles.modelItem}>
          <div style={styles.modelItemButton} onClick={this.cancelDeploy}>取消发布</div>
        </div>}
      </div>
    );
  }
}

export default ListItem;

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
    paddingBottom: '5px',
    backgroundColor: '#fff'
  },
  modelItem: {
    width: '120px',
    height: '40px',
    borderRadius: '5px',
    marginTop: '5px',
    marginLeft: '5px',
    backgroundColor: '#F0FFFF',
    display: 'flex',
    flexDirection: 'column'
  },
  modelItemTitle: {
    flex: 1,
    height: '20px',
    fontSize: '12px',
    color: '#4682B4',
    lineHeight: '20px',
    textAlign: 'center'
  },
  modelItemButton: {
    flex: 1,
    height: '40px',
    fontSize: '20px',
    color: '#CD5555',
    lineHeight: '40px',
    textAlign: 'center'
  }
};