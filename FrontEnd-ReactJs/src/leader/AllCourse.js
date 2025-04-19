import React, { useEffect, useState } from 'react'
import TeacherHeader from '../AllHeader/TeacherHeader'
import axios from 'axios';
import URL from '../DataBase';
import { major, TimeList } from '../Shared';
import { useNavigate } from 'react-router-dom';
import LeaderHeader from '../AllHeader/LeaderHeader';
import CheackLeader from './CheckLeader';
import LoadingPage from '../Loading';
import NotAccess from '../NotAcces';

export default function AllCourse() {

  const [course, setCourse] = useState([]);
  const navigate = useNavigate();  

  if (CheackLeader()){
    navigate("/NotAccess") ;
 }
 
  useEffect(() => {
    axios.get(`${URL}/api/Courses/AllCourse`)
      .then((coursee) => {
        setCourse(coursee.data);
      })
      .catch(error => {
        console.log("error = ", error);
      });
  }, []);


 
   
  const DeleteCourse = (id)=>{
    axios.delete(`${URL}/api/Courses/${id}`)
    .then(() => {
    })
    .catch(error => {
      console.log("error = ", error);
    });
  }

  return (
    <>
       {localStorage.getItem("Login")=="Leader" ? <LeaderHeader/>:<TeacherHeader /> }

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">المحاضرات</h1>

        {<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.map((e, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{e.name}</h2>
                <p  className="text-gray-700 mb-1">عدد الطلاب: <span className="font-medium">{e.numberOfStudent}</span></p>
                <p  className="text-gray-700 mb-1">التخصص: <span className="font-medium">{major[e.major]}</span></p>
                <p  className="text-gray-700">الوقت: <span className="font-medium">{TimeList[e.time].time}</span> - <span className="font-medium">{TimeList[e.time].day}</span></p>
                
      <div className="mt-6 flex   justify-center gap-2">
      <button
        onClick={(ee) => {
          ee.stopPropagation();
          DeleteCourse(e.id) ;
          let newArray = [];
          newArray = course.filter((eee)=>eee.id!=e.id) ; 
          setCourse(newArray) ;  
        }}

        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
      >
        حذف
      </button>

      <button
        onClick={(ee) => {
          ee.stopPropagation();
          // localStorage.setItem("EditeStudentJSON",JSON.stringify(student)); 
          const SendCourse = {
              id:e.id, 
              name: e.name,
              major: e.major, 
              numberOfStudent:e.numberOfStudent,
              idTeacher: e.idTeacher,
              maxStudent:e.maxStudent,
              time:e.time,
              nameOfTeacher:e.nameOfTeacher
          }

          navigate("/EditeCourse", { state: { SendCourse } });

        }}
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm"
      >

        تعديل
      </button>

      <button
        onClick={()=>{
          navigate("/ShowCourse" , {state:{
            course : e
          }}) 
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
      >
        عرض
      </button>
    </div>

    
              
              </div>
              
            ))}
          </div>
        }

        

<div className='flex justify-center items-center m-10'>
    <button
          onClick={(ee) => {
            ee.stopPropagation();
             
            navigate("/AddCourse");

          }}
          className="bg-slate-500 h-14 w-80 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm"
        >
          اضافة كورس
        </button>
        </div>
    

      </div>

    </>
  );
}
