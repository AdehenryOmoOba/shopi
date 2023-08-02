import origin from "@/utils/origin";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
    
    try {
      const cartData: {item: TProductDetails, count: number}[] = await req.json();
      if(!cartData.length) throw Error("Cart is not provided")

      const checkoutSession = await stripe.checkout.sessions.create({
      line_items: cartData.map(({item, count}) => {
        return {
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name,
                    images: [item.image]
                },
                unit_amount: Number(item.price) * 100
            },
            quantity: count,
        }
      }),
      mode: "payment",
      success_url: `${origin}payment-completed?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}payment-cancelled?cancelled=true`
    })

    return NextResponse.json({url: checkoutSession.url}, {
       status: 200
      });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}