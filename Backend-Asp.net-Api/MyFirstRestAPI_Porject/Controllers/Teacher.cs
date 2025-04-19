using Microsoft.AspNetCore.Mvc;
using UniversityDataAccessLayer;

namespace UniversityApi.Controllers
{


    [ApiController]
    [Route("api/Students")]
    public class Teacher : Controller
    {


        [HttpGet("AllTeacher", Name = "GetAllTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<TeacherDTO>> GetAllTeacher()
        {
            List<TeacherDTO> TeacherList = UniversityAPIBusinessLayer.Teacher.GetAllTeacher();
            if (TeacherList.Count == 0)
            {
                return NotFound("No Students Found!");
            }
            return Ok(TeacherList);

        }






        [HttpGet("GetStudentReservedInCourse", Name = "GetStudentReservedInCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StudenCourseDTO>> GetStudentReservedInCourse(int IdCourse)
        {
            List<StudenCourseDTO> TeacherList = UniversityAPIBusinessLayer.Teacher.GetAllStudentReservedInCourse(IdCourse);
            if (TeacherList.Count == 0)
            {
                return NotFound("No Students Found!");
            }
            return Ok(TeacherList);

        }




        [HttpGet("GetTeacherById", Name = "GetTeacherById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<TeacherDTO>> GetTeacherById(int IdTeacher)
        {
            TeacherDTO teacher= UniversityAPIBusinessLayer.Teacher.GetTeacherById(IdTeacher);
            if (teacher==null)
            {
                return NotFound("No Teacher Found!");
            }
            return Ok(teacher);
        }






    }
}
