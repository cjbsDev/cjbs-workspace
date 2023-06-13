import { Chip, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CheckType } from 'src/app/clinical/search/types';
import { selectedFilterState } from 'src/recoil/SearchState';

export default function SelectedFilterChip() {
  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);
  console.log('checked >>> ', checked);

  const chipData = checked.filter((item) => item.valid === true);
  console.log('chipData > ', chipData);

  const onDeleteChip = useCallback((code: string) => {
    console.log('onDeleteChip > ', code);
    const deletedData = checked.filter((item) => item.code !== code);
    setChecked([...deletedData]);
  }, []);

  return (
    <Stack useFlexGap flexWrap="wrap" spacing={1} direction={'row'}>
      {chipData.map((item) => (
        <Chip
          onDelete={() => onDeleteChip(item.code)}
          key={item.code}
          label={item.label}
        />
      ))}
    </Stack>
  );
}
