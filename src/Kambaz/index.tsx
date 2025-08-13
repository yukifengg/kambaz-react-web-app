import { Routes, Route, Navigate } from "react-router";
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
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchEnrolledCourses = async () => {
    try {
      const myCourses = await userClient.findMyCourses();
      setEnrolledCourses(myCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const findAllCourses = async () => {
    try {
      const all = await courseClient.fetchAllCourses();
      setAllCourses(all);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEnrolledCourses();
      findAllCourses();
    } else {
      setEnrolledCourses([]);
      setAllCourses([]);
    }
  }, [currentUser]);

  const addNewCourse = async (newCourseData: any) => {
    const newCourse = await userClient.createCourse(newCourseData);
    setEnrolledCourses([...enrolledCourses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setEnrolledCourses(enrolledCourses.filter((c) => c._id !== courseId));
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async (updatedCourse: any) => {
    await courseClient.updateCourse(updatedCourse);
    setEnrolledCourses(
      enrolledCourses.map((c) =>
        c._id === updatedCourse._id ? updatedCourse : c
      )
    );
    setAllCourses(
      allCourses.map((c) =>
        c._id === updatedCourse._id ? updatedCourse : c
      )
    );
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
                  <Dashboard
                    enrolledCourses={enrolledCourses}
                    allCourses={allCourses}
                    addNewCourse={addNewCourse}
                    updateCourse={updateCourse}
                    deleteCourse={deleteCourse}
                    fetchEnrolledCourses={fetchEnrolledCourses}
                    findAllCourses={findAllCourses}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses enrolledCourses={enrolledCourses} />
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
