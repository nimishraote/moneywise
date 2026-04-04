type ImageKey = "home" | "plan" | "lesson" | "dashboard";

const photoSets: Record<ImageKey, string> = {
  home: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=2400&q=80",
  plan: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=2400&q=80",
  lesson: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=2400&q=80",
  dashboard: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80",
};

export default function EditorialPhotoBand({
  imageKey,
  short = false,
}: {
  imageKey: ImageKey;
  short?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/10 ${
        short ? "" : "min-h-[470px] lg:min-h-[520px]"
      }`}
    >
      <img
        src={photoSets[imageKey]}
        alt=""
        className={`w-full object-cover ${
          short ? "h-52 md:h-56" : "h-full min-h-[470px] lg:min-h-[520px]"
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,10,24,0.08)_0%,rgba(13,10,24,0.15)_35%,rgba(13,10,24,0.45)_100%)]" />
    </div>
  );
}