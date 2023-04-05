import { Route, Routes } from 'react-router-dom';
import Home from './components/loginform/home/home/Home';
import LoginForm from './components/loginform/pages/Lgin/LoginForm';
import Register from './components/loginform/pages/Lgin/Register';

function App() {
  return (
    <div >
      <Routes>
      <Route path='/' element= {<LoginForm/>}/>  
      <Route path='/register' element= {<Register/>}/>  
      <Route path='/home/*' element= {<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
