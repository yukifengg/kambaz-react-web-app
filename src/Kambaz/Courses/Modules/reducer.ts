import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Lesson {
  _id: string;
  name?: string;
}

interface Module {
  _id: string;
  lessons: Lesson[];
  name: string;
  course: string;
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }: PayloadAction<{ name: string; course: string }>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
    deleteLesson: (
      state,
      { payload }: PayloadAction<{ moduleId: string; lessonId: string }>
    ) => {
      const { moduleId, lessonId } = payload;
      state.modules = state.modules.map((module) => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons?.filter((lesson) => lesson._id !== lessonId) || [],
          };
        }
        return module;
      });
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, deleteLesson, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
