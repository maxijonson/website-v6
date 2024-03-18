import { cn } from "@/lib/utils";

export interface SkillProps {
  name: string;
  icon: React.ReactNode;
  proficiency: 1 | 2 | 3 | 4 | 5;
}

const Skill = ({ name, icon, proficiency }: SkillProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-md">{name}</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`${i}`}
            className={cn("size-5", {
              "opacity-25 grayscale": proficiency - 1 < i,
            })}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
