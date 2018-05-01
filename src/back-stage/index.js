
import React from 'react';
import { List, InputItem, ImagePicker } from 'antd-mobile';
import request from '../components/request';
import ListItem from './components/listItem'

class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      baseModel: []
    };
    this.reRender = this.reRender.bind(this);
  }
  
  reRender() {
    this.setState({
      ...this.state
    });
  }

  componentWillMount() {
    request.getDeployAppealList().then(res => {
      if (!res.errorMsg) {
        this.state.baseModel = res.data || []
      }
      this.reRender();
    });
  }

  render() {
    const { baseModel = {} } = this.state || {};
    return (
      <div style={styles.page}>
        {baseModel.map((item, index) => {
          return (
            <ListItem
              key={index}
              data={item}
            />
          );
        })}
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
  largeText: {
    lineHeight: '5rem',
    fontSize: '4.8rem',
    color: '#666666'
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '4rem',
    backgroundColor: '#f5f5f5'
  }
};