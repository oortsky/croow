"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from "sonner";

const menuList: {
  id: number;
  title: string;
  href: string;
  description: string;
}[] = [
  {
    id: 1,
    title: "Quick Guide",
    href: "/guide",
    description: "Guide to use our service."
  },
  {
    id: 2,
    title: "About Us",
    href: "/about",
    description: "Troow in behind."
  },
  {
    id: 3,
    title: "Fees Information",
    href: "/fees",
    description: "Fees information details."
  },
  {
    id: 4,
    title: "FAQ",
    href: "/faq",
    description: "Frequently ask question."
  },
  {
    id: 5,
    title: "Feedback",
    href: "/feedback",
    description: "Give us feedback."
  },
  {
    id: 6,
    title: "Contact Us",
    href: "/contact",
    description: "Our company contact."
  },
  {
    id: 7,
    title: "Terms and Conditions",
    href: "/terms",
    description: "Troow terms and conditions."
  },
  {
    id: 8,
    title: "Privacy Policy",
    href: "/privacy",
    description: "Troow privacy policy."
  }
];

export default function Navbar() {
  return (
    <section className="w-full sticky top-0 p-4 bg-transparent backdrop-blur-md rounded-b-md shadow-lg z-50 dark:backdrop-brightness-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="#">
            <span className="text-3xl font-logo tracking-tighter text-primary drop-shadow-lg">
              troow
            </span>
          </a>
          <Sheet>
            <div className="flex gap-2">
              <ModeToggle />
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="text-primary size-4" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent className="text-primary">
              <SheetHeader>
                <SheetTitle>
                  {menuList.map(menu => (
                    <SheetClose key={menu.id} asChild>
                      <Button className="w-full my-2" variant="ghost" asChild>
                        <Link href={menu.href}>{menu.title}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
