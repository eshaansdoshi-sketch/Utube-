import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccesToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verify } from "jsonwebtoken";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)

// Secured routes

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccesToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload. single('avatar'), updateUserAvatar)
router.route("/coverImage").patch(verifyJWT, upload.single('coverImage'), updateUserCoverImage)

router.route("/channel/:username").get(verifyJWT, getUserChannelProfile) // its a specific pattern to follow when u r getting data from url(req.params)
                                                                         //  and the name of what u r taking should also match with ethat was defined in the controller
router.route("/history").get(verifyJWT, getWatchHistory)

export default router