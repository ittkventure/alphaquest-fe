import classNames from "classnames";
import React, { FC } from "react";

interface ISpinner {
  customClassName?: string | undefined;
  strokeWidth?: string;
}

const Spinner2: FC<ISpinner> = ({ customClassName, strokeWidth }) => {
  return (
    <div role="status">
      <svg
        className={classNames(
          `animate-spin h-5 w-5 text-white`,
          customClassName
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? "4"}
        ></circle>
        <path
          className="opacity-60 text-success-500"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner2;
