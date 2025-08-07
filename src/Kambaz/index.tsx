import { Routes, Route, Navigate, useParams } from "react-router";
import Account from "./Account";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const findAllCourses = async () => {
    const allCourses = await courseClient.fetchAllCourses();
    setCourses(allCourses);
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    }));
  };



  return (
    <Session>
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="Dashboard"
            element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            }
            />
          <Route
            path="Courses/:cid/*"
            element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );
}
