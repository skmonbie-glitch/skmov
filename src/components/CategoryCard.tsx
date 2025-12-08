import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  count: string;
}

export function CategoryCard({ title, icon: Icon, count }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <Icon className="size-8 text-white" />
        </div>
        <h3 className="text-white mb-1">{title}</h3>
        <p className="text-white/60">{count} movies</p>
      </div>
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
    </div>
  );
}
