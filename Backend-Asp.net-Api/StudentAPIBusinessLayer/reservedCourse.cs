using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversityDataAccessLayer; 

namespace UniversityAPIBusinessLayer
{
    public class reservedCourse
    {

        public static bool AddStudentToCourse(int StudentID, int CourseID)
        {
            return reservedCourseData.Addreserve(StudentID,CourseID) ; 
        }

        public static bool RemoveStudentToCourse(int StudentID, int CourseID)
        {
            return reservedCourseData.RemoveReserve(StudentID, CourseID);
        }
    }
}
