import { getUserByHandle } from "@/api/linktreeAPI";
import Spinner from "@/components/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function HandleView() {
  const params = useParams<{ handle: string }>();
  const handle = params.handle!;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 2,
  });

  if (isLoading) return <Spinner color="white" />;
  if (error) return <Navigate to={"/404"} />;

  return <div>HandleView</div>;
}
