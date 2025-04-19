import React from 'react'
import { useNavigate } from 'react-router-dom'

function TeacherHeader() {
const navigate = useNavigate() ; 

  return (
    <div className='flex justify-around items-center '>

      
        
    <div className='p-3 flex justify-end' >
      <img  style={{width:"250px"}} src={require('.././images/logo.png') }/>
    </div>


    <ul className='flex gap-3 ' style={{direction:"rtl"}}>
    
      <li>
        <a href="Home">الرئيسية</a>
      </li>

      <li>
        <button onClick={()=>{
            navigate("/Lecture") ; 
        }}>المحاضرات</button>
        
      </li>      
    
      <li>
        <button onClick={()=>{ 
            localStorage.setItem("Show", "false") ;
          
            navigate("/ProfileTeacher") ; 


        }}  >معلوماتي </button>
      </li>

    </ul>
    
    

      
    </div>
  )
}

export default TeacherHeader

