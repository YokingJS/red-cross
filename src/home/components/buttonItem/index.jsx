
import React from 'react';
import { Modal } from 'antd-mobile';


class ButtonItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    const prop = this.props || {};
    this.state = {
      title: prop.title || '',
      buttonUrl: prop.buttonUrl || '',
      isShowModal: false
    };
    this.reRender = this.reRender.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
  }

  reRender() {
    const { isShowModal = false } = this.state || {};
    this.setState({
      isShowModal: isShowModal
    });
  }

  onCloseModal() {
    this.state.isShowModal = false;
    console.log('hide'+this.state.isShowModal);
    this.reRender();
  }

  onShowModal() {
    this.state.isShowModal = true;
    this.reRender();
  }

  render() {
    let ondivclick = (e) => {
      console.log(e.target);
      this.onShowModal();
    };
    const { title = '', buttonUrl = '', isShowModal = false } = this.state || {};
    return (
      [<div style={styles.buttonBox} onClick={ondivclick || function() {}} key={1}>
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
          <div style={styles.modalContext}>fhinnknkjwnfknewnfkwenfkjnwejfnkwenfjknfkjeqnfneqknj</div>
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
  },
  modalContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '30rem',
    overflow: 'scroll'
  },
  modalTitle: {
    height: '8rem',
    textAlign: 'left',
    fontSize: '5rem',
    color: '#333333',
    lineHeight: '8rem'
  },
  modalContext: {
    width: '90rem',
    maxHeight: '80rem',
    textAlign: 'left',
    fontSize: '3.6rem',
    color: '#666666',
    lineHeight: '4.5rem',
    wordBreak: 'break-all'
  }
};