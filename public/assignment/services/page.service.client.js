/**
 * Created by Vineet Nair on 10/19/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": "createPage",
            "findPageByWebsiteId": "findPageByWebsiteId",
            "findPageById":"findPageById",
            "updatePage":"updatePage",
            "deletePage":"deletePage"
        };
        return api;

        function createPage(websiteId,page) {
            var page_new= {
                _id: (new Date()).getTime().toString(),
                name:page.name,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(page_new);
        }


        function findPageByWebsiteId(websiteId) {
            pages_list=[];
            for (var p in pages){
                if (pages[p].websiteId ===  parseInt(websiteId)){
                    pages_list.push(pages[p]);
                }
            }
            return pages_list;
        }


        function findPageById(pageId) {
            for (var p in pages){
                page = pages[p];
                if (page._id ===  parseInt(pageId)){
                    return page;
                }
            }
            return null;
        }


        function updatePage(pageId, page) {
            for (var p in pages){
                currentPage = pages[p];
                if (currentPage._id ===  parseInt(pageId)){
                    currentPage.name = page.name;
                    currentPage.websiteId= page.websiteId;
                    currentPage.description= page.description;
                    return true;
                }
                return false;
            }
        }

        function deletePage(pageId) {
            for (var i in pages){
                page = pages[i];
                if (page._id ===  parseInt(pageIdId)){
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


    }
})();