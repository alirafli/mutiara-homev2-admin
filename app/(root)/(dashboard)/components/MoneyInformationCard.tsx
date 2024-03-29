import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import thousandAndDecimalSeparator from "@/utils/NumberFormatter";

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
    <Card className="min-w-full md:min-w-[45%] lg:min-w-[33%] self-auto md:self-stretch">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2
          className={`scroll-m-20 pb-2 text-2xl font-medium tracking-tight first:mt-0 ${
            income < 0 && "text-red-600 dark:text-red-900"
          }`}
        >
          Rp{thousandAndDecimalSeparator(income)}
        </h2>
      </CardContent>
    </Card>
  );
}

export default MoneyInformationCard;
