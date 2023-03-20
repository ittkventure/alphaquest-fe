import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import React, { FC, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AQFormTypes {
  defaultValues: any;
  children: any;
  onSubmit: SubmitHandler<any>;
  validationSchemaParams?: any;
}

const AQForm: FC<AQFormTypes> = ({
  defaultValues,
  children,
  onSubmit,
  validationSchemaParams,
}) => {
  const resolver = useYupValidationResolver(validationSchemaParams);

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
                errors: errors[child.props.name],
              },
            })
          : child;
      })}
    </form>
  );
};

export default AQForm;
