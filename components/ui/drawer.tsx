"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "cn";

function Drawer(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/35 backdrop-blur-md transition-opacity duration-300 ease-out motion-reduce:transition-none data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DrawerViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={cn(
        "fixed inset-0 z-50 flex justify-end overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function DrawerPopup({
  className,
  placement = "right",
  ...props
}: DrawerPrimitive.Popup.Props & { placement?: "right" | "bottom" }) {
  return (
    <DrawerPrimitive.Popup
      data-slot="drawer-popup"
      data-placement={placement}
      className={cn(
        placement === "bottom"
          ? "pointer-events-auto fixed inset-x-0 bottom-0 z-50 h-[min(92dvh,900px)] w-full max-w-full overflow-hidden rounded-t-2xl border-x-0 border-t border-border bg-background p-0 text-foreground shadow-2xl outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none data-swiping:select-none data-ending-style:[transform:translateY(100%)] data-starting-style:[transform:translateY(100%)]"
          : "h-dvh w-[min(22rem,calc(100vw-2rem))] max-w-full overflow-y-auto overscroll-contain border-l border-border bg-background p-5 text-foreground shadow-2xl outline-none [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none data-swiping:select-none data-ending-style:[transform:translateX(100%)] data-starting-style:[transform:translateX(100%)]",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={cn("flex h-full flex-col", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-base font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

function DrawerSwipeHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      className={cn(
        "mx-auto h-1.5 w-12 touch-none rounded-full bg-muted-foreground/35",
        className,
      )}
      {...props}
    />
  );
}

export {
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
  DrawerSwipeHandle,
};
