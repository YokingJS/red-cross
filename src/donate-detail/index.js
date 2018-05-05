

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import FootInfo from '../components/footInfo/index';
import request from '../components/request';

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
    this.getPageInfo();
  }

  getPageInfo() {
    let pageUrl = window.location.pathname || '';
    let requestId = (pageUrl.split('/') || []).pop() || '';
    request.getDeployAppealById('?id=' + requestId).then(resS => {
      if(!resS.errorMsg) {
        const {
          projectFollowUp = '', id = '', name = ''
        } = resS.data || {};
        window.setCookie('jiushu_data_id', id);
        window.setCookie('jiushu_data_name', name);
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
    const {
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
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{targetMoney}元</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>目标金额</span>
          </div>
          <div style={styles.splitLine}/>
          <div style={styles.donateCountItem}>
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{currentMoney}元</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>已筹金额</span>
          </div>
          <div style={styles.splitLine}/>
          <div style={styles.donateCountItem}>
            <span style={{...styles.donateCountItemTopText, ...styles.textOverflow}}>{donatorNum}人</span>
            <span style={{...styles.donateCountItemBottomText, ...styles.textOverflow}}>捐款人数</span>
          </div>
        </div>
        {videoUrl ? <div style={styles.videoBox}>
          <video
            // src="http://183.131.48.145/vlive.qqvideo.tc.qq.com/A-C8EZ_x1zxcfuIZFy1WRoPdcCS-b3YiYCkKaL439oSo/o0200qh1oc4.p201.1.mp4?vkey=26267BE905B0312552D86E60575A90E211CD8BCBA98E2737B9BAF92A70EFCC3EB72D9A1611DC61DD77E912B9CC00E8B1CD6E594330F8A39CC4CD48AEB66BC62E22D269F48107BE52BFF07FDE019AED926D7899C9EDE7AABAB35B6D99D7B288DD4EE5A8F13A5FDB03CA709FB7148AB69E010F4D58844B4AF7&platform=10901&sdtfrom=&fmt=shd&level=0"
            src={videoUrl}
            style={styles.video} controls="controls"
            ref='video'
            onClick={() => {
              this.refs.video.play();
            }}
          />
        </div> : null}
      </div>
    );
  }

  renderIllness() {
    const baseModel = this.state.baseModel || {};
    const {
      imageUrl = '', familyDesc = '', patientDesc = ''
    } = baseModel;
    return (
      <div style={styles.topInfo}>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>一、求助者家庭及收入情况</span>
        <p style={styles.normalText}>{familyDesc}</p>
        <img
          // src='https://gw.alicdn.com/tfs/TB1JPTXoFuWBuNjSspnXXX1NVXa-702-360.png'
          src={imageUrl}
          alt=''
          style={styles.normalImage}
        />
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>二、患者情况</span>
        <p style={styles.normalText}>{patientDesc}</p>
        {/* <span style={{...styles.helpBrief, ...styles.textOverflow}}>三、帮助情况</span>
        <p style={styles.normalText}>帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况
          帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况帮助情况</p> */}
      </div>
    );
  }

  renderContactWay() {
    const baseModel = this.state.baseModel || {};
    const {
      name = '', mobile = ''
    } = baseModel;
    return (
      <div style={styles.topInfo}>
        <span style={{...styles.helpBrief, ...styles.textOverflow}}>三、联系方式</span>
        <div style={styles.rowLine}>
          <span style={styles.largeText}>求助人:</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>{name}</span>
        </div>
        <div style={styles.rowLine}>
          <span style={styles.largeText}>联系电话:</span>
          <span style={{...styles.largeText, maxWidth: '40rem', ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>{mobile}</span>
          {/* <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}> / 13333333333</span> */}
        </div>
        {/* <div style={{...styles.rowLine, marginTop: '10rem'}}>
          <span style={styles.largeText}>长风街道金沙居委会卫生干部:</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, marginLeft: '2rem'}}>肖春红</span>
        </div>
        <div style={styles.rowLine}>
          <span style={styles.largeText}>联系电话:</span>
          <span style={{...styles.largeText, maxWidth: '40rem', ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>13333333333</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}> / 13333333333</span>
        </div> */}
        <div style={{...styles.rowLine, marginTop: '10rem'}}>
          <span style={styles.largeText}>普陀区红十字会联系人:</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, marginLeft: '2rem'}}></span>
        </div>
        <div style={styles.rowLine}>
          <span style={styles.largeText}>联系电话:</span>
          <span style={{...styles.largeText, maxWidth: '40rem', ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}>62441118-1108</span>
          <span style={{...styles.largeText, flex: 1, ...styles.textOverflow, color: '#ff3333', marginLeft: '2rem'}}> / 1109</span>
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
        <Link to={'/fillInfo?id=' + id + '&weaker=' + name + '&nothing=232323'} style={styles.helpButton}>帮助他</Link>
        <a href={projectFollowUp} style={styles.followButton}>项目跟进</a>
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
  rowLine: {
    flex: 1,
    display: 'flex',
    padding: '0rem 4rem',
    flexDirection: 'row'
  },
  normalText: {
    flex: 1,
    padding: '0 4rem',
    lineHeight: '4.5rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  largeText: {
    lineHeight: '8rem',
    fontSize: '4.8rem',
    color: '#333333'
  },
  normalImage: {
    flex: 1,
    margin: '4.5rem 4rem',
    height: '50rem'
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
    padding: '6rem 4rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  redCrossLogo: {
    width: '5rem',
    height: '5rem'
  },
  redCrossName: {
    flex: 1,
    height: '5rem',
    marginLeft: '3rem',
    lineHeight: '4.2rem',
    paddingTop: '0.4rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  helpBrief: {
    flex: 1,
    height: '9rem',
    padding: '0.4rem 4rem',
    lineHeight: '8.2rem',
    fontSize: '5rem',
    color: '#009966'
  },
  donateCountInfo: {
    flex: 1,
    display: 'flex',
    marginTop: '3.5rem',
    flexDirection: 'row',
    height: '20rem',
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
    lineHeight: '6rem',
    fontSize: '4.8rem',
    color: '#ff3333'
  },
  donateCountItemBottomText: {
    lineHeight: '5rem',
    fontSize: '3.6rem',
    color: '#999999'
  },
  splitLine: {
    width: '1px',
    height: '12rem',
    marginTop: '4rem',
    backgroundColor: '#999999'
  },
  videoBox: {
    flex: 1,
    height: '65rem',
    padding: '5.5rem 4rem'
  },
  video: {
    width: '100%',
    height: '100%'
  },
  fixedButton: {
    position: 'fixed',
    width: '108rem',
    padding: '0rem 4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '16rem',
    left: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5'
  },
  helpButton: {
    width: '64.5rem',
    height: '12rem',
    lineHeight: '12rem',
    fontSize: '6rem',
    color: '#fff',
    backgroundColor: '#ff3332',
    textAlign: 'center',
    borderRadius: '6rem'
  },
  followButton: {
    flex: 1,
    height: '12rem',
    lineHeight: '12rem',
    marginLeft: '3rem',
    fontSize: '5.5rem',
    color: '#fff',
    backgroundColor: '#cbcccd',
    textAlign: 'center',
    borderRadius: '6rem'
  }
};





