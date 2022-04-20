import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.development'
import '../styles/chooseplan.css';

const ChoosePlan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const server_url = global.config.server_url;

    const [plans] = useState([
        {
            price : 19,
            plan : 'Monthly'
        },
        {
            price : 29,
            plan : 'Quarterly'
        },
        {
            price : 59,
            plan : 'Yearly'
        }
    ]);
    let planTaken = (x) => {
        dispatch({type:'USER_PLAN', payload: x});
        navigate('/payment');
    }
  return (
    <Fragment>
        <div className='container-fluid m-0 p-0 boxMain'>
            <div className='container   '>
               <div className='d-flex justify-content-start p-3 pb-1'>
                        <button className='btn btn-link logoMain'>streamline</button>
                    </div>
                <div className='d-flex justify-content-around'>
                <p className='text-secondary fs-5' style={{fontFamily: 'courgette'}}>choose your plan for ad free watching</p>

                </div>
                <div className='d-flex flex-wrap p-3 justify-content-around'>
                    {
                        plans.map((item, index)=>{
                            return <Card className="text-white coupon p-3 mt-3" key={index}>
                                        <Card.Body>
                                            <div className='row'>
                                                <div className='col-md-4 d-flex justify-content-center '>
                                                    <Card.Title className='mt-5 pt-3 text-info fs-4' style={{textAlign:''}}>{item.price}/-</Card.Title>
                                                </div>
                                                <div className='col-md-8 coupon-div'>
                                                    <Card.Title className='text-info fs-5 text-center'>{item.plan}</Card.Title>
                                                    <Card.Text className='lead fs-6 text-secondary text-center'>
                                                        You will be able watch seamlessly over a month. <br/>
                                                        Need to subscribe for each month
                                                    </Card.Text>
                                                    <center><Button variant='btn btn-outline-info' onClick={()=>planTaken(item)}>Subscribe</Button></center>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                        })
                    }
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ChoosePlan