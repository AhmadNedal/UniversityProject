using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection.PortableExecutable;


namespace UniversityDataAccessLayer
{
    public class CourseDTO
    {


       
            public CourseDTO(int id, string name,  int Major , int NumberOfStudent, int IdTeacher , int maxStudent, int time , string NameOfTeacher )
        {
                this.Id = id;
                this.Name = name;
                this.Major = Major;
                this.NumberOfStudent = NumberOfStudent;
                this.IdTeacher = IdTeacher;
                this.MaxStudent = maxStudent;
                this.Time = time;
                this.NameOfTeacher = NameOfTeacher;
        }


            public int Id { get; set; }
            public string Name { get; set; }
            public int Major { get; set; }
            public int NumberOfStudent { get; set; }
            public int IdTeacher { get; set; }
            public int MaxStudent { get; set; }
            public int Time { get; set; }
            public string NameOfTeacher { get; set; }


    }


    public class CourseDataBase
        {
            static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";


            public static List<CourseDTO> GetAllCourses()
            {
                var CourseList = new List<CourseDTO>();

                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("GetAllCourse", conn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        conn.Open();

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                CourseList.Add(new CourseDTO
                                (
                                    reader.GetInt32(reader.GetOrdinal("Id")),
                                    reader.GetString(reader.GetOrdinal("Name")),
                                    reader.GetInt32(reader.GetOrdinal("Major")), 
                                    reader.GetInt32(reader.GetOrdinal("NumberOfStudent")) ,
                                    reader.GetInt32(reader.GetOrdinal("TeacherId")),
                                    reader.GetInt32(reader.GetOrdinal("MaxStudent")),
                                    reader.GetInt32(reader.GetOrdinal("Time")), 
                                    reader.GetString(reader.GetOrdinal("nameOfTeacher"))
                                ));
                            }
                        }
                    }
                    return CourseList;
                }

            }





        public static List<CourseDTO> GetCourseOfStudent(int StudentId)
        {
            var CourseList = new List<CourseDTO>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetCourseOfStudent", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdStudent", StudentId);
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            CourseList.Add(new CourseDTO
                            (
                                reader.GetInt32(reader.GetOrdinal("Id")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetInt32(reader.GetOrdinal("Major")),
                                reader.GetInt32(reader.GetOrdinal("NumberOfStudent")),
                                reader.GetInt32(reader.GetOrdinal("TeacherId")) ,
                                reader.GetInt32(reader.GetOrdinal("MaxStudent")),
                                reader.GetInt32(reader.GetOrdinal("Time")),
                                reader.GetString(reader.GetOrdinal("nameOfTeacher"))

                            ));
                        }
                    }
                }
                return CourseList;
            }

        }




        public static int AddCourse(CourseDTO CourseDTO)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("AddCourse", connection))
            {

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Name", CourseDTO.Name);
                command.Parameters.AddWithValue("@Major", CourseDTO.Major);
                command.Parameters.AddWithValue("@NumberOfStudent", CourseDTO.NumberOfStudent);
                command.Parameters.AddWithValue("@TeacherId", CourseDTO.IdTeacher);
                command.Parameters.AddWithValue("@MaxStudent", CourseDTO.MaxStudent);
                command.Parameters.AddWithValue("@Time", CourseDTO.Time);
                command.Parameters.AddWithValue("@NameOfTeacher", CourseDTO.NameOfTeacher);



                var outputIdParam = new SqlParameter("@NewCourseId", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                command.Parameters.Add(outputIdParam);

                connection.Open();
                command.ExecuteNonQuery();

                return (int)outputIdParam.Value;
            }
        }



        public static bool DeleteCourse(int CourseId)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteCourse", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IdCourse", CourseId);

                connection.Open();

                int rowsAffected = (int)command.ExecuteScalar();
                return (rowsAffected == 1);


            }
        }





        public static bool UpdateCourse(CourseDTO courseDTO)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateCourse", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@IdCourse", courseDTO.Id);
                command.Parameters.AddWithValue("@Name", courseDTO.Name);
                command.Parameters.AddWithValue("@NumberOfStudent", courseDTO.NumberOfStudent);
                command.Parameters.AddWithValue("@TeacherId", courseDTO.IdTeacher);
                command.Parameters.AddWithValue("@Major", courseDTO.Major);
                command.Parameters.AddWithValue("@MaxStudent", courseDTO.MaxStudent);
                command.Parameters.AddWithValue("@Time", courseDTO.Time);
                command.Parameters.AddWithValue("@nameOfTeacher", courseDTO.NameOfTeacher);



                connection.Open();
                command.ExecuteNonQuery();
                return true;

            }
        }



        public static CourseDTO GetCourseById(int CourseId)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetCourseById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@CourseId", CourseId);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new CourseDTO
                        (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetInt32(reader.GetOrdinal("Major")),
                            reader.GetInt32(reader.GetOrdinal("NumberOfStudent")),
                            reader.GetInt32(reader.GetOrdinal("TeacherId")),
                            reader.GetInt32(reader.GetOrdinal("MaxStudent")),
                            reader.GetInt32(reader.GetOrdinal("Time")), 
                            reader.GetString(reader.GetOrdinal("nameOfTeacher"))

                            );
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }





        public static List<CourseDTO> GetCourseByMjor(int MajorId)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetCourseMajor", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@majorId", MajorId);
                var CourseList = new List<CourseDTO>();

                connection.Open();
                using (var reader = command.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        CourseList.Add(new CourseDTO
                        (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetInt32(reader.GetOrdinal("Major")),
                            reader.GetInt32(reader.GetOrdinal("NumberOfStudent")),
                            reader.GetInt32(reader.GetOrdinal("TeacherId")),
                            reader.GetInt32(reader.GetOrdinal("MaxStudent")),
                            reader.GetInt32(reader.GetOrdinal("Time")),
                            reader.GetString(reader.GetOrdinal("nameOfTeacher"))

                        ));
                    }

                    return CourseList; 

                }
            }
        }




        public static List<CourseDTO> GetCourseTeacher(int TeacherId)
        {
            var CourseList = new List<CourseDTO>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetCourseTeacher", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdTeacher", TeacherId);

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            CourseList.Add(new CourseDTO
                            (
                                reader.GetInt32(reader.GetOrdinal("Id")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetInt32(reader.GetOrdinal("Major")),
                                reader.GetInt32(reader.GetOrdinal("NumberOfStudent")),
                                reader.GetInt32(reader.GetOrdinal("TeacherId")),
                                reader.GetInt32(reader.GetOrdinal("MaxStudent")),
                                reader.GetInt32(reader.GetOrdinal("Time")),
                                reader.GetString(reader.GetOrdinal("nameOfTeacher"))
                            ));
                        }
                    }
                }
                return CourseList;
            }

        }







    }
}
