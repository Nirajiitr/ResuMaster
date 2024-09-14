import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getUserData } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getUserData();
        return userDetail;
      } catch (error) {
        if (!error.message.include("not authenticated")) {
          toast.error("something went wrong...");
        }
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useUser;
