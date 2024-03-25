const express=require('express');
const User = require("../models/User");
const { body,validationResult}=require('express-validator');
const router=express.Router();
const jwt =require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const jwtSecret="mynameisharishpatidar"

router.post('/createuser',[
    body('email',"Invalid Email").isEmail(),
    body('password',"Invalid Password").isLength({min:5})
],async(req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    let salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try {
        let email = req.body.email;
        if(email)
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location
        })
        
        let data = await User.findOne({email});
        if (!data) {
          return res.status(400).json({ error: "Enter valid data" });
        }
        let key = {
          user: {
            id: data.id,
          },
        };
        const authToken = jwt.sign(key, jwtSecret);
        res.json({ success: true, authToken: authToken });
        // res.json({success:true})
        
    } catch (error) {
        console.log(error);
        res.send({success:false})
        
    }
})



router.post('/login',[
    body('email',"Invalid Email").isEmail(),
    body('password',"Invalid Password").isLength({min:5})
],async(req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    let email= req.body.email;
    try {
        let data= await User.findOne({email});
        if(!data)
        {
            return res.status(400).json({ error: "Enter valid data"});
        }
        const pwdCompare=await bcrypt.compare(req.body.password,data.password)
        if(!pwdCompare)
        {
            return res.status(400).json({ error: "Enter valid data" });
        }

        let key={
            user:{
                id:data.id
            }
        }
        const authToken=jwt.sign(key,jwtSecret)
        res.json({success:true,authToken:authToken})
        // console.log(authToken)
        
    } catch (error) {
        console.log(error);
        res.send({success:false})
        
    }
})


module.exports=router; 