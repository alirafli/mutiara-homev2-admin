import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AddReportModalProps {
  trigger: string;
  title?: string;
  status?: React.ReactNode;
  children: React.ReactNode;
}

function ActionDataModal({
  trigger,
  title = "yout title",
  status,
  children,
}: AddReportModalProps) {
  return (
    <Sheet>
      <SheetTrigger className="mr-auto w-full text-left">{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-6">
            <SheetTitle>{title}</SheetTitle>
            {status && status}
          </div>
          <div>{children}</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ActionDataModal;
