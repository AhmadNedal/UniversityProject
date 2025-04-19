using System.Data;
using UniversityDataAccessLayer;



namespace UniversityAPIBusinessLayer
{

    public class Course
    {
        public enum enMode { AddNew = 0, Update = 1 };
        public enMode Mode = enMode.AddNew;


        public CourseDTO SDTO
        {
            get { return new CourseDTO(Id, Name, Major, NumberOfStudent, IdTeacher , MaxStudent , Time , NameOfTeacher ); }
        }


        public int Id { get; set; }
        public string Name { get; set; }
        public int Major { get; set; }
        public int NumberOfStudent { get; set; }
        public int IdTeacher { get; set; }
        public int MaxStudent { get; set; }
        public int Time { get; set; }
        public string NameOfTeacher { get; set; }


        public Course(CourseDTO SDTO, enMode cMode = enMode.AddNew)

        {
            this.Id = SDTO.Id;
            this.Name = SDTO.Name;
            this.Major = SDTO.Major;
            this.NumberOfStudent = SDTO.NumberOfStudent;
            this.IdTeacher = SDTO.IdTeacher;
            this.MaxStudent = SDTO.MaxStudent;
            this.Time = SDTO.Time;
            this.NameOfTeacher = SDTO.NameOfTeacher;

            Mode = cMode;
        }

        private bool _AddNewCourse()
        {

            CourseDataBase.AddCourse(SDTO);

            return (this.Id != -1);
        }

        private bool _UpdateCourse()
        {
            return CourseDataBase.UpdateCourse(SDTO);
        }


        public static List<CourseDTO> GetAllCourse()
        {
            return CourseDataBase.GetAllCourses();
        }

        public static List<CourseDTO> GetCourseOfStudent(int StudentId)
        {
            return CourseDataBase.GetCourseOfStudent(StudentId);
        }

        public static List<CourseDTO> GetCourseByMjor(int MajorId)
        {
            return CourseDataBase.GetCourseByMjor(MajorId); 
        }

        public static Course Find(int ID)
        {

            CourseDTO SDTO = CourseDataBase.GetCourseById(ID);

            if (SDTO != null)
            //we return new object of that student with the right data
            {

                return new Course(SDTO, enMode.Update);
            }
            else
                return null;
        }






        //public static Course Find(int ID)
        //{

        //    CourseDTO SDTO = CourseDataBase.GetStudentById(ID);

        //    if (SDTO != null)
        //    //we return new object of that student with the right data
        //    {

        //        return new Course(SDTO, enMode.Update);
        //    }
        //    else
        //        return null;
        //}

        public bool Save()
        {
            switch (Mode)
            {
                case enMode.AddNew:
                    if (_AddNewCourse())
                    {

                        Mode = enMode.Update;
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                case enMode.Update:

                    return _UpdateCourse();

            }

            return false;
        }

        public static bool DeleteCourse(int ID)
        {
            return CourseDataBase.DeleteCourse(ID);
        }


        public static List<CourseDTO> GetCourseTeacher(int ID)
        {
            return CourseDataBase.GetCourseTeacher(ID);
        }




    }
}

