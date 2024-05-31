const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

/* FUNCTIONS FOR BLOGS */
// Possible error, rename all const variables to "blogs"

// Get all blogs
const getBlogs = async (req, res) => {
    // get all blogs (newests blogs on top)
    const blogs = await Blog.find({}).sort({createdAt: -1}) 

    res.status(200).json(blogs)
} 

// Get a single blog
const getSingleBlog = async (req, res) => {
    const {id} = req.params
    
    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cannot find blog'})
    }

    // gets and finds a specific blog
    const singleBlog = await Blog.findById(id)

    // If workout doesn't exist
    if (!singleBlog) {
        return res.status(404).json({error: 'No such blog'})
    }

    res.status(200).json(singleBlog)
}

// Create a new blog
const createBlog = async (req, res) => {
    const {title, author, content} = req.body 

    // Checks if any empty fields
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    } 
    if (!author) {
        emptyFields.push('author')
    }
    if (!content) {
        emptyFields.push('content')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    
    // add doc to db
    try {
        const blog = await Blog.create({title, author, content}) // creates a blog (response gets stored into 'blog')
        res.status(200).json(blog) // send response of blog
    } 
    catch (error) {
        res.status(400).json({error: error.message, emptyFields})
    }
}

// Delete a blog
const deleteBlog = async (req, res) => {
    const {id} = req.params

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cannot find blog'})
    }

    const removedBlog = await Blog.findOneAndDelete({_id: id})

    // If workout doesn't exist
    if (!removedBlog) {
        return res.status(404).json({error: 'No such blog'})
    }
    
    res.status(200).json(removedBlog)
} 

// Update a blog
const updateBlog = async (req, res) => {
    const {id} = req.params

    // Check for valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Cannot find blog'})
    }
    
    const updatedBlog = await Blog.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    // If workout doesn't exist
    if (!updatedBlog) {
        return res.status(404).json({error: 'No such blog'})
    }

    res.status(200).json(updatedBlog)
}


module.exports = {
    getBlogs,
    getSingleBlog,
    createBlog,
    deleteBlog,
    updateBlog
}