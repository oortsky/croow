"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="font-sans">
      <h1 className="text-4xl font-logo tracking-tighter text-primary drop-shadow-lg">
        TROOW
      </h1>
      <Button onClick={() => setCount(count + 1)}>{count} Click!</Button>
      <ModeToggle />
    </div>
  );
}
