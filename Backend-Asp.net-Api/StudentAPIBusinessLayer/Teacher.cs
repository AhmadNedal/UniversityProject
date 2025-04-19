using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversityDataAccessLayer;

namespace UniversityAPIBusinessLayer
{
    public class Teacher
    {

        public static List<TeacherDTO> GetAllTeacher()
        {
            return UniversityDataAccessLayer.TeacherData.GetAllTeacher(); 
        }


        public static List<StudenCourseDTO> GetAllStudentReservedInCourse(int Id)
        {
            return UniversityDataAccessLayer.TeacherData.GetStudentInCourse(Id);
        }


        public static TeacherDTO GetTeacherById(int id )
        {
            return UniversityDataAccessLayer.TeacherData.GetTeacherById(id);
        }

    }
}
