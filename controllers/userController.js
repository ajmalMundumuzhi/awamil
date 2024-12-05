const mongoose = require('mongoose')
const uploadedDatas=require('../models/createModel');

exports.home=async (req,res)=>{
    const details=await uploadedDatas.find()
    res.render('index',{details})
}
exports.detailPage=async (req,res)=>{
    try{
        const detailId = req.params.id.trim().replace(/"/g, '');

        if(!mongoose.Types.ObjectId.isValid(detailId) || detailId.length !== 24){
            return res.status(400).send("invalid id format")
        }
        
        const detail=await uploadedDatas.findById(detailId)
        
        if(!detail){
            return res.status(404).send('item not found')
        }
        // const details = detail ? [detail] : [];
        res.render('detailPage',{details: [detail] })
    }
    catch(error){
        console.error("Error fetching detail:", error);
        res.status(500).send("An error occurred while fetching the detail.");
    }
 
}