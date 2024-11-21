import { getUser } from "@/api/linktreeAPI";
import Profile from "@/components/Profile";
import Spinner from "@/components/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function AppLayout() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/auth/login"} />;

  if (user) return <Profile user={user} />;
}
