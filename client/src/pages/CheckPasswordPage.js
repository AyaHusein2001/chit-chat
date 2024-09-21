import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { PiPassword, PiUserCircle } from "react-icons/pi";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";
const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const navigate = useNavigate(); // use it to navigate to another page
  const location = useLocation(); // this is to recieve the state sent from check email page
  const dispatch = useDispatch(); // this is for redux
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //note the syntax , take care of [] , this means the name of the field , whatever it is , whether it is name or email or password
    setData((prev) => {
      return {
        ...prev,
        [name]: value, //
      };
    });
  };

  //notice the trick : preventing the user from entering password page before entering his email
  useEffect(() => {
    // if there is no name , navigate to email page
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;
    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true, // to set the cookie in the browser , note also that this will not work if cors credintials is not true
      });
      console.log("response", response);
      toast.success(response?.data?.message);

      // when user is regestered , clear the state :
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.data)); // when console loged response , we saw that token is there


        console.log("responsjjje", response);

        localStorage.setItem("token", response?.data?.token); // storing token in the browser local storage also

        setData({
          password: "",
        });
        // after that , it shuold be redirected to another page
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log("error",error)
    }
    console.log("data", data);
  };
  return (
    <div className="mt-5 ">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2">
          {/* <PiUserCircle size={80}/> */}
          {/*
      In Tailwind CSS, w-fit is a utility class that sets the width of an element to fit its content. This means the width of the element will adjust dynamically based on the size of its children or content, rather than taking up the full width of its container or a fixed size.
      */}
          <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
            {/* <PiUserCircle
                  size={80}
                /> */}
            <Avatar
              width={70}
              height={70}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
            <h2 className="font-semibold text-lg mt-1">
              {location?.state?.name}
            </h2>
          </div>
        </div>
        <h3>Welcome to ChitChat !</h3>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          {/* when I click on name label , it will automatically focus on that text field */}

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your password"
              name="password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          {/*
        In Tailwind CSS, the class leading-relaxed is used to control the line height (or leading) of text. It applies a slightly looser line height, making the text more spacious and easier to read.
        tracking-wide: spacing between words
        */}
          <button
            className="bg-primary text-lg px-4 py-1  hover:bg-secondary rounded mt-2 font-bold text-white 
        leading-relaxed tracking-wide"
          >
            Login
          </button>
          <p className="my-3 text-center">
            {/* note Link component instead of a tag in html */}
            <Link
              to={"/forgot-password"}
              className="hover:text-primary font-semibold hover:underline "
            >
              Forgot Password ?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
