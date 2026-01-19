import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiRespone.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  // validation - not empty
  // check if user already exists - username, email
  // check for images , check for avatar
  // upload them to cloudinary , avatar
  // create user object - create entry in db
  // remove pass & refresh token field from response
  // check for userCreation
  const { fullName, email, username, password } = req.body;
  console.log("email :", email);
  if (
    [fullName, email, username, password].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
   if(existedUser){
       throw new ApiError(409,"User with email or username already exists");
   }
  //  console.log("req.files:", req.files);
  //  console.log("avatar files:", req.files?.avatar);
  //  console.log("coverImage files:", req.files?.coverImage);
    const avatarLocalPath =  req.files?.avatar?.[0]?.path;
   const coverImageLocalPath =   req.files?.coverImage?.[0]?.path;
   if(!avatarLocalPath){
          throw new ApiError(400,"Avatar file is required");
   }
     const avatar = await uploadOnCloudinary(avatarLocalPath);
    //  console.log(avatar);
    
     if(!avatar?.url){
       throw new ApiError(400,"Avatar file is required");
     }
     let coverImage;
     if (coverImageLocalPath) {
       coverImage = await uploadOnCloudinary(coverImageLocalPath);
     }

    //  console.log(avatar)
     if (!avatar?.url) {
      throw new ApiError(400, "Avatar upload failed");
    }

   const user =  await User.create({
       fullName,
       avatar : avatar.url,
       coverImage : coverImage?.url || "" ,
       email,
       password,
       username : username.toLowerCase()
       
     });
   const createdUser =  await  User.findById(user._id).select(
       "-password -refreshToken"
   );
   if(!createdUser){
       throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
       new ApiResponse(200,createdUser,"User registered successfully")
   )
   
     
});

export { registerUser };
