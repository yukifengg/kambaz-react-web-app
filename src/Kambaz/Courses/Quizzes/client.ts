import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${courseId}/quizzes`,
    { ...quiz, title: quiz.title || "New Quiz", points: quiz.points || 0 }
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/quizzes/${quizId}`);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};

export const togglePublishQuiz = async (quizId: string, isPublished: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/quizzes/${quizId}/publish`,
    { isPublished }
  );
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/quizzes/${quizId}/questions`);
  return data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/questions`,
    question
  );
  return data;
};

export const copyQuizToCourse = async (quizId: string, targetCourseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/quizzes/${quizId}/copy`,
    { targetCourseId }
  );
  return data;
};