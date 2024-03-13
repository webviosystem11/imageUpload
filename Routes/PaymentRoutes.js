
const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios")

router.post("/order", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.get("/ship-verified",async(req,res)=>{
	const shipVerify = {
		email: "raviraj.kingsman@gmail.com",
		password: "Kingsman123"
	  };
	  try{
		// Make the API request using axios or any other library
		axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", shipVerify)
		  .then(response => {
			// Handle the API response
			res.json(response.data);
		  })
		  .catch(error => {
			// Handle the error
			res.status(500).json({ error: 'An error occurred' });
		  });
	}catch{
		console.log("error")
	}
	  
})

router.post('/ship-order', async (req, res) => {
	const parsedData = req.body.parsedData;
	const token = req.body.token;
  
	try {
	  const response = await axios.post(
		'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
		parsedData,
		{
		  headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
		}
	  );
  
	  res.json(response.data);
	} catch (error) {
	  res.status(500).json({ error: 'An error occurred' });
	}
  });

  router.post('/ship-order-status', async (req, res) => {
	const id = req.body.id;
	const token = req.body.verifyToken;
	try {
	  const response = await axios.get(
		`https://apiv2.shiprocket.in/v1/external/orders/show/${id}`,
		{
		  headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
		}
	  );
  
	  res.json(response.data);
	} catch (error) {
	  res.status(500).json({ error: 'An error occurred' });
	}
  });



module.exports = router;