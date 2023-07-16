const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema

const recordSchema = new mongoose.Schema( {
    math: {
        type: Number,
        required: ["Score is required", true]
    },
    english: {
        type: Number,
        required: ["Score is required", true]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
       }
}, { timestamps: true } );

const recordModel = mongoose.model( 'record', recordSchema );

module.exports = recordModel;