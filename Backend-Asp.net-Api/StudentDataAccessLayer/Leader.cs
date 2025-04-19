using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace UniversityDataAccessLayer
{
    public class NewsDTO
    {
        public NewsDTO()
        {

        }
        public NewsDTO(int id , string header, string description , DateTime date )
        {
            this.Header = header;
            this.Description = description;
            this.Id = id;
            this.Date = date; 
        }

        public int Id{ get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }


    public class NewsData {



        static string _connectionString = "Server=DESKTOP-5DM2BTK;Database=StudentData;Integrated Security=True;TrustServerCertificate=True;";

        public static List<NewsDTO> GetAllNews()
        {
            var ListNews = new List<NewsDTO>();
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("GetAllNews", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {

                        ListNews.Add(new NewsDTO(
                            reader.GetInt32(reader.GetOrdinal("id")),
                            reader.GetString(reader.GetOrdinal("header")),
                            reader.GetString(reader.GetOrdinal("description")), 
                            reader.GetDateTime(reader.GetOrdinal("date"))
                            )
                         );
                    }
                }
            }
            return ListNews;
        }





        public static int AddNews(NewsDTO newsDTO)
        {
            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("AddNews", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@header", newsDTO.Header);
                command.Parameters.AddWithValue("@description", newsDTO.Description);

                var outputIdParam = new SqlParameter("@NewNewsId", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };
                command.Parameters.Add(outputIdParam);

                connection.Open();
                command.ExecuteNonQuery();

                return (int)outputIdParam.Value;

            }
        }





        public static bool DeleteNews(int NewsId)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("DeleteNews", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@idNews", NewsId);

                connection.Open();

                int rowsAffected = (int)command.ExecuteScalar();
                return (rowsAffected == 1);
            }
        }






        public static bool UpdateNews(NewsDTO newsDTO)
        {

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand("UpdateNews", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@idNews", newsDTO.Id);
                command.Parameters.AddWithValue("@header", newsDTO.Header);
                command.Parameters.AddWithValue("@description", newsDTO.Description);

                connection.Open();
                command.ExecuteNonQuery();
                return true;

            }
            return false;
        }



    }



}
