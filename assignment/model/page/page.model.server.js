/**
 * Created by Vineet Nair on 11/26/2016.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
    var Page = mongoose.model('Page', PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(wid,page) {
        page._website= wid;
        console.log("Page created");
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById({_id:pageId});
    }

    function updatePage(pageId, page) {
        delete page._id;
        return Page.update({_id: pageId},
            {
                $set: {
                    _website: page._website,
                    name: page.name,
                    title: page.title,
                    description: page.description,
                    widgets: page.widgets
                }
            });
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }

};