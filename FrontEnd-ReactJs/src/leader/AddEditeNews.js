import React, { useState } from 'react'
import LeaderHeader from '../AllHeader/LeaderHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../DataBase';
import CheackLeader from './CheckLeader';

function AddEditeNews() {

  let EditeOrAddNews = localStorage.getItem("EditeOrAddNews");
  const location = useLocation() ; 
  
  const { headerr, descriptionn ,id } = location.state || {};
  const [header,setHeader] = useState(headerr); 
  const [description,setDescription] = useState(descriptionn); 

EditeOrAddNews = EditeOrAddNews=="Edite";
const navigate = useNavigate() ;


  if (CheackLeader()){
    navigate("/NotAccess") ;
  }

const HandelAddPost =()=> {

  if (EditeOrAddNews) {

      axios.put(`${URL}/UpdateNews?Id=${id}&Header=${header}&Description=${description}`)
    .then(()=> {
      navigate("/AllNews"); 
    })
    .catch(error => {
      console.log ("erroe = " , error )
    });
    
  }else {
    
  axios.post(`${URL}/AddNews?Header=${header}&Description=${description}`)
  .then(()=> {
    navigate("/AllNews"); 
  })
  .catch(error => {
     console.log ("erroe = " , error )
  });
  }
}



return (
  <>
  <LeaderHeader/>
  <div className='flex-col flex items-center mt-10 mb-12'>

  <div style={{
    borderRadius: "10px",
    boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.3)",
  }} className='py-16 px-16 flex-col flex items-center gap-2' >

    <h1 className='text-center text-2xl mb-5 text-slate-700' >{EditeOrAddNews ? "تعديل خبر" : "إضافة خبر"} </h1>    
    
      
  <input  value={header} onChange={(e)=>{
      setHeader(e.target.value) ; 
    }} type="text" placeholder='العنوان' style={{border:"solid 2px #b4b3a9", width:"450px" , height:"50px" , direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
    


    <textarea value={description}  onChange={(e)=>{
        setDescription(e.target.value);
      }} type="password" placeholder='التفاصيل' style={{border:"solid 2px #b4b3a9", width:"450px" , minHeight:"150px" ,direction:"rtl" , paddingRight:"10px"}} className='rounded-sm '/>
    

    <button onClick={HandelAddPost}  className='bg-slate-600 w-full mt-2 text-white px-4 py-2 rounded-md hover:bg-slate-300 hover:text-slate-700'>{EditeOrAddNews ? "تعديل " : "إضافة "}</button>


  </div>
  </div>
  </>
)
}

export default AddEditeNews


