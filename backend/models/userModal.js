import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    
    },
    cartData: {
        type:Object,
        default: {}
    }
}, {
    timestamps: true,minimize:false
})

const UserModel = mongoose.model("user", userSchema);
export default UserModel;