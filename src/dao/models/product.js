import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: Number,
        unique: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnails: {
        type: Array,
        default: []
    },
    owner:{
        type: String,
        default: "admin"
    }
})

productsSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productsCollection, productsSchema)
export default productModel