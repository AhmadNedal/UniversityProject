import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { major, TimeList } from "../Shared";
import StudentHeader from "../AllHeader/StudentHeader";
import "./css/Home.css";
import TeacherHeader from "../AllHeader/TeacherHeader";
import axios from "axios";
import LoadingPage from "../Loading";
import URL from "../DataBase";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaNewspaper,
  FaUniversity,
} from "react-icons/fa";
import LeaderHeader from "../AllHeader/LeaderHeader";
import { CheackAll } from "../leader/CheckLeader";

export default function Home() {
  const location = useLocation();
  const { StudentId } = location.state || {};
  const Login = localStorage.getItem("Login");
  const [Loading, setLoading] = useState(false);
  const [News, setNews] = useState([]);
  const [showNews, setShowNews] = useState([]);
  const [BoolShowNews, setBoolShowNews] = useState(true);
  const navigate = useNavigate();


  if (CheackAll()){
    navigate("/NotAccess") ;
  }


  const ListOfLeader = [
    { name: "محمد خالد ", position: "رئيس قسم هندسة البرمجيات" },
    { name: "جميل عبد القادر ", position: "رئيس قسم علم الحاسوب " },
    { name: "رؤى ياسر", position: "رئيس قسم نظم المعلومات الحاسوبية" },
    { name: "سامر ثائر ", position: "رئيس الجامعة" },
  ];

  const Leader = [
    {
      title: "الطلاب",
      id: "student",
      path: "/AllStudent",
    },
    {
      title: "الدكاترة",
      id: "dr",
      path: "/AllDoctor",
    },
    {
      title: "المحاضرات",
      id: "Lecture",
      path: "/AllCourse",
    },
    {
      title: "الأخبار",
      id: "News",
      path: "/AllNews",
    },
    {
      title: "مجتمع الجامعة",
      id: "university",
      path: "/community",
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${URL}/GetAllNews`)
      .then((newss) => {
        let newAr = [];
        if (newss.data.length >= 3) {
          newAr.push(newss.data[0]);
          newAr.push(newss.data[1]);
          newAr.push(newss.data[2]);
          setShowNews(newAr);
        } else if (newss.data.length >= 2) {
          newAr.push(newss.data[0]);
          newAr.push(newss.data[1]);
        } else if (newss.data.length == 1) {
          newAr.push(newss.data[0]);
        }
        setNews(newss.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erroe = ", error);
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return <LoadingPage />;
  }

  const HomeStudent = () => {
    return (
      <div
        className="AllHome"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundPosition: "center",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${require("../images/background/background.png")})`,
        }}
      >
        <div style={{ height: "100vh" }}>
          {Login == "Teacher" ? (
            <TeacherHeader />
          ) : (
            <StudentHeader StudentId={StudentId} />
          )}
          <div style={{ zIndex: "20" }}>
            <h1 className="textHead" style={{ zIndex: "20" }}>
              أهلا بكم في جامعة صَرح العلوم الحديثة
            </h1>
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <img
              className="img1"
              src={require("../images/background/img1.png")}
              style={{ position: "absolute", top: "125px", right: "50%" }}
            />
            <img
              className="img2"
              src={require("../images/background/img2.png")}
              style={{ position: "absolute", top: "125px", right: "20%" }}
            />
            <img
              className="img3"
              src={require("../images/background/img3.png")}
              style={{ position: "absolute", top: "125px", right: "70%" }}
            />
            <img
              className="img4"
              src={require("../images/background/img4.png")}
              style={{ position: "absolute", top: "150px", right: "30%" }}
            />
            <img
              className="img5"
              src={require("../images/background/img5.png")}
              style={{ position: "absolute", top: "100px", right: "60%" }}
            />
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "20px",
              color: "#2c3e50",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            عن الجامعة
          </h2>
          <p style={{
              fontSize: "1.2rem",
              color: "#555",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            جامعة صَرح العلوم الحديثة هي صرح أكاديمي متميّز يهدف إلى إحداث نقلة نوعية في منظومة التعليم العالي من خلال تقديم برامج تعليمية حديثة وشاملة تواكب أحدث التطورات العلمية والتكنولوجية على المستويين المحلي والعالمي.
            تسعى الجامعة إلى تأهيل جيل من الخريجين يمتلكون المهارات الأكاديمية والمهنية اللازمة للانخراط الفعّال في سوق العمل، وذلك ضمن بيئة تعليمية متكاملة تقوم على الابتكار، البحث العلمي، والتفكير النقدي. تضم الجامعة كادرًا أكاديميًا مؤهلًا يتمتع بخبرة عالية في مجالات تخصصهم، ويحرص على دعم الطلبة أكاديميًا ونفسيًا لتحقيق طموحاتهم.
            كما تلتزم الجامعة بتوفير بنية تحتية متطورة تشمل مختبرات حديثة، مرافق تعليمية متكاملة، وأدوات تكنولوجية تسهّل عملية التعلم وتدعم التفاعل الإيجابي بين الطلبة وأعضاء الهيئة التدريسية.
            تطمح جامعة صَرح العلوم الحديثة لأن تكون واحدة من أبرز الجامعات في المنطقة، عبر تخريج كوادر قيادية تساهم في بناء مجتمعات معرفية واقتصاد وطني قائم على الإبداع والتميز.
          </p>
        </div>

        <div style={{ background: "#f9f9f9", padding: "60px 20px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              marginBottom: "40px",
              color: "#2c3e50",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            قسم الادراة
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            {ListOfLeader.map((e) => {
              return (
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    padding: "20px",
                    width: "250px",
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.MZ_yC9LmMvDDCbakWDSfpwHaHa?rs=1&pid=ImgDetMain"
                    alt="رئيس الجامعة"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "15px",
                    }}
                  />
                  <h3 style={{ margin: "10px 0", fontSize: "20px" }}>
                    {e.name}
                  </h3>
                  <p style={{ color: "#777", fontSize: "15px" }}>
                    {e.position}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {News.length < 1 ? (
          <></>
        ) : (
          <div style={{ background: "#f1f1f1", padding: "60px 20px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                marginBottom: "40px",
                color: "#2c3e50",
                fontFamily: "Cairo, sans-serif",
              }}
            >
              📰 آخر الأخبار
            </h2>

            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "25px",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
                className="px-4 py-14"
              >
                {Loading ? (
                  <LoadingPage />
                ) : (
                  (BoolShowNews ? showNews : News).map((e) => {
                    return (
                      <div
                        style={{
                          overflow: "hidden",
                          cursor: "pointer",
                          padding: "20px",
                          borderRadius: "15px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          width: "300px",
                          height:"150px"
                        }}
                        className="hover:bg-slate-100 flex flex-col justify-center items-center"  
                        onClick={() => {
                          navigate("/ShowPost", {
                            state: {
                              News: e,
                            },
                          });
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "20px",
                            fontFamily: "Cairo, sans-serif",
                            color: "#333",
                            fontWeight: "bolder",
                            textAlign:"center"
                          }}
                        >
                          {e.header}
                        </h3>
                        <p style={{ color: "#888", fontSize: "12px" }}>
                          📅
                          {new Date(e.date).toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              {News.length < 4 ? (
                <></>
              ) : (
                <button
                  style={{
                    padding: "10px 25px",
                    fontSize: "1rem",
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontFamily: "Cairo, sans-serif",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#1a252f")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#2c3e50")
                  }
                  onClick={() => {
                    setBoolShowNews(!BoolShowNews);
                  }}
                >
                  {BoolShowNews ? " عرض المزيد" : "عرض اقل"}
                </button>
              )}
            </div>
          </div>
        )}


        
<footer className="bg-gray-100 text-gray-700">

      <div className="text-center py-4 border-t border-gray-300 text-sm">
        © 2025 جامعة المستقبل - جميع الحقوق محفوظة.
      </div>
    </footer>


      </div>
    );
  };

  const OnHover = (element) => {
    Leader.forEach((e) => {
      if (e.id != element.id) {
        let ele = document.getElementById(e.id);
        ele.style.opacity = "40%";
      }
    });
  };
  const OnLeave = (element) => {
    Leader.forEach((e) => {
      let ele = document.getElementById(e.id);
      ele.style.opacity = "100%";
    });
  };

  const HomeLeader = () => {
    return (
      <div style={{ background: "#f9f9f9" }}>
        <LeaderHeader />

        <div
          style={{
            padding: "60px 20px",
            background: "#f9f9f9",
            minHeight: "100vh",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              textAlign: "center",
              marginBottom: "40px",
              color: "#2c3e50",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            لوحة التحكم
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px",
            }}
          >
            {Leader.map((e) => {
              return (
                <div
                  id={`${e.id}`}
                  className="w-60 h-52 flex justify-center items-center  bg-white cursor-pointer hover:scale-105"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={() => OnHover(e)}
                  onMouseLeave={OnLeave}
                  onClick={() => {
                    navigate(`${e.path}`);
                  }}
                >
                  <h1>{e.title}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return localStorage.getItem("Login") == "Leader" ? (
    <HomeLeader />
  ) : (
    <HomeStudent />
  );
}
