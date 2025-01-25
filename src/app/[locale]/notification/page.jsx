'use client';
import React from 'react';
import Navigate from '@/components/navigate/Navigate';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useGetNotificationQuery } from '@/redux/Api/webmanageApi';
import Loading from '@/components/Loading';
import { NoData } from '@/components/NoData'; // Import NoData component for fallback

const Page = () => {
  const { data: notificationData, isLoading, error } = useGetNotificationQuery();
  const p = useTranslations("profile");

  if (isLoading) return <p className="h-screen"><Loading /></p>;
  if (error) return <div className='h-screen flex justify-center items-center'>Error fetching notifications!</div>;

  // Destructure notifications from API response
  const notifications = notificationData?.data?.result || [];

  return (
    <div className="max-w-[1400px] m-auto h-[50vh]">
      <div className="mt-4 mb-20">
        <div className="md:w-[20%]">
          <Navigate title={`${p("Notification")}`} />
        </div>
        <div className="mt-11">
          {notifications.length > 0 ? (
            <>
              <div className="text-xl font-semibold mb-4">
                Total {notifications.length} Notifications
              </div>
              {notifications.map((notification) => (
                <div
                  className="flex items-center justify-between py-6 pr-4 ml-5 border-b"
                  key={notification._id}
                >
                  <div className="flex gap-3 md:gap-11">
                    <div>
                      <Image
                        width={80}
                        height={80}
                        src="/article/profile.png" // Static image for now
                        alt={notification.title}
                      />
                    </div>
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-[#595959]">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-gray-500">
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </h1>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <NoData /> // Show NoData when no notifications are available
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
