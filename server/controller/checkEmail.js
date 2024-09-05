const UserModel = require("../models/UserModel");
async function checkEmail(request, response) {
  try {
    const { email } = request.body;
    
    const checkEmail = await UserModel.findOne({ email }).select("-password")//remove the password of that user
    if (!checkEmail) {
      return response.status(400).json({
        message: "User does not exist",
        error: true,
      });
    }


    return response.status(200).json({
        message: "email verified",
        data: checkEmail,
        success : true
      });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}


module.exports = checkEmail