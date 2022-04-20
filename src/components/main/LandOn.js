/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { BsFillPlayFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import group23 from '../images/landpage/Group23.png';
import lposter from '../images/landpage/Group32.png';
import rposter from '../images/landpage/Group34.png';
import '../styles/landon.css';


const LandOn = () => { 
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [mvurl, setMvUrl] = useState('');
    const [email, setEmail] = useState('');
    const server_url = global.config.server_url;
    const dispatch = useDispatch();

     useEffect(()=> {
        getMovies();
    },[]);

    let getMovies = async () => {
        let mvs_response = await axios.get(`${server_url}/getmovies`);
        // console.log('movies', mvs_response);
        if(mvs_response.status){
            setMovies(mvs_response.data.movies)
            setMvUrl(mvs_response.data.base_url)
        }else{
            setMovies([])
        }
    }

    let submitHandler = async (event) => {
        event.preventDefault();
        // console.log(email.email, ' email from user');
        let emailCheck = await axios.post(`${server_url}/emailcheck/${email.email}`);
        // console.log('emailcheck', emailCheck);
        if(emailCheck.data.status){
            // console.log('res emaild')
            alert('email already registered. try login')
        }else{
            dispatch({type: "USER_EMAIL", payload : email});
            navigate('/register');
        }
    }
  return (
    <div className='container-fluid boxMain'>
        <div className='row p-5 pb-0'>
            <div className='col-md-5 d-flex justify-content-center'>
                <button className='btn btn-link logoMain'>streamline</button>
            </div>

        </div>

        <div className=' d-flex justify-content-between m-0 p-0  '>
            <div className='p-0 '>
                <img src={lposter} className='posterLside p-0' alt='left poster'/>
            </div>
            <div className='  '>
                <Carousel variant='dark' className='landCarousel pt-4'>
                        {
                            movies.map((item, index)=> {
                            return  item.mv_tag === 'promo' ?
                                        <Carousel.Item key={index}>
                                                <img className="mt-5" src={`${mvurl}${item.movie.mv_poster}`}  alt="First slide"/>
                                                <Carousel.Caption style={{top: '0'}} className='m-4'>
                                                    <h1 className=' display-4 mb-1 ' style={{color: 'maroon',textShadow:'2px 2px 5px aqua'}}>{item.mv_name}</h1>
                                                    <p className='mt-2 text-light '>{item.overview}</p>
                                                    <div className='d-flex justify-content-center'>
                                                        <button className='btn btn-outline-light' onClick={()=>{document.getElementById('warntag').style.visibility = 'visible';document.getElementById('email').style.border = '3px solid red'}} style={{width:'100px'}} >
                                                            <a href='#authDiv'><BsFillPlayFill style={{fontSize: '40px'}}/></a>
                                                        </button>
                                                    </div>
                                                    <div className='d-flex justify-content-between mt-5'>
                                                        <p className="text-info"><span className='text-light'>Language: </span>{item.language}</p>
                                                        <p className="text-info"><span className='text-light'>Genre: </span>{item.mv_genre}</p>
                                                        <p className="text-info"><span className='text-light'>Year: </span>{item.mv_year}</p>
                                                </div>
                                            </Carousel.Caption>
                                        </Carousel.Item>:
                                    null
                        })
                    }
                </Carousel> 
                <div className='mt-5 text-cente text-light ' id='authDiv'>
                    <p className='text-center p-0 m-0' style={{fontFamily:'courgette', fontSize:'30px'}}>Unlimited movies, TV shows and more.</p>
                    <center><p className='fs-6 p-0 m-0 text-danger lead' style={{visibility: 'hidden', fontWeight:'bold', textShadow:'2px 5px 5px blue'}} id='warntag'>you need to sign in or sign up to continue watch</p></center>
                    <form onSubmit={submitHandler} className='mt-3 d-flex justify-content-center align-items-baseline' >
                        <span>Email: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type='email' id='email' placeholder='email id' className='emailField mt-2 text-center text-light' 
                            onChange={(event)=>setEmail({...email, email:event.target.value})} />
                        <label htmlFor='email'><button className='btn btn-link text-decoration-none text-info ' type='submit' >Sign Up</button></label>
                    </form>
                </div>
                <center><p className='lead fs-6 text-info'>or</p></center> 
                <center><button className='btn btn-outline-info mt-3' onClick={()=> navigate('login')}>Sign In</button></center>

            </div>
            <div className=' p-0 m-0 '>
                <img src={rposter} className='posterRside' alt='left poster'/>
            </div>
        </div>


        <div className='d-flex justify-content-center align-self-baseline p-5 mt-4'>
            <p className='text-secondary' style={{fontFamily:'courgette', fontSize:'2.5rem'}}>Bewitch yourself into the world of Cinema</p>
        </div>
       
       <p className='text-light text-center mt-3' style={{fontFamily: 'courgette'}}>More Trending</p>
            <div className='container'>
                <div className='d-flex justify-content-center flex-wrap p-0 m-0' >
                {
                    movies.map((item, index)=> {
                        return item.mv_tag === 'promo' || item.mv_tag ==='trend' ?
                                <div className="likeCard card m-2" key={index}>
                                    <button className='btn btn-link' onClick={()=>{document.getElementById('warntag').style.visibility = 'visible';document.getElementById('email').style.border = '3px solid red'}}>
                                        <a href='#authDiv'> <img className="card-img-top " src={`${mvurl}${item.movie.mv_titlepic}`} alt="Card  cap"/></a>
                                    </button>
                                    <div className="card-body" >
                                        <h5 className="card-title text-primary p-0 m-0"><center>{item.mv_name}</center></h5>
                                         <div className='d-flex justify-content-between mt-3'>
                                            <p className="text-info m-0"><span className='text-light'>Language: </span>{item.language}</p>
                                            <p className="text-info"><span className='text-light'>Genre: </span>{item.mv_genre}</p>
                                            <p className="text-info"><span className='text-light'>Year: </span>{item.mv_year}</p>
                                        </div>
                                    </div>
                                </div>:
                                null
                    })
                }
                </div>
            </div>

            <p className='text-light text-center mt-4' style={{fontFamily: 'courgette'}}>All movies</p>
            <div className='container'>
                <div className='d-flex justify-content-center flex-wrap p-0 m-0' >
                {
                    movies.map((item, index)=> {
                        return <div className="likeCard card m-2" key={index}>
                                    <button className='btn btn-link' onClick={()=>{document.getElementById('warntag').style.visibility = 'visible';document.getElementById('email').style.border = '3px solid red'}}>
                                        <a href='#authDiv'> <img className="card-img-top " src={`${mvurl}${item.movie.mv_titlepic}`} alt="Card  cap"/></a>
                                    </button>                                    
                                    <div className="card-body" >
                                        <h5 className="card-title text-primary p-0 m-0"><center>{item.mv_name}</center></h5>
                                         <div className='d-flex justify-content-between mt-3'>
                                            <p className="text-info m-0"><span className='text-light'>Language: </span>{item.language}</p>
                                            <p className="text-info"><span className='text-light'>Genre: </span>{item.mv_genre}</p>
                                            <p className="text-info"><span className='text-light'>Year: </span>{item.mv_year}</p>
                                        </div>
                                    </div>
                                </div>
                    })
                }
                </div>
            </div>

        <div className='row border border-secondary m-5 ' ></div>

        <div className='row d-flex justify-content-center m-5 mb-0 '>
            <div className='col-md-6 '>
                <p className='text-center text-danger mt-5' style={{fontFamily:'tangerine', fontSize:'50px'}}>Enrich Yourself</p>
                <center><span className='text-light' style={{fontFamily:'courgette', fontSize:'20px'}}>with the comfort of viewing Anywhere &amp; Anytime.</span></center>
            </div>
            <div className='col-md-6'>
                <img className='p-4 spidyImg' src={group23} alt='spiderman'/>
            </div>
        </div>
        
    </div>
  )
}

export default LandOn