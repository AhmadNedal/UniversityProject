using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using static System.Net.Mime.MediaTypeNames;

namespace UniversityDataAccessLayer
{
    public class PostDTO
    {
        public PostDTO()
        {}

        public PostDTO(int idStudent , string header , string content , string nameStudent)
        {
            this.IdStudent = idStudent;
            this.header = header;
            this.content = content;
            this.NameStudent = nameStudent; 
        }

        public int IdStudent { get; set; }
        public string header { get; set; }
        public string content { get; set; }
        public string NameStudent { get; set; }

    }



    public class PostDTORet
    {
        public PostDTORet(int PostId, int idStudent, string header, string content, string nameStudent, int NumberLikes , DateTime CreateAt)
        {
            this.PostId = PostId; 
            this.IdStudent = idStudent;
            this.header = header;
            this.content = content;
            this.NameStudent = nameStudent;
            this.CreateAt = CreateAt;
            this.NumberLikes = NumberLikes;
        }

        public int PostId { get; set; }
        public int IdStudent { get; set; }
        public int NumberLikes { get; set; }
        public string header { get; set; }
        public string content { get; set; }
        public string NameStudent { get; set; }
        public DateTime CreateAt { get; set; }

    }



    public class PostData
    {


        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";


        public static List<PostDTORet> GetAllPosts()
        {
            var PostList = new List<PostDTORet>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllPost", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    conn.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            PostList.Add(new PostDTORet
                            (
                                reader.GetInt32(reader.GetOrdinal("PostId")),
                                reader.GetInt32(reader.GetOrdinal("StudentId")),
                                reader.GetString(reader.GetOrdinal("Header")),
                                reader.GetString(reader.GetOrdinal("Content")),
                                reader.GetString(reader.GetOrdinal("NameStudent")),
                                reader.GetInt32(reader.GetOrdinal("NumberLikes")),
                                reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                            ));
                        }
                    }
                }
                return PostList;
            }

        }





        public static List<PostDTORet> GetStudentPost(int IdStudent)
        {
            var CourseList = new List<PostDTORet>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetStudentPosts", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    conn.Open();
                    cmd.Parameters.AddWithValue("@IdStudent", IdStudent);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            CourseList.Add(new PostDTORet
                            (
                                reader.GetInt32(reader.GetOrdinal("PostId")),
                                reader.GetInt32(reader.GetOrdinal("StudentId")),
                                reader.GetString(reader.GetOrdinal("Header")),
                                reader.GetString(reader.GetOrdinal("Content")),
                                reader.GetString(reader.GetOrdinal("NameStudent")),
                                reader.GetInt32(reader.GetOrdinal("NumberLikes")),
                                reader.GetDateTime(reader.GetOrdinal("CreatedAt"))
                            ));
                        }
                    }
                }
                return CourseList;
            }

        }



        public static int AddPost(PostDTO postDTO)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("AddPost", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@StudentId", postDTO.IdStudent);
                command.Parameters.AddWithValue("@NameStudent", postDTO.NameStudent);
                command.Parameters.AddWithValue("@Header", postDTO.header);
                command.Parameters.AddWithValue("@Content", postDTO.content);

                var outputIdParam = new SqlParameter("@NewPostId", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                command.Parameters.Add(outputIdParam);

                connection.Open();
                command.ExecuteNonQuery();

                return (int)outputIdParam.Value;

            }
        }





        public static bool DeletePost(int PostId)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeletePost", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@IdPost", PostId);

                connection.Open();

                int rowsAffected = (int)command.ExecuteScalar();
                return (rowsAffected == 1);


            }
        }








    }

    
    public class LikeDTO
    {

        public int StudentId { get; set; }
        public int PostId { get; set; }

        public LikeDTO()
        {

        }
        
        public LikeDTO(int studentId , int postId)
        {
            this.StudentId = studentId;
            this.PostId = postId; 
        }


    
    
    
    }



    public class LikeData
    {
            static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";



            public static List<LikeDTO> GetStudentLikes(int IDStudent)
            {

            var LikeList = new List<LikeDTO>();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetStudentLikes", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdStudent", IDStudent);

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            LikeList.Add(new LikeDTO
                            (
                                reader.GetInt32(reader.GetOrdinal("StudentId")),
                                reader.GetInt32(reader.GetOrdinal("PostId"))
                            ));
                        }
                    }
                }
                return LikeList;
            }

        }








        public static bool AddLike(int IDStudent, int IdPost)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("AddLike", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdStudent", IDStudent);
                    cmd.Parameters.AddWithValue("@IdPost", IdPost);

                    conn.Open();
                    cmd.ExecuteNonQuery();

                }
                return true;
            }

        }







        public static bool RemoveLike(int IDStudent, int IdPost)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("RemoveLike", conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdStudent", IDStudent);
                    cmd.Parameters.AddWithValue("@IdPost", IdPost);

                    conn.Open();
                    cmd.ExecuteNonQuery();

                }
                return true;
            }

        }





    }
}

