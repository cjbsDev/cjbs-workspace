import { Box } from "@mui/material";
import React from "react";
import {
  useForm,
  FormProvider,
  Controller,
  FormProps,
  FormProviderProps,
} from "react-hook-form";

interface FormContainerProps {
  id?: string;
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  defaultValues: object;
}

export const Form = ({
  defaultValues,
  children,
  onSubmit,
  id,
}: FormContainerProps) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        id={id}
      >
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register,
                      key: child.props.name,
                    },
                  })
                : child;
            })
          : children}
      </Box>
    </FormProvider>
  );
};
