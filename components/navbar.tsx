import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
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
            <SheetContent className="w-3/4">
              <SheetHeader>
                <SheetTitle>Hello World!</SheetTitle>
                <SheetDescription>Are you alive?</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};
