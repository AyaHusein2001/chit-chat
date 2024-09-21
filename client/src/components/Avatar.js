import React from "react";
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";
  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  // diff. bg colors for the avatar copied from tailwind documentation after searching for bg-color
  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ]

  const randomNumber = Math.floor(Math.random() * 9)
  return (
    <div
      className={`text-slate-800  rounded-full font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {/* note the avatar styling */}
      {imageUrl ? (
        <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden shadow rounded-full flex justify-center `}>
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full object-cover"
        />
    </div>
        
      ) : name ? (
        <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden shadow rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]} `}>
            {avatarName}
        </div>
    ) :(

        <PiUserCircle size={width} />
      )}
    </div>
  );
};

export default Avatar;
