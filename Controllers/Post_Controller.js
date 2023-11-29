const models = require('../models');

const savePost = async (req, h) => {
    try {
        const { title, content, imageUrl, categoryId, userId, } = req.payload;

        const newPost = await models.posts.create({ title, content, imageUrl, categoryId, userId });

        return h.response({ message: "Sucessfully post created", data: newPost }).code(201)
    } catch (error) {
        console.log(error);
    }
};

// get single post by Id
const getSinglePost = async (req, h) => {
    try {
        const { id } = req.params;

        // const post = await models.posts.findByPk({ where: { id } });
        const post = await models.posts.findByPk(id);

        if (!post) {
            return h.response({ message: "Post not found" }).code(404);
        } else {
            return h.response({ message: "Sucessfully get post", data: post }).code(200)
        }

        return h.response({ message: "Sucessfully get post", data: post }).code(200);

    } catch (error) {
        console.log(error);
    }
};

// get all the records 
const getAllPosts = async (req, h) => {
    try {
        const posts = await models.posts.findAll();

        return h.response({ success: true, message: "Sucessfully get all posts", data: posts }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
};

// update the records
const updateRecord = async (req, h) => {
    try {
        const { id } = req.params;
        const { title, content, imageUrl, categoryId } = req.payload;

        const post = await models.posts.update({ title, content, imageUrl, categoryId }, { where: { id } });
        console.log(post);

        if (!post) {
            return h.response({ message: "Post not found" }).code(404);
        } else {
            const syncUpdatedData = await models.posts.findByPk(id)
            return h.response({ message: "Sucessfully update post", updatedData: syncUpdatedData }).code(200)
            // console.log("Data : ", syncUpdatedData)
        }

        // return h.response({ message: "Sucessfully update post", data: post }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// delete a single record by its ID
const deleteRecord = async (req, h) => {
    try {
        const { id } = req.params;

        const post = await models.posts.destroy({ where: { id } });

        if (!post) {
            return h.response({ message: "Post not found" }).code(404);
        } else {
            return h.response({ message: "Sucessfully delete post", data: post }).code(200)
        }

        // return h.response({ message: "Sucessfully delete post", data: post }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
};

module.exports = {
    savePost,
    getSinglePost,
    getAllPosts,
    updateRecord,
    deleteRecord
};