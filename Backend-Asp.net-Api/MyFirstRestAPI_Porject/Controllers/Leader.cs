using Microsoft.AspNetCore.Mvc;
using UniversityDataAccessLayer;

namespace UniversityApi.Controllers
{
    public class Leader : Controller
    {



        [HttpGet("GetAllNews", Name = "GetAllNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetAllNews()
        {
            List<NewsDTO> NewsList= UniversityAPIBusinessLayer.Leader.getAllNews();
            return Ok(NewsList);
        }



        [HttpPost("AddNews", Name = "AddNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult AddNews(NewsDTO news)
        {

            NewsDTO newss = UniversityAPIBusinessLayer.Leader.AddNews(news);
            
            if (newss!=null)
            {
                return Ok(newss);

            }
            else
            {
                return NotFound($"Can Not Add News.");
            }
        }







        [HttpDelete("DeleteNews{id}", Name = "DeleteNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteNews(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            if (UniversityAPIBusinessLayer.Leader.DeleteNews(id))

                return Ok($"News with ID {id} has been deleted.");
            else
                return NotFound($"News with ID {id} not found. no rows deleted!");
        }







        [HttpPut("UpdateNews", Name = "UpdateNews")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StudentDTO> UpdateNews( NewsDTO updatedNews)
        {
            if (updatedNews == null || string.IsNullOrEmpty(updatedNews.Header) || string.IsNullOrEmpty(updatedNews.Description ))
            {
                return BadRequest("Invalid News data.");
            }


    
            if (UniversityAPIBusinessLayer.Leader.UpdateStudent(updatedNews))
            {
                 return Ok(updatedNews);
            }else
            {
                return BadRequest($"Cannot Update News ");
            }
    

        }






    }
}
