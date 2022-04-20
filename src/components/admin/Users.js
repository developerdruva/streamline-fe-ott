/* eslint-disable */
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import '../styles/users.css'

const Users = () => {
    const [users, setUsers] = useState([]);
    const server_url = global.config.server_url;

    useEffect(()=>{
        getUsers();
    },[])
    
    let getUsers = async ()=>{
        let res =await axios.get(`${server_url}/getusers`);
        setUsers(res.data.data);
        // console.log(users, '-------');
    }
  return (
    <Fragment>
        <div className=''>
            <table className="table table-hover text-secondary table-sm tablestyle">
                <thead>
                    <tr>
                        <th >#</th> 
                        <th >User Name</th>
                        <th >Email</th>
                        <th >Mobile</th>
                        <th >Password</th>
                        <th >Subscription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users ?
                        users.map((item,index)=>{
                        return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.emailId}</td>
                                        <td>{item.mobileNum}</td>
                                        <td>{item.password}</td>
                                        <td>{item.subscription.plan}: {item.subscription.price}/-</td>
                                        <td>
                                            <div className='btn-group d-flex'>
                                                <button className='btn btn-outline-secondary me-1 btn-sm'>Edit</button>
                                                <button onClick={()=>axios.delete(`${server_url}/deleteuser/${item.emailId}`).then((res)=>{if(res.data.status){getUsers()}})} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                    }):
                    getUsers
                }
                </tbody>
            </table>
        </div>
    </Fragment>
  )
}

export default Users