const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: ["Username is required", true]
    },
    email: {
        type: String,
        required: ["Email is required", true]
    },
    password: {
        type: String,
        required: ["Password is required", true]
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    token:{
        type: String
    }
    
}, { timestamps: true } );

const userModel = mongoose.model( 'user', userSchema );

module.exports = userModel;