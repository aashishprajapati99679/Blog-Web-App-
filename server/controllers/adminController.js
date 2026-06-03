import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET
        )

        res.json({
            success: true,
            message: "Admin logged in successfully",
            token
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })

    }
}



export const getAllBlogsAdmin = async (req, res) => {

    try {

        const blogs = await Blog.find({}).sort({ createdAt: -1 })

        res.json({
            success: true,
            message: "All blogs fetched successfully",
            blogs
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })


    }

}

export const getAllComments = async (req, res) => {

    try {

        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })

        res.json({
            success: true,
            message: "All comments fetched successfully",
            comments
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })

    }

}

export const getDashboard = async (req, res) => {
    try {

        const recentBlogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false })

        const getDashboard = {
            blogs, comments, drafts, recentBlogs
        }

        res.json({
            success: true,
            message: "Dashboard data fetched successfully",
            getDashboard
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })
    }
}


export const deleteCommentById = async (req, res) => {

    try {

        const { id } = req.body;
        await Comment.findByIdAndDelete(id);

        // Delete all commments associiated with the blog 
        await Comment.deleteMany({ blog: id });


        res.json({
            success: true,
            message: "Comment deleted successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })
    }

}



export const approveCommentById = async (req, res) => {

    try {

        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({
            success: true,
            message: "Comment approved successfully",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error controller"
        })
    }

}




