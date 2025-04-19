import React, { useState } from 'react'
import StudentHeader from '../AllHeader/StudentHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import { CheackAll } from '../leader/CheckLeader';

function EditeStudent() {
  const location= useLocation() ; 
  const { User } = location.state || {}; 
  const navigate = useNavigate() ;
  localStorage.setItem("Student" , JSON.stringify(User) ); 


  const [oldPass , setOldPass ] = useState("") ; 
  const [pass1 , setpass1 ] = useState("") ; 
  const [pass2 , setpass2 ] = useState("") ; 
  const [hint , setHint ] = useState("") ; 
  
  if (CheackAll()){
    navigate("/NotAccess") ;
  }
  

  const handelClick = ()=>{ 

    if ( User.password != oldPass) {
      
      setHint("كلمة السر القديمة غير صحيحة")
    }else 
      if ( pass1!=pass2 ) {
        setHint("كلمة السر غير متطابقتين")
      }else if (pass1.length <8 ){
        
        setHint("كلمة المرور يجب ان تكون اكثر من 8 أحرف")
      }else {
        setHint(""); 

        const newUser = {...User}; 
        newUser.password = pass1 ; 

      axios.put(`${URL}/api/Students/${User.id}` , {
        id:User.id,
        name: User.name,
        major: User.major,
        email: User.email,
        password:pass1,
        nationalNumber: User.nationalNumber,
        tawjehi: User.tawjehi,
        placeOfBirth:User.placeOfBirth,
        placeHome: User.placeHome

      })
      .then(()=> {

        setHint("تم تعديل كلمةالمرور بنجاح"); 
        setpass1("");
        setpass2("");
        setOldPass("");
      
      })
      .catch(error => {
         console.log ("erroe = " , error )
      });



      }
  }

  
  return (
    <>
    <StudentHeader/>
    <div className='flex-col flex items-center mt-10'>

    <div style={{
      borderRadius: "10px",
      boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.3)",
    }} className='py-16 px-16 flex-col flex items-center gap-2' >

      <h1 className='text-center mb-5 text-slate-700' >تعديل كلمة السر</h1>    
      
        
    <input value={oldPass} onChange={(e)=>{
        setOldPass(e.target.value) 
        setHint(""); 
      }} type="password" placeholder='كلمة السر القديمة' style={{border:"solid 2px #b4b3a9", direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
      


      <input value={pass1} onChange={(e)=>{
        setpass1(e.target.value) 
        setHint(""); 
      }} type="password" placeholder='كلمة السر الجديدة' style={{border:"solid 2px #b4b3a9", direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
  
      <input value={pass2} onChange={(e)=>{
        setpass2(e.target.value); 
        setHint(""); 
        }} type="password" placeholder='تأكيد كلمة السر' style={{border:"solid 2px #b4b3a9", direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
      
      <p className='text-xs text-gray-500 mt-1'>{hint}</p>
      <button onClick={handelClick} className='bg-slate-600 w-full mt-2 text-white px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700'>تعديل </button>


    </div>
    </div>
    </>
  )
}


export default EditeStudent; 
