import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StudentHeader from "../AllHeader/StudentHeader";
import TeacherHeader from "../AllHeader/TeacherHeader";
import LeaderHeader from "../AllHeader/LeaderHeader";
import { CheackAll } from "../leader/CheckLeader";

export default function ShowPost() {
  const location = useLocation();
  const { News } = location.state;
  const login = localStorage.getItem("Login");
  const navigate = useNavigate(); 
  
  if (CheackAll()){
    navigate("/NotAccess") ;
  }
  
  
  
  return (
<>

  {login=="Leader"? <LeaderHeader/>:login=="Student"?<StudentHeader/>:<TeacherHeader/>}  
            
            
            
    <div className="max-w-3xl mb-16 flex justify-center flex-col items-center mx-auto mt-12 p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
      <p className="text-sm text-gray-600 mb-2">
        {new Date(News.date).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        {News.header}
      </h1>
      <p className="text-gray-700 text-center leading-relaxed">{News.description}</p>
    </div>
    </>
  );
}
