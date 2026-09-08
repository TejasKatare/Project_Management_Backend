import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from '../middlewares/validator.middleware.js';
import { userRegisterValidator, createUserValidationSchema, loginUserValidationSchema, userChangeCurrentPasswordValidatorSchema, userResetForgotPasswordValidatorSchema } from "../validators/validator.js";
import { checkSchema } from "express-validator";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/*unsecured route*/
//router.route('/register').post(userRegisterValidator(), validate, registerUser);
//or
router
    .route('/register')
    .post(
        checkSchema(createUserValidationSchema), 
        validate, 
        registerUser
    );
router
    .route('/login')
    .post(
        checkSchema(loginUserValidationSchema),
        validate, 
        loginUser
    );
router.route('/verify-email/:verificationToken').get(verifyEmail);
router.route('/refresh-token').post(refreshAccessToken);
router
    .route('/forgot-password')
    .post(
        checkSchema(userResetForgotPasswordValidatorSchema),
        validate,
        resetForgotPassword
    );
router
    .route('/reset-password/:resetToken')
    .post(
        checkSchema(userResetForgotPasswordValidatorSchema),
        validate,
        resetForgotPassword
    );


//secure routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
    .route("/change-password")
    .post(
        verifyJWT,
        checkSchema(userChangeCurrentPasswordValidatorSchema),
        validate,
        changeCurrentPassword
    );

router
    .route('/resend-email-verification')
    .post(verifyJWT, resendEmailVerification);

export default router;