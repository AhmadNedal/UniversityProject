import axios from 'axios';
import React, { useEffect, useState } from 'react'
import URL from '../DataBase';
import LoadingPage from '../Loading';
import { major } from '../Shared';
import { useNavigate } from 'react-router-dom';
import LeaderHeader from '../AllHeader/LeaderHeader';
import CheackLeader from './CheckLeader';

function AllStudent() {

  const [Student,setStudent] = useState([]); 
  const [orginal,setOrginal] = useState([]); 
  const [Loading,setLoading]=useState(false);

  const navigate = useNavigate();
  

  
  if (CheackLeader()){
    navigate("/NotAccess") ;
  }

  useEffect(()=> {

    setLoading(true);

    axios.get(`${URL}/api/Students/All`)
    .then((student)=>{
        setStudent (student.data) ;
        setOrginal (student.data) ;
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
               placeholder="للبحث عن طالب"
              onChange={(e) => {
                let newArray = orginal.filter((ee)=>  ee.name.toLowerCase().includes(e.target.value.toLowerCase())              )
                setStudent(newArray)
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
    }}>
      {
        Student.map((student, index) => (
          <div key={index} style={{
            background: "#ffffff",
            borderRadius: "20px",
            width: "260px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          className=' hover:-translate-y-2.5 flex justify-center items-center flex-col'

        
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
              {student.name}
            </h2>
            <p style={{ fontSize: "15px", color: "#777" }}>ID: {student.id}</p>
            <p style={{ fontSize: "14px", color: "#aaa", marginTop: "5px" }}>تخصص: {major[student.major]}</p>
        
      <div >
        <div className="mt-6 flex   justify-center gap-2">
      <button
        onClick={(ee) => {
          ee.stopPropagation();
          DeleteStudent(student.id) ;
          let newArray = [];
          newArray = Student.filter((eee)=>eee.id!=student.id) ; 
          setStudent(newArray) ;  
        }}

        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
      >
        حذف
      </button>

      <button
        onClick={(ee) => {
          ee.stopPropagation();
          localStorage.setItem("EditeStudentJSON",JSON.stringify(student)); 
          navigate("/EditeStudentLeader");
        }}
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm"
      >

        تعديل
      </button>

      <button
        onClick={(ee) => {
          ee.stopPropagation();
          localStorage.setItem("IdShowStudent", student.id) ;
          navigate("/ShowStudent")
    }}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
      >
        عرض
      </button>
      </div>

      <button
        onClick={(ee) => {
          ee.stopPropagation();
          localStorage.setItem("IdStudent", student.id) ;
          navigate("/tableStudnet")
    }}
        className="bg-slate-500 mt-2 flex   justify-center gap-2 w-full hover:bg-slate-600 text-white px-4 py-2 rounded-md text-sm"
      >
        تعدل الجدول
      </button>
      
    </div>

        
          </div>
        ))
      }

      
    </div>
    </>
    
  )
}

export default AllStudent

