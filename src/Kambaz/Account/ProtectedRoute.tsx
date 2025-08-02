import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  if (!currentUser) return <Navigate to="/Kambaz/Account" />;

  if (cid) {
    const enrolledIds = enrollments[currentUser._id] || [];
    if (!enrolledIds.includes(cid)) {
      return <Navigate to="/Kambaz/Dashboard" />;
    }
  }

  return children;
}
