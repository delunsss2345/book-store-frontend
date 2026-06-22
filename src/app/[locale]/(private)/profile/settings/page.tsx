"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { Input } from "@/src/components/ui/input";
import { ShieldCheck, Plus } from "lucide-react";
import { toast } from "sonner";

export default function PersonalInfoPage() {
  const t = useTranslations();
  const { user: currentUser } = useAuth();

  const handleSave = () => {
    // Mock save
    toast.success(t("profile.settings.personalInfo.success"));
  };

  const handleVerifyEmail = () => {
    // Mock verify
    toast.success("Verification email sent!");
  };

  const handleAddPhone = () => {
    // Mock add phone
    toast.info("Add phone number dialog would open here.");
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-8 border-b border-line pb-6">
        <h2 className="display text-[20px] font-semibold text-ink">
          {t("profile.settings.personalInfo.title")}
        </h2>
        <p className="mt-1 text-[13px] text-ink-2">
          {t("profile.settings.personalInfo.description")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flabel">
              {t("profile.settings.personalInfo.firstName")}
            </label>
            <Input 
              className="field" 
              defaultValue={currentUser?.firstName ?? ""} 
            />
          </div>
          <div className="space-y-2">
            <label className="flabel">
              {t("profile.settings.personalInfo.lastName")}
            </label>
            <Input 
              className="field" 
              defaultValue={currentUser?.lastName ?? ""} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flabel">
            {t("profile.settings.personalInfo.email")}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input 
              className="field flex-1" 
              defaultValue={currentUser?.email ?? ""} 
              disabled
            />
            {currentUser?.email ? (
              <div className="flex h-11 items-center gap-1.5 rounded-lg border border-line bg-paper px-4 text-[13px] font-medium text-ok">
                <ShieldCheck className="h-4 w-4" />
                {t("profile.settings.personalInfo.verified")}
              </div>
            ) : (
              <button 
                onClick={handleVerifyEmail}
                className="btn-outline h-11 whitespace-nowrap rounded-lg px-6 text-[13px]"
              >
                {t("profile.settings.personalInfo.verify")}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flabel">
            {t("profile.settings.personalInfo.phone")}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input 
              className="field flex-1" 
              defaultValue={currentUser?.phoneNumber ?? ""} 
              placeholder="Not provided"
              disabled
            />
            {!currentUser?.phoneNumber && (
              <button 
                onClick={handleAddPhone}
                className="btn-outline flex h-11 items-center gap-2 whitespace-nowrap rounded-lg px-6 text-[13px]"
              >
                <Plus className="h-4 w-4" />
                {t("profile.settings.personalInfo.addPhone")}
              </button>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleSave}
            className="btn-ink h-11 rounded-lg px-8 text-[14px]"
          >
            {t("profile.settings.personalInfo.save")}
          </button>
        </div>
      </div>
    </div>
  );
}
