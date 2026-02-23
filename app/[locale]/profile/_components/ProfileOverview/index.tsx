import { User, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <Card className="overflow-hidden border-border/70 py-0">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 px-6 py-7 text-zinc-100">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-300">
          {t("profile.page.overviewTag")}
        </p>
        <p className="mt-3 text-2xl font-semibold text-white">{fullName}</p>
        <p className="mt-2 text-sm text-zinc-200">{email ?? "N/A"}</p>
      </div>

      {/* Details Grid */}
      <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
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
      </CardContent>
    </Card>
  );
};

// Helper component nhỏ để tránh lặp code trong nội bộ file
const InfoBox = ({ icon, label, value, className }: any) => (
  <div className={`rounded-lg border bg-background p-4 ${className}`}>
    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <p className="mt-2 text-sm font-medium">{value}</p>
  </div>
);
