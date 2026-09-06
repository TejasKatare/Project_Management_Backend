import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

/*
const healthCheck = (req, res) => {
    try {
        res.status(200).json(new ApiResponse(200, {message: "Server is running "}));
    } catch (error) {}
}
*/

const healthCheck = asyncHandler(async (req, res) => {
    //throw new ApiError(500, "Error throw working fine");
    res.status(200).json(new ApiResponse(200, {message: "Everything is fine here"}));
});

export { healthCheck };