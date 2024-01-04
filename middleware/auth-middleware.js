const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {
    const header = req.get('Authorization');
    if(!header)
    {
        req.isAuth = false;
        return next();
    }
    else
    {
        const token = header.split(' ')[1];
        if(!token || token === '')
        {
            req.isAuth = false;
            return next();
        }
        let decoded;
        try {
            decoded = jwt.verify(token , `${process.env.SECRET_KEY}`)
        } catch (error) {
            req.isAuth = false;
            return next();
        }
        if(!decoded)
        {
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decoded.userId;
        next();
    }
}