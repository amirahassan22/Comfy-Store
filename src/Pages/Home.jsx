import React from "react";
import Header from "../Components/Header";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-items py-20">
          <Outlet />
        </section>
      )}
    </>
  );
}
