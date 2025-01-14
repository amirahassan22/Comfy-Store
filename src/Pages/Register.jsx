import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import FormInput from "../Components/FormInput";
import customFetch from "../utils";
import { toast } from "react-toastify";

export const action = async({request})=>{
  // console.log(request.formData);
  const formData = await request.formData()
  const formEntries = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('/auth/local/register',formEntries);
    console.log(response);
    toast.success('Account Created Successfully')  
    return redirect('/login');
   
  } catch (error) {
    const errorMsg = error?.response?.data?.error?.message || "please double check your credentials"
    toast.error(errorMsg);
    return null;
  }
  
 
  
  // return formEntries;
}
export default function Register() {
  const isSubmitting = useNavigation().state == "submitting"
 console.log(isSubmitting);
  return (
    <main className="w-full h-lvh flex justify-center items-center">
      <Form className="w-4/12 h-auto px-9 py-8 shadow-xl rounded-xl" method="POST">
        <h2 className="text-center mb-9 text-3xl">Create Account</h2>
        <FormInput
          name="username"
          type={"text"}
          defaultValue={""}
          placeholder={"UserName"}
          label={"Username"}
        />
        <FormInput
          name="email"
          type={"email"}
          defaultValue={"test@test.com"}
          placeholder={"Email"}
          label={"Email"}
        />
        <FormInput
          name="password"
          type={"password"}
          defaultValue={"12345"}
          placeholder={"Password"}
          label={"Password"}
        />
        <div className="flex justify-center mt-9 mb-4">
          <button className="btn btn-primary btn-block text-white" type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p>
            Already a member? <Link to="/Login">{isSubmitting?<>Creating Account<span className="loading loading-dots loading-lg"></span></>:"Login"}</Link>
          </p>
        </div>
      </Form>
    </main>
  );
}
