import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from '../assets/logo.png'
const Home = () => {
  //access the user from the state using useSelector
  const user = useSelector((state) => state?.user);
  console.log("redux-user", user);
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUserDetails = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

    try {
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true, // because we have the cookie now as user is logged in
      });
      dispatch(setUser(response?.data?.data));
      // if logout is set to true , which comes in the userdetails when there is no token , I want to set all data to '' , so I dispatch logut
      if (response?.data?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("current user details", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails(); //once mounted , fetch user details
  }, []);
  
  //if we are at the '/' , I do not want the bottom part to show
  const basePath= location.pathname==='/'
  return (
    <>
    {
    /*
    grid-cols-[280px,1fr]: This defines the structure of the grid's columns. Specifically:
    The first column is fixed at 300px in width.
    The second column takes up the remaining available space (1fr stands for "one fraction of the available space").
    h-screen: Sets the height of an element to be 100% of the viewport height. This means the element will take up the full height of the browser window.

max-h-screen: Sets the maximum height of an element to be 100% of the viewport height. The element can be smaller, but it won't grow larger than the height of the screen.
    */
    }
      <div className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
        <section className={`bg-white ${!basePath&&"hidden"} lg:block `}>
          <Sidebar />
        </section>

        {/* message component */}
        <section  className={`${basePath&&"hidden"}`}>
          <Outlet />
        </section>

        <div className="lg:flex justify-center items-center flex-col gap-2 hidden ">
          <div>
            <img 
            src={logo}
            width={230}
            alt='logo'
            />
          </div>
          <p className="text-lg  text-slate-500 ">
            Select User to send message
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
