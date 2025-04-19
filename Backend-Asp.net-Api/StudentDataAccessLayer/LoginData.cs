using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace UniversityDataAccessLayer
{
    
    public class LeaderDTO
    {
        public LeaderDTO(int id, string name ,string email , string password)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.Name = name; 
        }

        public int Id{ get; set; }
        public string Email { get; set; }
        public string Password{ get; set;}
        public string Name { get; set; }

    }

    public class LoginData()
    {

        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";


        public static StudentDTO LoginStudentDb(string email , string password)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("LoginStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new StudentDTO
                        (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
                            reader.GetInt32(reader.GetOrdinal("Major")),
                            reader.GetString(reader.GetOrdinal("Email")),
                            reader.GetString(reader.GetOrdinal("Password")),
                            reader.GetString(reader.GetOrdinal("nationalNumber")),
                            reader.GetDouble(reader.GetOrdinal("Tawjehi")),
                            reader.GetString(reader.GetOrdinal("PlaceOfBirth")),
                            reader.GetString(reader.GetOrdinal("placeHome"))

                        );
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }




        public static TeacherDTO LoginTeacherDb(string email, string password)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("LoginTeacher", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);

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




        public static LeaderDTO LoginLeaderDb(string email, string password)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("LoginLeader", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new LeaderDTO
                        (
                            reader.GetInt32(reader.GetOrdinal("Id")),
                            reader.GetString(reader.GetOrdinal("Name")),
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