
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthLinks = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();

  if (isLoading) {
    return <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm hidden md:inline">
          Hi, {user?.user_metadata?.name || "User"}
        </span>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="default">Login</Button>
    </Link>
  );
};

export default AuthLinks;
