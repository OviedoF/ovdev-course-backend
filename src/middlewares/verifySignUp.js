const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const verifySignUp = {};

verifySignUp.checkDuplicateEmail = async (req, res, next) => {
    const email = await User.findOne({email: req.body.email});

    if(email) {
        return res.status(400).json({
            message: "El email ya está en uso, prueba con otro :D"
        })
    };

    next();
};

module.exports = verifySignUp;