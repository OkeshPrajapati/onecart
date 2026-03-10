import UserModel from "../models/userModal.js";

export const addToCartController = async (req, res) => {
  try {
    let { itemId, size, quantity } = req.body;

    const userData = await UserModel.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    cartData[itemId][size] += quantity || 1;

    await UserModel.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({
      message: "Added to cart",
      cart: cartData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Cart error" });
  }
};

export const updateCartcontroller = async(req,res)=>{
    try {
        let {itemId, size , quantity} = req.body;
        const userData = await UserModel.findById(req.userId)
        let cartData = await userData.cartData


        cartData[itemId][size] = quantity

        await UserModel.findByIdAndUpdate(req.userId,{cartData})
        return res.status(200).json({message:"cart update "})
    } catch (error) {
        console.log("while updatecart",error)
         return res.status(500).json({message:"cartupdate error "})
    }
}

export const getUserCartController = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.userId);

    return res.status(200).json({
      cart: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting cart" });
  }
};