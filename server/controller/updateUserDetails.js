const UserModel = require("../models/UserModel");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

async function updateUserDetails(request, response) {
  try {
   //if I ANT TO UPDATE USER info , then I am logged in , so take user info from token
    const token = request.cookies.token || ""//get the user token from cookies

    const user = await getUserDetailsFromToken(token)
   
    const { name, profile_pic } = request.body;
    
   
    const updateUser = await UserModel.updateOne({_id:user._id},{
        name,
        profile_pic
    })
    //after update , fetch data from db to send it to the client side
    const userInformation = await UserModel.findById(user._id)
    
    return response.status(200).json({
        message: "User updated Successfully",
        data: userInformation,
        success : true
      });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}


module.exports = updateUserDetails