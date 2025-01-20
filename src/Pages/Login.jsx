import React from "react";
import FormInput from "../Components/FormInput";
import { Form, Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import customFetch from "../utils";
import { login } from "../Features/User/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const action = (store)=> async({request})=>{
  const formData  =await request.formData();
  const userData  =Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/auth/local',userData);
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
        <FormInput name={"identifier"} type={"email"} defaultValue={"james@gmail.com"} placeholder={"Email"} label="Email"/>
        <FormInput name={"password"} type={"password"} defaultValue={"secret"} placeholder={"Password"} label="Password"/>
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
