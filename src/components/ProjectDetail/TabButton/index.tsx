import classNames from "classnames";
import React, { FC } from "react";

interface ITabButton {
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const TabButton: FC<ITabButton> = ({ label, active, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center mr-2 border px-3 py-[2px]",
        {
          "border-[#38405B]": !active,
        },
        className
      )}
    >
      <p>{label}</p>
    </button>
  );
};

export default TabButton;
