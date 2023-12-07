import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function IncomeChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Penghasilan</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full bg-red-500"></div>
      </CardContent>
    </Card>
  );
}

export default IncomeChart;
