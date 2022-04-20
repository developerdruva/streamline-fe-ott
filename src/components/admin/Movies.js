/* eslint-disable */
import axios from 'axios';
import React, { Fragment } from 'react'
import {  useEffect, useState } from 'react';
import { BiMoviePlay } from 'react-icons/bi';
import { Button, Form, Modal } from 'react-bootstrap';


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [mvurl, setMvUrl] = useState('');
    const [mvModal, setMvModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tempForm, setTempForm] = useState({});
    const server_url = global.config.server_url;

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
    const [editForm, setEditForm] = useState({
        mv_name: "",
        mv_id : "",
        language : "",
        mv_poster: "",
        mv_vid : "",
        mv_titlepic: "",
        mv_genre: "",
        mv_year : "",
        overview : "",
        mv_tag : ""
    });
    let editMovie = async (event) => {
        event.preventDefault();
        // console.log(editForm, '------------EDIT FORM');
        // console.log(tempForm, '------------temp FORM');
        // console.log(editForm !== tempForm);
        if(editForm !== tempForm){
            let eform = {
            mv_name: editForm.mv_name,
            mv_id : editForm.mv_id,
            language : editForm.language,
            movie : {
                mv_poster: editForm.mv_poster,
                mv_vid : editForm.mv_vid,
                mv_titlepic: editForm.mv_titlepic
            },
            votes : {
                likes : 0,
                dislikes : 0
            },
            mv_genre: editForm.mv_genre,
            mv_year : editForm.mv_year,
            overview : editForm.overview,
            mv_tag : editForm.mv_tag
        }
            let update = await axios.put(`${server_url}/updatemoviebyid`, eform);
            if(update.data.status){
                // console.log('update success')
                getMovies();
                alert(update.data.message);
            }else{
                alert('something went wrong')
            }
        }else{
            alert('no changes found in movie')
        }
    }
    let mvSubmit = async (event) => {
        event.preventDefault();
        console.log('form mv', mvForm);
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
            getMovies();
            alert('movie added')
        }else{
            alert(mvRes.data.message)
        }
    }
    let deleteMovie = async (id)=>{
        let del = await axios.delete(`${server_url}/deletemoviebyid/${id}`);
        // console.log(del, 'delete response');
        if(del.data.status){
            getMovies();
        }
    }
  return (
    <Fragment>
        <div className=''>
            <div className='d-flex justify-content-end'>
                <button onClick={()=>setMvModal(true)} className='btn btn-outline-info btn-sm'>Add Movie <BiMoviePlay/></button>
            </div>
            <p className='text-info ' style={{fontFamily: 'courgette'}}>Promo Movies</p>
            <table className="table table-hover text-secondary table-sm tablestyle" >
                <thead >
                    <tr style={{border: 'none'}}>
                        <th >#</th> 
                        <th>Movie ID</th>
                        <th >Movie Name</th>
                        <th >Language</th>
                        <th >Year</th>
                        <th >Genre</th>
                        <th >Title Pic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    movies ?
                    
                        movies.map((item,index)=>{
                        return item.mv_tag === 'promo' ?
                            <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.mv_id}</td>
                                        <td>{item.mv_name}</td>
                                        <td>{item.language}</td>
                                        <td>{item.mv_year}</td>
                                        <td>{item.mv_genre}</td>
                                        <td><img src={`${mvurl}${item.movie.mv_titlepic}`} alt='movie title' style={{width:'2rem', height: '2rem'}}/></td>
                                        <td>
                                            <div className='btn-group d-flex '>
                                                <button onClick={()=>axios.put(`http://localhost:6969/unsetpromo/${item.mv_id}`).then((res)=>{getMovies()})} className='btn btn-outline-dark me-1 btn-sm'>toNormal</button>
                                                <button onClick={()=>{setEditModal(true);setEditForm({
                                                    mv_name: item.mv_name,
                                                    mv_id: item.mv_id,
                                                    language: item.language,
                                                    mv_poster: item.movie.mv_poster,
                                                    mv_vid: item.movie.mv_vid,
                                                    mv_titlepic: item.movie.mv_titlepic,
                                                    mv_genre: item.mv_genre,
                                                    mv_year: item.mv_year,
                                                    overview: item.overview,
                                                    mv_tag: item.mv_tag
                                                })}} className='btn btn-outline-secondary me-1 btn-sm'>Edit</button>
                                                <button onClick={()=>deleteMovie(item.mv_id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                            :
                            null
                    }):
                    getMovies
                }
                </tbody>
            </table>
                <br/>
            <p className='text-info ' style={{fontFamily: 'courgette'}}>All Movies</p>
            <table className="table table-hover text-secondary table-sm tablestyle">
                <thead>
                    <tr>
                        <th >#</th> 
                        <th>Movie ID</th>
                        <th >Movie Name</th>
                        <th >Language</th>
                        <th >Year</th>
                        <th >Genre</th>
                        <th >Title Pic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    movies ?
                    
                        movies.map((item,index)=>{
                        return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.mv_id}</td>
                                        <td>{item.mv_name}</td>
                                        <td>{item.language}</td>
                                        <td>{item.mv_year}</td>
                                        <td>{item.mv_genre}</td>
                                        <td><img src={`${mvurl}${item.movie.mv_titlepic}`} alt='movie title' style={{width:'2rem', height: '2rem'}}/></td>
                                        <td>
                                            <div className='btn-group d-flex'>
                                                <button onClick={()=>axios.put(`${server_url}/setpromo/${item.mv_id}`).then((res)=>{getMovies()})} className='btn btn-outline-dark me-1 btn-sm'>toPromo</button>
                                                <button onClick={()=>{setEditModal(true);setEditForm({
                                                    mv_name: item.mv_name,
                                                    mv_id: item.mv_id,
                                                    language: item.language,
                                                    mv_poster: item.movie.mv_poster,
                                                    mv_vid: item.movie.mv_vid,
                                                    mv_titlepic: item.movie.mv_titlepic,
                                                    mv_genre: item.mv_genre,
                                                    mv_year: item.mv_year,
                                                    overview: item.overview,
                                                    mv_tag: item.mv_tag
                                                })}} className='btn btn-outline-secondary me-1 btn-sm'>Edit</button>
                                                <button onClick={()=>deleteMovie(item.mv_id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                    }):
                    getMovies
                }
                </tbody>
            </table>
        </div>


        <Modal show={mvModal} onHide={()=>setMvModal(false)}>
            <Modal.Header className="lead text-info bg-dark"  closeButton >Add New Movie</Modal.Header>
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
         <Modal show={editModal} onShow={()=>setTempForm(editForm)} onHide={()=>setEditModal(false)}>
            <Modal.Header className="lead text-info bg-dark" closeButton>Edit Movie</Modal.Header>
            <Modal.Body className="text-info bg-dark" align='center'>
                    <Form onSubmit={editMovie} className='text-secondary '>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, mv_name : event.target.value})} placeholder="movie name" defaultValue={editForm.mv_name} id='mvname'/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie ID</Form.Label>
                            <Form.Control type="text" value={editForm.mv_id} disabled placeholder="movie id" id='mvid' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, language : event.target.value})} placeholder="language" defaultValue={editForm.language} id='lang' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Genre</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, mv_genre : event.target.value})} placeholder="movie genre" defaultValue={editForm.mv_genre} id='genre' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Year</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, mv_year : event.target.value})} placeholder="movie year" defaultValue={editForm.mv_year} id='mvyear' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Poster</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setEditForm({...editForm, mv_poster : event.target.value})} placeholder="poster url" defaultValue={editForm.mv_poster} id='posterurl' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setEditForm({...editForm, mv_titlepic : event.target.value})} placeholder="pic url" defaultValue={editForm.mv_titlepic} id='pic url' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Video</Form.Label>
                            <Form.Control type="text" 
                            onChange={(event)=>setEditForm({...editForm, mv_vid : event.target.value})} placeholder="video url" defaultValue={editForm.mv_vid} id='vid url' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Tag</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, mv_tag : event.target.value})} placeholder="is it promo or normal?" defaultValue={editForm.mv_tag} id='mvtag' />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Overview</Form.Label>
                            <Form.Control type="text" onChange={(event)=>setEditForm({...editForm, overview : event.target.value})} placeholder="overview" defaultValue={editForm.overview} id='overview' />
                        </Form.Group>
                        
                        <center>
                            <Button variant="outline-info mt-2 me-2" type="submit"  onClick={()=>setEditModal(false)}>Submit</Button>
                            <Button variant="outline-info mt-2" onClick={()=>setEditModal(false)}>Back</Button>
                        </center>
                    </Form>
                </Modal.Body>
        </Modal>
    </Fragment>
  )
}

export default Movies