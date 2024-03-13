const express = require('express')
const router = express.Router()
const Order = require('../Models/Order')

router.post('/order-add',async(req,res)=>{
    const data = new Order({
        userId:req.body.userId,
        productId:req.body.productId,
        productCode:req.body.productCode,
        razorpayId:req.body.razorpayId,
        userNumber:req.body.userNumber,
        userAddress:req.body.userAddress,
        productAmount:req.body.productAmount,
        name:req.body.name,
        instruction:req.body.instruction,
        image:req.body.image,
        areaCode:req.body.areaCode,
        timestamp:new Date().toLocaleString(),

    })
    try{
    await data.save().then((data) => {
        res.status(200).send({
            status: true,
            data: data
        })
    }).catch((err) => {
        res.status(400).send({
            status: false,
            message: "Error while adding Product"
        })
    })
}catch{
    res.status(400).send({
        status: false,
        message: "Error while adding Product"
    })
}
})

router.get('/admin-order-find',async(req,res)=>{
    const user = await Order.find()
    if (user!==null){
      res.send(user)
  }
  })
module.exports = router