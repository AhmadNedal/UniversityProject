using Microsoft.AspNetCore.Mvc; 
using System.Collections.Generic;
using UniversityAPIBusinessLayer;
using UniversityDataAccessLayer;

namespace StudentApi.Controllers 
{
    [ApiController]
    [Route("api/Students")]

    public class StudentsController : ControllerBase
    {
        [HttpGet("All", Name ="GetAllStudents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<StudentDTO>> GetAllStudents()
        {
            List<StudentDTO> StudentsList = UniversityAPIBusinessLayer.Student.GetAllStudents();
            if (StudentsList.Count == 0)
            {
                return NotFound("No Students Found!");
            }
            return Ok(StudentsList); 

        }




        [HttpGet("{id}", Name = "GetStudentById")]
        
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StudentDTO> GetStudentById(int id)
        {

            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

            UniversityAPIBusinessLayer.Student student = UniversityAPIBusinessLayer.Student.Find(id);

            if (student == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            StudentDTO SDTO = student.SDTO;

            return Ok(SDTO);

        }

        
        [HttpPost(Name = "AddStudent")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<StudentDTO> AddStudent(StudentDTO newStudentDTO)
        {

            if (newStudentDTO == null || string.IsNullOrEmpty(newStudentDTO.Name))
            {
                return BadRequest("Invalid student data.");
            }


          UniversityAPIBusinessLayer.Student students = new UniversityAPIBusinessLayer.Student(newStudentDTO) ;
            students.Save();

            newStudentDTO.Id = students.Id;
           
            return (newStudentDTO);

        }

       

        [HttpPut("{id}", Name = "UpdateStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StudentDTO> UpdateStudent(int id, StudentDTO updatedStudent)
        {
            if (id < 1 || updatedStudent == null || string.IsNullOrEmpty(updatedStudent.Name) )
            {
                return BadRequest("Invalid student data.");
            }


            UniversityAPIBusinessLayer.Student student = UniversityAPIBusinessLayer.Student.Find(id);


            if (student == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            student.Name = updatedStudent.Name; 
            student.Major= updatedStudent.Major; 
            student.Email= updatedStudent.Email; 
            student.Password= updatedStudent.Password; 

            student.Save();

            return Ok(updatedStudent);
        }




        [HttpDelete("{id}", Name = "DeleteStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteStudent(int id)
        {
            if (id < 1)
            {
                return BadRequest($"Not accepted ID {id}");
            }

           if(  UniversityAPIBusinessLayer.Student.DeleteStudent(id))
            
                return Ok($"Student with ID {id} has been deleted.");
            else
                return NotFound($"Student with ID {id} not found. no rows deleted!");
        }

    }
}
