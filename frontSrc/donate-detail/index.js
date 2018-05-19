

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import FootInfo from '../components/footInfo/index';
import request from '../components/request';

const BREAK_LINE = '</br>';
class Page extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
      baseModel: {}
    };

    this.getPageInfo = this.getPageInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderIllness = this.renderIllness.bind(this);
    this.renderContactWay = this.renderContactWay.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0,0); 
    this.getPageInfo();
  }

  getPageInfo() {
    let pageUrl = window.location.pathname || '';
    let requestId = (pageUrl.split('/') || []).pop() || '';
    request.getDeployAppealById('?id=' + requestId).then(resS => {
      if(!resS.errorMsg) {
        const {
          projectFollowUp = '', id = '', name = '', title = ''
        } = resS.data || {};
        window.setCookie('jiushu_data_id', id);
        window.setCookie('jiushu_data_name', name);
        window.setCookie('jiushu_data_appealRecordTitle', title);
        this.setState({
          baseModel: resS.data || {}
        });
      }
    });
  }

  componentWillReceiveProps(newProps) {
  }

  renderInfo() {
    const baseModel = this.state.baseModel || {};
    let {
      deployDepartment = '', status = '0', gmtModify = '', title = '', targetMoney = '', currentMoney = '',
      donatorNum = '', videoUrl = ''
    } = baseModel;
    return (
      <div style={styles.topInfo}>
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
        <div style={styles.donateCountInfo}>
          <div style={styles.donateCountItem}>
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{targetMoney / 100}元</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>目标金额</span>
          </div>
          <div style={styles.splitLine}/>
          <div style={styles.donateCountItem}>
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{currentMoney / 100}元</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>已筹金额</span>
          </div>
          <div style={styles.splitLine}/>
          <div style={styles.donateCountItem}>
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{donatorNum}人</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>捐款人数</span>
          </div>
        </div>
        {videoUrl ? <div style={styles.videoBox}>
          <iframe
            frameBorder="0"
            style={styles.video}
            controls="controls"
            src={videoUrl}
            allowFullScreen
          ></iframe>
        </div> : null}
      </div>
    );
  }

  renderIllness() {
    const baseModel = this.state.baseModel || {};
    const {
      imageUrl = '', familyDesc = '', patientDesc = ''
    } = baseModel;
    let familyDescArr = familyDesc.split(BREAK_LINE);
    let patientDescArr = patientDesc.split(BREAK_LINE);
    return (
      <div style={styles.topInfo}>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>一、家庭及收入情况</span>
        {
          familyDescArr && familyDescArr.length ? familyDescArr.map((item, index) => {
            item = item.replace(/(^\s*)|(\s*$)/g,"");
            return <div style={styles.normalText} key={index + 'family'}><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{item}</div>
          }) : null
        }
        <img
          // src='https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png'
          src={imageUrl}
          alt=''
          style={styles.normalImage}
        />
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>二、患者情况</span>
        {
          patientDescArr && patientDescArr.length ? patientDescArr.map((item, index) => {
            item = item.replace(/(^\s*)|(\s*$)/g,"");
            return <div style={styles.normalText} key={index + 'patient'}><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{item}</div>
          }) : null
        }
      </div>
    );
  }

  renderContactWay() {
    const baseModel = this.state.baseModel || {};
    const {
      name = '', mobile = ''
    } = baseModel;
    let mobileArr = mobile.split(BREAK_LINE);
    return (
      <div style={styles.topInfo}>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>三、联系方式</span>
        {/* <div style={{...styles.rowLine}}>
          <span style={styles.largeText}>普陀区红十字会联系人:</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, marginLeft: '.2rem'}}></span>
        </div> */}
        <div style={{...styles.rowLine}}>
          <span style={styles.largeText}>联系电话:</span>
        </div>
        <div style={{...styles.rowLine, height: 'auto', display: 'flex', flexDirection: 'column'}}>
          {
            mobileArr && mobileArr.length ? mobileArr.map((item, index) => {
              item = item.replace(/(^\s*)|(\s*$)/g,"");
              return <span
                style={{...styles.largeText, maxWidth: '8rem', ...styles.textOverflow, color: '#ff3333', marginLeft: '.2rem'}}>
                {item}
              </span>
            }) : null
          }
        </div>
      </div>
    );
  }

  renderButton() {
    const baseModel = this.state.baseModel || {};
    const {
      projectFollowUp = '', id = '', name = ''
    } = baseModel;
    return (
      <div style={styles.fixedButton}>
        <Link to={'/fillInfo?id=' + id + '&weaker=' + name + '&nothing=232323'} style={styles.helpButton}>帮助TA</Link>
        <a href={projectFollowUp} style={{...styles.followButton, backgroundColor: projectFollowUp ? '#48D1CC' : '#cbcccd'}}>项目跟进</a>
      </div>
    );
  }

  render() {
    return (
      <div style={styles.page}>
        {this.renderInfo()}
        {this.renderIllness()}
        {this.renderContactWay()}
        <FootInfo />
        {this.renderButton()}
        <div style={{height: '1.9rem'}}/>
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
  rowLine: {
    flex: 1,
    display: 'flex',
    padding: '0rem .4rem',
    flexDirection: 'row'
  },
  normalText: {
    flex: 1,
    padding: '0 .4rem',
    lineHeight: '.6rem',
    fontSize: '.42rem',
    color: '#999999',
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  },
  largeText: {
    lineHeight: '.8rem',
    fontSize: '.48rem',
    color: '#333333'
  },
  normalImage: {
    flex: 1,
    margin: '.45rem .4rem',
    height: '5rem'
  },
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative'
  },
  topInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  redCrossInfo: {
    padding: '.6rem .4rem',
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
  donateCountInfo: {
    flex: 1,
    display: 'flex',
    marginTop: '.35rem',
    flexDirection: 'row',
    height: '2rem',
    borderTop: '1px solid #999999',
    borderBottom: '1px solid #999999'    
  },
  donateCountItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  donateCountItemTopText: {
    lineHeight: '.6rem',
    fontSize: '.48rem',
    color: '#ff3333'
  },
  donateCountItemBottomText: {
    lineHeight: '.5rem',
    fontSize: '.36rem',
    color: '#999999'
  },
  splitLine: {
    width: '1px',
    height: '1.2rem',
    marginTop: '.4rem',
    backgroundColor: '#999999'
  },
  videoBox: {
    flex: 1,
    height: '6.5rem',
    padding: '.55rem .4rem'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  fixedButton: {
    position: 'fixed',
    width: '10.8rem',
    padding: '0rem .4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1.6rem',
    left: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5'
  },
  helpButton: {
    width: '6.45rem',
    height: '1.2rem',
    lineHeight: '1.2rem',
    fontSize: '.6rem',
    color: '#fff',
    backgroundColor: '#ff3332',
    textAlign: 'center',
    borderRadius: '.6rem'
  },
  followButton: {
    flex: 1,
    height: '1.2rem',
    lineHeight: '1.2rem',
    marginLeft: '.3rem',
    fontSize: '.55rem',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '.6rem'
  }
};





