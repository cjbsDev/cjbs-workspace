import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

export const Form = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit, register, reset } = methods;

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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
