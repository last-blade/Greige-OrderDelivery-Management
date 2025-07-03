import mongoose, { Schema } from "mongoose";

const greigeSchema = new Schema({

    orderDate: {
        type: Date,
        required: true,
    },

    orderNo: {
        type: String,
        required: true,
        trim: true,
    },

    fabricName: {
        type: String,
        required: true,
        trim: true,
    },

    requiredAmount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },

    remarks: {
        type: String,
        required: false,
        trim: true,
    },

    recd: {
        type: String,
        required: false,
        trim: true,
    },

    balance: {
        type: String,
        required: false,
        trim: true
    },

}, {timestamps: true});

export const Greige = mongoose.model("Greige", greigeSchema);