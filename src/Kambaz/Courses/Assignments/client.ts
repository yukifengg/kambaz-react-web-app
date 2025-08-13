import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export interface Assignment {
  _id?: string;
  course?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  // Add other assignment fields as needed
}

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`, {
    withCredentials: true,
  });
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment, {
    withCredentials: true,
  });
  return response.data;
};

export const updateAssignment = async (
  assignmentId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`, {
    withCredentials: true,
  });
};
