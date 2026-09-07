import { body } from "express-validator";
import {AvailableUserRole} from '../utils/constants.js'

const userRegisterValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength({min: 3})
            .withMessage("Username must be at least 3 charaacters")
            .isLength({max: 50})
            .withMessage("Username must be less then 50 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isStrongPassword()
            .withMessage("Password is not strong"),
        body("fullName")
            .optional()
            .trim()
    ]
}

//M2: 
const createUserValidationSchema = {

    email: {
        trim: true,

        notEmpty: {
            errorMessage: "Email is required"
        },

        isEmail: {
            errorMessage: "Email is invalid"
        }
    },

    username: {
        trim: true,

        notEmpty: {
            errorMessage: "Username is required"
        },

        isLowercase: {
            errorMessage: "Username must be in lower case"
        },

        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Username must be at least 3 characters"
        },

        isLength: {
            options: {
                max: 50
            },
            errorMessage: "Username must be less than 50 characters"
        }
    },

    password: {
        trim: true,

        notEmpty: {
            errorMessage: "Password is required"
        },

        isStrongPassword: {
            errorMessage: "Password is not Strong"
        }
    },

    fullName: {
        optional: true,
        trim: true
    }
};
// You can now just do checkSchema(createUserValidationSchema) -> middleware
// import {checkSchema} from 'express-validator' 

const loginUserValidationSchema = {

    email: {
        trim: true,
    
        notEmpty: {
            errorMessage: "Email is required"
        },

        isEmail: {
            errorMessage: "Email is invalid"
        }
    },

    username: {
        trim: true,

        optional: true,

        isLowercase: {
            errorMessage: "Username must be in lower case"
        },

        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Username must be at least 3 characters"
        },

        isLength: {
            options: {
                max: 50
            },
            errorMessage: "Username must be less than 50 characters"
        }
    },

    password: {
        trim: true,

        notEmpty: {
            errorMessage: "Password is required"
        },

    },
}

const userChangeCurrentPasswordValidatorSchema = {
    oldPassword:{
        notEmpty: {
            errorMessage: "Old password is required"
        }
    },
    newPassword:{
        notEmpty:{
            errorMessage: "New password is required"
        }
    }
}

const userForgotPasswordValidatorSchema = {

    email:{
        notEmpty:{
            errorMessage: "Email is required"
        },

        isEmail:{
            errorMessage: "Email is not valid"
        }
    }
}

const userResetForgotPasswordValidatorSchema = {
    newPassword:{
        notEmpty:{
            errorMessage: "Password is required"
        },

        isStrongPassword: {
            errorMessage: "Password is not strong"
        }
    }
}

const createProjectValidatorSchema = {
    name:{
        notEmpty:{
            errorMessage: "Name is required"
        }
    },

    description:{
        optional: true
    }
}

const addMemberToProjectValidatorSchema = {
    email:{
        trim: true,
        notEmpty:{
            errorMessage: "Email is required"
        },
        isEmail:{
            errorMessage: "Email is invalid"
        }
    },
    role:{
        notEmpty:{
            errorMessage: "Role is required"
        },
        isIn: { 
            options: [AvailableUserRole], 
            errorMessage: "Role is invalid",
        }
    }
}

export { 
    userRegisterValidator, 
    createUserValidationSchema, 
    loginUserValidationSchema,
    userChangeCurrentPasswordValidatorSchema,
    userForgotPasswordValidatorSchema,
    userResetForgotPasswordValidatorSchema,
    createProjectValidatorSchema,
    addMemberToProjectValidatorSchema,
    createProjectValidatorSchema
};