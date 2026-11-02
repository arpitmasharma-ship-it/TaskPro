
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        const authHeader = req.headers.authorization;
        // Authorization: Bearer your_jwt_token

        // 2. Check token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: Token Missing",
                success: false
            });
        }

        // 3. Extract token
        const token = authHeader.split(" ")[1];
        // your_jwt_token

        // 4. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Attach user ID to request
        // Verified user ID ko req.user mein attach karo.
        req.user = decoded.id;

         // Valid token par next() call karo. 
        // 6. Allow next operation
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or Expired Token",
            success: false
        });
    }
};
