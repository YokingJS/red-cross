
import React from 'react';
import {Link} from 'react-router-dom';

class DonorItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      donorItem: this.props.data || {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      donorItem: nextProps.data || {}
    });
  }

  render() {
    const { donorItem = {} } = this.state || {};
    const {
      age = '', familyDesc = '', currentMoney = '', deployDepartment = '', disease = '', donatorNum = '',
      id = '', imageUrl = '', name = '', sex = '', status = '', targetMoney = '', title = '', gmtModify = ''
    } = donorItem;
    let newFamilyDesc = familyDesc.replace(/<\/br>/g, '');
    return (
      <Link style={styles.donorItem} to={parseInt(status, 10) === 2 ? '' : '/donateDetail/' + id}>
        <div style={styles.redCrossInfo}>
          <img
            src="https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png"
            alt=""
            style={styles.redCrossLogo}
          />
          <span style={{...styles.redCrossName, ...styles.textOverflow}}>{deployDepartment}</span>
          <span style={{
            ...styles.redCrossName,
            ...styles.textOverflow,
            textAlign: 'right'
          }}>{parseInt(status, 10) === 2 ? "已结束" : (new Date(gmtModify).toLocaleDateString() + '发布')}</span>
        </div>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>{title}</span>
        <div style={{...styles.donorCondition}} className={'lineLength2'}>{newFamilyDesc}</div>
        <img
          src={imageUrl}
          alt=""
          style={styles.donorPhoto}
        />
        {parseInt(status, 10) === 2 ? null : <div style={styles.clickForDetail}>点击查看</div>}
        <div style={styles.donorInfo}>
          <span style={{...styles.donorInfoText, maxWidth: '4rem'}}>姓名: {name}</span>
          <span style={{...styles.donorInfoText, maxWidth: '3rem'}}>性别: {(sex === 0 || sex === '0') ? '男' : '女'}</span>
          <span style={{...styles.donorInfoText, maxWidth: '3rem'}}>年龄: {age}岁</span>
        </div>
        <div style={styles.donorInfo}>
          <span style={{...styles.donorInfoText, paddingRight: '0rem'}}>病种:&nbsp;</span>
          <span style={{...styles.donorInfoText, ...styles.textOverflow, maxWidth: '8rem', color: '#ff3330'}}>{disease}</span>
        </div>
        <div style={{...styles.donateInfo, padding: '0 .4rem'}}>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB1Iy7ZoKuSBuNjy1XcXXcYjFXa-40-50.png"
              alt=""
              style={styles.donateInfoIcon}
            />
            <span style={styles.donateInfoItemText}>
              目标<span style={styles.donateInfoBlueText}>{targetMoney / 100}</span>元
            </span>
          </div>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB14c9Uo_tYBeNjy1XdXXXXyVXa-40-50.png"
              alt=""
              style={styles.donateInfoIcon}
            />
            <span style={styles.donateInfoItemText}>
              已筹<span style={styles.donateInfoBlueText}>{currentMoney / 100}</span>元
            </span>
          </div>
          <div style={styles.donateInfoItem}>
            <img
              src="https://gw.alicdn.com/tfs/TB11zgZoKuSBuNjy1XcXXcYjFXa-50-40.png"
              alt=""
              style={styles.donateInfoIcon2}
            />
            <span style={{...styles.donateInfoItemText, ...styles.textOverflow}}>
              捐款人数<span style={styles.donateInfoBlueText}>{donatorNum}</span>人
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default DonorItem;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  donorItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  redCrossInfo: {
    padding: '0 .4rem',
    height: '1.4rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  redCrossLogo: {
    width: '.5rem',
    height: '.5rem'
  },
  redCrossName: {
    flex: 1,
    height: '.5rem',
    marginLeft: '.3rem',
    lineHeight: '.42rem',
    paddingTop: '0.04rem',
    fontSize: '.36rem',
    color: '#999999'
  },
  helpBrief: {
    flex: 1,
    height: '.9rem',
    padding: '0.04rem .4rem',
    lineHeight: '.82rem',
    fontSize: '.5rem',
    color: '#009966'
  },
  donorCondition: {
    flex: 1,
    padding: '0 .4rem',
    marginTop: '.1rem',
    lineHeight: '.45rem',
    maxHeight: '.9rem',
    fontSize: '.36rem',
    color: '#999999'
  },
  donorPhoto: {
    margin: '0 .4rem',
    flex: 1,
    borderRadius: '2px',
    height: '5rem',
    marginTop: '.45rem'
  },
  clickForDetail: {
    width: '1.6rem',
    heigth: '.6rem',
    color: '#fff',
    fontSize: '.32rem',
    lineHeight: '.6rem',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '.1rem',
    marginTop: '-0.8rem',
    marginLeft: '8.6rem'
  },
  donorInfo: {
    flex: 1,
    marginTop: '.45rem',
    padding: '0 .4rem',
    display: 'flex',
    marginTop: '0.8rem',
    flexDirection: 'row'
  },
  donorInfoText: {
    height: '.6rem',
    paddingRight: '.4rem',
    lineHeight: '.6rem',
    fontSize: '.48rem',
    color: '#333333',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  donateInfo: {
    marginTop: '.45rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5'
  },
  donateInfoItem: {
    flex: 1,
    height: '.9rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  donateInfoIcon: {
    width: '.4rem',
    height: '.5rem'
  },
  donateInfoIcon2: {
    width: '.5rem',
    height: '.4rem'
  },
  donateInfoItemText: {
    flex: 1,
    marginLeft: '.1rem',
    lineHeight: '.8rem',
    fontSize: '.36rem',
    color: '#333333'
  },
  donateInfoBlueText: {
    maxWidth: '.3rem',
    lineHeight: '.8rem',
    fontSize: '.36rem',
    color: '#009966'
  }
};