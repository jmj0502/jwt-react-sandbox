//here we are going to set our jwt configuration.
const jwt = require('jsonwebtoken');

async function verifyToken (req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided'});
        }

        //this process will decode our token.
        const decoded = await jwt.verify(token, 'mytoken');
        req.body.username = decoded.username;
        next();
    } catch (err) {
        res.json(err);
    }
};

//exporting our configuration.
module.exports = verifyToken;