import React from 'react';
import {
  Form, Button, InputNumber, Input, Switch
} from 'antd';
import dataSource from '../../mock/index';

const taxResult = dataSource && dataSource.taxResult || {};

class TaxCalc extends React.Component {

  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  render() {

    return (
      <div style={styles.calc}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="税前薪资："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            <InputNumber
              defaultValue={0}
              value={taxResult.salary || 0}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={styles.mediumWidth}
            />
            <Button style={styles.calcButton} type="primary" htmlType="submit">
              计算
            </Button>
          </Form.Item>
          <Form.Item
            label="社保汇缴基数："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
          >
            <div>
              <InputNumber
                value={taxResult.salary || 0}
                defaultValue={0}
                type={'number'}
                style={{...styles.shortInput}}
                disabled={!this.state.rrsAble}
              />
              <Switch style={styles.switch} defaultChecked={false} onChange={(v) => {this.setState({rrsAble: v})}} unCheckedChildren={'自定义'} />
            </div>
          </Form.Item>
          <Form.Item
            label="工资期数(包含本月)："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
            required
          >
            <Input
              type={'number'}
              style={{...styles.shortInput}}
            />
          </Form.Item>
          <Form.Item
            label="当前累计年收入(包含本月)："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
          >
            <div>
              <Input
                defaultValue={40000}
                type={'number'}
                style={{...styles.shortInput}}
                disabled={!this.state.totalIncome}
              />
              <Switch style={styles.switch} defaultChecked={false} onChange={(v) => {this.setState({totalIncome: v})}} unCheckedChildren={'自定义'} />
            </div>
          </Form.Item>
          <Form.Item
            label="专项抵扣："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
            required
          >
            <Input
              type={'number'}
              style={{...styles.shortInput}}
            />
          </Form.Item>
          <Form.Item
            label="公积金汇缴基数："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
          >
            <div>
              <Input
                defaultValue={8000}
                value={taxResult.salary || 0}
                type={'number'}
                style={{...styles.shortInput}}
                disabled={!this.state.houseReverseAble}
              />
              <Switch style={styles.switch} defaultChecked={false} onChange={(v) => {this.setState({houseReverseAble: v})}} unCheckedChildren={'自定义'} />              
            </div>
          </Form.Item>
          <Form.Item
            label="公积金汇缴比例："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
            required
          >
            <div>
              <InputNumber
                formatter={value => `${value || ''}%`}
                style={{...styles.shortInput}}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="补充公积金比例："
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={styles.clacExtra}
          >
            <div>
              <InputNumber
                defaultValue={0}
                formatter={value => `${value || '0'}%`}
                style={{...styles.shortInput}}
                disabled={!this.state.extraHouseReverseAble}
              />
              <Switch style={styles.switch} defaultChecked={false} onChange={(v) => {this.setState({extraHouseReverseAble: v})}} unCheckedChildren={'自定义'} />              
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default TaxCalc;

const styles = {
  calc: {
    display: 'flex',
    flexDirection: 'column'
  },
  shortInput: {
    width: '120px'
  },
  title: {
    fontSize: '20px',
    color: '#333',
    lineHeight: '50px'
  },
  calcButton: {
    marginLeft: '20px'
  },
  clacExtra: {
    backgroundColor: 'rgba(124, 205, 124, 0.1)',
    marginBottom: 0
  },
  mediumWidth: {
    width: '160px'
  },
  switch: {
    marginLeft: '10px'
  }
};