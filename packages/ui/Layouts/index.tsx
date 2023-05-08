import React from 'react'
import type {ReactElement} from 'react';
import { Layout } from "./layout";
import { NestedLayout } from "./nestedLayout";

export const getCommonLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getNestedLayout = (page: ReactElement) => (
  <Layout>
    <NestedLayout>{page}</NestedLayout>
  </Layout>
);
