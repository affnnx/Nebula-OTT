import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    //create schema                     
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : "",
    },
    searchHistory : {
        type : Array,
        default : [],
    },
})

export const User =mongoose.model('User', userSchema)   //create a user collection that is based of of this userSchema
//the collection name sld be singular and the first letter is to be capitalized