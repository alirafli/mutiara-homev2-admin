import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

      <DialogContent className="max-w-[100vh-100px] md:max-w-[600px] h-[calc(100vh-100px)] md:h-auto overflow-scroll md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default AddDataModal;
