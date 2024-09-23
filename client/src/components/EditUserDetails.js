import React, { useState,useRef,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from './Avatar'
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import {setUser} from '../redux/userSlice'
/*
- used useref to select the input that will be responsible of taking the photo file
by putting its ref = the ref var .
- the input and the button must be inside the label
- on button click , we handleopenuploadphoto by uploadPhotoRef.current.click() , which clicks the input also
*/

const EditUserDetails = ({ onClose , user}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    setData((preve)=>{
        return{
            ...preve,
            ...user
        }
    })
},[user])

    const uploadPhotoRef=useRef()
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic,

      });

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

      const handleOpenUploadPhoto =(e)=>{
        e.preventDefault();
        e.stopPropagation();
        uploadPhotoRef.current.click();
      }

      const handleUploadPhoto = async(e) => {
        const file = e.target.files[0]; // note how we accept the file
        const uploadPhoto = await uploadFile(file)
        // console.log("uploadPhoto",uploadPhoto)
       
        setData((prev) => {
          return {
            ...prev,
            profile_pic: uploadPhoto?.url,//? to ensure to take it when it is only available
          };
        });
      };

      const handleSubmit = async (e)=>{
        
        e.preventDefault();
        e.stopPropagation();
        try {
          const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

          const response = await axios({
            method:'post',
            data:data,
            url:URL,
            withCredentials:true// need this because we are extracting the token from the cookie in the backend
          })
          toast.success(response?.data?.message)
          if(response?.data?.success){
            dispatch(setUser(response?.data?.data))
          }
          onClose();
        } catch (error) {
          toast.error(error?.response?.data?.message)

        }
        

      }
    return (
    <>
      {/* this is the backdrop */}
      <div className=" fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
        {/* this is the dialogue */}
        <div className="bg-white  rounded p-4 py-5 m-1 w-full max-w-sm">
          <h2 className="font-semibold ">Profile Details</h2>
          <p className="text-sm">Edit User Details</p>
       
       <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
        <label htmlFor="name">
            Name :
        </label>
       
         <input
         type="text"
         id="name"
         name="name"
         value={data.name}
         onChange={handleOnChange}
         className="bg-slate-100 px-5 py-1 focus:outline-primary"
       />
        </div>

        <div >
        <div>Photo :</div>
       
         <div className="my-1 flex items-center gap-4">
          <Avatar width={40} height={40} imageUrl={data?.profile_pic} name={data?.name} />
          <label  htmlFor="profile_pic">
        <button className="font-semibold" onClick={handleOpenUploadPhoto}>Change Photo</button>
         
         <input
          id="profile_pic"
         type='file'
         className="hidden"
         onChange={handleUploadPhoto}
         ref={uploadPhotoRef}
         />

        </label>
         </div>
        </div>
      {/*
      flex gap-2 ml-auto : make buttons come to left
      */}
        <Divider />
        <div className="flex gap-2 ml-auto ">
          <button onClick={onClose} className="border-primary hover:bg-secondary hover:text-white border px-4 text-primary py-1 rounded">
            Cancel
          </button>
        <button onClick={handleSubmit} className="border-primary text-white hover:bg-secondary bg-primary border px-4 py-1 rounded">
          Save
        </button>

        </div>

        
       </form>
        </div>
      </div>
    </>
  );
};

export default EditUserDetails;
