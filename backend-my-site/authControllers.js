const User = require('./modules/User');
const Blog = require('./modules/blog');
// const asyncHandler =require('express-async-handler')
const jwt = require('jsonwebtoken');
const maxAge = 5 * 24 * 60 * 60
const createJWT = id => {
    return jwt.sign({ id }, 'chatroom secret', {
        expiresIn: maxAge
    })
}
const alertError = (err) => {
    let errors = { name: '', email: '', password: '' }
    console.log('err message', err.message);
    console.log('err code', err.code);
    if (err.message === 'incorrect email') {
        errors.email = 'This email not found';
    }
    if (err.message === 'incorrect pwd') {
        errors.password = 'The password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'This email already registered';
        return errors;
    }
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}
module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });
    } catch (error) {
        let errors = alertError(error);
        res.status(400).json({ errors });
    }

}
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user });
    } catch (error) {
        console.log(error)
        let errors = alertError(error);
        res.status(400).json({ errors });
    }
}
module.exports.verifyuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'chatroom secret', async (err, decodedToken) => {
            console.log('decoded token', decodedToken)
            if (err) {
                console.log(err.message)
            } else {
                let user = await User.findById(decodedToken.id)
                res.json(user);
                next();

            }
        })
    } else {
        next();
    }
}
module.exports.logout = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 })
    res.status(200).json({ logout: true })
}

module.exports.createBlog = (req, res, next) => {

    const newBlog = new Blog(
        {
            title: req.body.title,
            content: req.body.content,
        }
    )
    newBlog.save()
        .then(data => res.json(data))
        .catch(err => console.log(err))

}
module.exports.getBlog = (req, res, next) => {
    Blog.find()
        .then((data) => res.json(data))
        .catch(err => console.log(err))
}
module.exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete({ _id: id }, (req, res, err) => {
        if (!err) {
            console.log("deleted");
        } else {
            console.log(err);
        }
    })
}
module.exports.updateBlog = (req, res) => {

    const updatedItem = {
        title: req.body.title,
        content: req.body.content,
    };
    const id = req.params.id;


    // console.log(updatedItem.title)
    const result = Blog.findByIdAndUpdate(
        { _id: id },
        { $set: updatedItem },
        (res, err) => {
            if (res) {
                console.log(err);
            } else {
                console.log(res)
            }
        });
    console.log(result);
}