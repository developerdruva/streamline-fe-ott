/* eslint-disable */
import '../styles/login.css';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        userName : '', 
        emailId : '',
        mobileNum : '',
        password : ''
    });
    let [showOtp, setShowOtp] = useState(false);
    const [userOtp, setUserOtp] = useState();
    const server_url = global.config.server_url;

    const [userRegAuth, setUserRegAuth] = useState({
        isShow : false,
        result : false,
        body : ''
    });
    const [Otp, setOtp] = useState();
    const email = useSelector(state=>state.userinfo);
    
    useEffect(()=>{
        setForm({
            emailId : email.emailId
        })
    },[])

    const submitForm = async (event) => {
        event.preventDefault();
        // console.log(form, 'form');
        let emailCheck = await axios.post(`${server_url}/emailcheck/${form.emailId}`);
        if(emailCheck.data.status){
            // console.log('res emaild')
            setUserRegAuth({
                isShow : true,
                body : `email id already existed`
            })
        }else{
            // console.log(form.mobileNum,'res mobile form')
            let res = await axios.get(`${server_url}/reg/otpcall/${form.mobileNum}`);
            // console.log(res);
            if(res.data.status){
                setShowOtp(true);
                setOtp(res.data.otp)
            }else{
                setShowOtp(false);
                // console.log('otp sent failed');
                setUserRegAuth({
                    isShow: true,
                    body:'otp sent fail check mobile number'
                })
            }
        }
    }

    const otpHandler = (event) => {
        event.preventDefault();
        // console.log(Otp , 'got from back')
        // console.log(userOtp , 'got from user')
        userOtp === Otp ? registerUser() : setUserRegAuth({
            isShow: true,
            body: "Invalid otp"
        });
    }
    const registerUser = async () => {
        const response = await axios.post(`${server_url}/register`, form); 
        // console.log(response, '---------res register')   
        if (response.data.status === true) {
            localStorage.setItem('token', response.data.token);
            if(localStorage.getItem('token')){
                dispatch({type:'USER_INFO', payload: form})
                dispatch({type:'AUTH', payload: true})
                navigate('/chooseplan')
            }else{
                alert('something wrong');
                navigate('/')
            }
        } else {
           setUserRegAuth({
               isShow : true,
               body : "user not registered"
           })
        }
    }

  return (
    <Fragment>
        <div className='container-fluid vh-100 border border-dark' style={{backgroundColor: '#0c111b'}}>
            <p className='pt-3 fs-1 text-secondary lead text-center'>Sign Up</p>
            <div className='d-flex justify-content-center align-seft-baseline mt-1'>
               <div className='signInform p-4'>
                   <button className='btn btn-link' onClick={()=>{navigate('/')}}><AiOutlineArrowLeft style={{color: '#34495E',fontSize:'20px'}}/></button>
                    <Form onSubmit={submitForm} className='text-secondary '>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setForm({...form, userName : event.target.value})} placeholder="Enter Name" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            {
                                email.emailId ?                             
                                    <Form.Control type="email" value={email.emailId} disabled placeholder="Enter email" required />
                                :   
                                    <Form.Control type="email" onChange={(event)=>setForm({...form, emailId : event.target.value})} placeholder="Enter email" required />
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="tel" onChange={(event)=>setForm({...form, mobileNum : event.target.value})} placeholder="Enter Mobile" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(event)=>setForm({...form, password : event.target.value})} placeholder="Password" required/>
                        </Form.Group>
                        <center><Button variant="outline-info mt-2" type="submit" >
                            Submit
                        </Button></center>
                    </Form>
               </div>
               
            </div>
            
        </div>
        
        <Modal show={showOtp}>
            <Modal.Header className="lead text-success">Verify Mobile Number</Modal.Header>
            <form onSubmit={otpHandler}>
                <Modal.Body className="text-info" align='center'>
                    <div className="form-signin">
                        <div className="form-floating m-2">
                            <input className="form-control" type="number" id="otp" onChange={(event) => setUserOtp(event.target.value)}  name="otp" placeholder="Enter OTP" />
                            <label htmlFor="otp">Enter OTP here:</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-info btn-md" onClick={()=>setShowOtp(false)}>Submit</button>
                    <button className="btn btn-secondary btn-md" onClick={()=>setShowOtp(false)} >Back</button>
                </Modal.Footer>
            </form>
        </Modal>
         <Modal show={userRegAuth.isShow} className=''>
                <Modal.Header className="lead text-info bg-dark">Message</Modal.Header>
                <Modal.Body className="bg-dark" align='center'>
                   {userRegAuth.result ? <span className="text-success lead">You are successfully Registered</span>
                   : <span className="text-danger lead">{userRegAuth.body}</span>}
                   {
                       userRegAuth.body === 'email id already existed' ?
                       <><br/><button className='btn btn-link btn-md text-info text-decoration-none' onClick={()=>navigate('/login')}>Login</button></> :
                       null
                   }
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    <button className="btn btn-secondary btn-md"  onClick={()=> setUserRegAuth({isShow : false})}>Back</button>
                </Modal.Footer>
            </Modal>
    </Fragment>
  )
}

export default Register