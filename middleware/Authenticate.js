const SECRET = "@#$@#%$#CJYC"

const Authentication = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            console.error('Authentication error: Authorization header is missing');
            return res.status(401).json({ message: 'Unauthorized User!' });
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            console.error('Authentication error: Token is missing in Authorization header');
            return res.status(401).json({ message: 'Unauthorized User!' });
        }

        const decoded = jwt.verify(token, SECRET);
        req.payload = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized User!' });
    }
}

module.exports = {
    Authentication
}
