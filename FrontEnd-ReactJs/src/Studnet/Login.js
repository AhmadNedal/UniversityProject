import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import LoadingPage from '../Loading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[ Login , setLogin ] = useState(false); 
  const [Loading,setLoading] = useState(false); 
  const [error,setError] = useState(""); 
  const [user,setUser] = useState([]) ;
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${URL}/LoginStudent?Email=${email}&password=${password}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userr => {
      setUser(()=>userr);
      localStorage.setItem("IdStudent" , userr.id)
      localStorage.setItem("Student" , JSON.stringify(userr) ); 
      localStorage.setItem("Login", "Student"); 
      navigate("/Home" , {state : {StudentId:userr.id} }) ; 
    })
    .catch(err => {
      setLoading(false); 
      setError("البريد الالكتروني او كلمة السر خطأ") ; 
      console.log("Error: ", err);
    });

    
  };
   
  


  
    if (Loading)   {
      return <LoadingPage/>
    }


    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700"> Login A Studnet</h2>
        <form onSubmit={(e)=>{
           handleSubmit(e);
          }}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>{
                setEmail(e.target.value);
                setError("") ; 
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value); 
                setError("") ; 
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          


          <button
          className='hover:underline hover:text-blue-950 text-blue-700' 
          onClick={ ()=> { 
            navigate("/signUp")
          }}
          style={{textAlign:"center" , width:"100%" , marginTop:"13px" , fontSize:"12px" }}>ليس لديك حساب ؟
          </button>

          <p className=' text-xs text-red-600 text-center mt-3' >{error}</p>

        </form>
      </div>
    </div>
  );
}




