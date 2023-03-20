import React, { FC } from "react";
import { FieldErrors } from "react-hook-form";

interface AQInputTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
  name: string;
  labelText?: string;
  containerClassName?: string;
  errors?: FieldErrors<any>;
}

const AQInput: FC<AQInputTypes> = ({
  register,
  name,
  labelText,
  containerClassName,
  errors,
  ...rest
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {labelText ? (
        <div>
          <label>{labelText}</label>
        </div>
      ) : null}
      <div className="mt-3">
        <input
          {...register(name)}
          className="w-full p-3 bg-dark-800 border border-secondary-700 focus:outline-none focus:border-success-500"
          {...rest}
        />
      </div>
      {errors ? (
        <p className="text-sm text-primary-500">
          {errors?.message?.toString()}
        </p>
      ) : null}
    </div>
  );
};

export default AQInput;
