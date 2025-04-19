import React, { useEffect, useState } from 'react'
import TeacherHeader from '../AllHeader/TeacherHeader'
import axios from 'axios';
import URL from '../DataBase';
import { major, TimeList } from '../Shared';
import { useNavigate } from 'react-router-dom';
import { CheackTeacher } from '../leader/CheckLeader';

export default function Lecture() {

  const IdTeacher = localStorage.getItem("idTeacher");
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();  
  
  if (CheackTeacher()){
    navigate("/NotAccess") ;
  }
  

  useEffect(() => {
    axios.get(`${URL}/api/Courses/GetCourseTeacher/${IdTeacher}`)
      .then((coursee) => {
        console.log("course=  ", coursee.data);
        setCourse(coursee.data);
      })
      .catch(error => {
        console.log("error = ", error);
      });
  }, []);

  return (
    <>
      <TeacherHeader />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">المحاضرات</h1>

        {loading ? (
          <h1 className="text-center text-xl text-gray-500">جاري التحميل...</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.map((e, idx) => (
              <div onClick={()=>{
                navigate("/ShowCourse" , {state:{
                  course : e
                }}) 
              }} key={idx} className="bg-white cursor-pointer rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{e.name}</h2>
                <p  className="text-gray-700 mb-1">عدد الطلاب: <span className="font-medium">{e.numberOfStudent}</span></p>
                <p  className="text-gray-700 mb-1">التخصص: <span className="font-medium">{major[e.major]}</span></p>
                <p  className="text-gray-700">الوقت: <span className="font-medium">{TimeList[e.time].time}</span> - <span className="font-medium">{TimeList[e.time].day}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
