/**
 * Created by Vineet Nair on 11/18/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
    };
    return api;


    function createWebsiteForUser(uid,website) {
        website._user = uid;
        console.log("Website created");
        return Website.create(website);
    }


    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }


    function findWebsiteById(websiteId) {
        return Website.findById({_id: websiteId});
    }


    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website.update({_id: websiteId},
            {
                $set: {
                    _user: website._user,
                    name: website.name,
                    description: website.description,
                    pages: website.pages
                }
            });
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

};