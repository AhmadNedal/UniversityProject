import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function StudentHeader() {
const navigate = useNavigate() ; 
const StudentId = localStorage.getItem("IdStudent"); 







  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight-window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100  + 70 ;

      document.documentElement.style.setProperty('--numHeight', `${scrollPercent}%`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
            navigate("/tableStudnet" , {state : {StudentId:StudentId} }) ; 
        }}>جدولي الفصلي</button>
    </li>

      <li>
        <button onClick={()=>{ 
          navigate("/Community" , {state : {StudentId:StudentId} }) ; 
        }}  >مجتمع الجامعة </button>
      </li>
      
    
      <li>
        <button onClick={()=>{ 
            localStorage.setItem("Show", "false") ;
            localStorage.setItem("IdShow",StudentId) ;
            localStorage.setItem("IdStudent",StudentId) ;
            navigate("/info" , {state : {StudentId:StudentId} }) ; 
        }}  >معلوماتي </button>
      </li>

    </ul>
    
    </div>
  )
}

export default StudentHeader

