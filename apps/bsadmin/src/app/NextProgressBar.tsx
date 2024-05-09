"use client";

import * as React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { yellow } from "cjbsDSTM/themes/color";

export const NextProgressBar = () => {
  return (
    <ProgressBar
      height="8px"
      color={yellow["500"]}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
