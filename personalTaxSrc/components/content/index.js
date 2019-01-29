import React from 'react';
import { Layout } from 'antd';
import Head from './head';
import TaxCalc from './taxCalc';
import TaxResult from './taxResult';

const Content = Layout.Content;

class TaxContent extends React.Component {
  render() {
    return (
      <Content style={styles.content}>
        <Head title="五险一金及税后工资计算"/>
        <TaxCalc />
        <TaxResult />
      </Content>
    );
  }
}

export default TaxContent;

const styles = {
  content: {
    maxWidth: '1000px',
    backgroundColor: 'rgb(250,250,250)',
    disploy: 'flex',
    flexDirection: 'column',
    padding: '20px 20px'
  }
};