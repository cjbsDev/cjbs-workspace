import type { Meta, StoryObj } from '@storybook/react';

import { DataTableBase } from 'cjbsDSTM';
import {dataTableSampleData} from '../data/dataTableSampleData'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DataTableBase> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/DataTable',
  component: DataTableBase,
};

export default meta;
type Story = StoryObj<typeof DataTableBase>;

export const Default: Story = {
  args: {
    //👇 The args you need here will depend on your component
    data: dataTableSampleData.products,
    columns: [
      {
        name: 'Title',
        selector: row => row.title,
      },
      {
        name: 'Description',
        selector: row => row.description,
      },
      {
        name: 'Brand',
        selector: row => row.brand,
      },
      {
        name: 'Price',
        selector: row => row.price,
      },
      {
        name: 'Rating',
        selector: row => row.rating,
      },
      {
        name: 'Stock',
        selector: row => row.stock,
      },
    ],

  },
};
