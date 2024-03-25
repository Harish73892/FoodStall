const express =require('express');

const router =require('express').Router();
const Order =require('../models/Orders');

router.post('/orderData',async(req,res)=>{
    let data =req.body.Order_data;
    data.unshift({ Order_date: req.body.order_date });

    let eId=await Order.findOne({email:req.body.email})
    if(eId===null){
        try {
            await Order.create({
                email:req.body.email,
                Order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server error",error.message)
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{Order_data:data}}).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error",error.message)
        }
    }
})

module.exports=router;