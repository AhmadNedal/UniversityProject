using Microsoft.AspNetCore.Mvc;
using UniversityAPIBusinessLayer;

namespace UniversityApi.Controllers
{
    public class reservedCourseController : Controller
    {


        [HttpPost("ReservedCourse", Name = "ReservedCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult reservedCourse(int StudentID, int CourseID)
        {
            if (StudentID < 1 || CourseID<1)
            {
                return BadRequest($"Not accepted ID ({StudentID} , {CourseID})");
            }

            if (UniversityAPIBusinessLayer.reservedCourse.AddStudentToCourse(StudentID, CourseID))

                return Ok($"Student With Id {StudentID } Added To Course {CourseID}");
            else
                return NotFound($"Course with ID {CourseID} OR Course with ID {StudentID} not found. no rows deleted!");
        }





        [HttpPost("RemoveReserve", Name = "RemoveReserve")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult RemoveReserve(int StudentID, int CourseID)
        {
            if (StudentID < 1 || CourseID<1)
            {
                return BadRequest($"Not accepted ID ({StudentID} , {CourseID})");
            }

            if (UniversityAPIBusinessLayer.reservedCourse.RemoveStudentToCourse(StudentID, CourseID))

                return Ok($"Student With Id {StudentID } Added To Course {CourseID}");
            else
                return NotFound($"Course with ID {CourseID} OR Course with ID {StudentID} not found. no rows deleted!");
        }



    }
}
