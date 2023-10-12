const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51Nnz1ASDTdclJtfgBhdXYXT5FiSJcqVu4sMJyFt3olCg6AYVUdFIzLLkOefULbw5XKeFtOVQXC6ziWsdGyLfUWsT00VWW2utEc")

const app = express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;

    console.log(products);

    const arr = [0]
    
    const lineItems = arr.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:products.name,
            },
            unit_amount:products.amount * 100,
        },
        quantity:1,
    }));

    console.log(lineItems);
    
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel"
    })

    res.json({id:session.id})

})



app.listen(4000,()=>{
    console.log("server is running");
});
