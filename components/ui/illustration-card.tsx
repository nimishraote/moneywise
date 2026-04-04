import { Image as ImageIcon } from "lucide-react";

export default function IllustrationCard({
  icon: Icon,
  title,
  subtitle,
  tone = "dark",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={`rounded-[28px] border p-6 backdrop-blur ${tone === "dark" ? "border-white/10 bg-white/8 text-white" : "border-slate-200 bg-white text-slate-900"}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${tone === "dark" ? "bg-white/10 text-amber-200" : "bg-slate-100 text-slate-700"}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="mt-5 text-xl font-semibold">{title}</div>
      <div className={`mt-2 text-sm leading-7 ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</div>
      <div className={`mt-5 flex h-32 items-center justify-center rounded-[22px] border border-dashed ${tone === "dark" ? "border-white/15 bg-black/10" : "border-slate-200 bg-slate-50"}`}>
        <div className={`flex items-center gap-2 text-sm ${tone === "dark" ? "text-slate-400" : "text-slate-500"}`}>
          <ImageIcon className="h-4 w-4" />
          Contextual illustration area
        </div>
      </div>
    </div>
  );
}
