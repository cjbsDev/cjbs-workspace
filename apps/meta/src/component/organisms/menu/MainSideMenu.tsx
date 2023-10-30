import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  styled,
  Button,
  Chip,
  Stack,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
} from '@mui/material';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';
import {
  AgeType,
  CheckType,
  FilterList,
  Page,
  Search,
  SelectedFilterValues,
} from 'src/app/clinical/types';
import { useRouter, usePathname } from 'next/navigation';
import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';
import { fetcher, metaFetcher } from 'api';
import MyIcon from 'icon/MyIcon';
import { DASHBOARD_URL, SEARCH_URL } from 'src/const/common';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRight: '',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <MyIcon icon="cheveron-down" size="20px" color="rgba(0, 0, 0, 0.6)" />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0px',
  height: '24px',
  marginBottom: '4px',
  minHeight: '24px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '4px',
  marginTop: '-5px',
}));

const SearchedBox = styled(Box)`
  overflow: auto;
  position: absolute;
  width: 238px;
  height: 100%;
  margin-top: 12px;
`;

const FilterInitBox = styled(Box)`
  width: 100%;
  height: 18px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.25px;
  color: #006ecd;
  order: 1;
  flex-grow: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const SearchedBoxHeader = styled(FlexBox)`
  justify-content: space-between;
`;

const FilterTitleBox = styled(FlexBox)`
  justify-content: flex-start;
`;

export const LOCAL_STORAGE_FILTER_KEY = 'meta-cx-filters';
const MainSideMenu = () => {
  const router = useRouter();
  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);
  const [searchInput, setSearchInput] =
    useRecoilState<string>(searchInputState);
  const [age, setAge] = useRecoilState<AgeType>(ageState);
  const [tempAge, setTempAge] = useState<AgeType>({
    subjectMaxAge: 0,
    subjectMinAge: 0,
  });
  const [tempChecked, setTempChecked] = useState<CheckType[]>([]);
  const [accordion, setAccordion] = useState<boolean>(false);
  const { data, isLoading } = useSWR('/filter', metaFetcher);
  const pathname = usePathname();
  useEffect(() => {
    if (isLoading) return;

    if (data !== undefined && data !== null) {
      initSelectedFilter(data);
    }
  }, [isLoading]);

  useEffect(() => {}, [searchInput]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FILTER_KEY, JSON.stringify(checked));
    //TODO recoil api 조회로 바꿔야함
  }, [checked]);

  const initSelectedFilter = useCallback(async (data: any) => {
    const apiData: FilterList[] = data.data;
    const checkList: CheckType[] = [];

    const localStorageData = await localStorage.getItem(
      LOCAL_STORAGE_FILTER_KEY,
    );

    if (localStorageData) {
      const memory: CheckType[] = JSON.parse(localStorageData);

      apiData.map((items) => {
        const itemArray = items.values;

        itemArray.map((item) => {
          //중분류
          const onMemory = memory.filter((memo) => {
            return memo.code === item.code;
          });
          const isMemory = onMemory.length > 0;
          const onMemoryItem = onMemory[0];

          let newItem: CheckType = {
            code: item.code,
            root: items.field,
            p_code: items.field,
            label: item.label,
            checked: isMemory ? onMemoryItem.checked : false,
            valid: isMemory ? onMemoryItem.valid : false,
            date: isMemory ? onMemoryItem.date : null,
          };

          checkList.push(newItem);
          item.values.map((subItem) => {
            //소분류
            const onMemory = memory.filter((memo) => {
              return memo.code === subItem.code;
            });

            const isMemory = onMemory.length > 0;
            const onMemoryItem = onMemory[0];

            let newItem: CheckType = {
              root: items.field,
              code: subItem.code,
              p_code: item.code,
              label: subItem.label,
              checked: isMemory ? onMemoryItem.checked : false,
              valid: isMemory ? onMemoryItem.valid : false,
              date: isMemory ? onMemoryItem.date : null,
            };
            checkList.push(newItem);
          });
        });
      });
    } else {
      apiData.map((items) => {
        const itemArray = items.values;

        itemArray.map((item) => {
          let newItem: CheckType = {
            code: item.code,
            root: items.field,
            p_code: items.field,
            label: item.label,
            checked: false,
            valid: false,
            date: null,
          };
          checkList.push(newItem);
          item.values.map((subItem) => {
            let newItem: CheckType = {
              root: items.field,
              code: subItem.code,
              p_code: item.code,
              label: subItem.label,
              checked: false,
              valid: false,
              date: null,
            };
            checkList.push(newItem);
          });
        });
      });
    }

    setTempChecked(checkList); //all clear 시에 사용
    setChecked(checkList);
  }, []);

  const onChangeCheckbox = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
      if (e.target.value) {
        var now = dayjs();
        const nowDate = now.format('YYYYMMDDHHmmss');
        const values: string[] = e.target.value.split('_');
        console.log('values > ', values);

        const index: number = Number(values[0]);
        const type: string = values[1];
        const rootCode: string = values[2];
        const parentCode: string = values[3];
        const code: string = values[4];
        const label: string = values[5];
        const childLength: number = Number(values[6]);

        let newChecked: CheckType[] = [...checked];

        if (type === 'all') {
          const updateChecked = newChecked.map((item) => {
            if (item.label === 'All' && item.root === rootCode) {
              return { ...item, checked: isChecked, valid: false };
            } else if (
              item.label !== 'All' &&
              item.root === rootCode &&
              item.p_code === item.root
            ) {
              const existChild = newChecked.some((group) => {
                return item.code === group.p_code;
              });

              //중분류는 valid false
              return {
                ...item,
                checked: isChecked,
                valid: existChild ? false : isChecked,
              };
            } else if (
              item.label !== 'All' &&
              item.root === rootCode &&
              item.p_code !== item.root
            ) {
              //중분류 선택했을때 자식코드 체크처리
              return { ...item, checked: isChecked, valid: isChecked };
            } else {
              return item;
            }
          });
          setChecked([...updateChecked]);

          if (pathname === DASHBOARD_URL) {
            router.push(SEARCH_URL);
          }
        } else if (type === 'child') {
          const updateChecked = newChecked.map((item) => {
            if (item.p_code === code) {
              console.log('자식코드인데?');

              //자식코드 일때
              return {
                ...item,
                checked: isChecked,
                date: nowDate,
                valid: isChecked,
              };
            } else if (item.code === code) {
              // 중분류 자신일 때
              return {
                ...item,
                checked: isChecked,
                date: nowDate,
                valid: childLength > 0 ? false : isChecked,
              };
            } else {
              return item;
            }
          });
          //All 표시 체크
          const isGroupAllCheck = updateChecked.every((item) => {
            return item.checked === true;
          });
          const _updateChecked = updateChecked.map((item) => {
            if (item.code === parentCode) {
              return {
                ...item,
                checked: isGroupAllCheck,
                valid: isGroupAllCheck,
                date: null,
              };
            } else {
              return item;
            }
          });

          setChecked([..._updateChecked]);
          if (pathname === DASHBOARD_URL) {
            router.push(SEARCH_URL);
          }
        } else {
          let updateItem: CheckType = {
            ...newChecked[index],
            checked: isChecked,
            date: nowDate,
            valid: isChecked,
          };
          newChecked[index] = updateItem;
          const subGroup = newChecked.filter((item) => {
            return item.p_code === parentCode;
          });
          const isGroupAllCheck = subGroup.every((item) => {
            return item.checked === true;
          });
          const _newChecked = newChecked.map((item) => {
            if (item.code === parentCode) {
              return {
                ...item,
                checked: isGroupAllCheck,
                date: null,
              };
            } else {
              return item;
            }
          });
          setChecked([..._newChecked]);
          if (pathname === DASHBOARD_URL) {
            router.push(SEARCH_URL);
          }
        }
      }
    },
    [checked, searchInput, age, pathname],
  );

  const onChangeMinAge = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTempAge({
        ...tempAge,
        subjectMinAge: Number(e.target.value),
      });
    },
    [tempAge],
  );

  const onChangeMaxAge = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTempAge({
        ...tempAge,
        subjectMaxAge: Number(e.target.value),
      });
    },
    [tempAge],
  );

  const applyAge = useCallback(() => {
    console.log('tempAge > ', tempAge);

    setAge(tempAge);
    if (pathname === DASHBOARD_URL) {
      router.push(SEARCH_URL);
    }
  }, [checked, searchInput, tempAge, pathname]);

  const allClearSelectedFilter = async () => {
    await localStorage.removeItem(LOCAL_STORAGE_FILTER_KEY);

    const clearChecked = checked.map((item) => {
      return { ...item, checked: false, valid: false };
    });
    setAge({
      subjectMaxAge: 0,
      subjectMinAge: 0,
    });
    setSearchInput('');
    setChecked(clearChecked);
  };

  if (isLoading) {
    return (
      <Box mt={'12px'}>
        <Skeleton variant="rectangular" width={238} height={850} />
      </Box>
    );
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    let checkListIndex = -1;
    const apiData: FilterList[] = data.data;

    return (
      <SearchedBox>
        <SearchedBoxHeader>
          <FilterInitBox onClick={allClearSelectedFilter}>
            <MyIcon icon="arrow-clockwise" size="16px" color={'#006ECD'} />
            <Box ml={'4px'}>필터 초기화</Box>
          </FilterInitBox>
        </SearchedBoxHeader>
        {apiData.map((p_items, index) => {
          return (
            <Box
              key={`main-${index}`}
              sx={{
                mt: index === 0 ? '0px' : '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid #CED4DA',
              }}
            >
              <FilterTitleBox mb={'4px'} justifyContent={'flex-start'}>
                <MyIcon icon={p_items.name} size={'24px'} color="black" />
                <Typography ml={'8px'} variant="subtitle1">
                  {p_items.title}
                </Typography>
              </FilterTitleBox>
              {p_items.name === 'age' && (
                <Box>
                  <FlexBox>
                    <OutlinedInput
                      inputProps={{
                        maxLength: 3,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      placeholder="0"
                      onChange={onChangeMinAge}
                      endAdornment={
                        <InputAdornment position="end">세</InputAdornment>
                      }
                      size={'small'}
                    />
                    <Box ml={'5px'} mr={'5px'} color={'#CED4DA'}>
                      -
                    </Box>
                    <OutlinedInput
                      inputProps={{
                        maxLength: 3,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      placeholder="100"
                      onChange={onChangeMaxAge}
                      endAdornment={
                        <InputAdornment position="end">세</InputAdornment>
                      }
                      size={'small'}
                    />
                  </FlexBox>
                  <Button
                    sx={{ mt: '8px', height: '33px' }}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={applyAge}
                  >
                    적용
                  </Button>
                </Box>
              )}
              {p_items.values.map((items, index) => {
                checkListIndex = checkListIndex + 1;
                const isChecked = checked[checkListIndex]
                  ? checked[checkListIndex].checked
                  : false;

                return (
                  <Box key={`sub-${index}`}>
                    {items.values.length === 0 && (
                      <FormControlLabel
                        sx={{ height: '24px', mb: '2px' }}
                        label={
                          <Typography variant="body2">{items.label}</Typography>
                        }
                        control={
                          <Checkbox
                            onChange={onChangeCheckbox}
                            checked={isChecked}
                            value={
                              items.label === 'All'
                                ? `${checkListIndex}_all_${p_items.field}_${p_items.field}_${items.code}_${items.label}_${items.values.length}`
                                : `${checkListIndex}_child_${p_items.field}_${p_items.field}_${items.code}_${items.label}_${items.values.length}`
                            }
                          />
                        }
                      />
                    )}
                    {items.values.length > 0 && (
                      <Accordion sx={{ border: '0px', boxShadow: null }}>
                        <AccordionSummary
                          sx={{ border: '0px', boxShadow: null }}
                          expandIcon={
                            <MyIcon
                              icon="cheveron-down"
                              size="20px"
                              color="rgba(0, 0, 0, 0.6)"
                            />
                          }
                        >
                          <FormControlLabel
                            key={index}
                            sx={{ height: '24px' }}
                            label={
                              <Typography variant="body2">
                                {items.label}
                              </Typography>
                            }
                            control={
                              <Checkbox
                                checked={isChecked}
                                value={`${checkListIndex}_child_${p_items.field}_${p_items.field}_${items.code}_${items.label}_${items.values.length}`}
                                onChange={onChangeCheckbox}
                              />
                            }
                          />
                        </AccordionSummary>
                        <AccordionDetails>
                          {items.values.map((subItems, index) => {
                            checkListIndex = checkListIndex + 1;
                            const isChecked = checked[checkListIndex]
                              ? checked[checkListIndex].checked
                              : false;
                            return (
                              <Box key={`ssub-${index}`} ml={'24px'}>
                                <FormControlLabel
                                  key={`csub-${index}`}
                                  sx={{ height: '24px' }}
                                  label={
                                    <Typography variant="body2">
                                      {subItems.label}
                                    </Typography>
                                  }
                                  control={
                                    <Checkbox
                                      checked={isChecked}
                                      value={`${checkListIndex}_sub_${p_items.field}_${items.code}_${subItems.code}_${subItems.label}_0`}
                                      onChange={onChangeCheckbox}
                                    />
                                  }
                                />
                              </Box>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </SearchedBox>
    );
  }
};

export default MainSideMenu;
