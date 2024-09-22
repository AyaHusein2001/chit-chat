const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
  try {
    const { password,userId } = request.body
    console.log('pass',password)
    console.log('uId',userId)



    const user = await UserModel.findById(userId)
    
    const verifiedPassword = await bcryptjs.compare(password,user.password)
    
    if (!verifiedPassword) {
      return response.status(400).json({
        message: "Please enter correct password",
        error: true,
      });
    }

    //JWT for security
    const tokenData = {
        id: user._id,
        email: user.email
    }

    const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'})

    const cookieOptions = {
        http:true,
        secure:true
    }

    return response.cookie('token',token,cookieOptions).status(200).json({
        message: "Logged in successfully",
        token: token,
        success : true
      });

    ///////////
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}


module.exports = checkPassword
