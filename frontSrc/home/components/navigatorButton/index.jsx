
import React from 'react';

import ButtonItem from '../buttonItem/index';

class NavigatorButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModel: false
    };
  }

  render() {
    return (
      <div style={styles.navigator}>
        <div style={styles.projectTitle}>
          <img
            src={'https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png'}
            alt=""
            style={styles.redCrossLogo}
          />
          <span style={{...styles.projectName, ...styles.textOverflow}}>“同心博爱” 百姓公益救助项目</span>
        </div>
        <div style={styles.buttonBox}>
          <ButtonItem
            title={'关于我们'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1g._NoHGYBuNjy0FoXXciBFXa-128-128.png'}
            content={`普陀区红十字会成立于1958年10月，于2005年9月独立建制,成为中共上海市普陀区委和上海市普陀区政府领导下主管全区人道主义工作的社会救助团体。普陀区红十字会高举“人道、博爱、奉献”的红十字精神旗帜，以改善最易受损害群体境况为目标，在区委区政府的重视指导下，在社会各界的关心支持下，开展“三救”（救灾、救护、救助）工作和“三献”（无偿献血宣传、造血干细胞捐献、遗体器官捐献）工作，进一步发挥红十字会在构建社会主义和谐社会中的积极作用，当好党和政府在人道领域的有力助手。`}
          />
          <ButtonItem
            title={'项目介绍'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1uSgvoKuSBuNjy1XcXXcYjFXa-128-128.png'}
            content={`将真实反映求助对象的具体情况及困难群体自强不息、逆境奋进的事例，以呼吁社会各界和广大市民扬善博爱、扶危济困，关系支持弱势群体境况，给予他们爱心援助。`}
          />
          <ButtonItem
            title={'申请对象'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1ACovoKuSBuNjy1XcXXcYjFXa-128-128.png'}
            content={`1、申请对象限本区户籍，年龄不限;<br/>
            2、家庭人均月收入等于或低于上海市上年度最低基本工资；<br/>
            3、在助医、助学等方面确有困难的可向户籍所在地居委会红十字服务站申请救助；<br/>
            4、基层红十字会应了解、掌握申请人基本情况，并查证属实后向街镇红十字会上报；<br/>
            5、申请人愿意接受区红会正面拍摄，并在区红会微信平台中播出。`}
          />
          <ButtonItem
            title={'救助流程'}
            buttonUrl={'https://gw.alicdn.com/tfs/TB1_MMSoGmWBuNjy1XaXXXCbXXa-128-128.png'}
            content={`1、申请人向基层红十字会提出申请，基层红十字会查实情况后填报《普陀区红十字会“同心博爱”百姓救助项目申报表》；<br/>
            2、街镇红十字会经核实确认后上报区红十字会；<br/>
            3、区红十字会选择报道对象，核实确认后联系申请人接受采访拍摄。<br/>
            4、播出后，所募得的帮困金统一由区红十字会交由申请对象。`}
          />
        </div>
      </div>
    );
  }
}

export default NavigatorButton;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  navigator: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '3.5rem',
    padding: '.3rem 0rem',
    backgroundImage: 'linear-gradient(to bottom, #E0FAE4, #FFFFFF)',
  },
  projectTitle: {
    display: 'flex',
    padding: '0 .4rem'
  },
  projectName: {
    width: '8rem',
    height: '.6rem',
    marginLeft: '.2rem',
    lineHeight: '.56rem',
    paddingTop: '0.02rem',
    fontSize: '.52rem',
    color: '#009966'
  },
  redCrossLogo: {
    width: '.6rem',
    height: '.6rem'
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }
};