import { Chip, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedFilterState } from 'src/recoil/SearchState';
import { CheckType } from 'src/app/clinical/types';

export default function SelectedFilterChip() {
  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);

  const chipData = checked.filter((item) => item.valid === true);

  const onDeleteChip = useCallback(
    (code: string, p_code: string, root: string) => {
      console.log('onDeleteChip > ', code);

      const checkedLength = checked.length;
      let isRootCheck = false;
      const deletedData = checked.map((item) => {
        console.log('checked > ', checked);

        if (item.code === root && item.checked) {
          isRootCheck = true;
        }

        if (item.code === code && item.root === root) {
          return { ...item, valid: false, checked: false };
        } else if (item.code === p_code && item.root === root) {
          return { ...item, valid: false, checked: false };
        } else if (item.code === root) {
          return { ...item, valid: false, checked: false };
        } else {
          return item;
        }
      });

      const groups = deletedData.filter((item) => item.root === root);

      setChecked([...deletedData]);
    },
    [checked],
  );

  return (
    <Stack
      mt={chipData.length > 0 ? '18px' : '0px'}
      mb={chipData.length > 0 ? '18px' : '0px'}
      useFlexGap
      flexWrap="wrap"
      spacing={1}
      direction={'row'}
    >
      {chipData.map((item) => (
        <Chip
          onDelete={() => onDeleteChip(item.code, item.p_code, item.root)}
          key={item.code}
          label={item.label}
        />
      ))}
    </Stack>
  );
}
