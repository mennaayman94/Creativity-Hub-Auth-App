import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserProfile = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/user/profile/${userId}` as string,
    { withCredentials: true }
  );
  return response.data; // return the response data
};
export const useGetUserProfile = () => {
  return useQuery({ queryFn: getUserProfile, queryKey: ["user"] });
};
