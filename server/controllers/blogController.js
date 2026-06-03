import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gimini.js';


export const addBlog = async (req, res) => {


    try {

        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)

        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !isPublished) {
            res.status(401).json({ success: false, message: "Please fill all the fields" })
            return
        }

        // upload img to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimize the image for url conversation 

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" }, //auto compress the image 
                { format: "webp" }, //convert the image to webp format 
                { width: '1280' } //set the width of the image
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished,
        })

        res.status(201).json({
            success: true,
            message: "Blog added successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong (controller)"
        })
    }
}


// get all blogs

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong ( blog controller)"
        })
    }
}


// get single blog

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            res.status(401).json({
                success: false,
                message: "Blog not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            blog
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong (blog controller)"
        })
    }
}

// delete blog

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong ( blog controller)"
        })
    }
}


export const togglePublish = async (req, res) => {
    try {

        const { id } = req.body;
        const blog = await Blog.findById(id);

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog published status updated successfully"
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong ( blog controller)"
        })
    }
}

// add commenet 

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({
            blog,
            name,
            content
        });

        res.status(200).json({
            success: true,
            message: "Comment added successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong ( blog controller)"
        })
    }
}

export const getBlogComments = async (req, res) => {
    try {

        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 }) //short based on date 

        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong ( blog controller)"
        })
    }
}


export const generateContent = async (req, res) => {

    try {

        const { prompt } = req.body;
        const content = await main(prompt + ' Genrate a blog content for this topic in simple text format')

        res.json({
            success: true,
            content
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong in AI "
        })
    }

}

