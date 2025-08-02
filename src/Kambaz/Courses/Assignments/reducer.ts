import { createSlice } from "@reduxjs/toolkit";
import { assignments, groups } from "../../Database"; // now imports both
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
  groups: groups,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // ---------- ASSIGNMENTS ----------
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        name: assignment.name,
        course: assignment.course,
        groupId: assignment.groupId || null, // link to a group
        availableDate: assignment.availableDate || null,
        dueDate: assignment.dueDate || null,
        points: assignment.points || 0,
        editing: false,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },

    // ---------- GROUPS ----------
    addGroup: (state, { payload: group }) => {
      const newGroup = {
        _id: uuidv4(),
        course: group.course,
        name: group.name,
        weight: group.weight || 0,
      };
      state.groups.push(newGroup);
    },
    deleteGroup: (state, { payload: groupId }) => {
      state.groups = state.groups.filter((g: any) => g.id !== groupId);
      state.assignments = state.assignments.filter(
        (a: any) => a.groupId !== groupId
      );
    },
    updateGroup: (state, { payload: group }) => {
      state.groups = state.groups.map((g: any) =>
        g.id === group.id ? group : g
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  addGroup,
  deleteGroup,
  updateGroup,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
