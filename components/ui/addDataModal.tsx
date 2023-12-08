import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface AddDataModalProps {
  triggerTitle: string;
  title: string;
  children: React.ReactNode;
}

function AddDataModal({ triggerTitle, title, children }: AddDataModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="mr-auto">
          {triggerTitle}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDataModal;
