using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversityDataAccessLayer;


namespace UniversityAPIBusinessLayer
{
    public class Leader
    {



        public static List<NewsDTO> getAllNews()
        {
            return NewsData.GetAllNews();
        }


        public static NewsDTO AddNews(NewsDTO newsAdd)
        {
            int num= NewsData.AddNews(newsAdd);

             if ( num>0 )
            {
                newsAdd.Id = num;
                return newsAdd; 
            }else
            {
                return null;
            }

        }


        public static bool DeleteNews(int ID)
        {
            return NewsData.DeleteNews(ID);
        }


        public static bool UpdateStudent(NewsDTO newsDTO)
        {
                return NewsData.UpdateNews(newsDTO);
        }


    }
}
