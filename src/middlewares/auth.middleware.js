//Every single request send the access token either via cookie or by req -> headers -> Authorization -> Bearer 'accessToken'
//As mobile application don't have cookies that's why 

import { User } from "../models/user.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if(!token){
        throw new ApiError(401, "Unauthorized reques");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );
        if(!user) throw new ApiError(401, "Invalid Acess Token");

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, "Invalid Access Token");
    }
});

export const validateProjectPermission = (roles = []) => {
    return asyncHandler(async (req, res, next) => {
        const { projectId } = req.params;

        if(!projectId) throw new ApiError(400, 'Project id is missing');

        const projectMember = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(req.user._id)
        });

        if(!projectMember) throw new ApiError(400, 'Project not found');

        const givenRole = projectMember?.role;

        req.user.projectRole = givenRole;

        if(!roles.includes(givenRole))
            throw new ApiError(403, "You do not have permission to perform this action");

        next();
    }) 
};
