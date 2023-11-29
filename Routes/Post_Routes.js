const postControllers = require("../Controllers/Post_Controller");
const Authentication = require("../middleware/Authenticate")

module.exports = [
    {
        method: 'post',
        path: '/add-posts',
        handler: postControllers.savePost
        // handler: (request, h) => Authentication(request, h, postControllers.savePost)
    },
    {
        method: 'get',
        path: '/post-data/{id}',
        handler: postControllers.getSinglePost
    },
    {
        method: 'get',
        path: '/get-posts',
        handler: postControllers.getAllPosts
    },
    {
        method: 'put',
        path: '/update-post-data/{id}',
        handler: postControllers.updateRecord
    },
    {
        method: 'delete',
        path: '/delete-post-data/{id}',
        handler: postControllers.deleteRecord
    }
]
