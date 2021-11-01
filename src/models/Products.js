import {Schema, models, model} from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [40, 'The product name must be at least 40 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        trim: true,
    }
}, {
    timestamps: true,
    versionKey: false
})


export default models.Products || model("Products", productSchema)