using System;
using System.Data;
using Microsoft.Data.SqlClient;

namespace UniversityDataAccessLayer
{
    public class StudentDTO
    {
        public StudentDTO(int id, string name, int major , string email , string password , string nationalNumber , double Tawjehi  , string PlaceOfBirth , string placeHome)
        {
            this.Id = id;
            this.Name = name;
            this.Major = major;
            this.Email = email;
            this.Password = password;
            this.nationalNumber = nationalNumber;
            this.Tawjehi = Tawjehi;
            this.PlaceOfBirth = PlaceOfBirth;
            this.PlaceHome = placeHome;
        }


        public int Id { get; set; }
        public string Name { get; set; }
        public int Major{ get; set; }
        public string Email { get; set; }
        public string Password{ get; set; }
        public string nationalNumber { get; set; }
        public double Tawjehi { get; set; }
        public string PlaceOfBirth { get; set; }
        public string PlaceHome { get; set; }




    }

    public class StudentData
    {
        // static string _connectionString = "Server=localhost;Database=StudentsDB;User Id=sa;Password=sa;Encrypt=False;TrustServerCertificate=True;Connection Timeout=30;";


        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";


        public static List<StudentDTO> GetAllStudents()
        {
            var StudentsList = new List<StudentDTO>();
           
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllStudent", conn))
                {
                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            StudentsList.Add(new StudentDTO
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

                            ));
                        }
                    }
                }
                
                return StudentsList;
            
            }

        }

      
        public static StudentDTO GetStudentById(int studentId)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetStudentById", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IdStudent", studentId);

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

        public static int AddStudent(StudentDTO StudentDTO)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("AddStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;


                command.Parameters.AddWithValue("@Major", StudentDTO.Major);
                command.Parameters.AddWithValue("@Name", StudentDTO.Name);
                command.Parameters.AddWithValue("@Email", StudentDTO.Email);
                command.Parameters.AddWithValue("@Password", StudentDTO.Password);
                command.Parameters.AddWithValue("@nationalNumber", StudentDTO.nationalNumber);
                command.Parameters.AddWithValue("@Tawjehi", StudentDTO.Tawjehi);
                command.Parameters.AddWithValue("@PlaceOfBirth", StudentDTO.PlaceOfBirth);
                command.Parameters.AddWithValue("@placeHome", StudentDTO.PlaceHome);

                var outputIdParam = new SqlParameter("@NewStudentId", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                command.Parameters.Add(outputIdParam);

                connection.Open();
                command.ExecuteNonQuery();

                return (int)outputIdParam.Value;
            }
        }

        public static bool UpdateStudent(StudentDTO StudentDTO)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@IDStudent", StudentDTO.Id);
                command.Parameters.AddWithValue("@Major", StudentDTO.Major);
                command.Parameters.AddWithValue("@Name", StudentDTO.Name);
                command.Parameters.AddWithValue("@Email", StudentDTO.Email);
                command.Parameters.AddWithValue("@Password", StudentDTO.Password);
                command.Parameters.AddWithValue("@nationalNumber", StudentDTO.nationalNumber);
                command.Parameters.AddWithValue("@Tawjehi", StudentDTO.Tawjehi);
                command.Parameters.AddWithValue("@PlaceOfBirth", StudentDTO.PlaceOfBirth);
                command.Parameters.AddWithValue("@placeHome", StudentDTO.PlaceHome);

                connection.Open();
                command.ExecuteNonQuery();
                return true;

            }
            return false;
        }

        public static bool DeleteStudent(int studentId)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteStudent", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IDStudent", studentId);

                connection.Open();

                int rowsAffected = (int)command.ExecuteScalar();
                return (rowsAffected==1);


            }
        }
    }
}
