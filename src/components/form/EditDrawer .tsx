// components/edit-drawer.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { ReactNode, useState } from "react";
import { X } from "lucide-react";

interface EditDrawerProps<T> {
  data: T;
  trigger: ReactNode;
  title: string;
  children: (data: T, onSuccess: () => void) => ReactNode;
  width?: string;
}

export function EditDrawer<T>({
  data,
  trigger,
  title,
  children,
  width = "w-[500px]",
}: EditDrawerProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        className={`h-full top-0 right-0 left-auto mt-0 ${width} rounded-none`}
      >
        <div className="flex flex-col h-full">
          <DrawerHeader className="flex items-center justify-between p-4 border-b">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 p-4 overflow-y-auto">
            {children(data, () => setOpen(false))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
