import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

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
    
    //console.log("REQ.FILES =", req.files);

    const {username, email, fullname, password} = req.body
    console.log("email: ",email)
// Could also use basic if else , this is just a more advanced method
    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }


    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser){
        throw new ApiError(409, "User with same email or username already exists")
    }

    let avatarLocalPath = req.files.avatar[0].path.replace(/\\/g, "/");
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path.replace(/\\/g, "/");
    }
     
    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const CoverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar){
        throw new ApiError(400, "Avatar upload failed")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
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
        new ApiResponse(201, usercreated, "User registered successfully")
    )
})



export {registerUser}