import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

type Notification = {
  id: number;
  isRead: boolean;
  avatarUrl: any;
  iconUrl: any;
  projectName: string;
  title: string;
  timeAgo: string;
};

export default function NotificationContent() {
  const [isRead, setIsRead] = useState(false);

  const fetchNoti = (isRead: boolean) => {
    if (isRead) return axios.get(`/api/notifications?isRead=true`);
    if (!isRead) return axios.get("/api/notifications");
  };

  const { data: notifications } = useQuery(["getNotifications", isRead], () =>
    fetchNoti(isRead)
  );

  return (
    <>
      <div
        className={`absolute rounded-full ${
          notifications?.data?.length > 100
            ? "w-7 h-5 top-[-4px] right-[-12px]"
            : "w-5 h-4 top-0 right-[-6px]"
        } bg-[#be123c] text-white text-xs flex items-center justify-center`}
      >
        {notifications?.data?.length > 100
          ? "99+"
          : notifications?.data?.length}
      </div>
      <div className="bg-[#292C35] absolute top-[48px] right-[-8rem] w-[420px] h-[80vh] flex flex-col gap-5 p-6 z-10 overflow-y-auto notification-content">
        <div className="flex justify-between">
          <span className="text-white text-xl font-semibold">
            Notifications
          </span>
          <div className="flex gap-3 text-white text-sm cursor-pointer">
            <div
              onClick={() => setIsRead(false)}
              className="px-3 py-2 rounded-3xl"
              style={{
                backgroundColor: isRead
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.3)",
              }}
            >
              All
            </div>
            <div
              onClick={() => setIsRead(true)}
              className="px-3 py-2 rounded-3xl"
              style={{
                backgroundColor: isRead
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
              }}
            >
              Unread
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {notifications?.data?.map((notification: Notification) => (
            <div
              key={notification.id}
              className={`flex gap-4 p-2 ${
                !notification.isRead ? "bg-[#3F3F46]" : undefined
              }`}
            >
              <div className="w-32 h-32">
                <Image
                  src={notification.avatarUrl}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="object-fill rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4">
                    <Image
                      src={notification.iconUrl}
                      alt="icon"
                      width={16}
                      height={16}
                      className="object-fill rounded-full"
                    />
                  </div>
                  <span>{notification.projectName}</span>
                </div>
                <span className="text-white text-base">
                  {notification.title}
                </span>
                <span className="text-xs text-secondary-400">
                  {notification.timeAgo} ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
