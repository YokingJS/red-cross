import React from 'react';
import {Link} from 'react-router-dom';

class ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log(this.props.data);
    const data = this.props.data || {};
    const {
      age = '', name = '', currentMoney = '', donatorNum = '', status = '', gmtModify = '', id = ''
    } = data;
    // 救助姓名、已筹金额、捐款人数，项目状态、发布时间
    return (
      <div style={styles.listItem}>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>救助姓名</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{name}</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>救助人年龄</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{age}</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>已筹金额</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{currentMoney}元</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>捐款人数</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{donatorNum}人</span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>项目状态</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>
            {parseInt(status, 10) === 1 ? '进行中' : (parseInt(status, 10) === 2 ? "已结束" : "未开始")}
          </span>
        </div>
        <div style={styles.modelItem}>
          <span style={styles.modelItemTitle}>发布时间</span>
          <span style={{...styles.modelItemTitle, color: '#666', ...styles.textOverflow}}>{(new Date(gmtModify)).toLocaleDateString()}</span>
        </div>
        <Link style={styles.modelItem} to={'/backStage-fill/' + id}>
          <div style={styles.modelItemButton}>编辑</div>
        </Link>
        {parseInt(status, 10) === 2 ? <div style={styles.modelItem}>
          <div style={styles.modelItemButton}>取消发布</div>
        </div> : null}
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