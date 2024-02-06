// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create JWT Token
  const token = user.getJwtToken();

  //   Options for cookie (expire after 7d)
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ), // 7days in the current date. 24 hours 60 minutes 60s and 1000 milisec .
    httpOnly: true, // only be accessed on the backend
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  }); // tokenName, valueOfToken, options
  // cookie and token expire in 7 days
};
