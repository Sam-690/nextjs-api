import { dbConnect } from "utils/mongoose"
import Products from 'models/Products'

dbConnect()

export default async function handler(req, res) {

    const {method, body} = req

    switch (method) {
        case 'GET':
            try{
                const products = await Products.find();
                return res.status(200).json(products);
            } catch(error) {
                return res.status(500).json({message: error.message})
            }
        
        case 'POST':
            const newProducts = new Products(body)
            const saveProducts = await newProducts.save()
            return res.status(200).json(saveProducts)

        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
}