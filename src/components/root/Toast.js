import React from "react";
import { m } from "framer-motion";
import { InformationCircleIcon, SpeakerphoneIcon } from "@heroicons/react/solid";
const statusArray = {
  info: {
    Icon: InformationCircleIcon,
    bgColor: "bg-orange-400",
    timerColor: "bg-orange-600",
    borderColor: "border-orange-600",
  },
  speaker: {
    Icon: SpeakerphoneIcon,
    bgColor: "bg-orange-400",
    timerColor: "bg-orange-600",
    borderColor: "border-orange-600",
  },
};

const Toast = ({ duration, title, status = "info", children }) => {
  const { Icon, bgColor, timerColor, borderColor } = statusArray[status];
  return (
    <div
      className={`relative ${bgColor} shadow-lg overflow-hidden mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
      id="static-example"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false"
    >
      <m.div
        animate={{ width: 0 }}
        transition={{ ease: "easeOut", duration: duration / 1000 - 0.1 }}
        className={`absolute top-0 right-0 w-full h-2 ${timerColor} opacity-50`}
      />
      <div
        className={`flex space-x-1 text-white items-center pt-3 pb-2 px-3 ${
          children ? `border-b ${borderColor}` : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        <p className="font-bold">{title}</p>
      </div>
      {children && (
        <div className="p-3 rounded-b-lg break-words text-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Toast;