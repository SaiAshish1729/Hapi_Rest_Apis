const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null, filename)
    }
});

// filter config
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only .png, .jpeg, and .jpg files are supported"));
    }
}

const uploads = multer({
    storage: storage,
    fileFilter: fileFilter
})


module.exports = {
    uploads
}