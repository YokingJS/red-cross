import React from 'react';
import PageTitle from '../page-title';
import PageList from '../page-list';

const WEB_HEIGHT = window.screen.height || 0;

class FollowUp extends React.Component {
    render() {
      return <div style={styles.pageMain}>
        <PageTitle />
        <PageList />
      </div>
    }
}

export default FollowUp;

const styles = {
  pageMain: {
    background: 'linear-gradient(to bottom, rgba(67,150,106, 0.2), white)',
    height: WEB_HEIGHT + 'px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.4rem 0.2rem'
  }
};