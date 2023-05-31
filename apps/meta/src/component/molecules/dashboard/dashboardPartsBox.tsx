import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import MyIcon from '../../../../../../packages/icon/myIcon';
import { DiseaseVoList } from '../../../app/clinical/page';
import { styled } from '@mui/system';

interface Props {
  type: string;
  typeCount: number;
  data: DiseaseVoList[];
}

const DashboardPartsBox = ({ type, typeCount, data }: Props) => {
  return (
    <TypeBox>
      <TitleBox>
        <FlexBox>
          <Typography variant="title2">{type}</Typography>
          <MyIcon icon={'cheveron-right'} size={23} />
        </FlexBox>
        <FlexBox sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" marginRight={'7px'}>
            대상자 수
          </Typography>
          <Typography variant="title1">{typeCount.toLocaleString()}</Typography>
        </FlexBox>
      </TitleBox>
      <ListBox>
        {data.map((item, index) => (
          <Box key={index}>
            <ListItem
              sx={{
                mb: index + 1 !== data.length ? '12px' : '0px',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{ whiteSpace: 'nowrap', mr: '6px' }}
                variant="body1"
              >
                {item.name}
              </Typography>
              <Box sx={{ width: '100%', border: '1px dashed #ADB5BD;' }}></Box>
              <Typography sx={{ ml: '7px' }} variant="subtitle1">
                {item.total.toLocaleString()}
              </Typography>
            </ListItem>
          </Box>
        ))}
      </ListBox>
    </TypeBox>
  );
};

export default DashboardPartsBox;

const TypeBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 30px;
  gap: 12px;
  width: 100%;
  min-height: 186px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
`;

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ced4da;
`;

const ListBox = styled(Box)`
  width: 100%;
`;

const ListItem = styled(FlexBox)`
  width: 100%;
`;
