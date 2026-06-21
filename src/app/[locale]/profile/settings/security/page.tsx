"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SecurityPage() {
  const t = useTranslations();
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast.success(t("profile.settings.security.success"));
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-8 border-b border-line pb-6">
        <h2 className="display text-[20px] font-semibold text-ink">
          {t("profile.settings.security.title")}
        </h2>
        <p className="mt-1 text-[13px] text-ink-2">
          {t("profile.settings.security.description")}
        </p>
      </div>

      <div className="max-w-md">
        <h3 className="mb-5 text-[15px] font-bold text-ink">
          {t("profile.settings.security.changePassword")}
        </h3>
        
        <form onSubmit={handleUpdatePassword} className="space-y-5">
          <div className="space-y-2">
            <label className="flabel">
              {t("profile.settings.security.currentPassword")}
            </label>
            <div className="relative">
              <Input 
                type={showCurrent ? "text" : "password"}
                className="field pr-10" 
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flabel">
              {t("profile.settings.security.newPassword")}
            </label>
            <div className="relative">
              <Input 
                type={showNew ? "text" : "password"}
                className="field pr-10" 
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flabel">
              {t("profile.settings.security.confirmNewPassword")}
            </label>
            <div className="relative">
              <Input 
                type={showConfirm ? "text" : "password"}
                className="field pr-10" 
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="btn-ink h-11 w-full sm:w-auto rounded-lg px-8 text-[14px]"
            >
              {t("profile.settings.security.updatePassword")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
