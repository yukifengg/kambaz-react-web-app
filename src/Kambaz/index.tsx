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
  const [courses, setCourses] = useState<any[]>([]); // list of courses
  const [course, setCourse] = useState<any>({}); // single course for creation/editing
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const findCoursesForUser = async () => {
    try {
      const userCourses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(userCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      const mergedCourses = allCourses.map((course: any) => ({
        ...course,
        enrolled: enrolledCourses.some((c: any) => c._id === course._id),
      }));
      setCourses(mergedCourses);
    } catch (error) {
      console.error(error);
    }
  };

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
   const updateEnrollment = async (courseId: string, enrolled: boolean) => {
   if (enrolled) {
     await userClient.enrollIntoCourse(currentUser._id, courseId);
   } else {
     await userClient.unenrollFromCourse(currentUser._id, courseId);
   }
   setCourses(
     courses.map((course) => {
       if (course._id === courseId) {
         return { ...course, enrolled: enrolled };
       } else {
         return course;
       }
     })
   );
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

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setAllCourses([...allCourses, newCourse]);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async (updatedCourse: any) => {
    await courseClient.updateCourse(updatedCourse);
    setAllCourses(
      allCourses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
    setCourses(
      courses.map((c) => (c._id === updatedCourse._id ? updatedCourse : c))
    );
  };

  useEffect(() => {
    if (currentUser) {
      if (enrolling) {
        fetchCourses();
      } else {
        findCoursesForUser();
      }
    }
  }, [currentUser, enrolling]);

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
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
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
