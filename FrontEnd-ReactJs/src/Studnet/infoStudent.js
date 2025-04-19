import React, { useEffect, useState } from 'react';
import { major } from '../Shared';
import StudentHeader from '../AllHeader/StudentHeader';
import { useNavigate } from 'react-router-dom';
import Post from '../Page/Post';
import axios from 'axios';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import { CheackAll } from '../leader/CheckLeader';

export default function InfoStudent() {
  const StudentId = localStorage.getItem("IdStudent");
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate() ; 
  const [Posts,setPosts]=useState([]);
  const [postsLike,setpostsLike]=useState([]);
  let [Show,setShow] =useState(localStorage.getItem("Show")); 
  let [IdShow,setIdShow] = useState(localStorage.getItem("IdShow"))

  if (CheackAll()){
    navigate("/NotAccess") ;
  }
  

  useEffect(() => {
    setLoading(true);

    if ( Show !="true"||IdShow == StudentId) {
      setIdShow(()=>StudentId) ;
      localStorage.setItem("IdShow",StudentId) ;
 
      setShow("false"); 
      console.log("IdShow =  " ,IdShow ) ; 
      console.log ("StudentId = " , StudentId) ;
    }
    fetch(`${URL}/api/Students/${IdShow}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userr => {
        setUser(userr);

        axios.get(`${URL}/GetStudentPost?IdStudent=${IdShow}`)
        .then((PostUser)=> {
            setPosts(PostUser.data); 
            axios.get(`${URL}/StudentLike?idStudent=${ StudentId}`)
            .then((postLike)=> {
                setpostsLike(postLike.data); 
                setLoading(false); 
            })
            .catch(error => {
               console.log ("erroeLike = " , error )
            });
        })
        .catch(error => {
           console.log ("erroe = " , error )
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });


  }, [StudentId]);

  if (Loading) {
    return <LoadingPage/>
  }

  if (!User) {
    return <h1 className="text-center text-xl font-semibold mt-4">لم يتم العثور على الطالب</h1>;
  }

  return (
    <>
      <StudentHeader />
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
            
            {Show=="true"? <></>:<div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>معدل التوجيهي :</strong></p>
              <p className="text-gray-600">{User.tawjehi}</p>
            </div>}

            <div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>التخصص:</strong></p>
              <p className="text-gray-600">{major[User.major]}</p>
            </div>

            {Show=="true"? <></>:<div className="flex justify-between">
              <p className="font-semibold text-gray-800"><strong>مكان الولادة:</strong></p>
              <p className="text-gray-600">{User.placeOfBirth}</p>
            </div>}
          </div>

        {Show =="true"?<></> :  
        <button onClick={()=>{
          navigate("/EditeStudent" , { state : { 
          User :User 
          }}); 
        }} className='bg-slate-600 text-white px-4 py-2 rounded-md mt-10  hover:bg-slate-300 hover:text-slate-700'>تعديل كلمة السر</button>
      }  


            <h1 className='mt-12 mb-6 font-bold text-2xl'> {Posts.length==0? "" :Show=="true"?"منشوراته" :"منشوراتي"} </h1>

            {Loading?<LoadingPage/>  :(
                Posts.map((post, index) => (
                    
                  <Post post={post} Likes={postsLike} />

                ))
              )
            }
      
        </div>
          
      
      </div>
    </>
  );
}
