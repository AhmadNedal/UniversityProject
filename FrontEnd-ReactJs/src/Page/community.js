import React, { useEffect, useState } from 'react'
import StudentHeader from '../AllHeader/StudentHeader'
import Post from './Post'
import { useLocation, useNavigate } from 'react-router-dom';
import LoginPage from '../Studnet/Login';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import LeaderHeader from '../AllHeader/LeaderHeader';
import { CheackAll } from '../leader/CheckLeader';

export default function Community() {

  const navigate = useNavigate() ;

    const [Loading, setLoading] = useState(false);
    const [posts , setPosts] = useState([]); 
    const [postsLike , setPostsLike] = useState([]); 
    const IdStudent = localStorage.getItem("IdStudent"); 

  
    
      useEffect(() => {
        setLoading(true);
    
        fetch(`${URL}/GetAllPosts`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(postss => {
            const newnew = postss.reverse();
            setPosts(()=>newnew);

            fetch(`${URL}/StudentLike?idStudent=${IdStudent}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(postssLike => {
              setPostsLike(()=>postssLike);
              setLoading(false);
            })
            .catch(err => {
              setLoading(false);
              console.log("Post Like Error ");
            });
        },[]).catch(err => {
            setLoading(false);
            console.log("Error: ", err);
          });


      },[])
    

      if (CheackAll()){
        navigate("/NotAccess") ;
      }
      
  

  return (
    <div>
       {localStorage.getItem("Login")=="Leader"? <LeaderHeader/>:<StudentHeader/>} 
      <div >
      <h1 className='text-center text-2xl m-2'>أبرز منشورات الطلبة</h1>
      
      <div className='w-full flex justify-center' >
        
      {localStorage.getItem("Login")=="Leader"? <></>:
      <button 
      className='bg-slate-700 text-white rounded-md px-6 mt-4 mb-8 py-2 hover:bg-slate-500 hover:text-white ' style={{transition:"0.1s"}}
      onClick={()=> {
        navigate("/AddPost");
      }}
    
    >اضافة منشور</button>}
      
      </div>

   {Loading?<LoadingPage/>:(
    posts.map((post, index) => (
      <Post post={post} Likes={postsLike} />      
    ))
  )
}

      </div>


      
    </div>
  )
}
