import AccountSettingsForm from "@/components/Auth/Forms/AccountSettingsForm";
import { getUserAction } from "@/app/actions/auth";

export default async function SettingsPage() {
  const result = await getUserAction();
  const initialData = result.success ? result.data : null;

  return (
    <div className="min-h-screen w-full flex items-start justify-center p-4 md:p-8 lg:p-12 overflow-y-auto">
      <AccountSettingsForm initialData={initialData} />
    </div>
  );
}
