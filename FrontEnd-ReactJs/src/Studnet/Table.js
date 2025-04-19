import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import {major , TimeList} from '../Shared';
import StudentHeader from '../AllHeader/StudentHeader';
import URL from '../DataBase';
import LoadingPage from '../Loading';
import LeaderHeader from '../AllHeader/LeaderHeader';
import { CheackStudent } from '../leader/CheckLeader';


export default function Table() {

  const StudentId = localStorage.getItem("IdStudent"); 
  const [reservedCourse, setReservedCourse] = useState([]) ;
  const [User, setUser] = useState([]) ;

  const [Loading,setLoading] = useState(false); 
  const [allCourse, setAllCourse] = useState([]) ;
  const navigate = useNavigate();

  const styleTh ="px-4 text-center py-2 text-center" ; 
  

  
  if (CheackStudent()){
    navigate("/NotAccess") ;
 }

  const handleAddCourse = (id) => {

      fetch(`${URL}/ReservedCourse?StudentID=${User.id}&CourseID=${id}` , {
        method:"post"
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(()=> {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false); 
        console.log("Error: ", err);
      });
  

  };

  const handleDeleteCourse =(id)=> {

    fetch(`${URL}/RemoveReserve?StudentID=${User.id}&CourseID=${id}` , {
      method:"post"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(()=> {
      setLoading(false);
    })
    .catch(err => {
      setLoading(false); 
      console.log("Error: ", err);
    });


  }

  const DeleteCourse =(ee)=>{ 
    let newArray =[] ;
    newArray= allCourse.filter(e=>e.id!=ee.id) ; 
    setAllCourse(newArray ) ;
  }



  useEffect(()=> {

    setLoading(true) ;
    
    fetch(`${URL}/api/Students/${StudentId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userr => { 
      
      setUser(()=>userr); 

      fetch(`${URL}/api/Courses/GetCourseOfStudent?StudentId=${StudentId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(Course => {
        setReservedCourse(Course); 
        fetch(`${URL}/api/Courses/GetCourseByMjor?MajorId=${userr.major}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(allCourses => {
  
          let newArray =[] ;
    
          for (let i=0;i<allCourses.length;++i){
            let bool  = true; 
            for (let j=0;j<Course.length;++j){
                if ( Course[j].id==allCourses[i].id){
                  bool = false ; 
                }
            }
            if ( bool ) {
              newArray.push(allCourses[i]); 
            }
          }
    
          setAllCourse(newArray) ;
          
          setLoading(false);
        })
        .catch(err => {
          setLoading(false); 
          console.log("Error: ", err);
        });
    


      })
      .catch(err => {
        setLoading(false); 
        console.log("Error: ", err);
      });

      setLoading(false) ;      
    })
    .catch(err => {
      setLoading(false); 
      console.log("Error: ", err);
    });
    



  },[]) ;

  if (Loading){
    return <LoadingPage/>
  }

  return (
    <div>
      
      {localStorage.getItem("Login")=="Leader"?  <LeaderHeader/>: <StudentHeader/>}

      <br/>
      <br/>
      

      <section className="bg-white p-10 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">جدولي الحالي</h2>
        <table className="min-w-full table-auto" style={{direction:"rtl"}}>
          <thead>
            <tr className="bg-gray-200">
            <th className={styleTh}>اسم المادة</th>
            <th className={styleTh}>التخصص</th>
            <th className={styleTh}>الوقت</th>
            <th className={styleTh}>عدد الطلاب المسجلين</th>
            <th className={styleTh}>الدكتور</th>
            <th className={styleTh}>الحالة</th>
            <th className={styleTh}>للاسنحاب</th>
            </tr>
          </thead>
          <tbody>
            {reservedCourse.map((course, index) => (
              <tr key={index} className="border-b hover:bg-slate-100">
                <td className={styleTh}>{course.name}</td>
                <td className={styleTh}>{major[course.major]}</td>
                <td className="px-1 text-center text-sm py-2">{TimeList[course.time].time}<br/> {TimeList[course.time].day}</td>
                <td className={styleTh}>{course.numberOfStudent}</td>
                <td className={styleTh}>{course.idTeacher==-1?"هيئة تدريسية" : course.nameOfTeacher}</td>
                <td className={styleTh}>مسجل</td>
                <button
                onClick={()=>{
                    handleDeleteCourse(course.id) ;
                    let newArray = reservedCourse.filter((e)=>e.id!=course.id);
                    setReservedCourse(()=>newArray) ;
                    let newArray2 = [...allCourse]; 
                    newArray2.push(course) ;
                    setAllCourse(newArray2) ;
                
                }}
                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg my-3 transition`}>
                انسحاب   
              </button>
                </tr>
            ))}
          </tbody>
        </table>
      </section>





    
      <section className="bg-white p-10 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4  text-center">المواد المتاحة للتسجيل</h2>
        <table className="min-w-full table-auto " style={{direction:"rtl"}}>
          <thead>
            <tr className="bg-gray-200 ">
            <th className={styleTh}>اسم المادة</th>
            <th className={styleTh}>التخصص</th>
            <th className={styleTh}>الوقت</th>
            <th className={styleTh}>عدد الطلاب المسجلين</th>
            <th className={styleTh}>الدكتور</th>
            <th className={styleTh}>الحالة</th>
            <th className={styleTh}>إضافة</th>
            </tr>
            </thead>
            <tbody>
              {allCourse.map((course, index) => (
                <tr key={index} className={`border-b ${course.numberOfStudent>=course.maxStudent? "bg-red-400": "hover:bg-slate-100"}`}>
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">{major[course.major]}</td>
                  <td className="px-1 text-center text-sm py-2">{TimeList[course.time].time}<br/> {TimeList[course.time].day}</td>
                  <td className={`px-4 text-center py-2 ${course.numberOfStudent>=course.maxStudent? "text-red-600 line-through": ""}`}>{course.numberOfStudent>=course.maxStudent ? `${course.numberOfStudent} - الشعبة ممتلئة` :course.numberOfStudent}</td>
                  <td className="px-4 py-2">{course.idTeacher==-1?"هيئة تدريسية" : course.nameOfTeacher}</td>
                <td className="px-4 py-2">غير مسجل</td>

                <button
                onClick={()=>{
                  
                  if ( reservedCourse.length>=7) {
                    alert("لا بمكنك التسجيل اكثر من الحد الاعلى من الساعات ")

                  }else 
                  if ( course.numberOfStudent<course.maxStudent){
                    
                    let bool = false ;
                  
                    for (let i=0;i<reservedCourse.length;++i) {
                      if ( reservedCourse[i].time == course.time ) {
                        bool = true ; 
                      }
                    }
                    
                      if (bool){ 
                        alert("لا يمكنك اضافة هذه المادة بسبب التعارض في الوقت")
                      }else {
                        
                      handleAddCourse(course.id) ;
                      let newArray = [...reservedCourse]; 
                      newArray.push(course);  
                      setReservedCourse(()=>newArray) ; 
                      DeleteCourse(course) ;
                      
                      }
                  } 
                }}
                className={`${course.numberOfStudent>=course.maxStudent?"bg-red-600  cursor-auto":"bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded-lg my-3  transition`}>
              {course.numberOfStudent>=course.maxStudent&&localStorage.getItem("Login")!="Leader"? "ممتلئة" : "إضافة"}  
              </button>
              </tr>
            ))}
          </tbody>
        </table>
      </section>




    </div>
  )
}
