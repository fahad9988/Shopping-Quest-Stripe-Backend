const express = require('express');
const Stripe = require('stripe');
require("dotenv").config();

const stripe=Stripe(process.env.STRIPE_KEY)

const router=express.Router();

router.post('/create-checkout-session', async (req, res) => {
const line_items=req.body.cartData.map((item)=>{
 return  {
  price_data: {
    currency: 'inr',
    product_data: {
      name: item.product,
      images:[item.image],
      description:item.brand,
      metadata:{
       id:item.id
      }
    },
    unit_amount: (item.price).toFixed()*100,
  },
  quantity: item.quantity,
}
})

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/successpage`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url:session.url});
});

module.exports=router;