const createModel=require('../models/createModel')

exports.dashboardAdmin=(req,res)=>{
    res.render('dashboard')
}

exports.createAdminGet=(req,res)=>{
    res.render('create')
}

exports.createAdminPost=async (req,res)=>{
    try{
        const cardImage= req.file
        const{word,sentence,grammer}=req.body
        const path= '/images/upload/card/'+cardImage.filename
        
        const data = new createModel({
            word : word,
            sentence : sentence,
            grammer : grammer,
            image : path
        }) 
        await data.save()
        res.redirect('/admin/uploads')
    }
    catch(err){
        console.log("Error on adding product",err);
    }
}


exports.uploadsadminGet=async (req,res)=>{
    const details=await createModel.find()
    res.render('published',{details})
}

// card details get 
exports.cardDetailGet=async (req,res)=>{
    try{
        const detailId = req.params.id.trim().replace(/"/g, '');
        const detail=await createModel.findById(detailId)
        if(!detail) return res.status(404).send("Detail not found")
        res.render('cardDetails',{detail})
    }
    catch(err){
        console.log("error on going to detail page",err)
        res.status(500).send("Internal Server Error",err)
    }
}

// data update 
exports.cardUpdateGet=async (req,res)=>{
    try{
        const cardId=req.params.id
        const card=await createModel.findOne({_id:cardId})

        res.render('editCard',{card})
    }
    catch(err){
        console.log("Error on editing",err)
    }
}

exports.cardUpdatePost=async (req,res) =>{
    try{
        const {word,sentence,grammer}=req.body;
        const cardId = req.params.id
        const card=await createModel.findOne({_id : cardId})
    
        if(card){
            const updateCard = {
                word,
                sentence,
                grammer
            }
            if(req.file){
                const newImage = '/images/upload/card/'+ req.file.filename
                updateCard.image = newImage
            }
            await createModel.updateOne({_id:cardId},{$set : updateCard},{upsert : true})
            res.render('Dashboard')
        }
        else{
            res.status(404).send("Card not found")
        }        
    }
    catch(err){
        console.log('Error while updating card',err)
        res.status(500).send('updating the card failed',err)
    }   
}

// data delete
exports.cardDelete=async (req,res)=>{
    try{
        const cardId = req.params.id;
        const card = await createModel.findOne({_id : cardId})

        if(card){
            await createModel.deleteOne({_id : cardId})
            res.render('dashboard')
        }
        else{
            res.status(404).send("Card not found")
        }
    }
    catch(err){
        console.log("Error whille get card delete",err)
        res.status(500).send("Error whille get card delete",err)
    }
}

exports.cardDeletePost=async (req,res)=>{
    if(req.body._method === 'DELETE'){
        return exports.cardDelete(req,res)
    }
}