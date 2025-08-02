import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

interface EnrollmentState {
  [userId: string]: string[];
}

const initialState: EnrollmentState = {};
dbEnrollments.forEach((e) => {
  if (!initialState[e.user]) initialState[e.user] = [];
  initialState[e.user].push(e.course);
});

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      const { userId, courseId } = payload;
      if (!state[userId]) state[userId] = [];
      if (!state[userId].includes(courseId)) state[userId].push(courseId);
    },
    unenroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      const { userId, courseId } = payload;
      if (state[userId]) {
        state[userId] = state[userId].filter((id) => id !== courseId);
      }
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;