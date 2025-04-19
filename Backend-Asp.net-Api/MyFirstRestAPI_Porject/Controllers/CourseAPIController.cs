using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using UniversityAPIBusinessLayer;
using UniversityDataAccessLayer;

namespace UniversityApi.Controllers
{

    [ApiController]
    [Route("api/Courses")]
    public class CourseAPIController : Controller
    {


        [HttpGet("AllCourse", Name = "GetAllCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<CourseDTO>> GetAllStudents()
        {
            List<CourseDTO> CourseList = UniversityAPIBusinessLayer.Course.GetAllCourse();
            if (CourseList.Count == 0)
            {
                return NotFound("No Course Found!");
            }
            return Ok(CourseList);
        }





        [HttpGet("GetCourseOfStudent", Name = "GetCourseOfStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<CourseDTO>> GetCourseOfStudent(int StudentId)
        {
            List<CourseDTO> CourseList = UniversityAPIBusinessLayer.Course.GetCourseOfStudent(StudentId);
            
            return Ok(CourseList);
        }





        [HttpGet("GetCourseByMjor", Name = "GetCourseByMjor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<CourseDTO>> GetCourseByMjor(int MajorId)
        {
            List<CourseDTO> CourseList = UniversityAPIBusinessLayer.Course.GetCourseByMjor(MajorId);
            if (CourseList.Count == 0)
            {
                return NotFound("No Course Found!");
            }
            return Ok(CourseList);
        }



    
        
        [HttpPost(Name = "AddCourse")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<CourseDTO> AddStudent(CourseDTO newCourseDTO)
        {
            if (newCourseDTO == null || string.IsNullOrEmpty(newCourseDTO.Name))
            {
                return BadRequest("Invalid Course data.");
            }


            UniversityAPIBusinessLayer.Course Course = new UniversityAPIBusinessLayer.Course(newCourseDTO);
            Course.Save();

            newCourseDTO.Id = Course.Id;

            return CreatedAtRoute("GetCourseById", new { id = newCourseDTO.Id }, newCourseDTO);

        }





        [HttpDelete("{id}", Name = "DeleteCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteCourse(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            if (UniversityAPIBusinessLayer.Course.DeleteCourse(id))

                return Ok($"Course with ID {id} has been deleted.");
            else
                return NotFound($"Course with ID {id} not found. no rows deleted!");
        }







        [HttpPut("/{id}", Name = "UpdateCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CourseDTO> UpdateCourse(int id, CourseDTO updatedCourse)
        {
            if (id < 1 || updatedCourse == null || string.IsNullOrEmpty(updatedCourse.Name) )
            {
                return BadRequest("Invalid Course data.");
            }


            UniversityAPIBusinessLayer.Course course= UniversityAPIBusinessLayer.Course.Find(id);


            if (course == null)
            {
                return NotFound($"Course with ID {id} not found.");
            }


            course.Name = updatedCourse.Name;
            course.MaxStudent = updatedCourse.MaxStudent;
            course.Major = updatedCourse.Major;
            course.NumberOfStudent = updatedCourse.NumberOfStudent;
            course.IdTeacher = updatedCourse.IdTeacher;
            course.Time = updatedCourse.Time;
            course.NameOfTeacher = updatedCourse.NameOfTeacher;
            course.Save();

            return Ok(course.SDTO);

        }




        [HttpGet("{id}", Name = "GetCourseById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CourseDTO> GetCourseById(int id)
        {

            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            UniversityAPIBusinessLayer.Course course = UniversityAPIBusinessLayer.Course.Find(id);

            if (course == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            CourseDTO SDTO = course.SDTO;

            return Ok(SDTO);

        }






        [HttpGet("GetCourseTeacher/{id}", Name = "GetCourseTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CourseDTO> GetCourseTeacher(int id)
        {

            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            List<CourseDTO> course = UniversityAPIBusinessLayer.Course.GetCourseTeacher(id);

            if (course == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            return Ok(course);

        }


    }

}
