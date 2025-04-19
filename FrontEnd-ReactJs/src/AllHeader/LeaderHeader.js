import React from 'react'
import { useNavigate } from 'react-router-dom';

function LeaderHeader() {
  const navigate = useNavigate(); 

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
            navigate("/AllCourse") ; 
        }}>المحاضرات</button>
      </li>
    
      <li>
        <button onClick={()=>{ 
            navigate("/AllDoctor");
        }}  >الدكاترة </button>
      </li>

      
      <li>
        <button onClick={()=>{ 
            navigate("/AllStudent");
        }}  >الطلاب </button>
      </li>

      <li>
        <button onClick={()=>{ 
            navigate("/AllNews");
        }}  >الأخبار </button>
      </li>

      <li>
        <button onClick={()=>{ 
            navigate("/Community");
        }}  >مجتمع الجامعة </button>
      </li>


    </ul>
    
    

      
    </div>
  )
}

export default LeaderHeader
