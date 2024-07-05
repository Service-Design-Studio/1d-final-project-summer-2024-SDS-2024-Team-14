import React from "react";
import Notification from "../../components/verification/notifications.js";
import "../../styles/globals.css";

export default function Status() {
  const notifications = [
    { status: 'success', title: 'Success', message: 'Finance Document 5 has been verified successfully!' },
    { status: 'failure', title: 'Failure', message: 'Education Document 1 has been declined' },
    { status: 'pending', title: 'Pending', message: 'Finance Document 7 is pending verification' },
  ];

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl text-darkblue font-semibold mb-4">New notifications</h2>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      ))}
      <h2 className="text-2xl text-darkblue font-semibold mb-4">Past notifications</h2>
      <Notification
        status="success"
        title="Success"
        message="Family Document 5 has been verified successfully!"
      />
      <button className="text-darkblue mt-4 hover:underline">Clear all</button>
    </div>
  );
}