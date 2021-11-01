/* eslint-disable import/no-anonymous-default-export */
import { dbConnect } from "utils/mongoose";
import  Products from "models/Products";

dbConnect();

export default async (req, res) => {
    const { 
        method, 
        body,
        query: { id },
     } = req;

     switch (method) {
         case "GET":
             try {
                const product = await Products.findById(id);
                if (!product) return res.status(404).json({msg: "Product not found"});
                return res.status(200).json(product);
             } catch (error) {
                return res.status(500).json({ msg: error.message });
             }
         case "PUT":
             try {
                 const product = await Products.findByIdAndUpdate(id, body, {
                     new: true,
                 });
                 if(!product) return res.status(404).json({ msg: "Product not found"});
                 return res.status(200).json(product);
             } catch (error) {
                return res.status(500).json({ msg: error.message });
             }
         case "DELETE":
             try {
                 const deleteProuct = await Products.findByIdAndDelete(id);
                 if (!deleteProuct) 
                     return res.status(404).json({ msg:"Product not found"});
                return res.status(204).json();
             } catch (error) {
                 return res.status(404).json({ msg: error.message });
             }
         default:
            return res.status(400).json({msg: 'this method is not supported'})
     }
}