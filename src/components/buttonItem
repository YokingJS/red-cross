
import React from 'react';

class ButtomItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    const prop = this.props || {};
    this.state = {
      title: prop.title || '',
      buttonUrl: prop.buttonUrl || ''
    };
  }

  render() {
    const { title = '', buttonUrl = '' } = this.state || {};
    return (
      <div style={styles.buttomBox}>
        <img
          src={buttonUrl}
          alt=""
          style={styles.buttomStyle}
        />
        <div style={{flex: 1}}/>
        <span style={{...styles.buttonName, ...styles.textOverflow}}>{title}</span>
      </div>
    );
  }

}

export default ButtomItem;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  buttomBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttomStyle: {
    width: '13rem',
    height: '13rem',
    marginTop: '4rem'
  },
  buttonName: {
    width: '24rem',
    height: '4.8rem',
    paddingTop: '0.2rem',
    lineHeight: '4.4rem',
    fontSize: '4rem',
    color: '#333333',
    textAlign: 'center'
  }
};
