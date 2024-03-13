const express=require('express')
const router=express.Router()
const AwsUploadRoutes = require('./AwsUpload')
router.get('/',(req, res) =>{
    res.send("Welcome to stack clone")
});

router.use('/aws',AwsUploadRoutes)
module.exports = router;