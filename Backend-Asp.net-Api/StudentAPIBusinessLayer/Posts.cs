using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversityDataAccessLayer;

namespace UniversityAPIBusinessLayer
{
    public class Posts
    {


        public Posts ()
        {
        }
        public static List<PostDTORet> GetAllPosts()
        {
            return PostData.GetAllPosts(); 
        }

        public static List<PostDTORet> GetStudentPost(int IdStudent)
        {
            return PostData.GetStudentPost(IdStudent);
        }

        public static bool AddPost(PostDTO postAdd)
        {
            int num = PostData.AddPost(postAdd);

            return num > 0;
        }


        public static bool DeletePost(int ID)
        {
            return PostData.DeletePost(ID);
        }



        public static List<LikeDTO> StudentLikes(int ID)
        {
            return LikeData.GetStudentLikes(ID);
        }



        public static bool AddLike(int IdStudent , int IdPost)
        {
            return LikeData.AddLike(IdStudent , IdPost ) ;
        }


        public static bool RemoveLike(int IdStudent, int IdPost)
        {
            return LikeData.RemoveLike(IdStudent, IdPost);
        }


    }
}
