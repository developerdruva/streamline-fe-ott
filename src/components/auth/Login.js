import '../styles/login.css';
import React, { Fragment, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        emailId : '',
        password : ''
    });
    const server_url = global.config.server_url;


    let login = async (event) => {
        event.preventDefault();
        // console.log('form', form);
        let logRes = await axios.post(`${server_url}/login`, form);
        // console.log(logRes);
        if(logRes.data.status){
            localStorage.setItem('token', logRes.data.token)          
            if(localStorage.getItem('token')){
                dispatch({type: 'AUTH', payload: true});  
                navigate('/home')
            }else{
                alert('something wrong');
                navigate('/')
            }
        }else{
            alert('emailId or password wrong');
            navigate('/login')
        }
    }

  return (
    <Fragment>
        <div className='container-fluid vh-100 border border-dark' style={{backgroundColor: '#0c111b'}}>
            <p className='pt-5 fs-1 text-secondary lead text-center'>Sign In</p>
            <div className='d-flex justify-content-center align-seft-baseline mt-2 p-3'>
                   <button className='btn btn-link' onClick={()=>{navigate('/')}}><AiOutlineArrowLeft style={{color: '#34495E',fontSize:'20px'}}/></button>

               <div className='signInform p-5'>
                    <Form onSubmit={login} className='text-secondary '>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={(event)=>setForm({...form, emailId: event.target.value})} placeholder="Enter email" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(event)=>setForm({...form, password: event.target.value})} placeholder="Password" required/>
                        </Form.Group>
                        <center><Button variant="info" type="submit" >
                            Submit
                        </Button></center>
                    </Form>
               </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Login