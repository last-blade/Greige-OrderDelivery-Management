import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authentication = asyncHandler(async (request, response, next) => {
    const {accessToken} = request?.cookies;

    if(!accessToken){
        throw new apiError(401, "Unauthorized access!")
    }

    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken){
        throw new apiError(401, "Unauthorized access!")
    }

    const userId = decodedToken?.id;

    const foundUser = await User.findById(userId).select("-password -refreshToken -__v");

    if(!foundUser){
        throw new apiError(401, "Unauthorized access, please login again")
    }

    request.user = foundUser;

    return next();
});

export {authentication}