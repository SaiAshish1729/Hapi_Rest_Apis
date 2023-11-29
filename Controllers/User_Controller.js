const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const SECRET = "@#$@#%$#CJYC"

// sign-up users
const signUp = async (req, h) => {
    try {
        const { name, email, password } = req.payload;
        if (!name) {
            return h.response({ message: "Please enter your name" });
        }
        if (!email) {
            return h.response({ message: "Please enter your email" });
        }
        if (!password) {
            return h.response({ message: "Please enter your password" });
        }

        const preUser = await models.User.findOne({ where: { email } });

        if (preUser) {
            return h.response({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await models.User.create({ name, email, password: hashedPassword });
            return h.response({ message: "Sucessfully sign-up", data: newUser }).code(201);


        }


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// sign-in user
const signInUser = async (req, h) => {
    try {
        const { email, password } = req.payload;
        if (!email) {
            return h.response({ message: "Please enter your email" });
        }
        if (!password) {
            return h.response({ message: "Please enter your password" });
        }

        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            return h.response({ message: "User not found" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return h.response({ message: "Invalid password" });
            } else {
                const token = jwt.sign({ email: user.email }, SECRET, {
                    expiresIn: "1d"
                })
                return h.response({ message: "Sucessfully sign-in", data: user, token: token }).code(200);
            }
        }

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// update User
const updateUser = async (req, h) => {
    try {
        const { name, email } = req.payload;

        if (!name) {
            return h.response({ message: "Please enter your name" });
        }
        if (!email) {
            return h.response({ message: "Please enter your email" });
        } s


        const updatedUser = await models.User.update({
            name, email
        });
        return h.response({ message: "User updated successfully", user: updatedUser });


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

const uploadImage = async (req, h) => {
    try {
        const { file } = req.file.filename;

        const saveImage = ({
            file
        });

        console.log(file);
        console.log(saveImage);
    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}
module.exports = {
    signUp, signInUser, updateUser, uploadImage
}




// user.name = name;
//             await user.save();
//             return h.response({ message: "Sucessfully updated", data: user }).code(200);