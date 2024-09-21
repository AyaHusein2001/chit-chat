import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";
const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate(); // use it to navigate to another page
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data);
      toast.success(response?.data?.message);

      // when user is regestered , clear the state :
      if (response?.data?.success) {
        setData({
          email: "",
        });
        // after that , it shuold be redirected to another page
        //!!!!!!!!!!!!!!! note sending data through navigate
        //send the user data to the password page , we knew that it is inside response.data.data by console logging 
        navigate("/password", {
          
          state: response?.data?.data
        });
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
          <PiUserCircle size={80} />
        </div>
        <h3>Welcome to ChitChat !</h3>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          {/* when I click on name label , it will automatically focus on that text field */}

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
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
            Let's Go
          </button>
          <p className="my-3 text-center">
            {/* note Link component instead of a tag in html */}
            New User ?{" "}
            <Link
              to={"/register"}
              className="hover:text-primary font-semibold hover:underline "
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckEmailPage;
