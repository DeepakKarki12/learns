import jwt from 'jsonwebtoken'


const authenticateToken = (req, res, next) => {

    console.log("authentication started")
    const token = req.headers['authorization'];
    const secretKey = req.body.payload.key
    if (!token) return res.status(403).json({ message: 'No token provided.' });
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log("error in verifying")
            return res.status(401).json({ message: 'Failed to authenticate token.' })
        
        };

        req.userId = decoded.userId; // Save the decoded user ID for future use
        next();
    });
};

export default authenticateToken;