using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace UniversityDataAccessLayer
{
    public class reservedDTO
    {
        public reservedDTO(int IdCourse, int IdStudent )
        {
            this.IdCourse  = IdCourse; 
            this.IdStudent = IdStudent; 

        }


        public int IdCourse{ get; set; }
        public int IdStudent{ get; set; } 

    }

    public class reservedCourseData
    {
        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";




        public static bool Addreserve(int StudentID , int CourseID)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("AddStudentToCourse", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StudentID", StudentID);
                    cmd.Parameters.AddWithValue("@CourseId", CourseID);

                    conn.Open();

                    cmd.ExecuteReader();
                    return true; 
                }
            }
            return false; 

        }




        public static bool RemoveReserve(int StudentID, int CourseID)
        {

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("DeleteReserved", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@StudentID", StudentID);
                    cmd.Parameters.AddWithValue("@CourseId", CourseID);

                    conn.Open();

                    cmd.ExecuteReader();
                    return true;
                }
            }
            return false;

        }



    }




}
