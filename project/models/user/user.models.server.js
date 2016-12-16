module.exports = function (db,mongoose) {

//    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")(mongoose);
    var User = mongoose.model("user", UserSchema);
//    var Schema = mongoose.Schema;
    var api = {
        createUser: createUser,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        deleteCompanyForUser: deleteCompanyForUser,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function createUser(user) {
        console.log("Create user in model");
        console.log(user);
        return User.create(user);
    }

    function updateUser(user, userId) {
        return User.update({_id: userId},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {

        return User.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }


    function deleteCompanyForUser(userId, companyId) {
        return User.update({_id: userId},
            {
                $pullAll: {
                    "companies": [companyId]
                }
            },
            {safe: true});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
}