const usersControllers = require("../Controllers/User_Controller");
const Auth = require("../middleware/Authenticate");
const uploads = require("../helper/multerConfig")

module.exports = [
    {
        method: 'post',
        path: '/sign-up-users',
        handler: usersControllers.signUp
    },
    {
        method: 'post',
        path: '/sign-in-users',
        handler: usersControllers.signInUser
    },
    // {
    //     method: 'put',
    //     path: '/update-users',
    //     handler: (request, h) => Auth(request, h, usersControllers.updateUser)
    // }
    {
        method: 'put',
        path: '/update-users',
        handler: usersControllers.updateUser
    },
    {
        method: 'post',
        path: '/upload-image',
        handler: (request, h) => {
            uploads.single("profile")(request, h, (err) => {
                if (err) {
                    // Handle multer error, if any
                    return h.response({ message: 'Multer error', error: err }).code(400);
                }

                usersControllers.uploadImage(request, h);
            });
        }
    }
]