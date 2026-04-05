type ImageKey = "home" | "plan" | "lesson" | "dashboard";

const photoSets: Record<ImageKey, string> = {
  home: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2400&q=80",
  plan: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=2400&q=80",
  lesson: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=2400&q=80",
  dashboard: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
};

const overlays: Record<ImageKey, string> = {
  home: "bg-[linear-gradient(180deg,rgba(13,10,24,0.06)_0%,rgba(13,10,24,0.18)_38%,rgba(13,10,24,0.46)_100%)]",
  plan: "bg-[linear-gradient(180deg,rgba(13,10,24,0.08)_0%,rgba(13,10,24,0.20)_38%,rgba(13,10,24,0.50)_100%)]",
  lesson: "bg-[linear-gradient(180deg,rgba(13,10,24,0.10)_0%,rgba(13,10,24,0.22)_38%,rgba(13,10,24,0.52)_100%)]",
  dashboard: "bg-[linear-gradient(180deg,rgba(13,10,24,0.08)_0%,rgba(13,10,24,0.18)_38%,rgba(13,10,24,0.48)_100%)]",
};

const labels: Record<ImageKey, { eyebrow: string; title: string }> = {
  home: {
    eyebrow: "Simple start",
    title: "A calmer way to learn money basics",
  },
  plan: {
    eyebrow: "Personal direction",
    title: "Start with one useful next step",
  },
  lesson: {
    eyebrow: "Practical learning",
    title: "Break money into smaller, clearer ideas",
  },
  dashboard: {
    eyebrow: "Progress view",
    title: "See what is working and what comes next",
  },
};

export default function EditorialPhotoBand({
  imageKey,
  short = false,
}: {
  imageKey: ImageKey;
  short?: boolean;
}) {
  const label = labels[imageKey];

  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/10 ${
        short ? "min-h-[220px]" : "min-h-[320px] lg:min-h-[380px]"
      }`}
    >
      <img
        src={photoSets[imageKey]}
        alt=""
        className={`w-full object-cover ${
          short ? "h-[220px] md:h-[240px]" : "h-full min-h-[320px] lg:min-h-[380px]"
        }`}
      />

      <div className={`absolute inset-0 ${overlays[imageKey]}`} />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <div className="max-w-xl rounded-[24px] border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            {label.eyebrow}
          </div>
          <div
            className="mt-2 text-2xl font-semibold tracking-tight text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {label.title}
          </div>
        </div>
      </div>
    </div>
  );
}