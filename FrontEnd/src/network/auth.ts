import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "../types/user";


const signUpUser = async (newUser: { name: string; email: string; password: string }) :Promise<ApiResponse>=> {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register` as string, newUser);
  return response.data; // return the response data
};
const signInUser = async (loggedUser: {email: string; password: string })=> {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login` as string, loggedUser , {withCredentials: true});
  return response.data; // return the response data
};
const signOutUser = async ()=> {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout` as string,{},{withCredentials:true});
  return response.data; // return the response data
};
  export const useSignUp = () => {
    return useMutation({mutationFn:signUpUser});
  };
  export const useLogin = () => {
    return useMutation({mutationFn:signInUser});
  };
  export const useLogOut = () => {
    return useMutation({mutationFn:signOutUser});
  };