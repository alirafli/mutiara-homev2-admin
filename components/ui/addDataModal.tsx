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
  modal?: boolean;
  handleModalOpen: (value: boolean) => void;
}

function AddDataModal({
  triggerTitle,
  title,
  children,
  modal = false,
  handleModalOpen,
}: AddDataModalProps) {
  return (
    <Dialog open={modal} onOpenChange={() => handleModalOpen(!modal)}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="mr-auto"
          onClick={() => handleModalOpen(true)}
        >
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
