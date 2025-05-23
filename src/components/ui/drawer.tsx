
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ ...props }, ref) => (
  <DrawerPrimitive.Trigger ref={ref} {...props} />
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Trigger>>
>;
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName;

const DrawerPortal = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Portal>) => (
  <DrawerPrimitive.Portal {...props} />
);
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName;

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>
>(({ ...props }, ref) => (
  <DrawerPrimitive.Close ref={ref} {...props} />
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Close>>
>;
DrawerClose.displayName = DrawerPrimitive.Close.displayName;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      className
    )}
    ref={ref}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Overlay>>
>;
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-border bg-background p-4",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-1 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Content>>
>;
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Title>>
>;
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & 
  React.RefAttributes<React.ElementRef<typeof DrawerPrimitive.Description>>
>;
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
