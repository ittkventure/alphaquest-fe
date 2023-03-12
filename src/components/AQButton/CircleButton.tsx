import React, { FC } from "react";

interface CircleButtonTypes
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactElement;
}

const CircleButton: FC<CircleButtonTypes> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="h-16 w-16 rounded-[50%] custom-circle-linear-btn bg-red-200 flex justify-center items-center"
    >
      {children}
    </button>
  );
};

export default CircleButton;
