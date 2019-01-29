import React from 'react';

class Head extends React.Component {
  render() {
    const { title = '' } = this.props;
    return (
      <div style={styles.head}>
        <div style={styles.title}>{title}</div>
      </div>
    );
  }
}

export default Head;

const styles = {
  head: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '20px',
    color: '#333',
    lineHeight: '50px'
  }
};