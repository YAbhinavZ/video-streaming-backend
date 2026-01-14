import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req ,res )=>{
       // get user detail from frontend 
       // validation - not empty
       // check if user already exists - username, email
       // check for images , check for avatar
       // upload them to cloudinary , avatar
       // create user object - create entry in db
       // remove pass & refresh token field from response 
       // check for userCreation
       const {fullName,email,username,password} = req.body;
       console.log("email :",email);

})

export {registerUser};