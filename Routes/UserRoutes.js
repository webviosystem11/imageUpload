const express = require('express')
const router = express.Router()
const User = require('../Models/User')

router.post('/userRegistration', async (req, res) => {
  try {
    const userData = new User({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      image:req.body.image,
      shop: req.body.shop,
      status:"",
      cart:[],
      order:[],
      address:[]
    })
    await userData.save().then((data) => {
      res.status(200).send({
        status: true,
        data: data,
      })
    }).catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error while adding Product"
      })
    })
  } catch {
    res.status(400).send({
      status: false,
      message: "Error while adding Product"
    })
  }
})

router.post('/userlogin', async (req, res) => {
  try {
  const email = req.body.email
  const password = req.body.password
  const admin = await User.find({ email: email })
  
    if (admin[0].email === email && admin[0].password === password) {
      if(admin[0].status!=="Approve"){
        res.status(400).send({
          status: false,
          message: "Your id is not approved yet"
        })
      }else{
        res.status(200).send({
          status: true,
          email: email,
          name: admin[0].username,
          id: admin[0]._id,
          cart: admin[0].cart
        })
      }
      
    } else {
      res.status(400).send({
        status: false,
        message: "User not find"
      })
    }
  } catch {
    res.status(400).send({
      status: false,
      message: "User not find"
    })
  }
})


router.get('/approval-request', async (req, res) => {
  try {
  const admin = await User.find()
  if(admin){
    res.status(200).send({
      status:200,
      user:admin
    })
  }else{
    res.status(500).send({
      status:true,
      user:"No user found"
    })
  }
  } catch {
    res.status(400).send({
      status: false,
      message: "User not find"
    })
  }
})

router.post('/update-status/:id', async (req, res) => {
  try {
    const  id  = req.params.id;
    const { status } = req.body;
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the status
    user.status = status;
    await user.save();
    return res.json({ message: 'Status updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the status.' });
  }
});

router.post('/user-cart-add/:user', async (req, res) => {
  const parsedData = {
    id: req.body.id,
    image: req.body.image,
    qty: req.body.qty,
    rate: req.body.rate,
    title: req.body.title,
  }
  try{
  const user = await User.findById(req.params.user)
  user.cart.push(parsedData)
  await user.save().then((data) => {
    res.status(200).send({
      status: true,
      data: data,
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "Error "
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: "Error "
  })
}
})

router.post('/user-order-add/:user', async (req, res) => {
  const parsedData = {
    id: req.body.id,
    image: req.body.image,
    qty: req.body.qty,
    rate: req.body.rate,
    title: req.body.title,
    orderId: req.body.orderId,
    shipmentId: req.body.shipmentId,
    timestamp: new Date().toLocaleString(),
  }
  try{
  const user = await User.findById(req.params.user)
  user.order.push(parsedData)
  await user.save().then((data) => {
    res.status(200).send({
      status: true,
      data: data,
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "Error while adding to cart"
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.get('/user-order-find/:user', async (req, res) => {
  try{
  const user = await User.findById(req.params.user)
  if (user !== null) {
    res.send(user.order)
  }
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.post('/user-address-add/:user', async (req, res) => {
  const parsedData = {
    name: req.body.name,
    mobile: req.body.mobile,
    pin: req.body.pin,
    locality: req.body.locality,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    landmark: req.body.landmark,
    phone: req.body.phone,
  }
  try{
  const user = await User.findById(req.params.user)
  user.address.push(parsedData)
  await user.save().then((data) => {
    res.status(200).send({
      status: true,
      data: data,
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "Error while adding to address"
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.get('/user-address-find/:user', async (req, res) => {
  const user = await User.findById(req.params.user)
  try{
  if (user !== null) {
    res.send(user.address)
  }
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.get('/user-address-find/:user', async (req, res) => {
  const user = await User.findById(req.params.user)
  try{
  if (user !== null) {
    res.send(user.address)
  }
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.get('/get-user/:user', async (req, res) => {
  const user = await User.findById(req.params.user)
  try{
  if (user !== null) {
    res.send(user)
  }
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.post('/user-password-reset/:user', async (req, res) => {
  const pass = req.body.password
  try{
  const user = await User.findById(req.params.user)
  user.password = pass
  await user.save().then((data) => {
    res.status(200).send({
      status: true,
      message: "Password reset successfull",
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "Unable to process your request",
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: "User not found"
  })
}
})

router.get('/found-user/:user', async (req, res) => {
  try{
  const user = await User.find({mobile:req.params.user}).then((data)=>{
    res.status(200).send({
      status: true,
      id:data[0]._id,
      message: "Please check your inbox and spam ",
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "No User found",
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: ""
  })
}
})

router.get('/user-cart/:user', async (req, res) => {
  try{
  const user = await User.findById(req.params.user)
  if (user !== null) {
    res.send(user.cart)
  }
}catch{
  res.status(400).send({
    status: false,
    message: "Error while adding Product"
  })
}
})
router.post('/user-cart-remove/:user', async (req, res) => {
  const id = req.body.id
  try{
  const user = await User.findById(req.params.user)
  user.cart = user.cart.filter(item => item.id !== id);
  await user.save().then((data) => {
    res.status(200).send({
      status: true,
      data: data,
    })
  }).catch((err) => {
    res.status(400).send({
      status: false,
      message: "Error removing from cart"
    })
  })
}catch{
  res.status(400).send({
    status: false,
    message: "Error from backend"
  })
}
})

router.post('/user-cart-plus/:user', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(req.params.user);
    const updatedCart = user.cart.map((item) => {
      if (item.id === id) {
        return { ...item, rate: (item.rate / item.qty) * (item.qty + 1), qty: item.qty + 1 };
      }
      return item;
    });
    user.cart = updatedCart;
    const savedUser = await user.save();
    res.status(200).send({
      status: true,
      user: savedUser,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Error while updating cart",
      error: err.message,
    });
  }
});
router.post('/user-cart-minus/:user', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(req.params.user);
    const updatedCart = user.cart.map((item) => {
      if (item.id === id) {
        const updatedQty = item.qty - 1;
        const updatedRate = (item.rate / item.qty) * updatedQty;
        return { ...item, rate: updatedRate, qty: updatedQty };
      }
      return item;
    });
    user.cart = updatedCart;
    const savedUser = await user.save();
    res.status(200).send({
      status: true,
      user: savedUser,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Error while updating cart",
      error: err.message,
    });
  }
});


module.exports = router