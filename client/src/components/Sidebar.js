import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowUpLeft } from "react-icons/fi";
import Avatar from "./Avatar";
import EditUserDetails from "./EditUserDetails";
import Divider from "./Divider";
import { all } from "axios";
import SearchUser from "./SearchUser";
const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, seteditUserOpen] = useState(false);
  const [allUser,setAllUser]=useState([])
  const [openSearchUser,setOpenSearchUser]= useState(false);
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      {/* grid grid-cols-[48px,1fr] : means the grey takes 48 pixel , the sidebar takes the rest */}
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

          <div
            title="add friend"
            onClick={()=>setOpenSearchUser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 text-slate-600"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => seteditUserOpen(true)}
            className="mx-auto"
            title={user?.name}
          >
            <Avatar
              width={32}
              height={32}
              name={user?.name}
              imageUrl={user?.profile_pic}
            />
          </button>

          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 text-slate-600"
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      {/* Side Bar */}

      <div className="w-full ">
        <div className=" h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800 ">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">{/* means that scroll bar will become automatically */}
            {
              allUser.length===0&&(
                <div className="mt-12">
                  <div className="flex justify-center items-center my-4 text-slate-500">
                  <FiArrowUpLeft size={50}/>
                  </div>
                  <p className="text-lg text-center text-slate-400">
                    Explore Users to start a conversation with
                  </p>
                </div>
              )
            }
        </div>
      </div>

      {/* Edit user details */}
      {editUserOpen && (
        <EditUserDetails user={user} onClose={() => seteditUserOpen(false)} />
      )}

      {/*Search user*/}
      {/* note how the onclose is sent (as a call back , not the set directly) */}
      {
        openSearchUser&&(
          <SearchUser onClose={()=>setOpenSearchUser(false)} />
        )
      }
    </div>
  );
};

export default Sidebar;
