import midtransClient from "midtrans-client";
import { z } from "zod";
import { snapSchema } from "@/lib/schemas";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_MID_SERVER_KEY!
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = snapSchema.safeParse(body);

    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: parseResult.error
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transactionParams = parseResult.data;

    const transaction = await snap.createTransaction(transactionParams);

    return new Response(
      JSON.stringify({
        token: transaction.token,
        redirect_url: transaction.redirect_url
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
