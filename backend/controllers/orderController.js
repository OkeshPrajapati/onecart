import { razorpayInstance } from "../index.js"
import OrderModel from "../models/order.modal.js"
import UserModel from "../models/userModal.js"



const currency ="INR"


// 🟢 Place New Order
export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body
        const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)

        await newOrder.save()
        await UserModel.findByIdAndUpdate(userId, { cartData: {} })


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

export const placeOrderRazorpay = async(req,res)=>{
    try {
        
        const {items,amount,address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }
        const newOrder = new OrderModel(orderData)
        await newOrder.save()
        const options = {
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder.id.toString()
        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                return res.status(500).json(error)
            }
            return res.status(200).json(order)
        })
    } catch (error) {
          console.log(error)
          res.status(500).json({
            message:error.message})
        
    }
}

// export const verifyRazorpay = async(req,res)=>{
//     try {
//         const userId = req.userId
//         const {razorpay_order_id} = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if(orderInfo.status === "paid"){
//             await OrderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await UserModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.status(200).json({message:"payment successsful"})
//         }
//         else{
//             res.json({message:"payment failed"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:error.message})
        
//     }
// }

export const verifyRazorpay = async (req, res) => {
  try {

    const userId = req.userId
    const { razorpay_order_id } = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if (orderInfo.status === "paid") {

      await OrderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
      await UserModel.findByIdAndUpdate(userId, { cartData: {} })

      return res.status(200).json({
        success: true,
        message: "payment successful"
      })

    } else {

      return res.json({
        success: false,
        message: "payment failed"
      })

    }

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}


export const getUserOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await OrderModel.find({ userId })
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "error while geting oders"
        })

    }

}


export const allOrders = async (req, res) => {

    try {
        const orders = await OrderModel.find({})
        return res.status(200).json({
            message: "all orders",
            orders
        })
    } catch (error) {
        console.log("error while geting all orders ")

    }
}


export const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body
        await OrderModel.findByIdAndUpdate(orderId, { status })
        return res.status(201).json({
            message: "status update"
        })
    } catch (error) {
        console.log("error while update status ")

    }
}
