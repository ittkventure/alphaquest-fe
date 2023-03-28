import { TickIcon } from "@/assets/icons";
import Image from "next/image";
import React, { createRef, FC, useRef } from "react";
import { UseFormWatch } from "react-hook-form";

interface AQCheckboxTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
  name: string;
  content?: React.ReactElement;
  checked?: boolean;
  containerClassName?: string;
}

const AQCheckbox: FC<AQCheckboxTypes> = ({
  register,
  name,
  content,
  checked,
  containerClassName,
  ...rest
}) => {
  return (
    <label
      className={`flex relative cursor-pointer checkbox-custom ${containerClassName}`}
    >
      <input
        type="checkbox"
        {...rest}
        className="opacity-0 absolute w-5 h-5 "
      />
      <div className="h-5 w-5 border border-success-500 flex justify-center items-center">
        {checked ? (
          <Image src={TickIcon} className="w-4 h-4" alt="tick" />
        ) : null}
      </div>
      <div className=" w-[90%]">{content ?? content}</div>
    </label>
  );
};

export default AQCheckbox;
