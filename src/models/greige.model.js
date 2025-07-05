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
        unique: true,
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
        default: "NA",
    },

    recd: {
        type: String,
        required: false,
        trim: true,
        default: "NA",
    },

    balance: {
        type: String,
        required: false,
        trim: true,
        default: "NA",
    },

    greigeStock: {
        type: String,
        required: false,
        trim: true,
        default: "0",
    },

    unit3OrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit3",
    },

    greigeCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {timestamps: true});

export const Greige = mongoose.model("Greige", greigeSchema);