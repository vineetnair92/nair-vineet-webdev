/**
 * Created by Vineet Nair on 11/18/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByFacebookId: findUserByFacebookId,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        console.log("User models created");
        return User.create(user);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserById(userId) {

        return User.findById(userId);
    }

    function findUserByFacebookId(facebookId) {
                return User.findOne({'facebook.id': facebookId});
            }

    function updateUser(user, userId) {
        delete user._id;
        return User.update({_id: userId},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    websites: user.websites
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};