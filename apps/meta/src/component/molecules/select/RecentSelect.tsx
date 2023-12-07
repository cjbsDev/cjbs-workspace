import {
  Box,
  Chip,
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyIcon from 'icon/MyIcon';
import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';

const RECENT_SEARCH_LOCAL_STORAGE_KEY = 'META_SEARCH_LOCAL';
const ITEM_HEIGHT = 48;
const ITEM_WIDTH = 178;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const RecentSelect = () => {
  const [recent, setRecent] = useState<string>('');
  const [recentList, setRecentList] = useState<string[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const storage = await localStorage.getItem('META_SEARCH_LOCAL');
    if (storage) {
      const data = JSON.parse(storage);
      setRecentList(data);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof recent>) => {
    const {
      target: { value },
    } = event;

    console.log('vvvv', value);

    setRecent(value);
  };

  return (
    <Box width={ITEM_WIDTH}>
      <Select
        id="search-recent-word"
        fullWidth
        sx={{ height: '40px' }}
        label={<Typography variant="body2"> 최근 검색 목록</Typography>}
        value={recent}
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {recentList.map((name, index) => (
          <Box key={index}>
            <FlexBox width={'100%'} justifyContent={'space-between'}>
              <MenuItem key={name} value={name} sx={{ width: ITEM_WIDTH - 20 }}>
                <Typography variant="body2"> {name}</Typography>
              </MenuItem>
              <MyIcon size={20} color="rgba(0, 0, 0, 0.6)" icon="x" />
            </FlexBox>
            {recentList.length !== index + 1 && <Divider variant="middle" />}
            {recentList.length === 0 && (
              <MenuItem
                key={'zero'}
                value={''}
                disabled
                sx={{ width: ITEM_WIDTH - 20 }}
              >
                <Typography variant="body2">최근 검색어가 없습니다.</Typography>
              </MenuItem>
            )}
          </Box>
        ))}
      </Select>
    </Box>
  );
};

export default RecentSelect;
