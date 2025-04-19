import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URL from '../DataBase';
import LoadingPage from '../Loading';
import { major } from '../Shared';
import { useNavigate } from 'react-router-dom';
import LeaderHeader from '../AllHeader/LeaderHeader';
import CheackLeader from './CheckLeader';

function AllDoctor() {

  const [Teacher,setTeacher] = useState([]); 
  const [orginal,setOrginal] = useState([]); 
  const [Loading,setLoading]=useState(false);

  const navigate = useNavigate();
  
  
  if (CheackLeader()){
    navigate("/NotAccess") ;
  }

  useEffect(()=> {

    setLoading(true);

    axios.get(`${URL}/api/Students/AllTeacher`)
    .then((Teache)=>{
        setTeacher (Teache.data) ;
        setOrginal (Teache.data) ;
        setLoading(false);
        
      })
      .catch(error => {
        setLoading(false);
        console.log ("erroe = " , error );
    });
  },[])


  const DeleteStudent = (id)=> {
    axios.delete(`${URL}/api/Students/${id}`)
    .then(() => {        
    })
    .catch(error => {
      console.log("error = ", error);
    });
  }



  if(Loading) return <LoadingPage/>

  return (<>

    <LeaderHeader/>
    <div className='mt-10 mb-10 flex justify-center items-center'>
      
      <input type="text" 
               placeholder="للبحث عن دكتور"
              onChange={(e) => {
                let newArray = orginal.filter((ee)=>  ee.name.toLowerCase().includes(e.target.value.toLowerCase())              )
                setTeacher(newArray)
              }}
              className="px-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
        />


        

    </div>
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
      justifyContent: "center",
      padding: "40px"
    }} >
      {
        Teacher.map((teacher, index) => (
          <div key={index} style={{
            background: "#ffffff",
            borderRadius: "20px",
            width: "260px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onClick={(ee) => {
            ee.stopPropagation();
            localStorage.setItem("idTeacher", teacher.id) ;
            navigate("/ProfileTeacher")
        }}
          className=' hover:-translate-y-2.5 flex justify-center items-center cursor-pointer flex-col'

        
          >
            <img
              src="https://th.bing.com/th/id/OIP._hoh1FRRY5da-7OYqsPiFwHaHa?rs=1&pid=ImgDetMain"
              alt="Student"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                marginBottom: "15px",
                objectFit: "cover"
              }}
            />
            <h2 style={{ fontSize: "20px", fontFamily: "Cairo, sans-serif", color: "#2c3e50" }}>
              {teacher.name}
            </h2>
            <p style={{ fontSize: "15px", color: "#777" }}>ID: {teacher.id}</p>
            <p style={{ fontSize: "14px", color: "#aaa", marginTop: "5px" }}>تخصص: {major[teacher.major]}</p>
        
      

        
          </div>
        ))
      }

      
    </div>
    </>
    
  )
}

export default AllDoctor

