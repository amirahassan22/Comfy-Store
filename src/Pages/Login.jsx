import React from "react";
import FormInput from "../Components/FormInput";
import { Form, Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import customFetch from "../utils";
import { login } from "../Features/User/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const action = (store)=> async({request})=>{
  console.log(store);
  const formData  =await request.formData();
  const userData  =Object.fromEntries(formData);
  console.log(userData);
  try {
    const response = await customFetch.post('/auth/local',userData);
    console.log(response);
    store.dispatch(login(response.data))
    toast.success("logged in successfully")
    return redirect('/')
  } catch (error) {
    const errorMsg = error?.response?.data?.error?.message || "please double check your credentials"
    toast.error(errorMsg);
    return null;
  }
 
}

export default function Login() {
 const isSubmitting = useNavigation().state == "submitting"
 console.log(isSubmitting);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const handleGuestLogin = async()=>{
  try {
    const response= await customFetch.post('/auth/local',{
      "identifier":"test@test.com",
      "password": "secret"
    });
    dispatch(login(response.data))
    toast.success("successfully logged in as a guest")
    navigate('/')
  } catch (error) {
    toast.error("Guest login went wrong , please try again");
    
  }
 }
 
  return (
    <main className="w-full h-lvh flex justify-center items-center">
      <Form className="w-4/12 h-auto px-9 py-8 shadow-xl rounded-xl" method="POST">
      <h2 className="text-center mb-9 text-3xl">Login</h2>
        <FormInput name={"identifier"} type={"email"} defaultValue={"james@gmail.com"} placeholder={"Email"} label={<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
    >
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg> }/>
        <FormInput name={"password"} type={"password"} defaultValue={"secret"} placeholder={"Password"} label={<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70"
    >
      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg> }/>
        <div className="mt-9 mb-4">
        <button className="btn btn-primary btn-block text-white mb-3" type="submit" disabled={isSubmitting}>{isSubmitting?<>Signing in<span className="loading loading-dots loading-lg"></span></>:"Login"}</button>
        <button className="btn btn-secondary btn-block text-white mb-3" type="button" onClick={handleGuestLogin}>Guest User</button>
        </div>
        <div className="text-center">
          <p>
            Not a member yet? <Link to="/register">Create account</Link>
          </p>
        </div>
      </Form>
    </main>
  );
}
