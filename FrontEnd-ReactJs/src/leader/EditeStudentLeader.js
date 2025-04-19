import React, { useState } from 'react'
import StudentHeader from '../AllHeader/StudentHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import { major } from '../Shared';
import CheackLeader from './CheckLeader';

function EditeStudentLeader() {

  const StudentInfo =JSON.parse(localStorage.getItem("EditeStudentJSON")); 
  const [Students, setStudents] = useState({name :StudentInfo.name , major:StudentInfo.major,email: StudentInfo.email ,password: StudentInfo.password , nationalNumber:StudentInfo.nationalNumber , Tawjehi:StudentInfo.tawjehi, PlaceOfBirth: StudentInfo.placeOfBirth , placeHome:StudentInfo.placeHome} );
  const[ Login , setLogin ] = useState(false); 
  const [Loading,setLoading] = useState(false); 
  const [error,setError] = useState(""); 
  const [user,setUser] = useState([]) ;
  const navigate = useNavigate();

  if (CheackLeader()){
    navigate("/NotAccess") ;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true) ;
    
    
    await axios.put(`${URL}/api/Students/${StudentInfo.id}`, Students, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(()=>{
        navigate("/AllStudent");
        setLoading(false);
      }).catch((err)=>{
        console.log ("err = " , err ) ;
        setLoading(false);

    });
  


    
  };
   
  
  
  if (Loading)   {
    return <LoadingPage/>
  }


  
return (
  <div className="flex p-10  items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700"> تعديل بيانات طالب</h2>
      <form onSubmit={(e)=>{
         handleSubmit(e);
        }}>

          <input
            type="text"
            placeholder="الاسم"
            value={Students.name}
            onChange={(e) =>{
              setStudents({ ...Students,name:e.target.value });
              setError("") ; 
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />


<input
            type="email"
            placeholder="الايميل"
            value={Students.email}
            onChange={(e) =>{
              setStudents({ ...Students, email: e.target.value });
              setError("") ; 
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none mb-4 focus:ring-2 focus:ring-indigo-500"
            required
          />


          <input
            type="text"
            placeholder="مكان الولادة"
            value={Students.PlaceOfBirth}
            onChange={(e) =>{
              setStudents({ ...Students,PlaceOfBirth:e.target.value });
              setError("") ; 
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="text"
            placeholder="مكان السكن "
            value={Students.placeHome}
            onChange={(e) =>{
              setStudents({ ...Students,placeHome:e.target.value });
              setError("") ; 
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />



                
      <input
            type="number"
            placeholder="الرقم الوطني"
            value={Students.nationalNumber}
            onChange={(e) =>{
              setStudents({ ...Students,nationalNumber:e.target.value });
              setError("") ; 
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />


        <input
            type="number"
            min={50}
            max={100}
            step={0.01}
            placeholder="معدل التوجيهي "
            value={Students.Tawjehi}
            onChange={(e) =>{
              setStudents({ ...Students,Tawjehi:e.target.value });
              setError("") ; 
            }}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />




        
          
          


        <h3 className='text-center mb-3'>التخصص</h3>
        <select className='mb-5' name="" id="" onChange={(e)=>{
          setStudents({...Students , major:e.target.value});}}
        >
          {
            major.map((e , index)=>{
              return ( 
                <option value={index}>{e}</option>
              )
            })}
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>




        <p className=' text-xs text-red-600 text-center mt-3' >{error}</p>

      </form>
    </div>
  </div>
);

}


export default EditeStudentLeader; 
