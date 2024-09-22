import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditUserDetails = ({ onClose , user}) => {
  useEffect(()=>{
    setData((preve)=>{
        return{
            ...preve,
            ...user
        }
    })
},[user])

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
    return (
    <>
      {/* this is the backdrop */}
      <div className=" fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
        {/* this is the dialogue */}
        <div className="bg-white  rounded p-4 m-1 w-full max-w-sm">
          <h2 className="font-semibold ">Profile Details</h2>
          <p className="text-sm">Edit User Details</p>
       
       <form>
        <label htmlFor="name">
            Name:
        </label>
       
         <input
         type="text"
         id="name"
         name="name"
         value={data.name}
         onChange={handleOnChange}
       />
        
       </form>
        </div>
      </div>
    </>
  );
};

export default EditUserDetails;
