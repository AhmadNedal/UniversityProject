import React, { useEffect, useState } from 'react'
import axios from 'axios';
import URL from '../DataBase';
import { useNavigate } from 'react-router-dom';
import LeaderHeader from '../AllHeader/LeaderHeader';
import TeacherHeader from '../AllHeader/TeacherHeader';
import StudentHeader from '../AllHeader/StudentHeader';
import CheackLeader from './CheckLeader';

export default function AllNews() {

  const [course, setCourse] = useState([]);
  const navigate = useNavigate();  

  if (CheackLeader()){
    navigate("/NotAccess") ;
  }

  useEffect(() => {
    axios.get(`${URL}/GetAllNews`)
      .then((coursee) => {
        setCourse((coursee.data).reverse());
      })
      .catch(error => {
        console.log("error = ", error);
      });
  }, []);


  const DeleteNews = (id)=> {
      axios.delete(`${URL}/DeleteNews${id}`)
      .then(() => {        
      })
      .catch(error => {
        console.log("error = ", error);
      });
  }


  return (
    <>
     {localStorage.getItem("Login")=="Leader"?  <LeaderHeader/>: localStorage.getItem("Login")=="Teacher"? <TeacherHeader/>: <StudentHeader/>}   

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">اخبار الجامعة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
  {course.map((e, idx) => (
    <div
      key={idx}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-semibold text-blue-600 mb-2">{e.header}</h2>
        <h2 className="text-md font-medium text-gray-600 mb-2">{e.description}</h2>
        <p className="text-sm text-gray-400">
          📅{" "}
          {new Date(e.date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

          {
            localStorage.getItem("Login")=="Leader"? 
            <div className="mt-6 flex justify-between gap-2">
              <button
                onClick={(ee) => {
                  ee.stopPropagation();
                  DeleteNews(e.id) ;
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
                  localStorage.setItem("EditeOrAddNews","Edite")
                  navigate("/Add-OR-EditeNews" , {state:{
                    headerr : e.header ,
                    descriptionn : e.description , 
                    id : e.id 
                  }});
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm"
              >
      
                تعديل
              </button>
      
              <button
                onClick={(ee) => {
                  ee.stopPropagation();
                  navigate("/ShowPost", {
                    state: {
                      News: e,
                    },
                  }); 
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              >
                عرض
              </button>
            </div>
       : <></>
          }

    </div>
  ))}



</div>

  {localStorage.getItem("Login")=="Leader"?
<div className='flex justify-center items-center m-10'>
    <button
          onClick={(ee) => {
            ee.stopPropagation();
            localStorage.setItem("EditeOrAddNews","Add")
            navigate("/Add-OR-EditeNews" , {state:{
              headerr : "" ,
              descriptionn :"", 
              id : -1 
            }});
          }}
          className="bg-slate-500 h-14 w-80 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm"
        >
          اضافة خبر
        </button>
        </div>:<></>}


      </div>
    </>
  );
}
