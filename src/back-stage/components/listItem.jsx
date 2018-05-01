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
        <div style={styles.modelItem}>
          <div style={styles.modelItemButton}>发布</div>
        </div>
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
    borderRadius: '1rem',
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '2rem',
    backgroundColor: '#fff'
  },
  modelItem: {
    width: '22.5rem',
    height: '20rem',
    borderRadius: '1rem',
    marginTop: '2rem',
    marginLeft: '2rem',
    backgroundColor: '#F0FFFF',
    display: 'flex',
    flexDirection: 'column'
  },
  modelItemTitle: {
    flex: 1,
    height: '10rem',
    fontSize: '4rem',
    color: '#4682B4',
    lineHeight: '10rem',
    textAlign: 'center'
  },
  modelItemButton: {
    flex: 1,
    height: '20rem',
    fontSize: '5rem',
    color: '#CD5555',
    lineHeight: '20rem',
    textAlign: 'center'
  }
};