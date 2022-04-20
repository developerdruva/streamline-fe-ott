import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AppRoutes from './App.Routes';
import Footer from './components/main/Footer';

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch({type:'AUTH', payload: true})
    }else{
      dispatch({type:'AUTH', payload: false})
    }
  })
  
  return (
    <div className="App">
      <AppRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
