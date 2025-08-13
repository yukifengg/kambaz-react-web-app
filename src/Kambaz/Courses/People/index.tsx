import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as coursesClient from "../client"

export default function People() {
  const { courseId } = useParams<{ courseId: string }>();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsersForCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const enrolledUsers = await coursesClient.findUsersForCourse(courseId);
      setUsers(enrolledUsers);
    } catch (err) {
      setError("Failed to load users for course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchUsersForCourse(courseId);
    }
  }, [courseId]);

  if (loading) return <div>Loading users enrolled in this course...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>People enrolled in this course</h3>
      <PeopleTable users={users} />
    </div>
  );
}
