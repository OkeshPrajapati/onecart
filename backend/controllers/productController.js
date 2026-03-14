import uploadOnCloudinary from "../config/cloudinary.js";
import ProductModel from "../models/product.modal.js";

// export const addProductController = async (req, res) => {
//     try {
//         let { name, description, price, category, subCategory, sizes, date, bestSeller } = req.body;

//         let image1 = await uploadOnCloudinary(req.files.image1[0].path)

//         let image2 = await uploadOnCloudinary(req.files.image2[0].path)

//         let image3 = await uploadOnCloudinary(req.files.image3[0].path)

//         let image4 = await uploadOnCloudinary(req.files.image4[0].path)

//         let productData = {
//             name,
//             description,
//             price:Number(price),
//             category,
//             subCategory,
//             sizes:JSON.parse(sizes),
//             date,
//             bestSeller:bestSeller === "true" ? true : false,
//             image1,
//             image2,
//             image3,
//             image4,
//         }
//         const product = await ProductModel.create(productData)

//         return res.status(201).json({
//             message:"product created ",
//             product
//         })

//     } catch (error) {
//         console.log("error while create product ",error)
//           return res.status(500).json({
//             message:"Internal server error ",

//         })

//     }
// }
export const addProductController = async (req, res) => {
    try {

        let { name, description, price, category, subCategory, sizes, date, bestSeller } = req.body;

        const image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : "";
        const image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : "";
        const image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : "";
        const image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : "";

        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            date,
            bestSeller: bestSeller === "true",
            image1,
            image2,
            image3,
            image4
        };

        const product = await ProductModel.create(productData);

        return res.status(201).json({
            message: "product created",
            product
        });

    } catch (error) {
        console.log("error while create product", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getAllProductController = async (req, res) => {
    try {
        const product = await ProductModel.find({})
        return res.status(200).json({
            message: "fetched all products ",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: " error while fetching all products ",

        })

    }
}


export const removeProductController = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "product removed successfully ",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "error while removed product"
        })
    }
}