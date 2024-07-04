import React from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import "../../styles/globals.css";

// Notification Component
const Notification = ({ status, title, message }) => {
  const statusClasses = {
    success: 'bg-lightgreen text-black border-green',
    failure: 'bg-lightred text-black border-red',
    pending: 'bg-lightyellow text-black border-yellow',
  };

  const iconComponents = {
    success: <CheckCircleIcon className="h-8 h-8 text-green" />,
    failure: <XCircleIcon className="h-8 h-8 text-red" />,
    pending: <ExclamationCircleIcon className="h-8 h-8 text-yellow" />
  };

  const IconComponent = iconComponents[status];

  return (
    <div className={`border-l-4 p-4 mb-4 ${statusClasses[status]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {IconComponent}
        </div>
        <div className="ml-3">
          <p className="text-md font-medium">{title}</p>
          <p className="text-md">{message}</p>
        </div>
      </div>
    </div>
  );
};

Notification.propTypes = {
  status: PropTypes.oneOf(['success', 'failure', 'pending']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  status: 'pending',
};

export default Notification;