const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('Authorization');
    if(token == null) return res.status(401).send('Access Denied');
    const div = token.split(' ')[1];

    try{
        const verified = jwt.verify(div, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
};