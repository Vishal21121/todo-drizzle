import { body } from "express-validator";
import { AvailableUserTypes } from "../utils/constants";

export const userRegisterValidator = ()=>{
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long"),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email id"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({min:8,max:13})
            .withMessage("Password must be between 8 to 13 characters"),
        body("userType")
            .trim()
            .notEmpty()
            .withMessage("UserType is required")
            .isIn(AvailableUserTypes)
            .withMessage("Invalid user Type")
    ];
}
export const userLoginValidator = ()=>{
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email id"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("userType")
            .trim()
            .notEmpty()
            .withMessage("UserType is required")
            .isIn(AvailableUserTypes)
            .withMessage("Invalid user Type")
    ];
}