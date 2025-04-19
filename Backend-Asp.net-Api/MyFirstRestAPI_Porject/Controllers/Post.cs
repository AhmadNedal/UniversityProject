using Microsoft.AspNetCore.Mvc;
using UniversityAPIBusinessLayer;
using UniversityDataAccessLayer;

namespace UniversityApi.Controllers
{
    public class Post : Controller
    {


        [HttpGet("GetAllPosts", Name = "GetAllPosts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetAllPosts()
        {
            List<PostDTORet> PostList = UniversityAPIBusinessLayer.Posts.GetAllPosts();

            return Ok(PostList);


        }

        [HttpGet("GetStudentPost", Name = "GetStudentPost")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetStudentPost(int IdStudent)
        {
            List<PostDTORet> PostList = UniversityAPIBusinessLayer.Posts.GetStudentPost(IdStudent);

            return Ok(PostList);


        }




        [HttpPost("AddPost", Name = "AddPost")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult AddPost(PostDTO Post)
        {
            bool bol = UniversityAPIBusinessLayer.Posts.AddPost(Post);
            if (bol)
            {
                return Ok(Post);
            }else
            {
                return NotFound($"Can Not Add Post.");
            }
        }







        [HttpDelete("DeletePost{id}", Name = "DeletePost")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeletePost(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            if (UniversityAPIBusinessLayer.Posts.DeletePost(id))

                return Ok($"Post with ID {id} has been deleted.");
            else
                return NotFound($"Post with ID {id} not found. no rows deleted!");
        }







        [HttpGet("StudentLike", Name = "StudentLike")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult GetStudentLike(int idStudent)
        {
            if (idStudent < 1)
            {
                return BadRequest($"Not accepted ID {idStudent}");
            }

            List<LikeDTO> Lista =  UniversityAPIBusinessLayer.Posts.StudentLikes(idStudent); 
            
             return Ok(Lista);

        }





        [HttpPost("AddLike", Name = "AddLike")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult AddLike(int idStudent , int idPost)
        {
            if (idStudent < 1 || idPost <1 )
            {
                return BadRequest($"Not accepted ID {idStudent} || {idPost} ");
            }

            bool bol  = UniversityAPIBusinessLayer.Posts.AddLike(idStudent, idPost );

            return Ok(bol);

        }




        [HttpDelete("RemoveLike", Name = "RemoveLike")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult RemoveLike(int idStudent, int idPost)
        {
            if (idStudent < 1 || idPost < 1)
            {
                return BadRequest($"Not accepted ID {idStudent} || {idPost} ");
            }

            bool bol = UniversityAPIBusinessLayer.Posts.RemoveLike(idStudent, idPost);

            return Ok(bol);

        }






    }
}
