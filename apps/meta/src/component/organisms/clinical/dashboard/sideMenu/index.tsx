import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  styled,
  Button,
  Chip,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import useSWR from 'swr';
import { fetcher } from 'api';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import SearchInput from 'src/component/molecules/sidemenu/sideSearchInput';
import { FlexBox } from '../../../../../../../../packages/cjbsDSTM/atoms/box/FlexBox';
import MyIcon from '../../../../../../../../packages/icon/myIcon';
import { useRecoilState } from 'recoil';
import { selectedFilterState } from 'src/recoil/selectedFilter';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { log } from 'console';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
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

const SearchBox = styled(Box)`
  width: 100%;
  min-height: 228px;
  border-bottom: 1px solid #ced4da; ;
`;

const SearchedBox = styled(Box)`
  width: 238px;
  height: 150px;
  margin-top: 20px;
`;

const FilterInitBox = styled(Box)`
  width: 78px;
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
  align-items: center1;
`;

const SearchedBoxHeader = styled(FlexBox)`
  justify-content: space-between;
`;

const SearchedChip = styled(Chip)`
  background: #f1f3f5;
`;

const FilterTitleBox = styled(FlexBox)`
  justify-content: flex-start;
`;

interface CheckType {
  p_code: string;
  code: string;
  checked: boolean;
}

export const LOCAL_STORAGE_FILTER_KEY = 'meta-c-filters';
const SideMenu = () => {
  const [selectedFilter, setSelectedFilter] =
    useRecoilState(selectedFilterState);

  let [checked, setChecked] = React.useState<CheckType[]>([]);

  const { data, isLoading } = useSWR('/filter', fetcher);

  useEffect(() => {
    initSelectedFilter();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (data !== undefined && data !== null) {
      const apiData: FilterList[] = data.data;

      const checkList: CheckType[] = [];
      apiData.map((items) => {
        const itemArray = items.values;
        itemArray.map((item) => {
          let newItem: CheckType = {
            code: item.code,
            p_code: items.name,
            checked: false,
          };
          checkList.push(newItem);
        });
      });

      setChecked(checkList);
    }
  }, [isLoading]);

  const onChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean,
  ) => {
    console.log('checked > ', e.target.value);
    console.log('checked > ', checked);

    if (e.target.value) {
      //index_code_label
      const values: string[] = e.target.value.split('_');
      const index: number = Number(values[0]);
      const code: string = values[1];
      const label: string = values[2];
      let newChecked: CheckType[] = [...checked];

      const updateItem: CheckType = newChecked[index];
      updateItem.checked = isChecked;

      console.log('updateItem > ', updateItem);
    }
  };

  const initSelectedFilter = async () => {
    const filters = await localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);
    console.log('filters>!!! ', filters);

    if (filters) {
      const set = new Set<string>(JSON.parse(filters));
      const uniqueArray = [...set];

      setSelectedFilter(uniqueArray);
    }
  };

  const deleteSelectedFilter = async (filtered: string) => {
    const filters = await localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);
    if (filters) {
      const filterArray: [] = JSON.parse(filters);
      const deletedFilter = filterArray.filter((item) => item !== filtered);
      const set = new Set(deletedFilter);
      const uniqueArray = [...set];
      localStorage.setItem(
        LOCAL_STORAGE_FILTER_KEY,
        JSON.stringify(uniqueArray),
      );
      setSelectedFilter(uniqueArray);
    }
  };

  console.log('isLoading >>!!!! ', selectedFilter);

  if (isLoading) {
    return <Skeleton variant="rectangular" width={100} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    let checkListIndex = -1;
    const apiData: FilterList[] = data.data;
    console.log('apiData > ', apiData);

    return (
      <Box>
        <SearchBox>
          <SearchInput />
          <SearchedBox>
            <SearchedBoxHeader mb={'12px'}>
              <Typography variant="subtitle2">Selected filter</Typography>
              <FilterInitBox>
                <MyIcon icon="arrow-clockwise" size="16px" color={'#006ECD'} />
                <Box ml={'4px'}>필터 초기화</Box>
              </FilterInitBox>
            </SearchedBoxHeader>
            {selectedFilter.length > 0 && (
              <Stack
                spacing={0.5}
                overflow={'auto'}
                height={'123px'}
                direction={'row'}
                useFlexGap
                flexWrap="wrap"
              >
                {selectedFilter.map((text) => (
                  <Box>
                    <SearchedChip
                      label={text}
                      onDelete={() => deleteSelectedFilter(text)}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </SearchedBox>
        </SearchBox>
        {apiData.map((items, index) => (
          <Box
            key={`main-${index}`}
            sx={{
              mt: '20px',
              paddingBottom: '24px',
              borderBottom: '1px solid #CED4DA',
            }}
          >
            <FilterTitleBox mb={'4px'} justifyContent={'flex-start'}>
              <MyIcon icon={items.name} size={'24px'} color="black" />
              <Typography ml={'8px'} variant="subtitle1">
                {items.title}
              </Typography>
            </FilterTitleBox>
            {items.values.length > 0 &&
              items.values.map((items, index) => {
                checkListIndex = checkListIndex + 1;
                console.log(
                  'checked[checkListIndex].code > ',
                  checked[checkListIndex],
                );
                const isChecked = checked[checkListIndex]
                  ? checked[checkListIndex].checked
                  : false;
                return (
                  <Box key={`sub-${index}`}>
                    {items.values.length === 0 && (
                      <FormControlLabel
                        sx={{ height: '24px' }}
                        label={
                          <Typography variant="body2">{items.label}</Typography>
                        }
                        control={
                          <Checkbox
                            onChange={onChangeCheckbox}
                            checked={isChecked}
                            value={`${checkListIndex}_${items.code}_${items.label}`}
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
                                value={`${checkListIndex}_${items.code}_${items.label}`}
                                onChange={onChangeCheckbox}
                              />
                            }
                          />
                        </AccordionSummary>
                        <AccordionDetails>
                          {items.values.map((subItems, index) => (
                            <Box ml={'24px'}>
                              <FormControlLabel
                                key={`csub-${index}`}
                                sx={{ height: '24px' }}
                                label={
                                  <Typography variant="body2">
                                    {subItems.label}
                                  </Typography>
                                }
                                control={<Checkbox />}
                              />
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Box>
                );
              })}
          </Box>
        ))}
      </Box>
    );
  }
};
export default SideMenu;
