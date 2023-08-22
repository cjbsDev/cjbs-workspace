import { SubjectDetailStateType } from 'src/recoil/SubjectDetailState';
import {
  Box,
  Chip,
  Divider,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  styled,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { FlexBox } from 'cjbsDSTM/atoms/box/FlexBox';
import { DataTableBase } from 'cjbsDSTM';
import { Categories, TimePoints } from './types';

interface TimePointsProps {
  timePoints: TimePoints[];
  active: string;
  parents: string;
}

const ContentsBox = styled(Box)`
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 40px;
  gap: 20px;
  background: #ffffff;
  border: 1px solid #ced4da;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const TimePointsBox = styled(Box)`
  width: '100%';
  height: 40px;
  display: flex;
  border-bottom: 1px solid #ced4da;
`;

const CategoriesAll: FunctionComponent<TimePointsProps> = ({
  timePoints,
  active,
  parents,
}) => {
  console.log('active > ', active);
  console.log('timePoints > ', timePoints);
  console.log('parents > ', parents);

  return (
    <Box>
      {timePoints.map((timePoint, index) => {
        return (
          <Box key={`categories-main-${index}`}>
            <FlexBox
              id={timePoint.label ? timePoint.label : ''}
              height={'30px'}
              sx={{
                mb: '14px',
                pl: '16px',
                justifyContent: 'flex-start',
                backgroundColor: 'rgba(0, 110, 205, 0.08);',
                borderLeft: '4px solid #006ECD',
              }}
            >
              <Typography variant="subtitle2">{timePoint.label}</Typography>
            </FlexBox>
            {timePoint.categories.length === 0 && (
              <Box mt={'-30px'}>
                <Skeleton variant="rectangular" width={'100%'} height={850} />
              </Box>
            )}
            {timePoint.categories &&
              timePoint.categories.map((category, index) => (
                <Box key={`timepoints-main-${index}`}>
                  <ContentsBox>
                    <Box sx={{ width: '100%' }}>
                      <Box key={index} sx={{ width: '100%' }}>
                        <Typography variant="title2">
                          {category.name}
                        </Typography>
                        <Divider
                          variant="fullWidth"
                          sx={{ border: 1, color: 'black', margin: '20px 0px' }}
                        />
                        <Box>
                          {category.subCategories.map((sub, index) => {
                            let columns: any = [];
                            const subData: any[] = sub.data;

                            sub.header.map((header, headerIndex) => {
                              const data = subData[0];
                              const columnName = Object.keys(data)[headerIndex];
                              let value: any = null;
                              if (header === 'Analysis') {
                                value = data[columnName].map(
                                  (analysis: any) => {
                                    return analysis.type;
                                  },
                                );
                              } else {
                                value = data[columnName];
                              }

                              columns.push({
                                name: header,
                                cell: (row: any) => {
                                  const rowValue = row[columnName];
                                  if (rowValue) {
                                    if (Array.isArray(rowValue)) {
                                      return rowValue.map((value) => {
                                        return (
                                          <Chip
                                            key={'chip'}
                                            size="small"
                                            variant="outlined"
                                            label={value.type}
                                            sx={{ marginRight: '2px' }}
                                          />
                                        );
                                      });
                                    }
                                    return rowValue;
                                  } else {
                                    return '';
                                  }
                                },
                              });
                            });

                            return (
                              <Box mb={'20px'} key={`categories-${index}`}>
                                <Typography mb={'7px'} variant="subtitle2">
                                  {sub.name}
                                </Typography>
                                <DataTableBase
                                  data={sub.data}
                                  columns={columns}
                                  pagination={false}
                                  selectableRows={false}
                                  fixedHeader={false}
                                  // onRowClicked={goDetailPage}
                                  highlightOnHover
                                  fixedHeaderScrollHeight="600px"
                                  // subHeader
                                  // subHeaderComponent={HeaderComponent}
                                />
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </ContentsBox>
                </Box>
              ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoriesAll;
