using Microsoft.AspNetCore.Mvc;
using UniversityDataAccessLayer;

namespace UniversityApi.Controllers
{
    public class LoginAPIController : Controller
    {


        [HttpGet("LoginStudent", Name = "LoginStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult LoingStudent(string Email , string password )
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(Email))
            {
                return BadRequest($"The Password Or Email Empty");
            }


           StudentDTO student=UniversityAPIBusinessLayer.Login.LoginStudent(Email, password); 

            if (student == null)
            {
                return NotFound($"Student with Email {Email} not found.");
            }


            return Ok(student);


        }





        [HttpGet("LoginTeacher", Name = "LoginTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult LoginTeacher(string Email, string password)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(Email))
            {
                return BadRequest($"The Password Or Email Empty");
            }

            TeacherDTO teacher= UniversityAPIBusinessLayer.Login.LoginTeacher(Email, password);

            if (teacher == null)
            {
                return NotFound($"Student with Email {Email} not found.");
            }

            return Ok(teacher);
        }






        [HttpGet("LoginLeader", Name = "LoginLeader")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult LoginLeader(string Email, string password)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(Email))
            {
                return BadRequest($"The Password Or Email Empty");
            }

            LeaderDTO manager = UniversityAPIBusinessLayer.Login.LoginLeader(Email, password);

            if (manager == null)
            {
                return NotFound($"Student with Email {Email} not found.");
            }

            return Ok(manager);
        }




    }

}
