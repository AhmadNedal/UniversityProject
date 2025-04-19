import axios from 'axios';
import React, { useState } from 'react';
import URL from '../DataBase';
import { useNavigate } from 'react-router-dom';



export default function LoginTeacher() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate() ;
  const [hint,setHint] = useState('');
  const [IsTeacher , SetIsaTeacher] = useState(true) ;  

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    if ( IsTeacher) {
      axios.get(`${URL}/LoginTeacher?Email=${email}&password=${password}`)
    .then((teacher)=>{
      setHint("تم تسجيل الدخول");
      localStorage.setItem("Login", "Teacher"); 
      localStorage.setItem("idTeacher", teacher.data.id); 
      navigate("/Home");
    })
    .catch(error => {
       console.log ("erroe = " , error );
       setHint("خطأ في كلمة السر او الايميل ")
    });
    }else {

      axios.get(`${URL}/LoginLeader?Email=${email}&password=${password}`)
      .then((leader)=>{
        setHint("تم تسجيل الدخول");
        localStorage.setItem("Login", "Leader"); 
        localStorage.setItem("idLeader", leader.data.id); 
        
        navigate("/Home");
      })
      .catch(error => {
         console.log ("erroe = " , error );
         setHint("خطأ في كلمة السر او الايميل ")
      });

    }
  
  };
   

  return (
    <>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700"> Login A {IsTeacher?"Teacher" : "Manager"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setHint("")
                setEmail(e.target.value)
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>{
                setPassword(e.target.value)
                setHint("")
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
                <p className='text-xs text-center mt-4 text-gray-600'>{hint}</p>
          <button
          className='hover:underline hover:text-blue-950 text-blue-700' 
          style={{textAlign:"center" , width:"100%" , marginTop:"13px" , fontSize:"12px" }} onClick={()=>{
            SetIsaTeacher(!IsTeacher); 

          } }>تسجيل الدخول ك{!IsTeacher?"معلم" :"مدير"}</button>

          
        </form>
      </div>
    </div>
    </>

  );
}
