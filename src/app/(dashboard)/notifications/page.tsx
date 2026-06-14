import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyNotifications } from "@/app/actions/notification-actions";
import { NotificationFeed } from "@/features/notifications/components/notification-feed";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const notifications = await getMyNotifications();

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between pb-6 shrink-0 border-b border-border mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on task assignments and team comments.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-6">
        <NotificationFeed initialNotifications={notifications} />
      </div>
    </div>
  );
}
