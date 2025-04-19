using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace UniversityDataAccessLayer
{


    public class TeacherDTO
    {
        public TeacherDTO()
        {

        }
        public TeacherDTO(int Id, string Name, int Major, string Email, string Password)
        {
            this.Id = Id;
            this.Name = Name;
            this.Email = Email;
            this.Major = Major;
            this.Password = Password;
        }


        public int Id { get; set; }
        public string Name { get; set; }
        public int Major { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }


    public class StudenCourseDTO
    {

        public StudenCourseDTO()
        {

        }
        public StudenCourseDTO(int id, string name, string email, int major)
        {
            this.Id = id;
            this.Name = name;
            this.Email = email;
            this.Major = major;
        }


        public int Id { get; set; }
        public string Name { get; set; }
        public int Major { get; set; }
        public string Email { get; set; }


    }


    public class TeacherData
    {

        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";

        public static List<TeacherDTO> GetAllTeacher()
        {
             var ListTeacher = new List<TeacherDTO>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllTeacher", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        ListTeacher.Add( new TeacherDTO (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetInt32(reader.GetOrdinal("Major")),
                            reader.GetString(reader.GetOrdinal("Email")),
                            reader.GetString(reader.GetOrdinal("Password"))
                            )
                         );
                    }

                }
            }
              return ListTeacher; 
        }




        public static List<StudenCourseDTO> GetStudentInCourse(int IdCourse)
        {
            var ListStudent = new List<StudenCourseDTO>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllStudentReservedInCourse", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IdCourse", IdCourse);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        ListStudent.Add(new StudenCourseDTO(
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetString(reader.GetOrdinal("Email")),
                            reader.GetInt32(reader.GetOrdinal("Major"))
                            )
                         );
                    }

                }
            }
            return ListStudent;
        }




        public static TeacherDTO GetTeacherById(int teacherId)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetTeacherById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("IdTeacher", teacherId);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new TeacherDTO
                        (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetInt32(reader.GetOrdinal("Major")),
                            reader.GetString(reader.GetOrdinal("Email")),
                            reader.GetString(reader.GetOrdinal("Password"))

                        );
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }





    }
}
