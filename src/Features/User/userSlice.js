import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getThemeData = ()=>{
    let myTheme = localStorage.getItem('theme') || themes.winter
    document.documentElement.setAttribute('data-theme',myTheme)  
    return myTheme
}
const getUserFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('user')) || null;
}
const themes = {
    winter:"winter",
    dracula:"dracula"
  }
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeData(),
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
        const user = {...action.payload.user,token:action.payload.jwt}
        console.log(user);
        state.user = user;
        localStorage.setItem('user',JSON.stringify(user))
    },
    logoutUser: (state, action) => {
        state.user = null;
        localStorage.removeItem('user');
        toast.success("Your session ended")
    },
    toggleTheme: (state) => {
        state.theme = state.theme === themes.winter ? themes.dracula : themes.winter;
        localStorage.setItem('theme', state.theme)
        document.documentElement.setAttribute('data-theme',state.theme)
    },
  
   
  },
});

export const { login, logoutUser, toggleTheme } =
  cartSlice.actions;
export default cartSlice.reducer;
