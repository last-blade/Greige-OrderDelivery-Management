import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    const {fullName, email, accountType, passowrd} = request.body;

    if([fullName, email, accountType, passowrd].some(inputField => inputField === undefined || inputField.trim() === "")){
        throw new apiError(400, "All fields are required")
    }

    const foundUser = await User.findOne({email: email});

    if(foundUser){
        throw new apiError(409, "User with this email already exists")
    }

    await User.create({
        fullName, 
        email, 
        accountType, 
        passowrd
    });

    return response.status(201)
    .json(
        new apiResponse(201, {}, "User registered successfully")
    )

});

export {registerUser}