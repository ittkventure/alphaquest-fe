import React, { FC } from "react";

interface AQInputTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
  name: string;
  labelText?: string;
}

const AQInput: FC<AQInputTypes> = ({ register, name, labelText, ...rest }) => {
  return (
    <div className="w-full">
      {labelText ? (
        <div>
          <label>{labelText}</label>
        </div>
      ) : null}
      <div className="mt-3">
        <input
          className="w-full p-3 bg-dark-800 border border-secondary-700 focus:outline-none focus:border-success-500"
          {...rest}
        />
      </div>
    </div>
  );
};

export default AQInput;
