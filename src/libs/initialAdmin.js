const path = require('path');
require('dotenv').config();
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));

const createInitialUser = async () => {
    try {
        const count = await User.estimatedDocumentCount();

        const rolesFinded = await Role.find({}, {_id: true});
        
        const roles = rolesFinded.map(el => el._id);

        if(count == 0){
            const values = await Promise.all([
                new User({
                    name: "ovdev",
                    email: process.env.INITIAL_ADMIN_EMAIL,
                    password: await User.encryptPassword(process.env.INITIAL_ADMIN_PASS),
                    roles: roles
                }).save()
            ]);

            console.log('initial Admin created.');
            console.log(values); 
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialUser;