'use strict';

import React from 'react';

class FootInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={styles.footInfo}>
        <img
          src='https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png'
          alt=''
          style={styles.redCrossLogo}
        />
        <span style={styles.footCompany}>普陀区红十字会</span>
        <span style={styles.footCompany}>“同心博爱”百姓公益救助项目</span>
      </div>
    );
  }
}

export default FootInfo;

const styles = {
  footInfo: {
    flex: 1,
    height: '45rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  redCrossLogo: {
    width: '8rem',
    height: '8rem'
  },
  footCompany: {
    lineHeight: '5rem',
    fontSize: '4rem',
    color: '#999',
    marginTop: '2rem'
  }
};