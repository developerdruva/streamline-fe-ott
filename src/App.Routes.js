import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Users from './components/admin/Users';
import ChoosePlan from './components/auth/ChoosePlan';
import Login from './components/auth/Login';
import PageNotFound from './components/auth/PageNotFound';
import Payment from './components/auth/Payment';
import Register from './components/auth/Register';
import Home from './components/main/Home';
import LandOn from './components/main/LandOn';


const AppRoutes = () => {
  // const token = localStorage.getItem('token');
  const auth = useSelector(state=>state.isLogged);
  console.log(auth, 'in app. routes')
  return (
    <Fragment>
        <Routes>
            <Route path='/' element={<LandOn/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>

            { auth && <Route path='/chooseplan' element={<ChoosePlan/>}></Route>}
            { auth && <Route path='/payment' element={<Payment/>}></Route>}
            { auth && <Route path='/users' element={<Users/>}></Route>}
            
            { auth && <Route path='/home' element={<Home/>}></Route> }
            { auth && <Route path='/streamline/admin' element={<Admin/>}></Route>}

            <Route path='*' element={<PageNotFound/>}></Route>
            
      </Routes>
    </Fragment>
  )
}

export default AppRoutes;