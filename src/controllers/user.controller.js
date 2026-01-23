import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    //validation - should not be empty
    //check if user already exists: via username, email
    //check for images, check for avatar
    //Upload them to cloudinary, mainly avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {username, email, fullname, password} = req.body
    console.log("email: ",email)
// Could also use basic if else , this is just a more advanced method
    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }


     const existUser = User.findOne({
        $or: [{ username }, { email }]
     })

     if (existUser){
        throw new ApiError(409, "User with same email or username already exists")
     }

     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;
     
     if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
     }

     const Avatar = await uploadOnCloudinary(avatarLocalPath)
     const CoverImage = await uploadOnCloudinary(coverImageLocalPath)

     if (!Avatar){
        throw new ApiError(400, "Avatar file is required")
     }

     const user = await User.create({
        fullname,
        avatar: Avatar.url,
        coverImage: CoverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })

     const usercreated = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if (!usercreated) {
        throw new ApiError(500, "Something went wrong while registering the user")
     }

     return res.status(201).json(
        new ApiResponse(200, usercreated, "User registered successfully")
     )
})


export {registerUser}