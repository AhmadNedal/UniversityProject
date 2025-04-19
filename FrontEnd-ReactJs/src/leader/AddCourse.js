import React, { useEffect, useState } from 'react'
import { major , TimeList } from '../Shared';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../DataBase';
import LeaderHeader from '../AllHeader/LeaderHeader';
import CheackLeader from './CheckLeader';

function AddCourse() {

  const initialCourse= { 
    name: "",
    major: "",
    numberOfStudent: 0,
    idTeacher: 0,
    maxStudent: 0,
    time: "",
    nameOfTeacher:""
  }
  
  const navigate = useNavigate();  

  const [form, setForm] = useState(initialCourse);
  const [teacher,setTeacher] = useState([]); 


  if (CheackLeader()){
    navigate("/NotAccess") ;
  }

  useEffect(()=> {
    axios.get(`${URL}/api/Students/AllTeacher`)
    .then((teach) => {
      console.log (" AllTeacher = " , teach.data)
        setTeacher(teach.data);
    })
    .catch(error => {
      console.log("error = ", error);
    });
  },[])




  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${URL}/api/Courses`,form)
    .then(() => {
        navigate("/AllCourse") ;      
    })
    .catch(error => {
      console.log("error = ", error);
    });

  };

  
  return (
    <>
    <LeaderHeader/>
    <form onSubmit={handleSubmit} className="space-y-4 p-2 py-10 max-w-md mx-auto">
  

      <div>
        <label className="block mb-1 font-semibold">اسم المادة:</label>
        <input 
          type="text" 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="اسم المادة" 
          className="border p-2 w-full rounded"
        />
      </div>
  

      <div>
        <label className="block mb-1 font-semibold">عدد الطلاب :</label>
        <input 
          disabled={true}
          type="number" 
          name="numberOfStudent" 
          value={form.numberOfStudent} 
          onChange={handleChange} 
          placeholder="عدد الطلاب" 
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>
  

      <div>
        <label className="block mb-1 font-semibold">الحد الأقصى للطلاب:</label>
        <input 
          type="number" 
          name="maxStudent" 
          value={form.maxStudent} 
          onChange={handleChange} 
          placeholder="الحد الأقصى للطلاب" 
          className="border p-2 w-full rounded"
        />
      </div>
  

      <div>
        <label className="block mb-1 font-semibold">التخصص:</label>
        <select 
          name="major" 
          value={form.major} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        >
          <option value="-1">اختر التخصص</option>
          {major.map((e,index) => (
            <option key={e} value={index}>{e}</option>
          ))}
        </select>
      </div>
  

      <div>
        <label className="block mb-1 font-semibold">الوقت:</label>
        <select 
          name="time" 
          value={form.time} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        >
          <option value="">اختر الوقت</option>
          {TimeList.map((e, i) => (
            <option key={i} value={i}>{e.day} - {e.time}</option>
          ))}
        </select>
      </div>
  

      <div>
        <label className="block mb-1 font-semibold">اسم المدرس:</label>
        <select 
  name="nameOfTeacher" 
  value={form.idTeacher} 
  onChange={(e) => {
    const selectedId = e.target.value;
    const selectedTeacher = teacher.find(t => t.id == selectedId);
    
    if (selectedTeacher) {
      setForm(prev => ({
        ...prev,
        idTeacher: selectedTeacher.id,
        nameOfTeacher: selectedTeacher.name
      }));
    }
  }} 
  className="border p-2 w-full rounded"
>
  <option value="">اختر المدرس</option>
  {teacher.map((e) => (
    <option key={e.id} value={e.id}>{e.name}</option>
  ))}
</select>

      </div>
  
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        حفظ التعديلات
      </button>
    </form>

    </>
  );

  
}

export default AddCourse
