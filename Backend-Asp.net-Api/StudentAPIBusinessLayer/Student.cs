using System.Data;
using UniversityDataAccessLayer;

namespace UniversityAPIBusinessLayer
{

    public class Student
    {
        public enum enMode { AddNew = 0, Update = 1 };
        public enMode Mode = enMode.AddNew;



        public StudentDTO SDTO {
            get { return (new StudentDTO(this.Id, this.Name, this.Major , this.Email , this.Password , this.nationalNumber , this.Tawjehi , this.PlaceOfBirth , this.placeHome)); }
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Major { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string nationalNumber { get; set; }
        public double Tawjehi { get; set; }
        public string PlaceOfBirth { get; set; }
        public string placeHome { get; set; }



        public Student(StudentDTO SDTO, enMode cMode =enMode.AddNew )

            {
            this.Id = SDTO.Id;
            this.Name = SDTO.Name;
            this.Major = SDTO.Major;
            this.Email = SDTO.Email;
            this.Password = SDTO.Password;
            this.nationalNumber = SDTO.nationalNumber;
            this.Tawjehi = SDTO.Tawjehi;
            this.PlaceOfBirth =SDTO.PlaceOfBirth;
            this.placeHome = SDTO.PlaceHome;

            Mode = cMode;
            }

        private bool _AddNewStudent()
            {

               this.Id = StudentData.AddStudent(SDTO);
                return (this.Id != -1);
            }

        private bool _UpdateStudent()
        {
            return StudentData.UpdateStudent(SDTO);
        }


        public static List<StudentDTO> GetAllStudents()
            {
                return StudentData.GetAllStudents();
            }



        public static Student Find(int ID)
            {

             StudentDTO SDTO = StudentData.GetStudentById(ID);

            if (SDTO != null)
            //we return new object of that student with the right data
            {
                
                return new Student(SDTO, enMode.Update);
            }
            else
                return null;
            }

            public bool Save()
            {
                switch (Mode)
                {
                    case enMode.AddNew:
                        if (_AddNewStudent())
                        {

                            Mode = enMode.Update;
                            return true;
                        }
                        else
                        {
                            return false;
                        }

                    case enMode.Update:

                    return _UpdateStudent();

                }

                return false;
            }

            public static bool DeleteStudent(int ID)
            {
                return StudentData.DeleteStudent(ID);
            }

        }
    }

