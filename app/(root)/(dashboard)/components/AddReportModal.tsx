import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AddReportModalProps {
  trigger: React.JSX.Element;
  title?: string;
  status?: React.ReactNode;
  children: React.ReactNode;
}

function AddReportModal({
  trigger,
  title = "yout title",
  status,
  children,
}: AddReportModalProps) {
  return (
    <Sheet>
      <SheetTrigger className="mr-auto">{trigger}</SheetTrigger>
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

export default AddReportModal;
