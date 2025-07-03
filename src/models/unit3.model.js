import mongoose, { Schema } from "mongoose";

const unit3Schema = new Schema({

    stock: {
        type: String,
        required: false,
        trim: true,
    },

    plannedQuantity: {
        type: Number,
        required: true,
        trim: true,
    },

    estimatedDeliveryDate: {
        type: Date,
        required: false,
    },

    revisedEstimatedDeliveryDate1: {
        type: Date,
        required: false,
    },
    revisedEstimatedDeliveryDate2: {
        type: Date,
        required: false,
    },

    days: {
        type: Number,
        requird: true,
    },

}, {timestamps: true});

export const Unit3 = mongoose.model("Unit", unit3Schema);