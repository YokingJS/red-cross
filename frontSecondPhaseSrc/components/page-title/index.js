import React from 'react';

class PageTitle extends React.Component {
    render() {
      return <div style={{...styles.pageMain, ...this.props.style}}>
        <img style={styles.img} src="https://gw.alicdn.com/tfs/TB1usd5o_tYBeNjy1XdXXXXyVXa-89-87.png"/>
        <span style={styles.text}>上海普陀区红十字会</span>
      </div>
    }
}

export default PageTitle;

const styles = {
  pageMain: {
    display: 'flex',
    flexDirection: 'row',
    height: '0.8rem',
    alignItems: 'center'
  },
  img: {
    width: '0.5rem',
    height: '0.5rem'
  },
  text: {
    marginLeft: '0.2rem',
    fontSize: '0.24rem',
    color: '#999'
  }
};