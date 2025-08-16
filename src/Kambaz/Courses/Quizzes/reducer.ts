import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  quizType: 'Graded Quiz' | 'Practice Quiz' | 'Graded Survey' | 'Ungraded Survey';
  points: number;
  assignmentGroup: 'Quizzes' | 'Exams' | 'Assignments' | 'Project';
  shuffleAnswers: boolean;
  timeLimit: number; // in minutes
  multipleAttempts: boolean;
  attemptsAllowed: number;
  showCorrectAnswers: boolean;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  availableUntil?: string;
  isPublished: boolean;
  questions: string[];
}

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: []
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<{
      title: string;
      course: string;
      description?: string;
      quizType?: Quiz['quizType'];
      points?: number;
      assignmentGroup?: Quiz['assignmentGroup'];
      shuffleAnswers?: boolean;
      timeLimit?: number;
      multipleAttempts?: boolean;
      attemptsAllowed?: number;
      showCorrectAnswers?: boolean;
      accessCode?: string;
      oneQuestionAtATime?: boolean;
      webcamRequired?: boolean;
      lockQuestionsAfterAnswering?: boolean;
      dueDate?: string;
      availableDate?: string;
      availableUntil?: string;
    }>) => {
      const newQuiz: Quiz = {
        _id: uuidv4(),
        title: action.payload.title || "New Quiz",
        course: action.payload.course,
        description: action.payload.description || "",
        quizType: action.payload.quizType || 'Graded Quiz',
        points: action.payload.points || 100,
        assignmentGroup: action.payload.assignmentGroup || 'Quizzes',
        shuffleAnswers: action.payload.shuffleAnswers !== false,
        timeLimit: action.payload.timeLimit || 20,
        multipleAttempts: action.payload.multipleAttempts || false,
        attemptsAllowed: action.payload.attemptsAllowed || 1,
        showCorrectAnswers: action.payload.showCorrectAnswers || false,
        accessCode: action.payload.accessCode,
        oneQuestionAtATime: action.payload.oneQuestionAtATime !== false,
        webcamRequired: action.payload.webcamRequired || false,
        lockQuestionsAfterAnswering: action.payload.lockQuestionsAfterAnswering || false,
        dueDate: action.payload.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        availableDate: action.payload.availableDate || new Date().toISOString(),
        availableUntil: action.payload.availableUntil,
        isPublished: false,
        questions: []
      };
      state.quizzes.push(newQuiz);
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    togglePublish: (state, action: PayloadAction<string>) => {
      const quiz = state.quizzes.find(q => q._id === action.payload);
      if (quiz) {
        quiz.isPublished = !quiz.isPublished;
      }
    },
    copyQuiz: (state, action: PayloadAction<{quizId: string, courseId?: string}>) => {
      const original = state.quizzes.find(q => q._id === action.payload.quizId);
      if (original) {
        const newQuiz = {
          ...original,
          _id: uuidv4(),
          title: `Copy of ${original.title}`,
          course: action.payload.courseId || original.course,
          isPublished: false
        };
        state.quizzes.push(newQuiz);
      }
    },
    addQuestionToQuiz: (state, action: PayloadAction<{quizId: string, questionId: string}>) => {
      const quiz = state.quizzes.find(q => q._id === action.payload.quizId);
      if (quiz) {
        quiz.questions.push(action.payload.questionId);
      }
    },
    removeQuestionFromQuiz: (state, action: PayloadAction<{quizId: string, questionId: string}>) => {
      const quiz = state.quizzes.find(q => q._id === action.payload.quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter(id => id !== action.payload.questionId);
      }
    }
  }
});

export const { 
  addQuiz, 
  deleteQuiz, 
  updateQuiz, 
  togglePublish, 
  copyQuiz,
  addQuestionToQuiz,
  removeQuestionFromQuiz
} = quizzesSlice.actions;

export default quizzesSlice.reducer;