import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database"; // only used here
import { v4 as uuidv4 } from "uuid";

const emptyCourse = {
  _id: "",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  image: "",
};

const initialState = {
  courses: initialCourses, // all courses
  course: { ...emptyCourse }, // current editable course
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    resetCourse: (state) => {
      state.course = { ...emptyCourse };
    },
    addCourse: (state, { payload }) => {
      const newCourse = {
        ...payload,
        _id: uuidv4(),
      };
      state.courses.push(newCourse);
      state.course = { ...emptyCourse };
    },
    updateCourse: (state, { payload }) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );
      state.course = { ...emptyCourse };
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
      if (state.course._id === courseId) {
        state.course = { ...emptyCourse };
      }
    },
  },
});

export const {
  setCourse,
  resetCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
