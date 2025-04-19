import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import TeacherHeader from '../AllHeader/TeacherHeader';
import LeaderHeader from '../AllHeader/LeaderHeader';
import { CheackTeacher } from '../leader/CheckLeader';

export default function ShowCourse() {
  const location = useLocation();
  const [Student, setStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ; 

  const { course } = location.state || {};

  if (CheackTeacher()){
      navigate("/NotAccess") ;
  }
    

  useEffect(() => {
    setLoading(true);
    axios.get(`${URL}/api/Students/GetStudentReservedInCourse?IdCourse=${course.id}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("error = ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (<LoadingPage />);
  }

  return (
    <>
     {localStorage.getItem("Login")=="Leader" ? <LeaderHeader/>:<TeacherHeader/>} 
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        الطلاب المسجلين في الكورس: {course?.name}
      </h2>
      <div className="flex flex-col gap-4" style={{direction:"rtl"}}>
        {Student.map((student, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition cursor-pointer"
            onClick={()=>{
              localStorage.setItem("IdShowStudent",student.id);
              navigate("/ShowStudent"); 

            }}
          >
            <h3 className="text-lg font-semibold text-blue-600">{student.name}</h3>
            <p className="text-gray-700">رقم الطالب: {student.id}</p>
            <p className="text-gray-700">الإيميل: {student.email}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
