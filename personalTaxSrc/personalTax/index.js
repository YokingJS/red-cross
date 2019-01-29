import React from 'react';
import { Layout } from 'antd';
import SiderMenu from '../components/siderMenu';
import TaxContent from '../components/content/index';
import Advertising from '../components/advertising';

const WEB_HEIGHT = window.screen.height || 0;

class PersonalTax extends React.Component {
    render() {
      return <div style={styles.pageMain}>
        <Layout style={styles.layout}>
          <SiderMenu />
          <TaxContent />
          <Advertising />
        </Layout>
      </div>
    }
}

export default PersonalTax;

const styles = {
  pageMain: {
    width: '100%',
    minHeight: WEB_HEIGHT + 'px',
    disploy: 'flex',
    flexDirection: 'row'
  },
  layout: {
    minHeight: WEB_HEIGHT + 'px',
    width: '100%'
  },
  sider: {
    backgroundColor: '#bbb'
  }
};