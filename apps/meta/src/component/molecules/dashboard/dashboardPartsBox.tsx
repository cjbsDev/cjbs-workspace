import { Box, Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/system';
import MyIcon from 'icon/MyIcon';
import { _Link } from 'cjbsDSTM/atoms/Link';
import dayjs from 'dayjs';
import { CheckType } from 'src/app/clinical/types';
import { selectedFilterState } from 'src/recoil/SearchState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { DiseaseVoList } from 'src/app/clinical/(mainlayout)/dashboard/page';
interface Props {
  type: string;
  typeCount: number;
  data: DiseaseVoList[];
  code: string;
}

const DashboardPartsBox = ({ type, typeCount, data, code }: Props) => {
  console.log('code > ', code);

  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);
  const router = useRouter();

  const onCount = useCallback(
    (code: string) => {
      var now = dayjs();

      let newChecked: CheckType[] = [...checked];
      console.log('type >>> ', newChecked);

      const updateChecked = newChecked.map((item) => {
        console.log('item > ', item);

        if (item.p_code === code) {
          //자식코드 일때
          return {
            ...item,
            checked: true,
            valid: true,
          };
        } else if (item.code === code) {
          // 자신일 때
          return {
            ...item,
            checked: true,
            valid: item.p_code != code ? true : false,
          };
        } else {
          return { ...item, checked: false, valid: false };
        }
      });

      setChecked(updateChecked);
      router.push('/clinical/subject');
    },

    [checked],
  );

  const onType = useCallback(
    (code: string) => {
      var now = dayjs();
      console.log('subjectType > ', code);

      let newChecked: CheckType[] = [...checked];
      console.log('type >>> ', newChecked);

      const updateChecked = newChecked.map((item) => {
        console.log('item > ', item);

        if (item.p_code === code) {
          //자식코드 일때
          return {
            ...item,
            checked: true,
            valid: true,
          };
        } else if (item.code === code) {
          // 자신일 때
          return {
            ...item,
            checked: true,
            valid: false,
          };
        } else {
          return { ...item, checked: false, valid: false };
        }
      });

      setChecked(updateChecked);
      router.push('/clinical/disease-study');
    },

    [checked],
  );

  return (
    <TypeBox>
      <TitleBox>
        <FlexBox>
          <_Link
            display={'flex'}
            alignItems={'center'}
            onClick={() => onType(code)}
            sx={{ textDecoration: 'none' }}
          >
            <Typography variant="title2" color={'black'}>
              {type}
            </Typography>
            <MyIcon icon={'cheveron-right'} size={23} color={'black'} />
          </_Link>
        </FlexBox>
        <FlexBox>
          <Typography variant="body2" marginRight={'7px'}>
            대상자 수
          </Typography>
          <_Link
            onClick={() => onCount(code)}
            sx={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="title1" color={'black'}>
              {typeCount.toLocaleString()}
            </Typography>
          </_Link>
        </FlexBox>
      </TitleBox>
      <ListBox>
        {data.map((item, index) => (
          <Box key={index}>
            <_Link
              onClick={() => onCount(item.name)}
              sx={{ textDecoration: 'none' }}
            >
              <ListItem
                sx={{
                  mb: index + 1 !== data.length ? '12px' : '0px',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{ whiteSpace: 'nowrap', mr: '6px' }}
                  color={'black'}
                  variant="body1"
                >
                  {item.name}
                </Typography>
                <Box
                  sx={{ width: '100%', border: '1px dashed #dfe4e9;' }}
                ></Box>
                <Typography
                  sx={{ ml: '7px' }}
                  color={'black'}
                  variant="subtitle1"
                >
                  {item.total.toLocaleString()}
                </Typography>
              </ListItem>
            </_Link>
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
  height: 186px;
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
  margin-top: -15px;
  height: 45px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ced4da;
`;

const ListBox = styled(Box)`
  width: 100%;
`;

const ListItem = styled(FlexBox)`
  width: 100%;
`;
