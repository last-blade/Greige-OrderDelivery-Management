import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({

    comment: {
        type: String,
        required: true,
        trim: true,
    },

    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    commentedOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Greige",
        required: true,
    }

}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema)