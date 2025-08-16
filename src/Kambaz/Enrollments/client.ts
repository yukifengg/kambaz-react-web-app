import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export interface Enrollment {
  _id: string;
  user_id: string;
  course: string;
  enrolled: boolean;
}

export const findEnrollmentsByUser = async (userId: string): Promise<Enrollment[]> => {
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return response.data;
};

export const enrollUserInCourse = async (userId: string, courseId: string): Promise<Enrollment> => {
  const response = await axios.post(
    `${USERS_API}/${userId}/enrollments/${courseId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string): Promise<void> => {
  await axios.delete(
    `${USERS_API}/${userId}/enrollments/${courseId}`,
    { withCredentials: true }
  );
};

export const updateEnrollment = async (
  userId: string,
  courseId: string,
  enrolled: boolean
): Promise<void> => {
  if (enrolled) {
    await enrollUserInCourse(userId, courseId);
  } else {
    await unenrollUserFromCourse(userId, courseId);
  }
};