const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { json } = require('express');

// Get all users
router.get('/', async (req,res)=>{

try {
    const users = await User.find()
    res.json({
        data:users
    })
} catch (error) {
    res.status(500).json({
        message: error.message
    })
}

})

// Get one user
router.get('/:id',async (req,res)=>{

   try {
       const user = await User.findById(req.params.id)
       res.json({
           user
       })
   } catch (error) {
       res.status(500).json({message:error.message})
   }
})


// Post User
router.post('/', async (req,res)=>{

    try {
        const newUser = User({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 2)
        })
        
        let storedUser = await newUser.save()
        res.status(201).json({
            user:storedUser
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
    
})

module.exports = router