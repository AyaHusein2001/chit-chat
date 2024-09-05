const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
//user has logged in , now we want his info
async function userDetails(request, response) {
  try {

    const token = request.cookies.token || ""//get the user token from cookies

    const user = await getUserDetailsFromToken(token)
   
    return response.status(200).json({
        message: "user details",
        data: user,
      });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}


module.exports = userDetails