const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')
const mongoose = require('mongoose')
// Get all customers
router.get('/',async (req,res)=>{
    try {
        const customers = await Customer.find()
        res.status(200).json({
            customers
        })
    } catch (error) {
        res.status(200).json({
            error:error.message
        })
    }
})

// Get one customer
router.get('/:id',getCustomer,(req,res)=>{
   res.status(200).json({
       user:res.customer
   })
})

// Create customer
router.post('/',async (req,res)=>{

    try {
        let {customer_name,major_change_plan,incident_status,issue_type,status,p_zero,p_one,p_two} = req.body
        const newCustomer = new Customer({
            customer_name,
            major_change_plan,
            incident_status,
            issue_type,
            status,
            p_zero,
            p_one,
            p_two
        })
        const storedCustomer = await newCustomer.save()

        res.status(201).json({
            user:storedCustomer
        })

    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

})

// Update one customer 
router.patch('/:id',async (req,res)=>{

    let customer 


    try {
        customer = await Customer.findById(req.params.id)
        if(customer == null){
            let {customer_name,major_change_plan,incident_status,issue_type,status,p_zero,p_one,p_two} = req.body
            const newCustomer = new Customer({
                customer_name,
                major_change_plan,
                incident_status,
                issue_type,
                status,
                p_zero,
                p_one,
                p_two
            })
            const storedCustomer = await newCustomer.save()
    
            res.status(201).json(
                storedCustomer
            )
        }else{
        let {customer_name,major_change_plan,incident_status,issue_type,status,p_zero,p_one,p_two} = req.body
         customer.customer_name = customer_name
          customer.major_change_plan = major_change_plan
          customer.incident_status = incident_status
          customer.issue_type = issue_type
          customer.status = status
          customer.p_zero = p_zero
          customer.p_one = p_one
          customer.p_two = p_two
            let updateCustomer = customer.save()
            return res.status(201).json(customer)
         }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

})

// Delete customer
router.delete('/:id',getCustomer, async (req,res)=>{
    try {
        await res.customer.remove()
        res.json({message:"Customer has been deleted successfully."})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

async function getCustomer(req,res,next){
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if(customer == null){
            return res.status(404).json({message:'Cannot find subscriber'})
        } 
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.customer = customer
    next()
}

module.exports = router