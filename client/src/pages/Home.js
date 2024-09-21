import axios from 'axios'
import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Home = () => {
  //access the user from the state using useSelector
  const user = useSelector(state=>state.user)
  console.log('redux-user',user)
  const fetchUserDetails=async()=>{
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
    
    try {
      const response = await axios(
        {
          method:'get',
          url:URL,
          withCredentials:true// because we have the cookie now as user is logged in 
        }
      )
      console.log('current user details',response)
    } catch (error) {
      console.log('error',error)
    }
  }

  useEffect(() => {
    fetchUserDetails();//once mounted , fetch user details
  }, [])
  
  
  return (
    <div>Home
        {/* message component */}
        <section>
        <Outlet />
        </section>
    </div>
    
  )
}

export default Home