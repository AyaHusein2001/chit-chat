import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from 'axios'
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate()// use it to navigate to another page
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //note the syntax , take care of [] , this means the name of the field , whatever it is , whether it is name or email or password
    setData((prev) => {
      return {
        ...prev,
        [name]: value,//
      };
    });
  };

  const handleUploadPhoto = async(e) => {
    const file = e.target.files[0]; // note how we accept the file
    const uploadPhoto = await uploadFile(file)
    // console.log("uploadPhoto",uploadPhoto)
    setUploadPhoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,//? to ensure to take it when it is only available
      };
    });
  };
  const handleClearUploadPhoto = (e) => {
    //The e.stopPropagation() method in JavaScript is used to stop the event from bubbling up the DOM tree. In other words, it prevents the event from being propagated to parent elements, stopping it at the element where e.stopPropagation() is called.
    // why we used it here ?
    // when I click on the close icon , do not propagate this click to its parent which is the div
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
    try {
      const response = await axios.post(URL,data)
      console.log('response',response)
      toast.success(response?.data?.message)

      // when user is regestered , clear the state :
      if (response?.data?.success){
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        })
        // after that , it shuold be redirected to another page
        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log("error",error)
    }
    console.log('data',data);
  };
  return (
    <div className="mt-5 ">
      <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto">
        <h3>Welcome to ChitChat !</h3>
        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          {/* when I click on name label , it will automatically focus on that text field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="cursor-pointer h-14 bg-slate-200 border  flex justify-center items-center hover:border-primary rounded">
                {/*The line-clamp-1 utility in Tailwind CSS is used to truncate text after one line and adds an ellipsis (...) if the text overflows. It's part of the line-clamp feature, which controls how many lines of text are displayed before truncating the rest.
            The text-ellipsis utility in Tailwind CSS is used to apply an ellipsis (...) to text that overflows its container. This is typically applied when you want to truncate text that extends beyond its container, and you only want the part that fits to be displayed with ellipses indicating the truncation.
            */}
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload Profile Photo"}
                </p>
                {uploadPhoto?.name && ( //the ? is to make sure that uploadphoto itself is available
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              className="hidden bg-slate-100 px-2 py-1 focus:outline-primary"
              name="profile_pic"
              onChange={handleUploadPhoto}
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
            Register
          </button>
          <p className="my-3 text-center">
            {/* note Link component instead of a tag in html */}
            Already have account ? <Link to={'/email'} className="hover:text-primary font-semibold hover:underline ">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
