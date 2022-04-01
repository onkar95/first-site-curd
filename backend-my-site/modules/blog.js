const mongoose = require('mongoose')

const blog = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    Date: {
        type: Date,
        default:Date.now()
    }
    
})

const Blog =mongoose.model('blog',blog)
module.exports = Blog;
