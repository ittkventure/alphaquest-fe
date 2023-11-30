import Image from "next/image";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/useAuthContext";
import { useQuery } from "react-query";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  checkAsReadNotification,
  fetchNotifications,
} from "@/api-client/notification";
import {
  NOTIFICATION_TYPE,
  Notification,
} from "@/api-client/types/Notification";
import { calculateTimeAgo } from "@/utils/date";
import { AlphaHunterIcon, ProjectIcon } from "@/assets/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type NotificationContentProps = {
  closeNotification: () => void;
};

export default function NotificationContent({
  closeNotification,
}: NotificationContentProps) {
  const router = useRouter();
  const [isRead, setIsRead] = useState(false);
  const { authState } = useContext(AuthContext);

  const accessToken = authState?.access_token || "";

  const { data: notifications, refetch } = useQuery(
    ["getNotifications", isRead, { pageNumber: 1, pageSize: 100 }],
    () =>
      fetchNotifications(accessToken, isRead, { pageNumber: 1, pageSize: 100 })
  );

  const redirectByType = (type: NOTIFICATION_TYPE, ref: string) => {
    if (type === NOTIFICATION_TYPE.AlphaHunterFollowProject)
      router.push(`/alpha-hunter/${ref}?follow`);
    if (type === NOTIFICATION_TYPE.AlphaHunterUpdateInfo)
      router.push(`/alpha-hunter/${ref}?update`);
    if (type === NOTIFICATION_TYPE.ProjectFollowAlphaHunter)
      router.push(`/project/${ref}?follow`);
    if (type === NOTIFICATION_TYPE.ProjectUpdateInfo)
      router.push(`/project/${ref}?update`);
  };

  const handleNotiItem = async (notification: Notification) => {
    if (!notification.unread)
      redirectByType(notification.type, notification.ref2);
    if (notification.unread) {
      try {
        await checkAsReadNotification(notification.id);
        await refetch();
        redirectByType(notification.type, notification.ref2);
      } catch (error: any) {
        if (error?.response?.data?.error?.message) {
          toast.error(error?.response?.data?.error?.message);
        } else {
          toast.error("Error when unread notification, please try again!");
        }
      }
    }
    closeNotification();
  };

  return (
    <>
      <div className="bg-[#292C35] max-lg:bg-dark-900 max-lg:z-[1000] max-lg:h-screen max-lg:fixed max-lg:top-0 absolute max-lg:left-0 top-[48px] right-[-8rem] w-[420px] max-lg:w-full h-[80vh] flex flex-col gap-5 p-6 z-10 overflow-y-auto max-lg:overflow-hidden notification-content lg:animate-slideDownAndFade">
        <div className="hidden max-lg:block">
          <XMarkIcon
            className="h-7 w-7 transition-all duration-300"
            onClick={closeNotification}
          />
        </div>
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
          {notifications?.items?.map((notification: Notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotiItem(notification)}
              className={`flex gap-4 p-2 cursor-pointer ${
                notification.unread ? "bg-[#3F3F46]" : undefined
              }`}
            >
              <div className="w-32 h-32">
                <Image
                  src={notification.imageUrl}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4">
                    <Image
                      src={
                        notification?.title === "Alpha Hunter"
                          ? AlphaHunterIcon
                          : ProjectIcon
                      }
                      alt="icon"
                      width={20}
                      height={20}
                      className="object-fill rounded-full"
                    />
                  </div>
                  <span className="break-all">{notification.title}</span>
                </div>
                <span className="text-white text-base">
                  {notification.message}
                </span>
                <span className="text-xs text-secondary-400">
                  {calculateTimeAgo(notification.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
