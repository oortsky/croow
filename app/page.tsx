"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
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
      </div>
    </div>
  );
}
