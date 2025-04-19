import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import { CheackAll } from '../leader/CheckLeader';

export default function Post({post,Likes}) {


  const [IsLike, setIsLike] = useState(false);
  const [numberOFLike ,setnumberOFLike ]= useState(post.numberLikes) ; 
  const IdStudent = localStorage.getItem("IdStudent"); 
  const ItIsLeader = localStorage.getItem("ItIsLeader"); 
  const navigate = useNavigate() ;

  if (CheackAll()){
    navigate("/NotAccess") ;
  }

useEffect(()=>{
  for (let i=0 ; i <Likes.length; ++i) {
    if ( Likes[i].postId == post.postId ) {
      setIsLike(true ) ; 
    }
  }
},[])


  const handleLike = () => {
    if (IsLike) {

    axios.delete(`${URL}/RemoveLike?idStudent=${IdStudent}&idPost=${post.postId}`)
      .then(()=> {
        setIsLike(!IsLike ); 
        setnumberOFLike(()=>numberOFLike-1) ;

      })
      .catch(error => {
         console.log ("erroe = " , error )
      });


    }else {

      axios.post(`${URL}/AddLike?idStudent=${IdStudent}&idPost=${post.postId}`)
      .then(()=> {
        setIsLike(!IsLike ); 
        setnumberOFLike(()=>numberOFLike+1) ;
      })
      .catch(error => {
         console.log ("erroe = " , error )
      });


    }
  };


  const DeletePost =()=> {
    axios.delete(`${URL}/DeletePost${post.postId}`)
    .then(()=> {
        window.location.reload(); 
    })
    .catch(error => {
       console.log ("erroe = " , error )
    });
  }


  return (
    <div dir='rtl' className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4 mb-4">

      <div className='flex justify-between items-start'>
      <div onClick={()=>{
        localStorage.setItem("Show", "true") ;
        localStorage.setItem("IdShow" , post.idStudent)

        navigate("/info"); 

      }} className="flex items-center cursor-pointer mb-3">
        <div className="w-12  h-12 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold">
        {post.nameStudent[0]}
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-semibold text-gray-800">{post.nameStudent}</h3>
          <p className="text-sm text-gray-500">@{post.idStudent}</p>
        </div>
      </div>
      <p className='text-gray-500 text-sm'> {new Date(post.createAt).toLocaleString()}</p>
      </div>

      <div className="mb-2">
        <h4 className="text-lg font-semibold text-gray-800">{post.header}</h4>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">
        {post.content}
          </p>
      </div>

      <div className='flex justify-between'>
      <div className="flex items-center space-x-2">
        <button 
          className="ml-2 font-bold text-blue-500 hover:text-blue-700"
          onClick={handleLike}
        >
         {IsLike ?  "الغاء الاعجاب" : "إعجاب"}  
        </button>
        <span className="text-gray-500 text-sm">{numberOFLike} معجبين</span>
      </div>

      { IdStudent == post.idStudent || ItIsLeader||localStorage.getItem("Login")=="Leader"   ?(

        <button class="bg-red-600 text-white py-1 px-3  rounded-lg hover:bg-red-700 active:scale-95 transition-all"
        onClick={DeletePost}
        >
          حذف المنشور 
        </button>


      )  : <></> }
    
    </div>
    </div>
  )
}
