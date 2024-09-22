import React,{useState} from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, seteditUserOpen] = useState(true)
  return (
    <div className="w-full h-full">
      {/*
   w-12: made it take that small width
   */}
      {/* to center an element (the icon here), we put it inside a div , make it flex , give it justify-center , items-center
    title will appear when hover
    */}
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between">
        <div>
          {/*
        take care of this part , new and fantastic
        */}
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 text-slate-600 ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipsesSharp size={20} />
          </NavLink>

          <div title='add friend' className="w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 text-slate-600">
            <FaUserPlus size={20} />
          </div>
        </div>

            <div className="flex flex-col items-center">
              <button onClick={()=>seteditUserOpen(true)} className="mx-auto" title= {user?.name}>
                <Avatar 
                width={32}
                height={32}
                name={user?.name}
                />
              </button>

              <button title='logout' className="w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 text-slate-600">
              <span className="-ml-2">
              <BiLogOut size={20}  />
              </span>
              </button>
            </div>

      </div>


      {/* Edit user details */}
      {
        editUserOpen &&(
          <EditUserDetails user={user}  onClose={()=>seteditUserOpen(false)}/>
        )
      }
    </div>
  );
};

export default Sidebar;
