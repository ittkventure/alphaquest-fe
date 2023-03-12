import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AQFormTypes {
  defaultValues: any;
  children: any;
  onSubmit: SubmitHandler<any>;
}

const AQForm: FC<AQFormTypes> = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

export default AQForm;
