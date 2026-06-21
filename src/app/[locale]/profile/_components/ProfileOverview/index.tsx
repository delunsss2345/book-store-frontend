import { BadgeCheck, Mail, Pencil, Phone, User } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ProfileOverviewProps {
  fullName: string;
  email?: string | null;
  phoneNumber?: string | null;
  t: any;
}

export const ProfileOverview = ({
  fullName,
  email,
  phoneNumber,
  t,
}: ProfileOverviewProps) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="card overflow-hidden">
      <div className="relative overflow-hidden bg-gradient-to-r from-ink via-[#2a2620] to-[#3a342c] px-6 py-7 text-white">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-[22px] font-semibold ring-2 ring-white/25">
            {initials || "U"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              {t("profile.page.overviewTag")}
            </p>
            <p className="display mt-1 flex items-center gap-2 text-[24px] font-semibold">
              {fullName}
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/80">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            </p>
            <p className="mt-1 text-[13px] text-white/70">
              {email ?? "N/A"}
            </p>
          </div>
          <Link 
            href="/profile/settings"
            className="btn-soft hidden h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[12px] sm:inline-flex text-ink hover:text-ink"
          >
            <Pencil className="h-3.5 w-3.5" />
            {t("profile.page.editProfile") || "Edit profile"}
          </Link>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <InfoBox
          icon={<User className="h-4 w-4" />}
          label={t("profile.page.nameLabel")}
          value={fullName}
        />
        <InfoBox
          icon={<Mail className="h-4 w-4" />}
          label={t("profile.page.emailLabel")}
          value={email ?? "N/A"}
        />
        <InfoBox
          icon={<Phone className="h-4 w-4" />}
          label={t("profile.page.phoneLabel")}
          value={phoneNumber || t("profile.page.notProvided")}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
};

// Helper component
const InfoBox = ({ icon, label, value, className }: any) => (
  <div className={`rounded-lg border border-line bg-paper/50 p-4 ${className || ""}`}>
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-ink-3">
      {icon}
      <span>{label}</span>
    </div>
    <p className="mt-2 text-[14px] font-medium text-ink">{value}</p>
  </div>
);
