const multer  = require('multer')
const {S3Client,PutObjectCommand,DeleteObjectCommand} = require('@aws-sdk/client-s3')
require('dotenv').config();
const router = require("express").Router();
const sharp = require('sharp');
const crypto = require('crypto');

// dotenv.config()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.AWS_KEY
const secretKey = process.env.AWS_SECRET

// ======= Create a random number so that image name will not match with previous if image name will match orevious then it will replace previous image
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
    region: bucketRegion
})

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post('/post',upload.single('image'),async(req,res) =>{
    // console.log("Req body",req.body)
    const buffer = await sharp(req.file.buffer).resize({height:413,width:413,fit:"cover"}).toBuffer()
    res.send(req.file.buffer)
    const params = {
        Bucket:bucketName,
        Key:req.file.originalname,
        Body:buffer,
        ContentType:req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
})

router.post('/userImage',upload.single('image'),async(req,res)=>{
    const params = {
        Bucket:bucketName,
        Key:req.file.originalname,
        Body:req.file.buffer,
        ContentType:req.file.mimetype
    }
    res.send("Uploaded successful")
    const command = new PutObjectCommand(params)
    await s3.send(command)
})
router.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id

    const params = {
        Bucket:bucketName,
        Key:id,
    }
    const command = new DeleteObjectCommand(params)
    await s3.send(command)
})

module.exports = router