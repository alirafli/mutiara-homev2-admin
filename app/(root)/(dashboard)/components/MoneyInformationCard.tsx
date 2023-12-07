import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";
import React from "react";

interface TotalIncomeCardProps {
  title: string;
  description?: string;
  income: number;
}

function MoneyInformationCard({
  title,
  description,
  income,
}: TotalIncomeCardProps) {
  return (
    <Card className="w-fit md:w-[350px] self-auto md:self-stretch">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="scroll-m-20 pb-2 text-2xl font-medium tracking-tight first:mt-0">
          Rp{thousandAndDecimalSeparator(income)}
        </h2>
      </CardContent>
    </Card>
  );
}

export default MoneyInformationCard;
