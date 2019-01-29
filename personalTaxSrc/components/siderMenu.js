import React from 'react';
import { Layout, Menu } from 'antd';

const Sider = Layout.Sider;
const { SubMenu } = Menu;

class SiderMenu extends React.Component {
  render() {
    return (
      <Sider style={styles.sider} width="300">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sub1" title={<span>五险一金计算器</span>}>
            <SubMenu key="sub1" title={<span>江苏省</span>}>
              <Menu.Item key="1">南京市</Menu.Item>
              <Menu.Item key="2">苏州市</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1-1" title={<span>浙江省</span>}>
              <Menu.Item key="1">杭州市</Menu.Item>
              <Menu.Item key="2">绍兴市</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub2" title={<span>行业薪资分析</span>}>
            <Menu.Item key="5">金融行业TOP10企业</Menu.Item>
            <Menu.Item key="6">华为裁员</Menu.Item>
            <Menu.Item key="7">...</Menu.Item>
            <Menu.Item key="8">...</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span>常见问题</span>}>
            <Menu.Item key="9">你的工资涨了吗？某某帮你找工作</Menu.Item>
            <Menu.Item key="10">你记账了吗？某某帮你记账</Menu.Item>
            <Menu.Item key="11">...</Menu.Item>
            <Menu.Item key="12">...</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default SiderMenu;

const styles = {
  sider: {
    backgroundColor: '#bbb'
  }
};