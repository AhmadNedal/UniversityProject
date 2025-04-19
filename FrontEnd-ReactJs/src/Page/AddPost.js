import React, { useState } from 'react'
import StudentHeader from '../AllHeader/StudentHeader'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import { CheackStudent } from '../leader/CheckLeader';


export default function AddPost() {
const [header,setHeader] = useState(""); 
const [description,setDescription] = useState(""); 
const User = JSON.parse(localStorage.getItem("Student")); 
const navigate = useNavigate() ;


const HandelAddPost =()=> {

  axios.post(`${URL}/AddPost?IdStudent=${User.id}&header=${header}&content=${description}&NameStudent=${User.name}`)
  .then(()=> {
    navigate("/Community"); 
  })
  .catch(error => {
     console.log ("erroe = " , error )
  });
}


if (CheackStudent()){
  navigate("/NotAccess") ;
}
  
  return (
    <>
    <StudentHeader/>
    <div className='flex-col flex items-center mt-10'>

    <div style={{
      borderRadius: "10px",
      boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.3)",
    }} className='py-16 px-16 flex-col flex items-center gap-2' >

      <h1 className='text-center text-2xl mb-5 text-slate-700' >إضافة منشور</h1>    
      
        
    <input value={header} onChange={(e)=>{
        setHeader(e.target.value) ; 
      }} type="text" placeholder='العنوان' style={{border:"solid 2px #b4b3a9", width:"300px" , direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
      


      <textarea value={description}  onChange={(e)=>{
          setDescription(e.target.value);
        }} type="password" placeholder='التفاصيل' style={{border:"solid 2px #b4b3a9", width:"300px", minHeight:"120px" ,direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
      
      {/* <p className='text-xs text-gray-500 mt-1'>{hint}</p> */}
      <button onClick={HandelAddPost} className='bg-slate-600 w-full mt-2 text-white px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700'>نشر</button>


    </div>
    </div>
    </>
  )
}
