"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "cn";
import { navigationLinks } from "@/constants/home.constants";
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@/components/ui/drawer";
import { homePrimaryButtonClass } from "@/components/shared/home-styles";
import { buttonVariants } from "@/components/ui/button";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Drawer swipeDirection="right">
        <DrawerTrigger
          aria-label="Open navigation menu"
          className="cursor-pointer flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,transform] duration-300 ease-out hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <Menu aria-hidden="true" className="size-5" />
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <DrawerContent>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription className="mt-1">
                      Find your way around Resumio.
                    </DrawerDescription>
                  </div>
                  <DrawerClose
                    aria-label="Close navigation menu"
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,transform] duration-300 ease-out hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 motion-reduce:transition-none motion-reduce:active:scale-100"
                  >
                    <X aria-hidden="true" className="size-[18px]" />
                  </DrawerClose>
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="mt-5 flex flex-col gap-1"
                >
                  {navigationLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                    return (
                      <DrawerClose
                        key={link.label}
                        nativeButton={false}
                        render={
                          <Link
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                          />
                        }
                        className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-primary/8 hover:text-primary active:bg-primary/12"
                        }`}
                      >
                        {link.label}
                      </DrawerClose>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-border pt-4">
                  <DrawerClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/resumes"
                        className={cn(
                          buttonVariants({ size: "lg", variant: "default" }),
                          homePrimaryButtonClass,
                          "w-full",
                        )}
                      />
                    }
                  >
                    Create a resume{" "}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </DrawerClose>
                </div>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}

export function MobileNavigationFallback() {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        className="flex size-10 items-center justify-center rounded-lg text-muted-foreground"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
