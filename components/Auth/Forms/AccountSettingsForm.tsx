"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { AccountSettingsInputs } from "@/types/Form";
import { User, Mail, Lock, Eye, EyeOff, Save, ArrowLeft, Loader2, Shield, Settings, Bell, Palette, LogOut, Camera } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserAction, logoutAction } from "@/app/actions/auth";
import { useChatStore } from "@/store/store";
import Link from "next/link";

interface AccountSettingsFormProps {
  initialData?: any;
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { user, loadUser } = useChatStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountSettingsInputs>({
    defaultValues: initialData?.data || initialData?.user || initialData
  });

  useEffect(() => {
    if (!user && !initialData) {
      loadUser();
    }
  }, [user, initialData, loadUser]);

  useEffect(() => {
    if (user) {
      const userData = user.data || user.user || user;
      reset({
        username: userData.username || "",
        email: userData.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<AccountSettingsInputs> = async (data: AccountSettingsInputs) => {
    setIsPending(true);
    const updateData: any = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    
    // If user is trying to update password
    if (data.password) {
      if (!data.currentPassword) {
        toast.error("Current password is required to update your password");
        setIsPending(false);
        return;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        setIsPending(false);
        return;
      }
      updateData.currentPassword = data.currentPassword;
      updateData.password = data.password;
    }

    const result = await updateUserAction(updateData);
    setIsPending(false);

    if (result.success) {
      toast.success(result.message);
      // Clear password fields after success
      reset({
        ...watch(),
        currentPassword: "",
        password: "",
        confirmPassword: ""
      });
      loadUser();
    } else {
      toast.error(result.message);
    }
  };

  const userData = user?.data || user?.user || user || initialData?.data || initialData?.user || initialData;

  if (!user && !initialData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
        <p className="text-muted-foreground animate-pulse">Loading your account details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 shrink-0 space-y-2">
        <div className="p-4 mb-6 text-center lg:text-left">
          <Link href="/chat" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-indigo-500 transition-colors mb-4 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Chat
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your account preferences</p>
        </div>

        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell, disabled: true },
          { id: 'appearance', label: 'Appearance', icon: Palette, disabled: true },
        ].map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            disabled={item.disabled}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full justify-start gap-3 px-4 py-6 rounded-2xl transition-all ${activeTab === item.id
              ? "bg-white dark:bg-white/10 shadow-sm text-indigo-600 dark:text-indigo-400 ring-1 ring-black/5 dark:ring-white/5"
              : "text-muted-foreground hover:bg-white/50 dark:hover:bg-white/5"
              }`}
          >
            <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-indigo-500" : ""}`} />
            <span className="font-medium">{item.label}</span>
            {item.disabled && <span className="ml-auto text-[10px] uppercase tracking-wider opacity-50 bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">Soon</span>}
          </Button>
        ))}

        <div className="pt-8 mt-8 border-t border-neutral-200 dark:border-white/10">
          <Button
            variant="ghost"
            onClick={() => logoutAction()}
            className="w-full justify-start gap-3 px-4 py-6 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl rounded-[2.5rem] border border-neutral-200/50 dark:border-white/10 shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
        <div className="p-8 md:p-12">
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 border-b border-neutral-100 dark:border-white/5 pb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white dark:ring-neutral-900">
                    {userData?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-0 right-0 h-10 w-10 bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-100 dark:border-neutral-700 text-indigo-500 hover:scale-110 transition-transform hover:bg-white dark:hover:bg-neutral-800"
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h2 className="text-2xl font-bold">{userData?.username || 'User'}</h2>
                  <p className="text-muted-foreground">{userData?.email}</p>
                  <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-800/50">Free Plan</span>
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-100 dark:border-green-800/50">Active</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 md:col-span-1">
                    <Label htmlFor="username" className="text-sm font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-500" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      {...register("username", { 
                        required: "Username is required",
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message: "Username can only contain letters, numbers, and underscores"
                        }
                      })}
                      className="h-14 bg-white/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
                    />
                    {errors.username && <p className="text-xs text-red-500 ml-2">{errors.username.message}</p>}
                  </div>

                  <div className="space-y-3 md:col-span-1">
                    <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-indigo-500" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="h-14 bg-white/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
                    />
                    {errors.email && <p className="text-xs text-red-500 ml-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    size="lg"
                    type="submit"
                    disabled={isPending || isSubmitting}
                    className="h-14 px-10 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 font-semibold"
                  >
                    {isPending || isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="border-b border-neutral-100 dark:border-white/5 pb-6">
                <h2 className="text-2xl font-bold">Security Settings</h2>
                <p className="text-muted-foreground mt-1">Keep your account secure with a strong password.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="currentPassword" title="Current Password" />
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password to verify"
                        {...register("currentPassword", {
                          validate: (val) => {
                            if (watch('password') && !val) return "Current password is required to change password";
                          }
                        })}
                        className="h-14 bg-white/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 rounded-2xl px-6 pr-14 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-indigo-500 hover:bg-transparent"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                    {errors.currentPassword && <p className="text-xs text-red-500 ml-2">{errors.currentPassword.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" title="New Password" />
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        {...register("password", { minLength: { value: 6, message: "Min 6 characters" } })}
                        className="h-14 bg-white/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 rounded-2xl px-6 pr-14 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-indigo-500 hover:bg-transparent"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 ml-2">{errors.password.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" title="Confirm Password" />
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...register("confirmPassword", {
                          validate: (val) => {
                            if (watch('password') && val !== watch('password')) return "Passwords do not match";
                          }
                        })}
                        className="h-14 bg-white/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 rounded-2xl px-6 pr-14 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-indigo-500 hover:bg-transparent"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 ml-2">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-[2rem] flex gap-4">
                  <Shield className="h-6 w-6 text-amber-500 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-400">Password Requirements</h4>
                    <p className="text-sm text-amber-800/80 dark:text-amber-500/80">Use at least 8 characters with a mix of letters, numbers and symbols for better security.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    size="lg"
                    type="submit"
                    disabled={isPending || isSubmitting}
                    className="h-14 px-10 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 font-semibold"
                  >
                    {isPending || isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
