import React, { useEffect, useState } from 'react';
import { major } from '../Shared';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import TeacherHeader from '../AllHeader/TeacherHeader';
import LeaderHeader from '../AllHeader/LeaderHeader';
import { CheackTeacher } from '../leader/CheckLeader';

export default function ShowStudent() {
  const IdShowStudent = localStorage.getItem("IdShowStudent");
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate() ; 
  const [Posts,setPosts]=useState([]);
  
  if (CheackTeacher()){
    navigate("/NotAccess") ;
  }
  

  
  useEffect(() => {
    setLoading(true);

    fetch(`${URL}/api/Students/${IdShowStudent}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userr => {
        setUser(userr);

        axios.get(`${URL}/GetStudentPost?IdStudent=${IdShowStudent}`)
        .then((PostUser)=> {
          setLoading(false);
            setPosts(PostUser.data); 
        })
        .catch(error => {
           console.log ("erroe = " , error )
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });


  },[IdShowStudent]);

  if (Loading) {
    return <LoadingPage/>
  }

  if (!User) {
    return <h1 className="text-center text-xl font-semibold mt-4">لم يتم العثور على الطالب</h1>;
  }

  return (
    <>
    {localStorage.getItem("Login") =="Leader" ?<LeaderHeader/> : <TeacherHeader /> } 
    
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

          <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">معلومات الطالب</h1>

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
              <p className="font-semibold text-gray-800"><strong>التخصص:</strong></p>
              <p className="text-gray-600">{major[User.major]}</p>
            </div>

          { localStorage.getItem("Login") =="Leader" ?
          <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>الرقم الوطني:</strong></p>
              <p className="text-gray-600">{User.nationalNumber}</p>
            </div> : <></>}  

          { localStorage.getItem("Login") =="Leader" ?
          <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>معدل التوجيهي:</strong></p>
              <p className="text-gray-600">{User.tawjehi}</p>
            </div> : <></>}  

            

          { localStorage.getItem("Login") =="Leader" ?
          <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>مكان الولادة:</strong></p>
              <p className="text-gray-600">{User.placeOfBirth}</p>
            </div> : <></>}  
            

          {localStorage.getItem("Login") =="Leader" ?
            <div className="flex justify-between">
                <p className="font-semibold text-gray-800"><strong>مكان الاقامة:</strong></p>
                <p className="text-gray-600">{User.placeHome}</p>
            </div> : <></>}

            
            
          </div> 


            <h1 className='mt-12 mb-6 font-bold text-2xl'>{Posts.length==0 ?"": "منشوراته"} </h1>

   {Loading?<LoadingPage/>  :(
   Posts.map((post, index) => (
                    
    <div dir='rtl' className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4 mb-4">

    <div className='flex justify-between items-start'>
    <div className="flex items-center cursor-pointer mb-3">
      <div className="w-12  h-12 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold">
      {post.nameStudent[0]}
      </div>
      <div className="ml-3">
        <h3 className="text-xl font-semibold text-gray-800">{post.nameStudent}</h3>
        <p className="text-sm text-gray-500">@{post.idStudent}</p>
      </div>
    </div>
    <p className='text-gray-500 text-sm'> {new Date(post.createAt).toLocaleString()}</p>
    </div>

    <div className="mb-2">
      <h4 className="text-lg font-semibold text-gray-800">{post.header}</h4>
    </div>

    <div className="mb-4">
      <p className="text-gray-700">
      {post.content}
        </p>
    </div>

    <div className='flex justify-between'>
    <div className="flex items-center space-x-2">
      
      <span className="text-gray-500 text-sm">{post.numberLikes} معجبين</span>
    </div>

  
  </div>
  </div>
))
              )
            }
      
      
        </div>
          
      
      </div>


            

    </>
  );
}
