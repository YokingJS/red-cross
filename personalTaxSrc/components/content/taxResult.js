import React from 'react';
import {
  Row, Col
} from 'antd';
import dataSource from '../../mock/index';

const taxResult = dataSource && dataSource.taxResult || {};

class TaxCalc extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  render() {

    const {
      medicalResult = {}, extraHouseReverseResult = {},
      occupationalInjuryResult = {}, ssrResult = {},
      unemploymentResult = {},
      houseReverseResult = {}, birthResult = {}
    } = taxResult || {};

    return (
      <div style={styles.taxResult}>
        <Row style={{...styles.row}}>
          <Col style={{...styles.col}} span={8} />
          <Col style={{...styles.col}} span={8}>个人应缴部分</Col>
          <Col style={{...styles.col}} span={8}>单位应缴部分</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>养老保险金</Col>
          <Col style={{...styles.col}} span={8}>{`${ssrResult.ssrPersonNum || ''}(${ssrResult.ssrPersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${ssrResult.ssrCompanyNum || ''}(${ssrResult.ssrCompanyRate || ''})`}</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>医疗保险金</Col>
          <Col style={{...styles.col}} span={8}>{`${medicalResult.medicalPersonNum || ''}(${medicalResult.medicalPersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${medicalResult.medicalCompanyNum || ''}(${medicalResult.medicalCompanyRate || ''})`}</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>失业保险金</Col>
          <Col style={{...styles.col}} span={8}>{`${unemploymentResult.unemploymentPersonNum || ''}(${unemploymentResult.unemploymentPersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${unemploymentResult.unemploymentCompanyNum || ''}(${unemploymentResult.unemploymentCompanyRate || ''})`}</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>基本住房公积金</Col>
          <Col style={{...styles.col}} span={8}>{`${houseReverseResult.houseReversePersonNum || ''}(${houseReverseResult.houseReversePersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${houseReverseResult.houseReverseCompanyNum || ''}(${houseReverseResult.houseReverseCompanyRate || ''})`}</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>补充住房公积金</Col>
          <Col style={{...styles.col}} span={8}>{`${extraHouseReverseResult.extraHouseReversePersonNum || ''}(${extraHouseReverseResult.extraHouseReversePersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${extraHouseReverseResult.extraHouseReverseCompanyNum || ''}(${extraHouseReverseResult.extraHouseReverseCompanyRate || ''})`}</Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>工伤保险金</Col>
          <Col style={{...styles.col}} span={8}>{`${occupationalInjuryResult.occupationalInjuryPersonNum || ''}(${occupationalInjuryResult.occupationalInjuryPersonRate || ''})`}</Col>
          <Col style={{...styles.col}} span={8}>{`${occupationalInjuryResult.occupationalInjuryCompanyNum || ''}(${occupationalInjuryResult.occupationalInjuryCompanyRate || ''})`}</Col>
        </Row>
        <Row style={{...styles.row, ...styles.noBorder}}>
          <Col style={{...styles.col}} span={8}>生育保险金</Col>
          <Col style={{...styles.col}} span={8}>{`${birthResult.birthPersonNum || ''}(0%)`}</Col>
          <Col style={{...styles.col}} span={8}>{`${birthResult.birthCompanyNum || ''}(${birthResult.birthCompanyRate || ''})`}</Col>
        </Row>
        <Row style={{...styles.row, ...styles.marginTop10}}>
          <Col style={{...styles.col}} span={8}>共计支出</Col>
          <Col style={{...styles.col}} span={8}>{taxResult.allReverseNum || ''}</Col>
          <Col style={{...styles.col}} span={8}></Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>扣除四金后月薪</Col>
          <Col style={{...styles.col}} span={8}>{taxResult.needToPayTaxNum || ''}</Col>
          <Col style={{...styles.col}} span={8}></Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>个人所得税</Col>
          <Col style={{...styles.col}} span={8}>{taxResult.taxNum}</Col>
          <Col style={{...styles.col}} span={8}></Col>
        </Row>
        <Row style={styles.row}>
          <Col style={{...styles.col}} span={8}>税后月薪</Col>
          <Col style={{...styles.col}} span={8}>{taxResult.restNum || ''}</Col>
          <Col style={{...styles.col}} span={8}></Col>
        </Row>
      </div>
    );
  }
}

export default TaxCalc;

const styles = {
    taxResult: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px'
  },
  row: {
    height: '40px',
    lineHeight: '40px',
    borderBottom: '1px solid #999',
    backgroundColor: 'rgba(124, 205, 124, 0.1)'
  },
  center: {
    textAlign: 'center'
  },
  col: {
    padding: '0 10px'
  },
  marginTop10: {
    marginTop: '10px'
  },
  noBorder: {
    border: '0px'
  }
};