const mongoose = require('mongoose')
const Schema = mongoose.Schema // function to create a new schema

// A Blog Title 
// A Blog Author (Name of the person, who made the post) 
// Blog Content

const blogSchema = new Schema ({
    // Properties
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Model', blogSchema)


/* NOTES
    - Schema: defines the structure of a document
    - Model: provides an interface for interacting with the documents in the database
*/