"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-sans">
      <h1 className="text-4xl font-logo tracking-tighter text-primary drop-shadow-lg">
        TROOW
      </h1>
      <Button onClick={() => setCount(count + 1)}>{count} Click!</Button>
      <Button variant="link" asChild>
        <Link href="/privacy">Privacy Policy</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/terms">Terms and Conditions</Link>
      </Button>
      <Button asChild>
        <Link href="/transaction/new">Try Now</Link>
      </Button>
      <ModeToggle />
    </div>
  );
}
