import React from 'react';

class ListItem extends React.Component {
    render() {
      const { data = {} } = this.props;
      const {
        name = '', gmtModify = '', money = 0
      } = data;
      const time = new Date(gmtModify);
      return <div style={{...styles.pageMain, ...this.props.style}}>
        <div style={styles.header}>
          <div style={styles.color6}>
            <div>{`${time.toLocaleDateString()}   ${time.toLocaleTimeString()}`}</div>
          </div>
        </div>
        <div style={styles.personInfo}>
          <div style={styles.name}>
            <div>捐助人：</div>
            <div style={styles.color6}>{name}</div>
          </div>
          <div style={styles.name}>
            <div>捐助金额：</div>
            <div style={styles.color6}>{`${money / 100}元`}</div>
          </div>
        </div>
      </div>
    }
}

export default ListItem;

const styles = {
  pageMain: {
    display: 'flex',
    flexDirection: 'column',
    width: '6.7rem',
    height: '1.2rem',
    backgroundColor: 'rgba(67,150,106, 0.1)',
    marginBottom: '0.1rem',
    borderRadius: '4px',
    padding: '0.2rem'
  },
  header: {
    height: '0.4rem',
    backgroundColor: 'rgba(67,150,106, 0.2)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.1rem'
  },
  name: {
    fontSize: '0.2rem',
    color: '#43966a',
    display: 'flex',
    flexDirection: 'row'
  },
  color6: {
    fontSize: '0.2rem',
    color: '#666',
    display: 'flex',
    flexDirection: 'row'
  },
  personInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.1rem',
    alignItems: 'center',
    fontSize: '0.2rem',
    color: '#43966a',
    justifyContent: 'space-between',
    flex: 1
  }
};