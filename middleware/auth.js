const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (req,res,next) => {
    const token = req.headers['authorization']?.split('')[1];
    if(!token) return res.status(403).json({message : 'Token required'})
    
    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err) return res.status(403).json({message : 'Invalid token'})
        req.user=user;
        next()
    })
}

const generateToken = (userData) => {
    return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
};

module.exports={authenticateToken,generateToken}