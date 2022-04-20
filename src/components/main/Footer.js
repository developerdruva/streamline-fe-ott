import React, { Fragment } from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <Fragment>
        <div className="row p-5 m-0 text-secondary footer">
                <div className="col-md-3 d-flex justify-content-center ">
                    <button className='btn btn-link'>streamline</button>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-self-center" >
                    <ul >
                        <li>FAQ</li>
                         <li>Privacy</li>
                          <li>Cookie Preferences</li>
                    </ul>
                </div>
                <div className="col-md-3 d-flex justify-content-center align-self-center" >
                     <ul className='' >
                        <li>Help Centre</li>
                         <li>Account</li>
                          <li>Media Centre</li>
                    </ul>
                </div > 
                <div className="col-md-3 d-flex justify-content-center align-self-center">
                     <ul >
                        <li>Terms of Use</li>
                         <li>Contact Us</li>
                          <li></li>
                    </ul>
                </div >
            </div>
    </Fragment>
  )
}

export default Footer