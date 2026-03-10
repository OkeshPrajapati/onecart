import JWt from "jsonwebtoken"

export const genToken = async(userId)=>{
try {
    let token = await JWt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
} catch (error) {
    console.log("token error")
}
}


export const genToken1 = async(email)=>{
try {
    let token = await JWt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
} catch (error) {
    console.log("token error")
}
}