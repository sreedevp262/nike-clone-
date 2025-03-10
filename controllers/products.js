const Product = require('../models/Product')

const productsList = async(req, res)=>{
    try{
        const products = await Product.find({})
        if(!products){
            res.status(404).json('No products added')
        }
        res.status(200 || 201).json({message:'products fetch suceessfull', products})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = productsList;