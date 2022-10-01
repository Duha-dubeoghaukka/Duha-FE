import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import CourseItem from "./CourseItem";
import _, { find } from "lodash";
import Spinner from "../Spinner/Spinner";
import MapContainer from "../../components/map/MapContainer";

const DayItem = () => {
  const { day } = useParams();
  const [courses, setCourses] = useState(null);
  const [dayCourse, setDayCourse] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentCourseId, setCurrentCourseId] = useState();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const onClickDay = day => {
    const clickDay = _.find(courses, { day: day });
    setDayCourse(clickDay.courseDetails);
    setCurrentDay(clickDay.day);
    setCurrentCourseId(clickDay.courseId);
    navigate(`/schedule/${id}/${day}`);
  };

  const fetchData = async () => {
    try {
      const {
        data: { data }
      } = await api.get(`/auth/trip/${id}`);
      setCourses(data.courses);
    } catch (error) {
      throw new Error(error);
    }
  };

  const addCourseHandler = () => {
    if (dayCourse.length >= 10) {
      alert("코스등록은 하루에 10개까지 가능합니다.");
    } else navigate(`/schedule/${id}/${currentDay}/${currentCourseId}/addspot`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (courses?.length > 1) onClickDay(Number(day));
  }, [courses]);

  if (!courses) return <Spinner />;

  return (
    <div>
      <div className="mt-4 mb-6 flex flex-wrap justify-center">
        {courses.map(course => {
          return (
            <div
              key={course.courseId}
              className="text-green1 font-bold text-lg px-4 cursor-pointer"
              onClick={() => {
                onClickDay(course.day);
              }}
            >
              Day{course.day}
            </div>
          );
        })}
      </div>
      <div className="course-layout">
        <div className="bg-gray-200 md:h-[500px] h-[345px] mb-4 md:mb-6 shadow-md rounded-lg">
          <MapContainer dayCourse={dayCourse} />
        </div>
        <CourseItem dayCourse={dayCourse} currentDay={currentDay} />
        <button className="btn-primary-sm py-3 mt-4" onClick={addCourseHandler}>
          코스 추가
        </button>
        {/* <button className="btn-primary py-3 mt-4">저장 하기</button> */}
      </div>
    </div>
  );
};

export default DayItem;
