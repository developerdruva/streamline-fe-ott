{
    "mv_name": "",
    "mv_id" : "vid001",
    "language" : "ENG",
    "movie": {
        "mv_vid" : "",
        "mv_titlepic": "",
        "mv_poster": "",
    }
    "mv_genre": "U",
    "votes" : {
        "likes" : 0,
        "dislikes" : 0
    },
    "mv_year" : "2016",
    "overview" : "this is a sample movie with is streaming on our ott platform"
}
<div className='p-5 pb-2 text-center mt-5 text-light mb-4'>
                    <p className='' style={{fontFamily:'courgette', fontSize:'30px'}}>Unlimited movies, TV shows and more.</p>
                    <form onSubmit={submitHandler}>
                        <center>Email</center>
                        <div><input type='email' id='email' placeholder='email id' className='mt-2 text-center text-light' onChange={(event)=>setEmail({...email, email:event.target.value})} /></div>
                        <button className='btn btn-link text-decoration-none text-warning mt-3 ' type='submit' >Sign Up</button>
                    </form>
                    <p className='lead fs-6 text-info'>or</p>
                </div>