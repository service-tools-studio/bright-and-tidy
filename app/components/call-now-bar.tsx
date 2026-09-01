import { PhoneIcon } from "@/app/components/icons";
import { site } from "@/app/lib/site";

export function CallNowBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-5 py-3 backdrop-blur-sm pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={site.phoneHref}
        className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-sun px-6 py-3.5 text-lg font-semibold text-ink shadow-[0_8px_20px_rgba(255,222,89,0.45)]"
      >
        <PhoneIcon className="h-5 w-5" />
        Call Now
      </a>
    </div>
  );
}
