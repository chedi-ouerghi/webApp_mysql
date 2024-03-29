import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TApp from '../../pages/TApp/TApp'
import ModuleEssai from '../../pages/TModels/ModuleEssai'
import './home.css'
import MenuSide from '../sidebar/MenuSide'
import NavBar from '../header/NavBar'
import Tpage from '../../pages/Tpage/Tpage'
import Tuser from '../../pages/user/Tuser'
import ProfileUser from '../../pages/Lgin/profile/ProfileUser'

const { useState } = React;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [leftPageWidth, setLeftPageWidth] = useState('calc(117% - 280px)');

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setLeftPageWidth(collapsed ? 'calc(100% - 80px)' : 'calc(120% - 280px)');
  };

  return (
    <div className='App'>
      <NavBar/>
      <div className='home_page' style={{display:'flex'}}>
        <div className='rigth-page'>
          <MenuSide onCollapse={onCollapse} />
        </div>
        <div className='left-page' style={{ width: leftPageWidth }}>
          <Routes>
            <Route path='/' element={<TApp />} />
            <Route path='/module' element={<ModuleEssai />} />
            <Route path='/page' element={<Tpage />} />
            <Route path='/user' element={<Tuser />} />
            <Route path='/profile' element={<ProfileUser />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home
