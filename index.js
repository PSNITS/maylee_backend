const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51Nen7hFpqCcVujOth5gJ7Y9SSImVsnFzXOuVxADd3cwX2ILLRz3lMADgsKRbCwkM57egqdQGeTThkxHA2TGEz18S00XdyXfiTa");

const app = express()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
    const arr = [0]
    
    const lineItems = arr.map((product)=>({
        price_data:{
            currency:"USD",
            product_data:{
                name:products.name,
            },
            unit_amount:products.amount * 100,
        },
        quantity:1,
    }));    
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://test-v.mayleefun.xxx/success",
        cancel_url:"https://test-v.mayleefun.xxx/cancel"
    })

    res.json({id:session.id})

})



app.listen(4000,()=>{
    console.log("server is running");
});
