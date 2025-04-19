import React, { useEffect, useState } from 'react';
import { major } from '../Shared';
import axios from 'axios';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import TeacherHeader from '../AllHeader/TeacherHeader';
import { CheackTeacher } from '../leader/CheckLeader';
import { useNavigate } from 'react-router-dom';

export default function ProfileTeacher() {
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const IdTeacher = localStorage.getItem("idTeacher"); 
  
  if (CheackTeacher()){
    navigate("/NotAccess") ;
  }
  

  useEffect(() => {

    setLoading(true);
    axios.get (`${URL}/api/Students/GetTeacherById?IdTeacher=${IdTeacher}`)
    .then((userr)=>{
      setUser(userr.data);
      setLoading(false);
    }).catch((err)=>{
      console.log("Error: ", err);
    })
  }, [IdTeacher]);

  if (Loading) {
    return <LoadingPage/>
  }

  if (!User) {
    return <h1 className="text-center text-xl font-semibold mt-4">لم يتم العثور على دكتور</h1>;
  }

  return (
    <>
      <TeacherHeader />
      <div style={{direction:"rtl"}} className="flex my-12 justify-center items-center w-full">
        <div
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            className="rounded-full w-24 h-24 mb-4"
            src="https://medcomplete.org/wp-content/uploads/2023/06/MedComplete-Staff-2.png"
            alt="Student Avatar"
          />

          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">معلومات الدكتور</h1>

          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>الاسم:</strong></p>
              <p className="text-gray-600">{User.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>البريد الإلكتروني:</strong></p>
              <p className="text-gray-600">{User.email}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>دكتوراه في:</strong></p>
              <p className="text-gray-600">{major[User.major]}</p>
            </div>

          </div>
      
        </div>
      
      </div>
    </>
  );
}
