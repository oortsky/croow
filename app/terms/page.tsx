import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Terms from "@/markdown/terms.md";

export const metadata = {
  title: "Troow - Terms and Conditions",
  description: "Safe. Fast. Easy."
};

export default function Page() {
  return (
    <main className="container w-full h-screen mx-auto p-4 font-sans">
      <ScrollArea className="w-full h-full rounded-md border mb-4">
        <div className="p-4 prose prose-headings:mb-4 prose-hr:my-4 prose-headings:font-bold prose-headings:text-black prose-strong:text-black prose-a:text-black text-black prose-h1:text-3xl prose-h2:text-2xl dark:prose-headings:text-white prose-strong:dark:text-white prose-a:dark:text-white dark:text-white">
          <Terms />
        </div>
      </ScrollArea>
      <div className="flex justify-between items-center pb-4">
        <Button variant="link" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="#" target="_blank">Download</Link>
        </Button>
      </div>
    </main>
  );
}