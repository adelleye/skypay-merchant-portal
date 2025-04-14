
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiresAuth?: boolean;
  allowedRoles?: Array<"merchant" | "admin">;
};

const ProtectedRoute = ({ 
  children, 
  requiresAuth = true,
  allowedRoles = []
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requiresAuth && !user) {
    // Redirect to login and save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for approved status for merchant users
  if (
    user && 
    user.role === "merchant" && 
    !(user as any).approved && 
    location.pathname !== "/pending-approval"
  ) {
    return <Navigate to="/pending-approval" replace />;
  }

  // Check if user has required role
  if (
    requiresAuth &&
    user &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role as "merchant" | "admin")
  ) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
