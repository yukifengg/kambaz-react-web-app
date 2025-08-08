import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Get all enrollments for a user
export const findEnrollmentsByUser = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return response.data;
};

// Enroll a user in a course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return response.data;
};

// Unenroll a user by enrollment ID
export const unenrollUser = async (userId: string, courseId: string) => {
  await axios.delete(`${USERS_API}/${userId}/enrollments/${courseId}`);
};
