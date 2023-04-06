import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import './sidebar.css'

const { Sider } = Layout;

class SidebarMenu extends React.Component {
  state = {
    collapsed: false,
    selectedKey: '1',
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleClick = e => {
    this.setState({ selectedKey: e.key });
  };

  render() {
    const { collapsed, selectedKey } = this.state;

    return (

   <Sider
  collapsible
  collapsed={collapsed}
  onCollapse={this.onCollapse}
  theme="light"
        style={{
          height: '100vh'
        }}

      >
  <div className="sidebar-header">
    {!collapsed && (
      <Avatar
        size="large"
        style={{ backgroundColor: '#87d068', marginBottom: '1rem' }}
        icon={<UserOutlined />}
      />
    )}
    <div
      className="collapse-icon"
      onClick={() => this.onCollapse(!collapsed)}
      style={{ color: 'black' }}
    >
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  </div>
  <div className="menu-sidebar">
    <Menu
      theme="light"
      defaultSelectedKeys={['1']}
      selectedKeys={[selectedKey]}
      mode="inline"
      onClick={this.handleClick}
    >
 <Menu.Item key="1" icon={<MailOutlined />} className="menu-item">
            <Link to="/home">Application</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />} className="menu-item">
            <Link to="/home/module">Module</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />} className="menu-item">
            <Link to="/settings">Pages</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />} className="menu-item">
            <Link to="/settings">User</Link>
          </Menu.Item>
         
          </Menu>
  </div>
  <div className="sidebar-footer-container">
     {!collapsed && <div className="sidebar-footer">Footer</div>}
          </div>
</Sider>

    );
  }
}

export default SidebarMenu;
