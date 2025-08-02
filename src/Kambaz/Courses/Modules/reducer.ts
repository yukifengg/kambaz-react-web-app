import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },

    deleteLesson: (state, { payload }: { payload: { moduleId: string; lessonId: string } }) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((module: any) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons?.filter((lesson: any) => lesson._id !== lessonId) || [],
          };
        }
        return module;
      });
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, deleteLesson } =
  modulesSlice.actions;
export default modulesSlice.reducer;
