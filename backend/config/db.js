import mongoose from "mongoose"

 const connectDB = async(req,res)=>{
    try {
        let res = await mongoose.connect(process.env.MONGO_URI)
        if(res){
            console.log("mongodb connected");
        }
    } catch (error) {
          console.log("error while  connecting mongodb",error);
        }
        
    }


    export default connectDB
