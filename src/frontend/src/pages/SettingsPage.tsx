import { useEffect, useState } from "react";

import {
  Bell,
  Building2,
  KeyRound,
  Mail,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Sun,
  Trash2,
  User,
  UserRound,
} from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { toastSuccess } from "@/components/ui/Toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "dark";

interface ProfileForm {
  name: string;
  email: string;
  organization: string;
}

interface PasswordForm {
  current: string;
  newPassword: string;
  confirm: string;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

function getInitialTheme(): ThemeMode {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return "light";
}

export function SettingsPage() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [profile, setProfile] = useState<ProfileForm>({
    name: "Alex Morgan",
    email: "alex.morgan@veriscan.io",
    organization: "Northbridge Compliance",
  });
  const [password, setPassword] = useState<PasswordForm>({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [twoFactor, setTwoFactor] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email_alerts",
      title: "Email alerts",
      description: "Receive a summary of verification activity by email.",
      enabled: true,
    },
    {
      id: "verification_updates",
      title: "Verification updates",
      description: "Get notified when a document verification completes.",
      enabled: true,
    },
    {
      id: "security_alerts",
      title: "Security alerts",
      description: "Be alerted to unusual sign-ins or account activity.",
      enabled: true,
    },
    {
      id: "product_updates",
      title: "Product updates",
      description: "Hear about new features and improvements to VeriScan.",
      enabled: false,
    },
  ]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const toggleNotification = (id: string) => {
    setNotifications((current) =>
      current.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  const handleSaveProfile = (event: React.FormEvent) => {
    event.preventDefault();
    toastSuccess("Profile updated", "Your profile information has been saved.");
  };

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.newPassword !== password.confirm) {
      toastSuccess(
        "Passwords do not match",
        "Please make sure both password fields match.",
      );
      return;
    }
    toastSuccess(
      "Password changed",
      "Your password has been updated successfully.",
    );
    setPassword({ current: "", newPassword: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    setDeleteOpen(false);
    toastSuccess(
      "Account deletion requested",
      "We've sent a confirmation link to your email.",
    );
  };

  return (
    <div data-ocid="settings_page" className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile, preferences, and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Profile */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary/15 flex size-10 items-center justify-center rounded-xl text-primary">
                <UserRound className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Profile
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your personal information.
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <form
              data-ocid="profile_form"
              onSubmit={handleSaveProfile}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-brand-gradient text-lg font-semibold text-white">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">Profile photo</p>
                  <p className="text-sm text-muted-foreground">
                    JPG or PNG, up to 2MB.
                  </p>
                  <Button
                    data-ocid="upload_avatar_button"
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      toastSuccess(
                        "Avatar upload",
                        "Avatar uploads are not available in this demo.",
                      )
                    }
                  >
                    Upload new
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="profile_name">Full name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profile_name"
                      data-ocid="profile_name_input"
                      className="pl-9"
                      value={profile.name}
                      onChange={(event) =>
                        setProfile({ ...profile, name: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="profile_email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profile_email"
                      data-ocid="profile_email_input"
                      type="email"
                      className="pl-9"
                      value={profile.email}
                      onChange={(event) =>
                        setProfile({ ...profile, email: event.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="profile_org">Organization</Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profile_org"
                      data-ocid="profile_org_input"
                      className="pl-9"
                      value={profile.organization}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          organization: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  data-ocid="save_profile_button"
                  type="submit"
                  className="bg-brand-gradient border-0 text-white shadow-sm hover:opacity-90"
                >
                  <Save className="size-4" />
                  Save changes
                </Button>
              </div>
            </form>
          </GlassCard>

          {/* Notifications */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary/15 flex size-10 items-center justify-center rounded-xl text-primary">
                <Bell className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Notifications
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose what you want to be notified about.
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col">
              {notifications.map((setting, index) => (
                <div
                  key={setting.id}
                  data-ocid={`notification_item.${index + 1}`}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      {setting.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    data-ocid={`notification_toggle.${index + 1}`}
                    checked={setting.enabled}
                    onCheckedChange={() => toggleNotification(setting.id)}
                    aria-label={`Toggle ${setting.title}`}
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Account */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary/15 flex size-10 items-center justify-center rounded-xl text-primary">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your password and security preferences.
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <form
              data-ocid="password_form"
              onSubmit={handleChangePassword}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <span className="bg-muted flex size-9 items-center justify-center rounded-lg text-muted-foreground">
                  <KeyRound className="size-4" />
                </span>
                <div>
                  <p className="font-medium text-foreground">Change password</p>
                  <p className="text-sm text-muted-foreground">
                    Use at least 8 characters with a mix of letters and numbers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password_current">Current password</Label>
                  <Input
                    id="password_current"
                    data-ocid="password_current_input"
                    type="password"
                    value={password.current}
                    onChange={(event) =>
                      setPassword({
                        ...password,
                        current: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password_new">New password</Label>
                  <Input
                    id="password_new"
                    data-ocid="password_new_input"
                    type="password"
                    value={password.newPassword}
                    onChange={(event) =>
                      setPassword({
                        ...password,
                        newPassword: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password_confirm">Confirm new password</Label>
                  <Input
                    id="password_confirm"
                    data-ocid="password_confirm_input"
                    type="password"
                    value={password.confirm}
                    onChange={(event) =>
                      setPassword({
                        ...password,
                        confirm: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  data-ocid="change_password_button"
                  type="submit"
                  variant="outline"
                >
                  Update password
                </Button>
              </div>
            </form>

            <Separator className="my-5" />

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-foreground">
                  Two-factor authentication
                </p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <Switch
                data-ocid="two_factor_toggle"
                checked={twoFactor}
                onCheckedChange={(checked) => {
                  setTwoFactor(checked);
                  toastSuccess(
                    checked ? "Two-factor enabled" : "Two-factor disabled",
                    checked
                      ? "Your account is now more secure."
                      : "Two-factor authentication has been turned off.",
                  );
                }}
                aria-label="Toggle two-factor authentication"
              />
            </div>
          </GlassCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Appearance */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary/15 flex size-10 items-center justify-center rounded-xl text-primary">
                <Palette className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Appearance
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how VeriScan looks.
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 gap-3">
              <button
                data-ocid="theme_light_button"
                type="button"
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-smooth",
                  theme === "light"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted/40",
                )}
              >
                <Sun className="size-5" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                data-ocid="theme_dark_button"
                type="button"
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 transition-smooth",
                  theme === "dark"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted/40",
                )}
              >
                <Moon className="size-5" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border bg-muted/40 p-4">
              <div className="min-w-0">
                <p className="font-medium text-foreground">Quick toggle</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark.
                </p>
              </div>
              <Button
                data-ocid="theme_toggle_button"
                variant="outline"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            </div>
          </GlassCard>

          {/* Danger zone */}
          <GlassCard className="border-rose-500/30 p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500">
                <Trash2 className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Danger zone
                </h2>
                <p className="text-sm text-muted-foreground">
                  Irreversible account actions.
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated verification
              data. This action cannot be undone.
            </p>
            <Button
              data-ocid="delete_account_button"
              variant="destructive"
              className="mt-4 w-full"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="size-4" />
              Delete account
            </Button>
          </GlassCard>
        </div>
      </div>

      <Modal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete account?"
        description="This will permanently remove your account and all verification history. This action cannot be undone."
        confirmLabel="Delete account"
        cancelLabel="Cancel"
        onConfirm={handleDeleteAccount}
      >
        <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
          <Trash2 className="mt-0.5 size-5 shrink-0 text-rose-500" />
          <p className="text-sm text-foreground">
            Are you sure you want to continue? You will lose access to all
            documents and reports associated with this account.
          </p>
        </div>
      </Modal>
    </div>
  );
}
