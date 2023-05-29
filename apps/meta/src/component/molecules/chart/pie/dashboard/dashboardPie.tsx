import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Text,
} from 'recharts';
import { StudyPerVoList } from '../../../../../app/clinical/page';
import React from 'react';
import { styled } from 'styled-components';
import { Box, Typography } from '@mui/material';
import DashboardPieLegend from './dashboardPieLegend';

export interface Props {
  data: StudyPerVoList[];
  colorChart: Map<string, string>;
  totalStudy: number;
}

interface Opacity {
  uv: number;
  prv: number;
}

const TooltipBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 3px;
  width: 45px;
  height: 22px;
`;

const LegendBox = styled(Box)`
  width: 145px;
  height: 136px;
`;

// const RateText = styled(Typography)`
//   color: ${grey[500]};
//   font-size: 13px;
//   font-weight: 600;
// `;

// taxonsData.map((speices) => {
//   colorChart.set(speices.name, randomColor())
// })

// genomesData.map((speices) => {
//   colorChart.set(speices.name, randomColor())
// })

const DashboardPie = ({ totalStudy, data, colorChart }: Props) => {
  const [state, setState] = React.useState({ opacity: { uv: 1, pv: 1 } });

  const onPieEnter = (_: any, index: any) => {
    setState({
      opacity: index,
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      //  const percent = payload[0].value / data.length;
      return (
        <TooltipBox sx={{ backgroundColor: payload[0].payload.fill }}>
          {/* {`${payload[0].name}`} */}
          <Typography
            color="white"
            variant="body2"
          >{`${payload[0].value}%`}</Typography>
        </TooltipBox>
      );
    }
    return null;
  };
  return (
    <Box ml={'118px'} position={'relative'}>
      <Box sx={{ position: 'absolute', left: '36%', top: '37%' }}>
        <Box alignItems={'center'} display={'flex'} flexDirection={'column'}>
          <Typography variant={'subtitle2'}>{`총 연구 수`}</Typography>
          <Typography variant={'subtitle2'}>
            {`${totalStudy.toLocaleString()}`}
          </Typography>
        </Box>
      </Box>
      <PieChart width={170} height={166}>
        <Pie
          data={data}
          dataKey="totalPer"
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={53}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colorChart.get(entry.name)} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </Box>
  );
};

export default DashboardPie;
