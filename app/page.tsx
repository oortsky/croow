"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { generateId } from "@/utils/id";

export default function Page() {
  // TODO: Separate this script into utils or lib
  const handleClick = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/midtrans/token`,
      {
        transaction_details: {
          order_id: generateId("TRX"),
          gross_amount: 100000
        }
      }
    );

    if (typeof window !== "undefined" && window.snap) {
      window.snap.pay(response?.data?.token, {
        onSuccess: result => console.log("Success:", result),
        onPending: result => console.log("Pending:", result),
        onError: err => console.error("Error:", err)
      });
    }
  };

  return (
    <div className="h-[1000px] font-sans">
      <div className="w-full text-center">
        <h1 className="text-5xl font-logo tracking-tighter text-primary drop-shadow-lg pr-4 mt-12 mb-6">
          troow
        </h1>
        <p className="text-sm">Indonesia Escrow Services</p>
        <p className="text-sm">Safe. Easy. Fast.</p>
        <div className="flex justify-center mt-6 gap-2 mb-2">
          <Button asChild>
            <Link href="/transaction/new">Try Now</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#">Quick Guide</Link>
          </Button>
        </div>
        <Button variant="link" asChild>
          <Link href="#">Learn more</Link>
        </Button>
        <Button onClick={handleClick}>Snap</Button>
      </div>
    </div>
  );
}
