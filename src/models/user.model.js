import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    accountType: {
        type: String,
        enum: ["GREIGE", "UNIT3"],
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    refreshToken: {
        type: String,
        required: false,
    },

}, {timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error.message);
        return false;
    }
}

userSchema.methods.generateAccessToken = async function(){
    try {
        const accessToken = await jwt.sign(
            {
                id: this._id,
                email: this.email,
                accountType: this.accountType,
            },

            process.env.ACCESS_TOKEN_SECRET,

            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        return accessToken;
    } catch (error) {
        console.log("Error while generating access token: ", error.message)
        return;
    }
}

userSchema.methods.generateRefreshToken = async function(){
    try {
        const refreshToken = await jwt.sign(
            {
                id: this._id,
            },

            process.env.REFRESH_TOKEN_SECRET,

            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        return refreshToken;
    } catch (error) {
        console.log("Error while generating refresh token: ", error.message)
        return;
    }
}

export const User = mongoose.model("User", userSchema);