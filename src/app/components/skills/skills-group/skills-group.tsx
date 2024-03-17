import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type React from "react";

interface SkillsGroupProps {
  name: string;
  children?: React.ReactNode;
}

const SkillsGroup = ({ name, children }: SkillsGroupProps) => {
  return (
    <Card className="w-">
      <CardHeader>
        <CardTitle
          className={cn("text-2xl font-bold uppercase", "md:text-4xl")}
        >
          {name}
        </CardTitle>
        <hr className="h-1 w-full bg-stone-300" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">{children}</div>
      </CardContent>
    </Card>
  );
};

export default SkillsGroup;
