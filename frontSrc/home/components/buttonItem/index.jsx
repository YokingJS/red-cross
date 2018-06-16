
import React from 'react';

let Modal = require('antd-mobile/lib/Modal');
require('antd-mobile/lib/Modal/style');


class ButtonItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    const prop = this.props || {};
    this.state = {
      title: prop.title || '',
      content: prop.content || '',
      buttonUrl: prop.buttonUrl || '',
      isShowModal: false
    };
    this.reRender = this.reRender.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }

  reRender() {
    this.setState({
      ...(this.state || {})
    });
  }

  onCloseModal() {
    this.state.isShowModal = false;
    this.reRender();
  }

  onShowModal() {
    this.state.isShowModal = true;
    this.reRender();
  }

  render() {
    let ondivclick = (e) => {
      this.onShowModal();
    };
    const { title = '', buttonUrl = '', isShowModal = false, content = '' } = this.state || {};
    let contentArray = content.split('<br/>') || [];
    return (
      [
        <div style={styles.buttonBox} onClick={ondivclick || function() {}} key={1}>
          <img
            src={buttonUrl}
            alt=""
            style={styles.buttonStyle}
          />
          <div style={{flex: 1}}/>
          <span style={{...styles.buttonName, ...styles.textOverflow}}>{title}</span>
        </div>,
        <Modal
          visible={isShowModal}
          transparent
          maskClosable={true}
          onClose={this.onCloseModal}
          footer={[{ text: 'Ok', onPress: () => { this.onCloseModal() } }]}
          key={2}
        >
          <div style={styles.modalContent}>
            <span style={styles.modalTitle}>{title}</span>
            {contentArray.map((item, index) => {
              return (<div style={styles.modalContext} key={index}>{item}</div>);
            })}
          </div>
        </Modal>  
      ]
    );
  }

}

export default ButtonItem;

const styles = {
  textOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  buttonBox: {
    zIndex: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonStyle: {
    width: '1.3rem',
    height: '1.3rem',
    marginTop: '.4rem'
  },
  buttonName: {
    width: '2.4rem',
    height: '.48rem',
    paddingTop: '0.02rem',
    lineHeight: '.44rem',
    fontSize: '.4rem',
    color: '#333333',
    textAlign: 'center'
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '3rem',
    overflow: 'scroll'
  },
  modalTitle: {
    height: '.8rem',
    textAlign: 'left',
    fontSize: '.5rem',
    color: '#333333',
    lineHeight: '.8rem'
  },
  modalContext: {
    width: '9rem',
    maxHeight: '8rem',
    textAlign: 'left',
    fontSize: '.36rem',
    color: '#666666',
    lineHeight: '.45rem',
    wordBreak: 'break-all'
  }
};