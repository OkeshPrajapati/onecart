
import OrderModel from "../models/order.modal.js"
import UserModel from "../models/userModal.js"



// 🟢 Place New Order
export const placeOrder = async (req, res) => {
    try {
        const {items, amount, address } = req.body
        const userId = req.userId
        const orderData={
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

      const newOrder = new OrderModel(orderData)

         await newOrder.save()
         await UserModel.findByIdAndUpdate(userId,{cartData:{}})


        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
         
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message
        })
    }
}


export const getUserOrder = async(req,res)=>{
    try {
        const userId = req.userId;
        const orders = await OrderModel.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"error while geting oders"
        })
        
    }

}



export const allOrders = async(req,res)=>{

    try {
        const orders = await OrderModel.find({})
      return  res.status(200).json({
            message:"all orders",
            orders
        })
    } catch (error) {
        console.log("error while geting all orders ")
        
    }
}


export const updateStatus = async(req,res)=>{

    try {
        const {orderId,status} = req.body
        await OrderModel.findByIdAndUpdate(orderId,{status})
        return res.status(201).json({
            message:"status update"
        })
    } catch (error) {
        console.log("error while update status ")
        
    }
}
