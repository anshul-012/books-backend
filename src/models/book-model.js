import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Book name is required"]
    },
    image:{
        url:{
            type:String,
        },
        public_id:{
            type:String
        }
    },
    author:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    }
})

const Book = mongoose.model("Book", bookSchema);

export default Book;
