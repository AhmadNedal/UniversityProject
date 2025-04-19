import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Studnet/Login';
import LoginTeacher from './Page/LoginTeacher';
import Home from './Page/Home';
import SignUp from './Page/SignUp';
import InfoStudent from './Studnet/infoStudent';
import Table from './Studnet/Table';
import Community from './Page/community';
import AddPost from './Page/AddPost';
import ErrorPage from './Error';
import Lecture from './Teacher/Lecture';
import ShowCourse from './Teacher/ShowCourse';
import ShowStudent from './Teacher/ShowStudent';
import ProfileTeacher from './Teacher/ProfileTeacher';
import "./App.css"; 
import ShowPost from './Page/ShowPost';
import AllStudent from './leader/AllStudent';
import AllCourse from './leader/AllCourse';
import AllNews from './leader/AllNews';
import AddEditeNews from './leader/AddEditeNews';
import EditeStudentLeader from './leader/EditeStudentLeader';
import EditeStudent from './Studnet/EditeStudent';
import EditeCourse from './leader/EditeCourse';
import AddCourse from './leader/AddCourse';
import AllDoctor from './leader/AllDoctor';
import NotAccess from './NotAcces';




const App = () => {
  return (
<div className='AllComponent'>



    <Router>
      <Routes>


        {/* Student  */}
        <Route path="/" element={ localStorage.getItem("Login")=="Teacher"||
          localStorage.getItem("Login")=="Leader"||
          localStorage.getItem("Login")=="Student"?
          <Home />
          :
          <LoginPage />
        } />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/info" element={<InfoStudent />} />
        <Route path="/tableStudnet" element={<Table />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/EditeStudent" element={<EditeStudent/>} />
        <Route path="/AddPost" element={<AddPost/>} />

        {/*  */}
        <Route path="/LoginTeacher" element={<LoginTeacher />} />
        <Route path="/Lecture" element={<Lecture />} />
        <Route path="/ShowCourse" element={<ShowCourse />} />
        <Route path="/ShowStudent" element={<ShowStudent />} />
        <Route path="/ProfileTeacher" element={<ProfileTeacher />} />
        <Route path="/ShowPost" element={<ShowPost />} />



      {/* Leader */}
        <Route path="/AllStudent" element={<AllStudent />} />
        <Route path="/AllCourse" element={<AllCourse/>} />
        <Route path="/AllNews" element={<AllNews/>} />
        <Route path="/Add-OR-EditeNews" element={<AddEditeNews/>} />
        <Route path="/EditeStudentLeader" element={<EditeStudentLeader/>} />
        <Route path="/EditeCourse" element={<EditeCourse/>} />
        <Route path="/AddCourse" element={<AddCourse/>} />
        <Route path="/AllDoctor" element={<AllDoctor/>} />
        <Route path="/NotAccess" element={<NotAccess/>} />



        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
</div>
  );
};

export default App;
