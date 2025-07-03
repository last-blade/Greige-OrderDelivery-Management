import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../constants.js";
import {
  apiError,
  apiResponse,
  asyncHandler,
  generateAccessToken,
  generateRefreshToken,
  User,
} from "../allImports.js";

const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  if (!email.trim()) {
    throw new apiError(400, "Email is required");
  }

  if (!password) {
    throw new apiError(400, "Password is required");
  }

  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    throw new apiError(404, "User not found");
  }

  const accessToken = await generateAccessToken(foundUser._id);
  const refreshToken = await generateRefreshToken(foundUser._id);

  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Something went wrong while generating tokens");
  }

  foundUser.refreshToken = refreshToken;
  foundUser.save({ validateBeforeSave: false });

  return response
    .status(200)
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .json(new apiResponse(200, foundUser, "Login successfully"));
});

export { loginUser };
