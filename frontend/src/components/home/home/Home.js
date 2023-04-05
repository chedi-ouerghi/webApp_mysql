import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TApp from '../../pages/TApp/TApp'
import ModuleEssai from '../../pages/TModels/ModuleEssai'
import Tableau from '../../pages/user/Tableau'
import './home.css'
import MenuSide from '../sidebar/MenuSide'
const Home = () => {
  return (
       <div className='App'>
          {/* <NavBar/> */}
        <div className='home_page' style={{display:'flex'}}>
        <div className='rigth-page'>
          <MenuSide/>
        </div>
        <div className='left-page' >
     <Routes>
      <Route path='home/' element= {<TApp/>}/>
      <Route path='home/module' element= {<ModuleEssai/>}/>
      <Route path='home/user' element= {<Tableau/>}/>
     </Routes>

      </div>
    </div>
    </div>
  )
}

export default Home