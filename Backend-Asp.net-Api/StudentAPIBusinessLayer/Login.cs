using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversityDataAccessLayer;

namespace UniversityAPIBusinessLayer
{
    public class Login
    {

        public static StudentDTO LoginStudent(string email, string password)
        {
            return LoginData.LoginStudentDb(email, password); 

        }

        public static TeacherDTO LoginTeacher(string email, string password)
        {
            return LoginData.LoginTeacherDb(email, password);
        }

        public static LeaderDTO LoginLeader(string email, string password)
        {
            return LoginData.LoginLeaderDb(email, password);
        }
    }
}
