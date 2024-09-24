import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getUserData } from "../api";
import { useEffect } from "react";
import { auth } from "../utils/firebase.confi";
const useUser = () => {
  const { data, isLoading, isError, refetch} = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getUserData();
       
        return userDetail;
      } catch (error) {
        if (!error.message.includes("not authenticated")) {
          toast.error("something went wrong...");
        }
       
      }
    },
    { refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,}
  );
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
    
      if (user) {
        refetch(); 
      }
    });
    return () => unsubscribe();
  }, [refetch]);

  return { data, isLoading, isError, refetch };
};

export default useUser;
