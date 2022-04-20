import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react/cjs/react.development'
import axios from 'axios';

const Payment = () => {
    const userInfo = useSelector(state=>state.userinfo);
    const navigate = useNavigate();
    const server_url = global.config.server_url;
    const dispatch = useDispatch();

    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
         document.body.appendChild(script);
       });
    };
    const razorpay = async ()=>{
        let res = await loadScript(`https://checkout.razorpay.com/v1/checkout.js`);
        if(!res){
            alert('check if you are online or not');
            return
        }
        const options = {
            key: "rzp_test_Jy9ue42qdLUmpl",
            currency: 'INR',
            amount: 100 * userInfo.subscription.price,
            name: "streamline learning application",
            description: "learning Test Wallet Transaction",
            image: "./icons/couponblack.png",
            
            handler: async function (response) {
                if(response.razorpay_payment_id){
                    // console.log(response.razorpay_payment_id, 'payment id rzrpay')
                    let addPlan = await axios.post(`${server_url}/addplantouser`, {
                        emailId : userInfo.emailId,
                        subscription : userInfo.subscription
                    })
                    if(addPlan.data.status){
                       if(localStorage.getItem('token')){
                           dispatch({type:'AUTH', payload: true})
                            navigate('/home');
                       }else{
                           dispatch({type:'AUTH', payload: false})
                       }
                    }else{
                        navigate('/login');
                        alert('payment done but something wrong please login')
                    }
                    alert('payment success');
                }else{
                    alert('payment not success.')
                }
            },
            prefill: {
              name: userInfo.userName,
              email: userInfo.emailId,
              contact: userInfo.mobile,
            },
          };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
  return (
    <Fragment>
        <div className='container-fluid m-0 p-0 boxMain'>
            <div className='container   vh-100'>
               <div className='d-flex justify-content-start p-3 pb-1'>
                    <button className='btn btn-link logoMain'>streamline</button>
                </div>
                <div className='d-flex justify-content-around p-4'>
                    <p className='text-secondary fs-5' style={{fontFamily: 'courgette'}}>complete your payment</p>
                </div>
                <div className='d-flex justify-content-center'>
                    <Card className="text-white bg-dark p-3 mt-3 shadow-lg" style={{height:'17rem', width:'35rem'}}>
                        <Card.Body>
                            <div className='row'>
                                    <Card.Title className='text-info fs-5 lead'>Continue with:</Card.Title>
                                    <center><img src='./icons/razorpay.png' style={{width:'18rem', height:'5rem'}} alt='razorpay'/></center>
                                    <div className='d-flex justify-content-around p-3'>
                                        <p className='text-info lead fs-5'>Plan: <span className='text-warning lead fs-5'>{userInfo.subscription.plan}</span></p>
                                        <p className='text-info lead fs-5'>Price: <span className='text-warning lead fs-5'>{userInfo.subscription.price}/-</span></p>
                                    </div>
                                    <center><Button variant='btn btn-outline-info' onClick={()=>razorpay()}>Confirm</Button></center>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Payment