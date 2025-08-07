import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-primary">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
