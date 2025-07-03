import { apiError } from "../utils/apiError.js";

function authorizeRoles(...allowedRoles) {
    return (request, response, next) => {
        const userRole = request?.user?.accountType;

        if (!request.user || !allowedRoles.includes(userRole)) {
            console.log("Access Denied: user role is", userRole);
            return response.status(403).json({
                statusCode: 403,
                success: false,
                data: null,
                errors: ["Access denied"]
            });
        }

        next();
    };
}

export { authorizeRoles };
