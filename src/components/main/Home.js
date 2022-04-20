/* eslint-disable */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';
import { Carousel, Dropdown } from 'react-bootstrap';
import { AiOutlineArrowDown, AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPersonFill, BsFillPlayFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [mvurl, setMvUrl] = useState('');
    const [play, setPlay] = useState({
        click : false,
        vid : ''
    });
    const [user, setUser] = useState({});
    const server_url = global.config.server_url;

    let deToken ='';
    if(localStorage.getItem('token')){
        deToken = jwt_decode(localStorage.getItem('token'));
    }
    
    useEffect(()=> {
        
        getMovies();
        getUser();

    },[]);
    
    let getUser = async () => {
        let usrRes = await axios.post(`${server_url}/getuserbyid/${deToken.subject}`);
        // console.log(usrRes);
        setUser(usrRes.data.result);
    }

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
  return (
      <Fragment>
          <div className='container-fluid boxMain'>
            <nav className="navbar sticky-top shadow m-0 p-2" style={{backgroundColor: '#0c111b'}}>
                <div className="container p-0 ">   
                    <button className='btn btn-link logoMain'>streamline</button>
                    <div className='d-flex justify-content-end'>
                        <p className='mt-2 text-light' style={{fontFamily: 'courgette'}}>welcome {user.userName}</p>
                    <Dropdown>
                    
                        <Dropdown.Toggle className='text-decoration-none' variant="none" id="dropdown-basic">
                            <BsFillPersonFill className='fs-4 text-info'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='text-center bg-light text-info'>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{localStorage.clear();navigate('/')}}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> 
                    </div>
                </div>
            </nav>
            {
                play.click ?    
                    <div className='container'  id='vidPlayer'>
                        <div className='d-flex justify-content-center align-self-baseline mt-4'>
                            <video className='vid' controls autoPlay>
                                <source src={`${mvurl}${play.vid}`}/>
                            </video>
                        </div>
                        <center><button className='btn btn-link' onClick={()=>{setPlay({click: false, vid: ''})}}><AiOutlineArrowLeft style={{color: '#34495E',fontSize:'20px'}}/></button></center>
                    </div>
                :
                <div className='container mt-4'>
                    <Carousel variant='dark' className='mt-3 p-5 pt-3 pb-3 carousel' nextIcon prevIcon>
                        {
                            movies.map((item, index)=> {
                            return  item.mv_tag === 'promo' ?
                                        <Carousel.Item key={index} style={{borderRadius: '25px'}}>
                                            <div className='row' style={{height: '25rem'}}>
                                                <div className='col-md-4 d-flex align-item-middle'>
                                                    <img className="p-2" src={`${mvurl}${item.movie.mv_titlepic}`} style={{width:"20rem", height: '25rem'}} alt="First slide"/>
                                                </div>
                                                <div className='col-md-8'>
                                                   <h1 className='fs-1 mb-3 p-3 pb-0' style={{color: 'cyan',fontFamily:'courgette'}}>{item.mv_name}</h1>
                                                        <p className='mt-5 text-light lead fs-6 '>{item.overview}</p>
                                                        <div className='d-flex m-5 '>
                                                            <button className='btn btn-outline-info btn-sm' onClick={()=>setPlay({click:true, vid : item.movie.mv_vid})} style={{width:'100px',borderRadius: '25px'}} ><BsFillPlayFill style={{fontSize: '25px'}}/></button>
                                                        </div>
                                                        <div className='d-flex justify-content-between mt-5'>
                                                            <p className="text-info"><span className='text-light'>Language: </span>{item.language}</p>
                                                            <p className="text-info"><span className='text-light'>Genre: </span>{item.mv_genre}</p>
                                                            <p className="text-info"><span className='text-light'>Year: </span>{item.mv_year}</p>
                                                        </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>:
                                    null
                        })
                    }
                </Carousel> 
                <center><p className='m-0 p-0'><AiOutlineArrowDown className='fs-4 mt-2 p-0'/></p></center>
            </div>
            }

            <p className='text-light text-center mt-3' style={{fontFamily: 'courgette'}}>More Trending</p>
            <div className='container'>
                <div className='d-flex justify-content-center flex-wrap p-0 m-0' >
                {
                    movies.map((item, index)=> {
                        return item.mv_tag === 'promo' || item.mv_tag ==='trend' ?
                                <div className="likeCard card m-2" key={index}>
                                    <button className='btn btn-link' onClick={()=>setPlay({click: true, vid: item.movie.mv_vid})}>
                                        <a href='#top'> <img className="card-img-top " src={`${mvurl}${item.movie.mv_titlepic}`} alt="Card  cap"/></a>
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
                                    <button className='btn btn-link' onClick={()=>setPlay({click: true, vid: item.movie.mv_vid})}>
                                        <a href='#top'> <img className="card-img-top " src={`${mvurl}${item.movie.mv_titlepic}`} alt="Card  cap"/></a>
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
        </div>
      </Fragment>
  )
}

export default Home