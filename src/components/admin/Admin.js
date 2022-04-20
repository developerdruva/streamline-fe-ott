/* eslint-disable */
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from "react/cjs/react.development";
import { Fragment } from "react/cjs/react.production.min";
import '../styles/admin.css';
import Movies from './Movies';
import Users from './Users';

export function Admin(props) {
    const [mvModal, setMvModal] = useState(false);
    const navigate = useNavigate(); 
    const [movies, setMovies] = useState([]);
    const [comp, setComp] = useState('');
    const [users, setUsers] = useState([]);
    const server_url = global.config.server_url;

    const [mvForm, setMvForm] = useState({
        mv_name: "",
        mv_id : "",
        language : "",
        mv_poster: "",
        mv_vid : "",
        mv_titlepic: "",
        mv_genre: "",
        mv_year : "",
        overview : "",
        mv_tage : ""
    });
    
    let mvSubmit = async (event) => {
        event.preventDefault();
        // console.log('form mv', mvForm);
        let mvform = {
            mv_name: mvForm.mv_name,
            mv_id : mvForm.mv_id,
            language : mvForm.language,
            movie : {
                mv_poster: mvForm.mv_poster,
                mv_vid : mvForm.mv_vid,
                mv_titlepic: mvForm.mv_titlepic
            },
            votes : {
                likes : 0,
                dislikes : 0
            },
            mv_genre: mvForm.mv_genre,
            mv_year : mvForm.mv_year,
            overview : mvForm.overview,
            mv_tag : mvForm.mv_tag
        }
        let mvRes = await axios.post(`${server_url}/addmovie`, mvform);
        // console.log("mvres", mvRes);
        if(mvRes.data.status){
            alert('movie added')
        }else{
            alert(mvRes.data.message)
        }
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
    useEffect(()=>{
        getMovies();
        getUsers();
    },[])
    
    let getUsers = async ()=>{
        let res =await axios.get(`${server_url}/getusers`);
        setUsers(res.data.data);
        // console.log(users, '-------');
    }
    return (
        <Fragment>
            <div className="container-fluid p-0 boxMain">
                <nav className="navbar sticky-top shadow " style={{backgroundColor: '#0c111b'}}>
                    <div className="container p-0 ">   
                        <p className='nav-brand mt-3 text-info fs-4' style={{fontFamily:'audiowide'}}>streamline</p>
                        <ul className="admNav nav ">
                            <li className="nav-item ">
                                <Button variant='btn-link' className="nav-link" onClick={()=>setComp('dashboard')}>Dashboard </Button>
                            </li>
                            <li className="nav-item">
                                <Button variant='btn-link' className="nav-link" onClick={()=>setComp('movies')}>Movies</Button>
                            </li>
                            <li className="nav-item">
                                <Button variant='btn-link' className="nav-link" onClick={()=>setComp('users')}>Users</Button>
                            </li>
                                <li className="nav-item">
                                <Button variant='btn-link' className="nav-link" onClick={()=>{localStorage.clear();navigate('/')}}>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className='container  mt-2 p-5 '>
                    {
                        comp === 'dashboard' ?
                            <div className='row dashCard'>
                        <div className='col-md-4 d-flex justify-content-center'>
                            <div className="card border-0 border-bottom border-info" style={{width: '15rem', height:"16rem"}}>
                                <div className="card-body " style={{backgroundColor: '#152D45'}}>
                                    <h5 className="card-title text-center text-info p-3 pl-0 pb-0">Movies</h5>
                                    <p className="card-text text-center text-secondary ">This is sample ott platform for learning purpose to explore our website.</p>
                                    <center><button onClick={()=>setMvModal(true)} className="btn btn-outline-info btn-sm">Add Movie</button></center>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 d-flex justify-content-center'>
                            <div className="card border-0 border-bottom border-info" style={{width: '15rem', height:"16rem"}}>
                                <div className="card-body " style={{backgroundColor: '#152D45'}}>
                                    <h5 className="card-title text-center text-info p-3 pl-0 pb-0">Movies</h5>
                                    <h1 className="card-text text-center text-secondary display-1 mb-4">{movies.length}</h1>
                                    <center><button onClick={()=>setComp('movies')} className="btn btn-outline-info btn-sm mt-2">View</button></center>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 d-flex justify-content-center'>
                            <div className="card border-0 border-bottom border-info" style={{width: '15rem', height:"16rem"}}>
                                <div className="card-body " style={{backgroundColor: '#152D45'}}>
                                    <h5 className="card-title text-center text-info p-3 pl-0 pb-0">Users</h5>
                                    <p className="card-text text-center text-secondary display-1 mb-4">{users.length}</p>
                                    <center><button onClick={()=>setComp('users')} className="btn btn-outline-info mt-2 btn-sm">View</button></center>
                                </div>
                            </div>
                        </div>
                    </div> :
                    comp === 'movies' ?
                        <Movies/> :
                    comp === 'users' ?
                        <Users/>:
                    setComp('dashboard')
                    }
                </div>

            </div>


            
        <Modal show={mvModal} onHide={()=>setMvModal(false)}>
            <Modal.Header className="lead text-info bg-dark" closeButton closeVariant='btn btn-sm btn-info'>Add New Movie</Modal.Header>
            <Modal.Body className="text-info bg-dark" align='center'>
                    <Form onSubmit={mvSubmit} className='text-secondary '>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, mv_name : event.target.value})} placeholder="movie name" id='mvname' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, mv_id : event.target.value})} placeholder="movie id" id='mvid' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, language : event.target.value})} placeholder="language" id='lang' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Genre</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, mv_genre : event.target.value})} placeholder="movie genre" id='genre' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Year</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, mv_year : event.target.value})} placeholder="movie year" id='mvyear' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Poster</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setMvForm({...mvForm, mv_poster : event.target.value})} placeholder="poster url" id='posterurl' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setMvForm({...mvForm, mv_titlepic : event.target.value})} placeholder="pic url" id='pic url' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Video</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setMvForm({...mvForm, mv_vid : event.target.value})} placeholder="video url" id='vid url' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Tag</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, mv_tag : event.target.value})} placeholder="is it promo or normal?" id='mvtag' required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Overview</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setMvForm({...mvForm, overview : event.target.value})} placeholder="overview" id='overview' required/>
                        </Form.Group>
                        
                        <center>
                            <Button variant="outline-info mt-2 me-2" type="submit"  onClick={()=>setMvModal(false)}>Submit</Button>
                            <Button variant="outline-info mt-2" onClick={()=>setMvModal(false)}>Back</Button>
                        </center>
                    </Form>
                </Modal.Body>
        </Modal>
        </Fragment>
    )
}

export default Admin;