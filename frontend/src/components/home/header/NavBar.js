import React from 'react';
import "./Navi.css";
import { Avatar, Dropdown, Menu } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import logo from "./logo.png";
// import SearchBar from '../searchBar/SearchBar';
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Option 1
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Option 2
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Option 3
      </a>
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  return (
    <div>
      <header className="navbar-header">
        <div className="company-logo">
          <img
            style={{width:'32%'}}
            src={logo}
            alt="logo"
            className="logo-image"
          />
        </div>
                  {/* <SearchBar/> */}

        <div className="user-menu">
          <Avatar size="large" icon={<UserOutlined />} />
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <SettingOutlined style={{ fontSize: '1.5rem', marginLeft: '1rem' }} />
            </a>
          </Dropdown>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
